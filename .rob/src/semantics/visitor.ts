import * as ASTInterfaces from '../language/generated/ast.js';
//import { Reference } from 'langium';
import { AstNode } from 'langium';

export interface RoboMLVisitor{
    // TODO : create one visit method for each concept of the language
    visitRobot(node: ASTInterfaces.Robot): any;
    visitInstruction(node: ASTInterfaces.Instruction): any;
    visitFunctionN(node: ASTInterfaces.FunctionN): number |boolean |undefined;
    visitExpressionBase(node: ASTInterfaces.ExpressionBase): any;
    visitDistanceExpression(node: ASTInterfaces.DistanceExpression): number;
    visitTimeExpression(node: ASTInterfaces.TimeExpression): any;
    visitDistance(node: ASTInterfaces.Distance): string;
    visitTime(node: ASTInterfaces.Time): any;
    visitDirectionCommand(node: ASTInterfaces.DirectionCommand): any;
    visitSpeedCommand(node: ASTInterfaces.SpeedCommand): any;
    visitDistanceSensorCommand(node: ASTInterfaces.DistanceSensorCommand): number;
    visitTimeSensorCommand(node: ASTInterfaces.TimeSensorCommand): number;
    visitRotateCommand(node: ASTInterfaces.RotateCommand): any;
    visitCallVariable(node: ASTInterfaces.CallVariable): any;
    visitCallFunction(node: ASTInterfaces.CallFunction): any;
    visitAffectation(node: ASTInterfaces.Affectation): any;
    visitBooleanType(node: ASTInterfaces.BooleanType): any;
    visitNumberType(node: ASTInterfaces.NumberType): any;
    visitPlusMinus(node: ASTInterfaces.PlusMinus): any;
    visitMultDiv(node: ASTInterfaces.MultDiv): any;
    visitPlusMinusDistance(node: ASTInterfaces.PlusMinusDistance): any;
    visitMultDivDistance(node: ASTInterfaces.MultDivDistance): any;
    visitPlusMinusTime(node: ASTInterfaces.PlusMinusTime): any;
    visitMultDivTime(node: ASTInterfaces.MultDivTime): any;
    visitDeclarationVariable(node: ASTInterfaces.DeclarationVariable): any;
    visitPrimaryExprAri(node: ASTInterfaces.PrimaryExprAri): any;
    visitPrimaryExprBool(node: ASTInterfaces.PrimaryExprBool): any;
    visitPrimaryExprDistance(node: ASTInterfaces.PrimaryExprDistance): any;
    visitBlock(node: ASTInterfaces.Block): any;
    visitIF(node: ASTInterfaces.IF): any;
    visitLOOP(node: ASTInterfaces.LOOP): any;
    visitAnd(node: ASTInterfaces.And): any;
    visitOr(node: ASTInterfaces.Or): any;
    visitNot(node: ASTInterfaces.Not): any;
    visitEquals(node: ASTInterfaces.Equals): any;
    visitParameter(node: ASTInterfaces.Parameter): any;
    visitTypeClass(node: ASTInterfaces.TypeClass): any;
    visitPrimaryExprTime(node: ASTInterfaces.PrimaryExprTime): any;
}

export class IF implements ASTInterfaces.IF {
    readonly $type: 'IF' = 'IF';
    constructor(
        public expression: ASTInterfaces.Expression,
        public instruction: ASTInterfaces.Instruction[]
    ) {}
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitIF(this);
    }
}

export class LOOP implements ASTInterfaces.LOOP {
    readonly $type: 'LOOP' = 'LOOP';
    constructor(
        public expression: ASTInterfaces.Expression,
        public instruction: ASTInterfaces.Instruction[]
    ) {}
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitLOOP(this);
    }
}

