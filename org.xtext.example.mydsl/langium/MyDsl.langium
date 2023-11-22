grammar MyDsl
import 'Terminals'
import 'robot-types'

entry Affectation returns Affectation:
    'Affectation' '{' 'expressionbase' '{' expressionbase+=ExpressionBase  ("," expressionbase+=ExpressionBase  )* '}' ('callvariable' callvariable=CallVariable  )? '}'  
;

ExpressionBase returns ExpressionBase:
    ArithmetiqueExp_Impl | BooleanExp_Impl | Plus | Minus | Mult | Div | PrimaryExprAri | SecondaryExpAri_Impl | CallVariable | CallFunction | Affectation | PrimaryExprBool | SecondaryExpBool_Impl | And | Or | Not | Equals 
;

ArithmetiqueExp returns ArithmetiqueExp:
    ArithmetiqueExp_Impl | Plus | Minus | Mult | Div | PrimaryExprAri | SecondaryExpAri_Impl 
;

TypeClass returns TypeClass:
    CM | mm | BooleanType | NumberType 
;

Call returns Call:
    CallVariable | CallFunction 
;

BooleanExp returns BooleanExp:
    BooleanExp_Impl | PrimaryExprBool | SecondaryExpBool_Impl | And | Or | Not | Equals 
;

CallVariable returns CallVariable:
    {CallVariable} 'CallVariable'  
;

ArithmetiqueExp_Impl returns ArithmetiqueExp:
    {ArithmetiqueExp} 'ArithmetiqueExp'  
;

BooleanExp_Impl returns BooleanExp:
    {BooleanExp} 'BooleanExp'  
;

Plus returns Plus:
    'Plus' '{' 'right' '{' right+=ArithmetiqueExp  ("," right+=ArithmetiqueExp  )* '}' 'left' left=ArithmetiqueExp  '}'  
;

Minus returns Minus:
    'Minus' '{' 'right' '{' right+=ArithmetiqueExp  ("," right+=ArithmetiqueExp  )* '}' 'left' left=ArithmetiqueExp  '}'  
;

Mult returns Mult:
    'Mult' '{' 'right' '{' right+=ArithmetiqueExp  ("," right+=ArithmetiqueExp  )* '}' 'left' left=ArithmetiqueExp  '}'  
;

Div returns Div:
    'Div' '{' 'right' '{' right+=ArithmetiqueExp  ("," right+=ArithmetiqueExp  )* '}' 'left' left=ArithmetiqueExp  '}'  
;

PrimaryExprAri returns PrimaryExprAri:
    {PrimaryExprAri} 'PrimaryExprAri' '{' ('type' ^type=TypeClass  )? ('call' call=Call  )? '}'  
;

SecondaryExpAri_Impl returns SecondaryExpAri:
    'SecondaryExpAri' '{' 'right' '{' right+=ArithmetiqueExp  ("," right+=ArithmetiqueExp  )* '}' 'left' left=ArithmetiqueExp  '}'  
;

CallFunction returns CallFunction:
    {CallFunction} 'CallFunction'  
;

PrimaryExprBool returns PrimaryExprBool:
    {PrimaryExprBool} 'PrimaryExprBool' '{' ('type' ^type=TypeClass  )? ('call' call=Call  )? '}'  
;

SecondaryExpBool_Impl returns SecondaryExpBool:
    'SecondaryExpBool' '{' 'right' '{' right+=BooleanExp  ("," right+=BooleanExp  )* '}' 'left' left=BooleanExp  '}'  
;

And returns And:
    'And' '{' 'right' '{' right+=BooleanExp  ("," right+=BooleanExp  )* '}' 'left' left=BooleanExp  '}'  
;

Or returns Or:
    'Or' '{' 'right' '{' right+=BooleanExp  ("," right+=BooleanExp  )* '}' 'left' left=BooleanExp  '}'  
;

Not returns Not:
    'Not' '{' 'right' '{' right+=BooleanExp  ("," right+=BooleanExp  )* '}' 'left' left=BooleanExp  '}'  
;

Equals returns Equals:
    'Equals' '{' 'right' '{' right+=BooleanExp  ("," right+=BooleanExp  )* '}' 'left' left=BooleanExp  '}'  
;

CM returns CM:
    {CM} 'CM' '{' ('distance' distance=EDouble  )? '}'  
;

mm returns mm:
    {mm} 'mm' '{' ('distance' distance=EDouble  )? '}'  
;

BooleanType returns BooleanType:
    {BooleanType} (value?='value' )? 'BooleanType'  
;

NumberType returns NumberType:
    {NumberType} 'NumberType' '{' ('value' value=EDouble  )? '}'  
;

EDouble returns number:
    '-'? INT? '.' INT (('E' | 'e' )'-'? INT )?  
;

EBoolean returns boolean:
    'true' | 'false' 
;

