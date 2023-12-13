/**
 */
package robot.util;

import org.eclipse.emf.common.notify.Adapter;
import org.eclipse.emf.common.notify.Notifier;

import org.eclipse.emf.common.notify.impl.AdapterFactoryImpl;

import org.eclipse.emf.ecore.EObject;

import robot.Affectation;
import robot.And;
import robot.ArithmetiqueExp;
import robot.Block;
import robot.BooleanExp;
import robot.CM;
import robot.Call;
import robot.CallFunction;
import robot.CallVariable;
import robot.Command;
import robot.DeclarationVariable;
import robot.DirectionCommand;
import robot.Distance;
import robot.DistanceSensorCommand;
import robot.Div;
import robot.ELSE;
import robot.Equals;
import robot.Expression;
import robot.ExpressionBase;
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
import robot.RobotPackage;
import robot.RotateCommand;
import robot.SecondaryExpAri;
import robot.SecondaryExpBool;
import robot.SpeedCommand;
import robot.TimeSensorCommand;
import robot.Type;
import robot.mm;

/**
 * <!-- begin-user-doc -->
 * The <b>Adapter Factory</b> for the model.
 * It provides an adapter <code>createXXX</code> method for each class of the model.
 * <!-- end-user-doc -->
 * @see robot.RobotPackage
 * @generated
 */
public class RobotAdapterFactory extends AdapterFactoryImpl {
	/**
	 * The cached model package.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	protected static RobotPackage modelPackage;

	/**
	 * Creates an instance of the adapter factory.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public RobotAdapterFactory() {
		if (modelPackage == null) {
			modelPackage = RobotPackage.eINSTANCE;
		}
	}

	/**
	 * Returns whether this factory is applicable for the type of the object.
	 * <!-- begin-user-doc -->
	 * This implementation returns <code>true</code> if the object is either the model's package or is an instance object of the model.
	 * <!-- end-user-doc -->
	 * @return whether this factory is applicable for the type of the object.
	 * @generated
	 */
	@Override
	public boolean isFactoryForType(Object object) {
		if (object == modelPackage) {
			return true;
		}
		if (object instanceof EObject) {
			return ((EObject) object).eClass().getEPackage() == modelPackage;
		}
		return false;
	}

