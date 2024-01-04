import { AstNode, LangiumServices } from "langium";
import { URI } from "vscode-uri";
import { EmptyFileSystem } from "langium";
import { createRobotServices } from '../language/robot-module.js';
import { Robot } from "../semantics/visitor.js";
import { generateCommands } from '../generator/generator.js';

/**
 * Extracts an AST node from a virtual document, represented as a string
 * @param content Content to create virtual document from
 * @param services For constructing & building a virtual document
 * @returns A promise for the parsed result of the document
 */
 async function extractAstNodeFromString<T extends AstNode>(content: string, services: LangiumServices): Promise<T> {
    // create a document from a string instead of a file
    const doc = services.shared.workspace.LangiumDocumentFactory.fromString(content, URI.parse('memory://robot.document'));
    // proceed with build & validation
    await services.shared.workspace.DocumentBuilder.build([doc],{ validation: true}/*, { validationChecks: 'all' }*/);
    // get the parse result (root of our AST)
    return doc.parseResult?.value as T;
}


/**
 * Parses a MiniLogo program & generates output as a list of Objects
 * @param miniLogoProgram MiniLogo program to parse
 * @returns Generated output from this MiniLogo program
 */
export async function parseAndGenerate (value: any): Promise<Object[]> {
    const code = value[0];
    const sceneWidth = value[1];
    const sceneHeight = value[2];

    const services = createRobotServices(EmptyFileSystem).Robot;
    const model = await extractAstNodeFromString<Robot>(code, services);
    // generate mini logo drawing commands from the model
    const cmds = generateCommands(model,sceneWidth,sceneHeight);
    return Promise.resolve(cmds);
}
