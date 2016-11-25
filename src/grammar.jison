%{
    var path = require('path')
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
        {}
    | NUMBER
        {$$ = Number(yytext)}
    ;