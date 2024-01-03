
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

interface Type {

}
interface TypeClass {
	typeT : string
}

interface Distance extends Type {
	typeD: string
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
	left : MultDiv
	right : MultDiv[]
	operateur : string[]
}

interface MultDiv extends Expression {
	left : PrimaryExprAri
	right : PrimaryExprAri[]
	operateur : string[]
}

interface PlusMinusDistance extends Expression {
	left: MultDivDistance
	right: MultDivDistance[]
	operateur : string[]
}

interface MultDivDistance extends Expression {
	left:PrimaryExprDistance
	operateur: string []
	right : PrimaryExprDistance[] | NumberType[]
}

interface PlusMinusTime extends Expression {
	left : MultDivTime
	right : MultDivTime[]
	operateur : string[]
}

interface MultDivTime extends Expression {
	left:PrimaryExprTime
	right:PrimaryExprTime[]
	operateur:string[]
}

interface PrimaryExprTime extends Expression{
	call ? : Call
	time : TimeExpression
	operateur? :string
	num:NumberType

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
	call?: Call
	num ? : NumberType
}

interface PrimaryExprDistance extends Expression {
	^type?: TypeClass
	call?: Call
	num ? : NumberType
	dist :DistanceExpression
}

interface DeclarationVariable extends Instruction {
	nom: string
	expressionbase: ExpressionBase
	typeV: TypeClass
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
	expressionbase: ExpressionBase
	callVariable: CallVariable
}

interface PrimaryExprBool extends BooleanExp {
	call?: Call
	value?: BooleanType
}

interface And extends Expression {
	left: Not
	right: Not[]
}

interface Or extends Expression {
	left: And
	right: And[]
}

interface Not extends Expression {
	not : Not
	or : Or
	exp :PrimaryExprBool
}

interface Equals extends Expression {
	right: Or
	left: Or
	operateur: string
}

interface BooleanType extends Type {
	value: boolean
}

interface NumberType extends Type {
	value: number
}

