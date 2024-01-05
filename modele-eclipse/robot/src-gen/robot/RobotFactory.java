/**
 */
package robot;

import org.eclipse.emf.ecore.EFactory;

/**
 * <!-- begin-user-doc -->
 * The <b>Factory</b> for the model.
 * It provides a create method for each non-abstract class of the model.
 * <!-- end-user-doc -->
 * @see robot.RobotPackage
 * @generated
 */
public interface RobotFactory extends EFactory {
	/**
	 * The singleton instance of the factory.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	RobotFactory eINSTANCE = robot.impl.RobotFactoryImpl.init();

	/**
	 * Returns a new object of class '<em>Robot</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Robot</em>'.
	 * @generated
	 */
	Robot createRobot();

	/**
	 * Returns a new object of class '<em>Function</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Function</em>'.
	 * @generated
	 */
	Function createFunction();

	/**
	 * Returns a new object of class '<em>Instruction</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Instruction</em>'.
	 * @generated
	 */
	Instruction createInstruction();

	/**
	 * Returns a new object of class '<em>Rotate Command</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Rotate Command</em>'.
	 * @generated
	 */
	RotateCommand createRotateCommand();

	/**
	 * Returns a new object of class '<em>Direction Command</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Direction Command</em>'.
	 * @generated
	 */
	DirectionCommand createDirectionCommand();

	/**
	 * Returns a new object of class '<em>Speed Command</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Speed Command</em>'.
	 * @generated
	 */
	SpeedCommand createSpeedCommand();

	/**
	 * Returns a new object of class '<em>CM</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>CM</em>'.
	 * @generated
	 */
	CM createCM();

	/**
	 * Returns a new object of class '<em>mm</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>mm</em>'.
	 * @generated
	 */
	mm createmm();

	/**
	 * Returns a new object of class '<em>Read Sensor Command</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Read Sensor Command</em>'.
	 * @generated
	 */
	ReadSensorCommand createReadSensorCommand();

	/**
	 * Returns a new object of class '<em>Distance Sensor Command</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Distance Sensor Command</em>'.
	 * @generated
	 */
	DistanceSensorCommand createDistanceSensorCommand();

	/**
	 * Returns a new object of class '<em>Time Sensor Command</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Time Sensor Command</em>'.
	 * @generated
	 */
	TimeSensorCommand createTimeSensorCommand();

	/**
	 * Returns a new object of class '<em>Arithmetique Exp</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Arithmetique Exp</em>'.
	 * @generated
	 */
	ArithmetiqueExp createArithmetiqueExp();

	/**
	 * Returns a new object of class '<em>Boolean Exp</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Boolean Exp</em>'.
	 * @generated
	 */
	BooleanExp createBooleanExp();

	/**
	 * Returns a new object of class '<em>Plus</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Plus</em>'.
	 * @generated
	 */
	Plus createPlus();

	/**
	 * Returns a new object of class '<em>Minus</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Minus</em>'.
	 * @generated
	 */
	Minus createMinus();

	/**
	 * Returns a new object of class '<em>Mult</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Mult</em>'.
	 * @generated
	 */
	Mult createMult();

	/**
	 * Returns a new object of class '<em>Div</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Div</em>'.
	 * @generated
	 */
	Div createDiv();

	/**
	 * Returns a new object of class '<em>Primary Expr Ari</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Primary Expr Ari</em>'.
	 * @generated
	 */
	PrimaryExprAri createPrimaryExprAri();

	/**
	 * Returns a new object of class '<em>Secondary Exp Ari</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Secondary Exp Ari</em>'.
	 * @generated
	 */
	SecondaryExpAri createSecondaryExpAri();

	/**
	 * Returns a new object of class '<em>Declaration Variable</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Declaration Variable</em>'.
	 * @generated
	 */
	DeclarationVariable createDeclarationVariable();

	/**
	 * Returns a new object of class '<em>LOOP</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>LOOP</em>'.
	 * @generated
	 */
	LOOP createLOOP();

	/**
	 * Returns a new object of class '<em>IF</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>IF</em>'.
	 * @generated
	 */
	IF createIF();

	/**
	 * Returns a new object of class '<em>Call Variable</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Call Variable</em>'.
	 * @generated
	 */
	CallVariable createCallVariable();

	/**
	 * Returns a new object of class '<em>Call Function</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Call Function</em>'.
	 * @generated
	 */
	CallFunction createCallFunction();

	/**
	 * Returns a new object of class '<em>Affectation</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Affectation</em>'.
	 * @generated
	 */
	Affectation createAffectation();

	/**
	 * Returns a new object of class '<em>Primary Expr Bool</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Primary Expr Bool</em>'.
	 * @generated
	 */
	PrimaryExprBool createPrimaryExprBool();

	/**
	 * Returns a new object of class '<em>Secondary Exp Bool</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Secondary Exp Bool</em>'.
	 * @generated
	 */
	SecondaryExpBool createSecondaryExpBool();

	/**
	 * Returns a new object of class '<em>And</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>And</em>'.
	 * @generated
	 */
	And createAnd();

	/**
	 * Returns a new object of class '<em>Or</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Or</em>'.
	 * @generated
	 */
	Or createOr();

	/**
	 * Returns a new object of class '<em>Not</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Not</em>'.
	 * @generated
	 */
	Not createNot();

	/**
	 * Returns a new object of class '<em>Equals</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Equals</em>'.
	 * @generated
	 */
	Equals createEquals();

	/**
	 * Returns a new object of class '<em>Boolean Type</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Boolean Type</em>'.
	 * @generated
	 */
	BooleanType createBooleanType();

	/**
	 * Returns a new object of class '<em>Number Type</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Number Type</em>'.
	 * @generated
	 */
	NumberType createNumberType();

	/**
	 * Returns a new object of class '<em>ELSE</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>ELSE</em>'.
	 * @generated
	 */
	ELSE createELSE();

	/**
	 * Returns the package supported by this factory.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the package supported by this factory.
	 * @generated
	 */
	RobotPackage getRobotPackage();

} //RobotFactory
