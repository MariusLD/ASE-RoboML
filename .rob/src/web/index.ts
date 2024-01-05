import { AstNode, LangiumServices, LangiumDocument } from "langium";
import { URI } from "vscode-uri";
import { EmptyFileSystem } from "langium";
import { createRobotServices } from '../language/robot-module.js';
import { Robot } from "../semantics/visitor.js";
import { generateCommands } from '../generator/generator.js';
import chalk from "chalk";
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



async function extractDocument(code: string, services: LangiumServices): Promise<LangiumDocument> {
    const doc = services.shared.workspace.LangiumDocumentFactory.fromString(code, URI.parse('memory://minilogo.document'));
    await services.shared.workspace.DocumentBuilder.build([doc], { validation: true });

    const validationErrors = (doc.diagnostics ?? []).filter(e => e.severity === 1);
    if (validationErrors.length > 0) {
        const errors = validationErrors.map(validationError =>
            `line ${validationError.range.start.line + 1}: ${validationError.message} [${doc.textDocument.getText(validationError.range)}]`
        );

        console.error(chalk.red('There are validation errors:'));
        errors.forEach(error => console.error(chalk.red(error)));

        throw new Error(errors.join('\n'));
    }

    return doc;
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

export async function parseAndValidate(code:string) : Promise<string[]>{
    const services = createRobotServices(EmptyFileSystem).Robot;
    const document = await extractDocument(code, services);
    const parseResult = document.parseResult;
    if (parseResult.lexerErrors.length === 0 && 
        parseResult.parserErrors.length === 0
    ) {
        console.log(chalk.green(`validated successfully`));
        return [];
        //return Promise.resolve(["Parsed and validated successfully!"]);
    } else {
        let errors: string[] = [];
        if(parseResult.lexerErrors.length > 0) {
            const lexerMessage = parseResult.lexerErrors.map(lexerError =>
                `${(lexerError.line) ? "line " + lexerError.line + 1 : ""}: ${lexerError.message}`
            );
            errors = errors.concat(lexerMessage);
        }
        if(parseResult.parserErrors.length > 0) {
            const parserMessage = parseResult.parserErrors.map(parserError =>
                `${parserError.message}`
            );
            errors = errors.concat(parserMessage);
        }
        console.log(chalk.red(`Failed to validate!`));
        return errors;
    }
       // return Promise.resolve(["Failed to parse and validate!"]);
}
