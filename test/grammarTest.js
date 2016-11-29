var assert  = require('assert');
var Parser = require('jison').Parser;
var grammar = require('fs').readFileSync('./src/grammar.jison','utf8');
var parser = new Parser(grammar);

describe('Grammar',function(){
	it('should recognise input and return a tree',function(){
		var tree = parser.parse('2+2;');
		var expectedTree = [ {	leftChild: { value: 2 },
    							root: { value: '+' },
    							rightChild: { value: 2 } } ]

		assert.deepEqual(tree.childTrees,expectedTree);
	});

	it('should recognise input and return a tree for nested tree',function(){
		var tree = parser.parse('2+2+3;');
		var expectedTree = [ {	leftChild: { leftChild: { value: 2 }, root: { value: '+' }, rightChild: { value: 2 } },
    							root: { value: '+' },
    							rightChild: { value: 3 } } ]						
    	
		assert.deepEqual(tree.childTrees,expectedTree);
	});

	it('should recognise input and return a tree for multiple operators',function(){
		var tree = parser.parse('2+2*3;');
		var expectedTree = [ {	leftChild: { value: 2 },
    							root: { value: '+' },
    							rightChild: {	leftChild: { value: 2 },
    											root: { value: '*' },
    											rightChild: { value: 3 } } } ]						

		assert.deepEqual(tree.childTrees,expectedTree);
	});

	it('should recognise input and return a tree for a statement',function(){
		var tree = parser.parse('a=1;');
		var expectedTree = [ { leftChild: { value: 'a' }, root: { value: '=' }, rightChild: { value: 1 } } ];

		assert.deepEqual(tree.childTrees,expectedTree);
	});

	it('should recognise input and return a tree for multiple statements',function(){
		var tree = parser.parse('a=1;a+2;');
		var expectedTree = [ {	leftChild: { value: 'a' },
    							root: { value: '=' },
    							rightChild: { value: 1 } },
  							 {	leftChild: { value: 'a' },
    							root: { value: '+' },
    							rightChild: { value: 2 } } ]
		assert.deepEqual(tree.childTrees,expectedTree);
	});

	it('should recognise input and return a tree for multiple statements of multiple operators',function(){
		var tree = parser.parse('a=1;a+2*3;');
		var expectedTree = [ {	leftChild: { value: 'a' },
    							root: { value: '=' },
    							rightChild: { value: 1 } },
  							 {	leftChild: { value: 'a' },
    							root: { value: '+' },
    							rightChild: { leftChild: { value: 2 } , root: {value:'*'}, rightChild: { value: 3 } } } ]
		assert.deepEqual(tree.childTrees,expectedTree);
	});

	it('should recognise input and return a tree for the exponent statements',function(){
		var tree = parser.parse('2^2;a=1;a^2;');
		var expectedTree = [ {	leftChild: { value: 2 },
    							root: { value: '^' },
    							rightChild: { value: 2 } },
  							 {	leftChild: { value: 'a' },
    							root: { value: '=' },
    							rightChild: { value: 1 } },
  							 {	leftChild: { value: 'a' },
    							root: { value: '^' },
    							rightChild: { value: 2 } } ]

		assert.deepEqual(tree.childTrees,expectedTree);
	});

	it('should recognise input and return a tree for the parentheses exponent statements',function(){
		var tree = parser.parse('(2^2)-(2^1);');
		var expectedTree = [ {	leftChild: { leftChild: { value: 2 } , root: { value: '^' }, rightChild: { value: 2 } },
    							root: { value: '-' },
    							rightChild: { leftChild: { value: 2 }, root: { value: '^' }, rightChild: { value: 1 } } } ]
		
		assert.deepEqual(tree.childTrees,expectedTree);
	});

	it('should recognise input and return a tree for the variable expressions',function(){
		var tree = parser.parse('x=10;y=x+20;y+5;');
		var expectedTree = [ { leftChild: { value: 'x' },root: { value: '=' },rightChild: { value: 10 } },
  							 { leftChild: { value: 'y' },root: { value: '=' },rightChild: { leftChild: {value: 'x'}, root: { value: '+' }, rightChild: { value: 20 } } },
  							 { leftChild: { value: 'y' },root: { value: '+' },rightChild: { value: 5 } } ]

		
		assert.deepEqual(tree.childTrees,expectedTree);
	});

	it('should recognise input and return a tree for the reassigned variables expressions',function(){
		var tree = parser.parse('x=2;x=2^5;x;');
		var expectedTree = [ { leftChild: { value: 'x' },root: { value: '=' },rightChild: { value: 2 } },
 							 { leftChild: { value: 'x' },root: { value: '=' },rightChild: { leftChild: { value: 2 }, root: { value: '^' }, rightChild: { value: 5 } } },
  							 { value: 'x' } ]

		assert.deepEqual(tree.childTrees,expectedTree);
	});
});