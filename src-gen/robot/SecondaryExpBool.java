/**
 */
package robot;

import org.eclipse.emf.common.util.EList;

/**
 * <!-- begin-user-doc -->
 * A representation of the model object '<em><b>Secondary Exp Bool</b></em>'.
 * <!-- end-user-doc -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 *   <li>{@link robot.SecondaryExpBool#getLeft <em>Left</em>}</li>
 *   <li>{@link robot.SecondaryExpBool#getRight <em>Right</em>}</li>
 * </ul>
 *
 * @see robot.RobotPackage#getSecondaryExpBool()
 * @model
 * @generated
 */
public interface SecondaryExpBool extends BooleanExp {
	/**
	 * Returns the value of the '<em><b>Left</b></em>' reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Left</em>' reference.
	 * @see #setLeft(BooleanExp)
	 * @see robot.RobotPackage#getSecondaryExpBool_Left()
	 * @model required="true"
	 * @generated
	 */
	BooleanExp getLeft();

	/**
	 * Sets the value of the '{@link robot.SecondaryExpBool#getLeft <em>Left</em>}' reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param value the new value of the '<em>Left</em>' reference.
	 * @see #getLeft()
	 * @generated
	 */
	void setLeft(BooleanExp value);

	/**
	 * Returns the value of the '<em><b>Right</b></em>' containment reference list.
	 * The list contents are of type {@link robot.BooleanExp}.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Right</em>' containment reference list.
	 * @see robot.RobotPackage#getSecondaryExpBool_Right()
	 * @model containment="true" required="true"
	 * @generated
	 */
	EList<BooleanExp> getRight();

} // SecondaryExpBool
