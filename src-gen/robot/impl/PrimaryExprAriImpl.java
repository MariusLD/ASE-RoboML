/**
 */
package robot.impl;

import org.eclipse.emf.common.notify.Notification;
import org.eclipse.emf.common.notify.NotificationChain;

import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.InternalEObject;

import org.eclipse.emf.ecore.impl.ENotificationImpl;

import robot.Call;
import robot.PrimaryExprAri;
import robot.RobotPackage;
import robot.TypeClass;

/**
 * <!-- begin-user-doc -->
 * An implementation of the model object '<em><b>Primary Expr Ari</b></em>'.
 * <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * </p>
 * <ul>
 *   <li>{@link robot.impl.PrimaryExprAriImpl#getType <em>Type</em>}</li>
 *   <li>{@link robot.impl.PrimaryExprAriImpl#getCall <em>Call</em>}</li>
 * </ul>
 *
 * @generated
 */
public class PrimaryExprAriImpl extends ArithmetiqueExpImpl implements PrimaryExprAri {
	/**
	 * The cached value of the '{@link #getType() <em>Type</em>}' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getType()
	 * @generated
	 * @ordered
	 */
	protected TypeClass type;

	/**
	 * The cached value of the '{@link #getCall() <em>Call</em>}' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getCall()
	 * @generated
	 * @ordered
	 */
	protected Call call;

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	protected PrimaryExprAriImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return RobotPackage.Literals.PRIMARY_EXPR_ARI;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Call getCall() {
		return call;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public NotificationChain basicSetCall(Call newCall, NotificationChain msgs) {
		Call oldCall = call;
		call = newCall;
		if (eNotificationRequired()) {
			ENotificationImpl notification = new ENotificationImpl(this, Notification.SET,
					RobotPackage.PRIMARY_EXPR_ARI__CALL, oldCall, newCall);
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
	public void setCall(Call newCall) {
		if (newCall != call) {
			NotificationChain msgs = null;
			if (call != null)
				msgs = ((InternalEObject) call).eInverseRemove(this,
						EOPPOSITE_FEATURE_BASE - RobotPackage.PRIMARY_EXPR_ARI__CALL, null, msgs);
			if (newCall != null)
				msgs = ((InternalEObject) newCall).eInverseAdd(this,
						EOPPOSITE_FEATURE_BASE - RobotPackage.PRIMARY_EXPR_ARI__CALL, null, msgs);
			msgs = basicSetCall(newCall, msgs);
			if (msgs != null)
				msgs.dispatch();
		} else if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, RobotPackage.PRIMARY_EXPR_ARI__CALL, newCall,
					newCall));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public TypeClass getType() {
		return type;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public NotificationChain basicSetType(TypeClass newType, NotificationChain msgs) {
		TypeClass oldType = type;
		type = newType;
		if (eNotificationRequired()) {
			ENotificationImpl notification = new ENotificationImpl(this, Notification.SET,
					RobotPackage.PRIMARY_EXPR_ARI__TYPE, oldType, newType);
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
	public void setType(TypeClass newType) {
		if (newType != type) {
			NotificationChain msgs = null;
			if (type != null)
				msgs = ((InternalEObject) type).eInverseRemove(this,
						EOPPOSITE_FEATURE_BASE - RobotPackage.PRIMARY_EXPR_ARI__TYPE, null, msgs);
			if (newType != null)
				msgs = ((InternalEObject) newType).eInverseAdd(this,
						EOPPOSITE_FEATURE_BASE - RobotPackage.PRIMARY_EXPR_ARI__TYPE, null, msgs);
			msgs = basicSetType(newType, msgs);
			if (msgs != null)
				msgs.dispatch();
		} else if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, RobotPackage.PRIMARY_EXPR_ARI__TYPE, newType,
					newType));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public NotificationChain eInverseRemove(InternalEObject otherEnd, int featureID, NotificationChain msgs) {
		switch (featureID) {
		case RobotPackage.PRIMARY_EXPR_ARI__TYPE:
			return basicSetType(null, msgs);
		case RobotPackage.PRIMARY_EXPR_ARI__CALL:
			return basicSetCall(null, msgs);
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
		case RobotPackage.PRIMARY_EXPR_ARI__TYPE:
			return getType();
		case RobotPackage.PRIMARY_EXPR_ARI__CALL:
			return getCall();
		}
		return super.eGet(featureID, resolve, coreType);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void eSet(int featureID, Object newValue) {
		switch (featureID) {
		case RobotPackage.PRIMARY_EXPR_ARI__TYPE:
			setType((TypeClass) newValue);
			return;
		case RobotPackage.PRIMARY_EXPR_ARI__CALL:
			setCall((Call) newValue);
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
		case RobotPackage.PRIMARY_EXPR_ARI__TYPE:
			setType((TypeClass) null);
			return;
		case RobotPackage.PRIMARY_EXPR_ARI__CALL:
			setCall((Call) null);
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
		case RobotPackage.PRIMARY_EXPR_ARI__TYPE:
			return type != null;
		case RobotPackage.PRIMARY_EXPR_ARI__CALL:
			return call != null;
		}
		return super.eIsSet(featureID);
	}

} //PrimaryExprAriImpl
