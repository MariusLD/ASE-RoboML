/**
 */
package robot.util;

import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.EPackage;

import org.eclipse.emf.ecore.util.Switch;

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
 * The <b>Switch</b> for the model's inheritance hierarchy.
 * It supports the call {@link #doSwitch(EObject) doSwitch(object)}
 * to invoke the <code>caseXXX</code> method for each class of the model,
 * starting with the actual class of the object
 * and proceeding up the inheritance hierarchy
 * until a non-null result is returned,
 * which is the result of the switch.
 * <!-- end-user-doc -->
 * @see robot.RobotPackage
 * @generated
 */
public class RobotSwitch<T> extends Switch<T> {
	/**
	 * The cached model package
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	protected static RobotPackage modelPackage;

	/**
	 * Creates an instance of the switch.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public RobotSwitch() {
		if (modelPackage == null) {
			modelPackage = RobotPackage.eINSTANCE;
		}
	}

	/**
	 * Checks whether this is a switch for the given package.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param ePackage the package in question.
	 * @return whether this is a switch for the given package.
	 * @generated
	 */
	@Override
	protected boolean isSwitchFor(EPackage ePackage) {
		return ePackage == modelPackage;
	}

	/**
	 * Calls <code>caseXXX</code> for each class of the model until one returns a non null result; it yields that result.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the first non-null result returned by a <code>caseXXX</code> call.
	 * @generated
	 */
	@Override
	protected T doSwitch(int classifierID, EObject theEObject) {
		switch (classifierID) {
		case RobotPackage.ROBOT: {
			Robot robot = (Robot) theEObject;
			T result = caseRobot(robot);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.FUNCTION: {
			Function function = (Function) theEObject;
			T result = caseFunction(function);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.INSTRUCTION: {
			Instruction instruction = (Instruction) theEObject;
			T result = caseInstruction(instruction);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.COMMAND: {
			Command command = (Command) theEObject;
			T result = caseCommand(command);
			if (result == null)
				result = caseInstruction(command);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.ROTATE_COMMAND: {
			RotateCommand rotateCommand = (RotateCommand) theEObject;
			T result = caseRotateCommand(rotateCommand);
			if (result == null)
				result = caseCommand(rotateCommand);
			if (result == null)
				result = caseInstruction(rotateCommand);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.DIRECTION_COMMAND: {
			DirectionCommand directionCommand = (DirectionCommand) theEObject;
			T result = caseDirectionCommand(directionCommand);
			if (result == null)
				result = caseCommand(directionCommand);
			if (result == null)
				result = caseInstruction(directionCommand);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.SPEED_COMMAND: {
			SpeedCommand speedCommand = (SpeedCommand) theEObject;
			T result = caseSpeedCommand(speedCommand);
			if (result == null)
				result = caseCommand(speedCommand);
			if (result == null)
				result = caseInstruction(speedCommand);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.TYPE: {
			Type type = (Type) theEObject;
			T result = caseType(type);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.DISTANCE: {
			Distance distance = (Distance) theEObject;
			T result = caseDistance(distance);
			if (result == null)
				result = caseType(distance);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.CM: {
			CM cm = (CM) theEObject;
			T result = caseCM(cm);
			if (result == null)
				result = caseDistance(cm);
			if (result == null)
				result = caseType(cm);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.MM: {
			mm mm = (mm) theEObject;
			T result = casemm(mm);
			if (result == null)
				result = caseDistance(mm);
			if (result == null)
				result = caseType(mm);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.READ_SENSOR_COMMAND: {
			ReadSensorCommand readSensorCommand = (ReadSensorCommand) theEObject;
			T result = caseReadSensorCommand(readSensorCommand);
			if (result == null)
				result = caseCommand(readSensorCommand);
			if (result == null)
				result = caseInstruction(readSensorCommand);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.DISTANCE_SENSOR_COMMAND: {
			DistanceSensorCommand distanceSensorCommand = (DistanceSensorCommand) theEObject;
			T result = caseDistanceSensorCommand(distanceSensorCommand);
			if (result == null)
				result = caseReadSensorCommand(distanceSensorCommand);
			if (result == null)
				result = caseCommand(distanceSensorCommand);
			if (result == null)
				result = caseInstruction(distanceSensorCommand);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.TIME_SENSOR_COMMAND: {
			TimeSensorCommand timeSensorCommand = (TimeSensorCommand) theEObject;
			T result = caseTimeSensorCommand(timeSensorCommand);
			if (result == null)
				result = caseReadSensorCommand(timeSensorCommand);
			if (result == null)
				result = caseCommand(timeSensorCommand);
			if (result == null)
				result = caseInstruction(timeSensorCommand);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.EXPRESSION: {
			Expression expression = (Expression) theEObject;
			T result = caseExpression(expression);
			if (result == null)
				result = caseExpressionBase(expression);
			if (result == null)
				result = caseInstruction(expression);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.ARITHMETIQUE_EXP: {
			ArithmetiqueExp arithmetiqueExp = (ArithmetiqueExp) theEObject;
			T result = caseArithmetiqueExp(arithmetiqueExp);
			if (result == null)
				result = caseExpression(arithmetiqueExp);
			if (result == null)
				result = caseExpressionBase(arithmetiqueExp);
			if (result == null)
				result = caseInstruction(arithmetiqueExp);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.BOOLEAN_EXP: {
			BooleanExp booleanExp = (BooleanExp) theEObject;
			T result = caseBooleanExp(booleanExp);
			if (result == null)
				result = caseExpression(booleanExp);
			if (result == null)
				result = caseExpressionBase(booleanExp);
			if (result == null)
				result = caseInstruction(booleanExp);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.PLUS: {
			Plus plus = (Plus) theEObject;
			T result = casePlus(plus);
			if (result == null)
				result = caseSecondaryExpAri(plus);
			if (result == null)
				result = caseArithmetiqueExp(plus);
			if (result == null)
				result = caseExpression(plus);
			if (result == null)
				result = caseExpressionBase(plus);
			if (result == null)
				result = caseInstruction(plus);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.MINUS: {
			Minus minus = (Minus) theEObject;
			T result = caseMinus(minus);
			if (result == null)
				result = caseSecondaryExpAri(minus);
			if (result == null)
				result = caseArithmetiqueExp(minus);
			if (result == null)
				result = caseExpression(minus);
			if (result == null)
				result = caseExpressionBase(minus);
			if (result == null)
				result = caseInstruction(minus);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.MULT: {
			Mult mult = (Mult) theEObject;
			T result = caseMult(mult);
			if (result == null)
				result = caseSecondaryExpAri(mult);
			if (result == null)
				result = caseArithmetiqueExp(mult);
			if (result == null)
				result = caseExpression(mult);
			if (result == null)
				result = caseExpressionBase(mult);
			if (result == null)
				result = caseInstruction(mult);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.DIV: {
			Div div = (Div) theEObject;
			T result = caseDiv(div);
			if (result == null)
				result = caseSecondaryExpAri(div);
			if (result == null)
				result = caseArithmetiqueExp(div);
			if (result == null)
				result = caseExpression(div);
			if (result == null)
				result = caseExpressionBase(div);
			if (result == null)
				result = caseInstruction(div);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.PRIMARY_EXPR_ARI: {
			PrimaryExprAri primaryExprAri = (PrimaryExprAri) theEObject;
			T result = casePrimaryExprAri(primaryExprAri);
			if (result == null)
				result = caseArithmetiqueExp(primaryExprAri);
			if (result == null)
				result = caseExpression(primaryExprAri);
			if (result == null)
				result = caseExpressionBase(primaryExprAri);
			if (result == null)
				result = caseInstruction(primaryExprAri);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.SECONDARY_EXP_ARI: {
			SecondaryExpAri secondaryExpAri = (SecondaryExpAri) theEObject;
			T result = caseSecondaryExpAri(secondaryExpAri);
			if (result == null)
				result = caseArithmetiqueExp(secondaryExpAri);
			if (result == null)
				result = caseExpression(secondaryExpAri);
			if (result == null)
				result = caseExpressionBase(secondaryExpAri);
			if (result == null)
				result = caseInstruction(secondaryExpAri);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.DECLARATION_VARIABLE: {
			DeclarationVariable declarationVariable = (DeclarationVariable) theEObject;
			T result = caseDeclarationVariable(declarationVariable);
			if (result == null)
				result = caseInstruction(declarationVariable);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.BLOCK: {
			Block block = (Block) theEObject;
			T result = caseBlock(block);
			if (result == null)
				result = caseInstruction(block);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.LOOP: {
			LOOP loop = (LOOP) theEObject;
			T result = caseLOOP(loop);
			if (result == null)
				result = caseBlock(loop);
			if (result == null)
				result = caseInstruction(loop);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.IF: {
			IF if_ = (IF) theEObject;
			T result = caseIF(if_);
			if (result == null)
				result = caseBlock(if_);
			if (result == null)
				result = caseInstruction(if_);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.CALL_VARIABLE: {
			CallVariable callVariable = (CallVariable) theEObject;
			T result = caseCallVariable(callVariable);
			if (result == null)
				result = caseCall(callVariable);
			if (result == null)
				result = caseExpressionBase(callVariable);
			if (result == null)
				result = caseInstruction(callVariable);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.CALL_FUNCTION: {
			CallFunction callFunction = (CallFunction) theEObject;
			T result = caseCallFunction(callFunction);
			if (result == null)
				result = caseCall(callFunction);
			if (result == null)
				result = caseExpressionBase(callFunction);
			if (result == null)
				result = caseInstruction(callFunction);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.CALL: {
			Call call = (Call) theEObject;
			T result = caseCall(call);
			if (result == null)
				result = caseExpressionBase(call);
			if (result == null)
				result = caseInstruction(call);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.EXPRESSION_BASE: {
			ExpressionBase expressionBase = (ExpressionBase) theEObject;
			T result = caseExpressionBase(expressionBase);
			if (result == null)
				result = caseInstruction(expressionBase);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.AFFECTATION: {
			Affectation affectation = (Affectation) theEObject;
			T result = caseAffectation(affectation);
			if (result == null)
				result = caseExpressionBase(affectation);
			if (result == null)
				result = caseInstruction(affectation);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.PRIMARY_EXPR_BOOL: {
			PrimaryExprBool primaryExprBool = (PrimaryExprBool) theEObject;
			T result = casePrimaryExprBool(primaryExprBool);
			if (result == null)
				result = caseBooleanExp(primaryExprBool);
			if (result == null)
				result = caseExpression(primaryExprBool);
			if (result == null)
				result = caseExpressionBase(primaryExprBool);
			if (result == null)
				result = caseInstruction(primaryExprBool);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.SECONDARY_EXP_BOOL: {
			SecondaryExpBool secondaryExpBool = (SecondaryExpBool) theEObject;
			T result = caseSecondaryExpBool(secondaryExpBool);
			if (result == null)
				result = caseBooleanExp(secondaryExpBool);
			if (result == null)
				result = caseExpression(secondaryExpBool);
			if (result == null)
				result = caseExpressionBase(secondaryExpBool);
			if (result == null)
				result = caseInstruction(secondaryExpBool);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.AND: {
			And and = (And) theEObject;
			T result = caseAnd(and);
			if (result == null)
				result = caseSecondaryExpBool(and);
			if (result == null)
				result = caseBooleanExp(and);
			if (result == null)
				result = caseExpression(and);
			if (result == null)
				result = caseExpressionBase(and);
			if (result == null)
				result = caseInstruction(and);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.OR: {
			Or or = (Or) theEObject;
			T result = caseOr(or);
			if (result == null)
				result = caseSecondaryExpBool(or);
			if (result == null)
				result = caseBooleanExp(or);
			if (result == null)
				result = caseExpression(or);
			if (result == null)
				result = caseExpressionBase(or);
			if (result == null)
				result = caseInstruction(or);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.NOT: {
			Not not = (Not) theEObject;
			T result = caseNot(not);
			if (result == null)
				result = caseSecondaryExpBool(not);
			if (result == null)
				result = caseBooleanExp(not);
			if (result == null)
				result = caseExpression(not);
			if (result == null)
				result = caseExpressionBase(not);
			if (result == null)
				result = caseInstruction(not);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.EQUALS: {
			Equals equals = (Equals) theEObject;
			T result = caseEquals(equals);
			if (result == null)
				result = caseSecondaryExpBool(equals);
			if (result == null)
				result = caseBooleanExp(equals);
			if (result == null)
				result = caseExpression(equals);
			if (result == null)
				result = caseExpressionBase(equals);
			if (result == null)
				result = caseInstruction(equals);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.BOOLEAN: {
			robot.Boolean boolean_ = (robot.Boolean) theEObject;
			T result = caseBoolean(boolean_);
			if (result == null)
				result = caseType(boolean_);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.NUMBER: {
			robot.Number number = (robot.Number) theEObject;
			T result = caseNumber(number);
			if (result == null)
				result = caseType(number);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		case RobotPackage.ELSE: {
			ELSE else_ = (ELSE) theEObject;
			T result = caseELSE(else_);
			if (result == null)
				result = caseBlock(else_);
			if (result == null)
				result = caseInstruction(else_);
			if (result == null)
				result = defaultCase(theEObject);
			return result;
		}
		default:
			return defaultCase(theEObject);
		}
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Robot</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Robot</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseRobot(Robot object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Function</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Function</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseFunction(Function object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Instruction</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Instruction</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseInstruction(Instruction object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Command</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Command</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseCommand(Command object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Rotate Command</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Rotate Command</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseRotateCommand(RotateCommand object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Direction Command</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Direction Command</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseDirectionCommand(DirectionCommand object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Speed Command</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Speed Command</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseSpeedCommand(SpeedCommand object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Type</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Type</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseType(Type object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Distance</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Distance</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseDistance(Distance object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>CM</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>CM</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseCM(CM object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>mm</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>mm</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T casemm(mm object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Read Sensor Command</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Read Sensor Command</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseReadSensorCommand(ReadSensorCommand object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Distance Sensor Command</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Distance Sensor Command</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseDistanceSensorCommand(DistanceSensorCommand object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Time Sensor Command</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Time Sensor Command</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseTimeSensorCommand(TimeSensorCommand object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Expression</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Expression</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseExpression(Expression object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Arithmetique Exp</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Arithmetique Exp</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseArithmetiqueExp(ArithmetiqueExp object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Boolean Exp</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Boolean Exp</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseBooleanExp(BooleanExp object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Plus</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Plus</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T casePlus(Plus object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Minus</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Minus</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseMinus(Minus object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Mult</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Mult</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseMult(Mult object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Div</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Div</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseDiv(Div object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Primary Expr Ari</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Primary Expr Ari</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T casePrimaryExprAri(PrimaryExprAri object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Secondary Exp Ari</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Secondary Exp Ari</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseSecondaryExpAri(SecondaryExpAri object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Declaration Variable</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Declaration Variable</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseDeclarationVariable(DeclarationVariable object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Block</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Block</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseBlock(Block object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>LOOP</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>LOOP</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseLOOP(LOOP object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>IF</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>IF</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseIF(IF object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Call Variable</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Call Variable</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseCallVariable(CallVariable object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Call Function</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Call Function</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseCallFunction(CallFunction object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Call</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Call</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseCall(Call object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Expression Base</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Expression Base</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseExpressionBase(ExpressionBase object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Affectation</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Affectation</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseAffectation(Affectation object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Primary Expr Bool</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Primary Expr Bool</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T casePrimaryExprBool(PrimaryExprBool object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Secondary Exp Bool</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Secondary Exp Bool</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseSecondaryExpBool(SecondaryExpBool object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>And</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>And</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseAnd(And object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Or</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Or</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseOr(Or object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Not</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Not</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseNot(Not object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Equals</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Equals</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseEquals(Equals object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Boolean</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Boolean</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseBoolean(robot.Boolean object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Number</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Number</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseNumber(robot.Number object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>ELSE</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>ELSE</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseELSE(ELSE object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>EObject</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch, but this is the last case anyway.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>EObject</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject)
	 * @generated
	 */
	@Override
	public T defaultCase(EObject object) {
		return null;
	}

} //RobotSwitch
