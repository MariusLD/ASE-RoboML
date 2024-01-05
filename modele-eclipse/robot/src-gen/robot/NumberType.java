/**
 */
package robot;

/**
 * <!-- begin-user-doc -->
 * A representation of the model object '<em><b>Number Type</b></em>'.
 * <!-- end-user-doc -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 *   <li>{@link robot.NumberType#getValue <em>Value</em>}</li>
 * </ul>
 *
 * @see robot.RobotPackage#getNumberType()
 * @model
 * @generated
 */
public interface NumberType extends TypeClass {
	/**
	 * Returns the value of the '<em><b>Value</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Value</em>' attribute.
	 * @see #setValue(double)
	 * @see robot.RobotPackage#getNumberType_Value()
	 * @model
	 * @generated
	 */
	double getValue();

	/**
	 * Sets the value of the '{@link robot.NumberType#getValue <em>Value</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param value the new value of the '<em>Value</em>' attribute.
	 * @see #getValue()
	 * @generated
	 */
	void setValue(double value);

} // NumberType
