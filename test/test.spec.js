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
    // Defining virtual template paths
    process.env.TEMPLATE_VUE_PATH = '/templates/template.vue';
    process.env.TEMPLATE_SCSS_PATH = '/templates/template.scss';

    vol.mkdirSync('/templates');
    var vueTemplate = real.readFileSync('./lib/templates/template.vue', 'utf-8');
    vol.writeFileSync(process.env.TEMPLATE_VUE_PATH, vueTemplate);
    var scssTemplate = real.readFileSync('./lib/templates/template.scss', 'utf-8');
    vol.writeFileSync(process.env.TEMPLATE_SCSS_PATH, scssTemplate);
    var obj = real.readFileSync('./test/test.json', 'utf-8');
    vol.writeFileSync('/test.json', obj);

    var testModule = rewire("../lib/index.js");

    testModule.__set__("fs", vol);
    testModule.convertJSON('/test.json', '/', 'true');
    
    let dirStructure = Object.keys(vol.toJSON());
    assert.deepEqual([
    '/test.json',
    '/templates/template.vue',
    '/templates/template.scss',
    '/testDir/newTestDir12/index.js',
    '/testDir/newTestDir12/test.vue',
    '/testDir/newTestDir23/new.vue',
    '/testDir/testComponent/assets/styles/styles.scss',
    '/testDir/testComponent/index.vue',
    '/testDir/testComponent/components/nestedComponent/assets/styles/styles.scss',
    '/testDir/testComponent/components/nestedComponent/index.vue'
    ], dirStructure);
  })
