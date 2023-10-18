/**
 */
package robot.impl;

import org.eclipse.emf.common.notify.Notification;

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
 *   <li>{@link robot.impl.DeclarationVariableImpl#getType <em>Type</em>}</li>
 *   <li>{@link robot.impl.DeclarationVariableImpl#getExpressionbase <em>Expressionbase</em>}</li>
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
	 * The cached value of the '{@link #getType() <em>Type</em>}' reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getType()
	 * @generated
	 * @ordered
	 */
	protected Type type;

	/**
	 * The cached value of the '{@link #getExpressionbase() <em>Expressionbase</em>}' reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getExpressionbase()
	 * @generated
	 * @ordered
	 */
	protected ExpressionBase expressionbase;

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
		if (type != null && type.eIsProxy()) {
			InternalEObject oldType = (InternalEObject) type;
			type = (Type) eResolveProxy(oldType);
			if (type != oldType) {
				if (eNotificationRequired())
					eNotify(new ENotificationImpl(this, Notification.RESOLVE, RobotPackage.DECLARATION_VARIABLE__TYPE,
							oldType, type));
			}
		}
		return type;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public Type basicGetType() {
		return type;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void setType(Type newType) {
		Type oldType = type;
		type = newType;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, RobotPackage.DECLARATION_VARIABLE__TYPE, oldType,
					type));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public ExpressionBase getExpressionbase() {
		if (expressionbase != null && expressionbase.eIsProxy()) {
			InternalEObject oldExpressionbase = (InternalEObject) expressionbase;
			expressionbase = (ExpressionBase) eResolveProxy(oldExpressionbase);
			if (expressionbase != oldExpressionbase) {
				if (eNotificationRequired())
					eNotify(new ENotificationImpl(this, Notification.RESOLVE,
							RobotPackage.DECLARATION_VARIABLE__EXPRESSIONBASE, oldExpressionbase, expressionbase));
			}
		}
		return expressionbase;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public ExpressionBase basicGetExpressionbase() {
		return expressionbase;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void setExpressionbase(ExpressionBase newExpressionbase) {
		ExpressionBase oldExpressionbase = expressionbase;
		expressionbase = newExpressionbase;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, RobotPackage.DECLARATION_VARIABLE__EXPRESSIONBASE,
					oldExpressionbase, expressionbase));
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
		case RobotPackage.DECLARATION_VARIABLE__TYPE:
			if (resolve)
				return getType();
			return basicGetType();
		case RobotPackage.DECLARATION_VARIABLE__EXPRESSIONBASE:
			if (resolve)
				return getExpressionbase();
			return basicGetExpressionbase();
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
		case RobotPackage.DECLARATION_VARIABLE__TYPE:
			setType((Type) newValue);
			return;
		case RobotPackage.DECLARATION_VARIABLE__EXPRESSIONBASE:
			setExpressionbase((ExpressionBase) newValue);
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
		case RobotPackage.DECLARATION_VARIABLE__TYPE:
			setType((Type) null);
			return;
		case RobotPackage.DECLARATION_VARIABLE__EXPRESSIONBASE:
			setExpressionbase((ExpressionBase) null);
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
		case RobotPackage.DECLARATION_VARIABLE__TYPE:
			return type != null;
		case RobotPackage.DECLARATION_VARIABLE__EXPRESSIONBASE:
			return expressionbase != null;
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
