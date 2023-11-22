package org.xtext.example.mydsl.parser.antlr.internal;

import org.eclipse.xtext.*;
import org.eclipse.xtext.parser.*;
import org.eclipse.xtext.parser.impl.*;
import org.eclipse.emf.ecore.util.EcoreUtil;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.xtext.parser.antlr.AbstractInternalAntlrParser;
import org.eclipse.xtext.parser.antlr.XtextTokenStream;
import org.eclipse.xtext.parser.antlr.XtextTokenStream.HiddenTokens;
import org.eclipse.xtext.parser.antlr.AntlrDatatypeRuleToken;
import org.xtext.example.mydsl.services.MyDslGrammarAccess;



import org.antlr.runtime.*;
import java.util.Stack;
import java.util.List;
import java.util.ArrayList;

@SuppressWarnings("all")
public class InternalMyDslParser extends AbstractInternalAntlrParser {
    public static final String[] tokenNames = new String[] {
        "<invalid>", "<EOR>", "<DOWN>", "<UP>", "RULE_INT", "RULE_ID", "RULE_STRING", "RULE_ML_COMMENT", "RULE_SL_COMMENT", "RULE_WS", "RULE_ANY_OTHER", "'Affectation'", "'{'", "'expressionbase'", "','", "'}'", "'callvariable'", "'CallVariable'", "'ArithmetiqueExp'", "'BooleanExp'", "'Plus'", "'right'", "'left'", "'Minus'", "'Mult'", "'Div'", "'PrimaryExprAri'", "'type'", "'call'", "'SecondaryExpAri'", "'CallFunction'", "'PrimaryExprBool'", "'SecondaryExpBool'", "'And'", "'Or'", "'Not'", "'Equals'", "'CM'", "'distance'", "'mm'", "'value'", "'BooleanType'", "'NumberType'", "'-'", "'.'", "'E'", "'e'"
    };
    public static final int T__19=19;
    public static final int T__15=15;
    public static final int T__16=16;
    public static final int T__17=17;
    public static final int T__18=18;
    public static final int T__11=11;
    public static final int T__12=12;
    public static final int T__13=13;
    public static final int T__14=14;
    public static final int RULE_ID=5;
    public static final int T__26=26;
    public static final int T__27=27;
    public static final int T__28=28;
    public static final int RULE_INT=4;
    public static final int T__29=29;
    public static final int T__22=22;
    public static final int RULE_ML_COMMENT=7;
    public static final int T__23=23;
    public static final int T__24=24;
    public static final int T__25=25;
    public static final int T__20=20;
    public static final int T__21=21;
    public static final int RULE_STRING=6;
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
    public static final int T__44=44;
    public static final int T__45=45;
    public static final int T__46=46;
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
        	return "Affectation";
       	}

       	@Override
       	protected MyDslGrammarAccess getGrammarAccess() {
       		return grammarAccess;
       	}




    // $ANTLR start "entryRuleAffectation"
    // InternalMyDsl.g:64:1: entryRuleAffectation returns [EObject current=null] : iv_ruleAffectation= ruleAffectation EOF ;
    public final EObject entryRuleAffectation() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleAffectation = null;


        try {
            // InternalMyDsl.g:64:52: (iv_ruleAffectation= ruleAffectation EOF )
            // InternalMyDsl.g:65:2: iv_ruleAffectation= ruleAffectation EOF
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
    // InternalMyDsl.g:71:1: ruleAffectation returns [EObject current=null] : (otherlv_0= 'Affectation' otherlv_1= '{' otherlv_2= 'expressionbase' otherlv_3= '{' ( (lv_expressionbase_4_0= ruleExpressionBase ) ) (otherlv_5= ',' ( (lv_expressionbase_6_0= ruleExpressionBase ) ) )* otherlv_7= '}' (otherlv_8= 'callvariable' ( (lv_callvariable_9_0= ruleCallVariable ) ) )? otherlv_10= '}' ) ;
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
            // InternalMyDsl.g:77:2: ( (otherlv_0= 'Affectation' otherlv_1= '{' otherlv_2= 'expressionbase' otherlv_3= '{' ( (lv_expressionbase_4_0= ruleExpressionBase ) ) (otherlv_5= ',' ( (lv_expressionbase_6_0= ruleExpressionBase ) ) )* otherlv_7= '}' (otherlv_8= 'callvariable' ( (lv_callvariable_9_0= ruleCallVariable ) ) )? otherlv_10= '}' ) )
            // InternalMyDsl.g:78:2: (otherlv_0= 'Affectation' otherlv_1= '{' otherlv_2= 'expressionbase' otherlv_3= '{' ( (lv_expressionbase_4_0= ruleExpressionBase ) ) (otherlv_5= ',' ( (lv_expressionbase_6_0= ruleExpressionBase ) ) )* otherlv_7= '}' (otherlv_8= 'callvariable' ( (lv_callvariable_9_0= ruleCallVariable ) ) )? otherlv_10= '}' )
            {
            // InternalMyDsl.g:78:2: (otherlv_0= 'Affectation' otherlv_1= '{' otherlv_2= 'expressionbase' otherlv_3= '{' ( (lv_expressionbase_4_0= ruleExpressionBase ) ) (otherlv_5= ',' ( (lv_expressionbase_6_0= ruleExpressionBase ) ) )* otherlv_7= '}' (otherlv_8= 'callvariable' ( (lv_callvariable_9_0= ruleCallVariable ) ) )? otherlv_10= '}' )
            // InternalMyDsl.g:79:3: otherlv_0= 'Affectation' otherlv_1= '{' otherlv_2= 'expressionbase' otherlv_3= '{' ( (lv_expressionbase_4_0= ruleExpressionBase ) ) (otherlv_5= ',' ( (lv_expressionbase_6_0= ruleExpressionBase ) ) )* otherlv_7= '}' (otherlv_8= 'callvariable' ( (lv_callvariable_9_0= ruleCallVariable ) ) )? otherlv_10= '}'
            {
            otherlv_0=(Token)match(input,11,FOLLOW_3); 

            			newLeafNode(otherlv_0, grammarAccess.getAffectationAccess().getAffectationKeyword_0());
            		
            otherlv_1=(Token)match(input,12,FOLLOW_4); 

            			newLeafNode(otherlv_1, grammarAccess.getAffectationAccess().getLeftCurlyBracketKeyword_1());
            		
            otherlv_2=(Token)match(input,13,FOLLOW_3); 

            			newLeafNode(otherlv_2, grammarAccess.getAffectationAccess().getExpressionbaseKeyword_2());
            		
            otherlv_3=(Token)match(input,12,FOLLOW_5); 

            			newLeafNode(otherlv_3, grammarAccess.getAffectationAccess().getLeftCurlyBracketKeyword_3());
            		
            // InternalMyDsl.g:95:3: ( (lv_expressionbase_4_0= ruleExpressionBase ) )
            // InternalMyDsl.g:96:4: (lv_expressionbase_4_0= ruleExpressionBase )
            {
            // InternalMyDsl.g:96:4: (lv_expressionbase_4_0= ruleExpressionBase )
            // InternalMyDsl.g:97:5: lv_expressionbase_4_0= ruleExpressionBase
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
            						"org.xtext.example.mydsl.MyDsl.ExpressionBase");
            					afterParserOrEnumRuleCall();
            				

            }


            }

            // InternalMyDsl.g:114:3: (otherlv_5= ',' ( (lv_expressionbase_6_0= ruleExpressionBase ) ) )*
            loop1:
            do {
                int alt1=2;
                int LA1_0 = input.LA(1);

                if ( (LA1_0==14) ) {
                    alt1=1;
                }


                switch (alt1) {
            	case 1 :
            	    // InternalMyDsl.g:115:4: otherlv_5= ',' ( (lv_expressionbase_6_0= ruleExpressionBase ) )
            	    {
            	    otherlv_5=(Token)match(input,14,FOLLOW_5); 

            	    				newLeafNode(otherlv_5, grammarAccess.getAffectationAccess().getCommaKeyword_5_0());
            	    			
            	    // InternalMyDsl.g:119:4: ( (lv_expressionbase_6_0= ruleExpressionBase ) )
            	    // InternalMyDsl.g:120:5: (lv_expressionbase_6_0= ruleExpressionBase )
            	    {
            	    // InternalMyDsl.g:120:5: (lv_expressionbase_6_0= ruleExpressionBase )
            	    // InternalMyDsl.g:121:6: lv_expressionbase_6_0= ruleExpressionBase
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
            	    							"org.xtext.example.mydsl.MyDsl.ExpressionBase");
            	    						afterParserOrEnumRuleCall();
            	    					

            	    }


            	    }


            	    }
            	    break;

            	default :
            	    break loop1;
                }
            } while (true);

            otherlv_7=(Token)match(input,15,FOLLOW_7); 

            			newLeafNode(otherlv_7, grammarAccess.getAffectationAccess().getRightCurlyBracketKeyword_6());
            		
            // InternalMyDsl.g:143:3: (otherlv_8= 'callvariable' ( (lv_callvariable_9_0= ruleCallVariable ) ) )?
            int alt2=2;
            int LA2_0 = input.LA(1);

            if ( (LA2_0==16) ) {
                alt2=1;
            }
            switch (alt2) {
                case 1 :
                    // InternalMyDsl.g:144:4: otherlv_8= 'callvariable' ( (lv_callvariable_9_0= ruleCallVariable ) )
                    {
                    otherlv_8=(Token)match(input,16,FOLLOW_8); 

                    				newLeafNode(otherlv_8, grammarAccess.getAffectationAccess().getCallvariableKeyword_7_0());
                    			
                    // InternalMyDsl.g:148:4: ( (lv_callvariable_9_0= ruleCallVariable ) )
                    // InternalMyDsl.g:149:5: (lv_callvariable_9_0= ruleCallVariable )
                    {
                    // InternalMyDsl.g:149:5: (lv_callvariable_9_0= ruleCallVariable )
                    // InternalMyDsl.g:150:6: lv_callvariable_9_0= ruleCallVariable
                    {

                    						newCompositeNode(grammarAccess.getAffectationAccess().getCallvariableCallVariableParserRuleCall_7_1_0());
                    					
                    pushFollow(FOLLOW_9);
                    lv_callvariable_9_0=ruleCallVariable();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getAffectationRule());
                    						}
                    						set(
                    							current,
                    							"callvariable",
                    							lv_callvariable_9_0,
                    							"org.xtext.example.mydsl.MyDsl.CallVariable");
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


    // $ANTLR start "entryRuleExpressionBase"
    // InternalMyDsl.g:176:1: entryRuleExpressionBase returns [EObject current=null] : iv_ruleExpressionBase= ruleExpressionBase EOF ;
    public final EObject entryRuleExpressionBase() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleExpressionBase = null;


        try {
            // InternalMyDsl.g:176:55: (iv_ruleExpressionBase= ruleExpressionBase EOF )
            // InternalMyDsl.g:177:2: iv_ruleExpressionBase= ruleExpressionBase EOF
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
    // InternalMyDsl.g:183:1: ruleExpressionBase returns [EObject current=null] : (this_ArithmetiqueExp_Impl_0= ruleArithmetiqueExp_Impl | this_BooleanExp_Impl_1= ruleBooleanExp_Impl | this_Plus_2= rulePlus | this_Minus_3= ruleMinus | this_Mult_4= ruleMult | this_Div_5= ruleDiv | this_PrimaryExprAri_6= rulePrimaryExprAri | this_SecondaryExpAri_Impl_7= ruleSecondaryExpAri_Impl | this_CallVariable_8= ruleCallVariable | this_CallFunction_9= ruleCallFunction | this_Affectation_10= ruleAffectation | this_PrimaryExprBool_11= rulePrimaryExprBool | this_SecondaryExpBool_Impl_12= ruleSecondaryExpBool_Impl | this_And_13= ruleAnd | this_Or_14= ruleOr | this_Not_15= ruleNot | this_Equals_16= ruleEquals ) ;
    public final EObject ruleExpressionBase() throws RecognitionException {
        EObject current = null;

        EObject this_ArithmetiqueExp_Impl_0 = null;

        EObject this_BooleanExp_Impl_1 = null;

        EObject this_Plus_2 = null;

        EObject this_Minus_3 = null;

        EObject this_Mult_4 = null;

        EObject this_Div_5 = null;

        EObject this_PrimaryExprAri_6 = null;

        EObject this_SecondaryExpAri_Impl_7 = null;

        EObject this_CallVariable_8 = null;

        EObject this_CallFunction_9 = null;

        EObject this_Affectation_10 = null;

        EObject this_PrimaryExprBool_11 = null;

        EObject this_SecondaryExpBool_Impl_12 = null;

        EObject this_And_13 = null;

        EObject this_Or_14 = null;

        EObject this_Not_15 = null;

        EObject this_Equals_16 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:189:2: ( (this_ArithmetiqueExp_Impl_0= ruleArithmetiqueExp_Impl | this_BooleanExp_Impl_1= ruleBooleanExp_Impl | this_Plus_2= rulePlus | this_Minus_3= ruleMinus | this_Mult_4= ruleMult | this_Div_5= ruleDiv | this_PrimaryExprAri_6= rulePrimaryExprAri | this_SecondaryExpAri_Impl_7= ruleSecondaryExpAri_Impl | this_CallVariable_8= ruleCallVariable | this_CallFunction_9= ruleCallFunction | this_Affectation_10= ruleAffectation | this_PrimaryExprBool_11= rulePrimaryExprBool | this_SecondaryExpBool_Impl_12= ruleSecondaryExpBool_Impl | this_And_13= ruleAnd | this_Or_14= ruleOr | this_Not_15= ruleNot | this_Equals_16= ruleEquals ) )
            // InternalMyDsl.g:190:2: (this_ArithmetiqueExp_Impl_0= ruleArithmetiqueExp_Impl | this_BooleanExp_Impl_1= ruleBooleanExp_Impl | this_Plus_2= rulePlus | this_Minus_3= ruleMinus | this_Mult_4= ruleMult | this_Div_5= ruleDiv | this_PrimaryExprAri_6= rulePrimaryExprAri | this_SecondaryExpAri_Impl_7= ruleSecondaryExpAri_Impl | this_CallVariable_8= ruleCallVariable | this_CallFunction_9= ruleCallFunction | this_Affectation_10= ruleAffectation | this_PrimaryExprBool_11= rulePrimaryExprBool | this_SecondaryExpBool_Impl_12= ruleSecondaryExpBool_Impl | this_And_13= ruleAnd | this_Or_14= ruleOr | this_Not_15= ruleNot | this_Equals_16= ruleEquals )
            {
            // InternalMyDsl.g:190:2: (this_ArithmetiqueExp_Impl_0= ruleArithmetiqueExp_Impl | this_BooleanExp_Impl_1= ruleBooleanExp_Impl | this_Plus_2= rulePlus | this_Minus_3= ruleMinus | this_Mult_4= ruleMult | this_Div_5= ruleDiv | this_PrimaryExprAri_6= rulePrimaryExprAri | this_SecondaryExpAri_Impl_7= ruleSecondaryExpAri_Impl | this_CallVariable_8= ruleCallVariable | this_CallFunction_9= ruleCallFunction | this_Affectation_10= ruleAffectation | this_PrimaryExprBool_11= rulePrimaryExprBool | this_SecondaryExpBool_Impl_12= ruleSecondaryExpBool_Impl | this_And_13= ruleAnd | this_Or_14= ruleOr | this_Not_15= ruleNot | this_Equals_16= ruleEquals )
            int alt3=17;
            switch ( input.LA(1) ) {
            case 18:
                {
                alt3=1;
                }
                break;
            case 19:
                {
                alt3=2;
                }
                break;
            case 20:
                {
                alt3=3;
                }
                break;
            case 23:
                {
                alt3=4;
                }
                break;
            case 24:
                {
                alt3=5;
                }
                break;
            case 25:
                {
                alt3=6;
                }
                break;
            case 26:
                {
                alt3=7;
                }
                break;
            case 29:
                {
                alt3=8;
                }
                break;
            case 17:
                {
                alt3=9;
                }
                break;
            case 30:
                {
                alt3=10;
                }
                break;
            case 11:
                {
                alt3=11;
                }
                break;
            case 31:
                {
                alt3=12;
                }
                break;
            case 32:
                {
                alt3=13;
                }
                break;
            case 33:
                {
                alt3=14;
                }
                break;
            case 34:
                {
                alt3=15;
                }
                break;
            case 35:
                {
                alt3=16;
                }
                break;
            case 36:
                {
                alt3=17;
                }
                break;
            default:
                NoViableAltException nvae =
                    new NoViableAltException("", 3, 0, input);

                throw nvae;
            }

            switch (alt3) {
                case 1 :
                    // InternalMyDsl.g:191:3: this_ArithmetiqueExp_Impl_0= ruleArithmetiqueExp_Impl
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getArithmetiqueExp_ImplParserRuleCall_0());
                    		
                    pushFollow(FOLLOW_2);
                    this_ArithmetiqueExp_Impl_0=ruleArithmetiqueExp_Impl();

                    state._fsp--;


                    			current = this_ArithmetiqueExp_Impl_0;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 2 :
                    // InternalMyDsl.g:200:3: this_BooleanExp_Impl_1= ruleBooleanExp_Impl
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getBooleanExp_ImplParserRuleCall_1());
                    		
                    pushFollow(FOLLOW_2);
                    this_BooleanExp_Impl_1=ruleBooleanExp_Impl();

                    state._fsp--;


                    			current = this_BooleanExp_Impl_1;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 3 :
                    // InternalMyDsl.g:209:3: this_Plus_2= rulePlus
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getPlusParserRuleCall_2());
                    		
                    pushFollow(FOLLOW_2);
                    this_Plus_2=rulePlus();

                    state._fsp--;


                    			current = this_Plus_2;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 4 :
                    // InternalMyDsl.g:218:3: this_Minus_3= ruleMinus
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getMinusParserRuleCall_3());
                    		
                    pushFollow(FOLLOW_2);
                    this_Minus_3=ruleMinus();

                    state._fsp--;


                    			current = this_Minus_3;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 5 :
                    // InternalMyDsl.g:227:3: this_Mult_4= ruleMult
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getMultParserRuleCall_4());
                    		
                    pushFollow(FOLLOW_2);
                    this_Mult_4=ruleMult();

                    state._fsp--;


                    			current = this_Mult_4;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 6 :
                    // InternalMyDsl.g:236:3: this_Div_5= ruleDiv
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getDivParserRuleCall_5());
                    		
                    pushFollow(FOLLOW_2);
                    this_Div_5=ruleDiv();

                    state._fsp--;


                    			current = this_Div_5;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 7 :
                    // InternalMyDsl.g:245:3: this_PrimaryExprAri_6= rulePrimaryExprAri
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getPrimaryExprAriParserRuleCall_6());
                    		
                    pushFollow(FOLLOW_2);
                    this_PrimaryExprAri_6=rulePrimaryExprAri();

                    state._fsp--;


                    			current = this_PrimaryExprAri_6;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 8 :
                    // InternalMyDsl.g:254:3: this_SecondaryExpAri_Impl_7= ruleSecondaryExpAri_Impl
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getSecondaryExpAri_ImplParserRuleCall_7());
                    		
                    pushFollow(FOLLOW_2);
                    this_SecondaryExpAri_Impl_7=ruleSecondaryExpAri_Impl();

                    state._fsp--;


                    			current = this_SecondaryExpAri_Impl_7;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 9 :
                    // InternalMyDsl.g:263:3: this_CallVariable_8= ruleCallVariable
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getCallVariableParserRuleCall_8());
                    		
                    pushFollow(FOLLOW_2);
                    this_CallVariable_8=ruleCallVariable();

                    state._fsp--;


                    			current = this_CallVariable_8;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 10 :
                    // InternalMyDsl.g:272:3: this_CallFunction_9= ruleCallFunction
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getCallFunctionParserRuleCall_9());
                    		
                    pushFollow(FOLLOW_2);
                    this_CallFunction_9=ruleCallFunction();

                    state._fsp--;


                    			current = this_CallFunction_9;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 11 :
                    // InternalMyDsl.g:281:3: this_Affectation_10= ruleAffectation
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getAffectationParserRuleCall_10());
                    		
                    pushFollow(FOLLOW_2);
                    this_Affectation_10=ruleAffectation();

                    state._fsp--;


                    			current = this_Affectation_10;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 12 :
                    // InternalMyDsl.g:290:3: this_PrimaryExprBool_11= rulePrimaryExprBool
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getPrimaryExprBoolParserRuleCall_11());
                    		
                    pushFollow(FOLLOW_2);
                    this_PrimaryExprBool_11=rulePrimaryExprBool();

                    state._fsp--;


                    			current = this_PrimaryExprBool_11;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 13 :
                    // InternalMyDsl.g:299:3: this_SecondaryExpBool_Impl_12= ruleSecondaryExpBool_Impl
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getSecondaryExpBool_ImplParserRuleCall_12());
                    		
                    pushFollow(FOLLOW_2);
                    this_SecondaryExpBool_Impl_12=ruleSecondaryExpBool_Impl();

                    state._fsp--;


                    			current = this_SecondaryExpBool_Impl_12;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 14 :
                    // InternalMyDsl.g:308:3: this_And_13= ruleAnd
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getAndParserRuleCall_13());
                    		
                    pushFollow(FOLLOW_2);
                    this_And_13=ruleAnd();

                    state._fsp--;


                    			current = this_And_13;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 15 :
                    // InternalMyDsl.g:317:3: this_Or_14= ruleOr
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getOrParserRuleCall_14());
                    		
                    pushFollow(FOLLOW_2);
                    this_Or_14=ruleOr();

                    state._fsp--;


                    			current = this_Or_14;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 16 :
                    // InternalMyDsl.g:326:3: this_Not_15= ruleNot
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getNotParserRuleCall_15());
                    		
                    pushFollow(FOLLOW_2);
                    this_Not_15=ruleNot();

                    state._fsp--;


                    			current = this_Not_15;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 17 :
                    // InternalMyDsl.g:335:3: this_Equals_16= ruleEquals
                    {

                    			newCompositeNode(grammarAccess.getExpressionBaseAccess().getEqualsParserRuleCall_16());
                    		
                    pushFollow(FOLLOW_2);
                    this_Equals_16=ruleEquals();

                    state._fsp--;


                    			current = this_Equals_16;
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


    // $ANTLR start "entryRuleArithmetiqueExp"
    // InternalMyDsl.g:347:1: entryRuleArithmetiqueExp returns [EObject current=null] : iv_ruleArithmetiqueExp= ruleArithmetiqueExp EOF ;
    public final EObject entryRuleArithmetiqueExp() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleArithmetiqueExp = null;


        try {
            // InternalMyDsl.g:347:56: (iv_ruleArithmetiqueExp= ruleArithmetiqueExp EOF )
            // InternalMyDsl.g:348:2: iv_ruleArithmetiqueExp= ruleArithmetiqueExp EOF
            {
             newCompositeNode(grammarAccess.getArithmetiqueExpRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleArithmetiqueExp=ruleArithmetiqueExp();

            state._fsp--;

             current =iv_ruleArithmetiqueExp; 
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
    // $ANTLR end "entryRuleArithmetiqueExp"


    // $ANTLR start "ruleArithmetiqueExp"
    // InternalMyDsl.g:354:1: ruleArithmetiqueExp returns [EObject current=null] : (this_ArithmetiqueExp_Impl_0= ruleArithmetiqueExp_Impl | this_Plus_1= rulePlus | this_Minus_2= ruleMinus | this_Mult_3= ruleMult | this_Div_4= ruleDiv | this_PrimaryExprAri_5= rulePrimaryExprAri | this_SecondaryExpAri_Impl_6= ruleSecondaryExpAri_Impl ) ;
    public final EObject ruleArithmetiqueExp() throws RecognitionException {
        EObject current = null;

        EObject this_ArithmetiqueExp_Impl_0 = null;

        EObject this_Plus_1 = null;

        EObject this_Minus_2 = null;

        EObject this_Mult_3 = null;

        EObject this_Div_4 = null;

        EObject this_PrimaryExprAri_5 = null;

        EObject this_SecondaryExpAri_Impl_6 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:360:2: ( (this_ArithmetiqueExp_Impl_0= ruleArithmetiqueExp_Impl | this_Plus_1= rulePlus | this_Minus_2= ruleMinus | this_Mult_3= ruleMult | this_Div_4= ruleDiv | this_PrimaryExprAri_5= rulePrimaryExprAri | this_SecondaryExpAri_Impl_6= ruleSecondaryExpAri_Impl ) )
            // InternalMyDsl.g:361:2: (this_ArithmetiqueExp_Impl_0= ruleArithmetiqueExp_Impl | this_Plus_1= rulePlus | this_Minus_2= ruleMinus | this_Mult_3= ruleMult | this_Div_4= ruleDiv | this_PrimaryExprAri_5= rulePrimaryExprAri | this_SecondaryExpAri_Impl_6= ruleSecondaryExpAri_Impl )
            {
            // InternalMyDsl.g:361:2: (this_ArithmetiqueExp_Impl_0= ruleArithmetiqueExp_Impl | this_Plus_1= rulePlus | this_Minus_2= ruleMinus | this_Mult_3= ruleMult | this_Div_4= ruleDiv | this_PrimaryExprAri_5= rulePrimaryExprAri | this_SecondaryExpAri_Impl_6= ruleSecondaryExpAri_Impl )
            int alt4=7;
            switch ( input.LA(1) ) {
            case 18:
                {
                alt4=1;
                }
                break;
            case 20:
                {
                alt4=2;
                }
                break;
            case 23:
                {
                alt4=3;
                }
                break;
            case 24:
                {
                alt4=4;
                }
                break;
            case 25:
                {
                alt4=5;
                }
                break;
            case 26:
                {
                alt4=6;
                }
                break;
            case 29:
                {
                alt4=7;
                }
                break;
            default:
                NoViableAltException nvae =
                    new NoViableAltException("", 4, 0, input);

                throw nvae;
            }

            switch (alt4) {
                case 1 :
                    // InternalMyDsl.g:362:3: this_ArithmetiqueExp_Impl_0= ruleArithmetiqueExp_Impl
                    {

                    			newCompositeNode(grammarAccess.getArithmetiqueExpAccess().getArithmetiqueExp_ImplParserRuleCall_0());
                    		
                    pushFollow(FOLLOW_2);
                    this_ArithmetiqueExp_Impl_0=ruleArithmetiqueExp_Impl();

                    state._fsp--;


                    			current = this_ArithmetiqueExp_Impl_0;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 2 :
                    // InternalMyDsl.g:371:3: this_Plus_1= rulePlus
                    {

                    			newCompositeNode(grammarAccess.getArithmetiqueExpAccess().getPlusParserRuleCall_1());
                    		
                    pushFollow(FOLLOW_2);
                    this_Plus_1=rulePlus();

                    state._fsp--;


                    			current = this_Plus_1;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 3 :
                    // InternalMyDsl.g:380:3: this_Minus_2= ruleMinus
                    {

                    			newCompositeNode(grammarAccess.getArithmetiqueExpAccess().getMinusParserRuleCall_2());
                    		
                    pushFollow(FOLLOW_2);
                    this_Minus_2=ruleMinus();

                    state._fsp--;


                    			current = this_Minus_2;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 4 :
                    // InternalMyDsl.g:389:3: this_Mult_3= ruleMult
                    {

                    			newCompositeNode(grammarAccess.getArithmetiqueExpAccess().getMultParserRuleCall_3());
                    		
                    pushFollow(FOLLOW_2);
                    this_Mult_3=ruleMult();

                    state._fsp--;


                    			current = this_Mult_3;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 5 :
                    // InternalMyDsl.g:398:3: this_Div_4= ruleDiv
                    {

                    			newCompositeNode(grammarAccess.getArithmetiqueExpAccess().getDivParserRuleCall_4());
                    		
                    pushFollow(FOLLOW_2);
                    this_Div_4=ruleDiv();

                    state._fsp--;


                    			current = this_Div_4;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 6 :
                    // InternalMyDsl.g:407:3: this_PrimaryExprAri_5= rulePrimaryExprAri
                    {

                    			newCompositeNode(grammarAccess.getArithmetiqueExpAccess().getPrimaryExprAriParserRuleCall_5());
                    		
                    pushFollow(FOLLOW_2);
                    this_PrimaryExprAri_5=rulePrimaryExprAri();

                    state._fsp--;


                    			current = this_PrimaryExprAri_5;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 7 :
                    // InternalMyDsl.g:416:3: this_SecondaryExpAri_Impl_6= ruleSecondaryExpAri_Impl
                    {

                    			newCompositeNode(grammarAccess.getArithmetiqueExpAccess().getSecondaryExpAri_ImplParserRuleCall_6());
                    		
                    pushFollow(FOLLOW_2);
                    this_SecondaryExpAri_Impl_6=ruleSecondaryExpAri_Impl();

                    state._fsp--;


                    			current = this_SecondaryExpAri_Impl_6;
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
    // $ANTLR end "ruleArithmetiqueExp"


    // $ANTLR start "entryRuleTypeClass"
    // InternalMyDsl.g:428:1: entryRuleTypeClass returns [EObject current=null] : iv_ruleTypeClass= ruleTypeClass EOF ;
    public final EObject entryRuleTypeClass() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleTypeClass = null;


        try {
            // InternalMyDsl.g:428:50: (iv_ruleTypeClass= ruleTypeClass EOF )
            // InternalMyDsl.g:429:2: iv_ruleTypeClass= ruleTypeClass EOF
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
    // InternalMyDsl.g:435:1: ruleTypeClass returns [EObject current=null] : (this_CM_0= ruleCM | this_mm_1= rulemm | this_BooleanType_2= ruleBooleanType | this_NumberType_3= ruleNumberType ) ;
    public final EObject ruleTypeClass() throws RecognitionException {
        EObject current = null;

        EObject this_CM_0 = null;

        EObject this_mm_1 = null;

        EObject this_BooleanType_2 = null;

        EObject this_NumberType_3 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:441:2: ( (this_CM_0= ruleCM | this_mm_1= rulemm | this_BooleanType_2= ruleBooleanType | this_NumberType_3= ruleNumberType ) )
            // InternalMyDsl.g:442:2: (this_CM_0= ruleCM | this_mm_1= rulemm | this_BooleanType_2= ruleBooleanType | this_NumberType_3= ruleNumberType )
            {
            // InternalMyDsl.g:442:2: (this_CM_0= ruleCM | this_mm_1= rulemm | this_BooleanType_2= ruleBooleanType | this_NumberType_3= ruleNumberType )
            int alt5=4;
            switch ( input.LA(1) ) {
            case 37:
                {
                alt5=1;
                }
                break;
            case 39:
                {
                alt5=2;
                }
                break;
            case 40:
            case 41:
                {
                alt5=3;
                }
                break;
            case 42:
                {
                alt5=4;
                }
                break;
            default:
                NoViableAltException nvae =
                    new NoViableAltException("", 5, 0, input);

                throw nvae;
            }

            switch (alt5) {
                case 1 :
                    // InternalMyDsl.g:443:3: this_CM_0= ruleCM
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
                    // InternalMyDsl.g:452:3: this_mm_1= rulemm
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
                    // InternalMyDsl.g:461:3: this_BooleanType_2= ruleBooleanType
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
                    // InternalMyDsl.g:470:3: this_NumberType_3= ruleNumberType
                    {

                    			newCompositeNode(grammarAccess.getTypeClassAccess().getNumberTypeParserRuleCall_3());
                    		
                    pushFollow(FOLLOW_2);
                    this_NumberType_3=ruleNumberType();

                    state._fsp--;


                    			current = this_NumberType_3;
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


    // $ANTLR start "entryRuleCall"
    // InternalMyDsl.g:482:1: entryRuleCall returns [EObject current=null] : iv_ruleCall= ruleCall EOF ;
    public final EObject entryRuleCall() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleCall = null;


        try {
            // InternalMyDsl.g:482:45: (iv_ruleCall= ruleCall EOF )
            // InternalMyDsl.g:483:2: iv_ruleCall= ruleCall EOF
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
    // InternalMyDsl.g:489:1: ruleCall returns [EObject current=null] : (this_CallVariable_0= ruleCallVariable | this_CallFunction_1= ruleCallFunction ) ;
    public final EObject ruleCall() throws RecognitionException {
        EObject current = null;

        EObject this_CallVariable_0 = null;

        EObject this_CallFunction_1 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:495:2: ( (this_CallVariable_0= ruleCallVariable | this_CallFunction_1= ruleCallFunction ) )
            // InternalMyDsl.g:496:2: (this_CallVariable_0= ruleCallVariable | this_CallFunction_1= ruleCallFunction )
            {
            // InternalMyDsl.g:496:2: (this_CallVariable_0= ruleCallVariable | this_CallFunction_1= ruleCallFunction )
            int alt6=2;
            int LA6_0 = input.LA(1);

            if ( (LA6_0==17) ) {
                alt6=1;
            }
            else if ( (LA6_0==30) ) {
                alt6=2;
            }
            else {
                NoViableAltException nvae =
                    new NoViableAltException("", 6, 0, input);

                throw nvae;
            }
            switch (alt6) {
                case 1 :
                    // InternalMyDsl.g:497:3: this_CallVariable_0= ruleCallVariable
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
                    // InternalMyDsl.g:506:3: this_CallFunction_1= ruleCallFunction
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


    // $ANTLR start "entryRuleBooleanExp"
    // InternalMyDsl.g:518:1: entryRuleBooleanExp returns [EObject current=null] : iv_ruleBooleanExp= ruleBooleanExp EOF ;
    public final EObject entryRuleBooleanExp() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleBooleanExp = null;


        try {
            // InternalMyDsl.g:518:51: (iv_ruleBooleanExp= ruleBooleanExp EOF )
            // InternalMyDsl.g:519:2: iv_ruleBooleanExp= ruleBooleanExp EOF
            {
             newCompositeNode(grammarAccess.getBooleanExpRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleBooleanExp=ruleBooleanExp();

            state._fsp--;

             current =iv_ruleBooleanExp; 
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
    // $ANTLR end "entryRuleBooleanExp"


    // $ANTLR start "ruleBooleanExp"
    // InternalMyDsl.g:525:1: ruleBooleanExp returns [EObject current=null] : (this_BooleanExp_Impl_0= ruleBooleanExp_Impl | this_PrimaryExprBool_1= rulePrimaryExprBool | this_SecondaryExpBool_Impl_2= ruleSecondaryExpBool_Impl | this_And_3= ruleAnd | this_Or_4= ruleOr | this_Not_5= ruleNot | this_Equals_6= ruleEquals ) ;
    public final EObject ruleBooleanExp() throws RecognitionException {
        EObject current = null;

        EObject this_BooleanExp_Impl_0 = null;

        EObject this_PrimaryExprBool_1 = null;

        EObject this_SecondaryExpBool_Impl_2 = null;

        EObject this_And_3 = null;

        EObject this_Or_4 = null;

        EObject this_Not_5 = null;

        EObject this_Equals_6 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:531:2: ( (this_BooleanExp_Impl_0= ruleBooleanExp_Impl | this_PrimaryExprBool_1= rulePrimaryExprBool | this_SecondaryExpBool_Impl_2= ruleSecondaryExpBool_Impl | this_And_3= ruleAnd | this_Or_4= ruleOr | this_Not_5= ruleNot | this_Equals_6= ruleEquals ) )
            // InternalMyDsl.g:532:2: (this_BooleanExp_Impl_0= ruleBooleanExp_Impl | this_PrimaryExprBool_1= rulePrimaryExprBool | this_SecondaryExpBool_Impl_2= ruleSecondaryExpBool_Impl | this_And_3= ruleAnd | this_Or_4= ruleOr | this_Not_5= ruleNot | this_Equals_6= ruleEquals )
            {
            // InternalMyDsl.g:532:2: (this_BooleanExp_Impl_0= ruleBooleanExp_Impl | this_PrimaryExprBool_1= rulePrimaryExprBool | this_SecondaryExpBool_Impl_2= ruleSecondaryExpBool_Impl | this_And_3= ruleAnd | this_Or_4= ruleOr | this_Not_5= ruleNot | this_Equals_6= ruleEquals )
            int alt7=7;
            switch ( input.LA(1) ) {
            case 19:
                {
                alt7=1;
                }
                break;
            case 31:
                {
                alt7=2;
                }
                break;
            case 32:
                {
                alt7=3;
                }
                break;
            case 33:
                {
                alt7=4;
                }
                break;
            case 34:
                {
                alt7=5;
                }
                break;
            case 35:
                {
                alt7=6;
                }
                break;
            case 36:
                {
                alt7=7;
                }
                break;
            default:
                NoViableAltException nvae =
                    new NoViableAltException("", 7, 0, input);

                throw nvae;
            }

            switch (alt7) {
                case 1 :
                    // InternalMyDsl.g:533:3: this_BooleanExp_Impl_0= ruleBooleanExp_Impl
                    {

                    			newCompositeNode(grammarAccess.getBooleanExpAccess().getBooleanExp_ImplParserRuleCall_0());
                    		
                    pushFollow(FOLLOW_2);
                    this_BooleanExp_Impl_0=ruleBooleanExp_Impl();

                    state._fsp--;


                    			current = this_BooleanExp_Impl_0;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 2 :
                    // InternalMyDsl.g:542:3: this_PrimaryExprBool_1= rulePrimaryExprBool
                    {

                    			newCompositeNode(grammarAccess.getBooleanExpAccess().getPrimaryExprBoolParserRuleCall_1());
                    		
                    pushFollow(FOLLOW_2);
                    this_PrimaryExprBool_1=rulePrimaryExprBool();

                    state._fsp--;


                    			current = this_PrimaryExprBool_1;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 3 :
                    // InternalMyDsl.g:551:3: this_SecondaryExpBool_Impl_2= ruleSecondaryExpBool_Impl
                    {

                    			newCompositeNode(grammarAccess.getBooleanExpAccess().getSecondaryExpBool_ImplParserRuleCall_2());
                    		
                    pushFollow(FOLLOW_2);
                    this_SecondaryExpBool_Impl_2=ruleSecondaryExpBool_Impl();

                    state._fsp--;


                    			current = this_SecondaryExpBool_Impl_2;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 4 :
                    // InternalMyDsl.g:560:3: this_And_3= ruleAnd
                    {

                    			newCompositeNode(grammarAccess.getBooleanExpAccess().getAndParserRuleCall_3());
                    		
                    pushFollow(FOLLOW_2);
                    this_And_3=ruleAnd();

                    state._fsp--;


                    			current = this_And_3;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 5 :
                    // InternalMyDsl.g:569:3: this_Or_4= ruleOr
                    {

                    			newCompositeNode(grammarAccess.getBooleanExpAccess().getOrParserRuleCall_4());
                    		
                    pushFollow(FOLLOW_2);
                    this_Or_4=ruleOr();

                    state._fsp--;


                    			current = this_Or_4;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 6 :
                    // InternalMyDsl.g:578:3: this_Not_5= ruleNot
                    {

                    			newCompositeNode(grammarAccess.getBooleanExpAccess().getNotParserRuleCall_5());
                    		
                    pushFollow(FOLLOW_2);
                    this_Not_5=ruleNot();

                    state._fsp--;


                    			current = this_Not_5;
                    			afterParserOrEnumRuleCall();
                    		

                    }
                    break;
                case 7 :
                    // InternalMyDsl.g:587:3: this_Equals_6= ruleEquals
                    {

                    			newCompositeNode(grammarAccess.getBooleanExpAccess().getEqualsParserRuleCall_6());
                    		
                    pushFollow(FOLLOW_2);
                    this_Equals_6=ruleEquals();

                    state._fsp--;


                    			current = this_Equals_6;
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
    // $ANTLR end "ruleBooleanExp"


    // $ANTLR start "entryRuleCallVariable"
    // InternalMyDsl.g:599:1: entryRuleCallVariable returns [EObject current=null] : iv_ruleCallVariable= ruleCallVariable EOF ;
    public final EObject entryRuleCallVariable() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleCallVariable = null;


        try {
            // InternalMyDsl.g:599:53: (iv_ruleCallVariable= ruleCallVariable EOF )
            // InternalMyDsl.g:600:2: iv_ruleCallVariable= ruleCallVariable EOF
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
    // InternalMyDsl.g:606:1: ruleCallVariable returns [EObject current=null] : ( () otherlv_1= 'CallVariable' ) ;
    public final EObject ruleCallVariable() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;


        	enterRule();

        try {
            // InternalMyDsl.g:612:2: ( ( () otherlv_1= 'CallVariable' ) )
            // InternalMyDsl.g:613:2: ( () otherlv_1= 'CallVariable' )
            {
            // InternalMyDsl.g:613:2: ( () otherlv_1= 'CallVariable' )
            // InternalMyDsl.g:614:3: () otherlv_1= 'CallVariable'
            {
            // InternalMyDsl.g:614:3: ()
            // InternalMyDsl.g:615:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getCallVariableAccess().getCallVariableAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,17,FOLLOW_2); 

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


    // $ANTLR start "entryRuleArithmetiqueExp_Impl"
    // InternalMyDsl.g:629:1: entryRuleArithmetiqueExp_Impl returns [EObject current=null] : iv_ruleArithmetiqueExp_Impl= ruleArithmetiqueExp_Impl EOF ;
    public final EObject entryRuleArithmetiqueExp_Impl() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleArithmetiqueExp_Impl = null;


        try {
            // InternalMyDsl.g:629:61: (iv_ruleArithmetiqueExp_Impl= ruleArithmetiqueExp_Impl EOF )
            // InternalMyDsl.g:630:2: iv_ruleArithmetiqueExp_Impl= ruleArithmetiqueExp_Impl EOF
            {
             newCompositeNode(grammarAccess.getArithmetiqueExp_ImplRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleArithmetiqueExp_Impl=ruleArithmetiqueExp_Impl();

            state._fsp--;

             current =iv_ruleArithmetiqueExp_Impl; 
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
    // $ANTLR end "entryRuleArithmetiqueExp_Impl"


    // $ANTLR start "ruleArithmetiqueExp_Impl"
    // InternalMyDsl.g:636:1: ruleArithmetiqueExp_Impl returns [EObject current=null] : ( () otherlv_1= 'ArithmetiqueExp' ) ;
    public final EObject ruleArithmetiqueExp_Impl() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;


        	enterRule();

        try {
            // InternalMyDsl.g:642:2: ( ( () otherlv_1= 'ArithmetiqueExp' ) )
            // InternalMyDsl.g:643:2: ( () otherlv_1= 'ArithmetiqueExp' )
            {
            // InternalMyDsl.g:643:2: ( () otherlv_1= 'ArithmetiqueExp' )
            // InternalMyDsl.g:644:3: () otherlv_1= 'ArithmetiqueExp'
            {
            // InternalMyDsl.g:644:3: ()
            // InternalMyDsl.g:645:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getArithmetiqueExp_ImplAccess().getArithmetiqueExpAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,18,FOLLOW_2); 

            			newLeafNode(otherlv_1, grammarAccess.getArithmetiqueExp_ImplAccess().getArithmetiqueExpKeyword_1());
            		

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
    // $ANTLR end "ruleArithmetiqueExp_Impl"


    // $ANTLR start "entryRuleBooleanExp_Impl"
    // InternalMyDsl.g:659:1: entryRuleBooleanExp_Impl returns [EObject current=null] : iv_ruleBooleanExp_Impl= ruleBooleanExp_Impl EOF ;
    public final EObject entryRuleBooleanExp_Impl() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleBooleanExp_Impl = null;


        try {
            // InternalMyDsl.g:659:56: (iv_ruleBooleanExp_Impl= ruleBooleanExp_Impl EOF )
            // InternalMyDsl.g:660:2: iv_ruleBooleanExp_Impl= ruleBooleanExp_Impl EOF
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
    // InternalMyDsl.g:666:1: ruleBooleanExp_Impl returns [EObject current=null] : ( () otherlv_1= 'BooleanExp' ) ;
    public final EObject ruleBooleanExp_Impl() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;


        	enterRule();

        try {
            // InternalMyDsl.g:672:2: ( ( () otherlv_1= 'BooleanExp' ) )
            // InternalMyDsl.g:673:2: ( () otherlv_1= 'BooleanExp' )
            {
            // InternalMyDsl.g:673:2: ( () otherlv_1= 'BooleanExp' )
            // InternalMyDsl.g:674:3: () otherlv_1= 'BooleanExp'
            {
            // InternalMyDsl.g:674:3: ()
            // InternalMyDsl.g:675:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getBooleanExp_ImplAccess().getBooleanExpAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,19,FOLLOW_2); 

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


    // $ANTLR start "entryRulePlus"
    // InternalMyDsl.g:689:1: entryRulePlus returns [EObject current=null] : iv_rulePlus= rulePlus EOF ;
    public final EObject entryRulePlus() throws RecognitionException {
        EObject current = null;

        EObject iv_rulePlus = null;


        try {
            // InternalMyDsl.g:689:45: (iv_rulePlus= rulePlus EOF )
            // InternalMyDsl.g:690:2: iv_rulePlus= rulePlus EOF
            {
             newCompositeNode(grammarAccess.getPlusRule()); 
            pushFollow(FOLLOW_1);
            iv_rulePlus=rulePlus();

            state._fsp--;

             current =iv_rulePlus; 
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
    // $ANTLR end "entryRulePlus"


    // $ANTLR start "rulePlus"
    // InternalMyDsl.g:696:1: rulePlus returns [EObject current=null] : (otherlv_0= 'Plus' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleArithmetiqueExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleArithmetiqueExp ) ) otherlv_10= '}' ) ;
    public final EObject rulePlus() throws RecognitionException {
        EObject current = null;

        Token otherlv_0=null;
        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_5=null;
        Token otherlv_7=null;
        Token otherlv_8=null;
        Token otherlv_10=null;
        EObject lv_right_4_0 = null;

        EObject lv_right_6_0 = null;

        EObject lv_left_9_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:702:2: ( (otherlv_0= 'Plus' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleArithmetiqueExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleArithmetiqueExp ) ) otherlv_10= '}' ) )
            // InternalMyDsl.g:703:2: (otherlv_0= 'Plus' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleArithmetiqueExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleArithmetiqueExp ) ) otherlv_10= '}' )
            {
            // InternalMyDsl.g:703:2: (otherlv_0= 'Plus' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleArithmetiqueExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleArithmetiqueExp ) ) otherlv_10= '}' )
            // InternalMyDsl.g:704:3: otherlv_0= 'Plus' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleArithmetiqueExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleArithmetiqueExp ) ) otherlv_10= '}'
            {
            otherlv_0=(Token)match(input,20,FOLLOW_3); 

            			newLeafNode(otherlv_0, grammarAccess.getPlusAccess().getPlusKeyword_0());
            		
            otherlv_1=(Token)match(input,12,FOLLOW_10); 

            			newLeafNode(otherlv_1, grammarAccess.getPlusAccess().getLeftCurlyBracketKeyword_1());
            		
            otherlv_2=(Token)match(input,21,FOLLOW_3); 

            			newLeafNode(otherlv_2, grammarAccess.getPlusAccess().getRightKeyword_2());
            		
            otherlv_3=(Token)match(input,12,FOLLOW_11); 

            			newLeafNode(otherlv_3, grammarAccess.getPlusAccess().getLeftCurlyBracketKeyword_3());
            		
            // InternalMyDsl.g:720:3: ( (lv_right_4_0= ruleArithmetiqueExp ) )
            // InternalMyDsl.g:721:4: (lv_right_4_0= ruleArithmetiqueExp )
            {
            // InternalMyDsl.g:721:4: (lv_right_4_0= ruleArithmetiqueExp )
            // InternalMyDsl.g:722:5: lv_right_4_0= ruleArithmetiqueExp
            {

            					newCompositeNode(grammarAccess.getPlusAccess().getRightArithmetiqueExpParserRuleCall_4_0());
            				
            pushFollow(FOLLOW_6);
            lv_right_4_0=ruleArithmetiqueExp();

            state._fsp--;


            					if (current==null) {
            						current = createModelElementForParent(grammarAccess.getPlusRule());
            					}
            					add(
            						current,
            						"right",
            						lv_right_4_0,
            						"org.xtext.example.mydsl.MyDsl.ArithmetiqueExp");
            					afterParserOrEnumRuleCall();
            				

            }


            }

            // InternalMyDsl.g:739:3: (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )*
            loop8:
            do {
                int alt8=2;
                int LA8_0 = input.LA(1);

                if ( (LA8_0==14) ) {
                    alt8=1;
                }


                switch (alt8) {
            	case 1 :
            	    // InternalMyDsl.g:740:4: otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) )
            	    {
            	    otherlv_5=(Token)match(input,14,FOLLOW_11); 

            	    				newLeafNode(otherlv_5, grammarAccess.getPlusAccess().getCommaKeyword_5_0());
            	    			
            	    // InternalMyDsl.g:744:4: ( (lv_right_6_0= ruleArithmetiqueExp ) )
            	    // InternalMyDsl.g:745:5: (lv_right_6_0= ruleArithmetiqueExp )
            	    {
            	    // InternalMyDsl.g:745:5: (lv_right_6_0= ruleArithmetiqueExp )
            	    // InternalMyDsl.g:746:6: lv_right_6_0= ruleArithmetiqueExp
            	    {

            	    						newCompositeNode(grammarAccess.getPlusAccess().getRightArithmetiqueExpParserRuleCall_5_1_0());
            	    					
            	    pushFollow(FOLLOW_6);
            	    lv_right_6_0=ruleArithmetiqueExp();

            	    state._fsp--;


            	    						if (current==null) {
            	    							current = createModelElementForParent(grammarAccess.getPlusRule());
            	    						}
            	    						add(
            	    							current,
            	    							"right",
            	    							lv_right_6_0,
            	    							"org.xtext.example.mydsl.MyDsl.ArithmetiqueExp");
            	    						afterParserOrEnumRuleCall();
            	    					

            	    }


            	    }


            	    }
            	    break;

            	default :
            	    break loop8;
                }
            } while (true);

            otherlv_7=(Token)match(input,15,FOLLOW_12); 

            			newLeafNode(otherlv_7, grammarAccess.getPlusAccess().getRightCurlyBracketKeyword_6());
            		
            otherlv_8=(Token)match(input,22,FOLLOW_11); 

            			newLeafNode(otherlv_8, grammarAccess.getPlusAccess().getLeftKeyword_7());
            		
            // InternalMyDsl.g:772:3: ( (lv_left_9_0= ruleArithmetiqueExp ) )
            // InternalMyDsl.g:773:4: (lv_left_9_0= ruleArithmetiqueExp )
            {
            // InternalMyDsl.g:773:4: (lv_left_9_0= ruleArithmetiqueExp )
            // InternalMyDsl.g:774:5: lv_left_9_0= ruleArithmetiqueExp
            {

            					newCompositeNode(grammarAccess.getPlusAccess().getLeftArithmetiqueExpParserRuleCall_8_0());
            				
            pushFollow(FOLLOW_9);
            lv_left_9_0=ruleArithmetiqueExp();

            state._fsp--;


            					if (current==null) {
            						current = createModelElementForParent(grammarAccess.getPlusRule());
            					}
            					set(
            						current,
            						"left",
            						lv_left_9_0,
            						"org.xtext.example.mydsl.MyDsl.ArithmetiqueExp");
            					afterParserOrEnumRuleCall();
            				

            }


            }

            otherlv_10=(Token)match(input,15,FOLLOW_2); 

            			newLeafNode(otherlv_10, grammarAccess.getPlusAccess().getRightCurlyBracketKeyword_9());
            		

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
    // $ANTLR end "rulePlus"


    // $ANTLR start "entryRuleMinus"
    // InternalMyDsl.g:799:1: entryRuleMinus returns [EObject current=null] : iv_ruleMinus= ruleMinus EOF ;
    public final EObject entryRuleMinus() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleMinus = null;


        try {
            // InternalMyDsl.g:799:46: (iv_ruleMinus= ruleMinus EOF )
            // InternalMyDsl.g:800:2: iv_ruleMinus= ruleMinus EOF
            {
             newCompositeNode(grammarAccess.getMinusRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleMinus=ruleMinus();

            state._fsp--;

             current =iv_ruleMinus; 
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
    // $ANTLR end "entryRuleMinus"


    // $ANTLR start "ruleMinus"
    // InternalMyDsl.g:806:1: ruleMinus returns [EObject current=null] : (otherlv_0= 'Minus' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleArithmetiqueExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleArithmetiqueExp ) ) otherlv_10= '}' ) ;
    public final EObject ruleMinus() throws RecognitionException {
        EObject current = null;

        Token otherlv_0=null;
        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_5=null;
        Token otherlv_7=null;
        Token otherlv_8=null;
        Token otherlv_10=null;
        EObject lv_right_4_0 = null;

        EObject lv_right_6_0 = null;

        EObject lv_left_9_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:812:2: ( (otherlv_0= 'Minus' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleArithmetiqueExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleArithmetiqueExp ) ) otherlv_10= '}' ) )
            // InternalMyDsl.g:813:2: (otherlv_0= 'Minus' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleArithmetiqueExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleArithmetiqueExp ) ) otherlv_10= '}' )
            {
            // InternalMyDsl.g:813:2: (otherlv_0= 'Minus' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleArithmetiqueExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleArithmetiqueExp ) ) otherlv_10= '}' )
            // InternalMyDsl.g:814:3: otherlv_0= 'Minus' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleArithmetiqueExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleArithmetiqueExp ) ) otherlv_10= '}'
            {
            otherlv_0=(Token)match(input,23,FOLLOW_3); 

            			newLeafNode(otherlv_0, grammarAccess.getMinusAccess().getMinusKeyword_0());
            		
            otherlv_1=(Token)match(input,12,FOLLOW_10); 

            			newLeafNode(otherlv_1, grammarAccess.getMinusAccess().getLeftCurlyBracketKeyword_1());
            		
            otherlv_2=(Token)match(input,21,FOLLOW_3); 

            			newLeafNode(otherlv_2, grammarAccess.getMinusAccess().getRightKeyword_2());
            		
            otherlv_3=(Token)match(input,12,FOLLOW_11); 

            			newLeafNode(otherlv_3, grammarAccess.getMinusAccess().getLeftCurlyBracketKeyword_3());
            		
            // InternalMyDsl.g:830:3: ( (lv_right_4_0= ruleArithmetiqueExp ) )
            // InternalMyDsl.g:831:4: (lv_right_4_0= ruleArithmetiqueExp )
            {
            // InternalMyDsl.g:831:4: (lv_right_4_0= ruleArithmetiqueExp )
            // InternalMyDsl.g:832:5: lv_right_4_0= ruleArithmetiqueExp
            {

            					newCompositeNode(grammarAccess.getMinusAccess().getRightArithmetiqueExpParserRuleCall_4_0());
            				
            pushFollow(FOLLOW_6);
            lv_right_4_0=ruleArithmetiqueExp();

            state._fsp--;


            					if (current==null) {
            						current = createModelElementForParent(grammarAccess.getMinusRule());
            					}
            					add(
            						current,
            						"right",
            						lv_right_4_0,
            						"org.xtext.example.mydsl.MyDsl.ArithmetiqueExp");
            					afterParserOrEnumRuleCall();
            				

            }


            }

            // InternalMyDsl.g:849:3: (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )*
            loop9:
            do {
                int alt9=2;
                int LA9_0 = input.LA(1);

                if ( (LA9_0==14) ) {
                    alt9=1;
                }


                switch (alt9) {
            	case 1 :
            	    // InternalMyDsl.g:850:4: otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) )
            	    {
            	    otherlv_5=(Token)match(input,14,FOLLOW_11); 

            	    				newLeafNode(otherlv_5, grammarAccess.getMinusAccess().getCommaKeyword_5_0());
            	    			
            	    // InternalMyDsl.g:854:4: ( (lv_right_6_0= ruleArithmetiqueExp ) )
            	    // InternalMyDsl.g:855:5: (lv_right_6_0= ruleArithmetiqueExp )
            	    {
            	    // InternalMyDsl.g:855:5: (lv_right_6_0= ruleArithmetiqueExp )
            	    // InternalMyDsl.g:856:6: lv_right_6_0= ruleArithmetiqueExp
            	    {

            	    						newCompositeNode(grammarAccess.getMinusAccess().getRightArithmetiqueExpParserRuleCall_5_1_0());
            	    					
            	    pushFollow(FOLLOW_6);
            	    lv_right_6_0=ruleArithmetiqueExp();

            	    state._fsp--;


            	    						if (current==null) {
            	    							current = createModelElementForParent(grammarAccess.getMinusRule());
            	    						}
            	    						add(
            	    							current,
            	    							"right",
            	    							lv_right_6_0,
            	    							"org.xtext.example.mydsl.MyDsl.ArithmetiqueExp");
            	    						afterParserOrEnumRuleCall();
            	    					

            	    }


            	    }


            	    }
            	    break;

            	default :
            	    break loop9;
                }
            } while (true);

            otherlv_7=(Token)match(input,15,FOLLOW_12); 

            			newLeafNode(otherlv_7, grammarAccess.getMinusAccess().getRightCurlyBracketKeyword_6());
            		
            otherlv_8=(Token)match(input,22,FOLLOW_11); 

            			newLeafNode(otherlv_8, grammarAccess.getMinusAccess().getLeftKeyword_7());
            		
            // InternalMyDsl.g:882:3: ( (lv_left_9_0= ruleArithmetiqueExp ) )
            // InternalMyDsl.g:883:4: (lv_left_9_0= ruleArithmetiqueExp )
            {
            // InternalMyDsl.g:883:4: (lv_left_9_0= ruleArithmetiqueExp )
            // InternalMyDsl.g:884:5: lv_left_9_0= ruleArithmetiqueExp
            {

            					newCompositeNode(grammarAccess.getMinusAccess().getLeftArithmetiqueExpParserRuleCall_8_0());
            				
            pushFollow(FOLLOW_9);
            lv_left_9_0=ruleArithmetiqueExp();

            state._fsp--;


            					if (current==null) {
            						current = createModelElementForParent(grammarAccess.getMinusRule());
            					}
            					set(
            						current,
            						"left",
            						lv_left_9_0,
            						"org.xtext.example.mydsl.MyDsl.ArithmetiqueExp");
            					afterParserOrEnumRuleCall();
            				

            }


            }

            otherlv_10=(Token)match(input,15,FOLLOW_2); 

            			newLeafNode(otherlv_10, grammarAccess.getMinusAccess().getRightCurlyBracketKeyword_9());
            		

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
    // $ANTLR end "ruleMinus"


    // $ANTLR start "entryRuleMult"
    // InternalMyDsl.g:909:1: entryRuleMult returns [EObject current=null] : iv_ruleMult= ruleMult EOF ;
    public final EObject entryRuleMult() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleMult = null;


        try {
            // InternalMyDsl.g:909:45: (iv_ruleMult= ruleMult EOF )
            // InternalMyDsl.g:910:2: iv_ruleMult= ruleMult EOF
            {
             newCompositeNode(grammarAccess.getMultRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleMult=ruleMult();

            state._fsp--;

             current =iv_ruleMult; 
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
    // $ANTLR end "entryRuleMult"


    // $ANTLR start "ruleMult"
    // InternalMyDsl.g:916:1: ruleMult returns [EObject current=null] : (otherlv_0= 'Mult' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleArithmetiqueExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleArithmetiqueExp ) ) otherlv_10= '}' ) ;
    public final EObject ruleMult() throws RecognitionException {
        EObject current = null;

        Token otherlv_0=null;
        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_5=null;
        Token otherlv_7=null;
        Token otherlv_8=null;
        Token otherlv_10=null;
        EObject lv_right_4_0 = null;

        EObject lv_right_6_0 = null;

        EObject lv_left_9_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:922:2: ( (otherlv_0= 'Mult' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleArithmetiqueExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleArithmetiqueExp ) ) otherlv_10= '}' ) )
            // InternalMyDsl.g:923:2: (otherlv_0= 'Mult' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleArithmetiqueExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleArithmetiqueExp ) ) otherlv_10= '}' )
            {
            // InternalMyDsl.g:923:2: (otherlv_0= 'Mult' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleArithmetiqueExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleArithmetiqueExp ) ) otherlv_10= '}' )
            // InternalMyDsl.g:924:3: otherlv_0= 'Mult' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleArithmetiqueExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleArithmetiqueExp ) ) otherlv_10= '}'
            {
            otherlv_0=(Token)match(input,24,FOLLOW_3); 

            			newLeafNode(otherlv_0, grammarAccess.getMultAccess().getMultKeyword_0());
            		
            otherlv_1=(Token)match(input,12,FOLLOW_10); 

            			newLeafNode(otherlv_1, grammarAccess.getMultAccess().getLeftCurlyBracketKeyword_1());
            		
            otherlv_2=(Token)match(input,21,FOLLOW_3); 

            			newLeafNode(otherlv_2, grammarAccess.getMultAccess().getRightKeyword_2());
            		
            otherlv_3=(Token)match(input,12,FOLLOW_11); 

            			newLeafNode(otherlv_3, grammarAccess.getMultAccess().getLeftCurlyBracketKeyword_3());
            		
            // InternalMyDsl.g:940:3: ( (lv_right_4_0= ruleArithmetiqueExp ) )
            // InternalMyDsl.g:941:4: (lv_right_4_0= ruleArithmetiqueExp )
            {
            // InternalMyDsl.g:941:4: (lv_right_4_0= ruleArithmetiqueExp )
            // InternalMyDsl.g:942:5: lv_right_4_0= ruleArithmetiqueExp
            {

            					newCompositeNode(grammarAccess.getMultAccess().getRightArithmetiqueExpParserRuleCall_4_0());
            				
            pushFollow(FOLLOW_6);
            lv_right_4_0=ruleArithmetiqueExp();

            state._fsp--;


            					if (current==null) {
            						current = createModelElementForParent(grammarAccess.getMultRule());
            					}
            					add(
            						current,
            						"right",
            						lv_right_4_0,
            						"org.xtext.example.mydsl.MyDsl.ArithmetiqueExp");
            					afterParserOrEnumRuleCall();
            				

            }


            }

            // InternalMyDsl.g:959:3: (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )*
            loop10:
            do {
                int alt10=2;
                int LA10_0 = input.LA(1);

                if ( (LA10_0==14) ) {
                    alt10=1;
                }


                switch (alt10) {
            	case 1 :
            	    // InternalMyDsl.g:960:4: otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) )
            	    {
            	    otherlv_5=(Token)match(input,14,FOLLOW_11); 

            	    				newLeafNode(otherlv_5, grammarAccess.getMultAccess().getCommaKeyword_5_0());
            	    			
            	    // InternalMyDsl.g:964:4: ( (lv_right_6_0= ruleArithmetiqueExp ) )
            	    // InternalMyDsl.g:965:5: (lv_right_6_0= ruleArithmetiqueExp )
            	    {
            	    // InternalMyDsl.g:965:5: (lv_right_6_0= ruleArithmetiqueExp )
            	    // InternalMyDsl.g:966:6: lv_right_6_0= ruleArithmetiqueExp
            	    {

            	    						newCompositeNode(grammarAccess.getMultAccess().getRightArithmetiqueExpParserRuleCall_5_1_0());
            	    					
            	    pushFollow(FOLLOW_6);
            	    lv_right_6_0=ruleArithmetiqueExp();

            	    state._fsp--;


            	    						if (current==null) {
            	    							current = createModelElementForParent(grammarAccess.getMultRule());
            	    						}
            	    						add(
            	    							current,
            	    							"right",
            	    							lv_right_6_0,
            	    							"org.xtext.example.mydsl.MyDsl.ArithmetiqueExp");
            	    						afterParserOrEnumRuleCall();
            	    					

            	    }


            	    }


            	    }
            	    break;

            	default :
            	    break loop10;
                }
            } while (true);

            otherlv_7=(Token)match(input,15,FOLLOW_12); 

            			newLeafNode(otherlv_7, grammarAccess.getMultAccess().getRightCurlyBracketKeyword_6());
            		
            otherlv_8=(Token)match(input,22,FOLLOW_11); 

            			newLeafNode(otherlv_8, grammarAccess.getMultAccess().getLeftKeyword_7());
            		
            // InternalMyDsl.g:992:3: ( (lv_left_9_0= ruleArithmetiqueExp ) )
            // InternalMyDsl.g:993:4: (lv_left_9_0= ruleArithmetiqueExp )
            {
            // InternalMyDsl.g:993:4: (lv_left_9_0= ruleArithmetiqueExp )
            // InternalMyDsl.g:994:5: lv_left_9_0= ruleArithmetiqueExp
            {

            					newCompositeNode(grammarAccess.getMultAccess().getLeftArithmetiqueExpParserRuleCall_8_0());
            				
            pushFollow(FOLLOW_9);
            lv_left_9_0=ruleArithmetiqueExp();

            state._fsp--;


            					if (current==null) {
            						current = createModelElementForParent(grammarAccess.getMultRule());
            					}
            					set(
            						current,
            						"left",
            						lv_left_9_0,
            						"org.xtext.example.mydsl.MyDsl.ArithmetiqueExp");
            					afterParserOrEnumRuleCall();
            				

            }


            }

            otherlv_10=(Token)match(input,15,FOLLOW_2); 

            			newLeafNode(otherlv_10, grammarAccess.getMultAccess().getRightCurlyBracketKeyword_9());
            		

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
    // $ANTLR end "ruleMult"


    // $ANTLR start "entryRuleDiv"
    // InternalMyDsl.g:1019:1: entryRuleDiv returns [EObject current=null] : iv_ruleDiv= ruleDiv EOF ;
    public final EObject entryRuleDiv() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleDiv = null;


        try {
            // InternalMyDsl.g:1019:44: (iv_ruleDiv= ruleDiv EOF )
            // InternalMyDsl.g:1020:2: iv_ruleDiv= ruleDiv EOF
            {
             newCompositeNode(grammarAccess.getDivRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleDiv=ruleDiv();

            state._fsp--;

             current =iv_ruleDiv; 
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
    // $ANTLR end "entryRuleDiv"


    // $ANTLR start "ruleDiv"
    // InternalMyDsl.g:1026:1: ruleDiv returns [EObject current=null] : (otherlv_0= 'Div' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleArithmetiqueExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleArithmetiqueExp ) ) otherlv_10= '}' ) ;
    public final EObject ruleDiv() throws RecognitionException {
        EObject current = null;

        Token otherlv_0=null;
        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_5=null;
        Token otherlv_7=null;
        Token otherlv_8=null;
        Token otherlv_10=null;
        EObject lv_right_4_0 = null;

        EObject lv_right_6_0 = null;

        EObject lv_left_9_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:1032:2: ( (otherlv_0= 'Div' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleArithmetiqueExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleArithmetiqueExp ) ) otherlv_10= '}' ) )
            // InternalMyDsl.g:1033:2: (otherlv_0= 'Div' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleArithmetiqueExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleArithmetiqueExp ) ) otherlv_10= '}' )
            {
            // InternalMyDsl.g:1033:2: (otherlv_0= 'Div' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleArithmetiqueExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleArithmetiqueExp ) ) otherlv_10= '}' )
            // InternalMyDsl.g:1034:3: otherlv_0= 'Div' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleArithmetiqueExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleArithmetiqueExp ) ) otherlv_10= '}'
            {
            otherlv_0=(Token)match(input,25,FOLLOW_3); 

            			newLeafNode(otherlv_0, grammarAccess.getDivAccess().getDivKeyword_0());
            		
            otherlv_1=(Token)match(input,12,FOLLOW_10); 

            			newLeafNode(otherlv_1, grammarAccess.getDivAccess().getLeftCurlyBracketKeyword_1());
            		
            otherlv_2=(Token)match(input,21,FOLLOW_3); 

            			newLeafNode(otherlv_2, grammarAccess.getDivAccess().getRightKeyword_2());
            		
            otherlv_3=(Token)match(input,12,FOLLOW_11); 

            			newLeafNode(otherlv_3, grammarAccess.getDivAccess().getLeftCurlyBracketKeyword_3());
            		
            // InternalMyDsl.g:1050:3: ( (lv_right_4_0= ruleArithmetiqueExp ) )
            // InternalMyDsl.g:1051:4: (lv_right_4_0= ruleArithmetiqueExp )
            {
            // InternalMyDsl.g:1051:4: (lv_right_4_0= ruleArithmetiqueExp )
            // InternalMyDsl.g:1052:5: lv_right_4_0= ruleArithmetiqueExp
            {

            					newCompositeNode(grammarAccess.getDivAccess().getRightArithmetiqueExpParserRuleCall_4_0());
            				
            pushFollow(FOLLOW_6);
            lv_right_4_0=ruleArithmetiqueExp();

            state._fsp--;


            					if (current==null) {
            						current = createModelElementForParent(grammarAccess.getDivRule());
            					}
            					add(
            						current,
            						"right",
            						lv_right_4_0,
            						"org.xtext.example.mydsl.MyDsl.ArithmetiqueExp");
            					afterParserOrEnumRuleCall();
            				

            }


            }

            // InternalMyDsl.g:1069:3: (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )*
            loop11:
            do {
                int alt11=2;
                int LA11_0 = input.LA(1);

                if ( (LA11_0==14) ) {
                    alt11=1;
                }


                switch (alt11) {
            	case 1 :
            	    // InternalMyDsl.g:1070:4: otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) )
            	    {
            	    otherlv_5=(Token)match(input,14,FOLLOW_11); 

            	    				newLeafNode(otherlv_5, grammarAccess.getDivAccess().getCommaKeyword_5_0());
            	    			
            	    // InternalMyDsl.g:1074:4: ( (lv_right_6_0= ruleArithmetiqueExp ) )
            	    // InternalMyDsl.g:1075:5: (lv_right_6_0= ruleArithmetiqueExp )
            	    {
            	    // InternalMyDsl.g:1075:5: (lv_right_6_0= ruleArithmetiqueExp )
            	    // InternalMyDsl.g:1076:6: lv_right_6_0= ruleArithmetiqueExp
            	    {

            	    						newCompositeNode(grammarAccess.getDivAccess().getRightArithmetiqueExpParserRuleCall_5_1_0());
            	    					
            	    pushFollow(FOLLOW_6);
            	    lv_right_6_0=ruleArithmetiqueExp();

            	    state._fsp--;


            	    						if (current==null) {
            	    							current = createModelElementForParent(grammarAccess.getDivRule());
            	    						}
            	    						add(
            	    							current,
            	    							"right",
            	    							lv_right_6_0,
            	    							"org.xtext.example.mydsl.MyDsl.ArithmetiqueExp");
            	    						afterParserOrEnumRuleCall();
            	    					

            	    }


            	    }


            	    }
            	    break;

            	default :
            	    break loop11;
                }
            } while (true);

            otherlv_7=(Token)match(input,15,FOLLOW_12); 

            			newLeafNode(otherlv_7, grammarAccess.getDivAccess().getRightCurlyBracketKeyword_6());
            		
            otherlv_8=(Token)match(input,22,FOLLOW_11); 

            			newLeafNode(otherlv_8, grammarAccess.getDivAccess().getLeftKeyword_7());
            		
            // InternalMyDsl.g:1102:3: ( (lv_left_9_0= ruleArithmetiqueExp ) )
            // InternalMyDsl.g:1103:4: (lv_left_9_0= ruleArithmetiqueExp )
            {
            // InternalMyDsl.g:1103:4: (lv_left_9_0= ruleArithmetiqueExp )
            // InternalMyDsl.g:1104:5: lv_left_9_0= ruleArithmetiqueExp
            {

            					newCompositeNode(grammarAccess.getDivAccess().getLeftArithmetiqueExpParserRuleCall_8_0());
            				
            pushFollow(FOLLOW_9);
            lv_left_9_0=ruleArithmetiqueExp();

            state._fsp--;


            					if (current==null) {
            						current = createModelElementForParent(grammarAccess.getDivRule());
            					}
            					set(
            						current,
            						"left",
            						lv_left_9_0,
            						"org.xtext.example.mydsl.MyDsl.ArithmetiqueExp");
            					afterParserOrEnumRuleCall();
            				

            }


            }

            otherlv_10=(Token)match(input,15,FOLLOW_2); 

            			newLeafNode(otherlv_10, grammarAccess.getDivAccess().getRightCurlyBracketKeyword_9());
            		

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
    // $ANTLR end "ruleDiv"


    // $ANTLR start "entryRulePrimaryExprAri"
    // InternalMyDsl.g:1129:1: entryRulePrimaryExprAri returns [EObject current=null] : iv_rulePrimaryExprAri= rulePrimaryExprAri EOF ;
    public final EObject entryRulePrimaryExprAri() throws RecognitionException {
        EObject current = null;

        EObject iv_rulePrimaryExprAri = null;


        try {
            // InternalMyDsl.g:1129:55: (iv_rulePrimaryExprAri= rulePrimaryExprAri EOF )
            // InternalMyDsl.g:1130:2: iv_rulePrimaryExprAri= rulePrimaryExprAri EOF
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
    // InternalMyDsl.g:1136:1: rulePrimaryExprAri returns [EObject current=null] : ( () otherlv_1= 'PrimaryExprAri' otherlv_2= '{' (otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) ) )? (otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) ) )? otherlv_7= '}' ) ;
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
            // InternalMyDsl.g:1142:2: ( ( () otherlv_1= 'PrimaryExprAri' otherlv_2= '{' (otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) ) )? (otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) ) )? otherlv_7= '}' ) )
            // InternalMyDsl.g:1143:2: ( () otherlv_1= 'PrimaryExprAri' otherlv_2= '{' (otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) ) )? (otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) ) )? otherlv_7= '}' )
            {
            // InternalMyDsl.g:1143:2: ( () otherlv_1= 'PrimaryExprAri' otherlv_2= '{' (otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) ) )? (otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) ) )? otherlv_7= '}' )
            // InternalMyDsl.g:1144:3: () otherlv_1= 'PrimaryExprAri' otherlv_2= '{' (otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) ) )? (otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) ) )? otherlv_7= '}'
            {
            // InternalMyDsl.g:1144:3: ()
            // InternalMyDsl.g:1145:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getPrimaryExprAriAccess().getPrimaryExprAriAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,26,FOLLOW_3); 

            			newLeafNode(otherlv_1, grammarAccess.getPrimaryExprAriAccess().getPrimaryExprAriKeyword_1());
            		
            otherlv_2=(Token)match(input,12,FOLLOW_13); 

            			newLeafNode(otherlv_2, grammarAccess.getPrimaryExprAriAccess().getLeftCurlyBracketKeyword_2());
            		
            // InternalMyDsl.g:1159:3: (otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) ) )?
            int alt12=2;
            int LA12_0 = input.LA(1);

            if ( (LA12_0==27) ) {
                alt12=1;
            }
            switch (alt12) {
                case 1 :
                    // InternalMyDsl.g:1160:4: otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) )
                    {
                    otherlv_3=(Token)match(input,27,FOLLOW_14); 

                    				newLeafNode(otherlv_3, grammarAccess.getPrimaryExprAriAccess().getTypeKeyword_3_0());
                    			
                    // InternalMyDsl.g:1164:4: ( (lv_type_4_0= ruleTypeClass ) )
                    // InternalMyDsl.g:1165:5: (lv_type_4_0= ruleTypeClass )
                    {
                    // InternalMyDsl.g:1165:5: (lv_type_4_0= ruleTypeClass )
                    // InternalMyDsl.g:1166:6: lv_type_4_0= ruleTypeClass
                    {

                    						newCompositeNode(grammarAccess.getPrimaryExprAriAccess().getTypeTypeClassParserRuleCall_3_1_0());
                    					
                    pushFollow(FOLLOW_15);
                    lv_type_4_0=ruleTypeClass();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getPrimaryExprAriRule());
                    						}
                    						set(
                    							current,
                    							"type",
                    							lv_type_4_0,
                    							"org.xtext.example.mydsl.MyDsl.TypeClass");
                    						afterParserOrEnumRuleCall();
                    					

                    }


                    }


                    }
                    break;

            }

            // InternalMyDsl.g:1184:3: (otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) ) )?
            int alt13=2;
            int LA13_0 = input.LA(1);

            if ( (LA13_0==28) ) {
                alt13=1;
            }
            switch (alt13) {
                case 1 :
                    // InternalMyDsl.g:1185:4: otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) )
                    {
                    otherlv_5=(Token)match(input,28,FOLLOW_16); 

                    				newLeafNode(otherlv_5, grammarAccess.getPrimaryExprAriAccess().getCallKeyword_4_0());
                    			
                    // InternalMyDsl.g:1189:4: ( (lv_call_6_0= ruleCall ) )
                    // InternalMyDsl.g:1190:5: (lv_call_6_0= ruleCall )
                    {
                    // InternalMyDsl.g:1190:5: (lv_call_6_0= ruleCall )
                    // InternalMyDsl.g:1191:6: lv_call_6_0= ruleCall
                    {

                    						newCompositeNode(grammarAccess.getPrimaryExprAriAccess().getCallCallParserRuleCall_4_1_0());
                    					
                    pushFollow(FOLLOW_9);
                    lv_call_6_0=ruleCall();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getPrimaryExprAriRule());
                    						}
                    						set(
                    							current,
                    							"call",
                    							lv_call_6_0,
                    							"org.xtext.example.mydsl.MyDsl.Call");
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


    // $ANTLR start "entryRuleSecondaryExpAri_Impl"
    // InternalMyDsl.g:1217:1: entryRuleSecondaryExpAri_Impl returns [EObject current=null] : iv_ruleSecondaryExpAri_Impl= ruleSecondaryExpAri_Impl EOF ;
    public final EObject entryRuleSecondaryExpAri_Impl() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleSecondaryExpAri_Impl = null;


        try {
            // InternalMyDsl.g:1217:61: (iv_ruleSecondaryExpAri_Impl= ruleSecondaryExpAri_Impl EOF )
            // InternalMyDsl.g:1218:2: iv_ruleSecondaryExpAri_Impl= ruleSecondaryExpAri_Impl EOF
            {
             newCompositeNode(grammarAccess.getSecondaryExpAri_ImplRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleSecondaryExpAri_Impl=ruleSecondaryExpAri_Impl();

            state._fsp--;

             current =iv_ruleSecondaryExpAri_Impl; 
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
    // $ANTLR end "entryRuleSecondaryExpAri_Impl"


    // $ANTLR start "ruleSecondaryExpAri_Impl"
    // InternalMyDsl.g:1224:1: ruleSecondaryExpAri_Impl returns [EObject current=null] : (otherlv_0= 'SecondaryExpAri' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleArithmetiqueExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleArithmetiqueExp ) ) otherlv_10= '}' ) ;
    public final EObject ruleSecondaryExpAri_Impl() throws RecognitionException {
        EObject current = null;

        Token otherlv_0=null;
        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_5=null;
        Token otherlv_7=null;
        Token otherlv_8=null;
        Token otherlv_10=null;
        EObject lv_right_4_0 = null;

        EObject lv_right_6_0 = null;

        EObject lv_left_9_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:1230:2: ( (otherlv_0= 'SecondaryExpAri' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleArithmetiqueExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleArithmetiqueExp ) ) otherlv_10= '}' ) )
            // InternalMyDsl.g:1231:2: (otherlv_0= 'SecondaryExpAri' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleArithmetiqueExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleArithmetiqueExp ) ) otherlv_10= '}' )
            {
            // InternalMyDsl.g:1231:2: (otherlv_0= 'SecondaryExpAri' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleArithmetiqueExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleArithmetiqueExp ) ) otherlv_10= '}' )
            // InternalMyDsl.g:1232:3: otherlv_0= 'SecondaryExpAri' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleArithmetiqueExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleArithmetiqueExp ) ) otherlv_10= '}'
            {
            otherlv_0=(Token)match(input,29,FOLLOW_3); 

            			newLeafNode(otherlv_0, grammarAccess.getSecondaryExpAri_ImplAccess().getSecondaryExpAriKeyword_0());
            		
            otherlv_1=(Token)match(input,12,FOLLOW_10); 

            			newLeafNode(otherlv_1, grammarAccess.getSecondaryExpAri_ImplAccess().getLeftCurlyBracketKeyword_1());
            		
            otherlv_2=(Token)match(input,21,FOLLOW_3); 

            			newLeafNode(otherlv_2, grammarAccess.getSecondaryExpAri_ImplAccess().getRightKeyword_2());
            		
            otherlv_3=(Token)match(input,12,FOLLOW_11); 

            			newLeafNode(otherlv_3, grammarAccess.getSecondaryExpAri_ImplAccess().getLeftCurlyBracketKeyword_3());
            		
            // InternalMyDsl.g:1248:3: ( (lv_right_4_0= ruleArithmetiqueExp ) )
            // InternalMyDsl.g:1249:4: (lv_right_4_0= ruleArithmetiqueExp )
            {
            // InternalMyDsl.g:1249:4: (lv_right_4_0= ruleArithmetiqueExp )
            // InternalMyDsl.g:1250:5: lv_right_4_0= ruleArithmetiqueExp
            {

            					newCompositeNode(grammarAccess.getSecondaryExpAri_ImplAccess().getRightArithmetiqueExpParserRuleCall_4_0());
            				
            pushFollow(FOLLOW_6);
            lv_right_4_0=ruleArithmetiqueExp();

            state._fsp--;


            					if (current==null) {
            						current = createModelElementForParent(grammarAccess.getSecondaryExpAri_ImplRule());
            					}
            					add(
            						current,
            						"right",
            						lv_right_4_0,
            						"org.xtext.example.mydsl.MyDsl.ArithmetiqueExp");
            					afterParserOrEnumRuleCall();
            				

            }


            }

            // InternalMyDsl.g:1267:3: (otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) ) )*
            loop14:
            do {
                int alt14=2;
                int LA14_0 = input.LA(1);

                if ( (LA14_0==14) ) {
                    alt14=1;
                }


                switch (alt14) {
            	case 1 :
            	    // InternalMyDsl.g:1268:4: otherlv_5= ',' ( (lv_right_6_0= ruleArithmetiqueExp ) )
            	    {
            	    otherlv_5=(Token)match(input,14,FOLLOW_11); 

            	    				newLeafNode(otherlv_5, grammarAccess.getSecondaryExpAri_ImplAccess().getCommaKeyword_5_0());
            	    			
            	    // InternalMyDsl.g:1272:4: ( (lv_right_6_0= ruleArithmetiqueExp ) )
            	    // InternalMyDsl.g:1273:5: (lv_right_6_0= ruleArithmetiqueExp )
            	    {
            	    // InternalMyDsl.g:1273:5: (lv_right_6_0= ruleArithmetiqueExp )
            	    // InternalMyDsl.g:1274:6: lv_right_6_0= ruleArithmetiqueExp
            	    {

            	    						newCompositeNode(grammarAccess.getSecondaryExpAri_ImplAccess().getRightArithmetiqueExpParserRuleCall_5_1_0());
            	    					
            	    pushFollow(FOLLOW_6);
            	    lv_right_6_0=ruleArithmetiqueExp();

            	    state._fsp--;


            	    						if (current==null) {
            	    							current = createModelElementForParent(grammarAccess.getSecondaryExpAri_ImplRule());
            	    						}
            	    						add(
            	    							current,
            	    							"right",
            	    							lv_right_6_0,
            	    							"org.xtext.example.mydsl.MyDsl.ArithmetiqueExp");
            	    						afterParserOrEnumRuleCall();
            	    					

            	    }


            	    }


            	    }
            	    break;

            	default :
            	    break loop14;
                }
            } while (true);

            otherlv_7=(Token)match(input,15,FOLLOW_12); 

            			newLeafNode(otherlv_7, grammarAccess.getSecondaryExpAri_ImplAccess().getRightCurlyBracketKeyword_6());
            		
            otherlv_8=(Token)match(input,22,FOLLOW_11); 

            			newLeafNode(otherlv_8, grammarAccess.getSecondaryExpAri_ImplAccess().getLeftKeyword_7());
            		
            // InternalMyDsl.g:1300:3: ( (lv_left_9_0= ruleArithmetiqueExp ) )
            // InternalMyDsl.g:1301:4: (lv_left_9_0= ruleArithmetiqueExp )
            {
            // InternalMyDsl.g:1301:4: (lv_left_9_0= ruleArithmetiqueExp )
            // InternalMyDsl.g:1302:5: lv_left_9_0= ruleArithmetiqueExp
            {

            					newCompositeNode(grammarAccess.getSecondaryExpAri_ImplAccess().getLeftArithmetiqueExpParserRuleCall_8_0());
            				
            pushFollow(FOLLOW_9);
            lv_left_9_0=ruleArithmetiqueExp();

            state._fsp--;


            					if (current==null) {
            						current = createModelElementForParent(grammarAccess.getSecondaryExpAri_ImplRule());
            					}
            					set(
            						current,
            						"left",
            						lv_left_9_0,
            						"org.xtext.example.mydsl.MyDsl.ArithmetiqueExp");
            					afterParserOrEnumRuleCall();
            				

            }


            }

            otherlv_10=(Token)match(input,15,FOLLOW_2); 

            			newLeafNode(otherlv_10, grammarAccess.getSecondaryExpAri_ImplAccess().getRightCurlyBracketKeyword_9());
            		

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
    // $ANTLR end "ruleSecondaryExpAri_Impl"


    // $ANTLR start "entryRuleCallFunction"
    // InternalMyDsl.g:1327:1: entryRuleCallFunction returns [EObject current=null] : iv_ruleCallFunction= ruleCallFunction EOF ;
    public final EObject entryRuleCallFunction() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleCallFunction = null;


        try {
            // InternalMyDsl.g:1327:53: (iv_ruleCallFunction= ruleCallFunction EOF )
            // InternalMyDsl.g:1328:2: iv_ruleCallFunction= ruleCallFunction EOF
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
    // InternalMyDsl.g:1334:1: ruleCallFunction returns [EObject current=null] : ( () otherlv_1= 'CallFunction' ) ;
    public final EObject ruleCallFunction() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;


        	enterRule();

        try {
            // InternalMyDsl.g:1340:2: ( ( () otherlv_1= 'CallFunction' ) )
            // InternalMyDsl.g:1341:2: ( () otherlv_1= 'CallFunction' )
            {
            // InternalMyDsl.g:1341:2: ( () otherlv_1= 'CallFunction' )
            // InternalMyDsl.g:1342:3: () otherlv_1= 'CallFunction'
            {
            // InternalMyDsl.g:1342:3: ()
            // InternalMyDsl.g:1343:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getCallFunctionAccess().getCallFunctionAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,30,FOLLOW_2); 

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


    // $ANTLR start "entryRulePrimaryExprBool"
    // InternalMyDsl.g:1357:1: entryRulePrimaryExprBool returns [EObject current=null] : iv_rulePrimaryExprBool= rulePrimaryExprBool EOF ;
    public final EObject entryRulePrimaryExprBool() throws RecognitionException {
        EObject current = null;

        EObject iv_rulePrimaryExprBool = null;


        try {
            // InternalMyDsl.g:1357:56: (iv_rulePrimaryExprBool= rulePrimaryExprBool EOF )
            // InternalMyDsl.g:1358:2: iv_rulePrimaryExprBool= rulePrimaryExprBool EOF
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
    // InternalMyDsl.g:1364:1: rulePrimaryExprBool returns [EObject current=null] : ( () otherlv_1= 'PrimaryExprBool' otherlv_2= '{' (otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) ) )? (otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) ) )? otherlv_7= '}' ) ;
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
            // InternalMyDsl.g:1370:2: ( ( () otherlv_1= 'PrimaryExprBool' otherlv_2= '{' (otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) ) )? (otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) ) )? otherlv_7= '}' ) )
            // InternalMyDsl.g:1371:2: ( () otherlv_1= 'PrimaryExprBool' otherlv_2= '{' (otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) ) )? (otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) ) )? otherlv_7= '}' )
            {
            // InternalMyDsl.g:1371:2: ( () otherlv_1= 'PrimaryExprBool' otherlv_2= '{' (otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) ) )? (otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) ) )? otherlv_7= '}' )
            // InternalMyDsl.g:1372:3: () otherlv_1= 'PrimaryExprBool' otherlv_2= '{' (otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) ) )? (otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) ) )? otherlv_7= '}'
            {
            // InternalMyDsl.g:1372:3: ()
            // InternalMyDsl.g:1373:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getPrimaryExprBoolAccess().getPrimaryExprBoolAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,31,FOLLOW_3); 

            			newLeafNode(otherlv_1, grammarAccess.getPrimaryExprBoolAccess().getPrimaryExprBoolKeyword_1());
            		
            otherlv_2=(Token)match(input,12,FOLLOW_13); 

            			newLeafNode(otherlv_2, grammarAccess.getPrimaryExprBoolAccess().getLeftCurlyBracketKeyword_2());
            		
            // InternalMyDsl.g:1387:3: (otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) ) )?
            int alt15=2;
            int LA15_0 = input.LA(1);

            if ( (LA15_0==27) ) {
                alt15=1;
            }
            switch (alt15) {
                case 1 :
                    // InternalMyDsl.g:1388:4: otherlv_3= 'type' ( (lv_type_4_0= ruleTypeClass ) )
                    {
                    otherlv_3=(Token)match(input,27,FOLLOW_14); 

                    				newLeafNode(otherlv_3, grammarAccess.getPrimaryExprBoolAccess().getTypeKeyword_3_0());
                    			
                    // InternalMyDsl.g:1392:4: ( (lv_type_4_0= ruleTypeClass ) )
                    // InternalMyDsl.g:1393:5: (lv_type_4_0= ruleTypeClass )
                    {
                    // InternalMyDsl.g:1393:5: (lv_type_4_0= ruleTypeClass )
                    // InternalMyDsl.g:1394:6: lv_type_4_0= ruleTypeClass
                    {

                    						newCompositeNode(grammarAccess.getPrimaryExprBoolAccess().getTypeTypeClassParserRuleCall_3_1_0());
                    					
                    pushFollow(FOLLOW_15);
                    lv_type_4_0=ruleTypeClass();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getPrimaryExprBoolRule());
                    						}
                    						set(
                    							current,
                    							"type",
                    							lv_type_4_0,
                    							"org.xtext.example.mydsl.MyDsl.TypeClass");
                    						afterParserOrEnumRuleCall();
                    					

                    }


                    }


                    }
                    break;

            }

            // InternalMyDsl.g:1412:3: (otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) ) )?
            int alt16=2;
            int LA16_0 = input.LA(1);

            if ( (LA16_0==28) ) {
                alt16=1;
            }
            switch (alt16) {
                case 1 :
                    // InternalMyDsl.g:1413:4: otherlv_5= 'call' ( (lv_call_6_0= ruleCall ) )
                    {
                    otherlv_5=(Token)match(input,28,FOLLOW_16); 

                    				newLeafNode(otherlv_5, grammarAccess.getPrimaryExprBoolAccess().getCallKeyword_4_0());
                    			
                    // InternalMyDsl.g:1417:4: ( (lv_call_6_0= ruleCall ) )
                    // InternalMyDsl.g:1418:5: (lv_call_6_0= ruleCall )
                    {
                    // InternalMyDsl.g:1418:5: (lv_call_6_0= ruleCall )
                    // InternalMyDsl.g:1419:6: lv_call_6_0= ruleCall
                    {

                    						newCompositeNode(grammarAccess.getPrimaryExprBoolAccess().getCallCallParserRuleCall_4_1_0());
                    					
                    pushFollow(FOLLOW_9);
                    lv_call_6_0=ruleCall();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getPrimaryExprBoolRule());
                    						}
                    						set(
                    							current,
                    							"call",
                    							lv_call_6_0,
                    							"org.xtext.example.mydsl.MyDsl.Call");
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


    // $ANTLR start "entryRuleSecondaryExpBool_Impl"
    // InternalMyDsl.g:1445:1: entryRuleSecondaryExpBool_Impl returns [EObject current=null] : iv_ruleSecondaryExpBool_Impl= ruleSecondaryExpBool_Impl EOF ;
    public final EObject entryRuleSecondaryExpBool_Impl() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleSecondaryExpBool_Impl = null;


        try {
            // InternalMyDsl.g:1445:62: (iv_ruleSecondaryExpBool_Impl= ruleSecondaryExpBool_Impl EOF )
            // InternalMyDsl.g:1446:2: iv_ruleSecondaryExpBool_Impl= ruleSecondaryExpBool_Impl EOF
            {
             newCompositeNode(grammarAccess.getSecondaryExpBool_ImplRule()); 
            pushFollow(FOLLOW_1);
            iv_ruleSecondaryExpBool_Impl=ruleSecondaryExpBool_Impl();

            state._fsp--;

             current =iv_ruleSecondaryExpBool_Impl; 
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
    // $ANTLR end "entryRuleSecondaryExpBool_Impl"


    // $ANTLR start "ruleSecondaryExpBool_Impl"
    // InternalMyDsl.g:1452:1: ruleSecondaryExpBool_Impl returns [EObject current=null] : (otherlv_0= 'SecondaryExpBool' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleBooleanExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleBooleanExp ) ) otherlv_10= '}' ) ;
    public final EObject ruleSecondaryExpBool_Impl() throws RecognitionException {
        EObject current = null;

        Token otherlv_0=null;
        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_5=null;
        Token otherlv_7=null;
        Token otherlv_8=null;
        Token otherlv_10=null;
        EObject lv_right_4_0 = null;

        EObject lv_right_6_0 = null;

        EObject lv_left_9_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:1458:2: ( (otherlv_0= 'SecondaryExpBool' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleBooleanExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleBooleanExp ) ) otherlv_10= '}' ) )
            // InternalMyDsl.g:1459:2: (otherlv_0= 'SecondaryExpBool' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleBooleanExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleBooleanExp ) ) otherlv_10= '}' )
            {
            // InternalMyDsl.g:1459:2: (otherlv_0= 'SecondaryExpBool' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleBooleanExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleBooleanExp ) ) otherlv_10= '}' )
            // InternalMyDsl.g:1460:3: otherlv_0= 'SecondaryExpBool' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleBooleanExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleBooleanExp ) ) otherlv_10= '}'
            {
            otherlv_0=(Token)match(input,32,FOLLOW_3); 

            			newLeafNode(otherlv_0, grammarAccess.getSecondaryExpBool_ImplAccess().getSecondaryExpBoolKeyword_0());
            		
            otherlv_1=(Token)match(input,12,FOLLOW_10); 

            			newLeafNode(otherlv_1, grammarAccess.getSecondaryExpBool_ImplAccess().getLeftCurlyBracketKeyword_1());
            		
            otherlv_2=(Token)match(input,21,FOLLOW_3); 

            			newLeafNode(otherlv_2, grammarAccess.getSecondaryExpBool_ImplAccess().getRightKeyword_2());
            		
            otherlv_3=(Token)match(input,12,FOLLOW_5); 

            			newLeafNode(otherlv_3, grammarAccess.getSecondaryExpBool_ImplAccess().getLeftCurlyBracketKeyword_3());
            		
            // InternalMyDsl.g:1476:3: ( (lv_right_4_0= ruleBooleanExp ) )
            // InternalMyDsl.g:1477:4: (lv_right_4_0= ruleBooleanExp )
            {
            // InternalMyDsl.g:1477:4: (lv_right_4_0= ruleBooleanExp )
            // InternalMyDsl.g:1478:5: lv_right_4_0= ruleBooleanExp
            {

            					newCompositeNode(grammarAccess.getSecondaryExpBool_ImplAccess().getRightBooleanExpParserRuleCall_4_0());
            				
            pushFollow(FOLLOW_6);
            lv_right_4_0=ruleBooleanExp();

            state._fsp--;


            					if (current==null) {
            						current = createModelElementForParent(grammarAccess.getSecondaryExpBool_ImplRule());
            					}
            					add(
            						current,
            						"right",
            						lv_right_4_0,
            						"org.xtext.example.mydsl.MyDsl.BooleanExp");
            					afterParserOrEnumRuleCall();
            				

            }


            }

            // InternalMyDsl.g:1495:3: (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )*
            loop17:
            do {
                int alt17=2;
                int LA17_0 = input.LA(1);

                if ( (LA17_0==14) ) {
                    alt17=1;
                }


                switch (alt17) {
            	case 1 :
            	    // InternalMyDsl.g:1496:4: otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) )
            	    {
            	    otherlv_5=(Token)match(input,14,FOLLOW_5); 

            	    				newLeafNode(otherlv_5, grammarAccess.getSecondaryExpBool_ImplAccess().getCommaKeyword_5_0());
            	    			
            	    // InternalMyDsl.g:1500:4: ( (lv_right_6_0= ruleBooleanExp ) )
            	    // InternalMyDsl.g:1501:5: (lv_right_6_0= ruleBooleanExp )
            	    {
            	    // InternalMyDsl.g:1501:5: (lv_right_6_0= ruleBooleanExp )
            	    // InternalMyDsl.g:1502:6: lv_right_6_0= ruleBooleanExp
            	    {

            	    						newCompositeNode(grammarAccess.getSecondaryExpBool_ImplAccess().getRightBooleanExpParserRuleCall_5_1_0());
            	    					
            	    pushFollow(FOLLOW_6);
            	    lv_right_6_0=ruleBooleanExp();

            	    state._fsp--;


            	    						if (current==null) {
            	    							current = createModelElementForParent(grammarAccess.getSecondaryExpBool_ImplRule());
            	    						}
            	    						add(
            	    							current,
            	    							"right",
            	    							lv_right_6_0,
            	    							"org.xtext.example.mydsl.MyDsl.BooleanExp");
            	    						afterParserOrEnumRuleCall();
            	    					

            	    }


            	    }


            	    }
            	    break;

            	default :
            	    break loop17;
                }
            } while (true);

            otherlv_7=(Token)match(input,15,FOLLOW_12); 

            			newLeafNode(otherlv_7, grammarAccess.getSecondaryExpBool_ImplAccess().getRightCurlyBracketKeyword_6());
            		
            otherlv_8=(Token)match(input,22,FOLLOW_5); 

            			newLeafNode(otherlv_8, grammarAccess.getSecondaryExpBool_ImplAccess().getLeftKeyword_7());
            		
            // InternalMyDsl.g:1528:3: ( (lv_left_9_0= ruleBooleanExp ) )
            // InternalMyDsl.g:1529:4: (lv_left_9_0= ruleBooleanExp )
            {
            // InternalMyDsl.g:1529:4: (lv_left_9_0= ruleBooleanExp )
            // InternalMyDsl.g:1530:5: lv_left_9_0= ruleBooleanExp
            {

            					newCompositeNode(grammarAccess.getSecondaryExpBool_ImplAccess().getLeftBooleanExpParserRuleCall_8_0());
            				
            pushFollow(FOLLOW_9);
            lv_left_9_0=ruleBooleanExp();

            state._fsp--;


            					if (current==null) {
            						current = createModelElementForParent(grammarAccess.getSecondaryExpBool_ImplRule());
            					}
            					set(
            						current,
            						"left",
            						lv_left_9_0,
            						"org.xtext.example.mydsl.MyDsl.BooleanExp");
            					afterParserOrEnumRuleCall();
            				

            }


            }

            otherlv_10=(Token)match(input,15,FOLLOW_2); 

            			newLeafNode(otherlv_10, grammarAccess.getSecondaryExpBool_ImplAccess().getRightCurlyBracketKeyword_9());
            		

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
    // $ANTLR end "ruleSecondaryExpBool_Impl"


    // $ANTLR start "entryRuleAnd"
    // InternalMyDsl.g:1555:1: entryRuleAnd returns [EObject current=null] : iv_ruleAnd= ruleAnd EOF ;
    public final EObject entryRuleAnd() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleAnd = null;


        try {
            // InternalMyDsl.g:1555:44: (iv_ruleAnd= ruleAnd EOF )
            // InternalMyDsl.g:1556:2: iv_ruleAnd= ruleAnd EOF
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
    // InternalMyDsl.g:1562:1: ruleAnd returns [EObject current=null] : (otherlv_0= 'And' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleBooleanExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleBooleanExp ) ) otherlv_10= '}' ) ;
    public final EObject ruleAnd() throws RecognitionException {
        EObject current = null;

        Token otherlv_0=null;
        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_5=null;
        Token otherlv_7=null;
        Token otherlv_8=null;
        Token otherlv_10=null;
        EObject lv_right_4_0 = null;

        EObject lv_right_6_0 = null;

        EObject lv_left_9_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:1568:2: ( (otherlv_0= 'And' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleBooleanExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleBooleanExp ) ) otherlv_10= '}' ) )
            // InternalMyDsl.g:1569:2: (otherlv_0= 'And' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleBooleanExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleBooleanExp ) ) otherlv_10= '}' )
            {
            // InternalMyDsl.g:1569:2: (otherlv_0= 'And' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleBooleanExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleBooleanExp ) ) otherlv_10= '}' )
            // InternalMyDsl.g:1570:3: otherlv_0= 'And' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleBooleanExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleBooleanExp ) ) otherlv_10= '}'
            {
            otherlv_0=(Token)match(input,33,FOLLOW_3); 

            			newLeafNode(otherlv_0, grammarAccess.getAndAccess().getAndKeyword_0());
            		
            otherlv_1=(Token)match(input,12,FOLLOW_10); 

            			newLeafNode(otherlv_1, grammarAccess.getAndAccess().getLeftCurlyBracketKeyword_1());
            		
            otherlv_2=(Token)match(input,21,FOLLOW_3); 

            			newLeafNode(otherlv_2, grammarAccess.getAndAccess().getRightKeyword_2());
            		
            otherlv_3=(Token)match(input,12,FOLLOW_5); 

            			newLeafNode(otherlv_3, grammarAccess.getAndAccess().getLeftCurlyBracketKeyword_3());
            		
            // InternalMyDsl.g:1586:3: ( (lv_right_4_0= ruleBooleanExp ) )
            // InternalMyDsl.g:1587:4: (lv_right_4_0= ruleBooleanExp )
            {
            // InternalMyDsl.g:1587:4: (lv_right_4_0= ruleBooleanExp )
            // InternalMyDsl.g:1588:5: lv_right_4_0= ruleBooleanExp
            {

            					newCompositeNode(grammarAccess.getAndAccess().getRightBooleanExpParserRuleCall_4_0());
            				
            pushFollow(FOLLOW_6);
            lv_right_4_0=ruleBooleanExp();

            state._fsp--;


            					if (current==null) {
            						current = createModelElementForParent(grammarAccess.getAndRule());
            					}
            					add(
            						current,
            						"right",
            						lv_right_4_0,
            						"org.xtext.example.mydsl.MyDsl.BooleanExp");
            					afterParserOrEnumRuleCall();
            				

            }


            }

            // InternalMyDsl.g:1605:3: (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )*
            loop18:
            do {
                int alt18=2;
                int LA18_0 = input.LA(1);

                if ( (LA18_0==14) ) {
                    alt18=1;
                }


                switch (alt18) {
            	case 1 :
            	    // InternalMyDsl.g:1606:4: otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) )
            	    {
            	    otherlv_5=(Token)match(input,14,FOLLOW_5); 

            	    				newLeafNode(otherlv_5, grammarAccess.getAndAccess().getCommaKeyword_5_0());
            	    			
            	    // InternalMyDsl.g:1610:4: ( (lv_right_6_0= ruleBooleanExp ) )
            	    // InternalMyDsl.g:1611:5: (lv_right_6_0= ruleBooleanExp )
            	    {
            	    // InternalMyDsl.g:1611:5: (lv_right_6_0= ruleBooleanExp )
            	    // InternalMyDsl.g:1612:6: lv_right_6_0= ruleBooleanExp
            	    {

            	    						newCompositeNode(grammarAccess.getAndAccess().getRightBooleanExpParserRuleCall_5_1_0());
            	    					
            	    pushFollow(FOLLOW_6);
            	    lv_right_6_0=ruleBooleanExp();

            	    state._fsp--;


            	    						if (current==null) {
            	    							current = createModelElementForParent(grammarAccess.getAndRule());
            	    						}
            	    						add(
            	    							current,
            	    							"right",
            	    							lv_right_6_0,
            	    							"org.xtext.example.mydsl.MyDsl.BooleanExp");
            	    						afterParserOrEnumRuleCall();
            	    					

            	    }


            	    }


            	    }
            	    break;

            	default :
            	    break loop18;
                }
            } while (true);

            otherlv_7=(Token)match(input,15,FOLLOW_12); 

            			newLeafNode(otherlv_7, grammarAccess.getAndAccess().getRightCurlyBracketKeyword_6());
            		
            otherlv_8=(Token)match(input,22,FOLLOW_5); 

            			newLeafNode(otherlv_8, grammarAccess.getAndAccess().getLeftKeyword_7());
            		
            // InternalMyDsl.g:1638:3: ( (lv_left_9_0= ruleBooleanExp ) )
            // InternalMyDsl.g:1639:4: (lv_left_9_0= ruleBooleanExp )
            {
            // InternalMyDsl.g:1639:4: (lv_left_9_0= ruleBooleanExp )
            // InternalMyDsl.g:1640:5: lv_left_9_0= ruleBooleanExp
            {

            					newCompositeNode(grammarAccess.getAndAccess().getLeftBooleanExpParserRuleCall_8_0());
            				
            pushFollow(FOLLOW_9);
            lv_left_9_0=ruleBooleanExp();

            state._fsp--;


            					if (current==null) {
            						current = createModelElementForParent(grammarAccess.getAndRule());
            					}
            					set(
            						current,
            						"left",
            						lv_left_9_0,
            						"org.xtext.example.mydsl.MyDsl.BooleanExp");
            					afterParserOrEnumRuleCall();
            				

            }


            }

            otherlv_10=(Token)match(input,15,FOLLOW_2); 

            			newLeafNode(otherlv_10, grammarAccess.getAndAccess().getRightCurlyBracketKeyword_9());
            		

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
    // InternalMyDsl.g:1665:1: entryRuleOr returns [EObject current=null] : iv_ruleOr= ruleOr EOF ;
    public final EObject entryRuleOr() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleOr = null;


        try {
            // InternalMyDsl.g:1665:43: (iv_ruleOr= ruleOr EOF )
            // InternalMyDsl.g:1666:2: iv_ruleOr= ruleOr EOF
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
    // InternalMyDsl.g:1672:1: ruleOr returns [EObject current=null] : (otherlv_0= 'Or' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleBooleanExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleBooleanExp ) ) otherlv_10= '}' ) ;
    public final EObject ruleOr() throws RecognitionException {
        EObject current = null;

        Token otherlv_0=null;
        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_5=null;
        Token otherlv_7=null;
        Token otherlv_8=null;
        Token otherlv_10=null;
        EObject lv_right_4_0 = null;

        EObject lv_right_6_0 = null;

        EObject lv_left_9_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:1678:2: ( (otherlv_0= 'Or' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleBooleanExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleBooleanExp ) ) otherlv_10= '}' ) )
            // InternalMyDsl.g:1679:2: (otherlv_0= 'Or' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleBooleanExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleBooleanExp ) ) otherlv_10= '}' )
            {
            // InternalMyDsl.g:1679:2: (otherlv_0= 'Or' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleBooleanExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleBooleanExp ) ) otherlv_10= '}' )
            // InternalMyDsl.g:1680:3: otherlv_0= 'Or' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleBooleanExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleBooleanExp ) ) otherlv_10= '}'
            {
            otherlv_0=(Token)match(input,34,FOLLOW_3); 

            			newLeafNode(otherlv_0, grammarAccess.getOrAccess().getOrKeyword_0());
            		
            otherlv_1=(Token)match(input,12,FOLLOW_10); 

            			newLeafNode(otherlv_1, grammarAccess.getOrAccess().getLeftCurlyBracketKeyword_1());
            		
            otherlv_2=(Token)match(input,21,FOLLOW_3); 

            			newLeafNode(otherlv_2, grammarAccess.getOrAccess().getRightKeyword_2());
            		
            otherlv_3=(Token)match(input,12,FOLLOW_5); 

            			newLeafNode(otherlv_3, grammarAccess.getOrAccess().getLeftCurlyBracketKeyword_3());
            		
            // InternalMyDsl.g:1696:3: ( (lv_right_4_0= ruleBooleanExp ) )
            // InternalMyDsl.g:1697:4: (lv_right_4_0= ruleBooleanExp )
            {
            // InternalMyDsl.g:1697:4: (lv_right_4_0= ruleBooleanExp )
            // InternalMyDsl.g:1698:5: lv_right_4_0= ruleBooleanExp
            {

            					newCompositeNode(grammarAccess.getOrAccess().getRightBooleanExpParserRuleCall_4_0());
            				
            pushFollow(FOLLOW_6);
            lv_right_4_0=ruleBooleanExp();

            state._fsp--;


            					if (current==null) {
            						current = createModelElementForParent(grammarAccess.getOrRule());
            					}
            					add(
            						current,
            						"right",
            						lv_right_4_0,
            						"org.xtext.example.mydsl.MyDsl.BooleanExp");
            					afterParserOrEnumRuleCall();
            				

            }


            }

            // InternalMyDsl.g:1715:3: (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )*
            loop19:
            do {
                int alt19=2;
                int LA19_0 = input.LA(1);

                if ( (LA19_0==14) ) {
                    alt19=1;
                }


                switch (alt19) {
            	case 1 :
            	    // InternalMyDsl.g:1716:4: otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) )
            	    {
            	    otherlv_5=(Token)match(input,14,FOLLOW_5); 

            	    				newLeafNode(otherlv_5, grammarAccess.getOrAccess().getCommaKeyword_5_0());
            	    			
            	    // InternalMyDsl.g:1720:4: ( (lv_right_6_0= ruleBooleanExp ) )
            	    // InternalMyDsl.g:1721:5: (lv_right_6_0= ruleBooleanExp )
            	    {
            	    // InternalMyDsl.g:1721:5: (lv_right_6_0= ruleBooleanExp )
            	    // InternalMyDsl.g:1722:6: lv_right_6_0= ruleBooleanExp
            	    {

            	    						newCompositeNode(grammarAccess.getOrAccess().getRightBooleanExpParserRuleCall_5_1_0());
            	    					
            	    pushFollow(FOLLOW_6);
            	    lv_right_6_0=ruleBooleanExp();

            	    state._fsp--;


            	    						if (current==null) {
            	    							current = createModelElementForParent(grammarAccess.getOrRule());
            	    						}
            	    						add(
            	    							current,
            	    							"right",
            	    							lv_right_6_0,
            	    							"org.xtext.example.mydsl.MyDsl.BooleanExp");
            	    						afterParserOrEnumRuleCall();
            	    					

            	    }


            	    }


            	    }
            	    break;

            	default :
            	    break loop19;
                }
            } while (true);

            otherlv_7=(Token)match(input,15,FOLLOW_12); 

            			newLeafNode(otherlv_7, grammarAccess.getOrAccess().getRightCurlyBracketKeyword_6());
            		
            otherlv_8=(Token)match(input,22,FOLLOW_5); 

            			newLeafNode(otherlv_8, grammarAccess.getOrAccess().getLeftKeyword_7());
            		
            // InternalMyDsl.g:1748:3: ( (lv_left_9_0= ruleBooleanExp ) )
            // InternalMyDsl.g:1749:4: (lv_left_9_0= ruleBooleanExp )
            {
            // InternalMyDsl.g:1749:4: (lv_left_9_0= ruleBooleanExp )
            // InternalMyDsl.g:1750:5: lv_left_9_0= ruleBooleanExp
            {

            					newCompositeNode(grammarAccess.getOrAccess().getLeftBooleanExpParserRuleCall_8_0());
            				
            pushFollow(FOLLOW_9);
            lv_left_9_0=ruleBooleanExp();

            state._fsp--;


            					if (current==null) {
            						current = createModelElementForParent(grammarAccess.getOrRule());
            					}
            					set(
            						current,
            						"left",
            						lv_left_9_0,
            						"org.xtext.example.mydsl.MyDsl.BooleanExp");
            					afterParserOrEnumRuleCall();
            				

            }


            }

            otherlv_10=(Token)match(input,15,FOLLOW_2); 

            			newLeafNode(otherlv_10, grammarAccess.getOrAccess().getRightCurlyBracketKeyword_9());
            		

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
    // InternalMyDsl.g:1775:1: entryRuleNot returns [EObject current=null] : iv_ruleNot= ruleNot EOF ;
    public final EObject entryRuleNot() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleNot = null;


        try {
            // InternalMyDsl.g:1775:44: (iv_ruleNot= ruleNot EOF )
            // InternalMyDsl.g:1776:2: iv_ruleNot= ruleNot EOF
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
    // InternalMyDsl.g:1782:1: ruleNot returns [EObject current=null] : (otherlv_0= 'Not' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleBooleanExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleBooleanExp ) ) otherlv_10= '}' ) ;
    public final EObject ruleNot() throws RecognitionException {
        EObject current = null;

        Token otherlv_0=null;
        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_5=null;
        Token otherlv_7=null;
        Token otherlv_8=null;
        Token otherlv_10=null;
        EObject lv_right_4_0 = null;

        EObject lv_right_6_0 = null;

        EObject lv_left_9_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:1788:2: ( (otherlv_0= 'Not' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleBooleanExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleBooleanExp ) ) otherlv_10= '}' ) )
            // InternalMyDsl.g:1789:2: (otherlv_0= 'Not' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleBooleanExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleBooleanExp ) ) otherlv_10= '}' )
            {
            // InternalMyDsl.g:1789:2: (otherlv_0= 'Not' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleBooleanExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleBooleanExp ) ) otherlv_10= '}' )
            // InternalMyDsl.g:1790:3: otherlv_0= 'Not' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleBooleanExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleBooleanExp ) ) otherlv_10= '}'
            {
            otherlv_0=(Token)match(input,35,FOLLOW_3); 

            			newLeafNode(otherlv_0, grammarAccess.getNotAccess().getNotKeyword_0());
            		
            otherlv_1=(Token)match(input,12,FOLLOW_10); 

            			newLeafNode(otherlv_1, grammarAccess.getNotAccess().getLeftCurlyBracketKeyword_1());
            		
            otherlv_2=(Token)match(input,21,FOLLOW_3); 

            			newLeafNode(otherlv_2, grammarAccess.getNotAccess().getRightKeyword_2());
            		
            otherlv_3=(Token)match(input,12,FOLLOW_5); 

            			newLeafNode(otherlv_3, grammarAccess.getNotAccess().getLeftCurlyBracketKeyword_3());
            		
            // InternalMyDsl.g:1806:3: ( (lv_right_4_0= ruleBooleanExp ) )
            // InternalMyDsl.g:1807:4: (lv_right_4_0= ruleBooleanExp )
            {
            // InternalMyDsl.g:1807:4: (lv_right_4_0= ruleBooleanExp )
            // InternalMyDsl.g:1808:5: lv_right_4_0= ruleBooleanExp
            {

            					newCompositeNode(grammarAccess.getNotAccess().getRightBooleanExpParserRuleCall_4_0());
            				
            pushFollow(FOLLOW_6);
            lv_right_4_0=ruleBooleanExp();

            state._fsp--;


            					if (current==null) {
            						current = createModelElementForParent(grammarAccess.getNotRule());
            					}
            					add(
            						current,
            						"right",
            						lv_right_4_0,
            						"org.xtext.example.mydsl.MyDsl.BooleanExp");
            					afterParserOrEnumRuleCall();
            				

            }


            }

            // InternalMyDsl.g:1825:3: (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )*
            loop20:
            do {
                int alt20=2;
                int LA20_0 = input.LA(1);

                if ( (LA20_0==14) ) {
                    alt20=1;
                }


                switch (alt20) {
            	case 1 :
            	    // InternalMyDsl.g:1826:4: otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) )
            	    {
            	    otherlv_5=(Token)match(input,14,FOLLOW_5); 

            	    				newLeafNode(otherlv_5, grammarAccess.getNotAccess().getCommaKeyword_5_0());
            	    			
            	    // InternalMyDsl.g:1830:4: ( (lv_right_6_0= ruleBooleanExp ) )
            	    // InternalMyDsl.g:1831:5: (lv_right_6_0= ruleBooleanExp )
            	    {
            	    // InternalMyDsl.g:1831:5: (lv_right_6_0= ruleBooleanExp )
            	    // InternalMyDsl.g:1832:6: lv_right_6_0= ruleBooleanExp
            	    {

            	    						newCompositeNode(grammarAccess.getNotAccess().getRightBooleanExpParserRuleCall_5_1_0());
            	    					
            	    pushFollow(FOLLOW_6);
            	    lv_right_6_0=ruleBooleanExp();

            	    state._fsp--;


            	    						if (current==null) {
            	    							current = createModelElementForParent(grammarAccess.getNotRule());
            	    						}
            	    						add(
            	    							current,
            	    							"right",
            	    							lv_right_6_0,
            	    							"org.xtext.example.mydsl.MyDsl.BooleanExp");
            	    						afterParserOrEnumRuleCall();
            	    					

            	    }


            	    }


            	    }
            	    break;

            	default :
            	    break loop20;
                }
            } while (true);

            otherlv_7=(Token)match(input,15,FOLLOW_12); 

            			newLeafNode(otherlv_7, grammarAccess.getNotAccess().getRightCurlyBracketKeyword_6());
            		
            otherlv_8=(Token)match(input,22,FOLLOW_5); 

            			newLeafNode(otherlv_8, grammarAccess.getNotAccess().getLeftKeyword_7());
            		
            // InternalMyDsl.g:1858:3: ( (lv_left_9_0= ruleBooleanExp ) )
            // InternalMyDsl.g:1859:4: (lv_left_9_0= ruleBooleanExp )
            {
            // InternalMyDsl.g:1859:4: (lv_left_9_0= ruleBooleanExp )
            // InternalMyDsl.g:1860:5: lv_left_9_0= ruleBooleanExp
            {

            					newCompositeNode(grammarAccess.getNotAccess().getLeftBooleanExpParserRuleCall_8_0());
            				
            pushFollow(FOLLOW_9);
            lv_left_9_0=ruleBooleanExp();

            state._fsp--;


            					if (current==null) {
            						current = createModelElementForParent(grammarAccess.getNotRule());
            					}
            					set(
            						current,
            						"left",
            						lv_left_9_0,
            						"org.xtext.example.mydsl.MyDsl.BooleanExp");
            					afterParserOrEnumRuleCall();
            				

            }


            }

            otherlv_10=(Token)match(input,15,FOLLOW_2); 

            			newLeafNode(otherlv_10, grammarAccess.getNotAccess().getRightCurlyBracketKeyword_9());
            		

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
    // InternalMyDsl.g:1885:1: entryRuleEquals returns [EObject current=null] : iv_ruleEquals= ruleEquals EOF ;
    public final EObject entryRuleEquals() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleEquals = null;


        try {
            // InternalMyDsl.g:1885:47: (iv_ruleEquals= ruleEquals EOF )
            // InternalMyDsl.g:1886:2: iv_ruleEquals= ruleEquals EOF
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
    // InternalMyDsl.g:1892:1: ruleEquals returns [EObject current=null] : (otherlv_0= 'Equals' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleBooleanExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleBooleanExp ) ) otherlv_10= '}' ) ;
    public final EObject ruleEquals() throws RecognitionException {
        EObject current = null;

        Token otherlv_0=null;
        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_5=null;
        Token otherlv_7=null;
        Token otherlv_8=null;
        Token otherlv_10=null;
        EObject lv_right_4_0 = null;

        EObject lv_right_6_0 = null;

        EObject lv_left_9_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:1898:2: ( (otherlv_0= 'Equals' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleBooleanExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleBooleanExp ) ) otherlv_10= '}' ) )
            // InternalMyDsl.g:1899:2: (otherlv_0= 'Equals' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleBooleanExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleBooleanExp ) ) otherlv_10= '}' )
            {
            // InternalMyDsl.g:1899:2: (otherlv_0= 'Equals' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleBooleanExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleBooleanExp ) ) otherlv_10= '}' )
            // InternalMyDsl.g:1900:3: otherlv_0= 'Equals' otherlv_1= '{' otherlv_2= 'right' otherlv_3= '{' ( (lv_right_4_0= ruleBooleanExp ) ) (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )* otherlv_7= '}' otherlv_8= 'left' ( (lv_left_9_0= ruleBooleanExp ) ) otherlv_10= '}'
            {
            otherlv_0=(Token)match(input,36,FOLLOW_3); 

            			newLeafNode(otherlv_0, grammarAccess.getEqualsAccess().getEqualsKeyword_0());
            		
            otherlv_1=(Token)match(input,12,FOLLOW_10); 

            			newLeafNode(otherlv_1, grammarAccess.getEqualsAccess().getLeftCurlyBracketKeyword_1());
            		
            otherlv_2=(Token)match(input,21,FOLLOW_3); 

            			newLeafNode(otherlv_2, grammarAccess.getEqualsAccess().getRightKeyword_2());
            		
            otherlv_3=(Token)match(input,12,FOLLOW_5); 

            			newLeafNode(otherlv_3, grammarAccess.getEqualsAccess().getLeftCurlyBracketKeyword_3());
            		
            // InternalMyDsl.g:1916:3: ( (lv_right_4_0= ruleBooleanExp ) )
            // InternalMyDsl.g:1917:4: (lv_right_4_0= ruleBooleanExp )
            {
            // InternalMyDsl.g:1917:4: (lv_right_4_0= ruleBooleanExp )
            // InternalMyDsl.g:1918:5: lv_right_4_0= ruleBooleanExp
            {

            					newCompositeNode(grammarAccess.getEqualsAccess().getRightBooleanExpParserRuleCall_4_0());
            				
            pushFollow(FOLLOW_6);
            lv_right_4_0=ruleBooleanExp();

            state._fsp--;


            					if (current==null) {
            						current = createModelElementForParent(grammarAccess.getEqualsRule());
            					}
            					add(
            						current,
            						"right",
            						lv_right_4_0,
            						"org.xtext.example.mydsl.MyDsl.BooleanExp");
            					afterParserOrEnumRuleCall();
            				

            }


            }

            // InternalMyDsl.g:1935:3: (otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) ) )*
            loop21:
            do {
                int alt21=2;
                int LA21_0 = input.LA(1);

                if ( (LA21_0==14) ) {
                    alt21=1;
                }


                switch (alt21) {
            	case 1 :
            	    // InternalMyDsl.g:1936:4: otherlv_5= ',' ( (lv_right_6_0= ruleBooleanExp ) )
            	    {
            	    otherlv_5=(Token)match(input,14,FOLLOW_5); 

            	    				newLeafNode(otherlv_5, grammarAccess.getEqualsAccess().getCommaKeyword_5_0());
            	    			
            	    // InternalMyDsl.g:1940:4: ( (lv_right_6_0= ruleBooleanExp ) )
            	    // InternalMyDsl.g:1941:5: (lv_right_6_0= ruleBooleanExp )
            	    {
            	    // InternalMyDsl.g:1941:5: (lv_right_6_0= ruleBooleanExp )
            	    // InternalMyDsl.g:1942:6: lv_right_6_0= ruleBooleanExp
            	    {

            	    						newCompositeNode(grammarAccess.getEqualsAccess().getRightBooleanExpParserRuleCall_5_1_0());
            	    					
            	    pushFollow(FOLLOW_6);
            	    lv_right_6_0=ruleBooleanExp();

            	    state._fsp--;


            	    						if (current==null) {
            	    							current = createModelElementForParent(grammarAccess.getEqualsRule());
            	    						}
            	    						add(
            	    							current,
            	    							"right",
            	    							lv_right_6_0,
            	    							"org.xtext.example.mydsl.MyDsl.BooleanExp");
            	    						afterParserOrEnumRuleCall();
            	    					

            	    }


            	    }


            	    }
            	    break;

            	default :
            	    break loop21;
                }
            } while (true);

            otherlv_7=(Token)match(input,15,FOLLOW_12); 

            			newLeafNode(otherlv_7, grammarAccess.getEqualsAccess().getRightCurlyBracketKeyword_6());
            		
            otherlv_8=(Token)match(input,22,FOLLOW_5); 

            			newLeafNode(otherlv_8, grammarAccess.getEqualsAccess().getLeftKeyword_7());
            		
            // InternalMyDsl.g:1968:3: ( (lv_left_9_0= ruleBooleanExp ) )
            // InternalMyDsl.g:1969:4: (lv_left_9_0= ruleBooleanExp )
            {
            // InternalMyDsl.g:1969:4: (lv_left_9_0= ruleBooleanExp )
            // InternalMyDsl.g:1970:5: lv_left_9_0= ruleBooleanExp
            {

            					newCompositeNode(grammarAccess.getEqualsAccess().getLeftBooleanExpParserRuleCall_8_0());
            				
            pushFollow(FOLLOW_9);
            lv_left_9_0=ruleBooleanExp();

            state._fsp--;


            					if (current==null) {
            						current = createModelElementForParent(grammarAccess.getEqualsRule());
            					}
            					set(
            						current,
            						"left",
            						lv_left_9_0,
            						"org.xtext.example.mydsl.MyDsl.BooleanExp");
            					afterParserOrEnumRuleCall();
            				

            }


            }

            otherlv_10=(Token)match(input,15,FOLLOW_2); 

            			newLeafNode(otherlv_10, grammarAccess.getEqualsAccess().getRightCurlyBracketKeyword_9());
            		

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


    // $ANTLR start "entryRuleCM"
    // InternalMyDsl.g:1995:1: entryRuleCM returns [EObject current=null] : iv_ruleCM= ruleCM EOF ;
    public final EObject entryRuleCM() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleCM = null;


        try {
            // InternalMyDsl.g:1995:43: (iv_ruleCM= ruleCM EOF )
            // InternalMyDsl.g:1996:2: iv_ruleCM= ruleCM EOF
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
    // InternalMyDsl.g:2002:1: ruleCM returns [EObject current=null] : ( () otherlv_1= 'CM' otherlv_2= '{' (otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) ) )? otherlv_5= '}' ) ;
    public final EObject ruleCM() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_5=null;
        AntlrDatatypeRuleToken lv_distance_4_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:2008:2: ( ( () otherlv_1= 'CM' otherlv_2= '{' (otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) ) )? otherlv_5= '}' ) )
            // InternalMyDsl.g:2009:2: ( () otherlv_1= 'CM' otherlv_2= '{' (otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) ) )? otherlv_5= '}' )
            {
            // InternalMyDsl.g:2009:2: ( () otherlv_1= 'CM' otherlv_2= '{' (otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) ) )? otherlv_5= '}' )
            // InternalMyDsl.g:2010:3: () otherlv_1= 'CM' otherlv_2= '{' (otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) ) )? otherlv_5= '}'
            {
            // InternalMyDsl.g:2010:3: ()
            // InternalMyDsl.g:2011:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getCMAccess().getCMAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,37,FOLLOW_3); 

            			newLeafNode(otherlv_1, grammarAccess.getCMAccess().getCMKeyword_1());
            		
            otherlv_2=(Token)match(input,12,FOLLOW_17); 

            			newLeafNode(otherlv_2, grammarAccess.getCMAccess().getLeftCurlyBracketKeyword_2());
            		
            // InternalMyDsl.g:2025:3: (otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) ) )?
            int alt22=2;
            int LA22_0 = input.LA(1);

            if ( (LA22_0==38) ) {
                alt22=1;
            }
            switch (alt22) {
                case 1 :
                    // InternalMyDsl.g:2026:4: otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) )
                    {
                    otherlv_3=(Token)match(input,38,FOLLOW_18); 

                    				newLeafNode(otherlv_3, grammarAccess.getCMAccess().getDistanceKeyword_3_0());
                    			
                    // InternalMyDsl.g:2030:4: ( (lv_distance_4_0= ruleEDouble ) )
                    // InternalMyDsl.g:2031:5: (lv_distance_4_0= ruleEDouble )
                    {
                    // InternalMyDsl.g:2031:5: (lv_distance_4_0= ruleEDouble )
                    // InternalMyDsl.g:2032:6: lv_distance_4_0= ruleEDouble
                    {

                    						newCompositeNode(grammarAccess.getCMAccess().getDistanceEDoubleParserRuleCall_3_1_0());
                    					
                    pushFollow(FOLLOW_9);
                    lv_distance_4_0=ruleEDouble();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getCMRule());
                    						}
                    						set(
                    							current,
                    							"distance",
                    							lv_distance_4_0,
                    							"org.xtext.example.mydsl.MyDsl.EDouble");
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
    // InternalMyDsl.g:2058:1: entryRulemm returns [EObject current=null] : iv_rulemm= rulemm EOF ;
    public final EObject entryRulemm() throws RecognitionException {
        EObject current = null;

        EObject iv_rulemm = null;


        try {
            // InternalMyDsl.g:2058:43: (iv_rulemm= rulemm EOF )
            // InternalMyDsl.g:2059:2: iv_rulemm= rulemm EOF
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
    // InternalMyDsl.g:2065:1: rulemm returns [EObject current=null] : ( () otherlv_1= 'mm' otherlv_2= '{' (otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) ) )? otherlv_5= '}' ) ;
    public final EObject rulemm() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_5=null;
        AntlrDatatypeRuleToken lv_distance_4_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:2071:2: ( ( () otherlv_1= 'mm' otherlv_2= '{' (otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) ) )? otherlv_5= '}' ) )
            // InternalMyDsl.g:2072:2: ( () otherlv_1= 'mm' otherlv_2= '{' (otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) ) )? otherlv_5= '}' )
            {
            // InternalMyDsl.g:2072:2: ( () otherlv_1= 'mm' otherlv_2= '{' (otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) ) )? otherlv_5= '}' )
            // InternalMyDsl.g:2073:3: () otherlv_1= 'mm' otherlv_2= '{' (otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) ) )? otherlv_5= '}'
            {
            // InternalMyDsl.g:2073:3: ()
            // InternalMyDsl.g:2074:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getMmAccess().getMmAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,39,FOLLOW_3); 

            			newLeafNode(otherlv_1, grammarAccess.getMmAccess().getMmKeyword_1());
            		
            otherlv_2=(Token)match(input,12,FOLLOW_17); 

            			newLeafNode(otherlv_2, grammarAccess.getMmAccess().getLeftCurlyBracketKeyword_2());
            		
            // InternalMyDsl.g:2088:3: (otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) ) )?
            int alt23=2;
            int LA23_0 = input.LA(1);

            if ( (LA23_0==38) ) {
                alt23=1;
            }
            switch (alt23) {
                case 1 :
                    // InternalMyDsl.g:2089:4: otherlv_3= 'distance' ( (lv_distance_4_0= ruleEDouble ) )
                    {
                    otherlv_3=(Token)match(input,38,FOLLOW_18); 

                    				newLeafNode(otherlv_3, grammarAccess.getMmAccess().getDistanceKeyword_3_0());
                    			
                    // InternalMyDsl.g:2093:4: ( (lv_distance_4_0= ruleEDouble ) )
                    // InternalMyDsl.g:2094:5: (lv_distance_4_0= ruleEDouble )
                    {
                    // InternalMyDsl.g:2094:5: (lv_distance_4_0= ruleEDouble )
                    // InternalMyDsl.g:2095:6: lv_distance_4_0= ruleEDouble
                    {

                    						newCompositeNode(grammarAccess.getMmAccess().getDistanceEDoubleParserRuleCall_3_1_0());
                    					
                    pushFollow(FOLLOW_9);
                    lv_distance_4_0=ruleEDouble();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getMmRule());
                    						}
                    						set(
                    							current,
                    							"distance",
                    							lv_distance_4_0,
                    							"org.xtext.example.mydsl.MyDsl.EDouble");
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


    // $ANTLR start "entryRuleBooleanType"
    // InternalMyDsl.g:2121:1: entryRuleBooleanType returns [EObject current=null] : iv_ruleBooleanType= ruleBooleanType EOF ;
    public final EObject entryRuleBooleanType() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleBooleanType = null;


        try {
            // InternalMyDsl.g:2121:52: (iv_ruleBooleanType= ruleBooleanType EOF )
            // InternalMyDsl.g:2122:2: iv_ruleBooleanType= ruleBooleanType EOF
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
    // InternalMyDsl.g:2128:1: ruleBooleanType returns [EObject current=null] : ( () ( (lv_value_1_0= 'value' ) )? otherlv_2= 'BooleanType' ) ;
    public final EObject ruleBooleanType() throws RecognitionException {
        EObject current = null;

        Token lv_value_1_0=null;
        Token otherlv_2=null;


        	enterRule();

        try {
            // InternalMyDsl.g:2134:2: ( ( () ( (lv_value_1_0= 'value' ) )? otherlv_2= 'BooleanType' ) )
            // InternalMyDsl.g:2135:2: ( () ( (lv_value_1_0= 'value' ) )? otherlv_2= 'BooleanType' )
            {
            // InternalMyDsl.g:2135:2: ( () ( (lv_value_1_0= 'value' ) )? otherlv_2= 'BooleanType' )
            // InternalMyDsl.g:2136:3: () ( (lv_value_1_0= 'value' ) )? otherlv_2= 'BooleanType'
            {
            // InternalMyDsl.g:2136:3: ()
            // InternalMyDsl.g:2137:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getBooleanTypeAccess().getBooleanTypeAction_0(),
            					current);
            			

            }

            // InternalMyDsl.g:2143:3: ( (lv_value_1_0= 'value' ) )?
            int alt24=2;
            int LA24_0 = input.LA(1);

            if ( (LA24_0==40) ) {
                alt24=1;
            }
            switch (alt24) {
                case 1 :
                    // InternalMyDsl.g:2144:4: (lv_value_1_0= 'value' )
                    {
                    // InternalMyDsl.g:2144:4: (lv_value_1_0= 'value' )
                    // InternalMyDsl.g:2145:5: lv_value_1_0= 'value'
                    {
                    lv_value_1_0=(Token)match(input,40,FOLLOW_19); 

                    					newLeafNode(lv_value_1_0, grammarAccess.getBooleanTypeAccess().getValueValueKeyword_1_0());
                    				

                    					if (current==null) {
                    						current = createModelElement(grammarAccess.getBooleanTypeRule());
                    					}
                    					setWithLastConsumed(current, "value", lv_value_1_0 != null, "value");
                    				

                    }


                    }
                    break;

            }

            otherlv_2=(Token)match(input,41,FOLLOW_2); 

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
    // InternalMyDsl.g:2165:1: entryRuleNumberType returns [EObject current=null] : iv_ruleNumberType= ruleNumberType EOF ;
    public final EObject entryRuleNumberType() throws RecognitionException {
        EObject current = null;

        EObject iv_ruleNumberType = null;


        try {
            // InternalMyDsl.g:2165:51: (iv_ruleNumberType= ruleNumberType EOF )
            // InternalMyDsl.g:2166:2: iv_ruleNumberType= ruleNumberType EOF
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
    // InternalMyDsl.g:2172:1: ruleNumberType returns [EObject current=null] : ( () otherlv_1= 'NumberType' otherlv_2= '{' (otherlv_3= 'value' ( (lv_value_4_0= ruleEDouble ) ) )? otherlv_5= '}' ) ;
    public final EObject ruleNumberType() throws RecognitionException {
        EObject current = null;

        Token otherlv_1=null;
        Token otherlv_2=null;
        Token otherlv_3=null;
        Token otherlv_5=null;
        AntlrDatatypeRuleToken lv_value_4_0 = null;



        	enterRule();

        try {
            // InternalMyDsl.g:2178:2: ( ( () otherlv_1= 'NumberType' otherlv_2= '{' (otherlv_3= 'value' ( (lv_value_4_0= ruleEDouble ) ) )? otherlv_5= '}' ) )
            // InternalMyDsl.g:2179:2: ( () otherlv_1= 'NumberType' otherlv_2= '{' (otherlv_3= 'value' ( (lv_value_4_0= ruleEDouble ) ) )? otherlv_5= '}' )
            {
            // InternalMyDsl.g:2179:2: ( () otherlv_1= 'NumberType' otherlv_2= '{' (otherlv_3= 'value' ( (lv_value_4_0= ruleEDouble ) ) )? otherlv_5= '}' )
            // InternalMyDsl.g:2180:3: () otherlv_1= 'NumberType' otherlv_2= '{' (otherlv_3= 'value' ( (lv_value_4_0= ruleEDouble ) ) )? otherlv_5= '}'
            {
            // InternalMyDsl.g:2180:3: ()
            // InternalMyDsl.g:2181:4: 
            {

            				current = forceCreateModelElement(
            					grammarAccess.getNumberTypeAccess().getNumberTypeAction_0(),
            					current);
            			

            }

            otherlv_1=(Token)match(input,42,FOLLOW_3); 

            			newLeafNode(otherlv_1, grammarAccess.getNumberTypeAccess().getNumberTypeKeyword_1());
            		
            otherlv_2=(Token)match(input,12,FOLLOW_20); 

            			newLeafNode(otherlv_2, grammarAccess.getNumberTypeAccess().getLeftCurlyBracketKeyword_2());
            		
            // InternalMyDsl.g:2195:3: (otherlv_3= 'value' ( (lv_value_4_0= ruleEDouble ) ) )?
            int alt25=2;
            int LA25_0 = input.LA(1);

            if ( (LA25_0==40) ) {
                alt25=1;
            }
            switch (alt25) {
                case 1 :
                    // InternalMyDsl.g:2196:4: otherlv_3= 'value' ( (lv_value_4_0= ruleEDouble ) )
                    {
                    otherlv_3=(Token)match(input,40,FOLLOW_18); 

                    				newLeafNode(otherlv_3, grammarAccess.getNumberTypeAccess().getValueKeyword_3_0());
                    			
                    // InternalMyDsl.g:2200:4: ( (lv_value_4_0= ruleEDouble ) )
                    // InternalMyDsl.g:2201:5: (lv_value_4_0= ruleEDouble )
                    {
                    // InternalMyDsl.g:2201:5: (lv_value_4_0= ruleEDouble )
                    // InternalMyDsl.g:2202:6: lv_value_4_0= ruleEDouble
                    {

                    						newCompositeNode(grammarAccess.getNumberTypeAccess().getValueEDoubleParserRuleCall_3_1_0());
                    					
                    pushFollow(FOLLOW_9);
                    lv_value_4_0=ruleEDouble();

                    state._fsp--;


                    						if (current==null) {
                    							current = createModelElementForParent(grammarAccess.getNumberTypeRule());
                    						}
                    						set(
                    							current,
                    							"value",
                    							lv_value_4_0,
                    							"org.xtext.example.mydsl.MyDsl.EDouble");
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


    // $ANTLR start "entryRuleEDouble"
    // InternalMyDsl.g:2228:1: entryRuleEDouble returns [String current=null] : iv_ruleEDouble= ruleEDouble EOF ;
    public final String entryRuleEDouble() throws RecognitionException {
        String current = null;

        AntlrDatatypeRuleToken iv_ruleEDouble = null;


        try {
            // InternalMyDsl.g:2228:47: (iv_ruleEDouble= ruleEDouble EOF )
            // InternalMyDsl.g:2229:2: iv_ruleEDouble= ruleEDouble EOF
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
    // InternalMyDsl.g:2235:1: ruleEDouble returns [AntlrDatatypeRuleToken current=new AntlrDatatypeRuleToken()] : ( (kw= '-' )? (this_INT_1= RULE_INT )? kw= '.' this_INT_3= RULE_INT ( (kw= 'E' | kw= 'e' ) (kw= '-' )? this_INT_7= RULE_INT )? ) ;
    public final AntlrDatatypeRuleToken ruleEDouble() throws RecognitionException {
        AntlrDatatypeRuleToken current = new AntlrDatatypeRuleToken();

        Token kw=null;
        Token this_INT_1=null;
        Token this_INT_3=null;
        Token this_INT_7=null;


        	enterRule();

        try {
            // InternalMyDsl.g:2241:2: ( ( (kw= '-' )? (this_INT_1= RULE_INT )? kw= '.' this_INT_3= RULE_INT ( (kw= 'E' | kw= 'e' ) (kw= '-' )? this_INT_7= RULE_INT )? ) )
            // InternalMyDsl.g:2242:2: ( (kw= '-' )? (this_INT_1= RULE_INT )? kw= '.' this_INT_3= RULE_INT ( (kw= 'E' | kw= 'e' ) (kw= '-' )? this_INT_7= RULE_INT )? )
            {
            // InternalMyDsl.g:2242:2: ( (kw= '-' )? (this_INT_1= RULE_INT )? kw= '.' this_INT_3= RULE_INT ( (kw= 'E' | kw= 'e' ) (kw= '-' )? this_INT_7= RULE_INT )? )
            // InternalMyDsl.g:2243:3: (kw= '-' )? (this_INT_1= RULE_INT )? kw= '.' this_INT_3= RULE_INT ( (kw= 'E' | kw= 'e' ) (kw= '-' )? this_INT_7= RULE_INT )?
            {
            // InternalMyDsl.g:2243:3: (kw= '-' )?
            int alt26=2;
            int LA26_0 = input.LA(1);

            if ( (LA26_0==43) ) {
                alt26=1;
            }
            switch (alt26) {
                case 1 :
                    // InternalMyDsl.g:2244:4: kw= '-'
                    {
                    kw=(Token)match(input,43,FOLLOW_21); 

                    				current.merge(kw);
                    				newLeafNode(kw, grammarAccess.getEDoubleAccess().getHyphenMinusKeyword_0());
                    			

                    }
                    break;

            }

            // InternalMyDsl.g:2250:3: (this_INT_1= RULE_INT )?
            int alt27=2;
            int LA27_0 = input.LA(1);

            if ( (LA27_0==RULE_INT) ) {
                alt27=1;
            }
            switch (alt27) {
                case 1 :
                    // InternalMyDsl.g:2251:4: this_INT_1= RULE_INT
                    {
                    this_INT_1=(Token)match(input,RULE_INT,FOLLOW_22); 

                    				current.merge(this_INT_1);
                    			

                    				newLeafNode(this_INT_1, grammarAccess.getEDoubleAccess().getINTTerminalRuleCall_1());
                    			

                    }
                    break;

            }

            kw=(Token)match(input,44,FOLLOW_23); 

            			current.merge(kw);
            			newLeafNode(kw, grammarAccess.getEDoubleAccess().getFullStopKeyword_2());
            		
            this_INT_3=(Token)match(input,RULE_INT,FOLLOW_24); 

            			current.merge(this_INT_3);
            		

            			newLeafNode(this_INT_3, grammarAccess.getEDoubleAccess().getINTTerminalRuleCall_3());
            		
            // InternalMyDsl.g:2271:3: ( (kw= 'E' | kw= 'e' ) (kw= '-' )? this_INT_7= RULE_INT )?
            int alt30=2;
            int LA30_0 = input.LA(1);

            if ( ((LA30_0>=45 && LA30_0<=46)) ) {
                alt30=1;
            }
            switch (alt30) {
                case 1 :
                    // InternalMyDsl.g:2272:4: (kw= 'E' | kw= 'e' ) (kw= '-' )? this_INT_7= RULE_INT
                    {
                    // InternalMyDsl.g:2272:4: (kw= 'E' | kw= 'e' )
                    int alt28=2;
                    int LA28_0 = input.LA(1);

                    if ( (LA28_0==45) ) {
                        alt28=1;
                    }
                    else if ( (LA28_0==46) ) {
                        alt28=2;
                    }
                    else {
                        NoViableAltException nvae =
                            new NoViableAltException("", 28, 0, input);

                        throw nvae;
                    }
                    switch (alt28) {
                        case 1 :
                            // InternalMyDsl.g:2273:5: kw= 'E'
                            {
                            kw=(Token)match(input,45,FOLLOW_25); 

                            					current.merge(kw);
                            					newLeafNode(kw, grammarAccess.getEDoubleAccess().getEKeyword_4_0_0());
                            				

                            }
                            break;
                        case 2 :
                            // InternalMyDsl.g:2279:5: kw= 'e'
                            {
                            kw=(Token)match(input,46,FOLLOW_25); 

                            					current.merge(kw);
                            					newLeafNode(kw, grammarAccess.getEDoubleAccess().getEKeyword_4_0_1());
                            				

                            }
                            break;

                    }

                    // InternalMyDsl.g:2285:4: (kw= '-' )?
                    int alt29=2;
                    int LA29_0 = input.LA(1);

                    if ( (LA29_0==43) ) {
                        alt29=1;
                    }
                    switch (alt29) {
                        case 1 :
                            // InternalMyDsl.g:2286:5: kw= '-'
                            {
                            kw=(Token)match(input,43,FOLLOW_23); 

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

    // Delegated rules


 

    public static final BitSet FOLLOW_1 = new BitSet(new long[]{0x0000000000000000L});
    public static final BitSet FOLLOW_2 = new BitSet(new long[]{0x0000000000000002L});
    public static final BitSet FOLLOW_3 = new BitSet(new long[]{0x0000000000001000L});
    public static final BitSet FOLLOW_4 = new BitSet(new long[]{0x0000000000002000L});
    public static final BitSet FOLLOW_5 = new BitSet(new long[]{0x0000001FE79E0800L});
    public static final BitSet FOLLOW_6 = new BitSet(new long[]{0x000000000000C000L});
    public static final BitSet FOLLOW_7 = new BitSet(new long[]{0x0000000000018000L});
    public static final BitSet FOLLOW_8 = new BitSet(new long[]{0x0000000000020000L});
    public static final BitSet FOLLOW_9 = new BitSet(new long[]{0x0000000000008000L});
    public static final BitSet FOLLOW_10 = new BitSet(new long[]{0x0000000000200000L});
    public static final BitSet FOLLOW_11 = new BitSet(new long[]{0x0000000027940000L});
    public static final BitSet FOLLOW_12 = new BitSet(new long[]{0x0000000000400000L});
    public static final BitSet FOLLOW_13 = new BitSet(new long[]{0x0000000018008000L});
    public static final BitSet FOLLOW_14 = new BitSet(new long[]{0x000007A000000000L});
    public static final BitSet FOLLOW_15 = new BitSet(new long[]{0x0000000010008000L});
    public static final BitSet FOLLOW_16 = new BitSet(new long[]{0x0000000040020000L});
    public static final BitSet FOLLOW_17 = new BitSet(new long[]{0x0000004000008000L});
    public static final BitSet FOLLOW_18 = new BitSet(new long[]{0x0000180000000010L});
    public static final BitSet FOLLOW_19 = new BitSet(new long[]{0x0000020000000000L});
    public static final BitSet FOLLOW_20 = new BitSet(new long[]{0x0000010000008000L});
    public static final BitSet FOLLOW_21 = new BitSet(new long[]{0x0000100000000010L});
    public static final BitSet FOLLOW_22 = new BitSet(new long[]{0x0000100000000000L});
    public static final BitSet FOLLOW_23 = new BitSet(new long[]{0x0000000000000010L});
    public static final BitSet FOLLOW_24 = new BitSet(new long[]{0x0000600000000002L});
    public static final BitSet FOLLOW_25 = new BitSet(new long[]{0x0000080000000010L});

}