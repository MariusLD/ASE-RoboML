import { Robot, Instruction, FunctionN, ExpressionBase, DistanceExpression, TimeExpression, Distance, Time, DirectionCommand, SpeedCommand, DistanceSensorCommand, TimeSensorCommand, RotateCommand, CallVariable, CallFunction, Affectation, BooleanType, NumberType, PlusMinus, MultDiv, PlusMinusDistance, MultDivDistance, PlusMinusTime, MultDivTime, DeclarationVariable, PrimaryExprAri, PrimaryExprBool, PrimaryExprDistance, Block, IF, LOOP, And, Or, Not, Equals } from './visitor.js';
import { Robot as RobotE } from "../web/simulator/entities.js";
import { RoboMLVisitor,acceptNode } from './visitor.js';
import { BaseScene, Scene } from "../web/simulator/scene.js";
import { Vector } from "../web/simulator/utils.js";
import { BooleanExp, ComparaisonAri, ComparaisonDistance, ComparaisonTime, Expression, Parameter, PrimaryExprTime, TypeClass } from '../language/generated/ast.js';

//to give information about the variable like the type and the value
interface VariableDefinition {
    name: string;
    type: string;
    value : boolean |number;
    niveau : number;
}

//to give information about the function like the name, the parameters, the return type and the function
interface FunctionInfo{
    name : string;
    func : FunctionN;
    parameters? : Parameter[];
    returnType : string |undefined;

}

export class MyVisitor implements RoboMLVisitor {
    //the level of block of code to search the variable
    private niveau: number;
    //the scene to draw the robot
    private scene: Scene;
    //the robot to move
    private robot: RobotE;

    //store the variable, the key is the name of the variable and the value is the information about the variable
    //a new level = a new map
    private variables:Array<Map<string,VariableDefinition>>;

    //store all the function information
    private functions: Array<FunctionInfo>;

    constructor(sceneWidth: number, sceneHeight: number) {
        this.scene = new BaseScene(new Vector(sceneWidth*10, sceneHeight*10));
        this.robot = this.scene.robot;
        this.variables = Array<Map<string,VariableDefinition>>();
        this.niveau = 0;
        this.variables[this.niveau]=new Map<string,VariableDefinition>();
        this.functions = Array<FunctionInfo>();
    }

    visitComparaisonAri(node: ComparaisonAri) {
        throw new Error('Method not implemented.');
    }
    visitComparaisonDistance(node: ComparaisonDistance) {
        throw new Error('Method not implemented.');
    }
    visitComparaisonTime(node: ComparaisonTime) {
        throw new Error('Method not implemented.');
    }

