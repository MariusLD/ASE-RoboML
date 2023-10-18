/**
 */
package robot;

import org.eclipse.emf.common.util.EList;

/**
 * <!-- begin-user-doc -->
 * A representation of the model object '<em><b>Secondary Exp Ari</b></em>'.
 * <!-- end-user-doc -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 *   <li>{@link robot.SecondaryExpAri#getRight <em>Right</em>}</li>
 *   <li>{@link robot.SecondaryExpAri#getArithmetiqueexp <em>Arithmetiqueexp</em>}</li>
 * </ul>
 *
 * @see robot.RobotPackage#getSecondaryExpAri()
 * @model
 * @generated
 */
public interface SecondaryExpAri extends ArithmetiqueExp {
	/**
	 * Returns the value of the '<em><b>Right</b></em>' containment reference list.
	 * The list contents are of type {@link robot.ArithmetiqueExp}.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Right</em>' containment reference list.
	 * @see robot.RobotPackage#getSecondaryExpAri_Right()
	 * @model containment="true" required="true"
	 * @generated
	 */
	EList<ArithmetiqueExp> getRight();

	/**
	 * Returns the value of the '<em><b>Arithmetiqueexp</b></em>' reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Arithmetiqueexp</em>' reference.
	 * @see #setArithmetiqueexp(ArithmetiqueExp)
	 * @see robot.RobotPackage#getSecondaryExpAri_Arithmetiqueexp()
	 * @model required="true"
	 * @generated
	 */
	ArithmetiqueExp getArithmetiqueexp();

	/**
	 * Sets the value of the '{@link robot.SecondaryExpAri#getArithmetiqueexp <em>Arithmetiqueexp</em>}' reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param value the new value of the '<em>Arithmetiqueexp</em>' reference.
	 * @see #getArithmetiqueexp()
	 * @generated
	 */
	void setArithmetiqueexp(ArithmetiqueExp value);

} // SecondaryExpAri
