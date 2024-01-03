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
    {TypeClass} 'boolean' | 'distance' | 'time' | 'number' | 'void'
;

Distance returns Distance:
    {Distance} 'cm' | 'mm'
;

Time returns Time:
    {Time} 's'
;

Call returns Call:
    CallVariable | CallFunction 
;

ExpressionBase returns ExpressionBase:
    ( CallVariable | CallFunction | Affectation | DistanceExpression | TimeExpression | BooleanType | NumberType | ReadSensorCommand | Expression )
;

Expression returns Expression:
    PlusMinus | Or | Equals | PlusMinusDistance | PlusMinusTime
;

FunctionN returns FunctionN:
    {FunctionN} 'let' ( return=TypeClass )? name=EString '(' (parameters+=Parameter("," parameters+=Parameter )* )? ')' '{' ( instruction+=Instruction ( instruction+=Instruction )* )? ( 'return' returnedValue=ExpressionBase ';')? '}'
;

Parameter returns Parameter:
    {Parameter} type=TypeClass nom=EString
;

RotateCommand returns RotateCommand:
    {RotateCommand} 'CLOCK' ( angle=EDouble )
;

DirectionCommand returns DirectionCommand:
    ( 'FORWARD' | 'BACKWARD' | 'LEFT' | 'RIGHT' ) distance=DistanceExpression
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

PlusMinus returns Expression:
    MultDiv ({Expression.expr1=current} ('+'|'-') expr2=MultDiv)*
;

MultDiv returns Expression:
    PrimaryExprAri ({Expression.expr1=current} ('*'|'/') expr2=PrimaryExprAri)*
;

PlusMinusDistance returns Expression:
    MultDivDistance ({Expression.expr1=current} ('+'|'-') expr2=MultDivDistance)*
;

MultDivDistance returns Expression:
    PrimaryExprDistance ({Expression.expr1=current} ('*'|'/') expr2=PrimaryExprDistance)*
;

PrimaryExprAri returns PrimaryExprAri:
    expr=( NumberType | CallVariable | CallFunction )
;

PrimaryExprDistance returns PrimaryExprDistance:
    expr=( DistanceExpression | CallVariable | CallFunction )
;

DeclarationVariable returns DeclarationVariable:
    'var' ^type=TypeClass nom=EString '=' expressionbase=ExpressionBase
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
    {CallFunction} nom=EString '(' (parameters+=ExpressionBase ("," parameters+=ExpressionBase )* )? ')' 
;

Affectation returns Affectation:
    callvariable=CallVariable '=' expressionbase=ExpressionBase
;

PrimaryExprBool returns PrimaryExprBool:
    expr=(BooleanType | CallFunction | CallVariable)
;

And returns Expression:
    Not ({Expression.expr1=current} 'AND' expr2=Not)*
;

Or returns Expression:
    And ({Expression.expr1=current} 'OR' expr2=And)*
;

Not returns Expression:
    ('NOT' (Not | Or )) | PrimaryExprBool
;

Equals returns Expression:
    '(' expr1=Or ')' ('==' | '!=') '(' expr2=Or ')'
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

PlusMinusTime returns Expression:
    MultDivTime ({Expression.expr1=current} ('+'|'-') expr2=MultDivTime)*
;

MultDivTime returns Expression:
    PrimaryExprTime ({Expression.expr1=current} ('*'|'/') expr2=PrimaryExprTime)*
;

PrimaryExprTime returns PrimaryExprTime:
    expr=( TimeExpression | CallVariable | CallFunction )
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