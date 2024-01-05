/**
 */
package robot;

import org.eclipse.emf.ecore.EAttribute;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EEnum;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.EReference;

/**
 * <!-- begin-user-doc -->
 * The <b>Package</b> for the model.
 * It contains accessors for the meta objects to represent
 * <ul>
 *   <li>each class,</li>
 *   <li>each feature of each class,</li>
 *   <li>each operation of each class,</li>
 *   <li>each enum,</li>
 *   <li>and each data type</li>
 * </ul>
 * <!-- end-user-doc -->
 * @see robot.RobotFactory
 * @model kind="package"
 * @generated
 */
public interface RobotPackage extends EPackage {
	/**
	 * The package name.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	String eNAME = "robot";

	/**
	 * The package namespace URI.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	String eNS_URI = "http://www.example.org/robot";

	/**
	 * The package namespace name.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	String eNS_PREFIX = "robot";

	/**
	 * The singleton instance of the package.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	RobotPackage eINSTANCE = robot.impl.RobotPackageImpl.init();

	/**
	 * The meta object id for the '{@link robot.impl.RobotImpl <em>Robot</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.RobotImpl
	 * @see robot.impl.RobotPackageImpl#getRobot()
	 * @generated
	 */
	int ROBOT = 0;

	/**
	 * The feature id for the '<em><b>Function</b></em>' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int ROBOT__FUNCTION = 0;

	/**
	 * The number of structural features of the '<em>Robot</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int ROBOT_FEATURE_COUNT = 1;

	/**
	 * The number of operations of the '<em>Robot</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int ROBOT_OPERATION_COUNT = 0;

	/**
	 * The meta object id for the '{@link robot.impl.FunctionImpl <em>Function</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.FunctionImpl
	 * @see robot.impl.RobotPackageImpl#getFunction()
	 * @generated
	 */
	int FUNCTION = 1;

	/**
	 * The feature id for the '<em><b>Instruction</b></em>' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int FUNCTION__INSTRUCTION = 0;

	/**
	 * The feature id for the '<em><b>Parameters</b></em>' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int FUNCTION__PARAMETERS = 1;

	/**
	 * The feature id for the '<em><b>Return</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int FUNCTION__RETURN = 2;

	/**
	 * The number of structural features of the '<em>Function</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int FUNCTION_FEATURE_COUNT = 3;

	/**
	 * The number of operations of the '<em>Function</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int FUNCTION_OPERATION_COUNT = 0;

	/**
	 * The meta object id for the '{@link robot.impl.InstructionImpl <em>Instruction</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.InstructionImpl
	 * @see robot.impl.RobotPackageImpl#getInstruction()
	 * @generated
	 */
	int INSTRUCTION = 2;

	/**
	 * The number of structural features of the '<em>Instruction</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int INSTRUCTION_FEATURE_COUNT = 0;

	/**
	 * The number of operations of the '<em>Instruction</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int INSTRUCTION_OPERATION_COUNT = 0;

	/**
	 * The meta object id for the '{@link robot.impl.CommandImpl <em>Command</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.CommandImpl
	 * @see robot.impl.RobotPackageImpl#getCommand()
	 * @generated
	 */
	int COMMAND = 3;

	/**
	 * The number of structural features of the '<em>Command</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int COMMAND_FEATURE_COUNT = INSTRUCTION_FEATURE_COUNT + 0;

	/**
	 * The number of operations of the '<em>Command</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int COMMAND_OPERATION_COUNT = INSTRUCTION_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.RotateCommandImpl <em>Rotate Command</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.RotateCommandImpl
	 * @see robot.impl.RobotPackageImpl#getRotateCommand()
	 * @generated
	 */
	int ROTATE_COMMAND = 4;

	/**
	 * The feature id for the '<em><b>Angle</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int ROTATE_COMMAND__ANGLE = COMMAND_FEATURE_COUNT + 0;

	/**
	 * The number of structural features of the '<em>Rotate Command</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int ROTATE_COMMAND_FEATURE_COUNT = COMMAND_FEATURE_COUNT + 1;

	/**
	 * The number of operations of the '<em>Rotate Command</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int ROTATE_COMMAND_OPERATION_COUNT = COMMAND_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.DirectionCommandImpl <em>Direction Command</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.DirectionCommandImpl
	 * @see robot.impl.RobotPackageImpl#getDirectionCommand()
	 * @generated
	 */
	int DIRECTION_COMMAND = 5;

	/**
	 * The feature id for the '<em><b>Distance</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int DIRECTION_COMMAND__DISTANCE = COMMAND_FEATURE_COUNT + 0;

	/**
	 * The number of structural features of the '<em>Direction Command</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int DIRECTION_COMMAND_FEATURE_COUNT = COMMAND_FEATURE_COUNT + 1;

	/**
	 * The number of operations of the '<em>Direction Command</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int DIRECTION_COMMAND_OPERATION_COUNT = COMMAND_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.SpeedCommandImpl <em>Speed Command</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.SpeedCommandImpl
	 * @see robot.impl.RobotPackageImpl#getSpeedCommand()
	 * @generated
	 */
	int SPEED_COMMAND = 6;

	/**
	 * The feature id for the '<em><b>Speed</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int SPEED_COMMAND__SPEED = COMMAND_FEATURE_COUNT + 0;

	/**
	 * The number of structural features of the '<em>Speed Command</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int SPEED_COMMAND_FEATURE_COUNT = COMMAND_FEATURE_COUNT + 1;

	/**
	 * The number of operations of the '<em>Speed Command</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int SPEED_COMMAND_OPERATION_COUNT = COMMAND_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.TypeClassImpl <em>Type Class</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.TypeClassImpl
	 * @see robot.impl.RobotPackageImpl#getTypeClass()
	 * @generated
	 */
	int TYPE_CLASS = 7;

	/**
	 * The number of structural features of the '<em>Type Class</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int TYPE_CLASS_FEATURE_COUNT = 0;

	/**
	 * The number of operations of the '<em>Type Class</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int TYPE_CLASS_OPERATION_COUNT = 0;

	/**
	 * The meta object id for the '{@link robot.impl.DistanceImpl <em>Distance</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.DistanceImpl
	 * @see robot.impl.RobotPackageImpl#getDistance()
	 * @generated
	 */
	int DISTANCE = 8;

	/**
	 * The feature id for the '<em><b>Distance</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int DISTANCE__DISTANCE = TYPE_CLASS_FEATURE_COUNT + 0;

	/**
	 * The number of structural features of the '<em>Distance</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int DISTANCE_FEATURE_COUNT = TYPE_CLASS_FEATURE_COUNT + 1;

	/**
	 * The number of operations of the '<em>Distance</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int DISTANCE_OPERATION_COUNT = TYPE_CLASS_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.CMImpl <em>CM</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.CMImpl
	 * @see robot.impl.RobotPackageImpl#getCM()
	 * @generated
	 */
	int CM = 9;

	/**
	 * The feature id for the '<em><b>Distance</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int CM__DISTANCE = DISTANCE__DISTANCE;

	/**
	 * The number of structural features of the '<em>CM</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int CM_FEATURE_COUNT = DISTANCE_FEATURE_COUNT + 0;

	/**
	 * The number of operations of the '<em>CM</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int CM_OPERATION_COUNT = DISTANCE_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.mmImpl <em>mm</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.mmImpl
	 * @see robot.impl.RobotPackageImpl#getmm()
	 * @generated
	 */
	int MM = 10;

	/**
	 * The feature id for the '<em><b>Distance</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int MM__DISTANCE = DISTANCE__DISTANCE;

	/**
	 * The number of structural features of the '<em>mm</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int MM_FEATURE_COUNT = DISTANCE_FEATURE_COUNT + 0;

	/**
	 * The number of operations of the '<em>mm</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int MM_OPERATION_COUNT = DISTANCE_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.ReadSensorCommandImpl <em>Read Sensor Command</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.ReadSensorCommandImpl
	 * @see robot.impl.RobotPackageImpl#getReadSensorCommand()
	 * @generated
	 */
	int READ_SENSOR_COMMAND = 11;

