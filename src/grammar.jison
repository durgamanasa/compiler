%{
    var path = require('path');
    var ParseTree = require(path.resolve('./src/parseTree.js'));
%}


%lex
%%

\s+       /* skip whitespace */
\d+    return 'NUMBER'
'+'       return '+'
<<EOF>>   return 'EOF'

/lex

%left '+'

%start expressions

%%

expressions
    : e EOF
        {return $$; }
    ;

e
    : e '+' e
        {$$ = new ParseTree($1,$2,$3)}
    | NUMBER
        {$$ = Number(yytext)}
    ;