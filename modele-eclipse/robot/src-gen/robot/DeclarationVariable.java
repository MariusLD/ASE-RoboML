/**
 */
package robot;

/**
 * <!-- begin-user-doc -->
 * A representation of the model object '<em><b>Declaration Variable</b></em>'.
 * <!-- end-user-doc -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 *   <li>{@link robot.DeclarationVariable#getNom <em>Nom</em>}</li>
 *   <li>{@link robot.DeclarationVariable#getExpressionbase <em>Expressionbase</em>}</li>
 *   <li>{@link robot.DeclarationVariable#getType <em>Type</em>}</li>
 * </ul>
 *
 * @see robot.RobotPackage#getDeclarationVariable()
 * @model
 * @generated
 */
public interface DeclarationVariable extends Instruction {
	/**
	 * Returns the value of the '<em><b>Nom</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Nom</em>' attribute.
	 * @see #setNom(String)
	 * @see robot.RobotPackage#getDeclarationVariable_Nom()
	 * @model
	 * @generated
	 */
	String getNom();

	/**
	 * Sets the value of the '{@link robot.DeclarationVariable#getNom <em>Nom</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param value the new value of the '<em>Nom</em>' attribute.
	 * @see #getNom()
	 * @generated
	 */
	void setNom(String value);

	/**
	 * Returns the value of the '<em><b>Type</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Type</em>' containment reference.
	 * @see #setType(TypeClass)
	 * @see robot.RobotPackage#getDeclarationVariable_Type()
	 * @model containment="true" required="true"
	 * @generated
	 */
	TypeClass getType();

	/**
	 * Sets the value of the '{@link robot.DeclarationVariable#getType <em>Type</em>}' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param value the new value of the '<em>Type</em>' containment reference.
	 * @see #getType()
	 * @generated
	 */
	void setType(TypeClass value);

	/**
	 * Returns the value of the '<em><b>Expressionbase</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Expressionbase</em>' containment reference.
	 * @see #setExpressionbase(ExpressionBase)
	 * @see robot.RobotPackage#getDeclarationVariable_Expressionbase()
	 * @model containment="true"
	 * @generated
	 */
	ExpressionBase getExpressionbase();

	/**
	 * Sets the value of the '{@link robot.DeclarationVariable#getExpressionbase <em>Expressionbase</em>}' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param value the new value of the '<em>Expressionbase</em>' containment reference.
	 * @see #getExpressionbase()
	 * @generated
	 */
	void setExpressionbase(ExpressionBase value);

} // DeclarationVariable