export class Equals implements ASTInterfaces.Equals {
    readonly $type: 'Equals' = 'Equals';
    constructor(
        public className: ASTInterfaces.TypeClass,
        public left :ASTInterfaces.Or,
        public right :ASTInterfaces.Or,
        public operateur : string
    ) {
        this.operateur=operateur;
        this.left=left;
        this.right=right;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitEquals(this);
    }
}
export class TypeClass implements ASTInterfaces.TypeClass {
    readonly $type: 'TypeClass' = 'TypeClass';
    $container: ASTInterfaces.DeclarationVariable | ASTInterfaces.FunctionN | ASTInterfaces.Parameter | ASTInterfaces.PrimaryExprAri | ASTInterfaces.PrimaryExprDistance;
    constructor(
        public className: string,
        public typeT: string,
        public container: ASTInterfaces.DeclarationVariable | ASTInterfaces.FunctionN | ASTInterfaces.Parameter | ASTInterfaces.PrimaryExprAri | ASTInterfaces.PrimaryExprDistance
    ) {
        this.typeT=typeT
        this.$container=container;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitTypeClass(this);
    }

}
export class Not implements ASTInterfaces.Not {
    readonly $type: 'Not' = 'Not';
    $container: ASTInterfaces.Not | ASTInterfaces.And;
    constructor(
        public className: ASTInterfaces.TypeClass,
        public not : ASTInterfaces.Not,
        public or : ASTInterfaces.Or,
        public exp:ASTInterfaces.PrimaryExprBool,
        public container: ASTInterfaces.Not | ASTInterfaces.And
    ) {
        this.not=not;
        this.or=or;
        this.exp=exp;
        this.$container=container;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitNot(this);
    }
}

export class Or implements ASTInterfaces.Or {
    readonly $type: 'Or' = 'Or';
    $container: ASTInterfaces.Equals;
    constructor(
        public className: ASTInterfaces.TypeClass,
        public container: ASTInterfaces.Equals,
        public left :ASTInterfaces.And,
        public right :ASTInterfaces.And[]
    ) {
        this.left=left;
        this.right=right;
        this.$container=container;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitOr(this);
    }
}

export class And implements ASTInterfaces.And {
    readonly $type: 'And' = 'And';
    $container: ASTInterfaces.Or;
    constructor(
        public className: ASTInterfaces.TypeClass,
        public left :ASTInterfaces.Not,
        public right :ASTInterfaces.Not[],
        public container: ASTInterfaces.Or
    ) {
        this.left=left;
        this.right=right;
        this.$container=container;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitAnd(this);
    }
}

export class Block implements ASTInterfaces.Block {
    readonly $type: 'Block' = 'Block';
    constructor(
        public expression: ASTInterfaces.Expression,
        public instruction: ASTInterfaces.Instruction[]
    ) {}
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitBlock(this);
    }
}

export class PrimaryExprAri implements ASTInterfaces.PrimaryExprAri {
    readonly $type: 'PrimaryExprAri' = 'PrimaryExprAri';
    $container: ASTInterfaces.MultDiv;
    constructor(
        public className: ASTInterfaces.TypeClass,
        public container: ASTInterfaces.MultDiv,
        public type?: ASTInterfaces.TypeClass,
        public call?: ASTInterfaces.Call,
        public num?: ASTInterfaces.NumberType
    ) {
        this.$container=container;
        //this.type=type;
        this.call=call;
        this.num=num;
        }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitPrimaryExprAri(this);
    }
}

export class PrimaryExprBool implements ASTInterfaces.PrimaryExprBool {
    readonly $type: 'PrimaryExprBool' = 'PrimaryExprBool';
    $container: ASTInterfaces.Not;
    constructor(
        public className: ASTInterfaces.TypeClass,
        public container: ASTInterfaces.Not,
        public value?: ASTInterfaces.BooleanType,
        public call?: ASTInterfaces.Call
    ) {
        this.$container=container;
        this.value=value;
        this.call=call;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitPrimaryExprBool(this);
    }
}

