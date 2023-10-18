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

import org.eclipse.emf.ecore.util.EObjectContainmentEList;
import org.eclipse.emf.ecore.util.InternalEList;

import robot.Affectation;
import robot.CallVariable;
import robot.ExpressionBase;
import robot.RobotPackage;

/**
 * <!-- begin-user-doc -->
 * An implementation of the model object '<em><b>Affectation</b></em>'.
 * <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * </p>
 * <ul>
 *   <li>{@link robot.impl.AffectationImpl#getCallvariable <em>Callvariable</em>}</li>
 *   <li>{@link robot.impl.AffectationImpl#getExpressionbase <em>Expressionbase</em>}</li>
 * </ul>
 *
 * @generated
 */
public class AffectationImpl extends ExpressionBaseImpl implements Affectation {
	/**
	 * The cached value of the '{@link #getCallvariable() <em>Callvariable</em>}' reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getCallvariable()
	 * @generated
	 * @ordered
	 */
	protected CallVariable callvariable;

	/**
	 * The cached value of the '{@link #getExpressionbase() <em>Expressionbase</em>}' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getExpressionbase()
	 * @generated
	 * @ordered
	 */
	protected EList<ExpressionBase> expressionbase;

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	protected AffectationImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return RobotPackage.Literals.AFFECTATION;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public CallVariable getCallvariable() {
		if (callvariable != null && callvariable.eIsProxy()) {
			InternalEObject oldCallvariable = (InternalEObject) callvariable;
			callvariable = (CallVariable) eResolveProxy(oldCallvariable);
			if (callvariable != oldCallvariable) {
				if (eNotificationRequired())
					eNotify(new ENotificationImpl(this, Notification.RESOLVE, RobotPackage.AFFECTATION__CALLVARIABLE,
							oldCallvariable, callvariable));
			}
		}
		return callvariable;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public CallVariable basicGetCallvariable() {
		return callvariable;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void setCallvariable(CallVariable newCallvariable) {
		CallVariable oldCallvariable = callvariable;
		callvariable = newCallvariable;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, RobotPackage.AFFECTATION__CALLVARIABLE,
					oldCallvariable, callvariable));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public EList<ExpressionBase> getExpressionbase() {
		if (expressionbase == null) {
			expressionbase = new EObjectContainmentEList<ExpressionBase>(ExpressionBase.class, this,
					RobotPackage.AFFECTATION__EXPRESSIONBASE);
		}
		return expressionbase;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public NotificationChain eInverseRemove(InternalEObject otherEnd, int featureID, NotificationChain msgs) {
		switch (featureID) {
		case RobotPackage.AFFECTATION__EXPRESSIONBASE:
			return ((InternalEList<?>) getExpressionbase()).basicRemove(otherEnd, msgs);
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
		case RobotPackage.AFFECTATION__CALLVARIABLE:
			if (resolve)
				return getCallvariable();
			return basicGetCallvariable();
		case RobotPackage.AFFECTATION__EXPRESSIONBASE:
			return getExpressionbase();
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
		case RobotPackage.AFFECTATION__CALLVARIABLE:
			setCallvariable((CallVariable) newValue);
			return;
		case RobotPackage.AFFECTATION__EXPRESSIONBASE:
			getExpressionbase().clear();
			getExpressionbase().addAll((Collection<? extends ExpressionBase>) newValue);
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
		case RobotPackage.AFFECTATION__CALLVARIABLE:
			setCallvariable((CallVariable) null);
			return;
		case RobotPackage.AFFECTATION__EXPRESSIONBASE:
			getExpressionbase().clear();
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
		case RobotPackage.AFFECTATION__CALLVARIABLE:
			return callvariable != null;
		case RobotPackage.AFFECTATION__EXPRESSIONBASE:
			return expressionbase != null && !expressionbase.isEmpty();
		}
		return super.eIsSet(featureID);
	}

} //AffectationImpl
