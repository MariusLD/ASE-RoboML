/**
 */
package robot.impl;

import org.eclipse.emf.common.notify.Notification;

import org.eclipse.emf.common.notify.NotificationChain;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.InternalEObject;

import org.eclipse.emf.ecore.impl.ENotificationImpl;

import robot.DeclarationVariable;
import robot.ExpressionBase;
import robot.RobotPackage;
import robot.Type;

/**
 * <!-- begin-user-doc -->
 * An implementation of the model object '<em><b>Declaration Variable</b></em>'.
 * <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * </p>
 * <ul>
 *   <li>{@link robot.impl.DeclarationVariableImpl#getNom <em>Nom</em>}</li>
 *   <li>{@link robot.impl.DeclarationVariableImpl#getExpressionbase <em>Expressionbase</em>}</li>
 *   <li>{@link robot.impl.DeclarationVariableImpl#getType <em>Type</em>}</li>
 * </ul>
 *
 * @generated
 */
public class DeclarationVariableImpl extends InstructionImpl implements DeclarationVariable {
	/**
	 * The default value of the '{@link #getNom() <em>Nom</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getNom()
	 * @generated
	 * @ordered
	 */
	protected static final String NOM_EDEFAULT = null;

	/**
	 * The cached value of the '{@link #getNom() <em>Nom</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getNom()
	 * @generated
	 * @ordered
	 */
	protected String nom = NOM_EDEFAULT;

	/**
	 * The cached value of the '{@link #getExpressionbase() <em>Expressionbase</em>}' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getExpressionbase()
	 * @generated
	 * @ordered
	 */
	protected ExpressionBase expressionbase;

	/**
	 * The cached value of the '{@link #getType() <em>Type</em>}' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getType()
	 * @generated
	 * @ordered
	 */
	protected Type type;

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	protected DeclarationVariableImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return RobotPackage.Literals.DECLARATION_VARIABLE;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public String getNom() {
		return nom;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void setNom(String newNom) {
		String oldNom = nom;
		nom = newNom;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, RobotPackage.DECLARATION_VARIABLE__NOM, oldNom, nom));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Type getType() {
		return type;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public NotificationChain basicSetType(Type newType, NotificationChain msgs) {
		Type oldType = type;
		type = newType;
		if (eNotificationRequired()) {
			ENotificationImpl notification = new ENotificationImpl(this, Notification.SET,
					RobotPackage.DECLARATION_VARIABLE__TYPE, oldType, newType);
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
	public void setType(Type newType) {
		if (newType != type) {
			NotificationChain msgs = null;
			if (type != null)
				msgs = ((InternalEObject) type).eInverseRemove(this,
						EOPPOSITE_FEATURE_BASE - RobotPackage.DECLARATION_VARIABLE__TYPE, null, msgs);
			if (newType != null)
				msgs = ((InternalEObject) newType).eInverseAdd(this,
						EOPPOSITE_FEATURE_BASE - RobotPackage.DECLARATION_VARIABLE__TYPE, null, msgs);
			msgs = basicSetType(newType, msgs);
			if (msgs != null)
				msgs.dispatch();
		} else if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, RobotPackage.DECLARATION_VARIABLE__TYPE, newType,
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
		case RobotPackage.DECLARATION_VARIABLE__EXPRESSIONBASE:
			return basicSetExpressionbase(null, msgs);
		case RobotPackage.DECLARATION_VARIABLE__TYPE:
			return basicSetType(null, msgs);
		}
		return super.eInverseRemove(otherEnd, featureID, msgs);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public ExpressionBase getExpressionbase() {
		return expressionbase;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public NotificationChain basicSetExpressionbase(ExpressionBase newExpressionbase, NotificationChain msgs) {
		ExpressionBase oldExpressionbase = expressionbase;
		expressionbase = newExpressionbase;
		if (eNotificationRequired()) {
			ENotificationImpl notification = new ENotificationImpl(this, Notification.SET,
					RobotPackage.DECLARATION_VARIABLE__EXPRESSIONBASE, oldExpressionbase, newExpressionbase);
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
	public void setExpressionbase(ExpressionBase newExpressionbase) {
		if (newExpressionbase != expressionbase) {
			NotificationChain msgs = null;
			if (expressionbase != null)
				msgs = ((InternalEObject) expressionbase).eInverseRemove(this,
						EOPPOSITE_FEATURE_BASE - RobotPackage.DECLARATION_VARIABLE__EXPRESSIONBASE, null, msgs);
			if (newExpressionbase != null)
				msgs = ((InternalEObject) newExpressionbase).eInverseAdd(this,
						EOPPOSITE_FEATURE_BASE - RobotPackage.DECLARATION_VARIABLE__EXPRESSIONBASE, null, msgs);
			msgs = basicSetExpressionbase(newExpressionbase, msgs);
			if (msgs != null)
				msgs.dispatch();
		} else if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, RobotPackage.DECLARATION_VARIABLE__EXPRESSIONBASE,
					newExpressionbase, newExpressionbase));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Object eGet(int featureID, boolean resolve, boolean coreType) {
		switch (featureID) {
		case RobotPackage.DECLARATION_VARIABLE__NOM:
			return getNom();
		case RobotPackage.DECLARATION_VARIABLE__EXPRESSIONBASE:
			return getExpressionbase();
		case RobotPackage.DECLARATION_VARIABLE__TYPE:
			return getType();
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
		case RobotPackage.DECLARATION_VARIABLE__NOM:
			setNom((String) newValue);
			return;
		case RobotPackage.DECLARATION_VARIABLE__EXPRESSIONBASE:
			setExpressionbase((ExpressionBase) newValue);
			return;
		case RobotPackage.DECLARATION_VARIABLE__TYPE:
			setType((Type) newValue);
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
		case RobotPackage.DECLARATION_VARIABLE__NOM:
			setNom(NOM_EDEFAULT);
			return;
		case RobotPackage.DECLARATION_VARIABLE__EXPRESSIONBASE:
			setExpressionbase((ExpressionBase) null);
			return;
		case RobotPackage.DECLARATION_VARIABLE__TYPE:
			setType((Type) null);
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
		case RobotPackage.DECLARATION_VARIABLE__NOM:
			return NOM_EDEFAULT == null ? nom != null : !NOM_EDEFAULT.equals(nom);
		case RobotPackage.DECLARATION_VARIABLE__EXPRESSIONBASE:
			return expressionbase != null;
		case RobotPackage.DECLARATION_VARIABLE__TYPE:
			return type != null;
		}
		return super.eIsSet(featureID);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public String toString() {
		if (eIsProxy())
			return super.toString();

		StringBuilder result = new StringBuilder(super.toString());
		result.append(" (nom: ");
		result.append(nom);
		result.append(')');
		return result.toString();
	}

} //DeclarationVariableImpl