export class PrimaryExprDistance implements ASTInterfaces.PrimaryExprDistance {
    readonly $type: 'PrimaryExprDistance' = 'PrimaryExprDistance';
    $container: ASTInterfaces.MultDivDistance;
    constructor(
        public className: ASTInterfaces.TypeClass,
        public container: ASTInterfaces.MultDivDistance,
        public dist : ASTInterfaces.DistanceExpression,
        public type?: ASTInterfaces.TypeClass,
        public call?: ASTInterfaces.Call,
        public num?: ASTInterfaces.NumberType
    ) {
        this.type=type;
        this.call=call;
        this.num=num;
        this.$container=container;
        this.dist=dist;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitPrimaryExprDistance(this);
    }
}

export class DeclarationVariable implements ASTInterfaces.DeclarationVariable {
    readonly $type: 'DeclarationVariable' = 'DeclarationVariable';
    constructor(
        public nom: string,
        public typeV: ASTInterfaces.TypeClass,
        public expressionbase: ASTInterfaces.ExpressionBase
    ) {
        this.nom=nom;
        this.typeV=typeV;
        this.expressionbase=expressionbase;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitDeclarationVariable(this);
    }
}

export class RotateCommand implements ASTInterfaces.RotateCommand {
    readonly $type: 'RotateCommand' = 'RotateCommand';
    constructor(
        public angle: number
    ) {
        this.angle=angle;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitRotateCommand(this);
    }
}

export class PlusMinusTime implements ASTInterfaces.PlusMinusTime {
    readonly $type: 'PlusMinusTime' = 'PlusMinusTime';
    constructor(
        public className: ASTInterfaces.TypeClass,
        public left :ASTInterfaces.MultDivTime,
        public right : ASTInterfaces.MultDivTime[],
        public operateur : string[]
    ) {
        this.left=left;
        this.right=right;
        this.operateur=operateur;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitPlusMinusTime(this);
    }
}

export class MultDivTime implements ASTInterfaces.MultDivTime {
    readonly $type: 'MultDivTime' = 'MultDivTime';
    $container: ASTInterfaces.PlusMinusTime;
    constructor(
        public className: ASTInterfaces.TypeClass,
        public left :ASTInterfaces.PrimaryExprTime,
        public right : ASTInterfaces.PrimaryExprTime[],
        public operateur : string[],
        public container: ASTInterfaces.PlusMinusTime
    ) {
        this.left=left;
        this.right=right;
        this.operateur=operateur;
        this.$container=container;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitMultDivTime(this);
    }
}

export class MultDivDistance implements ASTInterfaces.MultDivDistance {
    readonly $type: 'MultDivDistance' = 'MultDivDistance';
    $container: ASTInterfaces.PlusMinusDistance;
    constructor(
        public className: ASTInterfaces.TypeClass,
        public left :ASTInterfaces.PrimaryExprDistance,
        public right : ASTInterfaces.PrimaryExprDistance[] | ASTInterfaces.NumberType[],
        public operateur : string[],
        public container: ASTInterfaces.PlusMinusDistance
    ) {
        this.left=left;
        this.right=right;
        this.operateur=operateur;
        this.$container=container;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitMultDivDistance(this);
    }
}

export class PlusMinusDistance implements ASTInterfaces.PlusMinusDistance {
    readonly $type: 'PlusMinusDistance' = 'PlusMinusDistance';
    constructor(
        public className: ASTInterfaces.TypeClass,
        public left :ASTInterfaces.MultDivDistance,
        public right : ASTInterfaces.MultDivDistance[],
        public operateur : string[]
    ) {}
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitPlusMinusDistance(this);
    }
}

export class PlusMinus implements ASTInterfaces.PlusMinus {
    readonly $type: 'PlusMinus' = 'PlusMinus';
    constructor(
        public className: ASTInterfaces.TypeClass,
        public left :ASTInterfaces.MultDiv,
        public right : ASTInterfaces.MultDiv[],
        public operateur : string[]
    ) {
        this.left=left;
        this.right=right;
        this.operateur=operateur;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitPlusMinus(this);
    }
}

