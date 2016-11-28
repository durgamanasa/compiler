%{
    var path = require('path');
    var ParseTree = require(path.resolve('./src/parseTree.js'));
    var Tree = require(path.resolve('./src/Tree.js'));
    var OperatorNode = require(path.resolve('./src/OperatorNode.js'));
    var NumberNode = require(path.resolve('./src/NumberNode.js'));
    var VariableNode = require(path.resolve('./src/VariableNode.js'));
    var AssignmentNode = require(path.resolve('./src/AssignmentNode.js'));

%}


%lex
%%

\s+       /* skip whitespace */
\d+       return 'NUMBER'
\w+       return 'VARIABLE'
'+'       return '+'
'*'       return '*'
'='       return '='
'^'       return '^'
';'       return ';'
<<EOF>>   return 'EOF'

/lex

%left '+','-'
%left '*','/'
%left '^'


%start expression

%%

expression
    : statements EOF
        {return new Tree($1); }
    ;

statements
    : statement ';'
        {$$ = [$1]}
    | statements statement ';'
        {$$ = $1.concat($2)}
    ;

statement
    : operation
    | assignment
    ;

assignment
    : variable '=' operand 
        {$$ = new ParseTree($1,new AssignmentNode($2),$3)}
    ;   

operation
    : operation '+' operation
        {$$ = new ParseTree($1,new OperatorNode($2),$3)}
    | operation '*' operation
        {$$ = new ParseTree($1,new OperatorNode($2),$3)}
    | operation '^' operation
        {$$ = new ParseTree($1,new OperatorNode($2),$3)}
    | operand
    | variable
    ;

 operand 
    : NUMBER 
        {$$ = new NumberNode(yytext)}
    ;  

variable
    : VARIABLE
        {$$ = new VariableNode(yytext)}
    ;   

