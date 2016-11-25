var assert  = require('assert');

var ParseTree = require('../src/parseTree.js');
var Parser = require('jison').Parser;
var grammar = require('fs').readFileSync('./src/grammar.jison','utf8');
var parser = new Parser(grammar);

describe('Grammar',function(){
	it('should recognise input and return a tree',function(){
		var tree = parser.parse('2+2');
		var expectedTree = new ParseTree(2,'+',2);

		assert.deepEqual(tree,expectedTree);
	});

	it('should recognise input and return a tree for nested tree',function(){
		var tree = parser.parse('2+2+3');
		var expectedTree = new ParseTree(new ParseTree(2,'+',2),'+',3);

		assert.deepEqual(tree,expectedTree);
	});

	it('should recognise input and return a tree for multiple operators',function(){
		var tree = parser.parse('2+2*3');
		var expectedTree = new ParseTree(2,'+',new ParseTree(2,'*',3));

		assert.deepEqual(tree,expectedTree);
	});
});