	/**
	 * The switch that delegates to the <code>createXXX</code> methods.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	protected RobotSwitch<Adapter> modelSwitch = new RobotSwitch<Adapter>() {
		@Override
		public Adapter caseRobot(Robot object) {
			return createRobotAdapter();
		}

		@Override
		public Adapter caseFunction(Function object) {
			return createFunctionAdapter();
		}

		@Override
		public Adapter caseInstruction(Instruction object) {
			return createInstructionAdapter();
		}

		@Override
		public Adapter caseCommand(Command object) {
			return createCommandAdapter();
		}

		@Override
		public Adapter caseRotateCommand(RotateCommand object) {
			return createRotateCommandAdapter();
		}

		@Override
		public Adapter caseDirectionCommand(DirectionCommand object) {
			return createDirectionCommandAdapter();
		}

		@Override
		public Adapter caseSpeedCommand(SpeedCommand object) {
			return createSpeedCommandAdapter();
		}

		@Override
		public Adapter caseType(Type object) {
			return createTypeAdapter();
		}

		@Override
		public Adapter caseDistance(Distance object) {
			return createDistanceAdapter();
		}

		@Override
		public Adapter caseCM(CM object) {
			return createCMAdapter();
		}

		@Override
		public Adapter casemm(mm object) {
			return createmmAdapter();
		}

		@Override
		public Adapter caseReadSensorCommand(ReadSensorCommand object) {
			return createReadSensorCommandAdapter();
		}

		@Override
		public Adapter caseDistanceSensorCommand(DistanceSensorCommand object) {
			return createDistanceSensorCommandAdapter();
		}

		@Override
		public Adapter caseTimeSensorCommand(TimeSensorCommand object) {
			return createTimeSensorCommandAdapter();
		}

		@Override
		public Adapter caseExpression(Expression object) {
			return createExpressionAdapter();
		}

		@Override
		public Adapter caseArithmetiqueExp(ArithmetiqueExp object) {
			return createArithmetiqueExpAdapter();
		}

		@Override
		public Adapter caseBooleanExp(BooleanExp object) {
			return createBooleanExpAdapter();
		}

		@Override
		public Adapter casePlus(Plus object) {
			return createPlusAdapter();
		}

		@Override
		public Adapter caseMinus(Minus object) {
			return createMinusAdapter();
		}

		@Override
		public Adapter caseMult(Mult object) {
			return createMultAdapter();
		}

		@Override
		public Adapter caseDiv(Div object) {
			return createDivAdapter();
		}

		@Override
		public Adapter casePrimaryExprAri(PrimaryExprAri object) {
			return createPrimaryExprAriAdapter();
		}

		@Override
		public Adapter caseSecondaryExpAri(SecondaryExpAri object) {
			return createSecondaryExpAriAdapter();
		}

		@Override
		public Adapter caseDeclarationVariable(DeclarationVariable object) {
			return createDeclarationVariableAdapter();
		}

		@Override
		public Adapter caseBlock(Block object) {
			return createBlockAdapter();
		}

		@Override
		public Adapter caseLOOP(LOOP object) {
			return createLOOPAdapter();
		}

		@Override
		public Adapter caseIF(IF object) {
			return createIFAdapter();
		}

		@Override
		public Adapter caseCallVariable(CallVariable object) {
			return createCallVariableAdapter();
		}

		@Override
		public Adapter caseCallFunction(CallFunction object) {
			return createCallFunctionAdapter();
		}

		@Override
		public Adapter caseCall(Call object) {
			return createCallAdapter();
		}

		@Override
		public Adapter caseExpressionBase(ExpressionBase object) {
			return createExpressionBaseAdapter();
		}

		@Override
		public Adapter caseAffectation(Affectation object) {
			return createAffectationAdapter();
		}

		@Override
		public Adapter casePrimaryExprBool(PrimaryExprBool object) {
			return createPrimaryExprBoolAdapter();
		}

		@Override
		public Adapter caseSecondaryExpBool(SecondaryExpBool object) {
			return createSecondaryExpBoolAdapter();
		}

		@Override
		public Adapter caseAnd(And object) {
			return createAndAdapter();
		}

		@Override
		public Adapter caseOr(Or object) {
			return createOrAdapter();
		}

		@Override
		public Adapter caseNot(Not object) {
			return createNotAdapter();
		}

		@Override
		public Adapter caseEquals(Equals object) {
			return createEqualsAdapter();
		}

		@Override
		public Adapter caseBoolean(robot.Boolean object) {
			return createBooleanAdapter();
		}

		@Override
		public Adapter caseNumber(robot.Number object) {
			return createNumberAdapter();
		}

		@Override
		public Adapter caseELSE(ELSE object) {
			return createELSEAdapter();
		}

		@Override
		public Adapter defaultCase(EObject object) {
			return createEObjectAdapter();
		}
	};

	/**
	 * Creates an adapter for the <code>target</code>.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param target the object to adapt.
	 * @return the adapter for the <code>target</code>.
	 * @generated
	 */
	@Override
	public Adapter createAdapter(Notifier target) {
		return modelSwitch.doSwitch((EObject) target);
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.Robot <em>Robot</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.Robot
	 * @generated
	 */
	public Adapter createRobotAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.Function <em>Function</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.Function
	 * @generated
	 */
	public Adapter createFunctionAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.Instruction <em>Instruction</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.Instruction
	 * @generated
	 */
	public Adapter createInstructionAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.Command <em>Command</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.Command
	 * @generated
	 */
	public Adapter createCommandAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.RotateCommand <em>Rotate Command</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.RotateCommand
	 * @generated
	 */
	public Adapter createRotateCommandAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.DirectionCommand <em>Direction Command</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.DirectionCommand
	 * @generated
	 */
	public Adapter createDirectionCommandAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.SpeedCommand <em>Speed Command</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.SpeedCommand
	 * @generated
	 */
	public Adapter createSpeedCommandAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.Type <em>Type</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.Type
	 * @generated
	 */
	public Adapter createTypeAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.Distance <em>Distance</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.Distance
	 * @generated
	 */
	public Adapter createDistanceAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.CM <em>CM</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.CM
	 * @generated
	 */
	public Adapter createCMAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.mm <em>mm</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.mm
	 * @generated
	 */
	public Adapter createmmAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.ReadSensorCommand <em>Read Sensor Command</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.ReadSensorCommand
	 * @generated
	 */
	public Adapter createReadSensorCommandAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.DistanceSensorCommand <em>Distance Sensor Command</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.DistanceSensorCommand
	 * @generated
	 */
	public Adapter createDistanceSensorCommandAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.TimeSensorCommand <em>Time Sensor Command</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.TimeSensorCommand
	 * @generated
	 */
	public Adapter createTimeSensorCommandAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.Expression <em>Expression</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.Expression
	 * @generated
	 */
	public Adapter createExpressionAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.ArithmetiqueExp <em>Arithmetique Exp</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.ArithmetiqueExp
	 * @generated
	 */
	public Adapter createArithmetiqueExpAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.BooleanExp <em>Boolean Exp</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.BooleanExp
	 * @generated
	 */
	public Adapter createBooleanExpAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.Plus <em>Plus</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.Plus
	 * @generated
	 */
	public Adapter createPlusAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.Minus <em>Minus</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.Minus
	 * @generated
	 */
	public Adapter createMinusAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.Mult <em>Mult</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.Mult
	 * @generated
	 */
	public Adapter createMultAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.Div <em>Div</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.Div
	 * @generated
	 */
	public Adapter createDivAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.PrimaryExprAri <em>Primary Expr Ari</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.PrimaryExprAri
	 * @generated
	 */
	public Adapter createPrimaryExprAriAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.SecondaryExpAri <em>Secondary Exp Ari</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.SecondaryExpAri
	 * @generated
	 */
	public Adapter createSecondaryExpAriAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.DeclarationVariable <em>Declaration Variable</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.DeclarationVariable
	 * @generated
	 */
	public Adapter createDeclarationVariableAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.Block <em>Block</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.Block
	 * @generated
	 */
	public Adapter createBlockAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.LOOP <em>LOOP</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.LOOP
	 * @generated
	 */
	public Adapter createLOOPAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.IF <em>IF</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.IF
	 * @generated
	 */
	public Adapter createIFAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.CallVariable <em>Call Variable</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.CallVariable
	 * @generated
	 */
	public Adapter createCallVariableAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.CallFunction <em>Call Function</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.CallFunction
	 * @generated
	 */
	public Adapter createCallFunctionAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.Call <em>Call</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.Call
	 * @generated
	 */
	public Adapter createCallAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.ExpressionBase <em>Expression Base</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.ExpressionBase
	 * @generated
	 */
	public Adapter createExpressionBaseAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.Affectation <em>Affectation</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.Affectation
	 * @generated
	 */
	public Adapter createAffectationAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.PrimaryExprBool <em>Primary Expr Bool</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.PrimaryExprBool
	 * @generated
	 */
	public Adapter createPrimaryExprBoolAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.SecondaryExpBool <em>Secondary Exp Bool</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.SecondaryExpBool
	 * @generated
	 */
	public Adapter createSecondaryExpBoolAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.And <em>And</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.And
	 * @generated
	 */
	public Adapter createAndAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.Or <em>Or</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.Or
	 * @generated
	 */
	public Adapter createOrAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.Not <em>Not</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.Not
	 * @generated
	 */
	public Adapter createNotAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.Equals <em>Equals</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.Equals
	 * @generated
	 */
	public Adapter createEqualsAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.Boolean <em>Boolean</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.Boolean
	 * @generated
	 */
	public Adapter createBooleanAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.Number <em>Number</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.Number
	 * @generated
	 */
	public Adapter createNumberAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link robot.ELSE <em>ELSE</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see robot.ELSE
	 * @generated
	 */
	public Adapter createELSEAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for the default case.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @generated
	 */
	public Adapter createEObjectAdapter() {
		return null;
	}

} //RobotAdapterFactory