export class MultDiv implements ASTInterfaces.MultDiv {
    readonly $type: 'MultDiv' = 'MultDiv';
    $container: ASTInterfaces.PlusMinus;
    constructor(
        public className: ASTInterfaces.TypeClass,
        public left :ASTInterfaces.PrimaryExprAri,
        public right : ASTInterfaces.PrimaryExprAri[],
        public operateur : string[],
        public container: ASTInterfaces.PlusMinus
    ) {
        this.left=left;
        this.right=right;
        this.operateur=operateur;
        this.$container=container;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitMultDiv(this);
    }
}

export class NumberType implements ASTInterfaces.NumberType {
    readonly $type: 'NumberType' = 'NumberType';
    $container!: ASTInterfaces.DistanceExpression | ASTInterfaces.TimeExpression;
    constructor(
        public value: number
    ) {
        this.value=value;
    }
    setContainer(container: ASTInterfaces.DistanceExpression | ASTInterfaces.TimeExpression): void {
        this.$container = container;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitNumberType(this);
    }
}

export class BooleanType implements ASTInterfaces.BooleanType {
    readonly $type: 'BooleanType' = 'BooleanType';
    $container: ASTInterfaces.PrimaryExprBool;
    constructor(
        public value: boolean,
        public container: ASTInterfaces.PrimaryExprBool
    ) {
        this.value=value;
        this.$container=container;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitBooleanType(this);
    }
}

export class Affectation implements ASTInterfaces.Affectation {
    readonly $type: 'Affectation' = 'Affectation';
    constructor(
        public callVariable: ASTInterfaces.CallVariable,
        public expressionbase: ASTInterfaces.ExpressionBase,
        public className: ASTInterfaces.TypeClass
    ) {
        this.callVariable=callVariable;
        this.expressionbase=expressionbase;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitAffectation(this);
    }
}

export class CallFunction implements ASTInterfaces.CallFunction {
    readonly $type: 'CallFunction' = 'CallFunction';
    constructor(
        public nom: string,
        public parameters: ASTInterfaces.ExpressionBase[],
        public className: ASTInterfaces.TypeClass
    ) {
        this.nom=nom;
        this.parameters=parameters;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitCallFunction(this);
    }
}

export class CallVariable implements ASTInterfaces.CallVariable {
    readonly $type: 'CallVariable' = 'CallVariable';
    $container!: ASTInterfaces.Affectation;
    constructor(
        public nom: string,
        public className: ASTInterfaces.TypeClass
    ) {}
    setContainer(container: ASTInterfaces.Affectation): void {
        this.$container = container;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitCallVariable(this);
    }
}

export class TimeSensorCommand implements ASTInterfaces.TimeSensorCommand {
    readonly $type: 'TimeSensorCommand' = 'TimeSensorCommand';
    constructor(
    ) {}
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitTimeSensorCommand(this);
    }
}

export class DistanceSensorCommand implements ASTInterfaces.DistanceSensorCommand {
    readonly $type: 'DistanceSensorCommand' = 'DistanceSensorCommand';
    constructor(
    ) {}
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitDistanceSensorCommand(this);
    }
}

export class SpeedCommand implements ASTInterfaces.SpeedCommand {
    readonly $type: 'SpeedCommand' = 'SpeedCommand';
    constructor(
        public speed: ASTInterfaces.DistanceExpression
    ) {
        this.speed=speed;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitSpeedCommand(this);
    }
}

export class DirectionCommand implements ASTInterfaces.DirectionCommand {
    readonly $type: 'DirectionCommand' = 'DirectionCommand';
    constructor(
        public operateur : string,
        public distance: ASTInterfaces.DistanceExpression
    ) {
        this.operateur=operateur;
        this.distance=distance;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitDirectionCommand(this);
    }
}

export class Distance implements ASTInterfaces.Distance {
    readonly $type: 'Distance' = 'Distance';
    $container!: ASTInterfaces.DistanceExpression;
    constructor(
        public typeD: string,
        public container: ASTInterfaces.DistanceExpression
    ) {
        this.typeD=typeD;
        this.$container=container;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitDistance(this);
    }
}

