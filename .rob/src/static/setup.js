import { MonacoEditorLanguageClientWrapper, vscode } from './monaco-editor-wrapper/index.js';
import { buildWorkerDefinition } from "./monaco-editor-workers/index.js";
import monarchSyntax from "./syntaxes/robot.monarch.js";

buildWorkerDefinition('./monaco-editor-workers/workers', new URL('', window.location.href).href, false);

MonacoEditorLanguageClientWrapper.addMonacoStyles('monaco-editor-styles');

const client = new MonacoEditorLanguageClientWrapper();
const editorConfig = client.getEditorConfig();
editorConfig.setMainLanguageId('robot');       // WARNING Dependent of your project

editorConfig.setMonarchTokensProvider(monarchSyntax);

let code = `Robot{
    let main(){
        SPEED 100.0 mm;
        var boolean bool=true;
        var number i=0.0;
        var number p=0.0;
        LOOP ((bool) ==(true)){
             p=square(i);
            inverseSquare(p);
            i=i+1.0;
            IF ((i) >= (2.0)){
                bool=false;
            };
        };
       
    }

    let number square(number p){
        var number a=0.0;
        LOOP ((a)<(4.0)){
            IF((p)==(1.0)){
                LEFT 500.0mm;
            }ELSE{
                FORWARD 500.0mm;
            };
            CLOCK 90.0;
            a = a+1.0;
        };
        return p;
    }

    let inverseSquare(number p){
        var number a=0.0;
        LOOP ((a)!=(4.0)){
        IF((p)==(1.0)){
            RIGHT 500.0mm;
        }ELSE{
            BACKWARD 500.0mm;
        };
            CLOCK 90.0;
            a=a+1.0;
        };
    }
   }`

editorConfig.setMainCode(code);

editorConfig.theme = 'vs-dark';
editorConfig.useLanguageClient = true;
editorConfig.useWebSocket = false;

const typecheck = (async () => {
    console.info('typechecking current code...');

    // To implement (Bonus)
    
    if(errors.length > 0){
        const modal = document.getElementById("errorModal");
        modal.style.display = "block";
    } else {
        const modal = document.getElementById("validModal");
        modal.style.display = "block";
    }
});

const parseAndValidate = (async () => {
    console.info('validating current code...');
    const code = client.editor.getValue();
    const errors = await vscode.commands.executeCommand('parseAndValidate', code);
    if(errors.length > 0){
        const modal = document.getElementById("errorModal");
        modal.style.display = "block";
        errors.forEach((error) => {
            const errorDiv = document.createElement("div");
            errorDiv.innerHTML = error;
            modal.getElementsByClassName("modal-body")[0].appendChild(errorDiv);
        });
    }else{
        const modal = document.getElementById("validModal");
        modal.style.display = "block";
    }
});


window.parseAndValidate = parseAndValidate;

const execute = (async () => {
    const code = client.editor.getValue();
    const simulator = document.querySelector('.simulator');
    const scene = await vscode.commands.executeCommand('parseAndGenerate', [code, simulator.clientWidth, simulator.clientHeight]);
    window.setupSimulator=setupSimulator(scene);
});

const setupSimulator = (scene) => {
    const simulator = document.querySelector('.simulator');
    const wideSide = max(scene.size.x, scene.size.y);
    //let factor = 1000 / wideSide;
    let factor=simulator.clientWidth / wideSide;
    window.scene = scene;

    scene.entities.forEach((entity) => {
        if (entity.type === "Wall") {
            window.entities.push(new Wall(
                (entity.pos.x)*factor,
                (entity.pos.y)*factor,
                (entity.size.x)*factor,
                (entity.size.y)*factor
                ));
        }
        if (entity.type === "Block") {
            window.entities.push(new Wall(
                (entity.pos.x)*factor,
                (entity.pos.y)*factor,
                (entity.size.x)*factor,
                (entity.size.y)*factor
                ));
        }
    });

    window.p5robot = new Robot(
        factor,
        scene.robot.pos.x,
        scene.robot.pos.y,
        scene.robot.size.x * factor,
        scene.robot.size.y * factor,
        scene.robot.rad
    );
}

window.execute = execute;
window.typecheck = typecheck;

var errorModal = document.getElementById("errorModal");
var validModal = document.getElementById("validModal");
var closeError = document.querySelector("#errorModal .close");
var closeValid = document.querySelector("#validModal .close");
closeError.onclick = function() {
    errorModal.style.display = "none";
}
closeValid.onclick = function() {
    validModal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == validModal) {
        validModal.style.display = "none";
    }
    if (event.target == errorModal) {
        errorModal.style.display = "none";
    }
  } 

const workerURL = new URL('./robot-server-worker.js', import.meta.url); // WARNING Dependent of your project
console.log(workerURL.href);

const lsWorker = new Worker(workerURL.href, {
    type: 'classic',
    name: 'RoboMl Language Server'
});
client.setWorker(lsWorker);

// keep a reference to a promise for when the editor is finished starting, we'll use this to setup the canvas on load
const startingPromise = client.startEditor(document.getElementById("monaco-editor-root"));
