/**
 */
package robot;

import org.eclipse.emf.common.util.EList;

/**
 * <!-- begin-user-doc -->
 * A representation of the model object '<em><b>Affectation</b></em>'.
 * <!-- end-user-doc -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 *   <li>{@link robot.Affectation#getCallvariable <em>Callvariable</em>}</li>
 *   <li>{@link robot.Affectation#getExpressionbase <em>Expressionbase</em>}</li>
 * </ul>
 *
 * @see robot.RobotPackage#getAffectation()
 * @model
 * @generated
 */
public interface Affectation extends ExpressionBase {
	/**
	 * Returns the value of the '<em><b>Callvariable</b></em>' reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Callvariable</em>' reference.
	 * @see #setCallvariable(CallVariable)
	 * @see robot.RobotPackage#getAffectation_Callvariable()
	 * @model
	 * @generated
	 */
	CallVariable getCallvariable();

	/**
	 * Sets the value of the '{@link robot.Affectation#getCallvariable <em>Callvariable</em>}' reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param value the new value of the '<em>Callvariable</em>' reference.
	 * @see #getCallvariable()
	 * @generated
	 */
	void setCallvariable(CallVariable value);

	/**
	 * Returns the value of the '<em><b>Expressionbase</b></em>' containment reference list.
	 * The list contents are of type {@link robot.ExpressionBase}.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Expressionbase</em>' containment reference list.
	 * @see robot.RobotPackage#getAffectation_Expressionbase()
	 * @model containment="true" required="true"
	 * @generated
	 */
	EList<ExpressionBase> getExpressionbase();

} // Affectation
