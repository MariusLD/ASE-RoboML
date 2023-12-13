
interface Robot {
	function: FunctionN[]
}

interface FunctionN {
	name: string
	instruction: Instruction[]
	parameters: Parameter[]
	return?: TypeClass
	returnedValue?: ExpressionBase
}

interface Parameter {
	name: string
	^type: TypeClass
}

interface Instruction {
}

interface TypeClass {
}

interface Distance extends TypeClass {
}

interface Time extends TypeClass {
}

interface DistanceExpression {
	number: NumberType
	unit: Distance
}

interface TimeExpression {
	number: NumberType
	unit: Time
}

interface PlusMinus extends Expression {
}

interface MultDiv extends Expression {
}

interface PlusMinusDistance extends Expression {
}

interface MultDivDistance extends Expression {
}

interface PlusMinusTime extends Expression {
}

interface MultDivTime extends Expression {
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
	distance: DistanceExpression
}

interface SpeedCommand extends Command {
	speed?: DistanceExpression
}

interface ReadSensorCommand extends Command {
}

interface DistanceSensorCommand extends ReadSensorCommand {
}

interface TimeSensorCommand extends ReadSensorCommand {
}

interface PrimaryExprAri extends Expression {
	^type?: TypeClass
	call?: Call
}

interface PrimaryExprDistance extends Expression {
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
	nom: string
}

interface CallFunction extends Call {
	nom: string
	parameters: ExpressionBase[]
}

interface Affectation extends ExpressionBase {
	expressionbase: ExpressionBase[]
	callvariable?: CallVariable
}

interface PrimaryExprBool extends BooleanExp {
	^type?: TypeClass
	call?: Call
}

interface And extends Expression {
}

interface Or extends Expression {
}

interface Not extends Expression {
}

interface Equals extends Expression {
}

interface ELSE extends Block {
}

interface CM extends Distance {
}

interface Mm extends Distance {
}

interface BooleanType extends TypeClass {
	value: boolean
}

interface NumberType extends TypeClass {
	value: number
}

