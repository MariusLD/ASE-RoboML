
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

interface Call extends ExpressionBase {
}

interface ExpressionBase extends Instruction {
}

interface Expression extends ExpressionBase {
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

interface DistanceSensorCommand extends ReadSensorCommand {
}

interface ReadSensorCommand extends Command {
}

interface TimeSensorCommand extends ReadSensorCommand {
}

interface BooleanExp extends Expression {
}

interface PlusMinus extends Expression {
}

interface MultDiv extends Expression {
}

interface PrimaryExprAri extends Expression {
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

interface And extends BooleanExp {
}

interface Or extends BooleanExp {
}

interface Not extends BooleanExp {
}

interface Equals extends BooleanExp {
}

interface PlusMinusDistance extends Expression {
}

interface MultDivDistance extends Expression {
}

interface PrimaryExprDistance extends Expression {
	distance?: Distance
}

interface PlusMinusTime extends Expression {
}

interface MultDiveTime extends Expression {
}

interface PrimaryExprTime extends Expression {
	time?: Time
}

interface Time extends TypeClass {
	value?: number
}

interface ComparaisonDistance extends Expression {
}

interface ComparaisonTime extends Expression {
}

interface ComparaisonAri extends Expression {
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