export class Time implements ASTInterfaces.Time {
    readonly $type: 'Time' = 'Time';
    $container!: ASTInterfaces.TimeExpression;
    constructor(
    ) {}
    setContainer(container: ASTInterfaces.TimeExpression): void {
        this.$container = container;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitTime(this);
    }
}

export class DistanceExpression implements ASTInterfaces.DistanceExpression {
    readonly $type: 'DistanceExpression' = 'DistanceExpression';
    $container!: ASTInterfaces.DirectionCommand | ASTInterfaces.SpeedCommand;
    constructor(
        public number: ASTInterfaces.NumberType,
        public unit: ASTInterfaces.Distance
    ) {
        this.number=number;
        this.unit=unit;
    }
    setContainer(container: ASTInterfaces.DirectionCommand | ASTInterfaces.SpeedCommand): void {
        this.$container = container;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitDistanceExpression(this);
    }
}

export class PrimaryExprTime implements ASTInterfaces.PrimaryExprTime {
    readonly $type: 'PrimaryExprTime' = 'PrimaryExprTime';
    $container: ASTInterfaces.MultDivTime;
    constructor(
        public className: ASTInterfaces.TypeClass,
        public container: ASTInterfaces.MultDivTime,
        public num: ASTInterfaces.NumberType,
        public time: ASTInterfaces.TimeExpression,
        public call?: ASTInterfaces.Call
    ) {
        this.time=time;
        this.call=call;
        this.num=num;
        this.$container=container;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitPrimaryExprTime(this);
    }
}

export class TimeExpression implements ASTInterfaces.TimeExpression {
    readonly $type: 'TimeExpression' = 'TimeExpression';
    $container: ASTInterfaces.PrimaryExprTime;
    constructor(
        public container: ASTInterfaces.PrimaryExprTime,
        public number: ASTInterfaces.NumberType,
        public unit: ASTInterfaces.Time
    ) {
        this.number=number;
        this.unit=unit;
        this.$container=container;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitTimeExpression(this);
    }
}

export class Robot implements ASTInterfaces.Robot {
    readonly $type: 'Robot' = 'Robot';
    functions: ASTInterfaces.FunctionN[];
    constructor(
         functions: ASTInterfaces.FunctionN[]
    ) {
        this.functions=functions;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitRobot(this);
    }
}

export class Instruction implements ASTInterfaces.Instruction {
    readonly $type: 'Instruction' = 'Instruction';
    constructor(
    ) {}
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitInstruction(this);
    }
}

export class ExpressionBase implements ASTInterfaces.ExpressionBase {
    readonly $type: 'ExpressionBase' = 'ExpressionBase';
    constructor(
        public className: ASTInterfaces.TypeClass
    ) {}
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitExpressionBase(this);
    }
}

export class FunctionN implements ASTInterfaces.FunctionN {
    readonly $type: 'FunctionN' = 'FunctionN';
    $container!: ASTInterfaces.Robot;
    constructor(
        public name: string,
        public instruction: ASTInterfaces.Instruction[],
        public parameters: ASTInterfaces.Parameter[],
        container : ASTInterfaces.Robot,
        public returnType?: ASTInterfaces.TypeClass,
        public returnedValue?: ASTInterfaces.ExpressionBase,
    ) {
        this.name=name;
        this.instruction=instruction;
        this.parameters=parameters;
        this.returnType=returnType;
        this.returnedValue=returnedValue;
        this.$container=container;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitFunctionN(this);
    }
    setContainer(container: ASTInterfaces.Robot): void {
        this.$container = container;
    }
}

export class Parameter implements ASTInterfaces.Parameter {
    readonly $type: 'Parameter' = 'Parameter';
    $container: ASTInterfaces.FunctionN;
    constructor(
        public nom: string,
        public typeP: ASTInterfaces.TypeClass,
        public container: ASTInterfaces.FunctionN
    ) {
        this.nom=nom;
        this.typeP=typeP;
        this.$container=container;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitParameter(this);
    }
}

