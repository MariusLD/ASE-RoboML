import type { Robot } from '../semantics/visitor.js';
import { MyVisitor } from '../semantics/interpreter.js';
/**
 * Generates simple drawing commands from a MiniLogo Model
 * @param model Model to generate commmands from
 * @returns Generated commands that captures the program's drawing intent
 */
export function generateCommands(model: Robot, sceneWidth:number, sceneHeight:number): Object[] {
    const visitor = new MyVisitor(sceneWidth,sceneHeight);
    return model.accept(visitor);
}

