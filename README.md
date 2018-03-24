# VueJs Project schema generator

It generates a directory structure and templates based on a json schema.

## Install
```bash
npm install -g vue-project-schema
```
## Example
1. Create a "test.json" in a directory with the following content:

```javascript
{
    "dir_main": {
      "dir_inner": {
          "files": ['test.js', 'test.vue']
      },
      "dir_inner2": {

      }
    }
}

```