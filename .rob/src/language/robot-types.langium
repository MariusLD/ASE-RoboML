
interface Robot {
	function: Function[]
}

interface Function {
	instruction: Instruction[]
	parameters: TypeClass[]
	return?: TypeClass
}

interface Instruction {
}

interface TypeClass {
}

interface Distance extends TypeClass {
	distance?: number
}

interface ArithmetiqueExp extends Expression {
}

interface Expression extends ExpressionBase {
}

interface ExpressionBase extends Instruction {
}

interface Call extends ExpressionBase {
}

interface BooleanExp extends Expression {
}

interface RotateCommand extends Command {
	angle?: number
}

interface Command extends Instruction {
}

interface DirectionCommand extends Command {
	distance: Distance
}

interface SpeedCommand extends Command {
	speed?: number
}

interface ReadSensorCommand extends Command {
}

interface DistanceSensorCommand extends ReadSensorCommand {
}

interface TimeSensorCommand extends ReadSensorCommand {
}

interface Plus extends SecondaryExpAri {
}

interface SecondaryExpAri extends ArithmetiqueExp {
	right: ArithmetiqueExp[]
	left: ArithmetiqueExp
}

interface Minus extends SecondaryExpAri {
}

interface Mult extends SecondaryExpAri {
}

interface Div extends SecondaryExpAri {
}

interface PrimaryExprAri extends ArithmetiqueExp {
	^type?: TypeClass
	call?: Call
}

interface DeclarationVariable extends Instruction {
	nom?: string
	expressionbase?: ExpressionBase
	^type: TypeClass
}

interface LOOP extends Block {
}

interface Block extends Instruction {
	instruction: Instruction[]
	expression: Expression
}

interface IF extends Block {
}

interface CallVariable extends Call {
}

interface CallFunction extends Call {
}

interface Affectation extends ExpressionBase {
	expressionbase: ExpressionBase[]
	callvariable?: CallVariable
}

interface PrimaryExprBool extends BooleanExp {
	^type?: TypeClass
	call?: Call
}

interface SecondaryExpBool extends BooleanExp {
	right: BooleanExp[]
	left: BooleanExp
}

interface And extends SecondaryExpBool {
}

interface Or extends SecondaryExpBool {
}

interface Not extends SecondaryExpBool {
}

interface Equals extends SecondaryExpBool {
}

interface ELSE extends Block {
}

interface CM extends Distance {
}

interface mm extends Distance {
}

interface BooleanType extends TypeClass {
	value: boolean
}

interface NumberType extends TypeClass {
	value?: number
}