	/**
	 * The number of structural features of the '<em>Read Sensor Command</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int READ_SENSOR_COMMAND_FEATURE_COUNT = COMMAND_FEATURE_COUNT + 0;

	/**
	 * The number of operations of the '<em>Read Sensor Command</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int READ_SENSOR_COMMAND_OPERATION_COUNT = COMMAND_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.DistanceSensorCommandImpl <em>Distance Sensor Command</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.DistanceSensorCommandImpl
	 * @see robot.impl.RobotPackageImpl#getDistanceSensorCommand()
	 * @generated
	 */
	int DISTANCE_SENSOR_COMMAND = 12;

	/**
	 * The number of structural features of the '<em>Distance Sensor Command</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int DISTANCE_SENSOR_COMMAND_FEATURE_COUNT = READ_SENSOR_COMMAND_FEATURE_COUNT + 0;

	/**
	 * The number of operations of the '<em>Distance Sensor Command</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int DISTANCE_SENSOR_COMMAND_OPERATION_COUNT = READ_SENSOR_COMMAND_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.TimeSensorCommandImpl <em>Time Sensor Command</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.TimeSensorCommandImpl
	 * @see robot.impl.RobotPackageImpl#getTimeSensorCommand()
	 * @generated
	 */
	int TIME_SENSOR_COMMAND = 13;

	/**
	 * The number of structural features of the '<em>Time Sensor Command</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int TIME_SENSOR_COMMAND_FEATURE_COUNT = READ_SENSOR_COMMAND_FEATURE_COUNT + 0;

	/**
	 * The number of operations of the '<em>Time Sensor Command</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int TIME_SENSOR_COMMAND_OPERATION_COUNT = READ_SENSOR_COMMAND_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.ExpressionBaseImpl <em>Expression Base</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.ExpressionBaseImpl
	 * @see robot.impl.RobotPackageImpl#getExpressionBase()
	 * @generated
	 */
	int EXPRESSION_BASE = 30;

	/**
	 * The number of structural features of the '<em>Expression Base</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int EXPRESSION_BASE_FEATURE_COUNT = INSTRUCTION_FEATURE_COUNT + 0;

	/**
	 * The number of operations of the '<em>Expression Base</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int EXPRESSION_BASE_OPERATION_COUNT = INSTRUCTION_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.ExpressionImpl <em>Expression</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.ExpressionImpl
	 * @see robot.impl.RobotPackageImpl#getExpression()
	 * @generated
	 */
	int EXPRESSION = 14;

	/**
	 * The number of structural features of the '<em>Expression</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int EXPRESSION_FEATURE_COUNT = EXPRESSION_BASE_FEATURE_COUNT + 0;

	/**
	 * The number of operations of the '<em>Expression</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int EXPRESSION_OPERATION_COUNT = EXPRESSION_BASE_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.ArithmetiqueExpImpl <em>Arithmetique Exp</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.ArithmetiqueExpImpl
	 * @see robot.impl.RobotPackageImpl#getArithmetiqueExp()
	 * @generated
	 */
	int ARITHMETIQUE_EXP = 15;

	/**
	 * The number of structural features of the '<em>Arithmetique Exp</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int ARITHMETIQUE_EXP_FEATURE_COUNT = EXPRESSION_FEATURE_COUNT + 0;

	/**
	 * The number of operations of the '<em>Arithmetique Exp</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int ARITHMETIQUE_EXP_OPERATION_COUNT = EXPRESSION_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.BooleanExpImpl <em>Boolean Exp</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.BooleanExpImpl
	 * @see robot.impl.RobotPackageImpl#getBooleanExp()
	 * @generated
	 */
	int BOOLEAN_EXP = 16;

	/**
	 * The number of structural features of the '<em>Boolean Exp</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int BOOLEAN_EXP_FEATURE_COUNT = EXPRESSION_FEATURE_COUNT + 0;

	/**
	 * The number of operations of the '<em>Boolean Exp</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int BOOLEAN_EXP_OPERATION_COUNT = EXPRESSION_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.SecondaryExpAriImpl <em>Secondary Exp Ari</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.SecondaryExpAriImpl
	 * @see robot.impl.RobotPackageImpl#getSecondaryExpAri()
	 * @generated
	 */
	int SECONDARY_EXP_ARI = 22;

	/**
	 * The feature id for the '<em><b>Right</b></em>' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int SECONDARY_EXP_ARI__RIGHT = ARITHMETIQUE_EXP_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Left</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int SECONDARY_EXP_ARI__LEFT = ARITHMETIQUE_EXP_FEATURE_COUNT + 1;

	/**
	 * The number of structural features of the '<em>Secondary Exp Ari</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int SECONDARY_EXP_ARI_FEATURE_COUNT = ARITHMETIQUE_EXP_FEATURE_COUNT + 2;

	/**
	 * The number of operations of the '<em>Secondary Exp Ari</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int SECONDARY_EXP_ARI_OPERATION_COUNT = ARITHMETIQUE_EXP_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.PlusImpl <em>Plus</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.PlusImpl
	 * @see robot.impl.RobotPackageImpl#getPlus()
	 * @generated
	 */
	int PLUS = 17;

	/**
	 * The feature id for the '<em><b>Right</b></em>' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int PLUS__RIGHT = SECONDARY_EXP_ARI__RIGHT;

	/**
	 * The feature id for the '<em><b>Left</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int PLUS__LEFT = SECONDARY_EXP_ARI__LEFT;

	/**
	 * The number of structural features of the '<em>Plus</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int PLUS_FEATURE_COUNT = SECONDARY_EXP_ARI_FEATURE_COUNT + 0;

	/**
	 * The number of operations of the '<em>Plus</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int PLUS_OPERATION_COUNT = SECONDARY_EXP_ARI_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.MinusImpl <em>Minus</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.MinusImpl
	 * @see robot.impl.RobotPackageImpl#getMinus()
	 * @generated
	 */
	int MINUS = 18;

	/**
	 * The feature id for the '<em><b>Right</b></em>' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int MINUS__RIGHT = SECONDARY_EXP_ARI__RIGHT;

	/**
	 * The feature id for the '<em><b>Left</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int MINUS__LEFT = SECONDARY_EXP_ARI__LEFT;

	/**
	 * The number of structural features of the '<em>Minus</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int MINUS_FEATURE_COUNT = SECONDARY_EXP_ARI_FEATURE_COUNT + 0;

	/**
	 * The number of operations of the '<em>Minus</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int MINUS_OPERATION_COUNT = SECONDARY_EXP_ARI_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.MultImpl <em>Mult</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.MultImpl
	 * @see robot.impl.RobotPackageImpl#getMult()
	 * @generated
	 */
	int MULT = 19;

	/**
	 * The feature id for the '<em><b>Right</b></em>' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int MULT__RIGHT = SECONDARY_EXP_ARI__RIGHT;

	/**
	 * The feature id for the '<em><b>Left</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int MULT__LEFT = SECONDARY_EXP_ARI__LEFT;

	/**
	 * The number of structural features of the '<em>Mult</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int MULT_FEATURE_COUNT = SECONDARY_EXP_ARI_FEATURE_COUNT + 0;

	/**
	 * The number of operations of the '<em>Mult</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int MULT_OPERATION_COUNT = SECONDARY_EXP_ARI_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.DivImpl <em>Div</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.DivImpl
	 * @see robot.impl.RobotPackageImpl#getDiv()
	 * @generated
	 */
	int DIV = 20;

	/**
	 * The feature id for the '<em><b>Right</b></em>' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int DIV__RIGHT = SECONDARY_EXP_ARI__RIGHT;

	/**
	 * The feature id for the '<em><b>Left</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int DIV__LEFT = SECONDARY_EXP_ARI__LEFT;

	/**
	 * The number of structural features of the '<em>Div</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int DIV_FEATURE_COUNT = SECONDARY_EXP_ARI_FEATURE_COUNT + 0;

	/**
	 * The number of operations of the '<em>Div</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int DIV_OPERATION_COUNT = SECONDARY_EXP_ARI_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.PrimaryExprAriImpl <em>Primary Expr Ari</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.PrimaryExprAriImpl
	 * @see robot.impl.RobotPackageImpl#getPrimaryExprAri()
	 * @generated
	 */
	int PRIMARY_EXPR_ARI = 21;

