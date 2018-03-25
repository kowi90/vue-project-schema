var rewire = require("rewire");
var test = require("japa");
var vol = require("memfs").vol;
var fs = require("memfs").fs;
var real = require("fs");


test('Virtual filesystem is working', async (assert) => {
    var obj = real.readFileSync('./test/test.json', 'utf-8');
    vol.writeFileSync('/test.json', obj);
    let dirStructure = Object.keys(vol.toJSON());
    assert.deepEqual(['/test.json'], dirStructure);
  })





test('Correct files are generated on the right path', async (assert) => {
    
    var obj = real.readFileSync('./test/test.json', 'utf-8');
    vol.writeFileSync('/test.json', obj);
    
    var testModule = rewire("../lib/index.js");

    testModule.__set__("fs", vol);
    testModule.convertJSON('/test.json', '.', false);
    
    let dirStructure = Object.keys(vol.toJSON());
    
    assert.deepEqual(['/test.json'], dirStructure);
  })
