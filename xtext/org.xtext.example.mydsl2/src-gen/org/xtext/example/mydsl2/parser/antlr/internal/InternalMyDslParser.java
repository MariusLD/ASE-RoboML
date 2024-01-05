package org.xtext.example.mydsl2.parser.antlr.internal;

import org.eclipse.xtext.*;
import org.eclipse.xtext.parser.*;
import org.eclipse.xtext.parser.impl.*;
import org.eclipse.emf.ecore.util.EcoreUtil;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.xtext.parser.antlr.AbstractInternalAntlrParser;
import org.eclipse.xtext.parser.antlr.XtextTokenStream;
import org.eclipse.xtext.parser.antlr.XtextTokenStream.HiddenTokens;
import org.eclipse.xtext.parser.antlr.AntlrDatatypeRuleToken;
import org.xtext.example.mydsl2.services.MyDslGrammarAccess;



import org.antlr.runtime.*;
import java.util.Stack;
import java.util.List;
import java.util.ArrayList;

@SuppressWarnings("all")
public class InternalMyDslParser extends AbstractInternalAntlrParser {
    public static final String[] tokenNames = new String[] {
        "<invalid>", "<EOR>", "<DOWN>", "<UP>", "RULE_INT", "RULE_STRING", "RULE_ID", "RULE_ML_COMMENT", "RULE_SL_COMMENT", "RULE_WS", "RULE_ANY_OTHER", "'Robot'", "'{'", "'function'", "','", "'}'", "'Function'", "'instruction'", "'parameters'", "'return'", "'RotateCommand'", "'angle'", "'DirectionCommand'", "'distance'", "'SpeedCommand'", "'speed'", "'DistanceSensorCommand'", "'TimeSensorCommand'", "'BooleanExp'", "'PlusMinus'", "'MultDiv'", "'PrimaryExprAri'", "'type'", "'call'", "'DeclarationVariable'", "'nom'", "'expressionbase'", "'LOOP'", "'expression'", "'IF'", "'CallVariable'", "'CallFunction'", "'Affectation'", "'callvariable'", "'PrimaryExprBool'", "'And'", "'Or'", "'Not'", "'Equals'", "'PlusMinusDistance'", "'MultDivDistance'", "'PrimaryExprDistance'", "'PlusMinusTime'", "'MultDiveTime'", "'PrimaryExprTime'", "'time'", "'ComparaisonDistance'", "'ComparaisonTime'", "'ComparaisonAri'", "'-'", "'.'", "'E'", "'e'", "'CM'", "'mm'", "'Time'", "'value'", "'BooleanType'", "'NumberType'"
    };
    public static final int T__50=50;
    public static final int T__19=19;
    public static final int T__15=15;
    public static final int T__59=59;
    public static final int T__16=16;
    public static final int T__17=17;
    public static final int T__18=18;
    public static final int T__11=11;
    public static final int T__55=55;
    public static final int T__12=12;
    public static final int T__56=56;
    public static final int T__13=13;
    public static final int T__57=57;
    public static final int T__14=14;
    public static final int T__58=58;
    public static final int T__51=51;
    public static final int T__52=52;
    public static final int T__53=53;
    public static final int T__54=54;
    public static final int T__60=60;
    public static final int T__61=61;
    public static final int RULE_ID=6;
    public static final int T__26=26;
    public static final int T__27=27;
    public static final int T__28=28;
    public static final int RULE_INT=4;
    public static final int T__29=29;
    public static final int T__22=22;
    public static final int T__66=66;
    public static final int RULE_ML_COMMENT=7;
    public static final int T__23=23;
    public static final int T__67=67;
    public static final int T__24=24;
    public static final int T__68=68;
    public static final int T__25=25;
    public static final int T__62=62;
    public static final int T__63=63;
    public static final int T__20=20;
    public static final int T__64=64;
    public static final int T__21=21;
    public static final int T__65=65;
    public static final int RULE_STRING=5;
    public static final int RULE_SL_COMMENT=8;
    public static final int T__37=37;
    public static final int T__38=38;
    public static final int T__39=39;
    public static final int T__33=33;
    public static final int T__34=34;
    public static final int T__35=35;
    public static final int T__36=36;
    public static final int EOF=-1;
    public static final int T__30=30;
    public static final int T__31=31;
    public static final int T__32=32;
    public static final int RULE_WS=9;
    public static final int RULE_ANY_OTHER=10;
    public static final int T__48=48;
    public static final int T__49=49;
    public static final int T__44=44;
    public static final int T__45=45;
    public static final int T__46=46;
    public static final int T__47=47;
    public static final int T__40=40;
    public static final int T__41=41;
    public static final int T__42=42;
    public static final int T__43=43;

    // delegates
    // delegators


        public InternalMyDslParser(TokenStream input) {
            this(input, new RecognizerSharedState());
        }
        public InternalMyDslParser(TokenStream input, RecognizerSharedState state) {
            super(input, state);
             
        }
        

    public String[] getTokenNames() { return InternalMyDslParser.tokenNames; }
    public String getGrammarFileName() { return "InternalMyDsl.g"; }



     	private MyDslGrammarAccess grammarAccess;

        public InternalMyDslParser(TokenStream input, MyDslGrammarAccess grammarAccess) {
            this(input);
            this.grammarAccess = grammarAccess;
            registerRules(grammarAccess.getGrammar());
        }

        @Override
        protected String getFirstRuleName() {
        	return "Robot";
       	}

       	@Override
       	protected MyDslGrammarAccess getGrammarAccess() {
       		return grammarAccess;
       	}




    // $ANTLR start "entryRuleRobot"
    // InternalMyDsl.g:64:1: entryRuleRobot returns [EObject current=null] : iv_ruleRobot= ruleRobot EOF ;
    public final EObject entryRuleRobot() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleRobot = null;


        try {
            // InternalMyDsl.g:64:46: (iv_ruleRobot= ruleRobot EOF )
            // InternalMyDsl.g:65:2: iv_ruleRobot= ruleRobot EOF
            {
             newCompositeNode(grammarAccess.getRobotRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleRobot=ruleRobot();

            state._fsp--;

             current =iv_ruleRobot; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleRobot"


    // $ANTLR start "ruleRobot"
    // InternalMyDsl.g:71:1: ruleRobot returns [EObject current=null] : ( () otherlv_1= 'Robot' otherlv_2= '{' (otherlv_3= 'function' otherlv_4= '{' ( (lv_function_5_0= ruleFunction ) ) (otherlv_6= ',' ( (lv_function_7_0= ruleFunction ) ) )* otherlv_8= '}' )? otherlv_9= '}' ) ;
    public final EObject ruleRobot() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_4=null;
        Token otherlv_6=null;
        Token otherlv_8=null;
        Token otherlv_9=null;
        EObject lv_function_5_0 = null;

        EObject lv_function_7_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:77:2: ( ( () otherlv_1= 'Robot' otherlv_2= '{' (otherlv_3= 'function' otherlv_4= '{' ( (lv_function_5_0= ruleFunction ) ) (otherlv_6= ',' ( (lv_function_7_0= ruleFunction ) ) )* otherlv_8= '}' )? otherlv_9= '}' ) )
            // InternalMyDsl.g:78:2: ( () otherlv_1= 'Robot' otherlv_2= '{' (otherlv_3= 'function' otherlv_4= '{' ( (lv_function_5_0= ruleFunction ) ) (otherlv_6= ',' ( (lv_function_7_0= ruleFunction ) ) )* otherlv_8= '}' )? otherlv_9= '}' )
            {
            // InternalMyDsl.g:78:2: ( () otherlv_1= 'Robot' otherlv_2= '{' (otherlv_3= 'function' otherlv_4= '{' ( (lv_function_5_0= ruleFunction ) ) (otherlv_6= ',' ( (lv_function_7_0= ruleFunction ) ) )* otherlv_8= '}' )? otherlv_9= '}' )
            // InternalMyDsl.g:79:3: () otherlv_1= 'Robot' otherlv_2= '{' (otherlv_3= 'function' otherlv_4= '{' ( (lv_function_5_0= ruleFunction ) ) (otherlv_6= ',' ( (lv_function_7_0= ruleFunction ) ) )* otherlv_8= '}' )? otherlv_9= '}'
            {
            // InternalMyDsl.g:79:3: ()
            // InternalMyDsl.g:80:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getRobotAccess().getRobotAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,11,FOLLOW_3); 

            			newLeafNode(otherlv_1, grammarAccess.getRobotAccess().getRobotKeyword_1());
            		
            otherlv_2=(Token)match(input,12,FOLLOW_4); 

            			newLeafNode(otherlv_2, grammarAccess.getRobotAccess().getLeftCurlyBracketKeyword_2());
            		
            // InternalMyDsl.g:94:3: (otherlv_3= 'function' otherlv_4= '{' ( (lv_function_5_0= ruleFunction ) ) (otherlv_6= ',' ( (lv_function_7_0= ruleFunction ) ) )* otherlv_8= '}' )?
            int alt2=2;
            int LA2_0 = input.LA(1);

            if ( (LA2_0==13) ) {
                alt2=1;
            }
            switch (alt2) {
                case 1 :
                    // InternalMyDsl.g:95:4: otherlv_3= 'function' otherlv_4= '{' ( (lv_function_5_0= ruleFunction ) ) (otherlv_6= ',' ( (lv_function_7_0= ruleFunction ) ) )* otherlv_8= '}'
                    {
                    otherlv_3=(Token)match(input,13,FOLLOW_3); 

                    				newLeafNode(otherlv_3, grammarAccess.getRobotAccess().getFunctionKeyword_3_0());
                    			
                    otherlv_4=(Token)match(input,12,FOLLOW_5); 

                    				newLeafNode(otherlv_4, grammarAccess.getRobotAccess().getLeftCurlyBracketKeyword_3_1());
                    			
                    // InternalMyDsl.g:103:4: ( (lv_function_5_0= ruleFunction ) )
                    // InternalMyDsl.g:104:5: (lv_function_5_0= ruleFunction )
                    {
                    // InternalMyDsl.g:104:5: (lv_function_5_0= ruleFunction )
                    // InternalMyDsl.g:105:6: lv_function_5_0= ruleFunction
                    {

                    						newCompositeNode(grammarAccess.getRobotAccess().getFunctionFunctionParserRuleCall_3_2_0());
                    					
                    pushFollow(FOLLOW_6);
                    lv_function_5_0=ruleFunction();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getRobotRule());
                    						}
                    						add(
                    							current,
                    							"function",
                    							lv_function_5_0,
                    							"org.xtext.example.mydsl2.MyDsl.Function");
                    						afterParserOrEnumRuleCall();
                    					

                    }


                    }

                    // InternalMyDsl.g:122:4: (otherlv_6= ',' ( (lv_function_7_0= ruleFunction ) ) )*
                    loop1:
                    do {
                        int alt1=2;
                        int LA1_0 = input.LA(1);

                        if ( (LA1_0==14) ) {
                            alt1=1;
                        }


                        switch (alt1) {
                    	case 1 :
                    	    // InternalMyDsl.g:123:5: otherlv_6= ',' ( (lv_function_7_0= ruleFunction ) )
                    	    {
                    	    otherlv_6=(Token)match(input,14,FOLLOW_5); 

                    	    					newLeafNode(otherlv_6, grammarAccess.getRobotAccess().getCommaKeyword_3_3_0());
                    	    				
                    	    // InternalMyDsl.g:127:5: ( (lv_function_7_0= ruleFunction ) )
                    	    // InternalMyDsl.g:128:6: (lv_function_7_0= ruleFunction )
                    	    {
                    	    // InternalMyDsl.g:128:6: (lv_function_7_0= ruleFunction )
                    	    // InternalMyDsl.g:129:7: lv_function_7_0= ruleFunction
                    	    {

                    	    							newCompositeNode(grammarAccess.getRobotAccess().getFunctionFunctionParserRuleCall_3_3_1_0());
                    	    						
                    	    pushFollow(FOLLOW_6);
                    	    lv_function_7_0=ruleFunction();

                    	    state._fsp--;


                    	    							if (current==null) {
                    	    								current = createModelElementForParent(grammarAccess.getRobotRule());
                    	    							}
                    	    							add(
                    	    								current,
                    	    								"function",
                    	    								lv_function_7_0,
                    	    								"org.xtext.example.mydsl2.MyDsl.Function");
                    	    							afterParserOrEnumRuleCall();
                    	    						

                    	    }


                    	    }


                    	    }
                    	    break;

                    	default :
                    	    break loop1;
                        }
                    } while (true);

                    otherlv_8=(Token)match(input,15,FOLLOW_7); 

                    				newLeafNode(otherlv_8, grammarAccess.getRobotAccess().getRightCurlyBracketKeyword_3_4());
                    			

                    }
                    break;

            }

            otherlv_9=(Token)match(input,15,FOLLOW_2); 

            			newLeafNode(otherlv_9, grammarAccess.getRobotAccess().getRightCurlyBracketKeyword_4());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleRobot"


    // $ANTLR start "entryRuleInstruction"
    // InternalMyDsl.g:160:1: entryRuleInstruction returns [EObject current=null] : iv_ruleInstruction= ruleInstruction EOF ;
    public final EObject entryRuleInstruction() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleInstruction = null;


        try {
            // InternalMyDsl.g:160:52: (iv_ruleInstruction= ruleInstruction EOF )
            // InternalMyDsl.g:161:2: iv_ruleInstruction= ruleInstruction EOF
            {
             newCompositeNode(grammarAccess.getInstructionRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleInstruction=ruleInstruction();

            state._fsp--;

             current =iv_ruleInstruction; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleInstruction"


    // $ANTLR start "ruleInstruction"
    // InternalMyDsl.g:167:1: ruleInstruction returns [EObject current=null] : (this_RotateCommand_0= ruleRotateCommand | this_DirectionCommand_1= ruleDirectionCommand | this_SpeedCommand_2= ruleSpeedCommand | this_DistanceSensorCommand_3= ruleDistanceSensorCommand | this_TimeSensorCommand_4= ruleTimeSensorCommand | this_BooleanExp_Impl_5= ruleBooleanExp_Impl | this_PlusMinus_6= rulePlusMinus | this_MultDiv_7= ruleMultDiv | this_PrimaryExprAri_8= rulePrimaryExprAri | this_DeclarationVariable_9= ruleDeclarationVariable | this_LOOP_10= ruleLOOP | this_IF_11= ruleIF | this_CallVariable_12= ruleCallVariable | this_CallFunction_13= ruleCallFunction | this_Affectation_14= ruleAffectation | this_PrimaryExprBool_15= rulePrimaryExprBool | this_And_16= ruleAnd | this_Or_17= ruleOr | this_Not_18= ruleNot | this_Equals_19= ruleEquals | this_PlusMinusDistance_20= rulePlusMinusDistance | this_MultDivDistance_21= ruleMultDivDistance | this_PrimaryExprDistance_22= rulePrimaryExprDistance | this_PlusMinusTime_23= rulePlusMinusTime | this_MultDiveTime_24= ruleMultDiveTime | this_PrimaryExprTime_25= rulePrimaryExprTime | this_ComparaisonDistance_26= ruleComparaisonDistance | this_ComparaisonTime_27= ruleComparaisonTime | this_ComparaisonAri_28= ruleComparaisonAri ) ;
    public final EObject ruleInstruction() throws RecognitionException {
        EObject current = null;

        EObject this_RotateCommand_0 = null;

        EObject this_DirectionCommand_1 = null;

        EObject this_SpeedCommand_2 = null;

        EObject this_DistanceSensorCommand_3 = null;

        EObject this_TimeSensorCommand_4 = null;

        EObject this_BooleanExp_Impl_5 = null;

        EObject this_PlusMinus_6 = null;

        EObject this_MultDiv_7 = null;

        EObject this_PrimaryExprAri_8 = null;

        EObject this_DeclarationVariable_9 = null;

        EObject this_LOOP_10 = null;

        EObject this_IF_11 = null;

        EObject this_CallVariable_12 = null;

        EObject this_CallFunction_13 = null;

        EObject this_Affectation_14 = null;

        EObject this_PrimaryExprBool_15 = null;

        EObject this_And_16 = null;

        EObject this_Or_17 = null;

        EObject this_Not_18 = null;

        EObject this_Equals_19 = null;

        EObject this_PlusMinusDistance_20 = null;

        EObject this_MultDivDistance_21 = null;

        EObject this_PrimaryExprDistance_22 = null;

        EObject this_PlusMinusTime_23 = null;

        EObject this_MultDiveTime_24 = null;

        EObject this_PrimaryExprTime_25 = null;

        EObject this_ComparaisonDistance_26 = null;

        EObject this_ComparaisonTime_27 = null;

        EObject this_ComparaisonAri_28 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:173:2: ( (this_RotateCommand_0= ruleRotateCommand | this_DirectionCommand_1= ruleDirectionCommand | this_SpeedCommand_2= ruleSpeedCommand | this_DistanceSensorCommand_3= ruleDistanceSensorCommand | this_TimeSensorCommand_4= ruleTimeSensorCommand | this_BooleanExp_Impl_5= ruleBooleanExp_Impl | this_PlusMinus_6= rulePlusMinus | this_MultDiv_7= ruleMultDiv | this_PrimaryExprAri_8= rulePrimaryExprAri | this_DeclarationVariable_9= ruleDeclarationVariable | this_LOOP_10= ruleLOOP | this_IF_11= ruleIF | this_CallVariable_12= ruleCallVariable | this_CallFunction_13= ruleCallFunction | this_Affectation_14= ruleAffectation | this_PrimaryExprBool_15= rulePrimaryExprBool | this_And_16= ruleAnd | this_Or_17= ruleOr | this_Not_18= ruleNot | this_Equals_19= ruleEquals | this_PlusMinusDistance_20= rulePlusMinusDistance | this_MultDivDistance_21= ruleMultDivDistance | this_PrimaryExprDistance_22= rulePrimaryExprDistance | this_PlusMinusTime_23= rulePlusMinusTime | this_MultDiveTime_24= ruleMultDiveTime | this_PrimaryExprTime_25= rulePrimaryExprTime | this_ComparaisonDistance_26= ruleComparaisonDistance | this_ComparaisonTime_27= ruleComparaisonTime | this_ComparaisonAri_28= ruleComparaisonAri ) )
            // InternalMyDsl.g:174:2: (this_RotateCommand_0= ruleRotateCommand | this_DirectionCommand_1= ruleDirectionCommand | this_SpeedCommand_2= ruleSpeedCommand | this_DistanceSensorCommand_3= ruleDistanceSensorCommand | this_TimeSensorCommand_4= ruleTimeSensorCommand | this_BooleanExp_Impl_5= ruleBooleanExp_Impl | this_PlusMinus_6= rulePlusMinus | this_MultDiv_7= ruleMultDiv | this_PrimaryExprAri_8= rulePrimaryExprAri | this_DeclarationVariable_9= ruleDeclarationVariable | this_LOOP_10= ruleLOOP | this_IF_11= ruleIF | this_CallVariable_12= ruleCallVariable | this_CallFunction_13= ruleCallFunction | this_Affectation_14= ruleAffectation | this_PrimaryExprBool_15= rulePrimaryExprBool | this_And_16= ruleAnd | this_Or_17= ruleOr | this_Not_18= ruleNot | this_Equals_19= ruleEquals | this_PlusMinusDistance_20= rulePlusMinusDistance | this_MultDivDistance_21= ruleMultDivDistance | this_PrimaryExprDistance_22= rulePrimaryExprDistance | this_PlusMinusTime_23= rulePlusMinusTime | this_MultDiveTime_24= ruleMultDiveTime | this_PrimaryExprTime_25= rulePrimaryExprTime | this_ComparaisonDistance_26= ruleComparaisonDistance | this_ComparaisonTime_27= ruleComparaisonTime | this_ComparaisonAri_28= ruleComparaisonAri )
            {
            // InternalMyDsl.g:174:2: (this_RotateCommand_0= ruleRotateCommand | this_DirectionCommand_1= ruleDirectionCommand | this_SpeedCommand_2= ruleSpeedCommand | this_DistanceSensorCommand_3= ruleDistanceSensorCommand | this_TimeSensorCommand_4= ruleTimeSensorCommand | this_BooleanExp_Impl_5= ruleBooleanExp_Impl | this_PlusMinus_6= rulePlusMinus | this_MultDiv_7= ruleMultDiv | this_PrimaryExprAri_8= rulePrimaryExprAri | this_DeclarationVariable_9= ruleDeclarationVariable | this_LOOP_10= ruleLOOP | this_IF_11= ruleIF | this_CallVariable_12= ruleCallVariable | this_CallFunction_13= ruleCallFunction | this_Affectation_14= ruleAffectation | this_PrimaryExprBool_15= rulePrimaryExprBool | this_And_16= ruleAnd | this_Or_17= ruleOr | this_Not_18= ruleNot | this_Equals_19= ruleEquals | this_PlusMinusDistance_20= rulePlusMinusDistance | this_MultDivDistance_21= ruleMultDivDistance | this_PrimaryExprDistance_22= rulePrimaryExprDistance | this_PlusMinusTime_23= rulePlusMinusTime | this_MultDiveTime_24= ruleMultDiveTime | this_PrimaryExprTime_25= rulePrimaryExprTime | this_ComparaisonDistance_26= ruleComparaisonDistance | this_ComparaisonTime_27= ruleComparaisonTime | this_ComparaisonAri_28= ruleComparaisonAri )
            int alt3=29;
            switch ( input.LA(1) ) {
            case 20:
                {
                alt3=1;
                }
                break;
            case 22:
                {
                alt3=2;
                }
                break;
            case 24:
                {
                alt3=3;
                }
                break;
            case 26:
                {
                alt3=4;
                }
                break;
            case 27:
                {
                alt3=5;
                }
                break;
            case 28:
                {
                alt3=6;
                }
                break;
            case 29:
                {
                alt3=7;
                }
                break;
            case 30:
                {
                alt3=8;
                }
                break;
            case 31:
                {
                alt3=9;
                }
                break;
            case 34:
                {
                alt3=10;
                }
                break;
            case 37:
                {
                alt3=11;
                }
                break;
            case 39:
                {
                alt3=12;
                }
                break;
            case 40:
                {
                alt3=13;
                }
                break;
            case 41:
                {
                alt3=14;
                }
                break;
            case 42:
                {
                alt3=15;
                }
                break;
            case 44:
                {
                alt3=16;
                }
                break;
            case 45:
                {
                alt3=17;
                }
                break;
            case 46:
                {
                alt3=18;
                }
                break;
            case 47:
                {
                alt3=19;
                }
                break;
            case 48:
                {
                alt3=20;
                }
                break;
            case 49:
                {
                alt3=21;
                }
                break;
            case 50:
                {
                alt3=22;
                }
                break;
            case 51:
                {
                alt3=23;
                }
                break;
            case 52:
                {
                alt3=24;
                }
                break;
            case 53:
                {
                alt3=25;
                }
                break;
            case 54:
                {
                alt3=26;
                }
                break;
            case 56:
                {
                alt3=27;
                }
                break;
            case 57:
                {
                alt3=28;
                }
                break;
            case 58:
                {
                alt3=29;
                }
                break;
            default:
                NoViableAltException nvae =
                    new NoViableAltException("", 3, 0, input);

                throw nvae;
            }

            switch (alt3) {
                case 1 :
                    // InternalMyDsl.g:175:3: this_RotateCommand_0= ruleRotateCommand
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getRotateCommandParserRuleCall_0());
                    		
                    pushFollow(FOLLOW_2);
                    this_RotateCommand_0=ruleRotateCommand();

                    state._fsp--;


                    			current = this_RotateCommand_0;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 2 :
                    // InternalMyDsl.g:184:3: this_DirectionCommand_1= ruleDirectionCommand
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getDirectionCommandParserRuleCall_1());
                    		
                    pushFollow(FOLLOW_2);
                    this_DirectionCommand_1=ruleDirectionCommand();

                    state._fsp--;


                    			current = this_DirectionCommand_1;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 3 :
                    // InternalMyDsl.g:193:3: this_SpeedCommand_2= ruleSpeedCommand
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getSpeedCommandParserRuleCall_2());
                    		
                    pushFollow(FOLLOW_2);
                    this_SpeedCommand_2=ruleSpeedCommand();

                    state._fsp--;


                    			current = this_SpeedCommand_2;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 4 :
                    // InternalMyDsl.g:202:3: this_DistanceSensorCommand_3= ruleDistanceSensorCommand
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getDistanceSensorCommandParserRuleCall_3());
                    		
                    pushFollow(FOLLOW_2);
                    this_DistanceSensorCommand_3=ruleDistanceSensorCommand();

                    state._fsp--;


                    			current = this_DistanceSensorCommand_3;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 5 :
                    // InternalMyDsl.g:211:3: this_TimeSensorCommand_4= ruleTimeSensorCommand
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getTimeSensorCommandParserRuleCall_4());
                    		
                    pushFollow(FOLLOW_2);
                    this_TimeSensorCommand_4=ruleTimeSensorCommand();

                    state._fsp--;


                    			current = this_TimeSensorCommand_4;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 6 :
                    // InternalMyDsl.g:220:3: this_BooleanExp_Impl_5= ruleBooleanExp_Impl
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getBooleanExp_ImplParserRuleCall_5());
                    		
                    pushFollow(FOLLOW_2);
                    this_BooleanExp_Impl_5=ruleBooleanExp_Impl();

                    state._fsp--;


                    			current = this_BooleanExp_Impl_5;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 7 :
                    // InternalMyDsl.g:229:3: this_PlusMinus_6= rulePlusMinus
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getPlusMinusParserRuleCall_6());
                    		
                    pushFollow(FOLLOW_2);
                    this_PlusMinus_6=rulePlusMinus();

                    state._fsp--;


                    			current = this_PlusMinus_6;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 8 :
                    // InternalMyDsl.g:238:3: this_MultDiv_7= ruleMultDiv
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getMultDivParserRuleCall_7());
                    		
                    pushFollow(FOLLOW_2);
                    this_MultDiv_7=ruleMultDiv();

                    state._fsp--;


                    			current = this_MultDiv_7;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 9 :
                    // InternalMyDsl.g:247:3: this_PrimaryExprAri_8= rulePrimaryExprAri
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getPrimaryExprAriParserRuleCall_8());
                    		
                    pushFollow(FOLLOW_2);
                    this_PrimaryExprAri_8=rulePrimaryExprAri();

                    state._fsp--;