	/**
	 * The feature id for the '<em><b>Type</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int PRIMARY_EXPR_ARI__TYPE = ARITHMETIQUE_EXP_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Call</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int PRIMARY_EXPR_ARI__CALL = ARITHMETIQUE_EXP_FEATURE_COUNT + 1;

	/**
	 * The number of structural features of the '<em>Primary Expr Ari</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int PRIMARY_EXPR_ARI_FEATURE_COUNT = ARITHMETIQUE_EXP_FEATURE_COUNT + 2;

	/**
	 * The number of operations of the '<em>Primary Expr Ari</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int PRIMARY_EXPR_ARI_OPERATION_COUNT = ARITHMETIQUE_EXP_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.DeclarationVariableImpl <em>Declaration Variable</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.DeclarationVariableImpl
	 * @see robot.impl.RobotPackageImpl#getDeclarationVariable()
	 * @generated
	 */
	int DECLARATION_VARIABLE = 23;

	/**
	 * The feature id for the '<em><b>Nom</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int DECLARATION_VARIABLE__NOM = INSTRUCTION_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Expressionbase</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int DECLARATION_VARIABLE__EXPRESSIONBASE = INSTRUCTION_FEATURE_COUNT + 1;

	/**
	 * The feature id for the '<em><b>Type</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int DECLARATION_VARIABLE__TYPE = INSTRUCTION_FEATURE_COUNT + 2;

	/**
	 * The number of structural features of the '<em>Declaration Variable</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int DECLARATION_VARIABLE_FEATURE_COUNT = INSTRUCTION_FEATURE_COUNT + 3;

	/**
	 * The number of operations of the '<em>Declaration Variable</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int DECLARATION_VARIABLE_OPERATION_COUNT = INSTRUCTION_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.BlockImpl <em>Block</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.BlockImpl
	 * @see robot.impl.RobotPackageImpl#getBlock()
	 * @generated
	 */
	int BLOCK = 24;

	/**
	 * The feature id for the '<em><b>Instruction</b></em>' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int BLOCK__INSTRUCTION = INSTRUCTION_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Expression</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int BLOCK__EXPRESSION = INSTRUCTION_FEATURE_COUNT + 1;

	/**
	 * The number of structural features of the '<em>Block</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int BLOCK_FEATURE_COUNT = INSTRUCTION_FEATURE_COUNT + 2;

	/**
	 * The number of operations of the '<em>Block</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int BLOCK_OPERATION_COUNT = INSTRUCTION_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.LOOPImpl <em>LOOP</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.LOOPImpl
	 * @see robot.impl.RobotPackageImpl#getLOOP()
	 * @generated
	 */
	int LOOP = 25;

	/**
	 * The feature id for the '<em><b>Instruction</b></em>' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int LOOP__INSTRUCTION = BLOCK__INSTRUCTION;

	/**
	 * The feature id for the '<em><b>Expression</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int LOOP__EXPRESSION = BLOCK__EXPRESSION;

	/**
	 * The number of structural features of the '<em>LOOP</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int LOOP_FEATURE_COUNT = BLOCK_FEATURE_COUNT + 0;

	/**
	 * The number of operations of the '<em>LOOP</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int LOOP_OPERATION_COUNT = BLOCK_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.IFImpl <em>IF</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.IFImpl
	 * @see robot.impl.RobotPackageImpl#getIF()
	 * @generated
	 */
	int IF = 26;

	/**
	 * The feature id for the '<em><b>Instruction</b></em>' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int IF__INSTRUCTION = BLOCK__INSTRUCTION;

	/**
	 * The feature id for the '<em><b>Expression</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int IF__EXPRESSION = BLOCK__EXPRESSION;

	/**
	 * The number of structural features of the '<em>IF</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int IF_FEATURE_COUNT = BLOCK_FEATURE_COUNT + 0;

	/**
	 * The number of operations of the '<em>IF</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int IF_OPERATION_COUNT = BLOCK_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.CallImpl <em>Call</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.CallImpl
	 * @see robot.impl.RobotPackageImpl#getCall()
	 * @generated
	 */
	int CALL = 29;

	/**
	 * The number of structural features of the '<em>Call</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int CALL_FEATURE_COUNT = EXPRESSION_BASE_FEATURE_COUNT + 0;

	/**
	 * The number of operations of the '<em>Call</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int CALL_OPERATION_COUNT = EXPRESSION_BASE_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.CallVariableImpl <em>Call Variable</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.CallVariableImpl
	 * @see robot.impl.RobotPackageImpl#getCallVariable()
	 * @generated
	 */
	int CALL_VARIABLE = 27;

	/**
	 * The number of structural features of the '<em>Call Variable</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int CALL_VARIABLE_FEATURE_COUNT = CALL_FEATURE_COUNT + 0;

	/**
	 * The number of operations of the '<em>Call Variable</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int CALL_VARIABLE_OPERATION_COUNT = CALL_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.CallFunctionImpl <em>Call Function</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.CallFunctionImpl
	 * @see robot.impl.RobotPackageImpl#getCallFunction()
	 * @generated
	 */
	int CALL_FUNCTION = 28;

	/**
	 * The number of structural features of the '<em>Call Function</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int CALL_FUNCTION_FEATURE_COUNT = CALL_FEATURE_COUNT + 0;

	/**
	 * The number of operations of the '<em>Call Function</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int CALL_FUNCTION_OPERATION_COUNT = CALL_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.AffectationImpl <em>Affectation</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.AffectationImpl
	 * @see robot.impl.RobotPackageImpl#getAffectation()
	 * @generated
	 */
	int AFFECTATION = 31;

	/**
	 * The feature id for the '<em><b>Expressionbase</b></em>' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int AFFECTATION__EXPRESSIONBASE = EXPRESSION_BASE_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Callvariable</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int AFFECTATION__CALLVARIABLE = EXPRESSION_BASE_FEATURE_COUNT + 1;

	/**
	 * The number of structural features of the '<em>Affectation</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int AFFECTATION_FEATURE_COUNT = EXPRESSION_BASE_FEATURE_COUNT + 2;

	/**
	 * The number of operations of the '<em>Affectation</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int AFFECTATION_OPERATION_COUNT = EXPRESSION_BASE_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.PrimaryExprBoolImpl <em>Primary Expr Bool</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.PrimaryExprBoolImpl
	 * @see robot.impl.RobotPackageImpl#getPrimaryExprBool()
	 * @generated
	 */
	int PRIMARY_EXPR_BOOL = 32;

	/**
	 * The feature id for the '<em><b>Type</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int PRIMARY_EXPR_BOOL__TYPE = BOOLEAN_EXP_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Call</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int PRIMARY_EXPR_BOOL__CALL = BOOLEAN_EXP_FEATURE_COUNT + 1;

	/**
	 * The number of structural features of the '<em>Primary Expr Bool</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int PRIMARY_EXPR_BOOL_FEATURE_COUNT = BOOLEAN_EXP_FEATURE_COUNT + 2;

	/**
	 * The number of operations of the '<em>Primary Expr Bool</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int PRIMARY_EXPR_BOOL_OPERATION_COUNT = BOOLEAN_EXP_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.SecondaryExpBoolImpl <em>Secondary Exp Bool</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.SecondaryExpBoolImpl
	 * @see robot.impl.RobotPackageImpl#getSecondaryExpBool()
	 * @generated
	 */
	int SECONDARY_EXP_BOOL = 33;

	/**
	 * The feature id for the '<em><b>Right</b></em>' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int SECONDARY_EXP_BOOL__RIGHT = BOOLEAN_EXP_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Left</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int SECONDARY_EXP_BOOL__LEFT = BOOLEAN_EXP_FEATURE_COUNT + 1;

	/**
	 * The number of structural features of the '<em>Secondary Exp Bool</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int SECONDARY_EXP_BOOL_FEATURE_COUNT = BOOLEAN_EXP_FEATURE_COUNT + 2;

	/**
	 * The number of operations of the '<em>Secondary Exp Bool</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int SECONDARY_EXP_BOOL_OPERATION_COUNT = BOOLEAN_EXP_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.AndImpl <em>And</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.AndImpl
	 * @see robot.impl.RobotPackageImpl#getAnd()
	 * @generated
	 */
	int AND = 34;

