
interface Affectation extends ExpressionBase {
	expressionbase: ExpressionBase[]
	callvariable?: CallVariable
}

interface ExpressionBase extends Instruction {
}

interface Instruction {
}

interface CallVariable extends Call {
}

interface Call extends ExpressionBase {
}

interface ArithmetiqueExp extends Expression {
}

interface Expression extends ExpressionBase {
}

interface TypeClass {
}

interface BooleanExp extends Expression {
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

interface CallFunction extends Call {
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

interface CM extends Distance {
}

interface Distance extends TypeClass {
	distance?: number
}

interface mm extends Distance {
}

interface BooleanType extends TypeClass {
	value: boolean
}

interface NumberType extends TypeClass {
	value?: number
}

