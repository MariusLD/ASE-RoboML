grammar MyDsl
import 'Terminals'
import 'robot-types'

entry Robot returns Robot:
    {Robot} 'Robot' '{' ('function' '{' function+=Function  ("," function+=Function  )* '}' )? '}'  
;

Instruction returns Instruction:
    RotateCommand | DirectionCommand | SpeedCommand | DistanceSensorCommand | TimeSensorCommand | BooleanExp_Impl | PlusMinus | MultDiv | PrimaryExprAri | DeclarationVariable | LOOP | IF | CallVariable | CallFunction | Affectation | PrimaryExprBool | And | Or | Not | Equals | PlusMinusDistance | MultDivDistance | PrimaryExprDistance | PlusMinusTime | MultDiveTime | PrimaryExprTime | ComparaisonDistance | ComparaisonTime | ComparaisonAri 
;

TypeClass returns TypeClass:
    CM | mm | BooleanType | NumberType | Time 
;

Distance returns Distance:
    CM | mm 
;

Call returns Call:
    CallVariable | CallFunction 
;

ExpressionBase returns ExpressionBase:
    BooleanExp_Impl | PlusMinus | MultDiv | PrimaryExprAri | CallVariable | CallFunction | Affectation | PrimaryExprBool | And | Or | Not | Equals | PlusMinusDistance | MultDivDistance | PrimaryExprDistance | PlusMinusTime | MultDiveTime | PrimaryExprTime | ComparaisonDistance | ComparaisonTime | ComparaisonAri 
;

Expression returns Expression:
    BooleanExp_Impl | PlusMinus | MultDiv | PrimaryExprAri | PrimaryExprBool | And | Or | Not | Equals | PlusMinusDistance | MultDivDistance | PrimaryExprDistance | PlusMinusTime | MultDiveTime | PrimaryExprTime | ComparaisonDistance | ComparaisonTime | ComparaisonAri 
;

Function returns Function:
    {Function} 'Function' '{' ('instruction' '{' instruction+=Instruction  ("," instruction+=Instruction  )* '}' )? ('parameters' '{' parameters+=TypeClass  ("," parameters+=TypeClass  )* '}' )? ('return' return=TypeClass  )? '}'  
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

DistanceSensorCommand returns DistanceSensorCommand:
    {DistanceSensorCommand} 'DistanceSensorCommand'  
;

TimeSensorCommand returns TimeSensorCommand:
    {TimeSensorCommand} 'TimeSensorCommand'  
;

BooleanExp_Impl returns BooleanExp:
    {BooleanExp} 'BooleanExp'  
;

PlusMinus returns PlusMinus:
    {PlusMinus} 'PlusMinus'  
;

MultDiv returns MultDiv:
    {MultDiv} 'MultDiv'  
;

PrimaryExprAri returns PrimaryExprAri:
    {PrimaryExprAri} 'PrimaryExprAri' '{' ('type' ^type=TypeClass  )? ('call' call=Call  )? '}'  
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

And returns And:
    {And} 'And'  
;

Or returns Or:
    {Or} 'Or'  
;

Not returns Not:
    {Not} 'Not'  
;

Equals returns Equals:
    {Equals} 'Equals'  
;

PlusMinusDistance returns PlusMinusDistance:
    {PlusMinusDistance} 'PlusMinusDistance'  
;

MultDivDistance returns MultDivDistance:
    {MultDivDistance} 'MultDivDistance'  
;

PrimaryExprDistance returns PrimaryExprDistance:
    {PrimaryExprDistance} 'PrimaryExprDistance' '{' ('distance' distance=Distance  )? '}'  
;

PlusMinusTime returns PlusMinusTime:
    {PlusMinusTime} 'PlusMinusTime'  
;

MultDiveTime returns MultDiveTime:
    {MultDiveTime} 'MultDiveTime'  
;

PrimaryExprTime returns PrimaryExprTime:
    {PrimaryExprTime} 'PrimaryExprTime' '{' ('time' time=Time  )? '}'  
;

ComparaisonDistance returns ComparaisonDistance:
    {ComparaisonDistance} 'ComparaisonDistance'  
;

ComparaisonTime returns ComparaisonTime:
    {ComparaisonTime} 'ComparaisonTime'  
;

ComparaisonAri returns ComparaisonAri:
    {ComparaisonAri} 'ComparaisonAri'  
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

Time returns Time:
    {Time} 'Time' '{' ('value' value=EDouble  )? '}'  
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

