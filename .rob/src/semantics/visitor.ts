import * as ASTInterfaces from '../language/generated/ast.js';
//import { Reference } from 'langium';

export interface RoboMLVisitor{
    // TODO : create one visit method for each concept of the language
    visitRobot(node: ASTInterfaces.Robot): any;
    visitInstruction(node: ASTInterfaces.Instruction): any;
    visitFunctionN(node: ASTInterfaces.FunctionN): any;
    visitExpressionBase(node: ASTInterfaces.ExpressionBase): any;
    visitDistanceExpression(node: ASTInterfaces.DistanceExpression): any;
    visitTimeExpression(node: ASTInterfaces.TimeExpression): any;
    visitDistance(node: ASTInterfaces.Distance): any;
    visitTime(node: ASTInterfaces.Time): any;
    visitDirectionCommand(node: ASTInterfaces.DirectionCommand): any;
    visitSpeedCommand(node: ASTInterfaces.SpeedCommand): any;
    visitDistanceSensorCommand(node: ASTInterfaces.DistanceSensorCommand): any;
    visitTimeSensorCommand(node: ASTInterfaces.TimeSensorCommand): any;
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
        public className: ASTInterfaces.TypeClass
    ) {}
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitEquals(this);
    }
}

export class Not implements ASTInterfaces.Not {
    readonly $type: 'Not' = 'Not';
    constructor(
        public className: ASTInterfaces.TypeClass
    ) {}
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitNot(this);
    }
}

export class Or implements ASTInterfaces.Or {
    readonly $type: 'Or' = 'Or';
    constructor(
        public className: ASTInterfaces.TypeClass
    ) {}
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitOr(this);
    }
}

export class And implements ASTInterfaces.And {
    readonly $type: 'And' = 'And';
    constructor(
        public className: ASTInterfaces.TypeClass
    ) {}
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
    constructor(
        public className: ASTInterfaces.TypeClass,
        public type?: ASTInterfaces.TypeClass,
        public call?: ASTInterfaces.Call
    ) {}
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitPrimaryExprAri(this);
    }
}

export class PrimaryExprBool implements ASTInterfaces.PrimaryExprBool {
    readonly $type: 'PrimaryExprBool' = 'PrimaryExprBool';
    constructor(
        public className: ASTInterfaces.TypeClass,
        public type?: ASTInterfaces.TypeClass,
        public call?: ASTInterfaces.Call
    ) {}
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitPrimaryExprBool(this);
    }
}

export class PrimaryExprDistance implements ASTInterfaces.PrimaryExprDistance {
    readonly $type: 'PrimaryExprDistance' = 'PrimaryExprDistance';
    constructor(
        public className: ASTInterfaces.TypeClass,
        public type?: ASTInterfaces.TypeClass,
        public call?: ASTInterfaces.Call
    ) {}
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitPrimaryExprDistance(this);
    }
}

export class DeclarationVariable implements ASTInterfaces.DeclarationVariable {
    readonly $type: 'DeclarationVariable' = 'DeclarationVariable';
    constructor(
        public nom: string,
        public type: ASTInterfaces.TypeClass,
        public expressionbase: ASTInterfaces.ExpressionBase
    ) {}
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitDeclarationVariable(this);
    }
}

export class RotateCommand implements ASTInterfaces.RotateCommand {
    readonly $type: 'RotateCommand' = 'RotateCommand';
    constructor(
        public angle?: number
    ) {}
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitRotateCommand(this);
    }
}

export class PlusMinusTime implements ASTInterfaces.PlusMinusTime {
    readonly $type: 'PlusMinusTime' = 'PlusMinusTime';
    constructor(
        public className: ASTInterfaces.TypeClass
    ) {}
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitPlusMinusTime(this);
    }
}

export class MultDivTime implements ASTInterfaces.MultDivTime {
    readonly $type: 'MultDivTime' = 'MultDivTime';
    constructor(
        public className: ASTInterfaces.TypeClass
    ) {}
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitMultDivTime(this);
    }
}

export class MultDivDistance implements ASTInterfaces.MultDivDistance {
    readonly $type: 'MultDivDistance' = 'MultDivDistance';
    constructor(
        public className: ASTInterfaces.TypeClass
    ) {}
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitMultDivDistance(this);
    }
}

export class PlusMinusDistance implements ASTInterfaces.PlusMinusDistance {
    readonly $type: 'PlusMinusDistance' = 'PlusMinusDistance';
    constructor(
        public className: ASTInterfaces.TypeClass
    ) {}
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitPlusMinusDistance(this);
    }
}

export class PlusMinus implements ASTInterfaces.PlusMinus {
    readonly $type: 'PlusMinus' = 'PlusMinus';
    constructor(
        public className: ASTInterfaces.TypeClass
    ) {}
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitPlusMinus(this);
    }
}

export class MultDiv implements ASTInterfaces.MultDiv {
    readonly $type: 'MultDiv' = 'MultDiv';
    constructor(
        public className: ASTInterfaces.TypeClass
    ) {}
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitMultDiv(this);
    }
}

export class NumberType implements ASTInterfaces.NumberType {
    readonly $type: 'NumberType' = 'NumberType';
    $container!: ASTInterfaces.DistanceExpression | ASTInterfaces.TimeExpression;
    constructor(
        public value: number
    ) {}
    setContainer(container: ASTInterfaces.DistanceExpression | ASTInterfaces.TimeExpression): void {
        this.$container = container;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitNumberType(this);
    }
}

export class BooleanType implements ASTInterfaces.BooleanType {
    readonly $type: 'BooleanType' = 'BooleanType';
    constructor(
        public value: ASTInterfaces.EBoolean
    ) {}
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitBooleanType(this);
    }
}

export class Affectation implements ASTInterfaces.Affectation {
    readonly $type: 'Affectation' = 'Affectation';
    constructor(
        public callVariable: ASTInterfaces.CallVariable,
        public expressionbase: ASTInterfaces.ExpressionBase[],
        public className: ASTInterfaces.TypeClass
    ) {}
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
    ) {}
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
    ) {}
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitSpeedCommand(this);
    }
}

export class DirectionCommand implements ASTInterfaces.DirectionCommand {
    readonly $type: 'DirectionCommand' = 'DirectionCommand';
    constructor(
        public distance: ASTInterfaces.DistanceExpression
    ) {}
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitDirectionCommand(this);
    }
}

export class Distance implements ASTInterfaces.Distance {
    readonly $type: 'Distance' = 'Distance';
    constructor(
    ) {}
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
    ) {}
    setContainer(container: ASTInterfaces.DirectionCommand | ASTInterfaces.SpeedCommand): void {
        this.$container = container;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitDistanceExpression(this);
    }
}

export class TimeExpression implements ASTInterfaces.TimeExpression {
    readonly $type: 'TimeExpression' = 'TimeExpression';
    constructor(
        public number: ASTInterfaces.NumberType,
        public unit: ASTInterfaces.Time
    ) {}
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitTimeExpression(this);
    }
}

export class Robot implements ASTInterfaces.Robot {
    readonly $type: 'Robot' = 'Robot';
    constructor(
        public functions: ASTInterfaces.FunctionN[]
    ) {}
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
        public returnType?: ASTInterfaces.TypeClass,
        public returnedValue?: ASTInterfaces.ExpressionBase
    ) {}
    setContainer(container: ASTInterfaces.Robot): void {
        this.$container = container;
    }
    accept(visitor: RoboMLVisitor): any {
        return visitor.visitFunctionN(this);
    }
}