	/**
	 * The feature id for the '<em><b>Right</b></em>' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int AND__RIGHT = SECONDARY_EXP_BOOL__RIGHT;

	/**
	 * The feature id for the '<em><b>Left</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int AND__LEFT = SECONDARY_EXP_BOOL__LEFT;

	/**
	 * The number of structural features of the '<em>And</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int AND_FEATURE_COUNT = SECONDARY_EXP_BOOL_FEATURE_COUNT + 0;

	/**
	 * The number of operations of the '<em>And</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int AND_OPERATION_COUNT = SECONDARY_EXP_BOOL_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.OrImpl <em>Or</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.OrImpl
	 * @see robot.impl.RobotPackageImpl#getOr()
	 * @generated
	 */
	int OR = 35;

	/**
	 * The feature id for the '<em><b>Right</b></em>' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int OR__RIGHT = SECONDARY_EXP_BOOL__RIGHT;

	/**
	 * The feature id for the '<em><b>Left</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int OR__LEFT = SECONDARY_EXP_BOOL__LEFT;

	/**
	 * The number of structural features of the '<em>Or</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int OR_FEATURE_COUNT = SECONDARY_EXP_BOOL_FEATURE_COUNT + 0;

	/**
	 * The number of operations of the '<em>Or</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int OR_OPERATION_COUNT = SECONDARY_EXP_BOOL_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.NotImpl <em>Not</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.NotImpl
	 * @see robot.impl.RobotPackageImpl#getNot()
	 * @generated
	 */
	int NOT = 36;

	/**
	 * The feature id for the '<em><b>Right</b></em>' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int NOT__RIGHT = SECONDARY_EXP_BOOL__RIGHT;

	/**
	 * The feature id for the '<em><b>Left</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int NOT__LEFT = SECONDARY_EXP_BOOL__LEFT;

	/**
	 * The number of structural features of the '<em>Not</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int NOT_FEATURE_COUNT = SECONDARY_EXP_BOOL_FEATURE_COUNT + 0;

	/**
	 * The number of operations of the '<em>Not</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int NOT_OPERATION_COUNT = SECONDARY_EXP_BOOL_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.EqualsImpl <em>Equals</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.EqualsImpl
	 * @see robot.impl.RobotPackageImpl#getEquals()
	 * @generated
	 */
	int EQUALS = 37;

	/**
	 * The feature id for the '<em><b>Right</b></em>' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int EQUALS__RIGHT = SECONDARY_EXP_BOOL__RIGHT;

	/**
	 * The feature id for the '<em><b>Left</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int EQUALS__LEFT = SECONDARY_EXP_BOOL__LEFT;

	/**
	 * The number of structural features of the '<em>Equals</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int EQUALS_FEATURE_COUNT = SECONDARY_EXP_BOOL_FEATURE_COUNT + 0;

	/**
	 * The number of operations of the '<em>Equals</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int EQUALS_OPERATION_COUNT = SECONDARY_EXP_BOOL_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.BooleanTypeImpl <em>Boolean Type</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.BooleanTypeImpl
	 * @see robot.impl.RobotPackageImpl#getBooleanType()
	 * @generated
	 */
	int BOOLEAN_TYPE = 38;

	/**
	 * The feature id for the '<em><b>Value</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int BOOLEAN_TYPE__VALUE = TYPE_CLASS_FEATURE_COUNT + 0;

	/**
	 * The number of structural features of the '<em>Boolean Type</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int BOOLEAN_TYPE_FEATURE_COUNT = TYPE_CLASS_FEATURE_COUNT + 1;

	/**
	 * The number of operations of the '<em>Boolean Type</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int BOOLEAN_TYPE_OPERATION_COUNT = TYPE_CLASS_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.NumberTypeImpl <em>Number Type</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.NumberTypeImpl
	 * @see robot.impl.RobotPackageImpl#getNumberType()
	 * @generated
	 */
	int NUMBER_TYPE = 39;

	/**
	 * The feature id for the '<em><b>Value</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int NUMBER_TYPE__VALUE = TYPE_CLASS_FEATURE_COUNT + 0;

	/**
	 * The number of structural features of the '<em>Number Type</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int NUMBER_TYPE_FEATURE_COUNT = TYPE_CLASS_FEATURE_COUNT + 1;

	/**
	 * The number of operations of the '<em>Number Type</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int NUMBER_TYPE_OPERATION_COUNT = TYPE_CLASS_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.impl.ELSEImpl <em>ELSE</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.impl.ELSEImpl
	 * @see robot.impl.RobotPackageImpl#getELSE()
	 * @generated
	 */
	int ELSE = 40;

	/**
	 * The feature id for the '<em><b>Instruction</b></em>' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int ELSE__INSTRUCTION = BLOCK__INSTRUCTION;

	/**
	 * The feature id for the '<em><b>Expression</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int ELSE__EXPRESSION = BLOCK__EXPRESSION;

	/**
	 * The number of structural features of the '<em>ELSE</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int ELSE_FEATURE_COUNT = BLOCK_FEATURE_COUNT + 0;

	/**
	 * The number of operations of the '<em>ELSE</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	int ELSE_OPERATION_COUNT = BLOCK_OPERATION_COUNT + 0;

	/**
	 * The meta object id for the '{@link robot.Direction <em>Direction</em>}' enum.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see robot.Direction
	 * @see robot.impl.RobotPackageImpl#getDirection()
	 * @generated
	 */
	int DIRECTION = 41;

	/**
	 * Returns the meta object for class '{@link robot.Robot <em>Robot</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Robot</em>'.
	 * @see robot.Robot
	 * @generated
	 */
	EClass getRobot();

	/**
	 * Returns the meta object for the containment reference list '{@link robot.Robot#getFunction <em>Function</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference list '<em>Function</em>'.
	 * @see robot.Robot#getFunction()
	 * @see #getRobot()
	 * @generated
	 */
	EReference getRobot_Function();

	/**
	 * Returns the meta object for class '{@link robot.Function <em>Function</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Function</em>'.
	 * @see robot.Function
	 * @generated
	 */
	EClass getFunction();

	/**
	 * Returns the meta object for the containment reference list '{@link robot.Function#getInstruction <em>Instruction</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference list '<em>Instruction</em>'.
	 * @see robot.Function#getInstruction()
	 * @see #getFunction()
	 * @generated
	 */
	EReference getFunction_Instruction();

	/**
	 * Returns the meta object for the containment reference list '{@link robot.Function#getParameters <em>Parameters</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference list '<em>Parameters</em>'.
	 * @see robot.Function#getParameters()
	 * @see #getFunction()
	 * @generated
	 */
	EReference getFunction_Parameters();

	/**
	 * Returns the meta object for the containment reference '{@link robot.Function#getReturn <em>Return</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference '<em>Return</em>'.
	 * @see robot.Function#getReturn()
	 * @see #getFunction()
	 * @generated
	 */
	EReference getFunction_Return();

	/**
	 * Returns the meta object for class '{@link robot.Instruction <em>Instruction</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Instruction</em>'.
	 * @see robot.Instruction
	 * @generated
	 */
	EClass getInstruction();

	/**
	 * Returns the meta object for class '{@link robot.Command <em>Command</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Command</em>'.
	 * @see robot.Command
	 * @generated
	 */
	EClass getCommand();

	/**
	 * Returns the meta object for class '{@link robot.RotateCommand <em>Rotate Command</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Rotate Command</em>'.
	 * @see robot.RotateCommand
	 * @generated
	 */
	EClass getRotateCommand();

	/**
	 * Returns the meta object for the attribute '{@link robot.RotateCommand#getAngle <em>Angle</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Angle</em>'.
	 * @see robot.RotateCommand#getAngle()
	 * @see #getRotateCommand()
	 * @generated
	 */
	EAttribute getRotateCommand_Angle();

