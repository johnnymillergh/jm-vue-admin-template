# JM-Vue-Admin-Template

[![GitHub release](https://img.shields.io/github/release/johnnymillergh/jm-vue-admin-template.svg)](https://github.com/johnnymillergh/jm-vue-admin-template/releases)
[![GitHub stars](https://img.shields.io/github/stars/johnnymillergh/jm-vue-admin-template.svg?style=social&label=Stars)](https://github.com/johnnymillergh/jm-vue-admin-template)
[![Build Status](https://travis-ci.org/johnnymillergh/jm-vue-admin-template.svg?branch=master)](https://travis-ci.org/johnnymillergh/jm-vue-admin-template)
[![license](https://img.shields.io/hexpm/l/plug.svg)](https://github.com/johnnymillergh/jm-vue-admin-template/blob/master/LICENSE)
[![Vue.js](https://img.shields.io/badge/vue-2.6.10-brightgreen.svg)](https://github.com/vuejs/vue)
[![Element UI](https://img.shields.io/badge/element--ui-2.7.0-brightgreen.svg)](https://github.com/ElemeFE/element)

> A minimal vue admin template with Element UI & axios & iconfont & permission control & lint.

[Click me to preview](http://johnnymillergh.github.io/jm-vue-admin-template-prod)

## Build Setup

```bash
# Clone project
git clone https://github.com/johnnymillergh/jm-vue-admin-template.git

# Install dependencies
npm install

# Serve with hot reload at localhost:9528
npm run dev

# Build for production with minification
npm run build

# Build for production and view the bundle analyzer report
npm run build --report
```

## Coding Standards

### JavaScript

1. File naming rule: module name with kebab-case naming rule.

2. Standard JavaScript code with export statement. The following JavaScript snippet declares some login APIs that will be used by pages.

   ```javascript
   import { get, post } from '@/utils/request'
   
   // The module to be exported should be named with PascalCase.
   const Login = {
     validateUsername: params => get('/auth/validateUsername/' + params, null),
     login: params => post('/auth/login', params)
   }
   
   // Use `export default` statement to export module.
   export default Login
   
   ```

   Therefore, the import statement to import the Login module should be like following JavaScript snippet.

   ```javascript
   // The module imported is without mustache brackets.
   import Login from '@/api/auth/login'
   ```

   The `@` sign is the alias for `src` directory.

3. …

## Parent Project

[vue-admin-template](<https://github.com/PanJiaChen/vue-admin-template>) by [PanJiaChen](https://github.com/PanJiaChen)

## License

[Apache](<https://github.com/johnnymillergh/jm-vue-admin-template/blob/master/LICENSE>) license.

Johnny Miller (锺俊) Copyright © 2019-Present