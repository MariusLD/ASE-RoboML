/**
 */
package robot;

import org.eclipse.emf.common.util.EList;

import org.eclipse.emf.ecore.EObject;

/**
 * <!-- begin-user-doc -->
 * A representation of the model object '<em><b>Function</b></em>'.
 * <!-- end-user-doc -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 *   <li>{@link robot.Function#getInstruction <em>Instruction</em>}</li>
 *   <li>{@link robot.Function#getParameters <em>Parameters</em>}</li>
 *   <li>{@link robot.Function#getReturn <em>Return</em>}</li>
 * </ul>
 *
 * @see robot.RobotPackage#getFunction()
 * @model
 * @generated
 */
public interface Function extends EObject {
	/**
	 * Returns the value of the '<em><b>Instruction</b></em>' containment reference list.
	 * The list contents are of type {@link robot.Instruction}.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Instruction</em>' containment reference list.
	 * @see robot.RobotPackage#getFunction_Instruction()
	 * @model containment="true"
	 * @generated
	 */
	EList<Instruction> getInstruction();

	/**
	 * Returns the value of the '<em><b>Parameters</b></em>' containment reference list.
	 * The list contents are of type {@link robot.TypeClass}.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Parameters</em>' containment reference list.
	 * @see robot.RobotPackage#getFunction_Parameters()
	 * @model containment="true"
	 * @generated
	 */
	EList<TypeClass> getParameters();

	/**
	 * Returns the value of the '<em><b>Return</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Return</em>' containment reference.
	 * @see #setReturn(TypeClass)
	 * @see robot.RobotPackage#getFunction_Return()
	 * @model containment="true"
	 * @generated
	 */
	TypeClass getReturn();

	/**
	 * Sets the value of the '{@link robot.Function#getReturn <em>Return</em>}' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param value the new value of the '<em>Return</em>' containment reference.
	 * @see #getReturn()
	 * @generated
	 */
	void setReturn(TypeClass value);

} // Function
