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

import robot.BooleanExp;
import robot.RobotPackage;
import robot.SecondaryExpBool;

/**
 * <!-- begin-user-doc -->
 * An implementation of the model object '<em><b>Secondary Exp Bool</b></em>'.
 * <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * </p>
 * <ul>
 *   <li>{@link robot.impl.SecondaryExpBoolImpl#getLeft <em>Left</em>}</li>
 *   <li>{@link robot.impl.SecondaryExpBoolImpl#getRight <em>Right</em>}</li>
 * </ul>
 *
 * @generated
 */
public class SecondaryExpBoolImpl extends BooleanExpImpl implements SecondaryExpBool {
	/**
	 * The cached value of the '{@link #getLeft() <em>Left</em>}' reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getLeft()
	 * @generated
	 * @ordered
	 */
	protected BooleanExp left;

	/**
	 * The cached value of the '{@link #getRight() <em>Right</em>}' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getRight()
	 * @generated
	 * @ordered
	 */
	protected EList<BooleanExp> right;

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	protected SecondaryExpBoolImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return RobotPackage.Literals.SECONDARY_EXP_BOOL;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public BooleanExp getLeft() {
		if (left != null && left.eIsProxy()) {
			InternalEObject oldLeft = (InternalEObject) left;
			left = (BooleanExp) eResolveProxy(oldLeft);
			if (left != oldLeft) {
				if (eNotificationRequired())
					eNotify(new ENotificationImpl(this, Notification.RESOLVE, RobotPackage.SECONDARY_EXP_BOOL__LEFT,
							oldLeft, left));
			}
		}
		return left;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public BooleanExp basicGetLeft() {
		return left;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void setLeft(BooleanExp newLeft) {
		BooleanExp oldLeft = left;
		left = newLeft;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, RobotPackage.SECONDARY_EXP_BOOL__LEFT, oldLeft,
					left));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public EList<BooleanExp> getRight() {
		if (right == null) {
			right = new EObjectContainmentEList<BooleanExp>(BooleanExp.class, this,
					RobotPackage.SECONDARY_EXP_BOOL__RIGHT);
		}
		return right;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public NotificationChain eInverseRemove(InternalEObject otherEnd, int featureID, NotificationChain msgs) {
		switch (featureID) {
		case RobotPackage.SECONDARY_EXP_BOOL__RIGHT:
			return ((InternalEList<?>) getRight()).basicRemove(otherEnd, msgs);
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
		case RobotPackage.SECONDARY_EXP_BOOL__LEFT:
			if (resolve)
				return getLeft();
			return basicGetLeft();
		case RobotPackage.SECONDARY_EXP_BOOL__RIGHT:
			return getRight();
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
		case RobotPackage.SECONDARY_EXP_BOOL__LEFT:
			setLeft((BooleanExp) newValue);
			return;
		case RobotPackage.SECONDARY_EXP_BOOL__RIGHT:
			getRight().clear();
			getRight().addAll((Collection<? extends BooleanExp>) newValue);
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
		case RobotPackage.SECONDARY_EXP_BOOL__LEFT:
			setLeft((BooleanExp) null);
			return;
		case RobotPackage.SECONDARY_EXP_BOOL__RIGHT:
			getRight().clear();
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
		case RobotPackage.SECONDARY_EXP_BOOL__LEFT:
			return left != null;
		case RobotPackage.SECONDARY_EXP_BOOL__RIGHT:
			return right != null && !right.isEmpty();
		}
		return super.eIsSet(featureID);
	}

} //SecondaryExpBoolImpl
