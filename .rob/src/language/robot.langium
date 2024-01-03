grammar Robot
import 'Terminals'
import 'robot-types'

entry Robot returns Robot:
    {Robot} 'Robot' '{' ( functions+=FunctionN ( functions+=FunctionN )* )? '}'
;

Instruction returns Instruction:
    ( RotateCommand | DirectionCommand | SpeedCommand | ReadSensorCommand | DistanceSensorCommand | TimeSensorCommand | Expression | DeclarationVariable | Call | Affectation | Block ) ';'
;

Block returns Block:
    LOOP | IF
;

TypeClass returns TypeClass:
     typeT=('boolean' | 'distance' | 'time' | 'number' | 'void')
;

Distance returns Distance:
    {Distance} typeD=('cm' | 'mm')
;

Time returns Time:
    {Time} 's'
;

Call returns Call:
    CallVariable | CallFunction 
;

ExpressionBase returns ExpressionBase:
   (Expression | Call | Affectation | DistanceExpression | TimeExpression | BooleanType | NumberType | ReadSensorCommand)
;

Expression returns Expression:
    PlusMinus | BooleanExp | PlusMinusDistance | PlusMinusTime
;

BooleanExp returns BooleanExp:
    Or | Equals 
;

FunctionN returns FunctionN:
    {FunctionN} 'let' ( returnType=TypeClass )? name=EString '(' (parameters+=Parameter("," parameters+=Parameter )* )? ')' '{' ( instruction+=Instruction ( instruction+=Instruction )* )? ( 'return' returnedValue=ExpressionBase ';')? '}'
;

Parameter returns Parameter:
    {Parameter} typeP=TypeClass nom=EString
;

RotateCommand returns RotateCommand:
    {RotateCommand} 'CLOCK' ( angle=EDouble )
;

DirectionCommand returns DirectionCommand:
    operateur=( 'FORWARD' | 'BACKWARD' | 'LEFT' | 'RIGHT' ) distance=DistanceExpression
;

SpeedCommand returns SpeedCommand:
    {SpeedCommand} 'SPEED' speed=DistanceExpression
;

ReadSensorCommand returns ReadSensorCommand:
    {ReadSensorCommand} DistanceSensorCommand | TimeSensorCommand
;

DistanceSensorCommand returns DistanceSensorCommand:
    {DistanceSensorCommand} 'READ_DISTANCE'
;

TimeSensorCommand returns TimeSensorCommand:
    {TimeSensorCommand} 'READ_TIME'
;

PlusMinus returns PlusMinus:
    left=MultDiv (operateur+=('+'|'-') right+=MultDiv)*
;

MultDiv returns MultDiv:
    left=PrimaryExprAri (operateur+=('*'|'/') right+=PrimaryExprAri)*
;

PlusMinusDistance returns PlusMinusDistance:
    left=MultDivDistance (operateur+=('+'|'-') right+=MultDivDistance)*
;

MultDivDistance returns MultDivDistance:
    left=PrimaryExprDistance (operateur+=('*'|'/') (right+=PrimaryExprDistance | right+=NumberType))*
;

PrimaryExprAri returns PrimaryExprAri:
    ( num=NumberType ) | ( call=Call )
;

PrimaryExprDistance returns PrimaryExprDistance:
    dist=DistanceExpression | ( call=Call ) | ( num=NumberType '*' dist=DistanceExpression )
;

DeclarationVariable returns DeclarationVariable:
    'var' typeV=TypeClass nom=EString '=' expressionbase=ExpressionBase
;

LOOP returns LOOP:
    'LOOP' '(' expression=Expression ')' '{' ( instruction+=Instruction ( instruction+=Instruction )* )? '}'
;

IF returns IF:
    'IF' '(' expression=Expression ')' '{' ( instruction+=Instruction ( instruction+=Instruction )* )? '}' ('ELSE' '{' ( instruction+=Instruction ( instruction+=Instruction )* )? '}')?
;

CallVariable returns CallVariable:
    {CallVariable} nom=EString 
;

CallFunction returns CallFunction:
    {CallFunction} nom=EString  '(' (parameters+=ExpressionBase ("," parameters+=ExpressionBase )* )? ')' 
;

Affectation returns Affectation:
    callVariable=CallVariable '=' expressionbase=ExpressionBase
;

PrimaryExprBool returns PrimaryExprBool:
    value=BooleanType | ( call=Call )
;

And returns And:
    left=Not ('AND' right+=Not)*
;

Or returns Or:
    left=And ('OR' right+=And)*
;

Not returns Not:
    ('NOT' (not=Not | '(' or=Or ')')) | exp=PrimaryExprBool 
;

Equals returns Equals:
    '(' left=Or ')' operateur=('==' | '!=') '(' right=Or ')'
;

EDouble returns number:
    '-'? INT? '.' INT (('E' | 'e' )'-'? INT )?
;

EString returns string:
    STRING | ID 
;

DistanceExpression returns DistanceExpression:
    number=NumberType unit=Distance
;

TimeExpression returns TimeExpression:
    number=NumberType unit=Time
;

PlusMinusTime returns PlusMinusTime:
    left=MultDivTime (operateur+=('+'|'-') right+=MultDivTime)*
;

MultDivTime returns MultDivTime:
    left=PrimaryExprTime (operateur+=('*'|'/') right+=PrimaryExprTime)*
;

PrimaryExprTime returns PrimaryExprTime:
    time=TimeExpression | ( call=Call ) | ( time=TimeExpression operateur=('/' | '*') num=NumberType) | ( num=NumberType '*' time=TimeExpression )
;

BooleanType returns BooleanType:
    value=EBoolean
;

NumberType returns NumberType:
    value=EDouble
;

EBoolean returns boolean:
    'true' | 'false' 
;