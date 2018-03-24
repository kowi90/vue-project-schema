var colors = require('colors');

const TYPE_FILE = 'type-file';
const TYPE_VUE_COMPONENT = 'type-vue-component';
const TYPE_DIR = 'type-dir';
const SUCCESS_MESSAGE = 'Successfully created: ';
const EXISTS_MESSAGE = 'Already exists: ';

module.exports = {
    created: (path) => {
        console.log(SUCCESS_MESSAGE.green, path.yellow);
    },
    exists: (path) => {
        console.log(EXISTS_MESSAGE.red, path.yellow);
    }
}