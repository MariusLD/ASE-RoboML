/**
 */
package robot.impl;

import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EDataType;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.EPackage;

import org.eclipse.emf.ecore.impl.EFactoryImpl;

import org.eclipse.emf.ecore.plugin.EcorePlugin;

import robot.Affectation;
import robot.And;
import robot.ArithmetiqueExp;
import robot.BooleanExp;
import robot.CM;
import robot.CallFunction;
import robot.CallVariable;
import robot.DeclarationVariable;
import robot.Direction;
import robot.DirectionCommand;
import robot.DistanceSensorCommand;
import robot.Div;
import robot.ELSE;
import robot.Equals;
import robot.Function;
import robot.IF;
import robot.Instruction;
import robot.LOOP;
import robot.Minus;
import robot.Mult;
import robot.Not;
import robot.Or;
import robot.Plus;
import robot.PrimaryExprAri;
import robot.PrimaryExprBool;
import robot.ReadSensorCommand;
import robot.Robot;
import robot.RobotFactory;
import robot.RobotPackage;
import robot.RotateCommand;
import robot.SecondaryExpAri;
import robot.SecondaryExpBool;
import robot.SpeedCommand;
import robot.TimeSensorCommand;
import robot.mm;

/**
 * <!-- begin-user-doc -->
 * An implementation of the model <b>Factory</b>.
 * <!-- end-user-doc -->
 * @generated
 */
