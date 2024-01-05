
interface Robot {
	functions: FunctionN[]
}

interface FunctionN {
	name: string
	instruction: Instruction[]
	parameters: Parameter[]
	returnType?: TypeClass
	returnedValue?: ExpressionBase
}

interface Instruction {
}

interface TypeClass {
	typeT : string
}

interface Type {

}
interface Distance extends Type {
	typeD : string
}

interface Time extends Type {
}

interface Parameter {
	typeP: TypeClass
	nom: string
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
	expr1: Expression
	expr2: Expression
	operateur : string
}

interface ExpressionBase extends Instruction {
}

interface Call extends ExpressionBase {
}

interface BooleanExp extends Expression {
}

interface RotateCommand extends Command {
	angle: number
}

interface Command extends Instruction {
}

interface DirectionCommand extends Command {
	distance: DistanceExpression
	operateur : string
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
	expr: NumberType | CallVariable | CallFunction
}

interface PrimaryExprDistance extends Expression {
	^type?: TypeClass
	expr: DistanceExpression | CallVariable | CallFunction
}

interface PrimaryExprTime extends Expression {
	^type?: TypeClass
	expr: TimeExpression | CallVariable | CallFunction
}

interface DeclarationVariable extends Instruction {
	nom: string
	expressionbase: ExpressionBase
	^type: TypeClass
}

interface LOOP extends Block {
}

interface Block extends Instruction {
	instruction: Instruction[]
	expression: Expression
	instructionElse ? : Instruction[]
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
	expressionbase: ExpressionBase
	callvariable: CallVariable
}

interface PrimaryExprBool extends Expression {
	^type?: TypeClass
	expr: BooleanType | CallVariable | CallFunction
}

interface And extends Expression {
}

interface Or extends Expression {
}

interface Not extends Expression {
}

interface Equals extends Expression {
}

interface ComparaisonAri extends Expression {
}

interface ComparaisonDistance extends Expression {
}

interface ComparaisonTime extends Expression {
}

interface CM extends Distance {
}

interface Mm extends Distance {
}

interface BooleanType extends Type {
	value: boolean
}

interface NumberType extends Type{
	value: number
}