	/**
	 * Returns the meta object for class '{@link robot.DirectionCommand <em>Direction Command</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Direction Command</em>'.
	 * @see robot.DirectionCommand
	 * @generated
	 */
	EClass getDirectionCommand();

	/**
	 * Returns the meta object for the containment reference '{@link robot.DirectionCommand#getDistance <em>Distance</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference '<em>Distance</em>'.
	 * @see robot.DirectionCommand#getDistance()
	 * @see #getDirectionCommand()
	 * @generated
	 */
	EReference getDirectionCommand_Distance();

	/**
	 * Returns the meta object for class '{@link robot.SpeedCommand <em>Speed Command</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Speed Command</em>'.
	 * @see robot.SpeedCommand
	 * @generated
	 */
	EClass getSpeedCommand();

	/**
	 * Returns the meta object for the attribute '{@link robot.SpeedCommand#getSpeed <em>Speed</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Speed</em>'.
	 * @see robot.SpeedCommand#getSpeed()
	 * @see #getSpeedCommand()
	 * @generated
	 */
	EAttribute getSpeedCommand_Speed();

	/**
	 * Returns the meta object for class '{@link robot.TypeClass <em>Type Class</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Type Class</em>'.
	 * @see robot.TypeClass
	 * @generated
	 */
	EClass getTypeClass();

	/**
	 * Returns the meta object for class '{@link robot.Distance <em>Distance</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Distance</em>'.
	 * @see robot.Distance
	 * @generated
	 */
	EClass getDistance();

	/**
	 * Returns the meta object for the attribute '{@link robot.Distance#getDistance <em>Distance</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Distance</em>'.
	 * @see robot.Distance#getDistance()
	 * @see #getDistance()
	 * @generated
	 */
	EAttribute getDistance_Distance();

	/**
	 * Returns the meta object for class '{@link robot.CM <em>CM</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>CM</em>'.
	 * @see robot.CM
	 * @generated
	 */
	EClass getCM();

	/**
	 * Returns the meta object for class '{@link robot.mm <em>mm</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>mm</em>'.
	 * @see robot.mm
	 * @generated
	 */
	EClass getmm();

	/**
	 * Returns the meta object for class '{@link robot.ReadSensorCommand <em>Read Sensor Command</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Read Sensor Command</em>'.
	 * @see robot.ReadSensorCommand
	 * @generated
	 */
	EClass getReadSensorCommand();

	/**
	 * Returns the meta object for class '{@link robot.DistanceSensorCommand <em>Distance Sensor Command</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Distance Sensor Command</em>'.
	 * @see robot.DistanceSensorCommand
	 * @generated
	 */
	EClass getDistanceSensorCommand();

	/**
	 * Returns the meta object for class '{@link robot.TimeSensorCommand <em>Time Sensor Command</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Time Sensor Command</em>'.
	 * @see robot.TimeSensorCommand
	 * @generated
	 */
	EClass getTimeSensorCommand();

	/**
	 * Returns the meta object for class '{@link robot.Expression <em>Expression</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Expression</em>'.
	 * @see robot.Expression
	 * @generated
	 */
	EClass getExpression();

	/**
	 * Returns the meta object for class '{@link robot.ArithmetiqueExp <em>Arithmetique Exp</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Arithmetique Exp</em>'.
	 * @see robot.ArithmetiqueExp
	 * @generated
	 */
	EClass getArithmetiqueExp();

	/**
	 * Returns the meta object for class '{@link robot.BooleanExp <em>Boolean Exp</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Boolean Exp</em>'.
	 * @see robot.BooleanExp
	 * @generated
	 */
	EClass getBooleanExp();

	/**
	 * Returns the meta object for class '{@link robot.Plus <em>Plus</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Plus</em>'.
	 * @see robot.Plus
	 * @generated
	 */
	EClass getPlus();

	/**
	 * Returns the meta object for class '{@link robot.Minus <em>Minus</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Minus</em>'.
	 * @see robot.Minus
	 * @generated
	 */
	EClass getMinus();

	/**
	 * Returns the meta object for class '{@link robot.Mult <em>Mult</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Mult</em>'.
	 * @see robot.Mult
	 * @generated
	 */
	EClass getMult();

	/**
	 * Returns the meta object for class '{@link robot.Div <em>Div</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Div</em>'.
	 * @see robot.Div
	 * @generated
	 */
	EClass getDiv();

	/**
	 * Returns the meta object for class '{@link robot.PrimaryExprAri <em>Primary Expr Ari</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Primary Expr Ari</em>'.
	 * @see robot.PrimaryExprAri
	 * @generated
	 */
	EClass getPrimaryExprAri();

	/**
	 * Returns the meta object for the containment reference '{@link robot.PrimaryExprAri#getCall <em>Call</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference '<em>Call</em>'.
	 * @see robot.PrimaryExprAri#getCall()
	 * @see #getPrimaryExprAri()
	 * @generated
	 */
	EReference getPrimaryExprAri_Call();

	/**
	 * Returns the meta object for the containment reference '{@link robot.PrimaryExprAri#getType <em>Type</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference '<em>Type</em>'.
	 * @see robot.PrimaryExprAri#getType()
	 * @see #getPrimaryExprAri()
	 * @generated
	 */
	EReference getPrimaryExprAri_Type();

	/**
	 * Returns the meta object for class '{@link robot.SecondaryExpAri <em>Secondary Exp Ari</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Secondary Exp Ari</em>'.
	 * @see robot.SecondaryExpAri
	 * @generated
	 */
	EClass getSecondaryExpAri();

	/**
	 * Returns the meta object for the containment reference list '{@link robot.SecondaryExpAri#getRight <em>Right</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference list '<em>Right</em>'.
	 * @see robot.SecondaryExpAri#getRight()
	 * @see #getSecondaryExpAri()
	 * @generated
	 */
	EReference getSecondaryExpAri_Right();

	/**
	 * Returns the meta object for the containment reference '{@link robot.SecondaryExpAri#getLeft <em>Left</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference '<em>Left</em>'.
	 * @see robot.SecondaryExpAri#getLeft()
	 * @see #getSecondaryExpAri()
	 * @generated
	 */
	EReference getSecondaryExpAri_Left();

	/**
	 * Returns the meta object for class '{@link robot.DeclarationVariable <em>Declaration Variable</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Declaration Variable</em>'.
	 * @see robot.DeclarationVariable
	 * @generated
	 */
	EClass getDeclarationVariable();

	/**
	 * Returns the meta object for the attribute '{@link robot.DeclarationVariable#getNom <em>Nom</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Nom</em>'.
	 * @see robot.DeclarationVariable#getNom()
	 * @see #getDeclarationVariable()
	 * @generated
	 */
	EAttribute getDeclarationVariable_Nom();

	/**
	 * Returns the meta object for the containment reference '{@link robot.DeclarationVariable#getType <em>Type</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference '<em>Type</em>'.
	 * @see robot.DeclarationVariable#getType()
	 * @see #getDeclarationVariable()
	 * @generated
	 */
	EReference getDeclarationVariable_Type();

	/**
	 * Returns the meta object for the containment reference '{@link robot.DeclarationVariable#getExpressionbase <em>Expressionbase</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference '<em>Expressionbase</em>'.
	 * @see robot.DeclarationVariable#getExpressionbase()
	 * @see #getDeclarationVariable()
	 * @generated
	 */
	EReference getDeclarationVariable_Expressionbase();

	/**
	 * Returns the meta object for class '{@link robot.Block <em>Block</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Block</em>'.
	 * @see robot.Block
	 * @generated
	 */
	EClass getBlock();

	/**
	 * Returns the meta object for the containment reference list '{@link robot.Block#getInstruction <em>Instruction</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference list '<em>Instruction</em>'.
	 * @see robot.Block#getInstruction()
	 * @see #getBlock()
	 * @generated
	 */
	EReference getBlock_Instruction();

	/**
	 * Returns the meta object for the containment reference '{@link robot.Block#getExpression <em>Expression</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference '<em>Expression</em>'.
	 * @see robot.Block#getExpression()
	 * @see #getBlock()
	 * @generated
	 */
	EReference getBlock_Expression();

