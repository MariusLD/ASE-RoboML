import { Robot, Instruction, FunctionN, ExpressionBase, DistanceExpression, TimeExpression, Distance, Time, DirectionCommand, SpeedCommand, DistanceSensorCommand, TimeSensorCommand, RotateCommand, CallVariable, CallFunction, Affectation, BooleanType, NumberType, PlusMinus, MultDiv, PlusMinusDistance, MultDivDistance, PlusMinusTime, MultDivTime, DeclarationVariable, PrimaryExprAri, PrimaryExprBool, PrimaryExprDistance, Block, IF, LOOP, And, Or, Not, Equals } from '../language/generated/ast.js';
import * as ASTClasses from './visitor.js';

export class MyVisitor implements ASTClasses.RoboMLVisitor {
    visitRobot(node: Robot) {
        throw new Error('Method not implemented.');
    }
    visitInstruction(node: Instruction) {
        throw new Error('Method not implemented.');
    }
    visitFunctionN(node: FunctionN) {
        throw new Error('Method not implemented.');
    }
    visitExpressionBase(node: ExpressionBase) {
        throw new Error('Method not implemented.');
    }
    visitDistanceExpression(node: DistanceExpression) {
        throw new Error('Method not implemented.');
    }
    visitTimeExpression(node: TimeExpression) {
        throw new Error('Method not implemented.');
    }
    visitDistance(node: Distance) {
        throw new Error('Method not implemented.');
    }
    visitTime(node: Time) {
        throw new Error('Method not implemented.');
    }
    visitDirectionCommand(node: DirectionCommand) {
        throw new Error('Method not implemented.');
    }
    visitSpeedCommand(node: SpeedCommand) {
        throw new Error('Method not implemented.');
    }
    visitDistanceSensorCommand(node: DistanceSensorCommand) {
        throw new Error('Method not implemented.');
    }
    visitTimeSensorCommand(node: TimeSensorCommand) {
        throw new Error('Method not implemented.');
    }
    visitRotateCommand(node: RotateCommand) {
        throw new Error('Method not implemented.');
    }
    visitCallVariable(node: CallVariable) {
        throw new Error('Method not implemented.');
    }
    visitCallFunction(node: CallFunction) {
        throw new Error('Method not implemented.');
    }
    visitAffectation(node: Affectation) {
        throw new Error('Method not implemented.');
    }
    visitBooleanType(node: BooleanType) {
        throw new Error('Method not implemented.');
    }
    visitNumberType(node: NumberType) {
        throw new Error('Method not implemented.');
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
        throw new Error('Method not implemented.');
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
}