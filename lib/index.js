var fs = require('fs');
var Logger = require('./helpers/log.js');
const VUE_ASSETS_DIR = '/assets';
const VUE_SCSS_DIR = '/assets/styles';
const VUE_COMPONENTS_DIR = 'components';
const TEMPLATE_ENCODING = 'utf-8';

const VUE_COMPONENT = 'vue-component';
const FILES = 'files';
const NAME = 'name';
const CHILDREN = 'children';

const TYPE_FILE = 'type-file';
const TYPE_VUE_COMPONENT = 'type-vue-component';
const TYPE_DIR = 'type-dir';

function processData(data, depth, workArray) {

    if (depth === undefined) {
        depth = '';
    }
    let keys = Object.keys(data);

    keys.forEach(key => {
        switch(key) {
            case VUE_COMPONENT:
                workArray.push({
                    type: TYPE_VUE_COMPONENT,
                    path: depth,
                    name: data[key].name
                });
                processData(data[key], depth + '/' + data[key].name, workArray);
                return;
            case FILES:
                data[FILES].forEach(val => {
                    let path = depth + '/' +val;
                    workArray.push({
                        type: TYPE_FILE,
                        path: path
                    });
                })
                return;
            case NAME:
            return;
            case CHILDREN:
               let path = depth + '/components';
                   workArray.push({
                       type: TYPE_DIR,
                       path: path
                    });
                    let children = data[key];
                    children.forEach(child => {
                        processData(child, path, workArray);
                    })
                return;
            default:
                    workArray.push({
                        type: TYPE_DIR,
                        path: depth + '/' +key
                    });
                processData(data[key], depth + '/' +key, workArray);
        }
    });
}

var getComponentSet = function (componentName) {
    let vueTemplate = fs.readFileSync(__dirname + '/templates/template.vue').toString('utf8');
    let scssTemplate = fs.readFileSync(__dirname + '/templates/template.scss').toString('utf8');
    vueTemplate = vueTemplate.replace('%component_name%', componentName);
    scssTemplate = scssTemplate.replace('%component_name%', componentName);
    return {
        vue: vueTemplate,
        scss: scssTemplate
    }
}

var generateComponentDirs = function (path, name) {
    fs.mkdirSync(path + '/' + name);
    fs.mkdirSync(path + '/' + name + VUE_ASSETS_DIR);
    fs.mkdirSync(path + '/' + name + VUE_SCSS_DIR);
}

var generateComponent = function (path, name) {
    fs.writeFileSync(path + '/' + name + '/index.vue', getComponentSet(name).vue);
    fs.writeFileSync(path + '/' + name + VUE_SCSS_DIR + '/styles.scss' , getComponentSet(name).scss);
}

var convertJSON = function(jsonPath, outputPath, supress) {
    if (typeof supress !== undefined && supress === 'true') {
        Logger.supressAll();
    }
    var obj = JSON.parse(fs.readFileSync(jsonPath, TEMPLATE_ENCODING));
    let workArray = [];
    try {
        processData(obj, outputPath, workArray);
    } 
    catch (e) {
        throw Error('Invalid JSON object');
    }

    workArray.forEach(item => {
        switch (item.type){
            case TYPE_DIR:
                if (fs.existsSync(item.path)) {
                    Logger.exists(item.path);
                    return;
                }
                fs.mkdirSync(item.path);
                Logger.created(item.path);
                return;
            case TYPE_VUE_COMPONENT:
                if (fs.existsSync(item.path + '/' + item.name)) {
                    Logger.exists(item.path);
                    return;
                }
                generateComponentDirs(item.path, item.name);
                generateComponent(item.path, item.name);

                Logger.created(item.path);
                return;
            default:
                if (fs.existsSync(item.path)) {
                    Logger.exists(item.path);
                    return;
                }
                fs.closeSync(fs.openSync(item.path, 'w'));
                Logger.created(item.path);
        }  
    });
};

exports.convertJSON = convertJSON;
