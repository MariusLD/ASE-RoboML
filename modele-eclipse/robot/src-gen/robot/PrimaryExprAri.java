/**
 */
package robot;

/**
 * <!-- begin-user-doc -->
 * A representation of the model object '<em><b>Primary Expr Ari</b></em>'.
 * <!-- end-user-doc -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 *   <li>{@link robot.PrimaryExprAri#getType <em>Type</em>}</li>
 *   <li>{@link robot.PrimaryExprAri#getCall <em>Call</em>}</li>
 * </ul>
 *
 * @see robot.RobotPackage#getPrimaryExprAri()
 * @model
 * @generated
 */
public interface PrimaryExprAri extends ArithmetiqueExp {
	/**
	 * Returns the value of the '<em><b>Call</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Call</em>' containment reference.
	 * @see #setCall(Call)
	 * @see robot.RobotPackage#getPrimaryExprAri_Call()
	 * @model containment="true"
	 * @generated
	 */
	Call getCall();

	/**
	 * Sets the value of the '{@link robot.PrimaryExprAri#getCall <em>Call</em>}' containment reference.
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
	 * @see robot.RobotPackage#getPrimaryExprAri_Type()
	 * @model containment="true"
	 * @generated
	 */
	TypeClass getType();

	/**
	 * Sets the value of the '{@link robot.PrimaryExprAri#getType <em>Type</em>}' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param value the new value of the '<em>Type</em>' containment reference.
	 * @see #getType()
	 * @generated
	 */
	void setType(TypeClass value);

} // PrimaryExprAri
