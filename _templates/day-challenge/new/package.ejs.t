---
to: <%= year %>/<%= day %>/package.json
unless_exists: true
---
{
    "name": "<%= year %><%= day %>",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "module": "commonjs",
    "scripts": {
      "run": "node index.mjs",
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "Luciano Silva",
    "license": "ISC"
}
