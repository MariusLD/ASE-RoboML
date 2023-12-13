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
    className=TypeClass (Expression | Call | Affectation | DistanceExpression | TimeExpression | BooleanType | NumberType | ReadSensorCommand)
;

Expression returns Expression:
    PlusMinus | BooleanExp | PlusMinusDistance | PlusMinusTime
;

BooleanExp returns BooleanExp:
    Or | Equals 
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

PlusMinus returns PlusMinus:
    MultDiv (('+'|'-') MultDiv)*
;

MultDiv returns MultDiv:
    PrimaryExprAri (('*'|'/') PrimaryExprAri)*
;

PlusMinusDistance returns PlusMinus:
    MultDivDistance (('+'|'-') MultDivDistance)*
;

MultDivDistance returns MultDiv:
    PrimaryExprDistance (('*'|'/') (PrimaryExprDistance | NumberType))*
;

PrimaryExprAri returns PrimaryExprAri:
    ( NumberType ) | ( call=Call )
;

PrimaryExprDistance returns PrimaryExprDistance:
    DistanceExpression | ( call=Call ) | ( NumberType '*' DistanceExpression )
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
    callvariable=CallVariable '=' expressionbase+=ExpressionBase
;

PrimaryExprBool returns PrimaryExprBool:
    BooleanType | ( call=Call )
;

And returns And:
    Not ('AND' Not)*
;

Or returns Or:
    And ('OR' And)*
;

Not returns Not:
    ('NOT' (Not | '(' Or ')')) | PrimaryExprBool 
;

Equals returns Equals:
    '(' Or ')' ('==' | '!=') '(' Or ')'
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
    MultDivTime (('+'|'-') MultDivTime)*
;

MultDivTime returns MultDivTime:
    PrimaryExprTime (('*'|'/') PrimaryExprTime)*
;

PrimaryExprTime returns PrimaryExprDistance:
    TimeExpression | ( call=Call ) | ( TimeExpression ('/' | '*') NumberType) | ( NumberType '*' TimeExpression )
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