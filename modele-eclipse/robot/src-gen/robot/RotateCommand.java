/**
 */
package robot;

/**
 * <!-- begin-user-doc -->
 * A representation of the model object '<em><b>Rotate Command</b></em>'.
 * <!-- end-user-doc -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 *   <li>{@link robot.RotateCommand#getAngle <em>Angle</em>}</li>
 * </ul>
 *
 * @see robot.RobotPackage#getRotateCommand()
 * @model
 * @generated
 */
public interface RotateCommand extends Command {
	/**
	 * Returns the value of the '<em><b>Angle</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Angle</em>' attribute.
	 * @see #setAngle(double)
	 * @see robot.RobotPackage#getRotateCommand_Angle()
	 * @model
	 * @generated
	 */
	double getAngle();

	/**
	 * Sets the value of the '{@link robot.RotateCommand#getAngle <em>Angle</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param value the new value of the '<em>Angle</em>' attribute.
	 * @see #getAngle()
	 * @generated
	 */
	void setAngle(double value);

} // RotateCommand
