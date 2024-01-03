
import chalk from 'chalk';
import { Command } from 'commander';
//import { RobotLanguageMetaData } from '../language/generated/module.js';
import { createRobotServices } from '../language/robot-module.js';
//import { extractAstNode } from './cli-util.js';
//import { generateJavaScript } from './generator.js';
import { NodeFileSystem } from 'langium/node';
//import { Robot } from '../language/generated/ast.js'
//import { Robot } from '../semantics/visitor.js';
import { extractDocument } from './cli-util.js';
//import { extractDestinationAndName } from './cli-util.js';
//import path from 'path';
//import fs from 'fs';
//import { generateCommands } from '../generator/generator.js';
/*
export const generateAction = async (fileName: string, opts: GenerateOptions): Promise<void> => {
    const services = createRobotServices(NodeFileSystem).Robot;
    const model = await extractAstNode<Robot>(fileName, services);

    // invoke generator to get commands
    const cmds = generateCommands(model);

    // handle file related functionality here now
    const data = extractDestinationAndName(fileName, opts.destination);
    const generatedFilePath = `${path.join(data.destination, data.name)}.json`;
    if (!fs.existsSync(data.destination)) {
        fs.mkdirSync(data.destination, { recursive: true });
    }
    fs.writeFileSync(generatedFilePath, JSON.stringify(cmds, undefined, 2));

    console.log(chalk.green(`MiniLogo commands generated successfully: ${generatedFilePath}`));
};
*/
/**
 * Parse and validate a program written in our language.
 * Verifies that no lexer or parser errors occur.
 * Implicitly also checks for validation errors while extracting the document
 *
 * @param fileName Program to validate
 */
export const parseAndValidate = async (fileName: string): Promise<void> => {
    // retrieve the services for our language
    console.log("bonjour");
    const services = createRobotServices(NodeFileSystem).Robot;
    // extract a document for our program
    const document = await extractDocument(fileName, services);
    // extract the parse result details
    const parseResult = document.parseResult;
    // verify no lexer, parser, or general diagnostic errors show up
    if (parseResult.lexerErrors.length === 0 && 
        parseResult.parserErrors.length === 0
    ) {
        console.log(chalk.green(`Parsed and validated ${fileName} successfully!`));
    } else {
        console.log(chalk.red(`Failed to parse and validate ${fileName}!`));
    }
};

export type GenerateOptions = {
    destination?: string;
}

export default function(): void {
    const program = new Command();

    program
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        //.version(require('../../package.json').version);

    //const fileExtensions = RobotLanguageMetaData.fileExtensions.join(', ');
   /* program
        .command('generate')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .option('-d, --destination <dir>', 'destination directory of generating')
        .description('generates JavaScript code that prints "Hello, {name}!" for each greeting in a source file')
        .action(generateAction);
    */
    program
        .command('parseAndValidate')
        .argument('<file>', 'Source file to parse & validate (ending in ${fileExtensions})')
        .description('Indicates where a program parses & validates successfully, but produces no output code')
        .action(parseAndValidate);
    program.parse(process.argv);
}
