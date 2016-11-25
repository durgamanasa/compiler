var assert  = require('assert');
var Parser = require('jison').Parser;
var grammar = require('fs').readFileSync('./src/grammar.jison','utf8');
var parser = new Parser(grammar);

describe('Grammar',function(){
	it('should recognise a number',function(){
		assert.equal(parser.parse('2'),2);
	});
});