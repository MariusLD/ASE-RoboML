/**
 */
package robot.impl;

import java.util.Collection;

import org.eclipse.emf.common.notify.Notification;
import org.eclipse.emf.common.notify.NotificationChain;

import org.eclipse.emf.common.util.EList;

import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.InternalEObject;

import org.eclipse.emf.ecore.impl.ENotificationImpl;
import org.eclipse.emf.ecore.impl.MinimalEObjectImpl;

import org.eclipse.emf.ecore.util.EObjectContainmentEList;
import org.eclipse.emf.ecore.util.InternalEList;

import robot.Function;
import robot.Instruction;
import robot.RobotPackage;
import robot.TypeClass;

/**
 * <!-- begin-user-doc -->
 * An implementation of the model object '<em><b>Function</b></em>'.
 * <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * </p>
 * <ul>
 *   <li>{@link robot.impl.FunctionImpl#getInstruction <em>Instruction</em>}</li>
 *   <li>{@link robot.impl.FunctionImpl#getParameters <em>Parameters</em>}</li>
 *   <li>{@link robot.impl.FunctionImpl#getReturn <em>Return</em>}</li>
 * </ul>
 *
 * @generated
 */
public class FunctionImpl extends MinimalEObjectImpl.Container implements Function {
	/**
	 * The cached value of the '{@link #getInstruction() <em>Instruction</em>}' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getInstruction()
	 * @generated
	 * @ordered
	 */
	protected EList<Instruction> instruction;

	/**
	 * The cached value of the '{@link #getParameters() <em>Parameters</em>}' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getParameters()
	 * @generated
	 * @ordered
	 */
	protected EList<TypeClass> parameters;

	/**
	 * The cached value of the '{@link #getReturn() <em>Return</em>}' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getReturn()
	 * @generated
	 * @ordered
	 */
	protected TypeClass return_;

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	protected FunctionImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return RobotPackage.Literals.FUNCTION;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public EList<Instruction> getInstruction() {
		if (instruction == null) {
			instruction = new EObjectContainmentEList<Instruction>(Instruction.class, this,
					RobotPackage.FUNCTION__INSTRUCTION);
		}
		return instruction;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public EList<TypeClass> getParameters() {
		if (parameters == null) {
			parameters = new EObjectContainmentEList<TypeClass>(TypeClass.class, this,
					RobotPackage.FUNCTION__PARAMETERS);
		}
		return parameters;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public TypeClass getReturn() {
		return return_;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public NotificationChain basicSetReturn(TypeClass newReturn, NotificationChain msgs) {
		TypeClass oldReturn = return_;
		return_ = newReturn;
		if (eNotificationRequired()) {
			ENotificationImpl notification = new ENotificationImpl(this, Notification.SET,
					RobotPackage.FUNCTION__RETURN, oldReturn, newReturn);
			if (msgs == null)
				msgs = notification;
			else
				msgs.add(notification);
		}
		return msgs;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void setReturn(TypeClass newReturn) {
		if (newReturn != return_) {
			NotificationChain msgs = null;
			if (return_ != null)
				msgs = ((InternalEObject) return_).eInverseRemove(this,
						EOPPOSITE_FEATURE_BASE - RobotPackage.FUNCTION__RETURN, null, msgs);
			if (newReturn != null)
				msgs = ((InternalEObject) newReturn).eInverseAdd(this,
						EOPPOSITE_FEATURE_BASE - RobotPackage.FUNCTION__RETURN, null, msgs);
			msgs = basicSetReturn(newReturn, msgs);
			if (msgs != null)
				msgs.dispatch();
		} else if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, RobotPackage.FUNCTION__RETURN, newReturn, newReturn));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public NotificationChain eInverseRemove(InternalEObject otherEnd, int featureID, NotificationChain msgs) {
		switch (featureID) {
		case RobotPackage.FUNCTION__INSTRUCTION:
			return ((InternalEList<?>) getInstruction()).basicRemove(otherEnd, msgs);
		case RobotPackage.FUNCTION__PARAMETERS:
			return ((InternalEList<?>) getParameters()).basicRemove(otherEnd, msgs);
		case RobotPackage.FUNCTION__RETURN:
			return basicSetReturn(null, msgs);
		}
		return super.eInverseRemove(otherEnd, featureID, msgs);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Object eGet(int featureID, boolean resolve, boolean coreType) {
		switch (featureID) {
		case RobotPackage.FUNCTION__INSTRUCTION:
			return getInstruction();
		case RobotPackage.FUNCTION__PARAMETERS:
			return getParameters();
		case RobotPackage.FUNCTION__RETURN:
			return getReturn();
		}
		return super.eGet(featureID, resolve, coreType);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@SuppressWarnings("unchecked")
	@Override
	public void eSet(int featureID, Object newValue) {
		switch (featureID) {
		case RobotPackage.FUNCTION__INSTRUCTION:
			getInstruction().clear();
			getInstruction().addAll((Collection<? extends Instruction>) newValue);
			return;
		case RobotPackage.FUNCTION__PARAMETERS:
			getParameters().clear();
			getParameters().addAll((Collection<? extends TypeClass>) newValue);
			return;
		case RobotPackage.FUNCTION__RETURN:
			setReturn((TypeClass) newValue);
			return;
		}
		super.eSet(featureID, newValue);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void eUnset(int featureID) {
		switch (featureID) {
		case RobotPackage.FUNCTION__INSTRUCTION:
			getInstruction().clear();
			return;
		case RobotPackage.FUNCTION__PARAMETERS:
			getParameters().clear();
			return;
		case RobotPackage.FUNCTION__RETURN:
			setReturn((TypeClass) null);
			return;
		}
		super.eUnset(featureID);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public boolean eIsSet(int featureID) {
		switch (featureID) {
		case RobotPackage.FUNCTION__INSTRUCTION:
			return instruction != null && !instruction.isEmpty();
		case RobotPackage.FUNCTION__PARAMETERS:
			return parameters != null && !parameters.isEmpty();
		case RobotPackage.FUNCTION__RETURN:
			return return_ != null;
		}
		return super.eIsSet(featureID);
	}

} //FunctionImpl