	/**
	 * Returns the meta object for class '{@link robot.LOOP <em>LOOP</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>LOOP</em>'.
	 * @see robot.LOOP
	 * @generated
	 */
	EClass getLOOP();

	/**
	 * Returns the meta object for class '{@link robot.IF <em>IF</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>IF</em>'.
	 * @see robot.IF
	 * @generated
	 */
	EClass getIF();

	/**
	 * Returns the meta object for class '{@link robot.CallVariable <em>Call Variable</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Call Variable</em>'.
	 * @see robot.CallVariable
	 * @generated
	 */
	EClass getCallVariable();

	/**
	 * Returns the meta object for class '{@link robot.CallFunction <em>Call Function</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Call Function</em>'.
	 * @see robot.CallFunction
	 * @generated
	 */
	EClass getCallFunction();

	/**
	 * Returns the meta object for class '{@link robot.Call <em>Call</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Call</em>'.
	 * @see robot.Call
	 * @generated
	 */
	EClass getCall();

	/**
	 * Returns the meta object for class '{@link robot.ExpressionBase <em>Expression Base</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Expression Base</em>'.
	 * @see robot.ExpressionBase
	 * @generated
	 */
	EClass getExpressionBase();

	/**
	 * Returns the meta object for class '{@link robot.Affectation <em>Affectation</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Affectation</em>'.
	 * @see robot.Affectation
	 * @generated
	 */
	EClass getAffectation();

	/**
	 * Returns the meta object for the containment reference '{@link robot.Affectation#getCallvariable <em>Callvariable</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference '<em>Callvariable</em>'.
	 * @see robot.Affectation#getCallvariable()
	 * @see #getAffectation()
	 * @generated
	 */
	EReference getAffectation_Callvariable();

	/**
	 * Returns the meta object for the containment reference list '{@link robot.Affectation#getExpressionbase <em>Expressionbase</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference list '<em>Expressionbase</em>'.
	 * @see robot.Affectation#getExpressionbase()
	 * @see #getAffectation()
	 * @generated
	 */
	EReference getAffectation_Expressionbase();

	/**
	 * Returns the meta object for class '{@link robot.PrimaryExprBool <em>Primary Expr Bool</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Primary Expr Bool</em>'.
	 * @see robot.PrimaryExprBool
	 * @generated
	 */
	EClass getPrimaryExprBool();

	/**
	 * Returns the meta object for the containment reference '{@link robot.PrimaryExprBool#getCall <em>Call</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference '<em>Call</em>'.
	 * @see robot.PrimaryExprBool#getCall()
	 * @see #getPrimaryExprBool()
	 * @generated
	 */
	EReference getPrimaryExprBool_Call();

	/**
	 * Returns the meta object for the containment reference '{@link robot.PrimaryExprBool#getType <em>Type</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference '<em>Type</em>'.
	 * @see robot.PrimaryExprBool#getType()
	 * @see #getPrimaryExprBool()
	 * @generated
	 */
	EReference getPrimaryExprBool_Type();

	/**
	 * Returns the meta object for class '{@link robot.SecondaryExpBool <em>Secondary Exp Bool</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Secondary Exp Bool</em>'.
	 * @see robot.SecondaryExpBool
	 * @generated
	 */
	EClass getSecondaryExpBool();

	/**
	 * Returns the meta object for the containment reference '{@link robot.SecondaryExpBool#getLeft <em>Left</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference '<em>Left</em>'.
	 * @see robot.SecondaryExpBool#getLeft()
	 * @see #getSecondaryExpBool()
	 * @generated
	 */
	EReference getSecondaryExpBool_Left();

	/**
	 * Returns the meta object for the containment reference list '{@link robot.SecondaryExpBool#getRight <em>Right</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference list '<em>Right</em>'.
	 * @see robot.SecondaryExpBool#getRight()
	 * @see #getSecondaryExpBool()
	 * @generated
	 */
	EReference getSecondaryExpBool_Right();

	/**
	 * Returns the meta object for class '{@link robot.And <em>And</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>And</em>'.
	 * @see robot.And
	 * @generated
	 */
	EClass getAnd();

	/**
	 * Returns the meta object for class '{@link robot.Or <em>Or</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Or</em>'.
	 * @see robot.Or
	 * @generated
	 */
	EClass getOr();

	/**
	 * Returns the meta object for class '{@link robot.Not <em>Not</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Not</em>'.
	 * @see robot.Not
	 * @generated
	 */
	EClass getNot();

	/**
	 * Returns the meta object for class '{@link robot.Equals <em>Equals</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Equals</em>'.
	 * @see robot.Equals
	 * @generated
	 */
	EClass getEquals();

	/**
	 * Returns the meta object for class '{@link robot.BooleanType <em>Boolean Type</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Boolean Type</em>'.
	 * @see robot.BooleanType
	 * @generated
	 */
	EClass getBooleanType();

	/**
	 * Returns the meta object for the attribute '{@link robot.BooleanType#isValue <em>Value</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Value</em>'.
	 * @see robot.BooleanType#isValue()
	 * @see #getBooleanType()
	 * @generated
	 */
	EAttribute getBooleanType_Value();

	/**
	 * Returns the meta object for class '{@link robot.NumberType <em>Number Type</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Number Type</em>'.
	 * @see robot.NumberType
	 * @generated
	 */
	EClass getNumberType();

	/**
	 * Returns the meta object for the attribute '{@link robot.NumberType#getValue <em>Value</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Value</em>'.
	 * @see robot.NumberType#getValue()
	 * @see #getNumberType()
	 * @generated
	 */
	EAttribute getNumberType_Value();

	/**
	 * Returns the meta object for class '{@link robot.ELSE <em>ELSE</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>ELSE</em>'.
	 * @see robot.ELSE
	 * @generated
	 */
	EClass getELSE();

	/**
	 * Returns the meta object for enum '{@link robot.Direction <em>Direction</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for enum '<em>Direction</em>'.
	 * @see robot.Direction
	 * @generated
	 */
	EEnum getDirection();

	/**
	 * Returns the factory that creates the instances of the model.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the factory that creates the instances of the model.
	 * @generated
	 */
	RobotFactory getRobotFactory();

	/**
	 * <!-- begin-user-doc -->
	 * Defines literals for the meta objects that represent
	 * <ul>
	 *   <li>each class,</li>
	 *   <li>each feature of each class,</li>
	 *   <li>each operation of each class,</li>
	 *   <li>each enum,</li>
	 *   <li>and each data type</li>
	 * </ul>
	 * <!-- end-user-doc -->
	 * @generated
	 */
	interface Literals {
		/**
		 * The meta object literal for the '{@link robot.impl.RobotImpl <em>Robot</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.RobotImpl
		 * @see robot.impl.RobotPackageImpl#getRobot()
		 * @generated
		 */
		EClass ROBOT = eINSTANCE.getRobot();

		/**
		 * The meta object literal for the '<em><b>Function</b></em>' containment reference list feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EReference ROBOT__FUNCTION = eINSTANCE.getRobot_Function();

		/**
		 * The meta object literal for the '{@link robot.impl.FunctionImpl <em>Function</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.FunctionImpl
		 * @see robot.impl.RobotPackageImpl#getFunction()
		 * @generated
		 */
		EClass FUNCTION = eINSTANCE.getFunction();

		/**
		 * The meta object literal for the '<em><b>Instruction</b></em>' containment reference list feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EReference FUNCTION__INSTRUCTION = eINSTANCE.getFunction_Instruction();

		/**
		 * The meta object literal for the '<em><b>Parameters</b></em>' containment reference list feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EReference FUNCTION__PARAMETERS = eINSTANCE.getFunction_Parameters();

		/**
		 * The meta object literal for the '<em><b>Return</b></em>' containment reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EReference FUNCTION__RETURN = eINSTANCE.getFunction_Return();

		/**
		 * The meta object literal for the '{@link robot.impl.InstructionImpl <em>Instruction</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.InstructionImpl
		 * @see robot.impl.RobotPackageImpl#getInstruction()
		 * @generated
		 */
		EClass INSTRUCTION = eINSTANCE.getInstruction();