                    			current = this_PrimaryExprAri_8;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 10 :
                    // InternalMyDsl.g:256:3: this_DeclarationVariable_9= ruleDeclarationVariable
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getDeclarationVariableParserRuleCall_9());
                    		
                    pushFollow(FOLLOW_2);
                    this_DeclarationVariable_9=ruleDeclarationVariable();

                    state._fsp--;


                    			current = this_DeclarationVariable_9;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 11 :
                    // InternalMyDsl.g:265:3: this_LOOP_10= ruleLOOP
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getLOOPParserRuleCall_10());
                    		
                    pushFollow(FOLLOW_2);
                    this_LOOP_10=ruleLOOP();

                    state._fsp--;


                    			current = this_LOOP_10;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 12 :
                    // InternalMyDsl.g:274:3: this_IF_11= ruleIF
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getIFParserRuleCall_11());
                    		
                    pushFollow(FOLLOW_2);
                    this_IF_11=ruleIF();

                    state._fsp--;


                    			current = this_IF_11;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 13 :
                    // InternalMyDsl.g:283:3: this_CallVariable_12= ruleCallVariable
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getCallVariableParserRuleCall_12());
                    		
                    pushFollow(FOLLOW_2);
                    this_CallVariable_12=ruleCallVariable();

                    state._fsp--;


                    			current = this_CallVariable_12;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 14 :
                    // InternalMyDsl.g:292:3: this_CallFunction_13= ruleCallFunction
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getCallFunctionParserRuleCall_13());
                    		
                    pushFollow(FOLLOW_2);
                    this_CallFunction_13=ruleCallFunction();

                    state._fsp--;


                    			current = this_CallFunction_13;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 15 :
                    // InternalMyDsl.g:301:3: this_Affectation_14= ruleAffectation
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getAffectationParserRuleCall_14());
                    		
                    pushFollow(FOLLOW_2);
                    this_Affectation_14=ruleAffectation();

                    state._fsp--;


                    			current = this_Affectation_14;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 16 :
                    // InternalMyDsl.g:310:3: this_PrimaryExprBool_15= rulePrimaryExprBool
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getPrimaryExprBoolParserRuleCall_15());
                    		
                    pushFollow(FOLLOW_2);
                    this_PrimaryExprBool_15=rulePrimaryExprBool();

                    state._fsp--;


                    			current = this_PrimaryExprBool_15;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 17 :
                    // InternalMyDsl.g:319:3: this_And_16= ruleAnd
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getAndParserRuleCall_16());
                    		
                    pushFollow(FOLLOW_2);
                    this_And_16=ruleAnd();

                    state._fsp--;


                    			current = this_And_16;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 18 :
                    // InternalMyDsl.g:328:3: this_Or_17= ruleOr
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getOrParserRuleCall_17());
                    		
                    pushFollow(FOLLOW_2);
                    this_Or_17=ruleOr();

                    state._fsp--;


                    			current = this_Or_17;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 19 :
                    // InternalMyDsl.g:337:3: this_Not_18= ruleNot
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getNotParserRuleCall_18());
                    		
                    pushFollow(FOLLOW_2);
                    this_Not_18=ruleNot();

                    state._fsp--;


                    			current = this_Not_18;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 20 :
                    // InternalMyDsl.g:346:3: this_Equals_19= ruleEquals
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getEqualsParserRuleCall_19());
                    		
                    pushFollow(FOLLOW_2);
                    this_Equals_19=ruleEquals();

                    state._fsp--;


                    			current = this_Equals_19;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 21 :
                    // InternalMyDsl.g:355:3: this_PlusMinusDistance_20= rulePlusMinusDistance
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getPlusMinusDistanceParserRuleCall_20());
                    		
                    pushFollow(FOLLOW_2);
                    this_PlusMinusDistance_20=rulePlusMinusDistance();

                    state._fsp--;


                    			current = this_PlusMinusDistance_20;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 22 :
                    // InternalMyDsl.g:364:3: this_MultDivDistance_21= ruleMultDivDistance
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getMultDivDistanceParserRuleCall_21());
                    		
                    pushFollow(FOLLOW_2);
                    this_MultDivDistance_21=ruleMultDivDistance();

                    state._fsp--;


                    			current = this_MultDivDistance_21;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 23 :
                    // InternalMyDsl.g:373:3: this_PrimaryExprDistance_22= rulePrimaryExprDistance
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getPrimaryExprDistanceParserRuleCall_22());
                    		
                    pushFollow(FOLLOW_2);
                    this_PrimaryExprDistance_22=rulePrimaryExprDistance();

                    state._fsp--;


                    			current = this_PrimaryExprDistance_22;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 24 :
                    // InternalMyDsl.g:382:3: this_PlusMinusTime_23= rulePlusMinusTime
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getPlusMinusTimeParserRuleCall_23());
                    		
                    pushFollow(FOLLOW_2);
                    this_PlusMinusTime_23=rulePlusMinusTime();

                    state._fsp--;


                    			current = this_PlusMinusTime_23;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 25 :
                    // InternalMyDsl.g:391:3: this_MultDiveTime_24= ruleMultDiveTime
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getMultDiveTimeParserRuleCall_24());
                    		
                    pushFollow(FOLLOW_2);
                    this_MultDiveTime_24=ruleMultDiveTime();

                    state._fsp--;


                    			current = this_MultDiveTime_24;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 26 :
                    // InternalMyDsl.g:400:3: this_PrimaryExprTime_25= rulePrimaryExprTime
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getPrimaryExprTimeParserRuleCall_25());
                    		
                    pushFollow(FOLLOW_2);
                    this_PrimaryExprTime_25=rulePrimaryExprTime();

                    state._fsp--;


                    			current = this_PrimaryExprTime_25;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 27 :
                    // InternalMyDsl.g:409:3: this_ComparaisonDistance_26= ruleComparaisonDistance
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getComparaisonDistanceParserRuleCall_26());
                    		
                    pushFollow(FOLLOW_2);
                    this_ComparaisonDistance_26=ruleComparaisonDistance();

                    state._fsp--;


                    			current = this_ComparaisonDistance_26;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 28 :
                    // InternalMyDsl.g:418:3: this_ComparaisonTime_27= ruleComparaisonTime
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getComparaisonTimeParserRuleCall_27());
                    		
                    pushFollow(FOLLOW_2);
                    this_ComparaisonTime_27=ruleComparaisonTime();

                    state._fsp--;


                    			current = this_ComparaisonTime_27;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 29 :
                    // InternalMyDsl.g:427:3: this_ComparaisonAri_28= ruleComparaisonAri
                    {

                    			newCompositeNode(grammarAccess.getInstructionAccess().getComparaisonAriParserRuleCall_28());
                    		
                    pushFollow(FOLLOW_2);
                    this_ComparaisonAri_28=ruleComparaisonAri();

                    state._fsp--;


                    			current = this_ComparaisonAri_28;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleInstruction"


    // $ANTLR start "entryRuleTypeClass"
    // InternalMyDsl.g:439:1: entryRuleTypeClass returns [EObject current=null] : iv_ruleTypeClass= ruleTypeClass EOF ;
    public final EObject entryRuleTypeClass() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleTypeClass = null;


        try {
            // InternalMyDsl.g:439:50: (iv_ruleTypeClass= ruleTypeClass EOF )
            // InternalMyDsl.g:440:2: iv_ruleTypeClass= ruleTypeClass EOF
            {
             newCompositeNode(grammarAccess.getTypeClassRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleTypeClass=ruleTypeClass();

            state._fsp--;

             current =iv_ruleTypeClass; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleTypeClass"


    // $ANTLR start "ruleTypeClass"
    // InternalMyDsl.g:446:1: ruleTypeClass returns [EObject current=null] : (this_CM_0= ruleCM | this_mm_1= rulemm | this_BooleanType_2= ruleBooleanType | this_NumberType_3= ruleNumberType | this_Time_4= ruleTime ) ;
    public final EObject ruleTypeClass() throws RecognitionException {
        EObject current = null;

        EObject this_CM_0 = null;

        EObject this_mm_1 = null;

        EObject this_BooleanType_2 = null;

        EObject this_NumberType_3 = null;

        EObject this_Time_4 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:452:2: ( (this_CM_0= ruleCM | this_mm_1= rulemm | this_BooleanType_2= ruleBooleanType | this_NumberType_3= ruleNumberType | this_Time_4= ruleTime ) )
            // InternalMyDsl.g:453:2: (this_CM_0= ruleCM | this_mm_1= rulemm | this_BooleanType_2= ruleBooleanType | this_NumberType_3= ruleNumberType | this_Time_4= ruleTime )
            {
            // InternalMyDsl.g:453:2: (this_CM_0= ruleCM | this_mm_1= rulemm | this_BooleanType_2= ruleBooleanType | this_NumberType_3= ruleNumberType | this_Time_4= ruleTime )
            int alt4=5;
            switch ( input.LA(1) ) {
            case 63:
                {
                alt4=1;
                }
                break;
            case 64:
                {
                alt4=2;
                }
                break;
            case 66:
            case 67:
                {
                alt4=3;
                }
                break;
            case 68:
                {
                alt4=4;
                }
                break;
            case 65:
                {
                alt4=5;
                }
                break;
            default:
                NoViableAltException nvae =
                    new NoViableAltException("", 4, 0, input);

                throw nvae;
            }

            switch (alt4) {
                case 1 :
                    // InternalMyDsl.g:454:3: this_CM_0= ruleCM
                    {

                    			newCompositeNode(grammarAccess.getTypeClassAccess().getCMParserRuleCall_0());
                    		
                    pushFollow(FOLLOW_2);
                    this_CM_0=ruleCM();

                    state._fsp--;


                    			current = this_CM_0;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 2 :
                    // InternalMyDsl.g:463:3: this_mm_1= rulemm
                    {

                    			newCompositeNode(grammarAccess.getTypeClassAccess().getMmParserRuleCall_1());
                    		
                    pushFollow(FOLLOW_2);
                    this_mm_1=rulemm();

                    state._fsp--;


                    			current = this_mm_1;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 3 :
                    // InternalMyDsl.g:472:3: this_BooleanType_2= ruleBooleanType
                    {

                    			newCompositeNode(grammarAccess.getTypeClassAccess().getBooleanTypeParserRuleCall_2());
                    		
                    pushFollow(FOLLOW_2);
                    this_BooleanType_2=ruleBooleanType();

                    state._fsp--;


                    			current = this_BooleanType_2;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 4 :
                    // InternalMyDsl.g:481:3: this_NumberType_3= ruleNumberType
                    {

                    			newCompositeNode(grammarAccess.getTypeClassAccess().getNumberTypeParserRuleCall_3());
                    		
                    pushFollow(FOLLOW_2);
                    this_NumberType_3=ruleNumberType();

                    state._fsp--;


                    			current = this_NumberType_3;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 5 :
                    // InternalMyDsl.g:490:3: this_Time_4= ruleTime
                    {

                    			newCompositeNode(grammarAccess.getTypeClassAccess().getTimeParserRuleCall_4());
                    		
                    pushFollow(FOLLOW_2);
                    this_Time_4=ruleTime();

                    state._fsp--;


                    			current = this_Time_4;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleTypeClass"


    // $ANTLR start "entryRuleDistance"
    // InternalMyDsl.g:502:1: entryRuleDistance returns [EObject current=null] : iv_ruleDistance= ruleDistance EOF ;
    public final EObject entryRuleDistance() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleDistance = null;


        try {
            // InternalMyDsl.g:502:49: (iv_ruleDistance= ruleDistance EOF )
            // InternalMyDsl.g:503:2: iv_ruleDistance= ruleDistance EOF
            {
             newCompositeNode(grammarAccess.getDistanceRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleDistance=ruleDistance();

            state._fsp--;

             current =iv_ruleDistance; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleDistance"


    // $ANTLR start "ruleDistance"
    // InternalMyDsl.g:509:1: ruleDistance returns [EObject current=null] : (this_CM_0= ruleCM | this_mm_1= rulemm ) ;
    public final EObject ruleDistance() throws RecognitionException {
        EObject current = null;

        EObject this_CM_0 = null;

        EObject this_mm_1 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:515:2: ( (this_CM_0= ruleCM | this_mm_1= rulemm ) )
            // InternalMyDsl.g:516:2: (this_CM_0= ruleCM | this_mm_1= rulemm )
            {
            // InternalMyDsl.g:516:2: (this_CM_0= ruleCM | this_mm_1= rulemm )
            int alt5=2;
            int LA5_0 = input.LA(1);

            if ( (LA5_0==63) ) {
                alt5=1;
            }
            else if ( (LA5_0==64) ) {
                alt5=2;
            }
            else {
                NoViableAltException nvae =
                    new NoViableAltException("", 5, 0, input);

                throw nvae;
            }
            switch (alt5) {
                case 1 :
                    // InternalMyDsl.g:517:3: this_CM_0= ruleCM
                    {

                    			newCompositeNode(grammarAccess.getDistanceAccess().getCMParserRuleCall_0());
                    		
                    pushFollow(FOLLOW_2);
                    this_CM_0=ruleCM();

                    state._fsp--;


                    			current = this_CM_0;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 2 :
                    // InternalMyDsl.g:526:3: this_mm_1= rulemm
                    {

                    			newCompositeNode(grammarAccess.getDistanceAccess().getMmParserRuleCall_1());
                    		
                    pushFollow(FOLLOW_2);
                    this_mm_1=rulemm();

                    state._fsp--;


                    			current = this_mm_1;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleDistance"


    // $ANTLR start "entryRuleCall"
    // InternalMyDsl.g:538:1: entryRuleCall returns [EObject current=null] : iv_ruleCall= ruleCall EOF ;
    public final EObject entryRuleCall() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleCall = null;


        try {
            // InternalMyDsl.g:538:45: (iv_ruleCall= ruleCall EOF )
            // InternalMyDsl.g:539:2: iv_ruleCall= ruleCall EOF
            {
             newCompositeNode(grammarAccess.getCallRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleCall=ruleCall();

            state._fsp--;

             current =iv_ruleCall; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleCall"


    // $ANTLR start "ruleCall"
    // InternalMyDsl.g:545:1: ruleCall returns [EObject current=null] : (this_CallVariable_0= ruleCallVariable | this_CallFunction_1= ruleCallFunction ) ;
    public final EObject ruleCall() throws RecognitionException {
        EObject current = null;

        EObject this_CallVariable_0 = null;

        EObject this_CallFunction_1 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:551:2: ( (this_CallVariable_0= ruleCallVariable | this_CallFunction_1= ruleCallFunction ) )
            // InternalMyDsl.g:552:2: (this_CallVariable_0= ruleCallVariable | this_CallFunction_1= ruleCallFunction )
            {
            // InternalMyDsl.g:552:2: (this_CallVariable_0= ruleCallVariable | this_CallFunction_1= ruleCallFunction )
            int alt6=2;
            int LA6_0 = input.LA(1);

            if ( (LA6_0==40) ) {
                alt6=1;
            }
            else if ( (LA6_0==41) ) {
                alt6=2;
            }
            else {
                NoViableAltException nvae =
                    new NoViableAltException("", 6, 0, input);

                throw nvae;
            }
            switch (alt6) {
                case 1 :
                    // InternalMyDsl.g:553:3: this_CallVariable_0= ruleCallVariable
                    {

                    			newCompositeNode(grammarAccess.getCallAccess().getCallVariableParserRuleCall_0());
                    		
                    pushFollow(FOLLOW_2);
                    this_CallVariable_0=ruleCallVariable();

                    state._fsp--;


                    			current = this_CallVariable_0;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 2 :
                    // InternalMyDsl.g:562:3: this_CallFunction_1= ruleCallFunction
                    {

                    			newCompositeNode(grammarAccess.getCallAccess().getCallFunctionParserRuleCall_1());
                    		
                    pushFollow(FOLLOW_2);
                    this_CallFunction_1=ruleCallFunction();

                    state._fsp--;


                    			current = this_CallFunction_1;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleCall"


    // $ANTLR start "entryRuleExpressionBase"
    // InternalMyDsl.g:574:1: entryRuleExpressionBase returns [EObject current=null] : iv_ruleExpressionBase= ruleExpressionBase EOF ;
    public final EObject entryRuleExpressionBase() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleExpressionBase = null;


        try {
            // InternalMyDsl.g:574:55: (iv_ruleExpressionBase= ruleExpressionBase EOF )
            // InternalMyDsl.g:575:2: iv_ruleExpressionBase= ruleExpressionBase EOF
            {
             newCompositeNode(grammarAccess.getExpressionBaseRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleExpressionBase=ruleExpressionBase();

            state._fsp--;

             current =iv_ruleExpressionBase; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleExpressionBase"


    // $ANTLR start "ruleExpressionBase"
    // InternalMyDsl.g:581:1: ruleExpressionBase returns [EObject current=null] : (this_BooleanExp_Impl_0= ruleBooleanExp_Impl | this_PlusMinus_1= rulePlusMinus | this_MultDiv_2= ruleMultDiv | this_PrimaryExprAri_3= rulePrimaryExprAri | this_CallVariable_4= ruleCallVariable | this_CallFunction_5= ruleCallFunction | this_Affectation_6= ruleAffectation | this_PrimaryExprBool_7= rulePrimaryExprBool | this_And_8= ruleAnd | this_Or_9= ruleOr | this_Not_10= ruleNot | this_Equals_11= ruleEquals | this_PlusMinusDistance_12= rulePlusMinusDistance | this_MultDivDistance_13= ruleMultDivDistance | this_PrimaryExprDistance_14= rulePrimaryExprDistance | this_PlusMinusTime_15= rulePlusMinusTime | this_MultDiveTime_16= ruleMultDiveTime | this_PrimaryExprTime_17= rulePrimaryExprTime | this_ComparaisonDistance_18= ruleComparaisonDistance | this_ComparaisonTime_19= ruleComparaisonTime | this_ComparaisonAri_20= ruleComparaisonAri ) ;
    public final EObject ruleExpressionBase() throws RecognitionException {
        EObject current = null;

        EObject this_BooleanExp_Impl_0 = null;

        EObject this_PlusMinus_1 = null;

        EObject this_MultDiv_2 = null;

        EObject this_PrimaryExprAri_3 = null;

        EObject this_CallVariable_4 = null;

        EObject this_CallFunction_5 = null;

        EObject this_Affectation_6 = null;

        EObject this_PrimaryExprBool_7 = null;

        EObject this_And_8 = null;

        EObject this_Or_9 = null;

        EObject this_Not_10 = null;

        EObject this_Equals_11 = null;

        EObject this_PlusMinusDistance_12 = null;

        EObject this_MultDivDistance_13 = null;

        EObject this_PrimaryExprDistance_14 = null;

        EObject this_PlusMinusTime_15 = null;

        EObject this_MultDiveTime_16 = null;

        EObject this_PrimaryExprTime_17 = null;

        EObject this_ComparaisonDistance_18 = null;

        EObject this_ComparaisonTime_19 = null;

        EObject this_ComparaisonAri_20 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:587:2: ( (this_BooleanExp_Impl_0= ruleBooleanExp_Impl | this_PlusMinus_1= rulePlusMinus | this_MultDiv_2= ruleMultDiv | this_PrimaryExprAri_3= rulePrimaryExprAri | this_CallVariable_4= ruleCallVariable | this_CallFunction_5= ruleCallFunction | this_Affectation_6= ruleAffectation | this_PrimaryExprBool_7= rulePrimaryExprBool | this_And_8= ruleAnd | this_Or_9= ruleOr | this_Not_10= ruleNot | this_Equals_11= ruleEquals | this_PlusMinusDistance_12= rulePlusMinusDistance | this_MultDivDistance_13= ruleMultDivDistance | this_PrimaryExprDistance_14= rulePrimaryExprDistance | this_PlusMinusTime_15= rulePlusMinusTime | this_MultDiveTime_16= ruleMultDiveTime | this_PrimaryExprTime_17= rulePrimaryExprTime | this_ComparaisonDistance_18= ruleComparaisonDistance | this_ComparaisonTime_19= ruleComparaisonTime | this_ComparaisonAri_20= ruleComparaisonAri ) )
            // InternalMyDsl.g:588:2: (this_BooleanExp_Impl_0= ruleBooleanExp_Impl | this_PlusMinus_1= rulePlusMinus | this_MultDiv_2= ruleMultDiv | this_PrimaryExprAri_3= rulePrimaryExprAri | this_CallVariable_4= ruleCallVariable | this_CallFunction_5= ruleCallFunction | this_Affectation_6= ruleAffectation | this_PrimaryExprBool_7= rulePrimaryExprBool | this_And_8= ruleAnd | this_Or_9= ruleOr | this_Not_10= ruleNot | this_Equals_11= ruleEquals | this_PlusMinusDistance_12= rulePlusMinusDistance | this_MultDivDistance_13= ruleMultDivDistance | this_PrimaryExprDistance_14= rulePrimaryExprDistance | this_PlusMinusTime_15= rulePlusMinusTime | this_MultDiveTime_16= ruleMultDiveTime | this_PrimaryExprTime_17= rulePrimaryExprTime | this_ComparaisonDistance_18= ruleComparaisonDistance | this_ComparaisonTime_19= ruleComparaisonTime | this_ComparaisonAri_20= ruleComparaisonAri )
            {
            // InternalMyDsl.g:588:2: (this_BooleanExp_Impl_0= ruleBooleanExp_Impl | this_PlusMinus_1= rulePlusMinus | this_MultDiv_2= ruleMultDiv | this_PrimaryExprAri_3= rulePrimaryExprAri | this_CallVariable_4= ruleCallVariable | this_CallFunction_5= ruleCallFunction | this_Affectation_6= ruleAffectation | this_PrimaryExprBool_7= rulePrimaryExprBool | this_And_8= ruleAnd | this_Or_9= ruleOr | this_Not_10= ruleNot | this_Equals_11= ruleEquals | this_PlusMinusDistance_12= rulePlusMinusDistance | this_MultDivDistance_13= ruleMultDivDistance | this_PrimaryExprDistance_14= rulePrimaryExprDistance | this_PlusMinusTime_15= rulePlusMinusTime | this_MultDiveTime_16= ruleMultDiveTime | this_PrimaryExprTime_17= rulePrimaryExprTime | this_ComparaisonDistance_18= ruleComparaisonDistance | this_ComparaisonTime_19= ruleComparaisonTime | this_ComparaisonAri_20= ruleComparaisonAri )
            int alt7=21;
            switch ( input.LA(1) ) {
            case 28:
                {
                alt7=1;
                }
                break;
            case 29:
                {
                alt7=2;
                }
                break;
            case 30:
                {
                alt7=3;
                }
                break;
            case 31:
                {
                alt7=4;
                }
                break;
            case 40:
                {
                alt7=5;
                }
                break;
            case 41:
                {
                alt7=6;
                }
                break;
            case 42:
                {
                alt7=7;
                }
                break;
            case 44:
                {
                alt7=8;
                }
                break;
            case 45:
                {
                alt7=9;
                }
                break;
            case 46:
                {
                alt7=10;
                }
                break;
            case 47:
                {
                alt7=11;
                }
                break;
            case 48:
                {
                alt7=12;
                }
                break;
            case 49:
                {
                alt7=13;
                }
                break;
            case 50:
                {
                alt7=14;
                }
                break;
            case 51:
                {
                alt7=15;
                }
                break;
            case 52:
                {
                alt7=16;
                }
                break;
            case 53:
                {
                alt7=17;
                }
                break;
            case 54:
                {
                alt7=18;
                }
                break;
            case 56:
                {
                alt7=19;
                }
                break;
            case 57:
                {
                alt7=20;
                }
                break;
            case 58:
                {
                alt7=21;
                }
                break;
            default:
                NoViableAltException nvae =
                    new NoViableAltException("", 7, 0, input);

                throw nvae;
            }

            switch (alt7) {
                case 1 :
                    // InternalMyDsl.g:589:3: this_BooleanExp_Impl_0= ruleBooleanExp_Impl
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getBooleanExp_ImplParserRuleCall_0());
                    		
                    pushFollow(FOLLOW_2);
                    this_BooleanExp_Impl_0=ruleBooleanExp_Impl();

                    state._fsp--;


                    			current = this_BooleanExp_Impl_0;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 2 :
                    // InternalMyDsl.g:598:3: this_PlusMinus_1= rulePlusMinus
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getPlusMinusParserRuleCall_1());
                    		
                    pushFollow(FOLLOW_2);
                    this_PlusMinus_1=rulePlusMinus();

                    state._fsp--;


                    			current = this_PlusMinus_1;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 3 :
                    // InternalMyDsl.g:607:3: this_MultDiv_2= ruleMultDiv
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getMultDivParserRuleCall_2());
                    		
                    pushFollow(FOLLOW_2);
                    this_MultDiv_2=ruleMultDiv();

                    state._fsp--;


                    			current = this_MultDiv_2;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 4 :
                    // InternalMyDsl.g:616:3: this_PrimaryExprAri_3= rulePrimaryExprAri
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getPrimaryExprAriParserRuleCall_3());
                    		
                    pushFollow(FOLLOW_2);
                    this_PrimaryExprAri_3=rulePrimaryExprAri();

                    state._fsp--;


                    			current = this_PrimaryExprAri_3;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 5 :
                    // InternalMyDsl.g:625:3: this_CallVariable_4= ruleCallVariable
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getCallVariableParserRuleCall_4());
                    		
                    pushFollow(FOLLOW_2);
                    this_CallVariable_4=ruleCallVariable();

                    state._fsp--;


                    			current = this_CallVariable_4;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 6 :
                    // InternalMyDsl.g:634:3: this_CallFunction_5= ruleCallFunction
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getCallFunctionParserRuleCall_5());
                    		
                    pushFollow(FOLLOW_2);
                    this_CallFunction_5=ruleCallFunction();

                    state._fsp--;


                    			current = this_CallFunction_5;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 7 :
                    // InternalMyDsl.g:643:3: this_Affectation_6= ruleAffectation
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getAffectationParserRuleCall_6());
                    		
                    pushFollow(FOLLOW_2);
                    this_Affectation_6=ruleAffectation();

                    state._fsp--;


                    			current = this_Affectation_6;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 8 :
                    // InternalMyDsl.g:652:3: this_PrimaryExprBool_7= rulePrimaryExprBool
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getPrimaryExprBoolParserRuleCall_7());
                    		
                    pushFollow(FOLLOW_2);
                    this_PrimaryExprBool_7=rulePrimaryExprBool();

                    state._fsp--;


                    			current = this_PrimaryExprBool_7;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 9 :
                    // InternalMyDsl.g:661:3: this_And_8= ruleAnd
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getAndParserRuleCall_8());
                    		
                    pushFollow(FOLLOW_2);
                    this_And_8=ruleAnd();

                    state._fsp--;


                    			current = this_And_8;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 10 :
                    // InternalMyDsl.g:670:3: this_Or_9= ruleOr
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getOrParserRuleCall_9());
                    		
                    pushFollow(FOLLOW_2);
                    this_Or_9=ruleOr();

                    state._fsp--;


                    			current = this_Or_9;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 11 :
                    // InternalMyDsl.g:679:3: this_Not_10= ruleNot
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getNotParserRuleCall_10());
                    		
                    pushFollow(FOLLOW_2);
                    this_Not_10=ruleNot();

                    state._fsp--;


                    			current = this_Not_10;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 12 :
                    // InternalMyDsl.g:688:3: this_Equals_11= ruleEquals
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getEqualsParserRuleCall_11());
                    		
                    pushFollow(FOLLOW_2);
                    this_Equals_11=ruleEquals();

                    state._fsp--;


                    			current = this_Equals_11;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 13 :
                    // InternalMyDsl.g:697:3: this_PlusMinusDistance_12= rulePlusMinusDistance
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getPlusMinusDistanceParserRuleCall_12());
                    		
                    pushFollow(FOLLOW_2);
                    this_PlusMinusDistance_12=rulePlusMinusDistance();

                    state._fsp--;


                    			current = this_PlusMinusDistance_12;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 14 :
                    // InternalMyDsl.g:706:3: this_MultDivDistance_13= ruleMultDivDistance
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getMultDivDistanceParserRuleCall_13());
                    		
                    pushFollow(FOLLOW_2);
                    this_MultDivDistance_13=ruleMultDivDistance();

                    state._fsp--;


                    			current = this_MultDivDistance_13;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 15 :
                    // InternalMyDsl.g:715:3: this_PrimaryExprDistance_14= rulePrimaryExprDistance
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getPrimaryExprDistanceParserRuleCall_14());
                    		
                    pushFollow(FOLLOW_2);
                    this_PrimaryExprDistance_14=rulePrimaryExprDistance();

                    state._fsp--;


                    			current = this_PrimaryExprDistance_14;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 16 :
                    // InternalMyDsl.g:724:3: this_PlusMinusTime_15= rulePlusMinusTime
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getPlusMinusTimeParserRuleCall_15());
                    		
                    pushFollow(FOLLOW_2);
                    this_PlusMinusTime_15=rulePlusMinusTime();

                    state._fsp--;


                    			current = this_PlusMinusTime_15;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 17 :
                    // InternalMyDsl.g:733:3: this_MultDiveTime_16= ruleMultDiveTime
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getMultDiveTimeParserRuleCall_16());
                    		
                    pushFollow(FOLLOW_2);
                    this_MultDiveTime_16=ruleMultDiveTime();

                    state._fsp--;


                    			current = this_MultDiveTime_16;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 18 :
                    // InternalMyDsl.g:742:3: this_PrimaryExprTime_17= rulePrimaryExprTime
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getPrimaryExprTimeParserRuleCall_17());
                    		
                    pushFollow(FOLLOW_2);
                    this_PrimaryExprTime_17=rulePrimaryExprTime();

                    state._fsp--;


                    			current = this_PrimaryExprTime_17;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 19 :
                    // InternalMyDsl.g:751:3: this_ComparaisonDistance_18= ruleComparaisonDistance
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getComparaisonDistanceParserRuleCall_18());
                    		
                    pushFollow(FOLLOW_2);
                    this_ComparaisonDistance_18=ruleComparaisonDistance();

                    state._fsp--;


                    			current = this_ComparaisonDistance_18;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 20 :
                    // InternalMyDsl.g:760:3: this_ComparaisonTime_19= ruleComparaisonTime
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getComparaisonTimeParserRuleCall_19());
                    		
                    pushFollow(FOLLOW_2);
                    this_ComparaisonTime_19=ruleComparaisonTime();

                    state._fsp--;


                    			current = this_ComparaisonTime_19;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 21 :
                    // InternalMyDsl.g:769:3: this_ComparaisonAri_20= ruleComparaisonAri
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getComparaisonAriParserRuleCall_20());
                    		
                    pushFollow(FOLLOW_2);
                    this_ComparaisonAri_20=ruleComparaisonAri();

                    state._fsp--;


                    			current = this_ComparaisonAri_20;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleExpressionBase"


    // $ANTLR start "entryRuleExpression"
    // InternalMyDsl.g:781:1: entryRuleExpression returns [EObject current=null] : iv_ruleExpression= ruleExpression EOF ;
    public final EObject entryRuleExpression() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleExpression = null;


        try {
            // InternalMyDsl.g:781:51: (iv_ruleExpression= ruleExpression EOF )
            // InternalMyDsl.g:782:2: iv_ruleExpression= ruleExpression EOF
            {
             newCompositeNode(grammarAccess.getExpressionRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleExpression=ruleExpression();

            state._fsp--;

             current =iv_ruleExpression; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleExpression"


    // $ANTLR start "ruleExpression"
    // InternalMyDsl.g:788:1: ruleExpression returns [EObject current=null] : (this_BooleanExp_Impl_0= ruleBooleanExp_Impl | this_PlusMinus_1= rulePlusMinus | this_MultDiv_2= ruleMultDiv | this_PrimaryExprAri_3= rulePrimaryExprAri | this_PrimaryExprBool_4= rulePrimaryExprBool | this_And_5= ruleAnd | this_Or_6= ruleOr | this_Not_7= ruleNot | this_Equals_8= ruleEquals | this_PlusMinusDistance_9= rulePlusMinusDistance | this_MultDivDistance_10= ruleMultDivDistance | this_PrimaryExprDistance_11= rulePrimaryExprDistance | this_PlusMinusTime_12= rulePlusMinusTime | this_MultDiveTime_13= ruleMultDiveTime | this_PrimaryExprTime_14= rulePrimaryExprTime | this_ComparaisonDistance_15= ruleComparaisonDistance | this_ComparaisonTime_16= ruleComparaisonTime | this_ComparaisonAri_17= ruleComparaisonAri ) ;
    public final EObject ruleExpression() throws RecognitionException {
        EObject current = null;

        EObject this_BooleanExp_Impl_0 = null;

        EObject this_PlusMinus_1 = null;

        EObject this_MultDiv_2 = null;

        EObject this_PrimaryExprAri_3 = null;

        EObject this_PrimaryExprBool_4 = null;

        EObject this_And_5 = null;

        EObject this_Or_6 = null;

        EObject this_Not_7 = null;

        EObject this_Equals_8 = null;

        EObject this_PlusMinusDistance_9 = null;

        EObject this_MultDivDistance_10 = null;

        EObject this_PrimaryExprDistance_11 = null;

        EObject this_PlusMinusTime_12 = null;

        EObject this_MultDiveTime_13 = null;

        EObject this_PrimaryExprTime_14 = null;

        EObject this_ComparaisonDistance_15 = null;

        EObject this_ComparaisonTime_16 = null;

        EObject this_ComparaisonAri_17 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:794:2: ( (this_BooleanExp_Impl_0= ruleBooleanExp_Impl | this_PlusMinus_1= rulePlusMinus | this_MultDiv_2= ruleMultDiv | this_PrimaryExprAri_3= rulePrimaryExprAri | this_PrimaryExprBool_4= rulePrimaryExprBool | this_And_5= ruleAnd | this_Or_6= ruleOr | this_Not_7= ruleNot | this_Equals_8= ruleEquals | this_PlusMinusDistance_9= rulePlusMinusDistance | this_MultDivDistance_10= ruleMultDivDistance | this_PrimaryExprDistance_11= rulePrimaryExprDistance | this_PlusMinusTime_12= rulePlusMinusTime | this_MultDiveTime_13= ruleMultDiveTime | this_PrimaryExprTime_14= rulePrimaryExprTime | this_ComparaisonDistance_15= ruleComparaisonDistance | this_ComparaisonTime_16= ruleComparaisonTime | this_ComparaisonAri_17= ruleComparaisonAri ) )
            // InternalMyDsl.g:795:2: (this_BooleanExp_Impl_0= ruleBooleanExp_Impl | this_PlusMinus_1= rulePlusMinus | this_MultDiv_2= ruleMultDiv | this_PrimaryExprAri_3= rulePrimaryExprAri | this_PrimaryExprBool_4= rulePrimaryExprBool | this_And_5= ruleAnd | this_Or_6= ruleOr | this_Not_7= ruleNot | this_Equals_8= ruleEquals | this_PlusMinusDistance_9= rulePlusMinusDistance | this_MultDivDistance_10= ruleMultDivDistance | this_PrimaryExprDistance_11= rulePrimaryExprDistance | this_PlusMinusTime_12= rulePlusMinusTime | this_MultDiveTime_13= ruleMultDiveTime | this_PrimaryExprTime_14= rulePrimaryExprTime | this_ComparaisonDistance_15= ruleComparaisonDistance | this_ComparaisonTime_16= ruleComparaisonTime | this_ComparaisonAri_17= ruleComparaisonAri )
            {
            // InternalMyDsl.g:795:2: (this_BooleanExp_Impl_0= ruleBooleanExp_Impl | this_PlusMinus_1= rulePlusMinus | this_MultDiv_2= ruleMultDiv | this_PrimaryExprAri_3= rulePrimaryExprAri | this_PrimaryExprBool_4= rulePrimaryExprBool | this_And_5= ruleAnd | this_Or_6= ruleOr | this_Not_7= ruleNot | this_Equals_8= ruleEquals | this_PlusMinusDistance_9= rulePlusMinusDistance | this_MultDivDistance_10= ruleMultDivDistance | this_PrimaryExprDistance_11= rulePrimaryExprDistance | this_PlusMinusTime_12= rulePlusMinusTime | this_MultDiveTime_13= ruleMultDiveTime | this_PrimaryExprTime_14= rulePrimaryExprTime | this_ComparaisonDistance_15= ruleComparaisonDistance | this_ComparaisonTime_16= ruleComparaisonTime | this_ComparaisonAri_17= ruleComparaisonAri )
            int alt8=18;
            switch ( input.LA(1) ) {
            case 28:
                {
                alt8=1;
                }
                break;
            case 29:
                {
                alt8=2;
                }
                break;
            case 30:
                {
                alt8=3;
                }
                break;
            case 31:
                {
                alt8=4;
                }
                break;
            case 44:
                {
                alt8=5;
                }
                break;
            case 45:
                {
                alt8=6;
                }
                break;
            case 46:
                {
                alt8=7;
                }
                break;
            case 47:
                {
                alt8=8;
                }
                break;
            case 48:
                {
                alt8=9;
                }
                break;
            case 49:
                {
                alt8=10;
                }
                break;
            case 50:
                {
                alt8=11;
                }
                break;
            case 51:
                {
                alt8=12;
                }
                break;
            case 52:
                {
                alt8=13;
                }
                break;
            case 53:
                {
                alt8=14;
                }
                break;
            case 54:
                {
                alt8=15;
                }
                break;
            case 56:
                {
                alt8=16;
                }
                break;
            case 57:
                {
                alt8=17;
                }
                break;
            case 58:
                {
                alt8=18;
                }
                break;
            default:
                NoViableAltException nvae =
                    new NoViableAltException("", 8, 0, input);

                throw nvae;
            }

            switch (alt8) {
                case 1 :
                    // InternalMyDsl.g:796:3: this_BooleanExp_Impl_0= ruleBooleanExp_Impl
                    {

                    			newCompositeNode(grammarAccess.getExpressionAccess().getBooleanExp_ImplParserRuleCall_0());
                    		
                    pushFollow(FOLLOW_2);
                    this_BooleanExp_Impl_0=ruleBooleanExp_Impl();

                    state._fsp--;


                    			current = this_BooleanExp_Impl_0;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 2 :
                    // InternalMyDsl.g:805:3: this_PlusMinus_1= rulePlusMinus
                    {

                    			newCompositeNode(grammarAccess.getExpressionAccess().getPlusMinusParserRuleCall_1());
                    		
                    pushFollow(FOLLOW_2);
                    this_PlusMinus_1=rulePlusMinus();

                    state._fsp--;


                    			current = this_PlusMinus_1;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 3 :
                    // InternalMyDsl.g:814:3: this_MultDiv_2= ruleMultDiv
                    {

                    			newCompositeNode(grammarAccess.getExpressionAccess().getMultDivParserRuleCall_2());
                    		
                    pushFollow(FOLLOW_2);
                    this_MultDiv_2=ruleMultDiv();

                    state._fsp--;


                    			current = this_MultDiv_2;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 4 :
                    // InternalMyDsl.g:823:3: this_PrimaryExprAri_3= rulePrimaryExprAri
                    {

                    			newCompositeNode(grammarAccess.getExpressionAccess().getPrimaryExprAriParserRuleCall_3());
                    		
                    pushFollow(FOLLOW_2);
                    this_PrimaryExprAri_3=rulePrimaryExprAri();

                    state._fsp--;


                    			current = this_PrimaryExprAri_3;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 5 :
                    // InternalMyDsl.g:832:3: this_PrimaryExprBool_4= rulePrimaryExprBool
                    {

                    			newCompositeNode(grammarAccess.getExpressionAccess().getPrimaryExprBoolParserRuleCall_4());
                    		
                    pushFollow(FOLLOW_2);
                    this_PrimaryExprBool_4=rulePrimaryExprBool();

                    state._fsp--;


                    			current = this_PrimaryExprBool_4;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 6 :
                    // InternalMyDsl.g:841:3: this_And_5= ruleAnd
                    {

                    			newCompositeNode(grammarAccess.getExpressionAccess().getAndParserRuleCall_5());
                    		
                    pushFollow(FOLLOW_2);
                    this_And_5=ruleAnd();

                    state._fsp--;


                    			current = this_And_5;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 7 :
                    // InternalMyDsl.g:850:3: this_Or_6= ruleOr
                    {

                    			newCompositeNode(grammarAccess.getExpressionAccess().getOrParserRuleCall_6());
                    		
                    pushFollow(FOLLOW_2);
                    this_Or_6=ruleOr();

                    state._fsp--;


                    			current = this_Or_6;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 8 :
                    // InternalMyDsl.g:859:3: this_Not_7= ruleNot
                    {

                    			newCompositeNode(grammarAccess.getExpressionAccess().getNotParserRuleCall_7());
                    		
                    pushFollow(FOLLOW_2);
                    this_Not_7=ruleNot();

                    state._fsp--;


                    			current = this_Not_7;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 9 :
                    // InternalMyDsl.g:868:3: this_Equals_8= ruleEquals
                    {

                    			newCompositeNode(grammarAccess.getExpressionAccess().getEqualsParserRuleCall_8());
                    		
                    pushFollow(FOLLOW_2);
                    this_Equals_8=ruleEquals();

                    state._fsp--;


                    			current = this_Equals_8;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 10 :
                    // InternalMyDsl.g:877:3: this_PlusMinusDistance_9= rulePlusMinusDistance
                    {

                    			newCompositeNode(grammarAccess.getExpressionAccess().getPlusMinusDistanceParserRuleCall_9());
                    		
                    pushFollow(FOLLOW_2);
                    this_PlusMinusDistance_9=rulePlusMinusDistance();

                    state._fsp--;


                    			current = this_PlusMinusDistance_9;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 11 :
                    // InternalMyDsl.g:886:3: this_MultDivDistance_10= ruleMultDivDistance
                    {

                    			newCompositeNode(grammarAccess.getExpressionAccess().getMultDivDistanceParserRuleCall_10());
                    		
                    pushFollow(FOLLOW_2);
                    this_MultDivDistance_10=ruleMultDivDistance();

                    state._fsp--;


                    			current = this_MultDivDistance_10;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 12 :
                    // InternalMyDsl.g:895:3: this_PrimaryExprDistance_11= rulePrimaryExprDistance
                    {

                    			newCompositeNode(grammarAccess.getExpressionAccess().getPrimaryExprDistanceParserRuleCall_11());
                    		
                    pushFollow(FOLLOW_2);
                    this_PrimaryExprDistance_11=rulePrimaryExprDistance();

                    state._fsp--;


                    			current = this_PrimaryExprDistance_11;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 13 :
                    // InternalMyDsl.g:904:3: this_PlusMinusTime_12= rulePlusMinusTime
                    {

                    			newCompositeNode(grammarAccess.getExpressionAccess().getPlusMinusTimeParserRuleCall_12());
                    		
                    pushFollow(FOLLOW_2);
                    this_PlusMinusTime_12=rulePlusMinusTime();

                    state._fsp--;


                    			current = this_PlusMinusTime_12;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 14 :
                    // InternalMyDsl.g:913:3: this_MultDiveTime_13= ruleMultDiveTime
                    {

                    			newCompositeNode(grammarAccess.getExpressionAccess().getMultDiveTimeParserRuleCall_13());
                    		
                    pushFollow(FOLLOW_2);
                    this_MultDiveTime_13=ruleMultDiveTime();

                    state._fsp--;


                    			current = this_MultDiveTime_13;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 15 :
                    // InternalMyDsl.g:922:3: this_PrimaryExprTime_14= rulePrimaryExprTime
                    {

                    			newCompositeNode(grammarAccess.getExpressionAccess().getPrimaryExprTimeParserRuleCall_14());
                    		
                    pushFollow(FOLLOW_2);
                    this_PrimaryExprTime_14=rulePrimaryExprTime();

                    state._fsp--;


                    			current = this_PrimaryExprTime_14;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 16 :
                    // InternalMyDsl.g:931:3: this_ComparaisonDistance_15= ruleComparaisonDistance
                    {

                    			newCompositeNode(grammarAccess.getExpressionAccess().getComparaisonDistanceParserRuleCall_15());
                    		
                    pushFollow(FOLLOW_2);
                    this_ComparaisonDistance_15=ruleComparaisonDistance();

                    state._fsp--;


                    			current = this_ComparaisonDistance_15;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 17 :
                    // InternalMyDsl.g:940:3: this_ComparaisonTime_16= ruleComparaisonTime
                    {

                    			newCompositeNode(grammarAccess.getExpressionAccess().getComparaisonTimeParserRuleCall_16());
                    		
                    pushFollow(FOLLOW_2);
                    this_ComparaisonTime_16=ruleComparaisonTime();

                    state._fsp--;


                    			current = this_ComparaisonTime_16;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 18 :
                    // InternalMyDsl.g:949:3: this_ComparaisonAri_17= ruleComparaisonAri
                    {

                    			newCompositeNode(grammarAccess.getExpressionAccess().getComparaisonAriParserRuleCall_17());
                    		
                    pushFollow(FOLLOW_2);
                    this_ComparaisonAri_17=ruleComparaisonAri();

                    state._fsp--;


                    			current = this_ComparaisonAri_17;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleExpression"


    // $ANTLR start "entryRuleFunction"
    // InternalMyDsl.g:961:1: entryRuleFunction returns [EObject current=null] : iv_ruleFunction= ruleFunction EOF ;
    public final EObject entryRuleFunction() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleFunction = null;


        try {
            // InternalMyDsl.g:961:49: (iv_ruleFunction= ruleFunction EOF )
            // InternalMyDsl.g:962:2: iv_ruleFunction= ruleFunction EOF
            {
             newCompositeNode(grammarAccess.getFunctionRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleFunction=ruleFunction();

            state._fsp--;

             current =iv_ruleFunction; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleFunction"


    // $ANTLR start "ruleFunction"
    // InternalMyDsl.g:968:1: ruleFunction returns [EObject current=null] : ( () otherlv_1= 'Function' otherlv_2= '{' (otherlv_3= 'instruction' otherlv_4= '{' ( (lv_instruction_5_0= ruleInstruction ) ) (otherlv_6= ',' ( (lv_instruction_7_0= ruleInstruction ) ) )* otherlv_8= '}' )? (otherlv_9= 'parameters' otherlv_10= '{' ( (lv_parameters_11_0= ruleTypeClass ) ) (otherlv_12= ',' ( (lv_parameters_13_0= ruleTypeClass ) ) )* otherlv_14= '}' )? (otherlv_15= 'return' ( (lv_return_16_0= ruleTypeClass ) ) )? otherlv_17= '}' ) ;
    public final EObject ruleFunction() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_4=null;
        Token otherlv_6=null;
        Token otherlv_8=null;
        Token otherlv_9=null;
        Token otherlv_10=null;
        Token otherlv_12=null;
        Token otherlv_14=null;
        Token otherlv_15=null;
        Token otherlv_17=null;
        EObject lv_instruction_5_0 = null;

        EObject lv_instruction_7_0 = null;

        EObject lv_parameters_11_0 = null;

        EObject lv_parameters_13_0 = null;

        EObject lv_return_16_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:974:2: ( ( () otherlv_1= 'Function' otherlv_2= '{' (otherlv_3= 'instruction' otherlv_4= '{' ( (lv_instruction_5_0= ruleInstruction ) ) (otherlv_6= ',' ( (lv_instruction_7_0= ruleInstruction ) ) )* otherlv_8= '}' )? (otherlv_9= 'parameters' otherlv_10= '{' ( (lv_parameters_11_0= ruleTypeClass ) ) (otherlv_12= ',' ( (lv_parameters_13_0= ruleTypeClass ) ) )* otherlv_14= '}' )? (otherlv_15= 'return' ( (lv_return_16_0= ruleTypeClass ) ) )? otherlv_17= '}' ) )
            // InternalMyDsl.g:975:2: ( () otherlv_1= 'Function' otherlv_2= '{' (otherlv_3= 'instruction' otherlv_4= '{' ( (lv_instruction_5_0= ruleInstruction ) ) (otherlv_6= ',' ( (lv_instruction_7_0= ruleInstruction ) ) )* otherlv_8= '}' )? (otherlv_9= 'parameters' otherlv_10= '{' ( (lv_parameters_11_0= ruleTypeClass ) ) (otherlv_12= ',' ( (lv_parameters_13_0= ruleTypeClass ) ) )* otherlv_14= '}' )? (otherlv_15= 'return' ( (lv_return_16_0= ruleTypeClass ) ) )? otherlv_17= '}' )
            {
            // InternalMyDsl.g:975:2: ( () otherlv_1= 'Function' otherlv_2= '{' (otherlv_3= 'instruction' otherlv_4= '{' ( (lv_instruction_5_0= ruleInstruction ) ) (otherlv_6= ',' ( (lv_instruction_7_0= ruleInstruction ) ) )* otherlv_8= '}' )? (otherlv_9= 'parameters' otherlv_10= '{' ( (lv_parameters_11_0= ruleTypeClass ) ) (otherlv_12= ',' ( (lv_parameters_13_0= ruleTypeClass ) ) )* otherlv_14= '}' )? (otherlv_15= 'return' ( (lv_return_16_0= ruleTypeClass ) ) )? otherlv_17= '}' )
            // InternalMyDsl.g:976:3: () otherlv_1= 'Function' otherlv_2= '{' (otherlv_3= 'instruction' otherlv_4= '{' ( (lv_instruction_5_0= ruleInstruction ) ) (otherlv_6= ',' ( (lv_instruction_7_0= ruleInstruction ) ) )* otherlv_8= '}' )? (otherlv_9= 'parameters' otherlv_10= '{' ( (lv_parameters_11_0= ruleTypeClass ) ) (otherlv_12= ',' ( (lv_parameters_13_0= ruleTypeClass ) ) )* otherlv_14= '}' )? (otherlv_15= 'return' ( (lv_return_16_0= ruleTypeClass ) ) )? otherlv_17= '}'
            {
            // InternalMyDsl.g:976:3: ()
            // InternalMyDsl.g:977:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getFunctionAccess().getFunctionAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,16,FOLLOW_3); 

            			newLeafNode(otherlv_1, grammarAccess.getFunctionAccess().getFunctionKeyword_1());
            		
            otherlv_2=(Token)match(input,12,FOLLOW_8); 

            			newLeafNode(otherlv_2, grammarAccess.getFunctionAccess().getLeftCurlyBracketKeyword_2());
            		
            // InternalMyDsl.g:991:3: (otherlv_3= 'instruction' otherlv_4= '{' ( (lv_instruction_5_0= ruleInstruction ) ) (otherlv_6= ',' ( (lv_instruction_7_0= ruleInstruction ) ) )* otherlv_8= '}' )?
            int alt10=2;
            int LA10_0 = input.LA(1);

            if ( (LA10_0==17) ) {
                alt10=1;
            }
            switch (alt10) {
                case 1 :
                    // InternalMyDsl.g:992:4: otherlv_3= 'instruction' otherlv_4= '{' ( (lv_instruction_5_0= ruleInstruction ) ) (otherlv_6= ',' ( (lv_instruction_7_0= ruleInstruction ) ) )* otherlv_8= '}'
                    {
                    otherlv_3=(Token)match(input,17,FOLLOW_3); 

                    				newLeafNode(otherlv_3, grammarAccess.getFunctionAccess().getInstructionKeyword_3_0());
                    			
                    otherlv_4=(Token)match(input,12,FOLLOW_9); 

                    				newLeafNode(otherlv_4, grammarAccess.getFunctionAccess().getLeftCurlyBracketKeyword_3_1());
                    			
                    // InternalMyDsl.g:1000:4: ( (lv_instruction_5_0= ruleInstruction ) )
                    // InternalMyDsl.g:1001:5: (lv_instruction_5_0= ruleInstruction )
                    {
                    // InternalMyDsl.g:1001:5: (lv_instruction_5_0= ruleInstruction )
                    // InternalMyDsl.g:1002:6: lv_instruction_5_0= ruleInstruction
                    {

                    						newCompositeNode(grammarAccess.getFunctionAccess().getInstructionInstructionParserRuleCall_3_2_0());
                    					
                    pushFollow(FOLLOW_6);
                    lv_instruction_5_0=ruleInstruction();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getFunctionRule());
                    						}
                    						add(
                    							current,
                    							"instruction",
                    							lv_instruction_5_0,
                    							"org.xtext.example.mydsl2.MyDsl.Instruction");
                    						afterParserOrEnumRuleCall();
                    					

                    }


                    }

                    // InternalMyDsl.g:1019:4: (otherlv_6= ',' ( (lv_instruction_7_0= ruleInstruction ) ) )*
                    loop9:
                    do {
                        int alt9=2;
                        int LA9_0 = input.LA(1);

                        if ( (LA9_0==14) ) {
                            alt9=1;
                        }


                        switch (alt9) {
                    	case 1 :
                    	    // InternalMyDsl.g:1020:5: otherlv_6= ',' ( (lv_instruction_7_0= ruleInstruction ) )
                    	    {
                    	    otherlv_6=(Token)match(input,14,FOLLOW_9); 

                    	    					newLeafNode(otherlv_6, grammarAccess.getFunctionAccess().getCommaKeyword_3_3_0());
                    	    				
                    	    // InternalMyDsl.g:1024:5: ( (lv_instruction_7_0= ruleInstruction ) )
                    	    // InternalMyDsl.g:1025:6: (lv_instruction_7_0= ruleInstruction )
                    	    {
                    	    // InternalMyDsl.g:1025:6: (lv_instruction_7_0= ruleInstruction )
                    	    // InternalMyDsl.g:1026:7: lv_instruction_7_0= ruleInstruction
                    	    {

                    	    							newCompositeNode(grammarAccess.getFunctionAccess().getInstructionInstructionParserRuleCall_3_3_1_0());
                    	    						
                    	    pushFollow(FOLLOW_6);
                    	    lv_instruction_7_0=ruleInstruction();

                    	    state._fsp--;


                    	    							if (current==null) {
                    	    								current = createModelElementForParent(grammarAccess.getFunctionRule());
                    	    							}
                    	    							add(
                    	    								current,
                    	    								"instruction",
                    	    								lv_instruction_7_0,
                    	    								"org.xtext.example.mydsl2.MyDsl.Instruction");
                    	    							afterParserOrEnumRuleCall();
                    	    						

                    	    }


                    	    }


                    	    }
                    	    break;

                    	default :
                    	    break loop9;
                        }
                    } while (true);

                    otherlv_8=(Token)match(input,15,FOLLOW_10); 

                    				newLeafNode(otherlv_8, grammarAccess.getFunctionAccess().getRightCurlyBracketKeyword_3_4());
                    			

                    }
                    break;

            }

            // InternalMyDsl.g:1049:3: (otherlv_9= 'parameters' otherlv_10= '{' ( (lv_parameters_11_0= ruleTypeClass ) ) (otherlv_12= ',' ( (lv_parameters_13_0= ruleTypeClass ) ) )* otherlv_14= '}' )?
            int alt12=2;
            int LA12_0 = input.LA(1);

            if ( (LA12_0==18) ) {
                alt12=1;
            }
            switch (alt12) {
                case 1 :
                    // InternalMyDsl.g:1050:4: otherlv_9= 'parameters' otherlv_10= '{' ( (lv_parameters_11_0= ruleTypeClass ) ) (otherlv_12= ',' ( (lv_parameters_13_0= ruleTypeClass ) ) )* otherlv_14= '}'
                    {
                    otherlv_9=(Token)match(input,18,FOLLOW_3); 

                    				newLeafNode(otherlv_9, grammarAccess.getFunctionAccess().getParametersKeyword_4_0());
                    			
                    otherlv_10=(Token)match(input,12,FOLLOW_11); 

                    				newLeafNode(otherlv_10, grammarAccess.getFunctionAccess().getLeftCurlyBracketKeyword_4_1());
                    			
                    // InternalMyDsl.g:1058:4: ( (lv_parameters_11_0= ruleTypeClass ) )
                    // InternalMyDsl.g:1059:5: (lv_parameters_11_0= ruleTypeClass )
                    {
                    // InternalMyDsl.g:1059:5: (lv_parameters_11_0= ruleTypeClass )
                    // InternalMyDsl.g:1060:6: lv_parameters_11_0= ruleTypeClass
                    {

                    						newCompositeNode(grammarAccess.getFunctionAccess().getParametersTypeClassParserRuleCall_4_2_0());
                    					
                    pushFollow(FOLLOW_6);
                    lv_parameters_11_0=ruleTypeClass();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getFunctionRule());
                    						}
                    						add(
                    							current,
                    							"parameters",
                    							lv_parameters_11_0,
                    							"org.xtext.example.mydsl2.MyDsl.TypeClass");
                    						afterParserOrEnumRuleCall();
                    					

                    }


                    }

                    // InternalMyDsl.g:1077:4: (otherlv_12= ',' ( (lv_parameters_13_0= ruleTypeClass ) ) )*
                    loop11:
                    do {
                        int alt11=2;
                        int LA11_0 = input.LA(1);

                        if ( (LA11_0==14) ) {
                            alt11=1;
                        }


                        switch (alt11) {
                    	case 1 :
                    	    // InternalMyDsl.g:1078:5: otherlv_12= ',' ( (lv_parameters_13_0= ruleTypeClass ) )
                    	    {
                    	    otherlv_12=(Token)match(input,14,FOLLOW_11); 

                    	    					newLeafNode(otherlv_12, grammarAccess.getFunctionAccess().getCommaKeyword_4_3_0());
                    	    				
                    	    // InternalMyDsl.g:1082:5: ( (lv_parameters_13_0= ruleTypeClass ) )
                    	    // InternalMyDsl.g:1083:6: (lv_parameters_13_0= ruleTypeClass )
                    	    {
                    	    // InternalMyDsl.g:1083:6: (lv_parameters_13_0= ruleTypeClass )
                    	    // InternalMyDsl.g:1084:7: lv_parameters_13_0= ruleTypeClass
                    	    {

                    	    							newCompositeNode(grammarAccess.getFunctionAccess().getParametersTypeClassParserRuleCall_4_3_1_0());
                    	    						
                    	    pushFollow(FOLLOW_6);
                    	    lv_parameters_13_0=ruleTypeClass();

                    	    state._fsp--;


                    	    							if (current==null) {
                    	    								current = createModelElementForParent(grammarAccess.getFunctionRule());
                    	    							}
                    	    							add(
                    	    								current,
                    	    								"parameters",
                    	    								lv_parameters_13_0,
                    	    								"org.xtext.example.mydsl2.MyDsl.TypeClass");
                    	    							afterParserOrEnumRuleCall();
                    	    						

                    	    }


                    	    }


                    	    }
                    	    break;

                    	default :
                    	    break loop11;
                        }
                    } while (true);

                    otherlv_14=(Token)match(input,15,FOLLOW_12); 

                    				newLeafNode(otherlv_14, grammarAccess.getFunctionAccess().getRightCurlyBracketKeyword_4_4());
                    			

                    }
                    break;

            }

            // InternalMyDsl.g:1107:3: (otherlv_15= 'return' ( (lv_return_16_0= ruleTypeClass ) ) )?
            int alt13=2;
            int LA13_0 = input.LA(1);

            if ( (LA13_0==19) ) {
                alt13=1;
            }
            switch (alt13) {
                case 1 :
                    // InternalMyDsl.g:1108:4: otherlv_15= 'return' ( (lv_return_16_0= ruleTypeClass ) )
                    {
                    otherlv_15=(Token)match(input,19,FOLLOW_11); 

                    				newLeafNode(otherlv_15, grammarAccess.getFunctionAccess().getReturnKeyword_5_0());
                    			
                    // InternalMyDsl.g:1112:4: ( (lv_return_16_0= ruleTypeClass ) )
                    // InternalMyDsl.g:1113:5: (lv_return_16_0= ruleTypeClass )
                    {
                    // InternalMyDsl.g:1113:5: (lv_return_16_0= ruleTypeClass )
                    // InternalMyDsl.g:1114:6: lv_return_16_0= ruleTypeClass
                    {

                    						newCompositeNode(grammarAccess.getFunctionAccess().getReturnTypeClassParserRuleCall_5_1_0());
                    					
                    pushFollow(FOLLOW_7);
                    lv_return_16_0=ruleTypeClass();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getFunctionRule());
                    						}
                    						set(
                    							current,
                    							"return",
                    							lv_return_16_0,
                    							"org.xtext.example.mydsl2.MyDsl.TypeClass");
                    						afterParserOrEnumRuleCall();
                    					

                    }


                    }


                    }
                    break;

            }

            otherlv_17=(Token)match(input,15,FOLLOW_2); 

            			newLeafNode(otherlv_17, grammarAccess.getFunctionAccess().getRightCurlyBracketKeyword_6());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleFunction"


    // $ANTLR start "entryRuleRotateCommand"
    // InternalMyDsl.g:1140:1: entryRuleRotateCommand returns [EObject current=null] : iv_ruleRotateCommand= ruleRotateCommand EOF ;
    public final EObject entryRuleRotateCommand() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleRotateCommand = null;


        try {
            // InternalMyDsl.g:1140:54: (iv_ruleRotateCommand= ruleRotateCommand EOF )
            // InternalMyDsl.g:1141:2: iv_ruleRotateCommand= ruleRotateCommand EOF
            {
             newCompositeNode(grammarAccess.getRotateCommandRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleRotateCommand=ruleRotateCommand();

            state._fsp--;

             current =iv_ruleRotateCommand; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleRotateCommand"


    // $ANTLR start "ruleRotateCommand"
    // InternalMyDsl.g:1147:1: ruleRotateCommand returns [EObject current=null] : ( () otherlv_1= 'RotateCommand' otherlv_2= '{' (otherlv_3= 'angle' ( (lv_angle_4_0= ruleEDouble ) ) )? otherlv_5= '}' ) ;
    public final EObject ruleRotateCommand() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_5=null;
        AntlrDatatypeRuleToken lv_angle_4_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:1153:2: ( ( () otherlv_1= 'RotateCommand' otherlv_2= '{' (otherlv_3= 'angle' ( (lv_angle_4_0= ruleEDouble ) ) )? otherlv_5= '}' ) )
            // InternalMyDsl.g:1154:2: ( () otherlv_1= 'RotateCommand' otherlv_2= '{' (otherlv_3= 'angle' ( (lv_angle_4_0= ruleEDouble ) ) )? otherlv_5= '}' )
            {
            // InternalMyDsl.g:1154:2: ( () otherlv_1= 'RotateCommand' otherlv_2= '{' (otherlv_3= 'angle' ( (lv_angle_4_0= ruleEDouble ) ) )? otherlv_5= '}' )
            // InternalMyDsl.g:1155:3: () otherlv_1= 'RotateCommand' otherlv_2= '{' (otherlv_3= 'angle' ( (lv_angle_4_0= ruleEDouble ) ) )? otherlv_5= '}'
            {
            // InternalMyDsl.g:1155:3: ()
            // InternalMyDsl.g:1156:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getRotateCommandAccess().getRotateCommandAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,20,FOLLOW_3); 

            			newLeafNode(otherlv_1, grammarAccess.getRotateCommandAccess().getRotateCommandKeyword_1());
            		
            otherlv_2=(Token)match(input,12,FOLLOW_13); 

            			newLeafNode(otherlv_2, grammarAccess.getRotateCommandAccess().getLeftCurlyBracketKeyword_2());
            		
            // InternalMyDsl.g:1170:3: (otherlv_3= 'angle' ( (lv_angle_4_0= ruleEDouble ) ) )?
            int alt14=2;
            int LA14_0 = input.LA(1);

            if ( (LA14_0==21) ) {
                alt14=1;
            }
            switch (alt14) {
                case 1 :
                    // InternalMyDsl.g:1171:4: otherlv_3= 'angle' ( (lv_angle_4_0= ruleEDouble ) )
                    {
                    otherlv_3=(Token)match(input,21,FOLLOW_14); 

                    				newLeafNode(otherlv_3, grammarAccess.getRotateCommandAccess().getAngleKeyword_3_0());
                    			
                    // InternalMyDsl.g:1175:4: ( (lv_angle_4_0= ruleEDouble ) )
                    // InternalMyDsl.g:1176:5: (lv_angle_4_0= ruleEDouble )
                    {
                    // InternalMyDsl.g:1176:5: (lv_angle_4_0= ruleEDouble )
                    // InternalMyDsl.g:1177:6: lv_angle_4_0= ruleEDouble
                    {

                    						newCompositeNode(grammarAccess.getRotateCommandAccess().getAngleEDoubleParserRuleCall_3_1_0());
                    					
                    pushFollow(FOLLOW_7);
                    lv_angle_4_0=ruleEDouble();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getRotateCommandRule());
                    						}
                    						set(
                    							current,
                    							"angle",
                    							lv_angle_4_0,
                    							"org.xtext.example.mydsl2.MyDsl.EDouble");
                    						afterParserOrEnumRuleCall();
                    					

                    }


                    }


                    }
                    break;

            }

            otherlv_5=(Token)match(input,15,FOLLOW_2); 

            			newLeafNode(otherlv_5, grammarAccess.getRotateCommandAccess().getRightCurlyBracketKeyword_4());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleRotateCommand"


    // $ANTLR start "entryRuleDirectionCommand"
    // InternalMyDsl.g:1203:1: entryRuleDirectionCommand returns [EObject current=null] : iv_ruleDirectionCommand= ruleDirectionCommand EOF ;
    public final EObject entryRuleDirectionCommand() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleDirectionCommand = null;


        try {
            // InternalMyDsl.g:1203:57: (iv_ruleDirectionCommand= ruleDirectionCommand EOF )
            // InternalMyDsl.g:1204:2: iv_ruleDirectionCommand= ruleDirectionCommand EOF
            {
             newCompositeNode(grammarAccess.getDirectionCommandRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleDirectionCommand=ruleDirectionCommand();

            state._fsp--;

             current =iv_ruleDirectionCommand; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleDirectionCommand"


    // $ANTLR start "ruleDirectionCommand"
    // InternalMyDsl.g:1210:1: ruleDirectionCommand returns [EObject current=null] : (otherlv_0= 'DirectionCommand' otherlv_1= '{' otherlv_2= 'distance' ( (lv_distance_3_0= ruleDistance ) ) otherlv_4= '}' ) ;
    public final EObject ruleDirectionCommand() throws RecognitionException {
        EObject current = null;

        Token otherlv_0=null;
        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_4=null;
        EObject lv_distance_3_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:1216:2: ( (otherlv_0= 'DirectionCommand' otherlv_1= '{' otherlv_2= 'distance' ( (lv_distance_3_0= ruleDistance ) ) otherlv_4= '}' ) )
            // InternalMyDsl.g:1217:2: (otherlv_0= 'DirectionCommand' otherlv_1= '{' otherlv_2= 'distance' ( (lv_distance_3_0= ruleDistance ) ) otherlv_4= '}' )
            {
            // InternalMyDsl.g:1217:2: (otherlv_0= 'DirectionCommand' otherlv_1= '{' otherlv_2= 'distance' ( (lv_distance_3_0= ruleDistance ) ) otherlv_4= '}' )
            // InternalMyDsl.g:1218:3: otherlv_0= 'DirectionCommand' otherlv_1= '{' otherlv_2= 'distance' ( (lv_distance_3_0= ruleDistance ) ) otherlv_4= '}'
            {
            otherlv_0=(Token)match(input,22,FOLLOW_3); 

            			newLeafNode(otherlv_0, grammarAccess.getDirectionCommandAccess().getDirectionCommandKeyword_0());
            		
            otherlv_1=(Token)match(input,12,FOLLOW_15); 

            			newLeafNode(otherlv_1, grammarAccess.getDirectionCommandAccess().getLeftCurlyBracketKeyword_1());
            		
            otherlv_2=(Token)match(input,23,FOLLOW_16); 

            			newLeafNode(otherlv_2, grammarAccess.getDirectionCommandAccess().getDistanceKeyword_2());
            		
            // InternalMyDsl.g:1230:3: ( (lv_distance_3_0= ruleDistance ) )
            // InternalMyDsl.g:1231:4: (lv_distance_3_0= ruleDistance )
            {
            // InternalMyDsl.g:1231:4: (lv_distance_3_0= ruleDistance )
            // InternalMyDsl.g:1232:5: lv_distance_3_0= ruleDistance
            {

            					newCompositeNode(grammarAccess.getDirectionCommandAccess().getDistanceDistanceParserRuleCall_3_0());
            				
            pushFollow(FOLLOW_7);
            lv_distance_3_0=ruleDistance();

            state._fsp--;


            					if (current==null) {
            						current = createModelElementForParent(grammarAccess.getDirectionCommandRule());
            					}
            					set(
            						current,
            						"distance",
            						lv_distance_3_0,
            						"org.xtext.example.mydsl2.MyDsl.Distance");
            					afterParserOrEnumRuleCall();
            				

            }


            }

            otherlv_4=(Token)match(input,15,FOLLOW_2); 

            			newLeafNode(otherlv_4, grammarAccess.getDirectionCommandAccess().getRightCurlyBracketKeyword_4());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleDirectionCommand"


    // $ANTLR start "entryRuleSpeedCommand"
    // InternalMyDsl.g:1257:1: entryRuleSpeedCommand returns [EObject current=null] : iv_ruleSpeedCommand= ruleSpeedCommand EOF ;
    public final EObject entryRuleSpeedCommand() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleSpeedCommand = null;


        try {
            // InternalMyDsl.g:1257:53: (iv_ruleSpeedCommand= ruleSpeedCommand EOF )
            // InternalMyDsl.g:1258:2: iv_ruleSpeedCommand= ruleSpeedCommand EOF
            {
             newCompositeNode(grammarAccess.getSpeedCommandRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleSpeedCommand=ruleSpeedCommand();

            state._fsp--;

             current =iv_ruleSpeedCommand; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleSpeedCommand"


    // $ANTLR start "ruleSpeedCommand"
    // InternalMyDsl.g:1264:1: ruleSpeedCommand returns [EObject current=null] : ( () otherlv_1= 'SpeedCommand' otherlv_2= '{' (otherlv_3= 'speed' ( (lv_speed_4_0= ruleEDouble ) ) )? otherlv_5= '}' ) ;
    public final EObject ruleSpeedCommand() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_5=null;
        AntlrDatatypeRuleToken lv_speed_4_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:1270:2: ( ( () otherlv_1= 'SpeedCommand' otherlv_2= '{' (otherlv_3= 'speed' ( (lv_speed_4_0= ruleEDouble ) ) )? otherlv_5= '}' ) )
            // InternalMyDsl.g:1271:2: ( () otherlv_1= 'SpeedCommand' otherlv_2= '{' (otherlv_3= 'speed' ( (lv_speed_4_0= ruleEDouble ) ) )? otherlv_5= '}' )
            {
            // InternalMyDsl.g:1271:2: ( () otherlv_1= 'SpeedCommand' otherlv_2= '{' (otherlv_3= 'speed' ( (lv_speed_4_0= ruleEDouble ) ) )? otherlv_5= '}' )
            // InternalMyDsl.g:1272:3: () otherlv_1= 'SpeedCommand' otherlv_2= '{' (otherlv_3= 'speed' ( (lv_speed_4_0= ruleEDouble ) ) )? otherlv_5= '}'
            {
            // InternalMyDsl.g:1272:3: ()
            // InternalMyDsl.g:1273:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getSpeedCommandAccess().getSpeedCommandAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,24,FOLLOW_3); 

            			newLeafNode(otherlv_1, grammarAccess.getSpeedCommandAccess().getSpeedCommandKeyword_1());
            		
            otherlv_2=(Token)match(input,12,FOLLOW_17); 

            			newLeafNode(otherlv_2, grammarAccess.getSpeedCommandAccess().getLeftCurlyBracketKeyword_2());
            		
            // InternalMyDsl.g:1287:3: (otherlv_3= 'speed' ( (lv_speed_4_0= ruleEDouble ) ) )?
            int alt15=2;
            int LA15_0 = input.LA(1);

            if ( (LA15_0==25) ) {
                alt15=1;
            }
            switch (alt15) {
                case 1 :
                    // InternalMyDsl.g:1288:4: otherlv_3= 'speed' ( (lv_speed_4_0= ruleEDouble ) )
                    {
                    otherlv_3=(Token)match(input,25,FOLLOW_14); 

                    				newLeafNode(otherlv_3, grammarAccess.getSpeedCommandAccess().getSpeedKeyword_3_0());
                    			
                    // InternalMyDsl.g:1292:4: ( (lv_speed_4_0= ruleEDouble ) )
                    // InternalMyDsl.g:1293:5: (lv_speed_4_0= ruleEDouble )
                    {
                    // InternalMyDsl.g:1293:5: (lv_speed_4_0= ruleEDouble )
                    // InternalMyDsl.g:1294:6: lv_speed_4_0= ruleEDouble
                    {

                    						newCompositeNode(grammarAccess.getSpeedCommandAccess().getSpeedEDoubleParserRuleCall_3_1_0());
                    					
                    pushFollow(FOLLOW_7);
                    lv_speed_4_0=ruleEDouble();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getSpeedCommandRule());
                    						}
                    						set(
                    							current,
                    							"speed",
                    							lv_speed_4_0,
                    							"org.xtext.example.mydsl2.MyDsl.EDouble");
                    						afterParserOrEnumRuleCall();
                    					

                    }


                    }


                    }
                    break;

            }

            otherlv_5=(Token)match(input,15,FOLLOW_2); 

            			newLeafNode(otherlv_5, grammarAccess.getSpeedCommandAccess().getRightCurlyBracketKeyword_4());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleSpeedCommand"


    // $ANTLR start "entryRuleDistanceSensorCommand"
    // InternalMyDsl.g:1320:1: entryRuleDistanceSensorCommand returns [EObject current=null] : iv_ruleDistanceSensorCommand= ruleDistanceSensorCommand EOF ;
    public final EObject entryRuleDistanceSensorCommand() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleDistanceSensorCommand = null;


        try {
            // InternalMyDsl.g:1320:62: (iv_ruleDistanceSensorCommand= ruleDistanceSensorCommand EOF )
            // InternalMyDsl.g:1321:2: iv_ruleDistanceSensorCommand= ruleDistanceSensorCommand EOF
            {
             newCompositeNode(grammarAccess.getDistanceSensorCommandRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleDistanceSensorCommand=ruleDistanceSensorCommand();

            state._fsp--;

             current =iv_ruleDistanceSensorCommand; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleDistanceSensorCommand"


    // $ANTLR start "ruleDistanceSensorCommand"
    // InternalMyDsl.g:1327:1: ruleDistanceSensorCommand returns [EObject current=null] : ( () otherlv_1= 'DistanceSensorCommand' ) ;
    public final EObject ruleDistanceSensorCommand() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;


        	enterRule();

        try {
            // InternalMyDsl.g:1333:2: ( ( () otherlv_1= 'DistanceSensorCommand' ) )
            // InternalMyDsl.g:1334:2: ( () otherlv_1= 'DistanceSensorCommand' )
            {
            // InternalMyDsl.g:1334:2: ( () otherlv_1= 'DistanceSensorCommand' )
            // InternalMyDsl.g:1335:3: () otherlv_1= 'DistanceSensorCommand'
            {
            // InternalMyDsl.g:1335:3: ()
            // InternalMyDsl.g:1336:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getDistanceSensorCommandAccess().getDistanceSensorCommandAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,26,FOLLOW_2); 

            			newLeafNode(otherlv_1, grammarAccess.getDistanceSensorCommandAccess().getDistanceSensorCommandKeyword_1());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleDistanceSensorCommand"


    // $ANTLR start "entryRuleTimeSensorCommand"
    // InternalMyDsl.g:1350:1: entryRuleTimeSensorCommand returns [EObject current=null] : iv_ruleTimeSensorCommand= ruleTimeSensorCommand EOF ;
    public final EObject entryRuleTimeSensorCommand() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleTimeSensorCommand = null;


        try {
            // InternalMyDsl.g:1350:58: (iv_ruleTimeSensorCommand= ruleTimeSensorCommand EOF )
            // InternalMyDsl.g:1351:2: iv_ruleTimeSensorCommand= ruleTimeSensorCommand EOF
            {
             newCompositeNode(grammarAccess.getTimeSensorCommandRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleTimeSensorCommand=ruleTimeSensorCommand();

            state._fsp--;

             current =iv_ruleTimeSensorCommand; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleTimeSensorCommand"


    // $ANTLR start "ruleTimeSensorCommand"
    // InternalMyDsl.g:1357:1: ruleTimeSensorCommand returns [EObject current=null] : ( () otherlv_1= 'TimeSensorCommand' ) ;
    public final EObject ruleTimeSensorCommand() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;


        	enterRule();

        try {
            // InternalMyDsl.g:1363:2: ( ( () otherlv_1= 'TimeSensorCommand' ) )
            // InternalMyDsl.g:1364:2: ( () otherlv_1= 'TimeSensorCommand' )
            {
            // InternalMyDsl.g:1364:2: ( () otherlv_1= 'TimeSensorCommand' )
            // InternalMyDsl.g:1365:3: () otherlv_1= 'TimeSensorCommand'
            {
            // InternalMyDsl.g:1365:3: ()
            // InternalMyDsl.g:1366:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getTimeSensorCommandAccess().getTimeSensorCommandAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,27,FOLLOW_2); 

            			newLeafNode(otherlv_1, grammarAccess.getTimeSensorCommandAccess().getTimeSensorCommandKeyword_1());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleTimeSensorCommand"


    // $ANTLR start "entryRuleBooleanExp_Impl"
    // InternalMyDsl.g:1380:1: entryRuleBooleanExp_Impl returns [EObject current=null] : iv_ruleBooleanExp_Impl= ruleBooleanExp_Impl EOF ;
    public final EObject entryRuleBooleanExp_Impl() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleBooleanExp_Impl = null;


        try {
            // InternalMyDsl.g:1380:56: (iv_ruleBooleanExp_Impl= ruleBooleanExp_Impl EOF )
            // InternalMyDsl.g:1381:2: iv_ruleBooleanExp_Impl= ruleBooleanExp_Impl EOF
            {
             newCompositeNode(grammarAccess.getBooleanExp_ImplRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleBooleanExp_Impl=ruleBooleanExp_Impl();

            state._fsp--;

             current =iv_ruleBooleanExp_Impl; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleBooleanExp_Impl"


    // $ANTLR start "ruleBooleanExp_Impl"
    // InternalMyDsl.g:1387:1: ruleBooleanExp_Impl returns [EObject current=null] : ( () otherlv_1= 'BooleanExp' ) ;
    public final EObject ruleBooleanExp_Impl() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;


        	enterRule();

        try {
            // InternalMyDsl.g:1393:2: ( ( () otherlv_1= 'BooleanExp' ) )
            // InternalMyDsl.g:1394:2: ( () otherlv_1= 'BooleanExp' )
            {
            // InternalMyDsl.g:1394:2: ( () otherlv_1= 'BooleanExp' )
            // InternalMyDsl.g:1395:3: () otherlv_1= 'BooleanExp'
            {
            // InternalMyDsl.g:1395:3: ()
            // InternalMyDsl.g:1396:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getBooleanExp_ImplAccess().getBooleanExpAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,28,FOLLOW_2); 

            			newLeafNode(otherlv_1, grammarAccess.getBooleanExp_ImplAccess().getBooleanExpKeyword_1());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleBooleanExp_Impl"


    // $ANTLR start "entryRulePlusMinus"
    // InternalMyDsl.g:1410:1: entryRulePlusMinus returns [EObject current=null] : iv_rulePlusMinus= rulePlusMinus EOF ;
    public final EObject entryRulePlusMinus() throws RecognitionException {
        EObject current = null;

        EObject iv_rulePlusMinus = null;


        try {
            // InternalMyDsl.g:1410:50: (iv_rulePlusMinus= rulePlusMinus EOF )
            // InternalMyDsl.g:1411:2: iv_rulePlusMinus= rulePlusMinus EOF
            {
             newCompositeNode(grammarAccess.getPlusMinusRule()); 
            pushFollow(FOLLOW_1);
            iv_rulePlusMinus=rulePlusMinus();

            state._fsp--;

             current =iv_rulePlusMinus; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRulePlusMinus"


    // $ANTLR start "rulePlusMinus"
    // InternalMyDsl.g:1417:1: rulePlusMinus returns [EObject current=null] : ( () otherlv_1= 'PlusMinus' ) ;
    public final EObject rulePlusMinus() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;


        	enterRule();

        try {
            // InternalMyDsl.g:1423:2: ( ( () otherlv_1= 'PlusMinus' ) )
            // InternalMyDsl.g:1424:2: ( () otherlv_1= 'PlusMinus' )
            {
            // InternalMyDsl.g:1424:2: ( () otherlv_1= 'PlusMinus' )
            // InternalMyDsl.g:1425:3: () otherlv_1= 'PlusMinus'
            {
            // InternalMyDsl.g:1425:3: ()
            // InternalMyDsl.g:1426:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getPlusMinusAccess().getPlusMinusAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,29,FOLLOW_2); 

            			newLeafNode(otherlv_1, grammarAccess.getPlusMinusAccess().getPlusMinusKeyword_1());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "rulePlusMinus"


    // $ANTLR start "entryRuleMultDiv"
    // InternalMyDsl.g:1440:1: entryRuleMultDiv returns [EObject current=null] : iv_ruleMultDiv= ruleMultDiv EOF ;
    public final EObject entryRuleMultDiv() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleMultDiv = null;


        try {
            // InternalMyDsl.g:1440:48: (iv_ruleMultDiv= ruleMultDiv EOF )
            // InternalMyDsl.g:1441:2: iv_ruleMultDiv= ruleMultDiv EOF
            {
             newCompositeNode(grammarAccess.getMultDivRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleMultDiv=ruleMultDiv();

            state._fsp--;

             current =iv_ruleMultDiv; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleMultDiv"


    // $ANTLR start "ruleMultDiv"
    // InternalMyDsl.g:1447:1: ruleMultDiv returns [EObject current=null] : ( () otherlv_1= 'MultDiv' ) ;
    public final EObject ruleMultDiv() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;


        	enterRule();

        try {
            // InternalMyDsl.g:1453:2: ( ( () otherlv_1= 'MultDiv' ) )
            // InternalMyDsl.g:1454:2: ( () otherlv_1= 'MultDiv' )
            {
            // InternalMyDsl.g:1454:2: ( () otherlv_1= 'MultDiv' )
            // InternalMyDsl.g:1455:3: () otherlv_1= 'MultDiv'
            {
            // InternalMyDsl.g:1455:3: ()
            // InternalMyDsl.g:1456:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getMultDivAccess().getMultDivAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,30,FOLLOW_2); 

            			newLeafNode(otherlv_1, grammarAccess.getMultDivAccess().getMultDivKeyword_1());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleMultDiv"


    // $ANTLR start "entryRulePrimaryExprAri"
    // InternalMyDsl.g:1470:1: entryRulePrimaryExprAri returns [EObject current=null] : iv_rulePrimaryExprAri= rulePrimaryExprAri EOF ;
    public final EObject entryRulePrimaryExprAri() throws RecognitionException {
        EObject current = null;

        EObject iv_rulePrimaryExprAri = null;


        try {
            // InternalMyDsl.g:1470:55: (iv_rulePrimaryExprAri= rulePrimaryExprAri EOF )
            // InternalMyDsl.g:1471:2: iv_rulePrimaryExprAri= rulePrimaryExprAri EOF
            {
             newCompositeNode(grammarAccess.getPrimaryExprAriRule()); 
            pushFollow(FOLLOW_1);
            iv_rulePrimaryExprAri=rulePrimaryExprAri();

            state._fsp--;

             current =iv_rulePrimaryExprAri; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRulePrimaryExprAri"


    // $ANTLR start "rulePrimaryExprAri"
    // InternalMyDsl.g:1477:1: rulePrimaryExprAri returns [EObject current=null] : ( () otherlv_1= 'PrimaryExprAri' otherlv_2= '{' (otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) ) )? (otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) ) )? otherlv_7= '}' ) ;
    public final EObject rulePrimaryExprAri() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_5=null;
        Token otherlv_7=null;
        EObject lv_type_4_0 = null;

        EObject lv_call_6_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:1483:2: ( ( () otherlv_1= 'PrimaryExprAri' otherlv_2= '{' (otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) ) )? (otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) ) )? otherlv_7= '}' ) )
            // InternalMyDsl.g:1484:2: ( () otherlv_1= 'PrimaryExprAri' otherlv_2= '{' (otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) ) )? (otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) ) )? otherlv_7= '}' )
            {
            // InternalMyDsl.g:1484:2: ( () otherlv_1= 'PrimaryExprAri' otherlv_2= '{' (otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) ) )? (otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) ) )? otherlv_7= '}' )
            // InternalMyDsl.g:1485:3: () otherlv_1= 'PrimaryExprAri' otherlv_2= '{' (otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) ) )? (otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) ) )? otherlv_7= '}'
            {
            // InternalMyDsl.g:1485:3: ()
            // InternalMyDsl.g:1486:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getPrimaryExprAriAccess().getPrimaryExprAriAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,31,FOLLOW_3); 

            			newLeafNode(otherlv_1, grammarAccess.getPrimaryExprAriAccess().getPrimaryExprAriKeyword_1());
            		
            otherlv_2=(Token)match(input,12,FOLLOW_18); 

            			newLeafNode(otherlv_2, grammarAccess.getPrimaryExprAriAccess().getLeftCurlyBracketKeyword_2());
            		
            // InternalMyDsl.g:1500:3: (otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) ) )?
            int alt16=2;
            int LA16_0 = input.LA(1);

            if ( (LA16_0==32) ) {
                alt16=1;
            }
            switch (alt16) {
                case 1 :
                    // InternalMyDsl.g:1501:4: otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) )
                    {
                    otherlv_3=(Token)match(input,32,FOLLOW_11); 

                    				newLeafNode(otherlv_3, grammarAccess.getPrimaryExprAriAccess().getTypeKeyword_3_0());
                    			
                    // InternalMyDsl.g:1505:4: ( (lv_type_4_0= ruleTypeClass ) )
                    // InternalMyDsl.g:1506:5: (lv_type_4_0= ruleTypeClass )
                    {
                    // InternalMyDsl.g:1506:5: (lv_type_4_0= ruleTypeClass )
                    // InternalMyDsl.g:1507:6: lv_type_4_0= ruleTypeClass
                    {

                    						newCompositeNode(grammarAccess.getPrimaryExprAriAccess().getTypeTypeClassParserRuleCall_3_1_0());
                    					
                    pushFollow(FOLLOW_19);
                    lv_type_4_0=ruleTypeClass();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getPrimaryExprAriRule());
                    						}
                    						set(
                    							current,
                    							"type",
                    							lv_type_4_0,
                    							"org.xtext.example.mydsl2.MyDsl.TypeClass");
                    						afterParserOrEnumRuleCall();
                    					

                    }


                    }


                    }
                    break;

            }

            // InternalMyDsl.g:1525:3: (otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) ) )?
            int alt17=2;
            int LA17_0 = input.LA(1);

            if ( (LA17_0==33) ) {
                alt17=1;
            }
            switch (alt17) {
                case 1 :
                    // InternalMyDsl.g:1526:4: otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) )
                    {
                    otherlv_5=(Token)match(input,33,FOLLOW_20); 

                    				newLeafNode(otherlv_5, grammarAccess.getPrimaryExprAriAccess().getCallKeyword_4_0());
                    			
                    // InternalMyDsl.g:1530:4: ( (lv_call_6_0= ruleCall ) )
                    // InternalMyDsl.g:1531:5: (lv_call_6_0= ruleCall )
                    {
                    // InternalMyDsl.g:1531:5: (lv_call_6_0= ruleCall )
                    // InternalMyDsl.g:1532:6: lv_call_6_0= ruleCall
                    {

                    						newCompositeNode(grammarAccess.getPrimaryExprAriAccess().getCallCallParserRuleCall_4_1_0());
                    					
                    pushFollow(FOLLOW_7);
                    lv_call_6_0=ruleCall();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getPrimaryExprAriRule());
                    						}
                    						set(
                    							current,
                    							"call",
                    							lv_call_6_0,
                    							"org.xtext.example.mydsl2.MyDsl.Call");
                    						afterParserOrEnumRuleCall();
                    					

                    }


                    }


                    }
                    break;

            }

            otherlv_7=(Token)match(input,15,FOLLOW_2); 

            			newLeafNode(otherlv_7, grammarAccess.getPrimaryExprAriAccess().getRightCurlyBracketKeyword_5());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "rulePrimaryExprAri"


    // $ANTLR start "entryRuleDeclarationVariable"
    // InternalMyDsl.g:1558:1: entryRuleDeclarationVariable returns [EObject current=null] : iv_ruleDeclarationVariable= ruleDeclarationVariable EOF ;
    public final EObject entryRuleDeclarationVariable() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleDeclarationVariable = null;


        try {
            // InternalMyDsl.g:1558:60: (iv_ruleDeclarationVariable= ruleDeclarationVariable EOF )
            // InternalMyDsl.g:1559:2: iv_ruleDeclarationVariable= ruleDeclarationVariable EOF
            {
             newCompositeNode(grammarAccess.getDeclarationVariableRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleDeclarationVariable=ruleDeclarationVariable();

            state._fsp--;

             current =iv_ruleDeclarationVariable; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleDeclarationVariable"


    // $ANTLR start "ruleDeclarationVariable"
    // InternalMyDsl.g:1565:1: ruleDeclarationVariable returns [EObject current=null] : (otherlv_0= 'DeclarationVariable' otherlv_1= '{' (otherlv_2= 'nom' ( (lv_nom_3_0= ruleEString ) ) )? (otherlv_4= 'expressionbase' ( (lv_expressionbase_5_0= ruleExpressionBase ) ) )? otherlv_6= 'type' ( (lv_type_7_0= ruleTypeClass ) ) otherlv_8= '}' ) ;
    public final EObject ruleDeclarationVariable() throws RecognitionException {
        EObject current = null;

        Token otherlv_0=null;
        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_4=null;
        Token otherlv_6=null;
        Token otherlv_8=null;
        AntlrDatatypeRuleToken lv_nom_3_0 = null;

        EObject lv_expressionbase_5_0 = null;

        EObject lv_type_7_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:1571:2: ( (otherlv_0= 'DeclarationVariable' otherlv_1= '{' (otherlv_2= 'nom' ( (lv_nom_3_0= ruleEString ) ) )? (otherlv_4= 'expressionbase' ( (lv_expressionbase_5_0= ruleExpressionBase ) ) )? otherlv_6= 'type' ( (lv_type_7_0= ruleTypeClass ) ) otherlv_8= '}' ) )
            // InternalMyDsl.g:1572:2: (otherlv_0= 'DeclarationVariable' otherlv_1= '{' (otherlv_2= 'nom' ( (lv_nom_3_0= ruleEString ) ) )? (otherlv_4= 'expressionbase' ( (lv_expressionbase_5_0= ruleExpressionBase ) ) )? otherlv_6= 'type' ( (lv_type_7_0= ruleTypeClass ) ) otherlv_8= '}' )
            {
            // InternalMyDsl.g:1572:2: (otherlv_0= 'DeclarationVariable' otherlv_1= '{' (otherlv_2= 'nom' ( (lv_nom_3_0= ruleEString ) ) )? (otherlv_4= 'expressionbase' ( (lv_expressionbase_5_0= ruleExpressionBase ) ) )? otherlv_6= 'type' ( (lv_type_7_0= ruleTypeClass ) ) otherlv_8= '}' )
            // InternalMyDsl.g:1573:3: otherlv_0= 'DeclarationVariable' otherlv_1= '{' (otherlv_2= 'nom' ( (lv_nom_3_0= ruleEString ) ) )? (otherlv_4= 'expressionbase' ( (lv_expressionbase_5_0= ruleExpressionBase ) ) )? otherlv_6= 'type' ( (lv_type_7_0= ruleTypeClass ) ) otherlv_8= '}'
            {
            otherlv_0=(Token)match(input,34,FOLLOW_3); 

            			newLeafNode(otherlv_0, grammarAccess.getDeclarationVariableAccess().getDeclarationVariableKeyword_0());
            		
            otherlv_1=(Token)match(input,12,FOLLOW_21); 

            			newLeafNode(otherlv_1, grammarAccess.getDeclarationVariableAccess().getLeftCurlyBracketKeyword_1());
            		
            // InternalMyDsl.g:1581:3: (otherlv_2= 'nom' ( (lv_nom_3_0= ruleEString ) ) )?
            int alt18=2;
            int LA18_0 = input.LA(1);

            if ( (LA18_0==35) ) {
                alt18=1;
            }
            switch (alt18) {
                case 1 :
                    // InternalMyDsl.g:1582:4: otherlv_2= 'nom' ( (lv_nom_3_0= ruleEString ) )
                    {
                    otherlv_2=(Token)match(input,35,FOLLOW_22); 

                    				newLeafNode(otherlv_2, grammarAccess.getDeclarationVariableAccess().getNomKeyword_2_0());
                    			
                    // InternalMyDsl.g:1586:4: ( (lv_nom_3_0= ruleEString ) )
                    // InternalMyDsl.g:1587:5: (lv_nom_3_0= ruleEString )
                    {
                    // InternalMyDsl.g:1587:5: (lv_nom_3_0= ruleEString )
                    // InternalMyDsl.g:1588:6: lv_nom_3_0= ruleEString
                    {

                    						newCompositeNode(grammarAccess.getDeclarationVariableAccess().getNomEStringParserRuleCall_2_1_0());
                    					
                    pushFollow(FOLLOW_23);
                    lv_nom_3_0=ruleEString();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getDeclarationVariableRule());
                    						}
                    						set(
                    							current,
                    							"nom",
                    							lv_nom_3_0,
                    							"org.xtext.example.mydsl2.MyDsl.EString");
                    						afterParserOrEnumRuleCall();
                    					

                    }


                    }


                    }
                    break;

            }

            // InternalMyDsl.g:1606:3: (otherlv_4= 'expressionbase' ( (lv_expressionbase_5_0= ruleExpressionBase ) ) )?
            int alt19=2;
            int LA19_0 = input.LA(1);

            if ( (LA19_0==36) ) {
                alt19=1;
            }
            switch (alt19) {
                case 1 :
                    // InternalMyDsl.g:1607:4: otherlv_4= 'expressionbase' ( (lv_expressionbase_5_0= ruleExpressionBase ) )
                    {
                    otherlv_4=(Token)match(input,36,FOLLOW_9); 

                    				newLeafNode(otherlv_4, grammarAccess.getDeclarationVariableAccess().getExpressionbaseKeyword_3_0());
                    			
                    // InternalMyDsl.g:1611:4: ( (lv_expressionbase_5_0= ruleExpressionBase ) )
                    // InternalMyDsl.g:1612:5: (lv_expressionbase_5_0= ruleExpressionBase )
                    {
                    // InternalMyDsl.g:1612:5: (lv_expressionbase_5_0= ruleExpressionBase )
                    // InternalMyDsl.g:1613:6: lv_expressionbase_5_0= ruleExpressionBase
                    {

                    						newCompositeNode(grammarAccess.getDeclarationVariableAccess().getExpressionbaseExpressionBaseParserRuleCall_3_1_0());
                    					
                    pushFollow(FOLLOW_24);
                    lv_expressionbase_5_0=ruleExpressionBase();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getDeclarationVariableRule());
                    						}
                    						set(
                    							current,
                    							"expressionbase",
                    							lv_expressionbase_5_0,
                    							"org.xtext.example.mydsl2.MyDsl.ExpressionBase");
                    						afterParserOrEnumRuleCall();
                    					

                    }


                    }


                    }
                    break;

            }

            otherlv_6=(Token)match(input,32,FOLLOW_11); 

            			newLeafNode(otherlv_6, grammarAccess.getDeclarationVariableAccess().getTypeKeyword_4());
            		
            // InternalMyDsl.g:1635:3: ( (lv_type_7_0= ruleTypeClass ) )
            // InternalMyDsl.g:1636:4: (lv_type_7_0= ruleTypeClass )
            {
            // InternalMyDsl.g:1636:4: (lv_type_7_0= ruleTypeClass )
            // InternalMyDsl.g:1637:5: lv_type_7_0= ruleTypeClass
            {

            					newCompositeNode(grammarAccess.getDeclarationVariableAccess().getTypeTypeClassParserRuleCall_5_0());
            				
            pushFollow(FOLLOW_7);
            lv_type_7_0=ruleTypeClass();

            state._fsp--;


            					if (current==null) {
            						current = createModelElementForParent(grammarAccess.getDeclarationVariableRule());
            					}
            					set(
            						current,
            						"type",
            						lv_type_7_0,
            						"org.xtext.example.mydsl2.MyDsl.TypeClass");
            					afterParserOrEnumRuleCall();
            				

            }


            }

            otherlv_8=(Token)match(input,15,FOLLOW_2); 

            			newLeafNode(otherlv_8, grammarAccess.getDeclarationVariableAccess().getRightCurlyBracketKeyword_6());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleDeclarationVariable"


    // $ANTLR start "entryRuleLOOP"
    // InternalMyDsl.g:1662:1: entryRuleLOOP returns [EObject current=null] : iv_ruleLOOP= ruleLOOP EOF ;
    public final EObject entryRuleLOOP() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleLOOP = null;


        try {
            // InternalMyDsl.g:1662:45: (iv_ruleLOOP= ruleLOOP EOF )
            // InternalMyDsl.g:1663:2: iv_ruleLOOP= ruleLOOP EOF
            {
             newCompositeNode(grammarAccess.getLOOPRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleLOOP=ruleLOOP();

            state._fsp--;

             current =iv_ruleLOOP; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleLOOP"


    // $ANTLR start "ruleLOOP"
    // InternalMyDsl.g:1669:1: ruleLOOP returns [EObject current=null] : (otherlv_0= 'LOOP' otherlv_1= '{' (otherlv_2= 'instruction' otherlv_3= '{' ( (lv_instruction_4_0= ruleInstruction ) ) (otherlv_5= ',' ( (lv_instruction_6_0= ruleInstruction ) ) )* otherlv_7= '}' )? otherlv_8= 'expression' ( (lv_expression_9_0= ruleExpression ) ) otherlv_10= '}' ) ;
    public final EObject ruleLOOP() throws RecognitionException {
        EObject current = null;

        Token otherlv_0=null;
        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_5=null;
        Token otherlv_7=null;
        Token otherlv_8=null;
        Token otherlv_10=null;
        EObject lv_instruction_4_0 = null;

        EObject lv_instruction_6_0 = null;

        EObject lv_expression_9_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:1675:2: ( (otherlv_0= 'LOOP' otherlv_1= '{' (otherlv_2= 'instruction' otherlv_3= '{' ( (lv_instruction_4_0= ruleInstruction ) ) (otherlv_5= ',' ( (lv_instruction_6_0= ruleInstruction ) ) )* otherlv_7= '}' )? otherlv_8= 'expression' ( (lv_expression_9_0= ruleExpression ) ) otherlv_10= '}' ) )
            // InternalMyDsl.g:1676:2: (otherlv_0= 'LOOP' otherlv_1= '{' (otherlv_2= 'instruction' otherlv_3= '{' ( (lv_instruction_4_0= ruleInstruction ) ) (otherlv_5= ',' ( (lv_instruction_6_0= ruleInstruction ) ) )* otherlv_7= '}' )? otherlv_8= 'expression' ( (lv_expression_9_0= ruleExpression ) ) otherlv_10= '}' )
            {
            // InternalMyDsl.g:1676:2: (otherlv_0= 'LOOP' otherlv_1= '{' (otherlv_2= 'instruction' otherlv_3= '{' ( (lv_instruction_4_0= ruleInstruction ) ) (otherlv_5= ',' ( (lv_instruction_6_0= ruleInstruction ) ) )* otherlv_7= '}' )? otherlv_8= 'expression' ( (lv_expression_9_0= ruleExpression ) ) otherlv_10= '}' )
            // InternalMyDsl.g:1677:3: otherlv_0= 'LOOP' otherlv_1= '{' (otherlv_2= 'instruction' otherlv_3= '{' ( (lv_instruction_4_0= ruleInstruction ) ) (otherlv_5= ',' ( (lv_instruction_6_0= ruleInstruction ) ) )* otherlv_7= '}' )? otherlv_8= 'expression' ( (lv_expression_9_0= ruleExpression ) ) otherlv_10= '}'
            {
            otherlv_0=(Token)match(input,37,FOLLOW_3); 

            			newLeafNode(otherlv_0, grammarAccess.getLOOPAccess().getLOOPKeyword_0());
            		
            otherlv_1=(Token)match(input,12,FOLLOW_25); 

            			newLeafNode(otherlv_1, grammarAccess.getLOOPAccess().getLeftCurlyBracketKeyword_1());
            		
            // InternalMyDsl.g:1685:3: (otherlv_2= 'instruction' otherlv_3= '{' ( (lv_instruction_4_0= ruleInstruction ) ) (otherlv_5= ',' ( (lv_instruction_6_0= ruleInstruction ) ) )* otherlv_7= '}' )?
            int alt21=2;
            int LA21_0 = input.LA(1);

            if ( (LA21_0==17) ) {
                alt21=1;
            }
            switch (alt21) {
                case 1 :
                    // InternalMyDsl.g:1686:4: otherlv_2= 'instruction' otherlv_3= '{' ( (lv_instruction_4_0= ruleInstruction ) ) (otherlv_5= ',' ( (lv_instruction_6_0= ruleInstruction ) ) )* otherlv_7= '}'
                    {
                    otherlv_2=(Token)match(input,17,FOLLOW_3); 

                    				newLeafNode(otherlv_2, grammarAccess.getLOOPAccess().getInstructionKeyword_2_0());
                    			
                    otherlv_3=(Token)match(input,12,FOLLOW_9); 

                    				newLeafNode(otherlv_3, grammarAccess.getLOOPAccess().getLeftCurlyBracketKeyword_2_1());
                    			
                    // InternalMyDsl.g:1694:4: ( (lv_instruction_4_0= ruleInstruction ) )
                    // InternalMyDsl.g:1695:5: (lv_instruction_4_0= ruleInstruction )
                    {
                    // InternalMyDsl.g:1695:5: (lv_instruction_4_0= ruleInstruction )
                    // InternalMyDsl.g:1696:6: lv_instruction_4_0= ruleInstruction
                    {

                    						newCompositeNode(grammarAccess.getLOOPAccess().getInstructionInstructionParserRuleCall_2_2_0());
                    					
                    pushFollow(FOLLOW_6);
                    lv_instruction_4_0=ruleInstruction();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getLOOPRule());
                    						}
                    						add(
                    							current,
                    							"instruction",
                    							lv_instruction_4_0,
                    							"org.xtext.example.mydsl2.MyDsl.Instruction");
                    						afterParserOrEnumRuleCall();
                    					

                    }


                    }

                    // InternalMyDsl.g:1713:4: (otherlv_5= ',' ( (lv_instruction_6_0= ruleInstruction ) ) )*
                    loop20:
                    do {
                        int alt20=2;
                        int LA20_0 = input.LA(1);

                        if ( (LA20_0==14) ) {
                            alt20=1;
                        }


                        switch (alt20) {
                    	case 1 :
                    	    // InternalMyDsl.g:1714:5: otherlv_5= ',' ( (lv_instruction_6_0= ruleInstruction ) )
                    	    {
                    	    otherlv_5=(Token)match(input,14,FOLLOW_9); 

                    	    					newLeafNode(otherlv_5, grammarAccess.getLOOPAccess().getCommaKeyword_2_3_0());
                    	    				
                    	    // InternalMyDsl.g:1718:5: ( (lv_instruction_6_0= ruleInstruction ) )
                    	    // InternalMyDsl.g:1719:6: (lv_instruction_6_0= ruleInstruction )
                    	    {
                    	    // InternalMyDsl.g:1719:6: (lv_instruction_6_0= ruleInstruction )
                    	    // InternalMyDsl.g:1720:7: lv_instruction_6_0= ruleInstruction
                    	    {

                    	    							newCompositeNode(grammarAccess.getLOOPAccess().getInstructionInstructionParserRuleCall_2_3_1_0());
                    	    						
                    	    pushFollow(FOLLOW_6);
                    	    lv_instruction_6_0=ruleInstruction();

                    	    state._fsp--;


                    	    							if (current==null) {
                    	    								current = createModelElementForParent(grammarAccess.getLOOPRule());
                    	    							}
                    	    							add(
                    	    								current,
                    	    								"instruction",
                    	    								lv_instruction_6_0,
                    	    								"org.xtext.example.mydsl2.MyDsl.Instruction");
                    	    							afterParserOrEnumRuleCall();
                    	    						

                    	    }


                    	    }


                    	    }
                    	    break;

                    	default :
                    	    break loop20;
                        }
                    } while (true);

                    otherlv_7=(Token)match(input,15,FOLLOW_26); 

                    				newLeafNode(otherlv_7, grammarAccess.getLOOPAccess().getRightCurlyBracketKeyword_2_4());
                    			

                    }
                    break;

            }

            otherlv_8=(Token)match(input,38,FOLLOW_9); 

            			newLeafNode(otherlv_8, grammarAccess.getLOOPAccess().getExpressionKeyword_3());
            		
            // InternalMyDsl.g:1747:3: ( (lv_expression_9_0= ruleExpression ) )
            // InternalMyDsl.g:1748:4: (lv_expression_9_0= ruleExpression )
            {
            // InternalMyDsl.g:1748:4: (lv_expression_9_0= ruleExpression )
            // InternalMyDsl.g:1749:5: lv_expression_9_0= ruleExpression
            {

            					newCompositeNode(grammarAccess.getLOOPAccess().getExpressionExpressionParserRuleCall_4_0());
            				
            pushFollow(FOLLOW_7);
            lv_expression_9_0=ruleExpression();

            state._fsp--;


            					if (current==null) {
            						current = createModelElementForParent(grammarAccess.getLOOPRule());
            					}
            					set(
            						current,
            						"expression",
            						lv_expression_9_0,
            						"org.xtext.example.mydsl2.MyDsl.Expression");
            					afterParserOrEnumRuleCall();
            				

            }


            }

            otherlv_10=(Token)match(input,15,FOLLOW_2); 

            			newLeafNode(otherlv_10, grammarAccess.getLOOPAccess().getRightCurlyBracketKeyword_5());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleLOOP"


    // $ANTLR start "entryRuleIF"
    // InternalMyDsl.g:1774:1: entryRuleIF returns [EObject current=null] : iv_ruleIF= ruleIF EOF ;
    public final EObject entryRuleIF() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleIF = null;


        try {
            // InternalMyDsl.g:1774:43: (iv_ruleIF= ruleIF EOF )
            // InternalMyDsl.g:1775:2: iv_ruleIF= ruleIF EOF
            {
             newCompositeNode(grammarAccess.getIFRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleIF=ruleIF();

            state._fsp--;

             current =iv_ruleIF; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleIF"


    // $ANTLR start "ruleIF"
    // InternalMyDsl.g:1781:1: ruleIF returns [EObject current=null] : (otherlv_0= 'IF' otherlv_1= '{' (otherlv_2= 'instruction' otherlv_3= '{' ( (lv_instruction_4_0= ruleInstruction ) ) (otherlv_5= ',' ( (lv_instruction_6_0= ruleInstruction ) ) )* otherlv_7= '}' )? otherlv_8= 'expression' ( (lv_expression_9_0= ruleExpression ) ) otherlv_10= '}' ) ;
    public final EObject ruleIF() throws RecognitionException {
        EObject current = null;

        Token otherlv_0=null;
        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_5=null;
        Token otherlv_7=null;
        Token otherlv_8=null;
        Token otherlv_10=null;
        EObject lv_instruction_4_0 = null;

        EObject lv_instruction_6_0 = null;

        EObject lv_expression_9_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:1787:2: ( (otherlv_0= 'IF' otherlv_1= '{' (otherlv_2= 'instruction' otherlv_3= '{' ( (lv_instruction_4_0= ruleInstruction ) ) (otherlv_5= ',' ( (lv_instruction_6_0= ruleInstruction ) ) )* otherlv_7= '}' )? otherlv_8= 'expression' ( (lv_expression_9_0= ruleExpression ) ) otherlv_10= '}' ) )
            // InternalMyDsl.g:1788:2: (otherlv_0= 'IF' otherlv_1= '{' (otherlv_2= 'instruction' otherlv_3= '{' ( (lv_instruction_4_0= ruleInstruction ) ) (otherlv_5= ',' ( (lv_instruction_6_0= ruleInstruction ) ) )* otherlv_7= '}' )? otherlv_8= 'expression' ( (lv_expression_9_0= ruleExpression ) ) otherlv_10= '}' )
            {
            // InternalMyDsl.g:1788:2: (otherlv_0= 'IF' otherlv_1= '{' (otherlv_2= 'instruction' otherlv_3= '{' ( (lv_instruction_4_0= ruleInstruction ) ) (otherlv_5= ',' ( (lv_instruction_6_0= ruleInstruction ) ) )* otherlv_7= '}' )? otherlv_8= 'expression' ( (lv_expression_9_0= ruleExpression ) ) otherlv_10= '}' )
            // InternalMyDsl.g:1789:3: otherlv_0= 'IF' otherlv_1= '{' (otherlv_2= 'instruction' otherlv_3= '{' ( (lv_instruction_4_0= ruleInstruction ) ) (otherlv_5= ',' ( (lv_instruction_6_0= ruleInstruction ) ) )* otherlv_7= '}' )? otherlv_8= 'expression' ( (lv_expression_9_0= ruleExpression ) ) otherlv_10= '}'
            {
            otherlv_0=(Token)match(input,39,FOLLOW_3); 

            			newLeafNode(otherlv_0, grammarAccess.getIFAccess().getIFKeyword_0());
            		
            otherlv_1=(Token)match(input,12,FOLLOW_25); 

            			newLeafNode(otherlv_1, grammarAccess.getIFAccess().getLeftCurlyBracketKeyword_1());
            		
            // InternalMyDsl.g:1797:3: (otherlv_2= 'instruction' otherlv_3= '{' ( (lv_instruction_4_0= ruleInstruction ) ) (otherlv_5= ',' ( (lv_instruction_6_0= ruleInstruction ) ) )* otherlv_7= '}' )?
            int alt23=2;
            int LA23_0 = input.LA(1);

            if ( (LA23_0==17) ) {
                alt23=1;
            }
            switch (alt23) {
                case 1 :
                    // InternalMyDsl.g:1798:4: otherlv_2= 'instruction' otherlv_3= '{' ( (lv_instruction_4_0= ruleInstruction ) ) (otherlv_5= ',' ( (lv_instruction_6_0= ruleInstruction ) ) )* otherlv_7= '}'
                    {
                    otherlv_2=(Token)match(input,17,FOLLOW_3); 

                    				newLeafNode(otherlv_2, grammarAccess.getIFAccess().getInstructionKeyword_2_0());
                    			
                    otherlv_3=(Token)match(input,12,FOLLOW_9); 

                    				newLeafNode(otherlv_3, grammarAccess.getIFAccess().getLeftCurlyBracketKeyword_2_1());
                    			
                    // InternalMyDsl.g:1806:4: ( (lv_instruction_4_0= ruleInstruction ) )
                    // InternalMyDsl.g:1807:5: (lv_instruction_4_0= ruleInstruction )
                    {
                    // InternalMyDsl.g:1807:5: (lv_instruction_4_0= ruleInstruction )
                    // InternalMyDsl.g:1808:6: lv_instruction_4_0= ruleInstruction
                    {

                    						newCompositeNode(grammarAccess.getIFAccess().getInstructionInstructionParserRuleCall_2_2_0());
                    					
                    pushFollow(FOLLOW_6);
                    lv_instruction_4_0=ruleInstruction();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getIFRule());
                    						}
                    						add(
                    							current,
                    							"instruction",
                    							lv_instruction_4_0,
                    							"org.xtext.example.mydsl2.MyDsl.Instruction");
                    						afterParserOrEnumRuleCall();
                    					

                    }


                    }

                    // InternalMyDsl.g:1825:4: (otherlv_5= ',' ( (lv_instruction_6_0= ruleInstruction ) ) )*
                    loop22:
                    do {
                        int alt22=2;
                        int LA22_0 = input.LA(1);

                        if ( (LA22_0==14) ) {
                            alt22=1;
                        }


                        switch (alt22) {
                    	case 1 :
                    	    // InternalMyDsl.g:1826:5: otherlv_5= ',' ( (lv_instruction_6_0= ruleInstruction ) )
                    	    {
                    	    otherlv_5=(Token)match(input,14,FOLLOW_9); 

                    	    					newLeafNode(otherlv_5, grammarAccess.getIFAccess().getCommaKeyword_2_3_0());
                    	    				
                    	    // InternalMyDsl.g:1830:5: ( (lv_instruction_6_0= ruleInstruction ) )
                    	    // InternalMyDsl.g:1831:6: (lv_instruction_6_0= ruleInstruction )
                    	    {
                    	    // InternalMyDsl.g:1831:6: (lv_instruction_6_0= ruleInstruction )
                    	    // InternalMyDsl.g:1832:7: lv_instruction_6_0= ruleInstruction
                    	    {

                    	    							newCompositeNode(grammarAccess.getIFAccess().getInstructionInstructionParserRuleCall_2_3_1_0());
                    	    						
                    	    pushFollow(FOLLOW_6);
                    	    lv_instruction_6_0=ruleInstruction();

                    	    state._fsp--;


                    	    							if (current==null) {
                    	    								current = createModelElementForParent(grammarAccess.getIFRule());
                    	    							}
                    	    							add(
                    	    								current,
                    	    								"instruction",
                    	    								lv_instruction_6_0,
                    	    								"org.xtext.example.mydsl2.MyDsl.Instruction");
                    	    							afterParserOrEnumRuleCall();
                    	    						

                    	    }


                    	    }


                    	    }
                    	    break;

                    	default :
                    	    break loop22;
                        }
                    } while (true);

                    otherlv_7=(Token)match(input,15,FOLLOW_26); 

                    				newLeafNode(otherlv_7, grammarAccess.getIFAccess().getRightCurlyBracketKeyword_2_4());
                    			

                    }
                    break;

            }

            otherlv_8=(Token)match(input,38,FOLLOW_9); 

            			newLeafNode(otherlv_8, grammarAccess.getIFAccess().getExpressionKeyword_3());
            		
            // InternalMyDsl.g:1859:3: ( (lv_expression_9_0= ruleExpression ) )
            // InternalMyDsl.g:1860:4: (lv_expression_9_0= ruleExpression )
            {
            // InternalMyDsl.g:1860:4: (lv_expression_9_0= ruleExpression )
            // InternalMyDsl.g:1861:5: lv_expression_9_0= ruleExpression
            {

            					newCompositeNode(grammarAccess.getIFAccess().getExpressionExpressionParserRuleCall_4_0());
            				
            pushFollow(FOLLOW_7);
            lv_expression_9_0=ruleExpression();

            state._fsp--;


            					if (current==null) {
            						current = createModelElementForParent(grammarAccess.getIFRule());
            					}
            					set(
            						current,
            						"expression",
            						lv_expression_9_0,
            						"org.xtext.example.mydsl2.MyDsl.Expression");
            					afterParserOrEnumRuleCall();
            				

            }


            }

            otherlv_10=(Token)match(input,15,FOLLOW_2); 

            			newLeafNode(otherlv_10, grammarAccess.getIFAccess().getRightCurlyBracketKeyword_5());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleIF"


    // $ANTLR start "entryRuleCallVariable"
    // InternalMyDsl.g:1886:1: entryRuleCallVariable returns [EObject current=null] : iv_ruleCallVariable= ruleCallVariable EOF ;
    public final EObject entryRuleCallVariable() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleCallVariable = null;


        try {
            // InternalMyDsl.g:1886:53: (iv_ruleCallVariable= ruleCallVariable EOF )
            // InternalMyDsl.g:1887:2: iv_ruleCallVariable= ruleCallVariable EOF
            {
             newCompositeNode(grammarAccess.getCallVariableRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleCallVariable=ruleCallVariable();

            state._fsp--;

             current =iv_ruleCallVariable; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleCallVariable"


    // $ANTLR start "ruleCallVariable"
    // InternalMyDsl.g:1893:1: ruleCallVariable returns [EObject current=null] : ( () otherlv_1= 'CallVariable' ) ;
    public final EObject ruleCallVariable() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;


        	enterRule();

        try {
            // InternalMyDsl.g:1899:2: ( ( () otherlv_1= 'CallVariable' ) )
            // InternalMyDsl.g:1900:2: ( () otherlv_1= 'CallVariable' )
            {
            // InternalMyDsl.g:1900:2: ( () otherlv_1= 'CallVariable' )
            // InternalMyDsl.g:1901:3: () otherlv_1= 'CallVariable'
            {
            // InternalMyDsl.g:1901:3: ()
            // InternalMyDsl.g:1902:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getCallVariableAccess().getCallVariableAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,40,FOLLOW_2); 

            			newLeafNode(otherlv_1, grammarAccess.getCallVariableAccess().getCallVariableKeyword_1());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleCallVariable"


    // $ANTLR start "entryRuleCallFunction"
    // InternalMyDsl.g:1916:1: entryRuleCallFunction returns [EObject current=null] : iv_ruleCallFunction= ruleCallFunction EOF ;
    public final EObject entryRuleCallFunction() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleCallFunction = null;


        try {
            // InternalMyDsl.g:1916:53: (iv_ruleCallFunction= ruleCallFunction EOF )
            // InternalMyDsl.g:1917:2: iv_ruleCallFunction= ruleCallFunction EOF
            {
             newCompositeNode(grammarAccess.getCallFunctionRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleCallFunction=ruleCallFunction();

            state._fsp--;

             current =iv_ruleCallFunction; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleCallFunction"


    // $ANTLR start "ruleCallFunction"
    // InternalMyDsl.g:1923:1: ruleCallFunction returns [EObject current=null] : ( () otherlv_1= 'CallFunction' ) ;
    public final EObject ruleCallFunction() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;


        	enterRule();

        try {
            // InternalMyDsl.g:1929:2: ( ( () otherlv_1= 'CallFunction' ) )
            // InternalMyDsl.g:1930:2: ( () otherlv_1= 'CallFunction' )
            {
            // InternalMyDsl.g:1930:2: ( () otherlv_1= 'CallFunction' )
            // InternalMyDsl.g:1931:3: () otherlv_1= 'CallFunction'
            {
            // InternalMyDsl.g:1931:3: ()
            // InternalMyDsl.g:1932:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getCallFunctionAccess().getCallFunctionAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,41,FOLLOW_2); 

            			newLeafNode(otherlv_1, grammarAccess.getCallFunctionAccess().getCallFunctionKeyword_1());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleCallFunction"


    // $ANTLR start "entryRuleAffectation"
    // InternalMyDsl.g:1946:1: entryRuleAffectation returns [EObject current=null] : iv_ruleAffectation= ruleAffectation EOF ;
    public final EObject entryRuleAffectation() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleAffectation = null;


        try {
            // InternalMyDsl.g:1946:52: (iv_ruleAffectation= ruleAffectation EOF )
            // InternalMyDsl.g:1947:2: iv_ruleAffectation= ruleAffectation EOF
            {
             newCompositeNode(grammarAccess.getAffectationRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleAffectation=ruleAffectation();

            state._fsp--;

             current =iv_ruleAffectation; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleAffectation"


    // $ANTLR start "ruleAffectation"
    // InternalMyDsl.g:1953:1: ruleAffectation returns [EObject current=null] : (otherlv_0= 'Affectation' otherlv_1= '{' otherlv_2= 'expressionbase' otherlv_3= '{' ( (lv_expressionbase_4_0= ruleExpressionBase ) ) (otherlv_5= ',' ( (lv_expressionbase_6_0= ruleExpressionBase ) ) )* otherlv_7= '}' (otherlv_8= 'callvariable' ( (lv_callvariable_9_0= ruleCallVariable ) ) )? otherlv_10= '}' ) ;
    public final EObject ruleAffectation() throws RecognitionException {
        EObject current = null;

        Token otherlv_0=null;
        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_5=null;
        Token otherlv_7=null;
        Token otherlv_8=null;
        Token otherlv_10=null;
        EObject lv_expressionbase_4_0 = null;

        EObject lv_expressionbase_6_0 = null;

        EObject lv_callvariable_9_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:1959:2: ( (otherlv_0= 'Affectation' otherlv_1= '{' otherlv_2= 'expressionbase' otherlv_3= '{' ( (lv_expressionbase_4_0= ruleExpressionBase ) ) (otherlv_5= ',' ( (lv_expressionbase_6_0= ruleExpressionBase ) ) )* otherlv_7= '}' (otherlv_8= 'callvariable' ( (lv_callvariable_9_0= ruleCallVariable ) ) )? otherlv_10= '}' ) )
            // InternalMyDsl.g:1960:2: (otherlv_0= 'Affectation' otherlv_1= '{' otherlv_2= 'expressionbase' otherlv_3= '{' ( (lv_expressionbase_4_0= ruleExpressionBase ) ) (otherlv_5= ',' ( (lv_expressionbase_6_0= ruleExpressionBase ) ) )* otherlv_7= '}' (otherlv_8= 'callvariable' ( (lv_callvariable_9_0= ruleCallVariable ) ) )? otherlv_10= '}' )
            {
            // InternalMyDsl.g:1960:2: (otherlv_0= 'Affectation' otherlv_1= '{' otherlv_2= 'expressionbase' otherlv_3= '{' ( (lv_expressionbase_4_0= ruleExpressionBase ) ) (otherlv_5= ',' ( (lv_expressionbase_6_0= ruleExpressionBase ) ) )* otherlv_7= '}' (otherlv_8= 'callvariable' ( (lv_callvariable_9_0= ruleCallVariable ) ) )? otherlv_10= '}' )
            // InternalMyDsl.g:1961:3: otherlv_0= 'Affectation' otherlv_1= '{' otherlv_2= 'expressionbase' otherlv_3= '{' ( (lv_expressionbase_4_0= ruleExpressionBase ) ) (otherlv_5= ',' ( (lv_expressionbase_6_0= ruleExpressionBase ) ) )* otherlv_7= '}' (otherlv_8= 'callvariable' ( (lv_callvariable_9_0= ruleCallVariable ) ) )? otherlv_10= '}'
            {
            otherlv_0=(Token)match(input,42,FOLLOW_3); 

            			newLeafNode(otherlv_0, grammarAccess.getAffectationAccess().getAffectationKeyword_0());
            		
            otherlv_1=(Token)match(input,12,FOLLOW_27); 

            			newLeafNode(otherlv_1, grammarAccess.getAffectationAccess().getLeftCurlyBracketKeyword_1());
            		
            otherlv_2=(Token)match(input,36,FOLLOW_3); 

            			newLeafNode(otherlv_2, grammarAccess.getAffectationAccess().getExpressionbaseKeyword_2());
            		
            otherlv_3=(Token)match(input,12,FOLLOW_9); 

            			newLeafNode(otherlv_3, grammarAccess.getAffectationAccess().getLeftCurlyBracketKeyword_3());
            		
            // InternalMyDsl.g:1977:3: ( (lv_expressionbase_4_0= ruleExpressionBase ) )
            // InternalMyDsl.g:1978:4: (lv_expressionbase_4_0= ruleExpressionBase )
            {
            // InternalMyDsl.g:1978:4: (lv_expressionbase_4_0= ruleExpressionBase )
            // InternalMyDsl.g:1979:5: lv_expressionbase_4_0= ruleExpressionBase
            {

            					newCompositeNode(grammarAccess.getAffectationAccess().getExpressionbaseExpressionBaseParserRuleCall_4_0());
            				
            pushFollow(FOLLOW_6);
            lv_expressionbase_4_0=ruleExpressionBase();

            state._fsp--;


            					if (current==null) {
            						current = createModelElementForParent(grammarAccess.getAffectationRule());
            					}
            					add(
            						current,
            						"expressionbase",
            						lv_expressionbase_4_0,
            						"org.xtext.example.mydsl2.MyDsl.ExpressionBase");
            					afterParserOrEnumRuleCall();
            				

            }


            }

            // InternalMyDsl.g:1996:3: (otherlv_5= ',' ( (lv_expressionbase_6_0= ruleExpressionBase ) ) )*
            loop24:
            do {
                int alt24=2;
                int LA24_0 = input.LA(1);

                if ( (LA24_0==14) ) {
                    alt24=1;
                }


                switch (alt24) {
            	case 1 :
            	    // InternalMyDsl.g:1997:4: otherlv_5= ',' ( (lv_expressionbase_6_0= ruleExpressionBase ) )
            	    {
            	    otherlv_5=(Token)match(input,14,FOLLOW_9); 

            	    				newLeafNode(otherlv_5, grammarAccess.getAffectationAccess().getCommaKeyword_5_0());
            	    			
            	    // InternalMyDsl.g:2001:4: ( (lv_expressionbase_6_0= ruleExpressionBase ) )
            	    // InternalMyDsl.g:2002:5: (lv_expressionbase_6_0= ruleExpressionBase )
            	    {
            	    // InternalMyDsl.g:2002:5: (lv_expressionbase_6_0= ruleExpressionBase )
            	    // InternalMyDsl.g:2003:6: lv_expressionbase_6_0= ruleExpressionBase
            	    {

            	    						newCompositeNode(grammarAccess.getAffectationAccess().getExpressionbaseExpressionBaseParserRuleCall_5_1_0());
            	    					
            	    pushFollow(FOLLOW_6);
            	    lv_expressionbase_6_0=ruleExpressionBase();

            	    state._fsp--;


            	    						if (current==null) {
            	    							current = createModelElementForParent(grammarAccess.getAffectationRule());
            	    						}
            	    						add(
            	    							current,
            	    							"expressionbase",
            	    							lv_expressionbase_6_0,
            	    							"org.xtext.example.mydsl2.MyDsl.ExpressionBase");
            	    						afterParserOrEnumRuleCall();
            	    					

            	    }


            	    }


            	    }
            	    break;

            	default :
            	    break loop24;
                }
            } while (true);

            otherlv_7=(Token)match(input,15,FOLLOW_28); 

            			newLeafNode(otherlv_7, grammarAccess.getAffectationAccess().getRightCurlyBracketKeyword_6());
            		
            // InternalMyDsl.g:2025:3: (otherlv_8= 'callvariable' ( (lv_callvariable_9_0= ruleCallVariable ) ) )?
            int alt25=2;
            int LA25_0 = input.LA(1);

            if ( (LA25_0==43) ) {
                alt25=1;
            }
            switch (alt25) {
                case 1 :
                    // InternalMyDsl.g:2026:4: otherlv_8= 'callvariable' ( (lv_callvariable_9_0= ruleCallVariable ) )
                    {
                    otherlv_8=(Token)match(input,43,FOLLOW_29); 

                    				newLeafNode(otherlv_8, grammarAccess.getAffectationAccess().getCallvariableKeyword_7_0());
                    			
                    // InternalMyDsl.g:2030:4: ( (lv_callvariable_9_0= ruleCallVariable ) )
                    // InternalMyDsl.g:2031:5: (lv_callvariable_9_0= ruleCallVariable )
                    {
                    // InternalMyDsl.g:2031:5: (lv_callvariable_9_0= ruleCallVariable )
                    // InternalMyDsl.g:2032:6: lv_callvariable_9_0= ruleCallVariable
                    {

                    						newCompositeNode(grammarAccess.getAffectationAccess().getCallvariableCallVariableParserRuleCall_7_1_0());
                    					
                    pushFollow(FOLLOW_7);
                    lv_callvariable_9_0=ruleCallVariable();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getAffectationRule());
                    						}
                    						set(
                    							current,
                    							"callvariable",
                    							lv_callvariable_9_0,
                    							"org.xtext.example.mydsl2.MyDsl.CallVariable");
                    						afterParserOrEnumRuleCall();
                    					

                    }


                    }


                    }
                    break;

            }

            otherlv_10=(Token)match(input,15,FOLLOW_2); 

            			newLeafNode(otherlv_10, grammarAccess.getAffectationAccess().getRightCurlyBracketKeyword_8());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleAffectation"


    // $ANTLR start "entryRulePrimaryExprBool"
    // InternalMyDsl.g:2058:1: entryRulePrimaryExprBool returns [EObject current=null] : iv_rulePrimaryExprBool= rulePrimaryExprBool EOF ;
    public final EObject entryRulePrimaryExprBool() throws RecognitionException {
        EObject current = null;

        EObject iv_rulePrimaryExprBool = null;


        try {
            // InternalMyDsl.g:2058:56: (iv_rulePrimaryExprBool= rulePrimaryExprBool EOF )
            // InternalMyDsl.g:2059:2: iv_rulePrimaryExprBool= rulePrimaryExprBool EOF
            {
             newCompositeNode(grammarAccess.getPrimaryExprBoolRule()); 
            pushFollow(FOLLOW_1);
            iv_rulePrimaryExprBool=rulePrimaryExprBool();

            state._fsp--;

             current =iv_rulePrimaryExprBool; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRulePrimaryExprBool"


    // $ANTLR start "rulePrimaryExprBool"
    // InternalMyDsl.g:2065:1: rulePrimaryExprBool returns [EObject current=null] : ( () otherlv_1= 'PrimaryExprBool' otherlv_2= '{' (otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) ) )? (otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) ) )? otherlv_7= '}' ) ;
    public final EObject rulePrimaryExprBool() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_5=null;
        Token otherlv_7=null;
        EObject lv_type_4_0 = null;

        EObject lv_call_6_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:2071:2: ( ( () otherlv_1= 'PrimaryExprBool' otherlv_2= '{' (otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) ) )? (otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) ) )? otherlv_7= '}' ) )
            // InternalMyDsl.g:2072:2: ( () otherlv_1= 'PrimaryExprBool' otherlv_2= '{' (otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) ) )? (otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) ) )? otherlv_7= '}' )
            {
            // InternalMyDsl.g:2072:2: ( () otherlv_1= 'PrimaryExprBool' otherlv_2= '{' (otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) ) )? (otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) ) )? otherlv_7= '}' )
            // InternalMyDsl.g:2073:3: () otherlv_1= 'PrimaryExprBool' otherlv_2= '{' (otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) ) )? (otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) ) )? otherlv_7= '}'
            {
            // InternalMyDsl.g:2073:3: ()
            // InternalMyDsl.g:2074:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getPrimaryExprBoolAccess().getPrimaryExprBoolAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,44,FOLLOW_3); 

            			newLeafNode(otherlv_1, grammarAccess.getPrimaryExprBoolAccess().getPrimaryExprBoolKeyword_1());
            		
            otherlv_2=(Token)match(input,12,FOLLOW_18); 

            			newLeafNode(otherlv_2, grammarAccess.getPrimaryExprBoolAccess().getLeftCurlyBracketKeyword_2());
            		
            // InternalMyDsl.g:2088:3: (otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) ) )?
            int alt26=2;
            int LA26_0 = input.LA(1);

            if ( (LA26_0==32) ) {
                alt26=1;
            }
            switch (alt26) {
                case 1 :
                    // InternalMyDsl.g:2089:4: otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) )
                    {
                    otherlv_3=(Token)match(input,32,FOLLOW_11); 

                    				newLeafNode(otherlv_3, grammarAccess.getPrimaryExprBoolAccess().getTypeKeyword_3_0());
                    			
                    // InternalMyDsl.g:2093:4: ( (lv_type_4_0= ruleTypeClass ) )
                    // InternalMyDsl.g:2094:5: (lv_type_4_0= ruleTypeClass )
                    {
                    // InternalMyDsl.g:2094:5: (lv_type_4_0= ruleTypeClass )
                    // InternalMyDsl.g:2095:6: lv_type_4_0= ruleTypeClass
                    {

                    						newCompositeNode(grammarAccess.getPrimaryExprBoolAccess().getTypeTypeClassParserRuleCall_3_1_0());
                    					
                    pushFollow(FOLLOW_19);
                    lv_type_4_0=ruleTypeClass();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getPrimaryExprBoolRule());
                    						}
                    						set(
                    							current,
                    							"type",
                    							lv_type_4_0,
                    							"org.xtext.example.mydsl2.MyDsl.TypeClass");
                    						afterParserOrEnumRuleCall();
                    					

                    }


                    }


                    }
                    break;

            }

            // InternalMyDsl.g:2113:3: (otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) ) )?
            int alt27=2;
            int LA27_0 = input.LA(1);

            if ( (LA27_0==33) ) {
                alt27=1;
            }
            switch (alt27) {
                case 1 :
                    // InternalMyDsl.g:2114:4: otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) )
                    {
                    otherlv_5=(Token)match(input,33,FOLLOW_20); 

                    				newLeafNode(otherlv_5, grammarAccess.getPrimaryExprBoolAccess().getCallKeyword_4_0());
                    			
                    // InternalMyDsl.g:2118:4: ( (lv_call_6_0= ruleCall ) )
                    // InternalMyDsl.g:2119:5: (lv_call_6_0= ruleCall )
                    {
                    // InternalMyDsl.g:2119:5: (lv_call_6_0= ruleCall )
                    // InternalMyDsl.g:2120:6: lv_call_6_0= ruleCall
                    {

                    						newCompositeNode(grammarAccess.getPrimaryExprBoolAccess().getCallCallParserRuleCall_4_1_0());
                    					
                    pushFollow(FOLLOW_7);
                    lv_call_6_0=ruleCall();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getPrimaryExprBoolRule());
                    						}
                    						set(
                    							current,
                    							"call",
                    							lv_call_6_0,
                    							"org.xtext.example.mydsl2.MyDsl.Call");
                    						afterParserOrEnumRuleCall();
                    					

                    }


                    }


                    }
                    break;

            }

            otherlv_7=(Token)match(input,15,FOLLOW_2); 

            			newLeafNode(otherlv_7, grammarAccess.getPrimaryExprBoolAccess().getRightCurlyBracketKeyword_5());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "rulePrimaryExprBool"


    // $ANTLR start "entryRuleAnd"
    // InternalMyDsl.g:2146:1: entryRuleAnd returns [EObject current=null] : iv_ruleAnd= ruleAnd EOF ;
    public final EObject entryRuleAnd() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleAnd = null;


        try {
            // InternalMyDsl.g:2146:44: (iv_ruleAnd= ruleAnd EOF )
            // InternalMyDsl.g:2147:2: iv_ruleAnd= ruleAnd EOF
            {
             newCompositeNode(grammarAccess.getAndRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleAnd=ruleAnd();

            state._fsp--;

             current =iv_ruleAnd; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleAnd"


    // $ANTLR start "ruleAnd"
    // InternalMyDsl.g:2153:1: ruleAnd returns [EObject current=null] : ( () otherlv_1= 'And' ) ;
    public final EObject ruleAnd() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;


        	enterRule();

        try {
            // InternalMyDsl.g:2159:2: ( ( () otherlv_1= 'And' ) )
            // InternalMyDsl.g:2160:2: ( () otherlv_1= 'And' )
            {
            // InternalMyDsl.g:2160:2: ( () otherlv_1= 'And' )
            // InternalMyDsl.g:2161:3: () otherlv_1= 'And'
            {
            // InternalMyDsl.g:2161:3: ()
            // InternalMyDsl.g:2162:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getAndAccess().getAndAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,45,FOLLOW_2); 

            			newLeafNode(otherlv_1, grammarAccess.getAndAccess().getAndKeyword_1());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleAnd"


    // $ANTLR start "entryRuleOr"
    // InternalMyDsl.g:2176:1: entryRuleOr returns [EObject current=null] : iv_ruleOr= ruleOr EOF ;
    public final EObject entryRuleOr() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleOr = null;


        try {
            // InternalMyDsl.g:2176:43: (iv_ruleOr= ruleOr EOF )
            // InternalMyDsl.g:2177:2: iv_ruleOr= ruleOr EOF
            {
             newCompositeNode(grammarAccess.getOrRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleOr=ruleOr();

            state._fsp--;

             current =iv_ruleOr; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleOr"


    // $ANTLR start "ruleOr"
    // InternalMyDsl.g:2183:1: ruleOr returns [EObject current=null] : ( () otherlv_1= 'Or' ) ;
    public final EObject ruleOr() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;


        	enterRule();

        try {
            // InternalMyDsl.g:2189:2: ( ( () otherlv_1= 'Or' ) )
            // InternalMyDsl.g:2190:2: ( () otherlv_1= 'Or' )
            {
            // InternalMyDsl.g:2190:2: ( () otherlv_1= 'Or' )
            // InternalMyDsl.g:2191:3: () otherlv_1= 'Or'
            {
            // InternalMyDsl.g:2191:3: ()
            // InternalMyDsl.g:2192:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getOrAccess().getOrAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,46,FOLLOW_2); 

            			newLeafNode(otherlv_1, grammarAccess.getOrAccess().getOrKeyword_1());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleOr"


    // $ANTLR start "entryRuleNot"
    // InternalMyDsl.g:2206:1: entryRuleNot returns [EObject current=null] : iv_ruleNot= ruleNot EOF ;
    public final EObject entryRuleNot() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleNot = null;


        try {
            // InternalMyDsl.g:2206:44: (iv_ruleNot= ruleNot EOF )
            // InternalMyDsl.g:2207:2: iv_ruleNot= ruleNot EOF
            {
             newCompositeNode(grammarAccess.getNotRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleNot=ruleNot();

            state._fsp--;

             current =iv_ruleNot; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleNot"


    // $ANTLR start "ruleNot"
    // InternalMyDsl.g:2213:1: ruleNot returns [EObject current=null] : ( () otherlv_1= 'Not' ) ;
    public final EObject ruleNot() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;


        	enterRule();

        try {
            // InternalMyDsl.g:2219:2: ( ( () otherlv_1= 'Not' ) )
            // InternalMyDsl.g:2220:2: ( () otherlv_1= 'Not' )
            {
            // InternalMyDsl.g:2220:2: ( () otherlv_1= 'Not' )
            // InternalMyDsl.g:2221:3: () otherlv_1= 'Not'
            {
            // InternalMyDsl.g:2221:3: ()
            // InternalMyDsl.g:2222:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getNotAccess().getNotAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,47,FOLLOW_2); 

            			newLeafNode(otherlv_1, grammarAccess.getNotAccess().getNotKeyword_1());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleNot"


    // $ANTLR start "entryRuleEquals"
    // InternalMyDsl.g:2236:1: entryRuleEquals returns [EObject current=null] : iv_ruleEquals= ruleEquals EOF ;
    public final EObject entryRuleEquals() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleEquals = null;


        try {
            // InternalMyDsl.g:2236:47: (iv_ruleEquals= ruleEquals EOF )
            // InternalMyDsl.g:2237:2: iv_ruleEquals= ruleEquals EOF
            {
             newCompositeNode(grammarAccess.getEqualsRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleEquals=ruleEquals();

            state._fsp--;

             current =iv_ruleEquals; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleEquals"


    // $ANTLR start "ruleEquals"
    // InternalMyDsl.g:2243:1: ruleEquals returns [EObject current=null] : ( () otherlv_1= 'Equals' ) ;
    public final EObject ruleEquals() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;


        	enterRule();

        try {
            // InternalMyDsl.g:2249:2: ( ( () otherlv_1= 'Equals' ) )
            // InternalMyDsl.g:2250:2: ( () otherlv_1= 'Equals' )
            {
            // InternalMyDsl.g:2250:2: ( () otherlv_1= 'Equals' )
            // InternalMyDsl.g:2251:3: () otherlv_1= 'Equals'
            {
            // InternalMyDsl.g:2251:3: ()
            // InternalMyDsl.g:2252:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getEqualsAccess().getEqualsAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,48,FOLLOW_2); 

            			newLeafNode(otherlv_1, grammarAccess.getEqualsAccess().getEqualsKeyword_1());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleEquals"


    // $ANTLR start "entryRulePlusMinusDistance"
    // InternalMyDsl.g:2266:1: entryRulePlusMinusDistance returns [EObject current=null] : iv_rulePlusMinusDistance= rulePlusMinusDistance EOF ;
    public final EObject entryRulePlusMinusDistance() throws RecognitionException {
        EObject current = null;

        EObject iv_rulePlusMinusDistance = null;


        try {
            // InternalMyDsl.g:2266:58: (iv_rulePlusMinusDistance= rulePlusMinusDistance EOF )
            // InternalMyDsl.g:2267:2: iv_rulePlusMinusDistance= rulePlusMinusDistance EOF
            {
             newCompositeNode(grammarAccess.getPlusMinusDistanceRule()); 
            pushFollow(FOLLOW_1);
            iv_rulePlusMinusDistance=rulePlusMinusDistance();

            state._fsp--;

             current =iv_rulePlusMinusDistance; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRulePlusMinusDistance"


    // $ANTLR start "rulePlusMinusDistance"
    // InternalMyDsl.g:2273:1: rulePlusMinusDistance returns [EObject current=null] : ( () otherlv_1= 'PlusMinusDistance' ) ;
    public final EObject rulePlusMinusDistance() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;


        	enterRule();

        try {
            // InternalMyDsl.g:2279:2: ( ( () otherlv_1= 'PlusMinusDistance' ) )
            // InternalMyDsl.g:2280:2: ( () otherlv_1= 'PlusMinusDistance' )
            {
            // InternalMyDsl.g:2280:2: ( () otherlv_1= 'PlusMinusDistance' )
            // InternalMyDsl.g:2281:3: () otherlv_1= 'PlusMinusDistance'
            {
            // InternalMyDsl.g:2281:3: ()
            // InternalMyDsl.g:2282:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getPlusMinusDistanceAccess().getPlusMinusDistanceAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,49,FOLLOW_2); 

            			newLeafNode(otherlv_1, grammarAccess.getPlusMinusDistanceAccess().getPlusMinusDistanceKeyword_1());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "rulePlusMinusDistance"


    // $ANTLR start "entryRuleMultDivDistance"
    // InternalMyDsl.g:2296:1: entryRuleMultDivDistance returns [EObject current=null] : iv_ruleMultDivDistance= ruleMultDivDistance EOF ;
    public final EObject entryRuleMultDivDistance() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleMultDivDistance = null;


        try {
            // InternalMyDsl.g:2296:56: (iv_ruleMultDivDistance= ruleMultDivDistance EOF )
            // InternalMyDsl.g:2297:2: iv_ruleMultDivDistance= ruleMultDivDistance EOF
            {
             newCompositeNode(grammarAccess.getMultDivDistanceRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleMultDivDistance=ruleMultDivDistance();

            state._fsp--;

             current =iv_ruleMultDivDistance; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleMultDivDistance"


    // $ANTLR start "ruleMultDivDistance"
    // InternalMyDsl.g:2303:1: ruleMultDivDistance returns [EObject current=null] : ( () otherlv_1= 'MultDivDistance' ) ;
    public final EObject ruleMultDivDistance() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;


        	enterRule();

        try {
            // InternalMyDsl.g:2309:2: ( ( () otherlv_1= 'MultDivDistance' ) )
            // InternalMyDsl.g:2310:2: ( () otherlv_1= 'MultDivDistance' )
            {
            // InternalMyDsl.g:2310:2: ( () otherlv_1= 'MultDivDistance' )
            // InternalMyDsl.g:2311:3: () otherlv_1= 'MultDivDistance'
            {
            // InternalMyDsl.g:2311:3: ()
            // InternalMyDsl.g:2312:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getMultDivDistanceAccess().getMultDivDistanceAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,50,FOLLOW_2); 

            			newLeafNode(otherlv_1, grammarAccess.getMultDivDistanceAccess().getMultDivDistanceKeyword_1());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleMultDivDistance"


    // $ANTLR start "entryRulePrimaryExprDistance"
    // InternalMyDsl.g:2326:1: entryRulePrimaryExprDistance returns [EObject current=null] : iv_rulePrimaryExprDistance= rulePrimaryExprDistance EOF ;
    public final EObject entryRulePrimaryExprDistance() throws RecognitionException {
        EObject current = null;

        EObject iv_rulePrimaryExprDistance = null;


        try {
            // InternalMyDsl.g:2326:60: (iv_rulePrimaryExprDistance= rulePrimaryExprDistance EOF )
            // InternalMyDsl.g:2327:2: iv_rulePrimaryExprDistance= rulePrimaryExprDistance EOF
            {
             newCompositeNode(grammarAccess.getPrimaryExprDistanceRule()); 
            pushFollow(FOLLOW_1);
            iv_rulePrimaryExprDistance=rulePrimaryExprDistance();

            state._fsp--;

             current =iv_rulePrimaryExprDistance; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRulePrimaryExprDistance"


    // $ANTLR start "rulePrimaryExprDistance"
    // InternalMyDsl.g:2333:1: rulePrimaryExprDistance returns [EObject current=null] : ( () otherlv_1= 'PrimaryExprDistance' otherlv_2= '{' (otherlv_3= 'distance' ( (lv_distance_4_0= ruleDistance ) ) )? otherlv_5= '}' ) ;
    public final EObject rulePrimaryExprDistance() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_5=null;
        EObject lv_distance_4_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:2339:2: ( ( () otherlv_1= 'PrimaryExprDistance' otherlv_2= '{' (otherlv_3= 'distance' ( (lv_distance_4_0= ruleDistance ) ) )? otherlv_5= '}' ) )
            // InternalMyDsl.g:2340:2: ( () otherlv_1= 'PrimaryExprDistance' otherlv_2= '{' (otherlv_3= 'distance' ( (lv_distance_4_0= ruleDistance ) ) )? otherlv_5= '}' )
            {
            // InternalMyDsl.g:2340:2: ( () otherlv_1= 'PrimaryExprDistance' otherlv_2= '{' (otherlv_3= 'distance' ( (lv_distance_4_0= ruleDistance ) ) )? otherlv_5= '}' )
            // InternalMyDsl.g:2341:3: () otherlv_1= 'PrimaryExprDistance' otherlv_2= '{' (otherlv_3= 'distance' ( (lv_distance_4_0= ruleDistance ) ) )? otherlv_5= '}'
            {
            // InternalMyDsl.g:2341:3: ()
            // InternalMyDsl.g:2342:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getPrimaryExprDistanceAccess().getPrimaryExprDistanceAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,51,FOLLOW_3); 

            			newLeafNode(otherlv_1, grammarAccess.getPrimaryExprDistanceAccess().getPrimaryExprDistanceKeyword_1());
            		
            otherlv_2=(Token)match(input,12,FOLLOW_30); 

            			newLeafNode(otherlv_2, grammarAccess.getPrimaryExprDistanceAccess().getLeftCurlyBracketKeyword_2());
            		
            // InternalMyDsl.g:2356:3: (otherlv_3= 'distance' ( (lv_distance_4_0= ruleDistance ) ) )?
            int alt28=2;
            int LA28_0 = input.LA(1);

            if ( (LA28_0==23) ) {
                alt28=1;
            }
            switch (alt28) {
                case 1 :
                    // InternalMyDsl.g:2357:4: otherlv_3= 'distance' ( (lv_distance_4_0= ruleDistance ) )
                    {
                    otherlv_3=(Token)match(input,23,FOLLOW_16); 

                    				newLeafNode(otherlv_3, grammarAccess.getPrimaryExprDistanceAccess().getDistanceKeyword_3_0());
                    			
                    // InternalMyDsl.g:2361:4: ( (lv_distance_4_0= ruleDistance ) )
                    // InternalMyDsl.g:2362:5: (lv_distance_4_0= ruleDistance )
                    {
                    // InternalMyDsl.g:2362:5: (lv_distance_4_0= ruleDistance )
                    // InternalMyDsl.g:2363:6: lv_distance_4_0= ruleDistance
                    {

                    						newCompositeNode(grammarAccess.getPrimaryExprDistanceAccess().getDistanceDistanceParserRuleCall_3_1_0());
                    					
                    pushFollow(FOLLOW_7);
                    lv_distance_4_0=ruleDistance();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getPrimaryExprDistanceRule());
                    						}
                    						set(
                    							current,
                    							"distance",
                    							lv_distance_4_0,
                    							"org.xtext.example.mydsl2.MyDsl.Distance");
                    						afterParserOrEnumRuleCall();
                    					

                    }


                    }


                    }
                    break;

            }

            otherlv_5=(Token)match(input,15,FOLLOW_2); 

            			newLeafNode(otherlv_5, grammarAccess.getPrimaryExprDistanceAccess().getRightCurlyBracketKeyword_4());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "rulePrimaryExprDistance"


    // $ANTLR start "entryRulePlusMinusTime"
    // InternalMyDsl.g:2389:1: entryRulePlusMinusTime returns [EObject current=null] : iv_rulePlusMinusTime= rulePlusMinusTime EOF ;
    public final EObject entryRulePlusMinusTime() throws RecognitionException {
        EObject current = null;

        EObject iv_rulePlusMinusTime = null;


        try {
            // InternalMyDsl.g:2389:54: (iv_rulePlusMinusTime= rulePlusMinusTime EOF )
            // InternalMyDsl.g:2390:2: iv_rulePlusMinusTime= rulePlusMinusTime EOF
            {
             newCompositeNode(grammarAccess.getPlusMinusTimeRule()); 
            pushFollow(FOLLOW_1);
            iv_rulePlusMinusTime=rulePlusMinusTime();

            state._fsp--;

             current =iv_rulePlusMinusTime; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRulePlusMinusTime"


    // $ANTLR start "rulePlusMinusTime"
    // InternalMyDsl.g:2396:1: rulePlusMinusTime returns [EObject current=null] : ( () otherlv_1= 'PlusMinusTime' ) ;
    public final EObject rulePlusMinusTime() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;


        	enterRule();

        try {
            // InternalMyDsl.g:2402:2: ( ( () otherlv_1= 'PlusMinusTime' ) )
            // InternalMyDsl.g:2403:2: ( () otherlv_1= 'PlusMinusTime' )
            {
            // InternalMyDsl.g:2403:2: ( () otherlv_1= 'PlusMinusTime' )
            // InternalMyDsl.g:2404:3: () otherlv_1= 'PlusMinusTime'
            {
            // InternalMyDsl.g:2404:3: ()
            // InternalMyDsl.g:2405:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getPlusMinusTimeAccess().getPlusMinusTimeAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,52,FOLLOW_2); 

            			newLeafNode(otherlv_1, grammarAccess.getPlusMinusTimeAccess().getPlusMinusTimeKeyword_1());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "rulePlusMinusTime"


    // $ANTLR start "entryRuleMultDiveTime"
    // InternalMyDsl.g:2419:1: entryRuleMultDiveTime returns [EObject current=null] : iv_ruleMultDiveTime= ruleMultDiveTime EOF ;
    public final EObject entryRuleMultDiveTime() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleMultDiveTime = null;


        try {
            // InternalMyDsl.g:2419:53: (iv_ruleMultDiveTime= ruleMultDiveTime EOF )
            // InternalMyDsl.g:2420:2: iv_ruleMultDiveTime= ruleMultDiveTime EOF
            {
             newCompositeNode(grammarAccess.getMultDiveTimeRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleMultDiveTime=ruleMultDiveTime();

            state._fsp--;

             current =iv_ruleMultDiveTime; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleMultDiveTime"


    // $ANTLR start "ruleMultDiveTime"
    // InternalMyDsl.g:2426:1: ruleMultDiveTime returns [EObject current=null] : ( () otherlv_1= 'MultDiveTime' ) ;
    public final EObject ruleMultDiveTime() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;


        	enterRule();

        try {
            // InternalMyDsl.g:2432:2: ( ( () otherlv_1= 'MultDiveTime' ) )
            // InternalMyDsl.g:2433:2: ( () otherlv_1= 'MultDiveTime' )
            {
            // InternalMyDsl.g:2433:2: ( () otherlv_1= 'MultDiveTime' )
            // InternalMyDsl.g:2434:3: () otherlv_1= 'MultDiveTime'
            {
            // InternalMyDsl.g:2434:3: ()
            // InternalMyDsl.g:2435:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getMultDiveTimeAccess().getMultDiveTimeAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,53,FOLLOW_2); 

            			newLeafNode(otherlv_1, grammarAccess.getMultDiveTimeAccess().getMultDiveTimeKeyword_1());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleMultDiveTime"


    // $ANTLR start "entryRulePrimaryExprTime"
    // InternalMyDsl.g:2449:1: entryRulePrimaryExprTime returns [EObject current=null] : iv_rulePrimaryExprTime= rulePrimaryExprTime EOF ;
    public final EObject entryRulePrimaryExprTime() throws RecognitionException {
        EObject current = null;

        EObject iv_rulePrimaryExprTime = null;


        try {
            // InternalMyDsl.g:2449:56: (iv_rulePrimaryExprTime= rulePrimaryExprTime EOF )
            // InternalMyDsl.g:2450:2: iv_rulePrimaryExprTime= rulePrimaryExprTime EOF
            {
             newCompositeNode(grammarAccess.getPrimaryExprTimeRule()); 
            pushFollow(FOLLOW_1);
            iv_rulePrimaryExprTime=rulePrimaryExprTime();

            state._fsp--;

             current =iv_rulePrimaryExprTime; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRulePrimaryExprTime"


    // $ANTLR start "rulePrimaryExprTime"
    // InternalMyDsl.g:2456:1: rulePrimaryExprTime returns [EObject current=null] : ( () otherlv_1= 'PrimaryExprTime' otherlv_2= '{' (otherlv_3= 'time' ( (lv_time_4_0= ruleTime ) ) )? otherlv_5= '}' ) ;
    public final EObject rulePrimaryExprTime() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_5=null;
        EObject lv_time_4_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:2462:2: ( ( () otherlv_1= 'PrimaryExprTime' otherlv_2= '{' (otherlv_3= 'time' ( (lv_time_4_0= ruleTime ) ) )? otherlv_5= '}' ) )
            // InternalMyDsl.g:2463:2: ( () otherlv_1= 'PrimaryExprTime' otherlv_2= '{' (otherlv_3= 'time' ( (lv_time_4_0= ruleTime ) ) )? otherlv_5= '}' )
            {
            // InternalMyDsl.g:2463:2: ( () otherlv_1= 'PrimaryExprTime' otherlv_2= '{' (otherlv_3= 'time' ( (lv_time_4_0= ruleTime ) ) )? otherlv_5= '}' )
            // InternalMyDsl.g:2464:3: () otherlv_1= 'PrimaryExprTime' otherlv_2= '{' (otherlv_3= 'time' ( (lv_time_4_0= ruleTime ) ) )? otherlv_5= '}'
            {
            // InternalMyDsl.g:2464:3: ()
            // InternalMyDsl.g:2465:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getPrimaryExprTimeAccess().getPrimaryExprTimeAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,54,FOLLOW_3); 

            			newLeafNode(otherlv_1, grammarAccess.getPrimaryExprTimeAccess().getPrimaryExprTimeKeyword_1());
            		
            otherlv_2=(Token)match(input,12,FOLLOW_31); 

            			newLeafNode(otherlv_2, grammarAccess.getPrimaryExprTimeAccess().getLeftCurlyBracketKeyword_2());
            		
            // InternalMyDsl.g:2479:3: (otherlv_3= 'time' ( (lv_time_4_0= ruleTime ) ) )?
            int alt29=2;
            int LA29_0 = input.LA(1);

            if ( (LA29_0==55) ) {
                alt29=1;
            }
            switch (alt29) {
                case 1 :
                    // InternalMyDsl.g:2480:4: otherlv_3= 'time' ( (lv_time_4_0= ruleTime ) )
                    {
                    otherlv_3=(Token)match(input,55,FOLLOW_11); 

                    				newLeafNode(otherlv_3, grammarAccess.getPrimaryExprTimeAccess().getTimeKeyword_3_0());
                    			
                    // InternalMyDsl.g:2484:4: ( (lv_time_4_0= ruleTime ) )
                    // InternalMyDsl.g:2485:5: (lv_time_4_0= ruleTime )
                    {
                    // InternalMyDsl.g:2485:5: (lv_time_4_0= ruleTime )
                    // InternalMyDsl.g:2486:6: lv_time_4_0= ruleTime
                    {

                    						newCompositeNode(grammarAccess.getPrimaryExprTimeAccess().getTimeTimeParserRuleCall_3_1_0());
                    					
                    pushFollow(FOLLOW_7);
                    lv_time_4_0=ruleTime();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getPrimaryExprTimeRule());
                    						}
                    						set(
                    							current,
                    							"time",
                    							lv_time_4_0,
                    							"org.xtext.example.mydsl2.MyDsl.Time");
                    						afterParserOrEnumRuleCall();
                    					

                    }


                    }


                    }
                    break;

            }

            otherlv_5=(Token)match(input,15,FOLLOW_2); 

            			newLeafNode(otherlv_5, grammarAccess.getPrimaryExprTimeAccess().getRightCurlyBracketKeyword_4());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "rulePrimaryExprTime"


    // $ANTLR start "entryRuleComparaisonDistance"
    // InternalMyDsl.g:2512:1: entryRuleComparaisonDistance returns [EObject current=null] : iv_ruleComparaisonDistance= ruleComparaisonDistance EOF ;
    public final EObject entryRuleComparaisonDistance() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleComparaisonDistance = null;


        try {
            // InternalMyDsl.g:2512:60: (iv_ruleComparaisonDistance= ruleComparaisonDistance EOF )
            // InternalMyDsl.g:2513:2: iv_ruleComparaisonDistance= ruleComparaisonDistance EOF
            {
             newCompositeNode(grammarAccess.getComparaisonDistanceRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleComparaisonDistance=ruleComparaisonDistance();

            state._fsp--;

             current =iv_ruleComparaisonDistance; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleComparaisonDistance"


    // $ANTLR start "ruleComparaisonDistance"
    // InternalMyDsl.g:2519:1: ruleComparaisonDistance returns [EObject current=null] : ( () otherlv_1= 'ComparaisonDistance' ) ;
    public final EObject ruleComparaisonDistance() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;


        	enterRule();

        try {
            // InternalMyDsl.g:2525:2: ( ( () otherlv_1= 'ComparaisonDistance' ) )
            // InternalMyDsl.g:2526:2: ( () otherlv_1= 'ComparaisonDistance' )
            {
            // InternalMyDsl.g:2526:2: ( () otherlv_1= 'ComparaisonDistance' )
            // InternalMyDsl.g:2527:3: () otherlv_1= 'ComparaisonDistance'
            {
            // InternalMyDsl.g:2527:3: ()
            // InternalMyDsl.g:2528:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getComparaisonDistanceAccess().getComparaisonDistanceAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,56,FOLLOW_2); 

            			newLeafNode(otherlv_1, grammarAccess.getComparaisonDistanceAccess().getComparaisonDistanceKeyword_1());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleComparaisonDistance"


    // $ANTLR start "entryRuleComparaisonTime"
    // InternalMyDsl.g:2542:1: entryRuleComparaisonTime returns [EObject current=null] : iv_ruleComparaisonTime= ruleComparaisonTime EOF ;
    public final EObject entryRuleComparaisonTime() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleComparaisonTime = null;


        try {
            // InternalMyDsl.g:2542:56: (iv_ruleComparaisonTime= ruleComparaisonTime EOF )
            // InternalMyDsl.g:2543:2: iv_ruleComparaisonTime= ruleComparaisonTime EOF
            {
             newCompositeNode(grammarAccess.getComparaisonTimeRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleComparaisonTime=ruleComparaisonTime();

            state._fsp--;

             current =iv_ruleComparaisonTime; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleComparaisonTime"


    // $ANTLR start "ruleComparaisonTime"
    // InternalMyDsl.g:2549:1: ruleComparaisonTime returns [EObject current=null] : ( () otherlv_1= 'ComparaisonTime' ) ;
    public final EObject ruleComparaisonTime() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;


        	enterRule();

        try {
            // InternalMyDsl.g:2555:2: ( ( () otherlv_1= 'ComparaisonTime' ) )
            // InternalMyDsl.g:2556:2: ( () otherlv_1= 'ComparaisonTime' )
            {
            // InternalMyDsl.g:2556:2: ( () otherlv_1= 'ComparaisonTime' )
            // InternalMyDsl.g:2557:3: () otherlv_1= 'ComparaisonTime'
            {
            // InternalMyDsl.g:2557:3: ()
            // InternalMyDsl.g:2558:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getComparaisonTimeAccess().getComparaisonTimeAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,57,FOLLOW_2); 

            			newLeafNode(otherlv_1, grammarAccess.getComparaisonTimeAccess().getComparaisonTimeKeyword_1());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleComparaisonTime"


    // $ANTLR start "entryRuleComparaisonAri"
    // InternalMyDsl.g:2572:1: entryRuleComparaisonAri returns [EObject current=null] : iv_ruleComparaisonAri= ruleComparaisonAri EOF ;
    public final EObject entryRuleComparaisonAri() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleComparaisonAri = null;


        try {
            // InternalMyDsl.g:2572:55: (iv_ruleComparaisonAri= ruleComparaisonAri EOF )
            // InternalMyDsl.g:2573:2: iv_ruleComparaisonAri= ruleComparaisonAri EOF
            {
             newCompositeNode(grammarAccess.getComparaisonAriRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleComparaisonAri=ruleComparaisonAri();

            state._fsp--;

             current =iv_ruleComparaisonAri; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleComparaisonAri"


    // $ANTLR start "ruleComparaisonAri"
    // InternalMyDsl.g:2579:1: ruleComparaisonAri returns [EObject current=null] : ( () otherlv_1= 'ComparaisonAri' ) ;
    public final EObject ruleComparaisonAri() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;


        	enterRule();

        try {
            // InternalMyDsl.g:2585:2: ( ( () otherlv_1= 'ComparaisonAri' ) )
            // InternalMyDsl.g:2586:2: ( () otherlv_1= 'ComparaisonAri' )
            {
            // InternalMyDsl.g:2586:2: ( () otherlv_1= 'ComparaisonAri' )
            // InternalMyDsl.g:2587:3: () otherlv_1= 'ComparaisonAri'
            {
            // InternalMyDsl.g:2587:3: ()
            // InternalMyDsl.g:2588:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getComparaisonAriAccess().getComparaisonAriAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,58,FOLLOW_2); 

            			newLeafNode(otherlv_1, grammarAccess.getComparaisonAriAccess().getComparaisonAriKeyword_1());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleComparaisonAri"


    // $ANTLR start "entryRuleEDouble"
    // InternalMyDsl.g:2602:1: entryRuleEDouble returns [String current=null] : iv_ruleEDouble= ruleEDouble EOF ;
    public final String entryRuleEDouble() throws RecognitionException {
        String current = null;

        AntlrDatatypeRuleToken iv_ruleEDouble = null;


        try {
            // InternalMyDsl.g:2602:47: (iv_ruleEDouble= ruleEDouble EOF )
            // InternalMyDsl.g:2603:2: iv_ruleEDouble= ruleEDouble EOF
            {
             newCompositeNode(grammarAccess.getEDoubleRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleEDouble=ruleEDouble();

            state._fsp--;

             current =iv_ruleEDouble.getText(); 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleEDouble"


    // $ANTLR start "ruleEDouble"
    // InternalMyDsl.g:2609:1: ruleEDouble returns [AntlrDatatypeRuleToken current=new AntlrDatatypeRuleToken()] : ( (kw= '-' )? (this_INT_1= RULE_INT )? kw= '.' this_INT_3= RULE_INT ( (kw= 'E' | kw= 'e' ) (kw= '-' )? this_INT_7= RULE_INT )? ) ;
    public final AntlrDatatypeRuleToken ruleEDouble() throws RecognitionException {
        AntlrDatatypeRuleToken current = new AntlrDatatypeRuleToken();

        Token kw=null;
        Token this_INT_1=null;
        Token this_INT_3=null;
        Token this_INT_7=null;


        	enterRule();

        try {
            // InternalMyDsl.g:2615:2: ( ( (kw= '-' )? (this_INT_1= RULE_INT )? kw= '.' this_INT_3= RULE_INT ( (kw= 'E' | kw= 'e' ) (kw= '-' )? this_INT_7= RULE_INT )? ) )
            // InternalMyDsl.g:2616:2: ( (kw= '-' )? (this_INT_1= RULE_INT )? kw= '.' this_INT_3= RULE_INT ( (kw= 'E' | kw= 'e' ) (kw= '-' )? this_INT_7= RULE_INT )? )
            {
            // InternalMyDsl.g:2616:2: ( (kw= '-' )? (this_INT_1= RULE_INT )? kw= '.' this_INT_3= RULE_INT ( (kw= 'E' | kw= 'e' ) (kw= '-' )? this_INT_7= RULE_INT )? )
            // InternalMyDsl.g:2617:3: (kw= '-' )? (this_INT_1= RULE_INT )? kw= '.' this_INT_3= RULE_INT ( (kw= 'E' | kw= 'e' ) (kw= '-' )? this_INT_7= RULE_INT )?
            {
            // InternalMyDsl.g:2617:3: (kw= '-' )?
            int alt30=2;
            int LA30_0 = input.LA(1);

            if ( (LA30_0==59) ) {
                alt30=1;
            }
            switch (alt30) {
                case 1 :
                    // InternalMyDsl.g:2618:4: kw= '-'
                    {
                    kw=(Token)match(input,59,FOLLOW_32); 

                    				current.merge(kw);
                    				newLeafNode(kw, grammarAccess.getEDoubleAccess().getHyphenMinusKeyword_0());
                    			

                    }
                    break;

            }

            // InternalMyDsl.g:2624:3: (this_INT_1= RULE_INT )?
            int alt31=2;
            int LA31_0 = input.LA(1);

            if ( (LA31_0==RULE_INT) ) {
                alt31=1;
            }
            switch (alt31) {
                case 1 :
                    // InternalMyDsl.g:2625:4: this_INT_1= RULE_INT
                    {
                    this_INT_1=(Token)match(input,RULE_INT,FOLLOW_33); 

                    				current.merge(this_INT_1);
                    			

                    				newLeafNode(this_INT_1, grammarAccess.getEDoubleAccess().getINTTerminalRuleCall_1());
                    			

                    }
                    break;

            }

            kw=(Token)match(input,60,FOLLOW_34); 

            			current.merge(kw);
            			newLeafNode(kw, grammarAccess.getEDoubleAccess().getFullStopKeyword_2());
            		
            this_INT_3=(Token)match(input,RULE_INT,FOLLOW_35); 

            			current.merge(this_INT_3);
            		

            			newLeafNode(this_INT_3, grammarAccess.getEDoubleAccess().getINTTerminalRuleCall_3());
            		
            // InternalMyDsl.g:2645:3: ( (kw= 'E' | kw= 'e' ) (kw= '-' )? this_INT_7= RULE_INT )?
            int alt34=2;
            int LA34_0 = input.LA(1);

            if ( ((LA34_0>=61 && LA34_0<=62)) ) {
                alt34=1;
            }
            switch (alt34) {
                case 1 :
                    // InternalMyDsl.g:2646:4: (kw= 'E' | kw= 'e' ) (kw= '-' )? this_INT_7= RULE_INT
                    {
                    // InternalMyDsl.g:2646:4: (kw= 'E' | kw= 'e' )
                    int alt32=2;
                    int LA32_0 = input.LA(1);

                    if ( (LA32_0==61) ) {
                        alt32=1;
                    }
                    else if ( (LA32_0==62) ) {
                        alt32=2;
                    }
                    else {
                        NoViableAltException nvae =
                            new NoViableAltException("", 32, 0, input);

                        throw nvae;
                    }
                    switch (alt32) {
                        case 1 :
                            // InternalMyDsl.g:2647:5: kw= 'E'
                            {
                            kw=(Token)match(input,61,FOLLOW_36); 

                            					current.merge(kw);
                            					newLeafNode(kw, grammarAccess.getEDoubleAccess().getEKeyword_4_0_0());
                            				

                            }
                            break;
                        case 2 :
                            // InternalMyDsl.g:2653:5: kw= 'e'
                            {
                            kw=(Token)match(input,62,FOLLOW_36); 

                            					current.merge(kw);
                            					newLeafNode(kw, grammarAccess.getEDoubleAccess().getEKeyword_4_0_1());
                            				

                            }
                            break;

                    }

                    // InternalMyDsl.g:2659:4: (kw= '-' )?
                    int alt33=2;
                    int LA33_0 = input.LA(1);

                    if ( (LA33_0==59) ) {
                        alt33=1;
                    }
                    switch (alt33) {
                        case 1 :
                            // InternalMyDsl.g:2660:5: kw= '-'
                            {
                            kw=(Token)match(input,59,FOLLOW_34); 

                            					current.merge(kw);
                            					newLeafNode(kw, grammarAccess.getEDoubleAccess().getHyphenMinusKeyword_4_1());
                            				

                            }
                            break;

                    }

                    this_INT_7=(Token)match(input,RULE_INT,FOLLOW_2); 

                    				current.merge(this_INT_7);
                    			

                    				newLeafNode(this_INT_7, grammarAccess.getEDoubleAccess().getINTTerminalRuleCall_4_2());
                    			

                    }
                    break;

            }


            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleEDouble"


    // $ANTLR start "entryRuleCM"
    // InternalMyDsl.g:2678:1: entryRuleCM returns [EObject current=null] : iv_ruleCM= ruleCM EOF ;
    public final EObject entryRuleCM() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleCM = null;


        try {
            // InternalMyDsl.g:2678:43: (iv_ruleCM= ruleCM EOF )
            // InternalMyDsl.g:2679:2: iv_ruleCM= ruleCM EOF
            {
             newCompositeNode(grammarAccess.getCMRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleCM=ruleCM();

            state._fsp--;

             current =iv_ruleCM; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleCM"


    // $ANTLR start "ruleCM"
    // InternalMyDsl.g:2685:1: ruleCM returns [EObject current=null] : ( () otherlv_1= 'CM' otherlv_2= '{' (otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) ) )? otherlv_5= '}' ) ;
    public final EObject ruleCM() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_5=null;
        AntlrDatatypeRuleToken lv_distance_4_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:2691:2: ( ( () otherlv_1= 'CM' otherlv_2= '{' (otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) ) )? otherlv_5= '}' ) )
            // InternalMyDsl.g:2692:2: ( () otherlv_1= 'CM' otherlv_2= '{' (otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) ) )? otherlv_5= '}' )
            {
            // InternalMyDsl.g:2692:2: ( () otherlv_1= 'CM' otherlv_2= '{' (otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) ) )? otherlv_5= '}' )
            // InternalMyDsl.g:2693:3: () otherlv_1= 'CM' otherlv_2= '{' (otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) ) )? otherlv_5= '}'
            {
            // InternalMyDsl.g:2693:3: ()
            // InternalMyDsl.g:2694:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getCMAccess().getCMAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,63,FOLLOW_3); 

            			newLeafNode(otherlv_1, grammarAccess.getCMAccess().getCMKeyword_1());
            		
            otherlv_2=(Token)match(input,12,FOLLOW_30); 

            			newLeafNode(otherlv_2, grammarAccess.getCMAccess().getLeftCurlyBracketKeyword_2());
            		
            // InternalMyDsl.g:2708:3: (otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) ) )?
            int alt35=2;
            int LA35_0 = input.LA(1);

            if ( (LA35_0==23) ) {
                alt35=1;
            }
            switch (alt35) {
                case 1 :
                    // InternalMyDsl.g:2709:4: otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) )
                    {
                    otherlv_3=(Token)match(input,23,FOLLOW_14); 

                    				newLeafNode(otherlv_3, grammarAccess.getCMAccess().getDistanceKeyword_3_0());
                    			
                    // InternalMyDsl.g:2713:4: ( (lv_distance_4_0= ruleEDouble ) )
                    // InternalMyDsl.g:2714:5: (lv_distance_4_0= ruleEDouble )
                    {
                    // InternalMyDsl.g:2714:5: (lv_distance_4_0= ruleEDouble )
                    // InternalMyDsl.g:2715:6: lv_distance_4_0= ruleEDouble
                    {

                    						newCompositeNode(grammarAccess.getCMAccess().getDistanceEDoubleParserRuleCall_3_1_0());
                    					
                    pushFollow(FOLLOW_7);
                    lv_distance_4_0=ruleEDouble();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getCMRule());
                    						}
                    						set(
                    							current,
                    							"distance",
                    							lv_distance_4_0,
                    							"org.xtext.example.mydsl2.MyDsl.EDouble");
                    						afterParserOrEnumRuleCall();
                    					

                    }


                    }


                    }
                    break;

            }

            otherlv_5=(Token)match(input,15,FOLLOW_2); 

            			newLeafNode(otherlv_5, grammarAccess.getCMAccess().getRightCurlyBracketKeyword_4());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleCM"


    // $ANTLR start "entryRulemm"
    // InternalMyDsl.g:2741:1: entryRulemm returns [EObject current=null] : iv_rulemm= rulemm EOF ;
    public final EObject entryRulemm() throws RecognitionException {
        EObject current = null;

        EObject iv_rulemm = null;


        try {
            // InternalMyDsl.g:2741:43: (iv_rulemm= rulemm EOF )
            // InternalMyDsl.g:2742:2: iv_rulemm= rulemm EOF
            {
             newCompositeNode(grammarAccess.getMmRule()); 
            pushFollow(FOLLOW_1);
            iv_rulemm=rulemm();

            state._fsp--;

             current =iv_rulemm; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRulemm"


    // $ANTLR start "rulemm"
    // InternalMyDsl.g:2748:1: rulemm returns [EObject current=null] : ( () otherlv_1= 'mm' otherlv_2= '{' (otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) ) )? otherlv_5= '}' ) ;
    public final EObject rulemm() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_5=null;
        AntlrDatatypeRuleToken lv_distance_4_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:2754:2: ( ( () otherlv_1= 'mm' otherlv_2= '{' (otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) ) )? otherlv_5= '}' ) )
            // InternalMyDsl.g:2755:2: ( () otherlv_1= 'mm' otherlv_2= '{' (otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) ) )? otherlv_5= '}' )
            {
            // InternalMyDsl.g:2755:2: ( () otherlv_1= 'mm' otherlv_2= '{' (otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) ) )? otherlv_5= '}' )
            // InternalMyDsl.g:2756:3: () otherlv_1= 'mm' otherlv_2= '{' (otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) ) )? otherlv_5= '}'
            {
            // InternalMyDsl.g:2756:3: ()
            // InternalMyDsl.g:2757:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getMmAccess().getMmAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,64,FOLLOW_3); 

            			newLeafNode(otherlv_1, grammarAccess.getMmAccess().getMmKeyword_1());
            		
            otherlv_2=(Token)match(input,12,FOLLOW_30); 

            			newLeafNode(otherlv_2, grammarAccess.getMmAccess().getLeftCurlyBracketKeyword_2());
            		
            // InternalMyDsl.g:2771:3: (otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) ) )?
            int alt36=2;
            int LA36_0 = input.LA(1);

            if ( (LA36_0==23) ) {
                alt36=1;
            }
            switch (alt36) {
                case 1 :
                    // InternalMyDsl.g:2772:4: otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) )
                    {
                    otherlv_3=(Token)match(input,23,FOLLOW_14); 

                    				newLeafNode(otherlv_3, grammarAccess.getMmAccess().getDistanceKeyword_3_0());
                    			
                    // InternalMyDsl.g:2776:4: ( (lv_distance_4_0= ruleEDouble ) )
                    // InternalMyDsl.g:2777:5: (lv_distance_4_0= ruleEDouble )
                    {
                    // InternalMyDsl.g:2777:5: (lv_distance_4_0= ruleEDouble )
                    // InternalMyDsl.g:2778:6: lv_distance_4_0= ruleEDouble
                    {

                    						newCompositeNode(grammarAccess.getMmAccess().getDistanceEDoubleParserRuleCall_3_1_0());
                    					
                    pushFollow(FOLLOW_7);
                    lv_distance_4_0=ruleEDouble();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getMmRule());
                    						}
                    						set(
                    							current,
                    							"distance",
                    							lv_distance_4_0,
                    							"org.xtext.example.mydsl2.MyDsl.EDouble");
                    						afterParserOrEnumRuleCall();
                    					

                    }


                    }


                    }
                    break;

            }

            otherlv_5=(Token)match(input,15,FOLLOW_2); 

            			newLeafNode(otherlv_5, grammarAccess.getMmAccess().getRightCurlyBracketKeyword_4());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "rulemm"


    // $ANTLR start "entryRuleEString"
    // InternalMyDsl.g:2804:1: entryRuleEString returns [String current=null] : iv_ruleEString= ruleEString EOF ;
    public final String entryRuleEString() throws RecognitionException {
        String current = null;

        AntlrDatatypeRuleToken iv_ruleEString = null;


        try {
            // InternalMyDsl.g:2804:47: (iv_ruleEString= ruleEString EOF )
            // InternalMyDsl.g:2805:2: iv_ruleEString= ruleEString EOF
            {
             newCompositeNode(grammarAccess.getEStringRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleEString=ruleEString();

            state._fsp--;

             current =iv_ruleEString.getText(); 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleEString"


    // $ANTLR start "ruleEString"
    // InternalMyDsl.g:2811:1: ruleEString returns [AntlrDatatypeRuleToken current=new AntlrDatatypeRuleToken()] : (this_STRING_0= RULE_STRING | this_ID_1= RULE_ID ) ;
    public final AntlrDatatypeRuleToken ruleEString() throws RecognitionException {
        AntlrDatatypeRuleToken current = new AntlrDatatypeRuleToken();

        Token this_STRING_0=null;
        Token this_ID_1=null;


        	enterRule();

        try {
            // InternalMyDsl.g:2817:2: ( (this_STRING_0= RULE_STRING | this_ID_1= RULE_ID ) )
            // InternalMyDsl.g:2818:2: (this_STRING_0= RULE_STRING | this_ID_1= RULE_ID )
            {
            // InternalMyDsl.g:2818:2: (this_STRING_0= RULE_STRING | this_ID_1= RULE_ID )
            int alt37=2;
            int LA37_0 = input.LA(1);

            if ( (LA37_0==RULE_STRING) ) {
                alt37=1;
            }
            else if ( (LA37_0==RULE_ID) ) {
                alt37=2;
            }
            else {
                NoViableAltException nvae =
                    new NoViableAltException("", 37, 0, input);

                throw nvae;
            }
            switch (alt37) {
                case 1 :
                    // InternalMyDsl.g:2819:3: this_STRING_0= RULE_STRING
                    {
                    this_STRING_0=(Token)match(input,RULE_STRING,FOLLOW_2); 

                    			current.merge(this_STRING_0);
                    		

                    			newLeafNode(this_STRING_0, grammarAccess.getEStringAccess().getSTRINGTerminalRuleCall_0());
                    		

                    }
                    break;
                case 2 :
                    // InternalMyDsl.g:2827:3: this_ID_1= RULE_ID
                    {
                    this_ID_1=(Token)match(input,RULE_ID,FOLLOW_2); 

                    			current.merge(this_ID_1);
                    		

                    			newLeafNode(this_ID_1, grammarAccess.getEStringAccess().getIDTerminalRuleCall_1());
                    		

                    }
                    break;

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleEString"


    // $ANTLR start "entryRuleTime"
    // InternalMyDsl.g:2838:1: entryRuleTime returns [EObject current=null] : iv_ruleTime= ruleTime EOF ;
    public final EObject entryRuleTime() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleTime = null;


        try {
            // InternalMyDsl.g:2838:45: (iv_ruleTime= ruleTime EOF )
            // InternalMyDsl.g:2839:2: iv_ruleTime= ruleTime EOF
            {
             newCompositeNode(grammarAccess.getTimeRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleTime=ruleTime();

            state._fsp--;

             current =iv_ruleTime; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleTime"


    // $ANTLR start "ruleTime"
    // InternalMyDsl.g:2845:1: ruleTime returns [EObject current=null] : ( () otherlv_1= 'Time' otherlv_2= '{' (otherlv_3= 'value' ( (lv_value_4_0= ruleEDouble ) ) )? otherlv_5= '}' ) ;
    public final EObject ruleTime() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_5=null;
        AntlrDatatypeRuleToken lv_value_4_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:2851:2: ( ( () otherlv_1= 'Time' otherlv_2= '{' (otherlv_3= 'value' ( (lv_value_4_0= ruleEDouble ) ) )? otherlv_5= '}' ) )
            // InternalMyDsl.g:2852:2: ( () otherlv_1= 'Time' otherlv_2= '{' (otherlv_3= 'value' ( (lv_value_4_0= ruleEDouble ) ) )? otherlv_5= '}' )
            {
            // InternalMyDsl.g:2852:2: ( () otherlv_1= 'Time' otherlv_2= '{' (otherlv_3= 'value' ( (lv_value_4_0= ruleEDouble ) ) )? otherlv_5= '}' )
            // InternalMyDsl.g:2853:3: () otherlv_1= 'Time' otherlv_2= '{' (otherlv_3= 'value' ( (lv_value_4_0= ruleEDouble ) ) )? otherlv_5= '}'
            {
            // InternalMyDsl.g:2853:3: ()
            // InternalMyDsl.g:2854:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getTimeAccess().getTimeAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,65,FOLLOW_3); 

            			newLeafNode(otherlv_1, grammarAccess.getTimeAccess().getTimeKeyword_1());
            		
            otherlv_2=(Token)match(input,12,FOLLOW_37); 

            			newLeafNode(otherlv_2, grammarAccess.getTimeAccess().getLeftCurlyBracketKeyword_2());
            		
            // InternalMyDsl.g:2868:3: (otherlv_3= 'value' ( (lv_value_4_0= ruleEDouble ) ) )?
            int alt38=2;
            int LA38_0 = input.LA(1);

            if ( (LA38_0==66) ) {
                alt38=1;
            }
            switch (alt38) {
                case 1 :
                    // InternalMyDsl.g:2869:4: otherlv_3= 'value' ( (lv_value_4_0= ruleEDouble ) )
                    {
                    otherlv_3=(Token)match(input,66,FOLLOW_14); 

                    				newLeafNode(otherlv_3, grammarAccess.getTimeAccess().getValueKeyword_3_0());
                    			
                    // InternalMyDsl.g:2873:4: ( (lv_value_4_0= ruleEDouble ) )
                    // InternalMyDsl.g:2874:5: (lv_value_4_0= ruleEDouble )
                    {
                    // InternalMyDsl.g:2874:5: (lv_value_4_0= ruleEDouble )
                    // InternalMyDsl.g:2875:6: lv_value_4_0= ruleEDouble
                    {

                    						newCompositeNode(grammarAccess.getTimeAccess().getValueEDoubleParserRuleCall_3_1_0());
                    					
                    pushFollow(FOLLOW_7);
                    lv_value_4_0=ruleEDouble();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getTimeRule());
                    						}
                    						set(
                    							current,
                    							"value",
                    							lv_value_4_0,
                    							"org.xtext.example.mydsl2.MyDsl.EDouble");
                    						afterParserOrEnumRuleCall();
                    					

                    }


                    }


                    }
                    break;

            }

            otherlv_5=(Token)match(input,15,FOLLOW_2); 

            			newLeafNode(otherlv_5, grammarAccess.getTimeAccess().getRightCurlyBracketKeyword_4());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleTime"


    // $ANTLR start "entryRuleBooleanType"
    // InternalMyDsl.g:2901:1: entryRuleBooleanType returns [EObject current=null] : iv_ruleBooleanType= ruleBooleanType EOF ;
    public final EObject entryRuleBooleanType() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleBooleanType = null;


        try {
            // InternalMyDsl.g:2901:52: (iv_ruleBooleanType= ruleBooleanType EOF )
            // InternalMyDsl.g:2902:2: iv_ruleBooleanType= ruleBooleanType EOF
            {
             newCompositeNode(grammarAccess.getBooleanTypeRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleBooleanType=ruleBooleanType();

            state._fsp--;

             current =iv_ruleBooleanType; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleBooleanType"


    // $ANTLR start "ruleBooleanType"
    // InternalMyDsl.g:2908:1: ruleBooleanType returns [EObject current=null] : ( () ( (lv_value_1_0= 'value' ) )? otherlv_2= 'BooleanType' ) ;
    public final EObject ruleBooleanType() throws RecognitionException {
        EObject current = null;

        Token lv_value_1_0=null;
        Token otherlv_2=null;


        	enterRule();

        try {
            // InternalMyDsl.g:2914:2: ( ( () ( (lv_value_1_0= 'value' ) )? otherlv_2= 'BooleanType' ) )
            // InternalMyDsl.g:2915:2: ( () ( (lv_value_1_0= 'value' ) )? otherlv_2= 'BooleanType' )
            {
            // InternalMyDsl.g:2915:2: ( () ( (lv_value_1_0= 'value' ) )? otherlv_2= 'BooleanType' )
            // InternalMyDsl.g:2916:3: () ( (lv_value_1_0= 'value' ) )? otherlv_2= 'BooleanType'
            {
            // InternalMyDsl.g:2916:3: ()
            // InternalMyDsl.g:2917:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getBooleanTypeAccess().getBooleanTypeAction_0(),
            					current);
            			

            }

            // InternalMyDsl.g:2923:3: ( (lv_value_1_0= 'value' ) )?
            int alt39=2;
            int LA39_0 = input.LA(1);

            if ( (LA39_0==66) ) {
                alt39=1;
            }
            switch (alt39) {
                case 1 :
                    // InternalMyDsl.g:2924:4: (lv_value_1_0= 'value' )
                    {
                    // InternalMyDsl.g:2924:4: (lv_value_1_0= 'value' )
                    // InternalMyDsl.g:2925:5: lv_value_1_0= 'value'
                    {
                    lv_value_1_0=(Token)match(input,66,FOLLOW_38); 

                    					newLeafNode(lv_value_1_0, grammarAccess.getBooleanTypeAccess().getValueValueKeyword_1_0());
                    				

                    					if (current==null) {
                    						current = createModelElement(grammarAccess.getBooleanTypeRule());
                    					}
                    					setWithLastConsumed(current, "value", lv_value_1_0 != null, "value");
                    				

                    }


                    }
                    break;

            }

            otherlv_2=(Token)match(input,67,FOLLOW_2); 

            			newLeafNode(otherlv_2, grammarAccess.getBooleanTypeAccess().getBooleanTypeKeyword_2());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleBooleanType"


    // $ANTLR start "entryRuleNumberType"
    // InternalMyDsl.g:2945:1: entryRuleNumberType returns [EObject current=null] : iv_ruleNumberType= ruleNumberType EOF ;
    public final EObject entryRuleNumberType() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleNumberType = null;


        try {
            // InternalMyDsl.g:2945:51: (iv_ruleNumberType= ruleNumberType EOF )
            // InternalMyDsl.g:2946:2: iv_ruleNumberType= ruleNumberType EOF
            {
             newCompositeNode(grammarAccess.getNumberTypeRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleNumberType=ruleNumberType();

            state._fsp--;

             current =iv_ruleNumberType; 
            match(input,EOF,FOLLOW_2); 

            }

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "entryRuleNumberType"


    // $ANTLR start "ruleNumberType"
    // InternalMyDsl.g:2952:1: ruleNumberType returns [EObject current=null] : ( () otherlv_1= 'NumberType' otherlv_2= '{' (otherlv_3= 'value' ( (lv_value_4_0= ruleEDouble ) ) )? otherlv_5= '}' ) ;
    public final EObject ruleNumberType() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_5=null;
        AntlrDatatypeRuleToken lv_value_4_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:2958:2: ( ( () otherlv_1= 'NumberType' otherlv_2= '{' (otherlv_3= 'value' ( (lv_value_4_0= ruleEDouble ) ) )? otherlv_5= '}' ) )
            // InternalMyDsl.g:2959:2: ( () otherlv_1= 'NumberType' otherlv_2= '{' (otherlv_3= 'value' ( (lv_value_4_0= ruleEDouble ) ) )? otherlv_5= '}' )
            {
            // InternalMyDsl.g:2959:2: ( () otherlv_1= 'NumberType' otherlv_2= '{' (otherlv_3= 'value' ( (lv_value_4_0= ruleEDouble ) ) )? otherlv_5= '}' )
            // InternalMyDsl.g:2960:3: () otherlv_1= 'NumberType' otherlv_2= '{' (otherlv_3= 'value' ( (lv_value_4_0= ruleEDouble ) ) )? otherlv_5= '}'
            {
            // InternalMyDsl.g:2960:3: ()
            // InternalMyDsl.g:2961:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getNumberTypeAccess().getNumberTypeAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,68,FOLLOW_3); 

            			newLeafNode(otherlv_1, grammarAccess.getNumberTypeAccess().getNumberTypeKeyword_1());
            		
            otherlv_2=(Token)match(input,12,FOLLOW_37); 

            			newLeafNode(otherlv_2, grammarAccess.getNumberTypeAccess().getLeftCurlyBracketKeyword_2());
            		
            // InternalMyDsl.g:2975:3: (otherlv_3= 'value' ( (lv_value_4_0= ruleEDouble ) ) )?
            int alt40=2;
            int LA40_0 = input.LA(1);

            if ( (LA40_0==66) ) {
                alt40=1;
            }
            switch (alt40) {
                case 1 :
                    // InternalMyDsl.g:2976:4: otherlv_3= 'value' ( (lv_value_4_0= ruleEDouble ) )
                    {
                    otherlv_3=(Token)match(input,66,FOLLOW_14); 

                    				newLeafNode(otherlv_3, grammarAccess.getNumberTypeAccess().getValueKeyword_3_0());
                    			
                    // InternalMyDsl.g:2980:4: ( (lv_value_4_0= ruleEDouble ) )
                    // InternalMyDsl.g:2981:5: (lv_value_4_0= ruleEDouble )
                    {
                    // InternalMyDsl.g:2981:5: (lv_value_4_0= ruleEDouble )
                    // InternalMyDsl.g:2982:6: lv_value_4_0= ruleEDouble
                    {

                    						newCompositeNode(grammarAccess.getNumberTypeAccess().getValueEDoubleParserRuleCall_3_1_0());
                    					
                    pushFollow(FOLLOW_7);
                    lv_value_4_0=ruleEDouble();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getNumberTypeRule());
                    						}
                    						set(
                    							current,
                    							"value",
                    							lv_value_4_0,
                    							"org.xtext.example.mydsl2.MyDsl.EDouble");
                    						afterParserOrEnumRuleCall();
                    					

                    }


                    }


                    }
                    break;

            }

            otherlv_5=(Token)match(input,15,FOLLOW_2); 

            			newLeafNode(otherlv_5, grammarAccess.getNumberTypeAccess().getRightCurlyBracketKeyword_4());
            		

            }


            }


            	leaveRule();

        }

            catch (RecognitionException re) {
                recover(input,re);
                appendSkippedTokens();
            }
        finally {
        }
        return current;
    }
    // $ANTLR end "ruleNumberType"

    // Delegated rules


 

    public static final BitSet FOLLOW_1 = new BitSet(new long[]{0x0000000000000000L});
    public static final BitSet FOLLOW_2 = new BitSet(new long[]{0x0000000000000002L});
    public static final BitSet FOLLOW_3 = new BitSet(new long[]{0x0000000000001000L});
    public static final BitSet FOLLOW_4 = new BitSet(new long[]{0x000000000000A000L});
    public static final BitSet FOLLOW_5 = new BitSet(new long[]{0x0000000000010000L});
    public static final BitSet FOLLOW_6 = new BitSet(new long[]{0x000000000000C000L});
    public static final BitSet FOLLOW_7 = new BitSet(new long[]{0x0000000000008000L});
    public static final BitSet FOLLOW_8 = new BitSet(new long[]{0x00000000000E8000L});
    public static final BitSet FOLLOW_9 = new BitSet(new long[]{0x077FF7A4FD500000L});
    public static final BitSet FOLLOW_10 = new BitSet(new long[]{0x00000000000C8000L});
    public static final BitSet FOLLOW_11 = new BitSet(new long[]{0x8000000000000000L,0x000000000000001FL});
    public static final BitSet FOLLOW_12 = new BitSet(new long[]{0x0000000000088000L});
    public static final BitSet FOLLOW_13 = new BitSet(new long[]{0x0000000000208000L});
    public static final BitSet FOLLOW_14 = new BitSet(new long[]{0x1800000000000010L});
    public static final BitSet FOLLOW_15 = new BitSet(new long[]{0x0000000000800000L});
    public static final BitSet FOLLOW_16 = new BitSet(new long[]{0x8000000000000000L,0x0000000000000001L});
    public static final BitSet FOLLOW_17 = new BitSet(new long[]{0x0000000002008000L});
    public static final BitSet FOLLOW_18 = new BitSet(new long[]{0x0000000300008000L});
    public static final BitSet FOLLOW_19 = new BitSet(new long[]{0x0000000200008000L});
    public static final BitSet FOLLOW_20 = new BitSet(new long[]{0x0000030000000000L});
    public static final BitSet FOLLOW_21 = new BitSet(new long[]{0x0000001900000000L});
    public static final BitSet FOLLOW_22 = new BitSet(new long[]{0x0000000000000060L});
    public static final BitSet FOLLOW_23 = new BitSet(new long[]{0x0000001100000000L});
    public static final BitSet FOLLOW_24 = new BitSet(new long[]{0x0000000100000000L});
    public static final BitSet FOLLOW_25 = new BitSet(new long[]{0x0000004000020000L});
    public static final BitSet FOLLOW_26 = new BitSet(new long[]{0x0000004000000000L});
    public static final BitSet FOLLOW_27 = new BitSet(new long[]{0x0000001000000000L});
    public static final BitSet FOLLOW_28 = new BitSet(new long[]{0x0000080000008000L});
    public static final BitSet FOLLOW_29 = new BitSet(new long[]{0x0000010000000000L});
    public static final BitSet FOLLOW_30 = new BitSet(new long[]{0x0000000000808000L});
    public static final BitSet FOLLOW_31 = new BitSet(new long[]{0x0080000000008000L});
    public static final BitSet FOLLOW_32 = new BitSet(new long[]{0x1000000000000010L});
    public static final BitSet FOLLOW_33 = new BitSet(new long[]{0x1000000000000000L});
    public static final BitSet FOLLOW_34 = new BitSet(new long[]{0x0000000000000010L});
    public static final BitSet FOLLOW_35 = new BitSet(new long[]{0x6000000000000002L});
    public static final BitSet FOLLOW_36 = new BitSet(new long[]{0x0800000000000010L});
    public static final BitSet FOLLOW_37 = new BitSet(new long[]{0x0000000000008000L,0x0000000000000004L});
    public static final BitSet FOLLOW_38 = new BitSet(new long[]{0x0000000000000000L,0x0000000000000008L});

}