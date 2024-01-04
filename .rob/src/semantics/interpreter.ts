import { Robot, Instruction, FunctionN, ExpressionBase, DistanceExpression, TimeExpression, Distance, Time, DirectionCommand, SpeedCommand, DistanceSensorCommand, TimeSensorCommand, RotateCommand, CallVariable, CallFunction, Affectation, BooleanType, NumberType, PlusMinus, MultDiv, PlusMinusDistance, MultDivDistance, PlusMinusTime, MultDivTime, DeclarationVariable, PrimaryExprAri, PrimaryExprBool, PrimaryExprDistance, Block, IF, LOOP, And, Or, Not, Equals } from './visitor.js';
//import * as ASTClasses from './visitor.js';
import { Robot as RobotE } from "../web/simulator/entities.js";
import { RoboMLVisitor,acceptNode } from './visitor.js';
import { BaseScene, Scene } from "../web/simulator/scene.js";
import { Vector } from "../web/simulator/utils.js";
import { Parameter, TypeClass } from '../language/generated/ast.js';

interface VariableDefinition {
    name: string;
    type: string;
    value : boolean |number;
    niveau : number;
}

interface FunctionInfo{
    name : string;
    func : FunctionN;
    parameters? : Parameter[];
    returnType : string |undefined;

}

export class MyVisitor implements RoboMLVisitor {
    private niveau: number;
    private scene: Scene;
    private robot: RobotE;
    //private variables: Map<string,Expression>;
    public wait: boolean;
    private variables:Array<Map<string,VariableDefinition>>;
    private functions: Array<FunctionInfo>;

    constructor(sceneWidth: number, sceneHeight: number) {
        this.scene = new BaseScene(new Vector(sceneWidth*10, sceneHeight*10));
        //this.scene = new BaseScene();
        this.robot = this.scene.robot;
        //this.robot = new Robot(new Vector(100, 100), new Vector(20, 20), 0, 0, new BaseScene());
        this.variables = Array<Map<string,VariableDefinition>>();
        this.wait = false;
        this.niveau = 0;
        this.functions = Array<FunctionInfo>();
    }


    visitRobot(node: Robot) {
        let start=undefined;
        for (let f of node.functions) {
            if(f.return){
                this.functions.push({name: f.name,func:(f as FunctionN), parameters: f.parameters, returnType: acceptNode(f.return,this)});
            }else{
                this.functions.push({name: f.name,func:(f as FunctionN), parameters: f.parameters, returnType: undefined});
            }
            if (f.name === "main") {
                start=f;
            }
        }
        acceptNode(start as FunctionN,this);
        return this.scene;
    }


    visitInstruction(node: Instruction) {
        acceptNode(node,this);
    }

        visitFunctionN(node: FunctionN): number |boolean |undefined {
        this.niveau++;
        for (let i of node.instruction) {
            acceptNode(i,this);
        }
        if(node.returnType && node.returnedValue){
            return acceptNode(node.returnedValue,this);
        }
        return undefined;
    }


    visitExpressionBase(node: ExpressionBase) {
        acceptNode(node,this);
    }


    visitDistanceExpression(node: DistanceExpression) :number {
        const typeD= acceptNode(node.unit,this);
        let valueD= acceptNode(node.number,this);

        if(typeD === "cm"){
            valueD= valueD*10;
        }
        return valueD;
    }


     visitTimeExpression(node: TimeExpression) {
        return acceptNode(node.number,this);
    }

    visitDistance(node: Distance) : string{
        return node.typeD;
    }

    visitTime(node: Time) {
    }


     visitDirectionCommand(node: DirectionCommand) {
        if(node.operateur === "FORWARD"){
            const distance = acceptNode(node.distance,this);
            this.robot.move(distance);
        }else if(node.operateur === "BACKWARD"){
            this.robot.move(-acceptNode(node.distance,this));
        }else if(node.operateur === "LEFT"){
            this.robot.side(-acceptNode(node.distance,this));
        }
        else if(node.operateur === "RIGHT"){
            this.robot.side(acceptNode(node.distance,this));
        }
    }


   visitSpeedCommand(node: SpeedCommand) {
        const distance=acceptNode(node.speed,this);
        this.robot.speed = distance;
    }


