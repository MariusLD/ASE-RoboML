grammar Robot
import 'Terminals'
import 'robot-types'

entry Robot returns Robot:
    {Robot} 'Robot' '{' ('function' '{' function+=Function  ("," function+=Function  )* '}' )? '}'  
;

Instruction returns Instruction:
    Instruction_Impl | RotateCommand | DirectionCommand | SpeedCommand | ReadSensorCommand_Impl | DistanceSensorCommand | TimeSensorCommand | ArithmetiqueExp_Impl | BooleanExp_Impl | Plus | Minus | Mult | Div | PrimaryExprAri | SecondaryExpAri_Impl | DeclarationVariable | LOOP | IF | CallVariable | CallFunction | Affectation | PrimaryExprBool | SecondaryExpBool_Impl | And | Or | Not | Equals | ELSE 
;

TypeClass returns TypeClass:
    CM | mm | BooleanType | NumberType 
;

Distance returns Distance:
    CM | mm 
;

ArithmetiqueExp returns ArithmetiqueExp:
    ArithmetiqueExp_Impl | Plus | Minus | Mult | Div | PrimaryExprAri | SecondaryExpAri_Impl 
;

Call returns Call:
    CallVariable | CallFunction 
;

ExpressionBase returns ExpressionBase:
    ArithmetiqueExp_Impl | BooleanExp_Impl | Plus | Minus | Mult | Div | PrimaryExprAri | SecondaryExpAri_Impl | CallVariable | CallFunction | Affectation | PrimaryExprBool | SecondaryExpBool_Impl | And | Or | Not | Equals 
;

Expression returns Expression:
    ArithmetiqueExp_Impl | BooleanExp_Impl | Plus | Minus | Mult | Div | PrimaryExprAri | SecondaryExpAri_Impl | PrimaryExprBool | SecondaryExpBool_Impl | And | Or | Not | Equals 
;

BooleanExp returns BooleanExp:
    BooleanExp_Impl | PrimaryExprBool | SecondaryExpBool_Impl | And | Or | Not | Equals 
;

Function returns Function:
    {Function} 'Function' '{' ('instruction' '{' instruction+=Instruction  ("," instruction+=Instruction  )* '}' )? ('parameters' '{' parameters+=TypeClass  ("," parameters+=TypeClass  )* '}' )? ('return' return=TypeClass  )? '}'  
;

Instruction_Impl returns Instruction:
    {Instruction} 'Instruction'  
;

RotateCommand returns RotateCommand:
    {RotateCommand} 'RotateCommand' '{' ('angle' angle=EDouble  )? '}'  
;

DirectionCommand returns DirectionCommand:
    'DirectionCommand' '{' 'distance' distance=Distance  '}'  
;

SpeedCommand returns SpeedCommand:
    {SpeedCommand} 'SpeedCommand' '{' ('speed' speed=EDouble  )? '}'  
;

ReadSensorCommand_Impl returns ReadSensorCommand:
    {ReadSensorCommand} 'ReadSensorCommand'  
;

DistanceSensorCommand returns DistanceSensorCommand:
    {DistanceSensorCommand} 'DistanceSensorCommand'  
;

TimeSensorCommand returns TimeSensorCommand:
    {TimeSensorCommand} 'TimeSensorCommand'  
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

DeclarationVariable returns DeclarationVariable:
    'DeclarationVariable' '{' ('nom' nom=EString  )? ('expressionbase' expressionbase=ExpressionBase  )? 'type' ^type=TypeClass  '}'  
;

LOOP returns LOOP:
    'LOOP' '{' ('instruction' '{' instruction+=Instruction  ("," instruction+=Instruction  )* '}' )? 'expression' expression=Expression  '}'  
;

IF returns IF:
    'IF' '{' ('instruction' '{' instruction+=Instruction  ("," instruction+=Instruction  )* '}' )? 'expression' expression=Expression  '}'  
;

CallVariable returns CallVariable:
    {CallVariable} 'CallVariable'  
;

CallFunction returns CallFunction:
    {CallFunction} 'CallFunction'  
;

Affectation returns Affectation:
    'Affectation' '{' 'expressionbase' '{' expressionbase+=ExpressionBase  ("," expressionbase+=ExpressionBase  )* '}' ('callvariable' callvariable=CallVariable  )? '}'  
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

ELSE returns ELSE:
    'ELSE' '{' ('instruction' '{' instruction+=Instruction  ("," instruction+=Instruction  )* '}' )? 'expression' expression=Expression  '}'  
;

EDouble returns number:
    '-'? INT? '.' INT (('E' | 'e' )'-'? INT )?  
;

CM returns CM:
    {CM} 'CM' '{' ('distance' distance=EDouble  )? '}'  
;

mm returns mm:
    {mm} 'mm' '{' ('distance' distance=EDouble  )? '}'  
;

EString returns string:
    STRING | ID 
;

BooleanType returns BooleanType:
    {BooleanType} (value?='value' )? 'BooleanType'  
;

NumberType returns NumberType:
    {NumberType} 'NumberType' '{' ('value' value=EDouble  )? '}'  
;

EBoolean returns boolean:
    'true' | 'false' 
;