export function acceptNode(node: AstNode, visitor: RoboMLVisitor): any {
    switch (node.$type) {
        case 'FunctionN':
            return (node as FunctionN).accept(visitor);
        case 'Instruction':
            console.log("instruction");
            return (node as Instruction).accept(visitor);
        case 'DirectionCommand':
            console.log("direction");
            return (node as DirectionCommand).accept(visitor);
        case 'DistanceExpression':
            console.log("distanceEXP");
            return (node as DistanceExpression).accept(visitor);
        case 'Distance':
            console.log("distance");
            return (node as Distance).accept(visitor);
        case 'NumberType':
            console.log("number");
            return (node as NumberType).accept(visitor);
        case 'RotateCommand':
            console.log("rotate");
            return (node as RotateCommand).accept(visitor);
        case 'SpeedCommand':
            console.log("speed");
            return (node as SpeedCommand).accept(visitor);
        case 'Time':
            console.log("time");
            return (node as Time).accept(visitor);
        case 'TimeExpression':
            console.log("timeEXP");
            return (node as TimeExpression).accept(visitor);
        case 'DistanceSensorCommand':
            console.log("distSensor");
            return (node as DistanceSensorCommand).accept(visitor);
        case 'TimeSensorCommand':
            console.log("timeSensor");
            return (node as TimeSensorCommand).accept(visitor);
        case 'CallFunction':
            console.log("callFunction");
            return (node as CallFunction).accept(visitor);
        case 'CallVariable':
            console.log("callVariable");
            return (node as CallVariable).accept(visitor);
        case 'Affectation':
            console.log("affectation");
            return (node as Affectation).accept(visitor);
        case 'PrimaryExprBool':
            console.log("primaryExprBool");
            return (node as PrimaryExprBool).accept(visitor);
        case 'PrimaryExprAri':
            console.log("primaryExprAri");
            return (node as PrimaryExprAri).accept(visitor);
        case 'PrimaryExprDistance':
            console.log("primaryExprDistance");
            return (node as PrimaryExprDistance).accept(visitor);
        case 'PrimaryExprTime':
            console.log("primaryExprTime");
            return (node as PrimaryExprTime).accept(visitor);
        case 'MultDiv':
            console.log("multDiv");
            return (node as MultDiv).accept(visitor);
        case 'PlusMinus':
            console.log("plusMinus");
            return (node as PlusMinus).accept(visitor);
        case 'MultDivDistance':
            console.log("multDivDistance");
            return (node as MultDivDistance).accept(visitor);
        case 'PlusMinusDistance':
            console.log("plusMinusDistance");
            return (node as PlusMinusDistance).accept(visitor);
        case 'MultDivTime':
            console.log("multDivTime");
            return (node as MultDivTime).accept(visitor);
        case 'PlusMinusTime':
            console.log("plusMinusTime");
            return (node as PlusMinusTime).accept(visitor);
        case 'Equals':
            console.log("equals");
            return (node as Equals).accept(visitor);
        case 'Or':
            console.log("or");
            return (node as Or).accept(visitor);
        case 'And':
            console.log("and");
            return (node as And).accept(visitor);
        case 'Not':
            console.log("not");
            return (node as Not).accept(visitor);
        case 'Block':
            console.log("block");
            return (node as Block).accept(visitor);
        case 'DeclarationVariable':
            console.log("declarationVariable");
            return (node as DeclarationVariable).accept(visitor);
        case 'IF':
            console.log("if");
            return (node as IF).accept(visitor);
        case 'LOOP':
            console.log("loop");
            return (node as LOOP).accept(visitor);
        case 'Parameter':
            console.log("parameter");
            return (node as Parameter).accept(visitor);
        case 'BooleanType':
            console.log("booleanType");
            return (node as BooleanType).accept(visitor);
        case 'TypeClass':
            console.log("typeClass");
            return (node as TypeClass).accept(visitor);
        default:
            throw new Error(`Unknown node type ${node.$type}`);
    }
}