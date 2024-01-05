/*
 * generated by Xtext 2.32.0
 */
package org.xtext.example.mydsl2.ide.contentassist.antlr;

import com.google.common.collect.ImmutableMap;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import java.util.Map;
import org.eclipse.xtext.AbstractElement;
import org.eclipse.xtext.ide.editor.contentassist.antlr.AbstractContentAssistParser;
import org.xtext.example.mydsl2.ide.contentassist.antlr.internal.InternalMyDslParser;
import org.xtext.example.mydsl2.services.MyDslGrammarAccess;

public class MyDslParser extends AbstractContentAssistParser {

	@Singleton
	public static final class NameMappings {
		
		private final Map<AbstractElement, String> mappings;
		
		@Inject
		public NameMappings(MyDslGrammarAccess grammarAccess) {
			ImmutableMap.Builder<AbstractElement, String> builder = ImmutableMap.builder();
			init(builder, grammarAccess);
			this.mappings = builder.build();
		}
		
		public String getRuleName(AbstractElement element) {
			return mappings.get(element);
		}
		
		private static void init(ImmutableMap.Builder<AbstractElement, String> builder, MyDslGrammarAccess grammarAccess) {
			builder.put(grammarAccess.getInstructionAccess().getAlternatives(), "rule__Instruction__Alternatives");
			builder.put(grammarAccess.getTypeClassAccess().getAlternatives(), "rule__TypeClass__Alternatives");
			builder.put(grammarAccess.getDistanceAccess().getAlternatives(), "rule__Distance__Alternatives");
			builder.put(grammarAccess.getCallAccess().getAlternatives(), "rule__Call__Alternatives");
			builder.put(grammarAccess.getExpressionBaseAccess().getAlternatives(), "rule__ExpressionBase__Alternatives");
			builder.put(grammarAccess.getExpressionAccess().getAlternatives(), "rule__Expression__Alternatives");
			builder.put(grammarAccess.getEDoubleAccess().getAlternatives_4_0(), "rule__EDouble__Alternatives_4_0");
			builder.put(grammarAccess.getEStringAccess().getAlternatives(), "rule__EString__Alternatives");
			builder.put(grammarAccess.getEBooleanAccess().getAlternatives(), "rule__EBoolean__Alternatives");
			builder.put(grammarAccess.getRobotAccess().getGroup(), "rule__Robot__Group__0");
			builder.put(grammarAccess.getRobotAccess().getGroup_3(), "rule__Robot__Group_3__0");
			builder.put(grammarAccess.getRobotAccess().getGroup_3_3(), "rule__Robot__Group_3_3__0");
			builder.put(grammarAccess.getFunctionAccess().getGroup(), "rule__Function__Group__0");
			builder.put(grammarAccess.getFunctionAccess().getGroup_3(), "rule__Function__Group_3__0");
			builder.put(grammarAccess.getFunctionAccess().getGroup_3_3(), "rule__Function__Group_3_3__0");
			builder.put(grammarAccess.getFunctionAccess().getGroup_4(), "rule__Function__Group_4__0");
			builder.put(grammarAccess.getFunctionAccess().getGroup_4_3(), "rule__Function__Group_4_3__0");
			builder.put(grammarAccess.getFunctionAccess().getGroup_5(), "rule__Function__Group_5__0");
			builder.put(grammarAccess.getRotateCommandAccess().getGroup(), "rule__RotateCommand__Group__0");
			builder.put(grammarAccess.getRotateCommandAccess().getGroup_3(), "rule__RotateCommand__Group_3__0");
			builder.put(grammarAccess.getDirectionCommandAccess().getGroup(), "rule__DirectionCommand__Group__0");
			builder.put(grammarAccess.getSpeedCommandAccess().getGroup(), "rule__SpeedCommand__Group__0");
			builder.put(grammarAccess.getSpeedCommandAccess().getGroup_3(), "rule__SpeedCommand__Group_3__0");
			builder.put(grammarAccess.getDistanceSensorCommandAccess().getGroup(), "rule__DistanceSensorCommand__Group__0");
			builder.put(grammarAccess.getTimeSensorCommandAccess().getGroup(), "rule__TimeSensorCommand__Group__0");
			builder.put(grammarAccess.getBooleanExp_ImplAccess().getGroup(), "rule__BooleanExp_Impl__Group__0");
			builder.put(grammarAccess.getPlusMinusAccess().getGroup(), "rule__PlusMinus__Group__0");
			builder.put(grammarAccess.getMultDivAccess().getGroup(), "rule__MultDiv__Group__0");
			builder.put(grammarAccess.getPrimaryExprAriAccess().getGroup(), "rule__PrimaryExprAri__Group__0");
			builder.put(grammarAccess.getPrimaryExprAriAccess().getGroup_3(), "rule__PrimaryExprAri__Group_3__0");
			builder.put(grammarAccess.getPrimaryExprAriAccess().getGroup_4(), "rule__PrimaryExprAri__Group_4__0");
			builder.put(grammarAccess.getDeclarationVariableAccess().getGroup(), "rule__DeclarationVariable__Group__0");
			builder.put(grammarAccess.getDeclarationVariableAccess().getGroup_2(), "rule__DeclarationVariable__Group_2__0");
			builder.put(grammarAccess.getDeclarationVariableAccess().getGroup_3(), "rule__DeclarationVariable__Group_3__0");
			builder.put(grammarAccess.getLOOPAccess().getGroup(), "rule__LOOP__Group__0");
			builder.put(grammarAccess.getLOOPAccess().getGroup_2(), "rule__LOOP__Group_2__0");
			builder.put(grammarAccess.getLOOPAccess().getGroup_2_3(), "rule__LOOP__Group_2_3__0");
			builder.put(grammarAccess.getIFAccess().getGroup(), "rule__IF__Group__0");
			builder.put(grammarAccess.getIFAccess().getGroup_2(), "rule__IF__Group_2__0");
			builder.put(grammarAccess.getIFAccess().getGroup_2_3(), "rule__IF__Group_2_3__0");
			builder.put(grammarAccess.getCallVariableAccess().getGroup(), "rule__CallVariable__Group__0");
			builder.put(grammarAccess.getCallFunctionAccess().getGroup(), "rule__CallFunction__Group__0");
			builder.put(grammarAccess.getAffectationAccess().getGroup(), "rule__Affectation__Group__0");
			builder.put(grammarAccess.getAffectationAccess().getGroup_5(), "rule__Affectation__Group_5__0");
			builder.put(grammarAccess.getAffectationAccess().getGroup_7(), "rule__Affectation__Group_7__0");
			builder.put(grammarAccess.getPrimaryExprBoolAccess().getGroup(), "rule__PrimaryExprBool__Group__0");
			builder.put(grammarAccess.getPrimaryExprBoolAccess().getGroup_3(), "rule__PrimaryExprBool__Group_3__0");
			builder.put(grammarAccess.getPrimaryExprBoolAccess().getGroup_4(), "rule__PrimaryExprBool__Group_4__0");
			builder.put(grammarAccess.getAndAccess().getGroup(), "rule__And__Group__0");
			builder.put(grammarAccess.getOrAccess().getGroup(), "rule__Or__Group__0");
			builder.put(grammarAccess.getNotAccess().getGroup(), "rule__Not__Group__0");
			builder.put(grammarAccess.getEqualsAccess().getGroup(), "rule__Equals__Group__0");
			builder.put(grammarAccess.getPlusMinusDistanceAccess().getGroup(), "rule__PlusMinusDistance__Group__0");
			builder.put(grammarAccess.getMultDivDistanceAccess().getGroup(), "rule__MultDivDistance__Group__0");
			builder.put(grammarAccess.getPrimaryExprDistanceAccess().getGroup(), "rule__PrimaryExprDistance__Group__0");
			builder.put(grammarAccess.getPrimaryExprDistanceAccess().getGroup_3(), "rule__PrimaryExprDistance__Group_3__0");
			builder.put(grammarAccess.getPlusMinusTimeAccess().getGroup(), "rule__PlusMinusTime__Group__0");
			builder.put(grammarAccess.getMultDiveTimeAccess().getGroup(), "rule__MultDiveTime__Group__0");
			builder.put(grammarAccess.getPrimaryExprTimeAccess().getGroup(), "rule__PrimaryExprTime__Group__0");
			builder.put(grammarAccess.getPrimaryExprTimeAccess().getGroup_3(), "rule__PrimaryExprTime__Group_3__0");
			builder.put(grammarAccess.getComparaisonDistanceAccess().getGroup(), "rule__ComparaisonDistance__Group__0");
			builder.put(grammarAccess.getComparaisonTimeAccess().getGroup(), "rule__ComparaisonTime__Group__0");
			builder.put(grammarAccess.getComparaisonAriAccess().getGroup(), "rule__ComparaisonAri__Group__0");
			builder.put(grammarAccess.getEDoubleAccess().getGroup(), "rule__EDouble__Group__0");
			builder.put(grammarAccess.getEDoubleAccess().getGroup_4(), "rule__EDouble__Group_4__0");
			builder.put(grammarAccess.getCMAccess().getGroup(), "rule__CM__Group__0");
			builder.put(grammarAccess.getCMAccess().getGroup_3(), "rule__CM__Group_3__0");
			builder.put(grammarAccess.getMmAccess().getGroup(), "rule__Mm__Group__0");
			builder.put(grammarAccess.getMmAccess().getGroup_3(), "rule__Mm__Group_3__0");
			builder.put(grammarAccess.getTimeAccess().getGroup(), "rule__Time__Group__0");
			builder.put(grammarAccess.getTimeAccess().getGroup_3(), "rule__Time__Group_3__0");
			builder.put(grammarAccess.getBooleanTypeAccess().getGroup(), "rule__BooleanType__Group__0");
			builder.put(grammarAccess.getNumberTypeAccess().getGroup(), "rule__NumberType__Group__0");
			builder.put(grammarAccess.getNumberTypeAccess().getGroup_3(), "rule__NumberType__Group_3__0");
			builder.put(grammarAccess.getRobotAccess().getFunctionAssignment_3_2(), "rule__Robot__FunctionAssignment_3_2");
			builder.put(grammarAccess.getRobotAccess().getFunctionAssignment_3_3_1(), "rule__Robot__FunctionAssignment_3_3_1");
			builder.put(grammarAccess.getFunctionAccess().getInstructionAssignment_3_2(), "rule__Function__InstructionAssignment_3_2");
			builder.put(grammarAccess.getFunctionAccess().getInstructionAssignment_3_3_1(), "rule__Function__InstructionAssignment_3_3_1");
			builder.put(grammarAccess.getFunctionAccess().getParametersAssignment_4_2(), "rule__Function__ParametersAssignment_4_2");
			builder.put(grammarAccess.getFunctionAccess().getParametersAssignment_4_3_1(), "rule__Function__ParametersAssignment_4_3_1");
			builder.put(grammarAccess.getFunctionAccess().getReturnAssignment_5_1(), "rule__Function__ReturnAssignment_5_1");
			builder.put(grammarAccess.getRotateCommandAccess().getAngleAssignment_3_1(), "rule__RotateCommand__AngleAssignment_3_1");
			builder.put(grammarAccess.getDirectionCommandAccess().getDistanceAssignment_3(), "rule__DirectionCommand__DistanceAssignment_3");
			builder.put(grammarAccess.getSpeedCommandAccess().getSpeedAssignment_3_1(), "rule__SpeedCommand__SpeedAssignment_3_1");
			builder.put(grammarAccess.getPrimaryExprAriAccess().getTypeAssignment_3_1(), "rule__PrimaryExprAri__TypeAssignment_3_1");
			builder.put(grammarAccess.getPrimaryExprAriAccess().getCallAssignment_4_1(), "rule__PrimaryExprAri__CallAssignment_4_1");
			builder.put(grammarAccess.getDeclarationVariableAccess().getNomAssignment_2_1(), "rule__DeclarationVariable__NomAssignment_2_1");
			builder.put(grammarAccess.getDeclarationVariableAccess().getExpressionbaseAssignment_3_1(), "rule__DeclarationVariable__ExpressionbaseAssignment_3_1");
			builder.put(grammarAccess.getDeclarationVariableAccess().getTypeAssignment_5(), "rule__DeclarationVariable__TypeAssignment_5");
			builder.put(grammarAccess.getLOOPAccess().getInstructionAssignment_2_2(), "rule__LOOP__InstructionAssignment_2_2");
			builder.put(grammarAccess.getLOOPAccess().getInstructionAssignment_2_3_1(), "rule__LOOP__InstructionAssignment_2_3_1");
			builder.put(grammarAccess.getLOOPAccess().getExpressionAssignment_4(), "rule__LOOP__ExpressionAssignment_4");
			builder.put(grammarAccess.getIFAccess().getInstructionAssignment_2_2(), "rule__IF__InstructionAssignment_2_2");
			builder.put(grammarAccess.getIFAccess().getInstructionAssignment_2_3_1(), "rule__IF__InstructionAssignment_2_3_1");
			builder.put(grammarAccess.getIFAccess().getExpressionAssignment_4(), "rule__IF__ExpressionAssignment_4");
			builder.put(grammarAccess.getAffectationAccess().getExpressionbaseAssignment_4(), "rule__Affectation__ExpressionbaseAssignment_4");
			builder.put(grammarAccess.getAffectationAccess().getExpressionbaseAssignment_5_1(), "rule__Affectation__ExpressionbaseAssignment_5_1");
			builder.put(grammarAccess.getAffectationAccess().getCallvariableAssignment_7_1(), "rule__Affectation__CallvariableAssignment_7_1");
			builder.put(grammarAccess.getPrimaryExprBoolAccess().getTypeAssignment_3_1(), "rule__PrimaryExprBool__TypeAssignment_3_1");
			builder.put(grammarAccess.getPrimaryExprBoolAccess().getCallAssignment_4_1(), "rule__PrimaryExprBool__CallAssignment_4_1");
			builder.put(grammarAccess.getPrimaryExprDistanceAccess().getDistanceAssignment_3_1(), "rule__PrimaryExprDistance__DistanceAssignment_3_1");
			builder.put(grammarAccess.getPrimaryExprTimeAccess().getTimeAssignment_3_1(), "rule__PrimaryExprTime__TimeAssignment_3_1");
			builder.put(grammarAccess.getCMAccess().getDistanceAssignment_3_1(), "rule__CM__DistanceAssignment_3_1");
			builder.put(grammarAccess.getMmAccess().getDistanceAssignment_3_1(), "rule__Mm__DistanceAssignment_3_1");
			builder.put(grammarAccess.getTimeAccess().getValueAssignment_3_1(), "rule__Time__ValueAssignment_3_1");
			builder.put(grammarAccess.getBooleanTypeAccess().getValueAssignment_1(), "rule__BooleanType__ValueAssignment_1");
			builder.put(grammarAccess.getNumberTypeAccess().getValueAssignment_3_1(), "rule__NumberType__ValueAssignment_3_1");
		}
	}
	
	@Inject
	private NameMappings nameMappings;

	@Inject
	private MyDslGrammarAccess grammarAccess;

	@Override
	protected InternalMyDslParser createParser() {
		InternalMyDslParser result = new InternalMyDslParser(null);
		result.setGrammarAccess(grammarAccess);
		return result;
	}

	@Override
	protected String getRuleName(AbstractElement element) {
		return nameMappings.getRuleName(element);
	}

	@Override
	protected String[] getInitialHiddenTokens() {
		return new String[] { "RULE_WS", "RULE_ML_COMMENT", "RULE_SL_COMMENT" };
	}

	public MyDslGrammarAccess getGrammarAccess() {
		return this.grammarAccess;
	}

	public void setGrammarAccess(MyDslGrammarAccess grammarAccess) {
		this.grammarAccess = grammarAccess;
	}
	
	public NameMappings getNameMappings() {
		return nameMappings;
	}
	
	public void setNameMappings(NameMappings nameMappings) {
		this.nameMappings = nameMappings;
	}
}