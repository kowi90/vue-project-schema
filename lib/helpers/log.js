var colors = require('colors');

const TYPE_FILE = 'type-file';
const TYPE_VUE_COMPONENT = 'type-vue-component';
const TYPE_DIR = 'type-dir';
const SUCCESS_MESSAGE = 'Successfully created: ';
const EXISTS_MESSAGE = 'Already exists: ';

let supress = false;

module.exports = {
    created: (path) => {
        if(supress){return;}
        console.log(SUCCESS_MESSAGE.green, path.yellow);
    },
    exists: (path) => {
        if(supress){return;}
        console.log(EXISTS_MESSAGE.red, path.yellow);
    },
    supressAll: () => {
      supress = true;
    }
}