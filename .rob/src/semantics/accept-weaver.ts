import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { RobotAstType } from '../language/generated/ast.js';
import * as InterfaceAST from '../language/generated/ast.js';
import * as ClassAST from './visitor.js';
import { RoboMLVisitor } from './visitor.js';
import type { RobotServices } from '../language/robot-module.js';

/**
 * Register custom validation checks.
 * TODO : Call this function in the language module.ts file (see registerValidationChecks(...);)
 */
export function weaveAcceptMethods(services: RobotServices) {
    const registry = services.validation.ValidationRegistry;
    const weaver = services.validation.RoboMlAcceptWeaver
    registry.register(weaver.checks, weaver);
}

/**
 * TODO :
 * You must implement a weaving function for each concrete concept of the language.
 * you will also need to fill the check data structure to map the weaving function to the Type of node
 */
export class RoboMlAcceptWeaver {
    weaveRobot(node : InterfaceAST.Robot, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitRobot(node as unknown as ClassAST.Robot);}
    }

    weaveInstruction(node : InterfaceAST.Instruction, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitInstruction(node as unknown as ClassAST.Instruction);}
    }

    weaveFunctionN(node : InterfaceAST.FunctionN, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitFunctionN(node as unknown as ClassAST.FunctionN);}
    }

    weaveExpressionBase(node : InterfaceAST.ExpressionBase, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitExpressionBase(node as unknown as ClassAST.ExpressionBase);}
    }

    weaveDistanceExpression(node : InterfaceAST.DistanceExpression, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitDistanceExpression(node as unknown as ClassAST.DistanceExpression);}
    }

    weaveTimeExpression(node : InterfaceAST.TimeExpression, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitTimeExpression(node as unknown as ClassAST.TimeExpression);}
    }

    weaveDistance(node : InterfaceAST.Distance, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitDistance(node as unknown as ClassAST.Distance);}
    }

    weaveTime(node : InterfaceAST.Time, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitTime(node as unknown as ClassAST.Time);}
    }

    weaveDirectionCommand(node : InterfaceAST.DirectionCommand, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitDirectionCommand(node as unknown as ClassAST.DirectionCommand);}
    }

    weaveSpeedCommand(node : InterfaceAST.SpeedCommand, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitSpeedCommand(node as unknown as ClassAST.SpeedCommand);}
    }

    weaveDistanceSensorCommand(node : InterfaceAST.DistanceSensorCommand, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitDistanceSensorCommand(node as unknown as ClassAST.DistanceSensorCommand);}
    }

    weaveTimeSensorCommand(node : InterfaceAST.TimeSensorCommand, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitTimeSensorCommand(node as unknown as ClassAST.TimeSensorCommand);}
    }

    weaveRotateCommand(node : InterfaceAST.RotateCommand, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitRotateCommand(node as unknown as ClassAST.RotateCommand);}
    }

    weaveCallVariable(node : InterfaceAST.CallVariable, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitCallVariable(node as unknown as ClassAST.CallVariable);}
    }

    weaveCallFunction(node : InterfaceAST.CallFunction, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitCallFunction(node as unknown as ClassAST.CallFunction);}
    }

    weaveAffectation(node : InterfaceAST.Affectation, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitAffectation(node as unknown as ClassAST.Affectation);}
    }

    weaveBooleanType(node : InterfaceAST.BooleanType, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitBooleanType(node as unknown as ClassAST.BooleanType);}
    }

    weaveNumberType(node : InterfaceAST.NumberType, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitNumberType(node as unknown as ClassAST.NumberType);}
    }

    weavePlusMinus(node : InterfaceAST.PlusMinus, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitPlusMinus(node as unknown as ClassAST.PlusMinus);}
    }

    weaveMultDiv(node : InterfaceAST.MultDiv, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitMultDiv(node as unknown as ClassAST.MultDiv);}
    }

    weavePlusMinusDistance(node : InterfaceAST.PlusMinusDistance, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitPlusMinusDistance(node as unknown as ClassAST.PlusMinusDistance);}
    }

    weaveMultDivDistance(node : InterfaceAST.MultDivDistance, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitMultDivDistance(node as unknown as ClassAST.MultDivDistance);}
    }

    weavePlusMinusTime(node : InterfaceAST.PlusMinusTime, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitPlusMinusTime(node as unknown as ClassAST.PlusMinusTime);}
    }

    weaveMultDivTime(node : InterfaceAST.MultDivTime, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitMultDivTime(node as unknown as ClassAST.MultDivTime);}
    }

    weaveDeclarationVariable(node : InterfaceAST.DeclarationVariable, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitDeclarationVariable(node as unknown as ClassAST.DeclarationVariable);}
    }

    weavePrimaryExprAri(node : InterfaceAST.PrimaryExprAri, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitPrimaryExprAri(node as unknown as ClassAST.PrimaryExprAri);}
    }

    weavePrimaryExprBool(node : InterfaceAST.PrimaryExprBool, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitPrimaryExprBool(node as unknown as ClassAST.PrimaryExprBool);}
    }

    weavePrimaryExprDistance(node : InterfaceAST.PrimaryExprDistance, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitPrimaryExprDistance(node as unknown as ClassAST.PrimaryExprDistance);}
    }

    weaveBlock(node : InterfaceAST.Block, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitBlock(node as unknown as ClassAST.Block);}
    }

    weaveIF(node : InterfaceAST.IF, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitIF(node as unknown as ClassAST.IF);}
    }

    weaveLOOP(node : InterfaceAST.LOOP, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitLOOP(node as unknown as ClassAST.LOOP);}
    }

    weaveAnd(node : InterfaceAST.And, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitAnd(node as unknown as ClassAST.And);}
    }

    weaveOr(node : InterfaceAST.Or, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitOr(node as unknown as ClassAST.Or);}
    }

    weaveNot(node : InterfaceAST.Not, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitNot(node as unknown as ClassAST.Not);}
    }

    weaveEquals(node : InterfaceAST.Equals, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitEquals(node as unknown as ClassAST.Equals);}
    }

    weaveExpression(node : InterfaceAST.Expression, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitExpression(node as unknown as ClassAST.Expression);}
    }

    weaveTypeClass(node : InterfaceAST.TypeClass, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitTypeClass(node as unknown as ClassAST.TypeClass);}
    }

    weaveBooleanExp(node : InterfaceAST.BooleanExp, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitBooleanExp(node as unknown as ClassAST.BooleanExp);}
    }

    weavePrimaryExprTime(node : InterfaceAST.PrimaryExprTime, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitPrimaryExprTime(node as unknown as ClassAST.PrimaryExprTime);}
    }

    weaveComparaisonAri(node : InterfaceAST.ComparaisonAri, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitComparaisonAri(node as unknown as ClassAST.ComparaisonAri);}
    }

    weaveComparaisonTime(node : InterfaceAST.ComparaisonTime, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitComparaisonTime(node as unknown as ClassAST.ComparaisonTime);}
    }

    weaveComparaisonDistance(node : InterfaceAST.ComparaisonDistance, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitComparaisonDistance(node as unknown as ClassAST.ComparaisonDistance);}
    }

    checks: ValidationChecks<RobotAstType> = {
        Robot: this.weaveRobot,
        PrimaryExprTime: this.weavePrimaryExprTime,
        BooleanExp: this.weaveBooleanExp
        ,TypeClass: this.weaveTypeClass
        ,Expression: this.weaveExpression
        ,Instruction: this.weaveInstruction
        ,FunctionN: this.weaveFunctionN
        ,ExpressionBase: this.weaveExpressionBase
        ,DistanceExpression: this.weaveDistanceExpression
        ,TimeExpression: this.weaveTimeExpression
        ,Distance: this.weaveDistance
        ,Time: this.weaveTime
        ,DirectionCommand: this.weaveDirectionCommand
        ,SpeedCommand: this.weaveSpeedCommand
        ,DistanceSensorCommand: this.weaveDistanceSensorCommand
        ,TimeSensorCommand: this.weaveTimeSensorCommand
        ,RotateCommand: this.weaveRotateCommand
        ,CallVariable: this.weaveCallVariable
        ,CallFunction: this.weaveCallFunction
        ,Affectation: this.weaveAffectation
        ,BooleanType: this.weaveBooleanType
        ,NumberType: this.weaveNumberType
        ,PlusMinus: this.weavePlusMinus
        ,MultDiv: this.weaveMultDiv
        ,PlusMinusDistance: this.weavePlusMinusDistance
        ,MultDivDistance: this.weaveMultDivDistance
        ,PlusMinusTime: this.weavePlusMinusTime
        ,MultDivTime: this.weaveMultDivTime
        ,DeclarationVariable: this.weaveDeclarationVariable
        ,PrimaryExprAri: this.weavePrimaryExprAri
        ,PrimaryExprBool: this.weavePrimaryExprBool
        ,PrimaryExprDistance: this.weavePrimaryExprDistance
        ,Block: this.weaveBlock
        ,IF: this.weaveIF
        ,LOOP: this.weaveLOOP
        ,And: this.weaveAnd
        ,Or: this.weaveOr
        ,Not: this.weaveNot
        ,Equals: this.weaveEquals
        ,ComparaisonAri: this.weaveComparaisonAri
        ,ComparaisonTime: this.weaveComparaisonTime
        ,ComparaisonDistance: this.weaveComparaisonDistance
    };
}