		/**
		 * The meta object literal for the '{@link robot.impl.CommandImpl <em>Command</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.CommandImpl
		 * @see robot.impl.RobotPackageImpl#getCommand()
		 * @generated
		 */
		EClass COMMAND = eINSTANCE.getCommand();

		/**
		 * The meta object literal for the '{@link robot.impl.RotateCommandImpl <em>Rotate Command</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.RotateCommandImpl
		 * @see robot.impl.RobotPackageImpl#getRotateCommand()
		 * @generated
		 */
		EClass ROTATE_COMMAND = eINSTANCE.getRotateCommand();

		/**
		 * The meta object literal for the '<em><b>Angle</b></em>' attribute feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EAttribute ROTATE_COMMAND__ANGLE = eINSTANCE.getRotateCommand_Angle();

		/**
		 * The meta object literal for the '{@link robot.impl.DirectionCommandImpl <em>Direction Command</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.DirectionCommandImpl
		 * @see robot.impl.RobotPackageImpl#getDirectionCommand()
		 * @generated
		 */
		EClass DIRECTION_COMMAND = eINSTANCE.getDirectionCommand();

		/**
		 * The meta object literal for the '<em><b>Distance</b></em>' containment reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EReference DIRECTION_COMMAND__DISTANCE = eINSTANCE.getDirectionCommand_Distance();

		/**
		 * The meta object literal for the '{@link robot.impl.SpeedCommandImpl <em>Speed Command</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.SpeedCommandImpl
		 * @see robot.impl.RobotPackageImpl#getSpeedCommand()
		 * @generated
		 */
		EClass SPEED_COMMAND = eINSTANCE.getSpeedCommand();

		/**
		 * The meta object literal for the '<em><b>Speed</b></em>' attribute feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EAttribute SPEED_COMMAND__SPEED = eINSTANCE.getSpeedCommand_Speed();

		/**
		 * The meta object literal for the '{@link robot.impl.TypeClassImpl <em>Type Class</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.TypeClassImpl
		 * @see robot.impl.RobotPackageImpl#getTypeClass()
		 * @generated
		 */
		EClass TYPE_CLASS = eINSTANCE.getTypeClass();

		/**
		 * The meta object literal for the '{@link robot.impl.DistanceImpl <em>Distance</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.DistanceImpl
		 * @see robot.impl.RobotPackageImpl#getDistance()
		 * @generated
		 */
		EClass DISTANCE = eINSTANCE.getDistance();

		/**
		 * The meta object literal for the '<em><b>Distance</b></em>' attribute feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EAttribute DISTANCE__DISTANCE = eINSTANCE.getDistance_Distance();

		/**
		 * The meta object literal for the '{@link robot.impl.CMImpl <em>CM</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.CMImpl
		 * @see robot.impl.RobotPackageImpl#getCM()
		 * @generated
		 */
		EClass CM = eINSTANCE.getCM();

		/**
		 * The meta object literal for the '{@link robot.impl.mmImpl <em>mm</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.mmImpl
		 * @see robot.impl.RobotPackageImpl#getmm()
		 * @generated
		 */
		EClass MM = eINSTANCE.getmm();

		/**
		 * The meta object literal for the '{@link robot.impl.ReadSensorCommandImpl <em>Read Sensor Command</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.ReadSensorCommandImpl
		 * @see robot.impl.RobotPackageImpl#getReadSensorCommand()
		 * @generated
		 */
		EClass READ_SENSOR_COMMAND = eINSTANCE.getReadSensorCommand();

		/**
		 * The meta object literal for the '{@link robot.impl.DistanceSensorCommandImpl <em>Distance Sensor Command</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.DistanceSensorCommandImpl
		 * @see robot.impl.RobotPackageImpl#getDistanceSensorCommand()
		 * @generated
		 */
		EClass DISTANCE_SENSOR_COMMAND = eINSTANCE.getDistanceSensorCommand();

		/**
		 * The meta object literal for the '{@link robot.impl.TimeSensorCommandImpl <em>Time Sensor Command</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.TimeSensorCommandImpl
		 * @see robot.impl.RobotPackageImpl#getTimeSensorCommand()
		 * @generated
		 */
		EClass TIME_SENSOR_COMMAND = eINSTANCE.getTimeSensorCommand();

		/**
		 * The meta object literal for the '{@link robot.impl.ExpressionImpl <em>Expression</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.ExpressionImpl
		 * @see robot.impl.RobotPackageImpl#getExpression()
		 * @generated
		 */
		EClass EXPRESSION = eINSTANCE.getExpression();

		/**
		 * The meta object literal for the '{@link robot.impl.ArithmetiqueExpImpl <em>Arithmetique Exp</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.ArithmetiqueExpImpl
		 * @see robot.impl.RobotPackageImpl#getArithmetiqueExp()
		 * @generated
		 */
		EClass ARITHMETIQUE_EXP = eINSTANCE.getArithmetiqueExp();

		/**
		 * The meta object literal for the '{@link robot.impl.BooleanExpImpl <em>Boolean Exp</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.BooleanExpImpl
		 * @see robot.impl.RobotPackageImpl#getBooleanExp()
		 * @generated
		 */
		EClass BOOLEAN_EXP = eINSTANCE.getBooleanExp();

		/**
		 * The meta object literal for the '{@link robot.impl.PlusImpl <em>Plus</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.PlusImpl
		 * @see robot.impl.RobotPackageImpl#getPlus()
		 * @generated
		 */
		EClass PLUS = eINSTANCE.getPlus();

		/**
		 * The meta object literal for the '{@link robot.impl.MinusImpl <em>Minus</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.MinusImpl
		 * @see robot.impl.RobotPackageImpl#getMinus()
		 * @generated
		 */
		EClass MINUS = eINSTANCE.getMinus();

		/**
		 * The meta object literal for the '{@link robot.impl.MultImpl <em>Mult</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.MultImpl
		 * @see robot.impl.RobotPackageImpl#getMult()
		 * @generated
		 */
		EClass MULT = eINSTANCE.getMult();

		/**
		 * The meta object literal for the '{@link robot.impl.DivImpl <em>Div</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.DivImpl
		 * @see robot.impl.RobotPackageImpl#getDiv()
		 * @generated
		 */
		EClass DIV = eINSTANCE.getDiv();

		/**
		 * The meta object literal for the '{@link robot.impl.PrimaryExprAriImpl <em>Primary Expr Ari</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.PrimaryExprAriImpl
		 * @see robot.impl.RobotPackageImpl#getPrimaryExprAri()
		 * @generated
		 */
		EClass PRIMARY_EXPR_ARI = eINSTANCE.getPrimaryExprAri();

		/**
		 * The meta object literal for the '<em><b>Call</b></em>' containment reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EReference PRIMARY_EXPR_ARI__CALL = eINSTANCE.getPrimaryExprAri_Call();

		/**
		 * The meta object literal for the '<em><b>Type</b></em>' containment reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EReference PRIMARY_EXPR_ARI__TYPE = eINSTANCE.getPrimaryExprAri_Type();

		/**
		 * The meta object literal for the '{@link robot.impl.SecondaryExpAriImpl <em>Secondary Exp Ari</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.SecondaryExpAriImpl
		 * @see robot.impl.RobotPackageImpl#getSecondaryExpAri()
		 * @generated
		 */
		EClass SECONDARY_EXP_ARI = eINSTANCE.getSecondaryExpAri();

		/**
		 * The meta object literal for the '<em><b>Right</b></em>' containment reference list feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EReference SECONDARY_EXP_ARI__RIGHT = eINSTANCE.getSecondaryExpAri_Right();

		/**
		 * The meta object literal for the '<em><b>Left</b></em>' containment reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EReference SECONDARY_EXP_ARI__LEFT = eINSTANCE.getSecondaryExpAri_Left();

		/**
		 * The meta object literal for the '{@link robot.impl.DeclarationVariableImpl <em>Declaration Variable</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.DeclarationVariableImpl
		 * @see robot.impl.RobotPackageImpl#getDeclarationVariable()
		 * @generated
		 */
		EClass DECLARATION_VARIABLE = eINSTANCE.getDeclarationVariable();

