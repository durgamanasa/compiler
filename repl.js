var readline = require ('readline');
var fs = require ('fs');
var Parser = require('jison').Parser;
var grammar = require('fs').readFileSync('./src/grammar.jison','utf8');
var parser = new Parser(grammar);

var repl = function(){
	var rl = readline.createInterface({
		input: process.stdin,
		output:process.stdout
	})

	rl.setPrompt(">>> ")
	rl.prompt();
	rl.on('line', (line) => {
		var tree = parser.parse(line);
		try{
			var result = tree.evaluate();
			console.log(result);
		}catch(e){
			console.log(e.stack);
		}
	  	rl.prompt();
	}).on('close', () => {
	  console.log('\nHave a nice day!');
	  process.exit(0);
	});
}

repl();