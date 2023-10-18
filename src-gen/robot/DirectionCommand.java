/**
 */
package robot;

/**
 * <!-- begin-user-doc -->
 * A representation of the model object '<em><b>Direction Command</b></em>'.
 * <!-- end-user-doc -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 *   <li>{@link robot.DirectionCommand#getDistance <em>Distance</em>}</li>
 * </ul>
 *
 * @see robot.RobotPackage#getDirectionCommand()
 * @model
 * @generated
 */
public interface DirectionCommand extends Command {
	/**
	 * Returns the value of the '<em><b>Distance</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Distance</em>' containment reference.
	 * @see #setDistance(Distance)
	 * @see robot.RobotPackage#getDirectionCommand_Distance()
	 * @model containment="true" required="true"
	 * @generated
	 */
	Distance getDistance();

	/**
	 * Sets the value of the '{@link robot.DirectionCommand#getDistance <em>Distance</em>}' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param value the new value of the '<em>Distance</em>' containment reference.
	 * @see #getDistance()
	 * @generated
	 */
	void setDistance(Distance value);

} // DirectionCommand
