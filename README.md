# VueJs Project schema generator

## Github

https://github.com/kowi90/vue-project-schema
## Description
It generates a vue directory structure and component templates based on a json schema.

## Install
```bash
npm install -g vue-project-schema
```
## Example
1. Create a "test.json" in a directory with the following content:

```javascript
{
  //  An empty directory can be generated this way
  "src": {},
  //  Empty files can be generated in the directory of the current level
  "files": ["test.txt", "test2.js"],
  // Vue components can be generated this way
  "vue-component": {
    //The name of the Vue component (required)
    "name": "tcomp1",
    //Vue components can be nested this way
    "children": [
       {
	"vue-component":{
         "name": "tcompinner"
      	}
	},{
      	"vue-component": {
         "name": "tcompinner2"
      	}
	}
    ]
  }
}

// The auto generated "tcomp1" Vue component directory structure will be:
// tcomp1
// tcomp1/index.vue
// tcomp1/assets
// tcomp1/assets/styles
// tcomp1/assets/styles/styles.scss

// The childrens will be nested inside
// tcomp1/components
// directory.

```