    //visit the robot and store all the function information, we start with the function name main (the entry point)
    visitRobot(node: Robot) {
        let start=undefined;
        for (let f of node.functions) {
            if(f.returnType){        
                this.functions.push({name: f.name,func:(f as FunctionN), parameters: f.parameters, returnType: acceptNode(f.returnType,this)});
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

    //visit the expression and return the result of the expression, it's here that we do the calculation
    visitExpression(node: Expression) : number | boolean | undefined{
        if(node.operateur === "+"){
            return Number(acceptNode(node.expr1,this))+Number(acceptNode(node.expr2,this));
        }else if(node.operateur === "-"){
            return Number(acceptNode(node.expr1,this))-Number(acceptNode(node.expr2,this));
        }else if(node.operateur === "*"){
            return Number(acceptNode(node.expr1,this))*Number(acceptNode(node.expr2,this));
        }else if(node.operateur === "/"){
            return Number(acceptNode(node.expr1,this))/Number(acceptNode(node.expr2,this));
        }else if(node.operateur === "AND"){
            return Boolean(acceptNode(node.expr1,this)) && Boolean(acceptNode(node.expr2,this));
        }else if(node.operateur === "OR"){
            return Boolean(acceptNode(node.expr1,this)) || Boolean(acceptNode(node.expr2,this));
        }else if(node.operateur === "NOT"){
            return !Boolean(acceptNode(node.expr1,this));
        }else if (node.operateur === "=="){
            return (acceptNode(node.expr1,this)) === (acceptNode(node.expr2,this));
        }else if (node.operateur === "!="){
            return (acceptNode(node.expr1,this)) !== (acceptNode(node.expr2,this));
        }else if(node.operateur === "<"){
            return Number(acceptNode(node.expr1,this)) < Number(acceptNode(node.expr2,this));
        }else if(node.operateur === ">"){
            return Number(acceptNode(node.expr1,this)) > Number(acceptNode(node.expr2,this));
        }else if(node.operateur === "<="){
            return Number(acceptNode(node.expr1,this)) <= Number(acceptNode(node.expr2,this));
        }
        else if(node.operateur === ">="){
            return Number(acceptNode(node.expr1,this)) >= Number(acceptNode(node.expr2,this));
        }
        return undefined
    }

    visitInstruction(node: Instruction) {
      acceptNode(node,this);
    }

    //visit the function and return the result of the function
    visitFunctionN(node: FunctionN): number |boolean |undefined {
        for (let i of node.instruction) {
            acceptNode(i,this);
        }
        if(node.returnType && node.returnedValue){
            return acceptNode(node.returnedValue,this);
        }
        return undefined;
    }


    visitExpressionBase(node: ExpressionBase) : number | boolean | undefined {
        let newNode=(node as unknown as Expression);
        if(newNode.$type === "Expression"){
            return this.visitExpression(newNode);
        }
        return undefined;
    }

    //visit the distance expression and return the value of the distance, if type is cm, we convert it to mm
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

    //visit the direction command and move the robot
     visitDirectionCommand(node: DirectionCommand) {
        if(node.operateur === "FORWARD"){
            const distance = acceptNode(node.distance,this);
            this.robot.move(distance);
        }else if(node.operateur === "BACKWARD"){
            this.robot.move(-acceptNode(node.distance,this));
        }else if(node.operateur === "LEFT"){
            this.robot.side(acceptNode(node.distance,this));
        }
        else if(node.operateur === "RIGHT"){
            this.robot.side(-acceptNode(node.distance,this));
        }
    }

    //visit the speed command and change the speed of the robot
   visitSpeedCommand(node: SpeedCommand) {
        const distance=acceptNode(node.speed,this);
        this.robot.speed = distance;
    }

    //visit the distance sensor command and return the distance between the robot and the wall
    visitDistanceSensorCommand(node: DistanceSensorCommand) : number {
        const pos = this.robot.getRay().intersect(this.scene.entities);
        if (pos) {
            const distance = this.robot.pos.minus(pos).norm();
            return distance;
        }
        return -1;
    }
    
    //visit the time sensor command and return the time
    visitTimeSensorCommand(node: TimeSensorCommand) : number{
        return this.scene.time;
    }

    //visit the rotate command and change the angle of the robot
    visitRotateCommand(node: RotateCommand) {
        this.robot.turn(node.angle);
    }


    //seach the variable in the map and return the value of the variable, use the level to search the variable
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

    
    //visit the call function, we search the function information and we call the function with parameters
     visitCallFunction(node: CallFunction) : number | boolean | undefined{
        let name=node.nom;
        let functionInfo=this.functions.find((f)=>f.name===name);
        this.niveau++;
        this.variables[this.niveau]=new Map<string,VariableDefinition>();
        let returN=undefined;
        if(functionInfo && functionInfo.parameters && functionInfo.parameters.length>0){ //if the function has parameters
            let idx=0;
            for(let i of functionInfo.parameters){
                this.variables[this.niveau].set(i.nom, {name: i.nom, type: acceptNode(i.typeP,this), value: acceptNode(node.parameters[idx],this), niveau: this.niveau}); //set the value of the parameter
                
                idx++;
            }
        }
        if(functionInfo){
            returN=acceptNode(functionInfo.func,this);
        }
        this.variables[this.niveau].clear();
        this.niveau--;
        return returN;
    }

    //visit the affectation, we search the variable and we change the value of the variable
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
        if((node.value as unknown) === "true"){
            return true;
        }else{
            return false;
        }
    }

    visitNumberType(node: NumberType) : number {
        return Number(node.value);
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

    //visit the declaration variable and store the variable in the map
    visitDeclarationVariable(node: DeclarationVariable) {
        this.variables[this.niveau].set(node.nom, {name: node.nom, type: acceptNode(node.type,this), value: acceptNode(node.expressionbase,this), niveau: this.niveau});
    }

    visitPrimaryExprAri(node: PrimaryExprAri) : number {
        return acceptNode(node.expr,this);
    }
    visitPrimaryExprBool(node: PrimaryExprBool) {
        return acceptNode(node.expr,this);
    }
    visitPrimaryExprDistance(node: PrimaryExprDistance) {
        throw new Error('Method not implemented.');
    }
    visitBlock(node: Block) {
        throw new Error('Method not implemented.');
    }

    //visit the if or the else
    visitIF(node: IF) {
        if(acceptNode(node.expression,this)){
            this.niveau++;
            this.variables[this.niveau]=new Map<string,VariableDefinition>();
            for(let i of node.instruction){
                acceptNode(i,this);
            }
        }else{
            this.niveau++;
            this.variables[this.niveau]=new Map<string,VariableDefinition>();
            
            if(node.instructionElse != undefined && node.instructionElse.length>0){
                for(let i of node.instructionElse){
                    acceptNode(i,this);
                }
            }
        }
        this.variables[this.niveau].clear();
        this.niveau--;
    }

    //visit the loop and execute the instruction while the condition is false
    visitLOOP(node: LOOP) {
        this.niveau++;
        this.variables[this.niveau]=new Map<string,VariableDefinition>();
        while(!acceptNode(node.expression,this)){
            console.log("LOOP");
            for(let i of node.instruction){
                console.log("instruction");
                acceptNode(i,this);
            }
        }
        this.variables[this.niveau].clear();
        this.niveau--;
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

     visitBooleanExp(node: BooleanExp) {
        throw new Error('Method not implemented.');
     }

     visitPrimaryExprTime(node: PrimaryExprTime) {
        throw new Error('Method not implemented.');
     }
}