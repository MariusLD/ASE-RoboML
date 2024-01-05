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

import robot.ArithmetiqueExp;
import robot.RobotPackage;
import robot.SecondaryExpAri;

/**
 * <!-- begin-user-doc -->
 * An implementation of the model object '<em><b>Secondary Exp Ari</b></em>'.
 * <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * </p>
 * <ul>
 *   <li>{@link robot.impl.SecondaryExpAriImpl#getRight <em>Right</em>}</li>
 *   <li>{@link robot.impl.SecondaryExpAriImpl#getLeft <em>Left</em>}</li>
 * </ul>
 *
 * @generated
 */
public class SecondaryExpAriImpl extends ArithmetiqueExpImpl implements SecondaryExpAri {
	/**
	 * The cached value of the '{@link #getRight() <em>Right</em>}' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getRight()
	 * @generated
	 * @ordered
	 */
	protected EList<ArithmetiqueExp> right;

	/**
	 * The cached value of the '{@link #getLeft() <em>Left</em>}' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getLeft()
	 * @generated
	 * @ordered
	 */
	protected ArithmetiqueExp left;

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	protected SecondaryExpAriImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return RobotPackage.Literals.SECONDARY_EXP_ARI;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public EList<ArithmetiqueExp> getRight() {
		if (right == null) {
			right = new EObjectContainmentEList<ArithmetiqueExp>(ArithmetiqueExp.class, this,
					RobotPackage.SECONDARY_EXP_ARI__RIGHT);
		}
		return right;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public ArithmetiqueExp getLeft() {
		return left;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public NotificationChain basicSetLeft(ArithmetiqueExp newLeft, NotificationChain msgs) {
		ArithmetiqueExp oldLeft = left;
		left = newLeft;
		if (eNotificationRequired()) {
			ENotificationImpl notification = new ENotificationImpl(this, Notification.SET,
					RobotPackage.SECONDARY_EXP_ARI__LEFT, oldLeft, newLeft);
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
	public void setLeft(ArithmetiqueExp newLeft) {
		if (newLeft != left) {
			NotificationChain msgs = null;
			if (left != null)
				msgs = ((InternalEObject) left).eInverseRemove(this,
						EOPPOSITE_FEATURE_BASE - RobotPackage.SECONDARY_EXP_ARI__LEFT, null, msgs);
			if (newLeft != null)
				msgs = ((InternalEObject) newLeft).eInverseAdd(this,
						EOPPOSITE_FEATURE_BASE - RobotPackage.SECONDARY_EXP_ARI__LEFT, null, msgs);
			msgs = basicSetLeft(newLeft, msgs);
			if (msgs != null)
				msgs.dispatch();
		} else if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, RobotPackage.SECONDARY_EXP_ARI__LEFT, newLeft,
					newLeft));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public NotificationChain eInverseRemove(InternalEObject otherEnd, int featureID, NotificationChain msgs) {
		switch (featureID) {
		case RobotPackage.SECONDARY_EXP_ARI__RIGHT:
			return ((InternalEList<?>) getRight()).basicRemove(otherEnd, msgs);
		case RobotPackage.SECONDARY_EXP_ARI__LEFT:
			return basicSetLeft(null, msgs);
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
		case RobotPackage.SECONDARY_EXP_ARI__RIGHT:
			return getRight();
		case RobotPackage.SECONDARY_EXP_ARI__LEFT:
			return getLeft();
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
		case RobotPackage.SECONDARY_EXP_ARI__RIGHT:
			getRight().clear();
			getRight().addAll((Collection<? extends ArithmetiqueExp>) newValue);
			return;
		case RobotPackage.SECONDARY_EXP_ARI__LEFT:
			setLeft((ArithmetiqueExp) newValue);
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
		case RobotPackage.SECONDARY_EXP_ARI__RIGHT:
			getRight().clear();
			return;
		case RobotPackage.SECONDARY_EXP_ARI__LEFT:
			setLeft((ArithmetiqueExp) null);
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
		case RobotPackage.SECONDARY_EXP_ARI__RIGHT:
			return right != null && !right.isEmpty();
		case RobotPackage.SECONDARY_EXP_ARI__LEFT:
			return left != null;
		}
		return super.eIsSet(featureID);
	}

} //SecondaryExpAriImpl
