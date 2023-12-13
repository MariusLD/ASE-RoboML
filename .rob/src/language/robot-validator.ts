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
        DeclarationVariable: validator.checkDeclarationVariable,
        FunctionN: validator.checkFunctionReturnType,
        LOOP: validator.checkWhileLoop,
        IF: validator.checkIfLoop,
        CallVariable: validator.checkCallVariable,
        CallFunction: validator.checkCallFunction

    };
    registry.register(checks, validator);
}

const declaredVariables: string[] = [];
const declaredFunctions: string[] = [];
const declaredParams: { [key: string]: string[] } = {};

/**
 * Implementation of custom validations.
 */
export class RobotValidator {
    checkDeclarationVariable(declarationVariable: ASTGen.DeclarationVariable, accept: ValidationAcceptor): void {
        const allowedTypes = ['boolean', 'distance', 'time', 'number', 'void'];
        for (const type of allowedTypes) {
            if (isTypeClassOfType(declarationVariable.type, type)) {
                if (!(declarationVariable.expressionbase.className, type)) {
                    accept('error', 'The expression must be of type ${type}', { node: declarationVariable, property: 'expressionbase' });
                }
            }
        }
        if (declaredVariables.includes(declarationVariable.nom)) {
            accept('error', 'Variable ${declarationVariable.name} already declared', { node: declarationVariable, property: 'nom' });
        }
        declaredVariables.push(declarationVariable.nom);
    }
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
}

function isTypeClassOfType(typeClass: ASTGen.TypeClass, typeName: string): boolean {
    return typeClass.$type === typeName;
}
