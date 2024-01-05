import type { ValidationAcceptor, ValidationChecks } from 'langium';
import * as ASTGen from './generated/ast.js';
import type { RobotServices } from './robot-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: RobotServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.RobotValidator;
    const checks: ValidationChecks<ASTGen.RobotAstType> = {
        Robot: validator.checkRobot,
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class RobotValidator {

    functionVariableMap: Map<string, Set<string>> = new Map();

    checkRobot(ast: ASTGen.Robot, accept: ValidationAcceptor) {
        this.traverseFunctionDeclarations(ast, accept);
        this.traverseFunctionCalls(ast, accept);
        this.checkReturn(ast, accept);
    }

    traverseFunctionDeclarations(ast: ASTGen.Robot, accept: ValidationAcceptor) {
        ast.functions.forEach((functionN) => {
            const functionVariables = new Set<string>();
            functionN.parameters.forEach((parameter) => {
                if (!functionVariables.has(parameter.nom)){
                    functionVariables.add(parameter.nom);
                } else {
                    accept('error', 'Parameters\' name should be different.', { node: parameter, property: 'nom' });
                }
            });
            this.functionVariableMap.set(functionN.name, functionVariables);
        });
    }

    checkCall(callNode: ASTGen.ExpressionBase, functionVariables: Set<string>, accept: ValidationAcceptor){
        switch(callNode.$type){
            case 'CallVariable':
                const callVariable = callNode as ASTGen.CallVariable;
                if (!functionVariables.has(callVariable.nom)){
                    accept('error', 'Variable not declared.', { node: callVariable, property: 'nom' });
                }
                break;
            case 'CallFunction':
                const callFunction = callNode as ASTGen.CallFunction;
                if (!this.functionVariableMap.has(callFunction.nom)){
                    accept('error', 'Function not declared.', { node: callFunction, property: 'nom' });
                } else {
                    callFunction.parameters.forEach((parameter) => {
                        this.checkCall(parameter, functionVariables, accept);
                    });
                }
                break;
            case 'Expression':
                const expression = callNode as ASTGen.Expression;
                this.checkExpression(expression, functionVariables, accept);
                break;
        }
    }

    traverseFunctionCalls(ast: ASTGen.Robot, accept: ValidationAcceptor) {
        ast.functions.forEach((functionN) => {
            functionN.instruction.forEach((instruction) => {
                const functionVariables = this.functionVariableMap.get(functionN.name);
                if (functionVariables === undefined) {
                    accept('error', 'Function not declared.', { node: functionN, property: 'name' });
                } else {
                    this.traverseInstructions(instruction, functionVariables, accept);
                }
            });
        });
    }

    traverseInstructions(instruction: ASTGen.Instruction, functionVariables: Set<string>, accept: ValidationAcceptor) {
        switch (instruction.$type) {
            case 'DeclarationVariable':
                const declaration = instruction as ASTGen.DeclarationVariable;
                if (!functionVariables.has(declaration.nom)){
                    this.checkCall(declaration.expressionbase, functionVariables, accept);
                    functionVariables.add(declaration.nom);
                } else {
                    accept('error', 'Variable already declared.', { node: declaration, property: 'nom' });
                }
                break;
            case 'Affectation':
                const affectation = instruction as ASTGen.Affectation;
                if (!functionVariables.has(affectation.callvariable.nom)){
                    accept('error', 'Variable not declared.', { node: affectation });
                }
                this.checkCall(affectation.expressionbase, functionVariables, accept);
                break;
            case 'LOOP':
                const loop = instruction as ASTGen.LOOP;
                this.checkCall(loop.expression, functionVariables, accept);
                loop.instruction.forEach((instructionB) => {
                    this.traverseInstructions(instructionB, functionVariables, accept);
                });
                break;
            case 'IF':
                const ifLoop = instruction as ASTGen.IF;
                this.checkCall(ifLoop.expression, functionVariables, accept);
                ifLoop.instruction.forEach((instructionB) => {
                    this.traverseInstructions(instructionB, functionVariables, accept);
                });
                break;
        }
    }

    checkReturn(ast: ASTGen.Robot, accept: ValidationAcceptor) {
        ast.functions.forEach((functionN) => {
            const hasReturn = functionN.returnType !== undefined;
            const hasReturnedValue = functionN.returnedValue !== undefined;
            if (hasReturn !== hasReturnedValue){
                if (hasReturn){
                    accept('error', `Function should have a return value.`, { node: functionN, property: 'name' });
                } else {
                    accept('error', `Function should not have a return value.`, { node: functionN, property: 'name' });
                }
            } else if (hasReturn){
                this.checkCall(functionN.returnedValue!, this.functionVariableMap.get(functionN.name) as Set<string>, accept);
            }
        });
    }

    // This first version of the validator could not be done because of the complexicity of type checking. After concerting other groups, we decided to do a simpler version of the validator.

    /*
    
    checkFunctionReturnType(functionN: ASTGen.FunctionN, accept: ValidationAcceptor){
        if (declaredFunctions.includes(functionN.name)){
            accept('error', 'Function ${functionN.name} already declared', { node: functionN, property: 'name' });
        } else if (functionN.return && !isTypeClassOfType(functionN.return, 'void')){
            const returnType = functionN.return.$type;
            if (functionN.returnedValue && isTypeClassOfType(functionN.returnedValue.className, returnType)) {
                    accept('error', 'The return must be of type ${returnType}', { node: functionN, property: 'instruction' });
            }
        } else if (functionN.return && isTypeClassOfType(functionN.return, 'void') && functionN.returnedValue){
            accept('error', 'You should not have a return', { node: functionN, property: 'instruction' });
        }
        declaredFunctions.push(functionN.name);
        const paramTypes: string[] = [];
        functionN.parameters.forEach(param => {
            paramTypes.push(param.type.$type);
        });
        declaredParams[functionN.name] = paramTypes;
    }
    checkCallVariable(callVariable: ASTGen.CallVariable, accept: ValidationAcceptor){
        if (!declaredVariables.includes(callVariable.nom)){
            accept('error', 'Variable ${callVariable.name} not declared', { node: callVariable, property: 'nom' });
        }
    }
    checkCallFunction(callFunction: ASTGen.CallFunction, accept: ValidationAcceptor){
        if (!declaredFunctions.includes(callFunction.nom)){
            accept('error', 'Function ${callFunction.name} not declared', { node: callFunction, property: 'nom' });
        } else if (callFunction.parameters.length != declaredParams[callFunction.nom].length){
            accept('error', 'Function ${callFunction.name} has ${declaredParams[callFunction.nom].length} parameters', { node: callFunction, property: 'nom' });
        } else if (callFunction.parameters.length > 0){
            for (let i = 0; i < callFunction.parameters.length; i++){
                if (!isTypeClassOfType(callFunction.parameters[i].className, declaredParams[callFunction.nom][i])){
                    accept('error', 'Function ${callFunction.name} has ${declaredParams[callFunction.nom][i]} as parameter', { node: callFunction, property: 'nom' });
                }
            }
        }
    }
    checkWhileLoop(loop: ASTGen.LOOP, accept: ValidationAcceptor){
        if (isTypeClassOfType(loop.expression.className, 'boolean')){
            accept('error', 'The expression must be of type boolean', { node: loop, property: 'expression' });
        }
    }
    checkIfLoop(ifLoop: ASTGen.IF, accept: ValidationAcceptor){
        if (isTypeClassOfType(ifLoop.expression.className, 'boolean')){
            accept('error', 'The expression must be of type boolean', { node: ifLoop, property: 'expression' });
        }
    }
    */

    checkExpression(ast: ASTGen.Expression, functionVariables: Set<string>, accept: ValidationAcceptor){
        switch (ast.$type) {
            case 'Expression':
                const expression = ast as ASTGen.Expression;
                this.checkExpression(expression.expr1, functionVariables, accept);
                this.checkExpression(expression.expr2, functionVariables, accept);
                break;
            case 'And':
                const and = ast as ASTGen.And;
                this.checkExpression(and.expr1, functionVariables, accept);
                this.checkExpression(and.expr2, functionVariables, accept);
                break;
            case 'Or':
                const or = ast as ASTGen.Or;
                this.checkExpression(or.expr1, functionVariables, accept);
                this.checkExpression(or.expr2, functionVariables, accept);
                break;
            case 'Equals':
                const equals = ast as ASTGen.Equals;
                this.checkExpression(equals.expr1, functionVariables, accept);
                this.checkExpression(equals.expr2, functionVariables, accept);
                break;
            case 'ComparaisonAri':
                const comparaisonAri = ast as ASTGen.ComparaisonAri;
                this.checkExpression(comparaisonAri.expr1, functionVariables, accept);
                this.checkExpression(comparaisonAri.expr2, functionVariables, accept);
                break;
            case 'ComparaisonDistance':
                const comparaisonDistance = ast as ASTGen.ComparaisonDistance;
                this.checkExpression(comparaisonDistance.expr1, functionVariables, accept);
                this.checkExpression(comparaisonDistance.expr2, functionVariables, accept);
                break;
            case 'ComparaisonTime':
                const comparaisonTime = ast as ASTGen.ComparaisonTime;
                this.checkExpression(comparaisonTime.expr1, functionVariables, accept);
                this.checkExpression(comparaisonTime.expr2, functionVariables, accept);
                break;
            case 'PrimaryExprBool':
                const primaryExprBool = ast as ASTGen.PrimaryExprBool;
                switch(primaryExprBool.expr.$type){
                    case 'CallVariable':
                        const callVariable = primaryExprBool.expr as ASTGen.CallVariable;
                        if (!functionVariables.has(callVariable.nom)){
                            accept('error', 'Variable not declared.', { node: callVariable, property: 'nom' });
                        }
                        break;
                    case 'CallFunction':
                        const callFunction = primaryExprBool.expr as ASTGen.CallFunction;
                        if (!this.functionVariableMap.has(callFunction.nom)){
                            accept('error', 'Function not declared.', { node: callFunction, property: 'nom' });
                        } else {
                            callFunction.parameters.forEach((parameter) => {
                                this.checkCall(parameter, functionVariables, accept);
                            });
                        }
                        break;
                }
                break;    
            case 'PlusMinus':
                const plusMinus = ast as ASTGen.PlusMinus;
                this.checkExpression(plusMinus.expr1, functionVariables, accept);
                this.checkExpression(plusMinus.expr2, functionVariables, accept);
                break;
            case 'MultDiv':
                const multDiv = ast as ASTGen.MultDiv;
                this.checkExpression(multDiv.expr1, functionVariables, accept);
                this.checkExpression(multDiv.expr1, functionVariables, accept);
                break;
            case 'PlusMinusDistance':
                const plusMinusDistance = ast as ASTGen.PlusMinusDistance;
                this.checkExpression(plusMinusDistance.expr1, functionVariables, accept);
                this.checkExpression(plusMinusDistance.expr2, functionVariables, accept);
                break;
            case 'MultDivDistance':
                const multDivDistance = ast as ASTGen.MultDivDistance;
                this.checkExpression(multDivDistance.expr1, functionVariables, accept);
                this.checkExpression(multDivDistance.expr2, functionVariables, accept);
                break;
            case 'PlusMinusTime':
                const plusMinusTime = ast as ASTGen.PlusMinusTime;
                this.checkExpression(plusMinusTime.expr1, functionVariables, accept);
                this.checkExpression(plusMinusTime.expr2, functionVariables, accept);
                break;
            case 'MultDivTime':
                const multDivTime = ast as ASTGen.MultDivTime;
                this.checkExpression(multDivTime.expr1, functionVariables, accept);
                this.checkExpression(multDivTime.expr2, functionVariables, accept);
                break;
            case 'PrimaryExprTime':
                const primaryExprTime = ast as ASTGen.PrimaryExprTime;
                switch(primaryExprTime.expr.$type){
                    case 'CallVariable':
                        const callVariable = primaryExprTime.expr as ASTGen.CallVariable;
                        if (!functionVariables.has(callVariable.nom)){
                            accept('error', 'Variable not declared.', { node: callVariable, property: 'nom' });
                        }
                        break;
                    case 'CallFunction':
                        const callFunction = primaryExprTime.expr as ASTGen.CallFunction;
                        if (!this.functionVariableMap.has(callFunction.nom)){
                            accept('error', 'Function not declared.', { node: callFunction, property: 'nom' });
                        } else {
                            callFunction.parameters.forEach((parameter) => {
                                this.checkCall(parameter, functionVariables, accept);
                            });
                        }
                        break;
                }
                break;
            case 'PrimaryExprDistance':
                const primaryExprDistance = ast as ASTGen.PrimaryExprDistance;
                switch(primaryExprDistance.expr.$type){
                    case 'CallVariable':
                        const callVariable = primaryExprDistance.expr as ASTGen.CallVariable;
                        if (!functionVariables.has(callVariable.nom)){
                            accept('error', 'Variable not declared.', { node: callVariable, property: 'nom' });
                        }
                        break;
                    case 'CallFunction':
                        const callFunction = primaryExprDistance.expr as ASTGen.CallFunction;
                        if (!this.functionVariableMap.has(callFunction.nom)){
                            accept('error', 'Function not declared.', { node: callFunction, property: 'nom' });
                        } else {
                            callFunction.parameters.forEach((parameter) => {
                                this.checkCall(parameter, functionVariables, accept);
                            });
                        }
                        break;
                }
                break;
            case 'PrimaryExprAri':
                const primaryExprAri = ast as ASTGen.PrimaryExprAri;
                switch(primaryExprAri.expr.$type){
                    case 'CallVariable':
                        const callVariable = primaryExprAri.expr as ASTGen.CallVariable;
                        if (!functionVariables.has(callVariable.nom)){
                            accept('error', 'Variable not declared.', { node: callVariable, property: 'nom' });
                        }
                        break;
                    case 'CallFunction':
                        const callFunction = primaryExprAri.expr as ASTGen.CallFunction;
                        if (!this.functionVariableMap.has(callFunction.nom)){
                            accept('error', 'Function not declared.', { node: callFunction, property: 'nom' });
                        } else {
                            callFunction.parameters.forEach((parameter) => {
                                this.checkCall(parameter, functionVariables, accept);
                            });
                        }
                        break;
                }
                break;
        }
    }
}
