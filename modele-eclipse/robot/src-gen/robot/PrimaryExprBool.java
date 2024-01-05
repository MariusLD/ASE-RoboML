/**
 */
package robot;

/**
 * <!-- begin-user-doc -->
 * A representation of the model object '<em><b>Primary Expr Bool</b></em>'.
 * <!-- end-user-doc -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 *   <li>{@link robot.PrimaryExprBool#getType <em>Type</em>}</li>
 *   <li>{@link robot.PrimaryExprBool#getCall <em>Call</em>}</li>
 * </ul>
 *
 * @see robot.RobotPackage#getPrimaryExprBool()
 * @model
 * @generated
 */
public interface PrimaryExprBool extends BooleanExp {
	/**
	 * Returns the value of the '<em><b>Call</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Call</em>' containment reference.
	 * @see #setCall(Call)
	 * @see robot.RobotPackage#getPrimaryExprBool_Call()
	 * @model containment="true"
	 * @generated
	 */
	Call getCall();

	/**
	 * Sets the value of the '{@link robot.PrimaryExprBool#getCall <em>Call</em>}' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param value the new value of the '<em>Call</em>' containment reference.
	 * @see #getCall()
	 * @generated
	 */
	void setCall(Call value);

	/**
	 * Returns the value of the '<em><b>Type</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Type</em>' containment reference.
	 * @see #setType(TypeClass)
	 * @see robot.RobotPackage#getPrimaryExprBool_Type()
	 * @model containment="true"
	 * @generated
	 */
	TypeClass getType();

	/**
	 * Sets the value of the '{@link robot.PrimaryExprBool#getType <em>Type</em>}' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param value the new value of the '<em>Type</em>' containment reference.
	 * @see #getType()
	 * @generated
	 */
	void setType(TypeClass value);

} // PrimaryExprBool
