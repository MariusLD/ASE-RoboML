/*
 * generated by Xtext 2.32.0
 */
package org.xtext.example.mydsl.formatting2

import com.google.inject.Inject
import org.eclipse.xtext.formatting2.AbstractFormatter2
import org.eclipse.xtext.formatting2.IFormattableDocument
import org.xtext.example.mydsl.services.MyDslGrammarAccess
import robot.Affectation
import robot.Plus

class MyDslFormatter extends AbstractFormatter2 {
	
	@Inject extension MyDslGrammarAccess

	def dispatch void format(Affectation affectation, extension IFormattableDocument document) {
		// TODO: format HiddenRegions around keywords, attributes, cross references, etc. 
		for (expressionBase : affectation.expressionbase) {
			expressionBase.format
		}
		affectation.callvariable.format
	}

	def dispatch void format(Plus plus, extension IFormattableDocument document) {
		// TODO: format HiddenRegions around keywords, attributes, cross references, etc. 
		for (arithmetiqueExp : plus.right) {
			arithmetiqueExp.format
		}
		plus.left.format
	}
	
	// TODO: implement for Minus, Mult, Div, PrimaryExprAri, SecondaryExpAri, PrimaryExprBool, SecondaryExpBool, And, Or, Not, Equals
}
