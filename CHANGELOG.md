## 1.0.3 (2019-05-25)


### Bug Fixes

* **$compile:** fix pathPrefix problem ([131c291](https://github.com/johnnymillergh/jm-vue-admin-template/commit/131c291))
* **$SSL:** use HTTPS to avoid (blocked:mixed-content) error ([8b593d0](https://github.com/johnnymillergh/jm-vue-admin-template/commit/8b593d0))


### Code Refactoring

* **$API:** modify API resources ([b203dde](https://github.com/johnnymillergh/jm-vue-admin-template/commit/b203dde))
* **$Proxy:** move proxy configuration to proxy.config.js ([2aa0a6e](https://github.com/johnnymillergh/jm-vue-admin-template/commit/2aa0a6e))


### Features

* **$api:** update base URL of api for every environment ([0b8c840](https://github.com/johnnymillergh/jm-vue-admin-template/commit/0b8c840))
* **$API:** set API in use ([7ce62c0](https://github.com/johnnymillergh/jm-vue-admin-template/commit/7ce62c0))
* **$auth:** support user login, sign out ([49e7d59](https://github.com/johnnymillergh/jm-vue-admin-template/commit/49e7d59))
* **$axios:** add new method to send a legacy POST request ([6331abb](https://github.com/johnnymillergh/jm-vue-admin-template/commit/6331abb))
* **$Build:** add echarts@4.2.1 dependency ([2867c41](https://github.com/johnnymillergh/jm-vue-admin-template/commit/2867c41))
* **$Build:** add new components ([6a4ae10](https://github.com/johnnymillergh/jm-vue-admin-template/commit/6a4ae10))
* **$Build:** determine public path dynamically by current environment ([77c19f9](https://github.com/johnnymillergh/jm-vue-admin-template/commit/77c19f9))
* **$build, deploy:** support Docker ([39aea45](https://github.com/johnnymillergh/jm-vue-admin-template/commit/39aea45))
* **$CodingStandards:** refactor JavaScript utils ([a5c3074](https://github.com/johnnymillergh/jm-vue-admin-template/commit/a5c3074))
* **$compile:** build project ([0433b6a](https://github.com/johnnymillergh/jm-vue-admin-template/commit/0433b6a))
* **$compile:** upgrade project framework build on vue-cli ([8763463](https://github.com/johnnymillergh/jm-vue-admin-template/commit/8763463))
* **$CSS:** use fade transition to change router view ([c457946](https://github.com/johnnymillergh/jm-vue-admin-template/commit/c457946))
* **$Directives:** add new directives for select lazy loading ([62144f6](https://github.com/johnnymillergh/jm-vue-admin-template/commit/62144f6))
* **$env:** generate dashboard title with environment tag ([5804f05](https://github.com/johnnymillergh/jm-vue-admin-template/commit/5804f05))
* **$icon:** add an icon for component-demo ([b22799d](https://github.com/johnnymillergh/jm-vue-admin-template/commit/b22799d))
* **$icon:** add an static avatar icon ([34b8dce](https://github.com/johnnymillergh/jm-vue-admin-template/commit/34b8dce))
* **$Layout:** resolve problem that fixed header width would not expend ([ea48e31](https://github.com/johnnymillergh/jm-vue-admin-template/commit/ea48e31))
* **$Login:** display environment alias on login page ([103472f](https://github.com/johnnymillergh/jm-vue-admin-template/commit/103472f))
* **$LoginFooter:** display year range if current year is after 2019 ([ec09885](https://github.com/johnnymillergh/jm-vue-admin-template/commit/ec09885))
* **$NewPage:** add page `Security & Permission` ([2729489](https://github.com/johnnymillergh/jm-vue-admin-template/commit/2729489))
* **$PageCache:** enable Page Cache ([8c218ee](https://github.com/johnnymillergh/jm-vue-admin-template/commit/8c218ee))
* **$request:** handle HTTP response code in axios' interceptor ([3083a49](https://github.com/johnnymillergh/jm-vue-admin-template/commit/3083a49))
* **$request:** return data for every request if success ([9c9f957](https://github.com/johnnymillergh/jm-vue-admin-template/commit/9c9f957))
* **$RoleControls:** draw the UI of Role Controls page ([c35703d](https://github.com/johnnymillergh/jm-vue-admin-template/commit/c35703d))
* **$SideBar:** add app logo on the top of side bar ([5ad86ea](https://github.com/johnnymillergh/jm-vue-admin-template/commit/5ad86ea))
* **$SP:** get API list after enabling all APIs ([98f927c](https://github.com/johnnymillergh/jm-vue-admin-template/commit/98f927c))
* **$SVG:** add SVG icon for side bar ([e3e986e](https://github.com/johnnymillergh/jm-vue-admin-template/commit/e3e986e))
* **$SystemControls:** clear selected URL when change API status ([bc3c7f0](https://github.com/johnnymillergh/jm-vue-admin-template/commit/bc3c7f0))
* **$SystemControls:** clear selected URL when change selected controller ([7d92c5e](https://github.com/johnnymillergh/jm-vue-admin-template/commit/7d92c5e))
* **$SystemControls:** display API count ([69a4026](https://github.com/johnnymillergh/jm-vue-admin-template/commit/69a4026))
* **$SystemControls:** get API data from server ([a28d452](https://github.com/johnnymillergh/jm-vue-admin-template/commit/a28d452))
* **$SystemControls:** trigger radio selection when click row ([263a6d8](https://github.com/johnnymillergh/jm-vue-admin-template/commit/263a6d8))
* **$try-catch:** catch exception when validating login form ([8627736](https://github.com/johnnymillergh/jm-vue-admin-template/commit/8627736))
* **$UI:** add a button to set all API in use ([9b67868](https://github.com/johnnymillergh/jm-vue-admin-template/commit/9b67868))
* **$UI:** add API detail list ([942dce3](https://github.com/johnnymillergh/jm-vue-admin-template/commit/942dce3))
* **$UI:** add basic components ([1d092ff](https://github.com/johnnymillergh/jm-vue-admin-template/commit/1d092ff))
* **$UI:** add fixedHeader ([c89cf5b](https://github.com/johnnymillergh/jm-vue-admin-template/commit/c89cf5b))
* **$UI:** add Markdown editor ([0bb933e](https://github.com/johnnymillergh/jm-vue-admin-template/commit/0bb933e))
* **$UI:** add tab transition animation ([22952f3](https://github.com/johnnymillergh/jm-vue-admin-template/commit/22952f3))
* **$UI:** add top search bar ([586e373](https://github.com/johnnymillergh/jm-vue-admin-template/commit/586e373))
* **$UI:** click tag to remove itself ([5e9f166](https://github.com/johnnymillergh/jm-vue-admin-template/commit/5e9f166))
* **$UI:** create role ([cb19ea7](https://github.com/johnnymillergh/jm-vue-admin-template/commit/cb19ea7))
* **$UI:** disable button when status is in use ([56cc686](https://github.com/johnnymillergh/jm-vue-admin-template/commit/56cc686))
* **$UI:** display user's full name ([69a7de6](https://github.com/johnnymillergh/jm-vue-admin-template/commit/69a7de6))
* **$UI:** draw authorization tab's UI ([9504199](https://github.com/johnnymillergh/jm-vue-admin-template/commit/9504199))
* **$UI:** draw pie chart of API Analysis ([cc9098b](https://github.com/johnnymillergh/jm-vue-admin-template/commit/cc9098b))
* **$UI:** draw step 1's UI ([80496ab](https://github.com/johnnymillergh/jm-vue-admin-template/commit/80496ab))
* **$UI:** draw step 3's UI ([24de83b](https://github.com/johnnymillergh/jm-vue-admin-template/commit/24de83b))
* **$UI:** draw the skeleton of SecurityAndPermission page ([cbbe9a0](https://github.com/johnnymillergh/jm-vue-admin-template/commit/cbbe9a0))
* **$UI:** draw UI of Step 1 & Step 4 page ([672e376](https://github.com/johnnymillergh/jm-vue-admin-template/commit/672e376))
* **$UI:** edit role ([ae9bb2f](https://github.com/johnnymillergh/jm-vue-admin-template/commit/ae9bb2f))
* **$UI:** search role ([cb518ac](https://github.com/johnnymillergh/jm-vue-admin-template/commit/cb518ac))


### Reverts

* **$PageCache:** not allow to use nested menu ([12bae6f](https://github.com/johnnymillergh/jm-vue-admin-template/commit/12bae6f))


### BREAKING CHANGES

* **$API:** API resources named by kebab-case naming rule
* **$Proxy:** Simplify vue.config.js
* **$Layout:** Rename file Layout.vue -> layout/index.vue
* **$axios:** New method to send a legacy POST request with form data
* **$build, deploy:** Dockerize Vue.js application
* **$request:** HTTP response status code now is equal to
ResponseBodyBean's status
* **$Build:** no need to modify publicPath when publish application
* **$SideBar:** move layout to /src
* **$compile:** based on vue-cli 3