public class RobotFactoryImpl extends EFactoryImpl implements RobotFactory {
	/**
	 * Creates the default factory implementation.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public static RobotFactory init() {
		try {
			RobotFactory theRobotFactory = (RobotFactory) EPackage.Registry.INSTANCE.getEFactory(RobotPackage.eNS_URI);
			if (theRobotFactory != null) {
				return theRobotFactory;
			}
		} catch (Exception exception) {
			EcorePlugin.INSTANCE.log(exception);
		}
		return new RobotFactoryImpl();
	}

	/**
	 * Creates an instance of the factory.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public RobotFactoryImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public EObject create(EClass eClass) {
		switch (eClass.getClassifierID()) {
		case RobotPackage.ROBOT:
			return createRobot();
		case RobotPackage.FUNCTION:
			return createFunction();
		case RobotPackage.INSTRUCTION:
			return createInstruction();
		case RobotPackage.ROTATE_COMMAND:
			return createRotateCommand();
		case RobotPackage.DIRECTION_COMMAND:
			return createDirectionCommand();
		case RobotPackage.SPEED_COMMAND:
			return createSpeedCommand();
		case RobotPackage.CM:
			return createCM();
		case RobotPackage.MM:
			return createmm();
		case RobotPackage.READ_SENSOR_COMMAND:
			return createReadSensorCommand();
		case RobotPackage.DISTANCE_SENSOR_COMMAND:
			return createDistanceSensorCommand();
		case RobotPackage.TIME_SENSOR_COMMAND:
			return createTimeSensorCommand();
		case RobotPackage.ARITHMETIQUE_EXP:
			return createArithmetiqueExp();
		case RobotPackage.BOOLEAN_EXP:
			return createBooleanExp();
		case RobotPackage.PLUS:
			return createPlus();
		case RobotPackage.MINUS:
			return createMinus();
		case RobotPackage.MULT:
			return createMult();
		case RobotPackage.DIV:
			return createDiv();
		case RobotPackage.PRIMARY_EXPR_ARI:
			return createPrimaryExprAri();
		case RobotPackage.SECONDARY_EXP_ARI:
			return createSecondaryExpAri();
		case RobotPackage.DECLARATION_VARIABLE:
			return createDeclarationVariable();
		case RobotPackage.LOOP:
			return createLOOP();
		case RobotPackage.IF:
			return createIF();
		case RobotPackage.CALL_VARIABLE:
			return createCallVariable();
		case RobotPackage.CALL_FUNCTION:
			return createCallFunction();
		case RobotPackage.AFFECTATION:
			return createAffectation();
		case RobotPackage.PRIMARY_EXPR_BOOL:
			return createPrimaryExprBool();
		case RobotPackage.SECONDARY_EXP_BOOL:
			return createSecondaryExpBool();
		case RobotPackage.AND:
			return createAnd();
		case RobotPackage.OR:
			return createOr();
		case RobotPackage.NOT:
			return createNot();
		case RobotPackage.EQUALS:
			return createEquals();
		case RobotPackage.BOOLEAN:
			return createBoolean();
		case RobotPackage.NUMBER:
			return createNumber();
		case RobotPackage.ELSE:
			return createELSE();
		default:
			throw new IllegalArgumentException("The class '" + eClass.getName() + "' is not a valid classifier");
		}
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Object createFromString(EDataType eDataType, String initialValue) {
		switch (eDataType.getClassifierID()) {
		case RobotPackage.DIRECTION:
			return createDirectionFromString(eDataType, initialValue);
		default:
			throw new IllegalArgumentException("The datatype '" + eDataType.getName() + "' is not a valid classifier");
		}
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public String convertToString(EDataType eDataType, Object instanceValue) {
		switch (eDataType.getClassifierID()) {
		case RobotPackage.DIRECTION:
			return convertDirectionToString(eDataType, instanceValue);
		default:
			throw new IllegalArgumentException("The datatype '" + eDataType.getName() + "' is not a valid classifier");
		}
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Robot createRobot() {
		RobotImpl robot = new RobotImpl();
		return robot;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Function createFunction() {
		FunctionImpl function = new FunctionImpl();
		return function;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Instruction createInstruction() {
		InstructionImpl instruction = new InstructionImpl();
		return instruction;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public RotateCommand createRotateCommand() {
		RotateCommandImpl rotateCommand = new RotateCommandImpl();
		return rotateCommand;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public DirectionCommand createDirectionCommand() {
		DirectionCommandImpl directionCommand = new DirectionCommandImpl();
		return directionCommand;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public SpeedCommand createSpeedCommand() {
		SpeedCommandImpl speedCommand = new SpeedCommandImpl();
		return speedCommand;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public CM createCM() {
		CMImpl cm = new CMImpl();
		return cm;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public mm createmm() {
		mmImpl mm = new mmImpl();
		return mm;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public ReadSensorCommand createReadSensorCommand() {
		ReadSensorCommandImpl readSensorCommand = new ReadSensorCommandImpl();
		return readSensorCommand;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public DistanceSensorCommand createDistanceSensorCommand() {
		DistanceSensorCommandImpl distanceSensorCommand = new DistanceSensorCommandImpl();
		return distanceSensorCommand;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public TimeSensorCommand createTimeSensorCommand() {
		TimeSensorCommandImpl timeSensorCommand = new TimeSensorCommandImpl();
		return timeSensorCommand;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public ArithmetiqueExp createArithmetiqueExp() {
		ArithmetiqueExpImpl arithmetiqueExp = new ArithmetiqueExpImpl();
		return arithmetiqueExp;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public BooleanExp createBooleanExp() {
		BooleanExpImpl booleanExp = new BooleanExpImpl();
		return booleanExp;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Plus createPlus() {
		PlusImpl plus = new PlusImpl();
		return plus;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Minus createMinus() {
		MinusImpl minus = new MinusImpl();
		return minus;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Mult createMult() {
		MultImpl mult = new MultImpl();
		return mult;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Div createDiv() {
		DivImpl div = new DivImpl();
		return div;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public PrimaryExprAri createPrimaryExprAri() {
		PrimaryExprAriImpl primaryExprAri = new PrimaryExprAriImpl();
		return primaryExprAri;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public SecondaryExpAri createSecondaryExpAri() {
		SecondaryExpAriImpl secondaryExpAri = new SecondaryExpAriImpl();
		return secondaryExpAri;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public DeclarationVariable createDeclarationVariable() {
		DeclarationVariableImpl declarationVariable = new DeclarationVariableImpl();
		return declarationVariable;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public LOOP createLOOP() {
		LOOPImpl loop = new LOOPImpl();
		return loop;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public IF createIF() {
		IFImpl if_ = new IFImpl();
		return if_;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public CallVariable createCallVariable() {
		CallVariableImpl callVariable = new CallVariableImpl();
		return callVariable;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public CallFunction createCallFunction() {
		CallFunctionImpl callFunction = new CallFunctionImpl();
		return callFunction;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Affectation createAffectation() {
		AffectationImpl affectation = new AffectationImpl();
		return affectation;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public PrimaryExprBool createPrimaryExprBool() {
		PrimaryExprBoolImpl primaryExprBool = new PrimaryExprBoolImpl();
		return primaryExprBool;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public SecondaryExpBool createSecondaryExpBool() {
		SecondaryExpBoolImpl secondaryExpBool = new SecondaryExpBoolImpl();
		return secondaryExpBool;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public And createAnd() {
		AndImpl and = new AndImpl();
		return and;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Or createOr() {
		OrImpl or = new OrImpl();
		return or;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Not createNot() {
		NotImpl not = new NotImpl();
		return not;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Equals createEquals() {
		EqualsImpl equals = new EqualsImpl();
		return equals;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public robot.Boolean createBoolean() {
		BooleanImpl boolean_ = new BooleanImpl();
		return boolean_;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public robot.Number createNumber() {
		NumberImpl number = new NumberImpl();
		return number;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public ELSE createELSE() {
		ELSEImpl else_ = new ELSEImpl();
		return else_;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public Direction createDirectionFromString(EDataType eDataType, String initialValue) {
		Direction result = Direction.get(initialValue);
		if (result == null)
			throw new IllegalArgumentException(
					"The value '" + initialValue + "' is not a valid enumerator of '" + eDataType.getName() + "'");
		return result;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public String convertDirectionToString(EDataType eDataType, Object instanceValue) {
		return instanceValue == null ? null : instanceValue.toString();
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public RobotPackage getRobotPackage() {
		return (RobotPackage) getEPackage();
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @deprecated
	 * @generated
	 */
	@Deprecated
	public static RobotPackage getPackage() {
		return RobotPackage.eINSTANCE;
	}

} //RobotFactoryImpl