    visitDistanceSensorCommand(node: DistanceSensorCommand) : number {
        const pos = this.robot.getRay().intersect(this.scene.entities);
        if (pos) {
            const distance = this.robot.pos.minus(pos).norm();
            return distance;
        }
        return -1;
    }

    visitTimeSensorCommand(node: TimeSensorCommand) : number{
        return this.scene.time;
    }

    visitRotateCommand(node: RotateCommand) {
        this.robot.turn(node.angle);
    }


    visitCallVariable(node: CallVariable) : boolean | number | undefined {
        let name = node.nom;
        let niveau = this.niveau;
        let value;
        while(niveau >= 0){
            if(this.variables[niveau].has(name)){
                value = this.variables[niveau].get(name)?.value;
                break;
            }
            niveau--;
        }
        return value;
    }


     visitCallFunction(node: CallFunction) {
        let name=node.nom;
        let functionInfo=this.functions.find((f)=>f.name===name);
        this.niveau++;
        if(functionInfo && functionInfo.parameters && functionInfo.parameters.length>0){
            let idx=0;
            this.variables[this.niveau]=new Map<string,VariableDefinition>();
            for(let i of functionInfo.parameters){
                this.variables[this.niveau].set(i.nom, {name: i.nom, type: acceptNode(i.typeP,this), value: acceptNode(node.parameters[idx],this), niveau: this.niveau});
                idx++;
            }
        }
        if(functionInfo){
            acceptNode(functionInfo.func,this);
        }
        if(functionInfo && functionInfo.parameters && functionInfo.parameters.length>0){
            this.variables[this.niveau].clear(); 

        }
        this.niveau--;
    }


    visitAffectation(node: Affectation) {
        let name = node.callvariable.nom;
        let niveau = this.niveau;
        while(niveau >= 0){
            if(this.variables[niveau].has(name)){
                let varr=this.variables[niveau].get(name);
                    if(varr){
                        varr.value=acceptNode(node.expressionbase,this);
                    }
                break;
            }
            niveau--;
        } 
    }

   
    visitBooleanType(node: BooleanType) : boolean {
        return node.value;
    }

    visitNumberType(node: NumberType) : number {
        return node.value;
    }

    visitPlusMinus(node: PlusMinus) {
        throw new Error('Method not implemented.');
    }
    visitMultDiv(node: MultDiv) {
        throw new Error('Method not implemented.');
    }
    visitPlusMinusDistance(node: PlusMinusDistance) {
        throw new Error('Method not implemented.');
    }
    visitMultDivDistance(node: MultDivDistance) {
        throw new Error('Method not implemented.');
    }
    visitPlusMinusTime(node: PlusMinusTime) {
        throw new Error('Method not implemented.');
    }
    visitMultDivTime(node: MultDivTime) {
        throw new Error('Method not implemented.');
    }

    visitDeclarationVariable(node: DeclarationVariable) {
        this.variables[this.niveau].set(node.nom, {name: node.nom, type: acceptNode(node.type,this), value: acceptNode(node.expressionbase,this), niveau: this.niveau});
    }

    visitPrimaryExprAri(node: PrimaryExprAri) {
        throw new Error('Method not implemented.');
    }
    visitPrimaryExprBool(node: PrimaryExprBool) {
        throw new Error('Method not implemented.');
    }
    visitPrimaryExprDistance(node: PrimaryExprDistance) {
        throw new Error('Method not implemented.');
    }
    visitBlock(node: Block) {
        throw new Error('Method not implemented.');
    }
    visitIF(node: IF) {
        throw new Error('Method not implemented.');
    }
    visitLOOP(node: LOOP) {
        throw new Error('Method not implemented.');
    }
    visitAnd(node: And) {
        throw new Error('Method not implemented.');
    }
    visitOr(node: Or) {
        throw new Error('Method not implemented.');
    }
    visitNot(node: Not) {
        throw new Error('Method not implemented.');
    }
    visitEquals(node: Equals) {
        throw new Error('Method not implemented.');
    }

    visitParameter(node: Parameter) {
        // const name=node.nom;
        // const type=acceptNode(node.typeP,this);
         //this.variables[this.niveau].set(name, {name: name, type: type, value: undefined, niveau: this.niveau});
     }
     visitTypeClass(node: TypeClass) {
         return node.typeT;
     }
}