		/**
		 * The meta object literal for the '<em><b>Nom</b></em>' attribute feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EAttribute DECLARATION_VARIABLE__NOM = eINSTANCE.getDeclarationVariable_Nom();

		/**
		 * The meta object literal for the '<em><b>Type</b></em>' containment reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EReference DECLARATION_VARIABLE__TYPE = eINSTANCE.getDeclarationVariable_Type();

		/**
		 * The meta object literal for the '<em><b>Expressionbase</b></em>' containment reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EReference DECLARATION_VARIABLE__EXPRESSIONBASE = eINSTANCE.getDeclarationVariable_Expressionbase();

		/**
		 * The meta object literal for the '{@link robot.impl.BlockImpl <em>Block</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.BlockImpl
		 * @see robot.impl.RobotPackageImpl#getBlock()
		 * @generated
		 */
		EClass BLOCK = eINSTANCE.getBlock();

		/**
		 * The meta object literal for the '<em><b>Instruction</b></em>' containment reference list feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EReference BLOCK__INSTRUCTION = eINSTANCE.getBlock_Instruction();

		/**
		 * The meta object literal for the '<em><b>Expression</b></em>' containment reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EReference BLOCK__EXPRESSION = eINSTANCE.getBlock_Expression();

		/**
		 * The meta object literal for the '{@link robot.impl.LOOPImpl <em>LOOP</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.LOOPImpl
		 * @see robot.impl.RobotPackageImpl#getLOOP()
		 * @generated
		 */
		EClass LOOP = eINSTANCE.getLOOP();

		/**
		 * The meta object literal for the '{@link robot.impl.IFImpl <em>IF</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.IFImpl
		 * @see robot.impl.RobotPackageImpl#getIF()
		 * @generated
		 */
		EClass IF = eINSTANCE.getIF();

		/**
		 * The meta object literal for the '{@link robot.impl.CallVariableImpl <em>Call Variable</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.CallVariableImpl
		 * @see robot.impl.RobotPackageImpl#getCallVariable()
		 * @generated
		 */
		EClass CALL_VARIABLE = eINSTANCE.getCallVariable();

		/**
		 * The meta object literal for the '{@link robot.impl.CallFunctionImpl <em>Call Function</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.CallFunctionImpl
		 * @see robot.impl.RobotPackageImpl#getCallFunction()
		 * @generated
		 */
		EClass CALL_FUNCTION = eINSTANCE.getCallFunction();

		/**
		 * The meta object literal for the '{@link robot.impl.CallImpl <em>Call</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.CallImpl
		 * @see robot.impl.RobotPackageImpl#getCall()
		 * @generated
		 */
		EClass CALL = eINSTANCE.getCall();

		/**
		 * The meta object literal for the '{@link robot.impl.ExpressionBaseImpl <em>Expression Base</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.ExpressionBaseImpl
		 * @see robot.impl.RobotPackageImpl#getExpressionBase()
		 * @generated
		 */
		EClass EXPRESSION_BASE = eINSTANCE.getExpressionBase();

		/**
		 * The meta object literal for the '{@link robot.impl.AffectationImpl <em>Affectation</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.AffectationImpl
		 * @see robot.impl.RobotPackageImpl#getAffectation()
		 * @generated
		 */
		EClass AFFECTATION = eINSTANCE.getAffectation();

		/**
		 * The meta object literal for the '<em><b>Callvariable</b></em>' containment reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EReference AFFECTATION__CALLVARIABLE = eINSTANCE.getAffectation_Callvariable();

		/**
		 * The meta object literal for the '<em><b>Expressionbase</b></em>' containment reference list feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EReference AFFECTATION__EXPRESSIONBASE = eINSTANCE.getAffectation_Expressionbase();

		/**
		 * The meta object literal for the '{@link robot.impl.PrimaryExprBoolImpl <em>Primary Expr Bool</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.PrimaryExprBoolImpl
		 * @see robot.impl.RobotPackageImpl#getPrimaryExprBool()
		 * @generated
		 */
		EClass PRIMARY_EXPR_BOOL = eINSTANCE.getPrimaryExprBool();

		/**
		 * The meta object literal for the '<em><b>Call</b></em>' containment reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EReference PRIMARY_EXPR_BOOL__CALL = eINSTANCE.getPrimaryExprBool_Call();

		/**
		 * The meta object literal for the '<em><b>Type</b></em>' containment reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EReference PRIMARY_EXPR_BOOL__TYPE = eINSTANCE.getPrimaryExprBool_Type();

		/**
		 * The meta object literal for the '{@link robot.impl.SecondaryExpBoolImpl <em>Secondary Exp Bool</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.SecondaryExpBoolImpl
		 * @see robot.impl.RobotPackageImpl#getSecondaryExpBool()
		 * @generated
		 */
		EClass SECONDARY_EXP_BOOL = eINSTANCE.getSecondaryExpBool();

		/**
		 * The meta object literal for the '<em><b>Left</b></em>' containment reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EReference SECONDARY_EXP_BOOL__LEFT = eINSTANCE.getSecondaryExpBool_Left();

		/**
		 * The meta object literal for the '<em><b>Right</b></em>' containment reference list feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EReference SECONDARY_EXP_BOOL__RIGHT = eINSTANCE.getSecondaryExpBool_Right();

		/**
		 * The meta object literal for the '{@link robot.impl.AndImpl <em>And</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.AndImpl
		 * @see robot.impl.RobotPackageImpl#getAnd()
		 * @generated
		 */
		EClass AND = eINSTANCE.getAnd();

		/**
		 * The meta object literal for the '{@link robot.impl.OrImpl <em>Or</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.OrImpl
		 * @see robot.impl.RobotPackageImpl#getOr()
		 * @generated
		 */
		EClass OR = eINSTANCE.getOr();

		/**
		 * The meta object literal for the '{@link robot.impl.NotImpl <em>Not</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.NotImpl
		 * @see robot.impl.RobotPackageImpl#getNot()
		 * @generated
		 */
		EClass NOT = eINSTANCE.getNot();

		/**
		 * The meta object literal for the '{@link robot.impl.EqualsImpl <em>Equals</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.EqualsImpl
		 * @see robot.impl.RobotPackageImpl#getEquals()
		 * @generated
		 */
		EClass EQUALS = eINSTANCE.getEquals();

		/**
		 * The meta object literal for the '{@link robot.impl.BooleanTypeImpl <em>Boolean Type</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.BooleanTypeImpl
		 * @see robot.impl.RobotPackageImpl#getBooleanType()
		 * @generated
		 */
		EClass BOOLEAN_TYPE = eINSTANCE.getBooleanType();

		/**
		 * The meta object literal for the '<em><b>Value</b></em>' attribute feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EAttribute BOOLEAN_TYPE__VALUE = eINSTANCE.getBooleanType_Value();

		/**
		 * The meta object literal for the '{@link robot.impl.NumberTypeImpl <em>Number Type</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.NumberTypeImpl
		 * @see robot.impl.RobotPackageImpl#getNumberType()
		 * @generated
		 */
		EClass NUMBER_TYPE = eINSTANCE.getNumberType();

		/**
		 * The meta object literal for the '<em><b>Value</b></em>' attribute feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		EAttribute NUMBER_TYPE__VALUE = eINSTANCE.getNumberType_Value();

		/**
		 * The meta object literal for the '{@link robot.impl.ELSEImpl <em>ELSE</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.impl.ELSEImpl
		 * @see robot.impl.RobotPackageImpl#getELSE()
		 * @generated
		 */
		EClass ELSE = eINSTANCE.getELSE();

		/**
		 * The meta object literal for the '{@link robot.Direction <em>Direction</em>}' enum.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see robot.Direction
		 * @see robot.impl.RobotPackageImpl#getDirection()
		 * @generated
		 */
		EEnum DIRECTION = eINSTANCE.getDirection();

	}

} //RobotPackage
