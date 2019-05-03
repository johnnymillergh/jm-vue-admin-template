## 1.0.1 (2019-05-03)


### Bug Fixes

* **$compile:** fix pathPrefix problem ([131c291](https://github.com/johnnymillergh/jm-vue-admin-template/commit/131c291))


### Features

* **$api:** update base URL of api for every environment ([0b8c840](https://github.com/johnnymillergh/jm-vue-admin-template/commit/0b8c840))
* **$auth:** support user login, sign out ([49e7d59](https://github.com/johnnymillergh/jm-vue-admin-template/commit/49e7d59))
* **$Build:** add echarts@4.2.1 dependency ([2867c41](https://github.com/johnnymillergh/jm-vue-admin-template/commit/2867c41))
* **$Build:** add new components ([6a4ae10](https://github.com/johnnymillergh/jm-vue-admin-template/commit/6a4ae10))
* **$Build:** determine public path dynamically by current environment ([77c19f9](https://github.com/johnnymillergh/jm-vue-admin-template/commit/77c19f9))
* **$CodingStandards:** refactor JavaScript utils ([a5c3074](https://github.com/johnnymillergh/jm-vue-admin-template/commit/a5c3074))
* **$compile:** build project ([0433b6a](https://github.com/johnnymillergh/jm-vue-admin-template/commit/0433b6a))
* **$compile:** upgrade project framework build on vue-cli ([8763463](https://github.com/johnnymillergh/jm-vue-admin-template/commit/8763463))
* **$CSS:** use fade transition to change router view ([c457946](https://github.com/johnnymillergh/jm-vue-admin-template/commit/c457946))
* **$env:** generate dashboard title with environment tag ([5804f05](https://github.com/johnnymillergh/jm-vue-admin-template/commit/5804f05))
* **$icon:** add an icon for component-demo ([b22799d](https://github.com/johnnymillergh/jm-vue-admin-template/commit/b22799d))
* **$LoginFooter:** display year range if current year is after 2019 ([ec09885](https://github.com/johnnymillergh/jm-vue-admin-template/commit/ec09885))
* **$NewPage:** add page `Security & Permission` ([2729489](https://github.com/johnnymillergh/jm-vue-admin-template/commit/2729489))
* **$PageCache:** enable Page Cache ([8c218ee](https://github.com/johnnymillergh/jm-vue-admin-template/commit/8c218ee))
* **$SideBar:** add app logo on the top of side bar ([5ad86ea](https://github.com/johnnymillergh/jm-vue-admin-template/commit/5ad86ea))
* **$SVG:** add SVG icon for side bar ([e3e986e](https://github.com/johnnymillergh/jm-vue-admin-template/commit/e3e986e))
* **$SystemControls:** clear selected URL when change API status ([bc3c7f0](https://github.com/johnnymillergh/jm-vue-admin-template/commit/bc3c7f0))
* **$SystemControls:** clear selected URL when change selected controller ([7d92c5e](https://github.com/johnnymillergh/jm-vue-admin-template/commit/7d92c5e))
* **$SystemControls:** display API count ([69a4026](https://github.com/johnnymillergh/jm-vue-admin-template/commit/69a4026))
* **$SystemControls:** get API data from server ([a28d452](https://github.com/johnnymillergh/jm-vue-admin-template/commit/a28d452))
* **$SystemControls:** trigger radio selection when click row ([263a6d8](https://github.com/johnnymillergh/jm-vue-admin-template/commit/263a6d8))
* **$try-catch:** catch exception when validating login form ([8627736](https://github.com/johnnymillergh/jm-vue-admin-template/commit/8627736))
* **$UI:** add basic components ([1d092ff](https://github.com/johnnymillergh/jm-vue-admin-template/commit/1d092ff))
* **$UI:** add Markdown editor ([0bb933e](https://github.com/johnnymillergh/jm-vue-admin-template/commit/0bb933e))
* **$UI:** add tab transition animation ([22952f3](https://github.com/johnnymillergh/jm-vue-admin-template/commit/22952f3))
* **$UI:** add top search bar ([586e373](https://github.com/johnnymillergh/jm-vue-admin-template/commit/586e373))
* **$UI:** draw pie chart of API Analysis ([cc9098b](https://github.com/johnnymillergh/jm-vue-admin-template/commit/cc9098b))
* **$UI:** draw the skeleton of SecurityAndPermission page ([cbbe9a0](https://github.com/johnnymillergh/jm-vue-admin-template/commit/cbbe9a0))


### Reverts

* **$PageCache:** not allow to use nested menu ([12bae6f](https://github.com/johnnymillergh/jm-vue-admin-template/commit/12bae6f))


### BREAKING CHANGES

* **$Build:** no need to modify publicPath when publish application
* **$SideBar:** move layout to /src
* **$compile:** based on vue-cli 3



# 1.0.0 (2019-05-02)


### Features

* **$api:** update base URL of api for every environment ([0b8c840](https://github.com/johnnymillergh/jm-vue-admin-template/commit/0b8c840))
* **$auth:** support user login, sign out ([49e7d59](https://github.com/johnnymillergh/jm-vue-admin-template/commit/49e7d59))
* **$Build:** add echarts@4.2.1 dependency ([2867c41](https://github.com/johnnymillergh/jm-vue-admin-template/commit/2867c41))
* **$Build:** add new components ([6a4ae10](https://github.com/johnnymillergh/jm-vue-admin-template/commit/6a4ae10))
* **$Build:** determine public path dynamically by current environment ([77c19f9](https://github.com/johnnymillergh/jm-vue-admin-template/commit/77c19f9))
* **$CodingStandards:** refactor JavaScript utils ([a5c3074](https://github.com/johnnymillergh/jm-vue-admin-template/commit/a5c3074))
* **$compile:** build project ([0433b6a](https://github.com/johnnymillergh/jm-vue-admin-template/commit/0433b6a))
* **$compile:** upgrade project framework build on vue-cli ([8763463](https://github.com/johnnymillergh/jm-vue-admin-template/commit/8763463))
* **$CSS:** use fade transition to change router view ([c457946](https://github.com/johnnymillergh/jm-vue-admin-template/commit/c457946))
* **$LoginFooter:** display year range if current year is after 2019 ([ec09885](https://github.com/johnnymillergh/jm-vue-admin-template/commit/ec09885))
* **$NewPage:** add page `Security & Permission` ([2729489](https://github.com/johnnymillergh/jm-vue-admin-template/commit/2729489))
* **$PageCache:** enable Page Cache ([8c218ee](https://github.com/johnnymillergh/jm-vue-admin-template/commit/8c218ee))
* **$SideBar:** add app logo on the top of side bar ([5ad86ea](https://github.com/johnnymillergh/jm-vue-admin-template/commit/5ad86ea))
* **$SVG:** add SVG icon for side bar ([e3e986e](https://github.com/johnnymillergh/jm-vue-admin-template/commit/e3e986e))
* **$SystemControls:** clear selected URL when change API status ([bc3c7f0](https://github.com/johnnymillergh/jm-vue-admin-template/commit/bc3c7f0))
* **$SystemControls:** clear selected URL when change selected controller ([7d92c5e](https://github.com/johnnymillergh/jm-vue-admin-template/commit/7d92c5e))
* **$SystemControls:** display API count ([69a4026](https://github.com/johnnymillergh/jm-vue-admin-template/commit/69a4026))
* **$SystemControls:** get API data from server ([a28d452](https://github.com/johnnymillergh/jm-vue-admin-template/commit/a28d452))
* **$SystemControls:** trigger radio selection when click row ([263a6d8](https://github.com/johnnymillergh/jm-vue-admin-template/commit/263a6d8))
* **$try-catch:** catch exception when validating login form ([8627736](https://github.com/johnnymillergh/jm-vue-admin-template/commit/8627736))
* **$UI:** add tab transition animation ([22952f3](https://github.com/johnnymillergh/jm-vue-admin-template/commit/22952f3))
* **$UI:** draw pie chart of API Analysis ([cc9098b](https://github.com/johnnymillergh/jm-vue-admin-template/commit/cc9098b))
* **$UI:** draw the skeleton of SecurityAndPermission page ([cbbe9a0](https://github.com/johnnymillergh/jm-vue-admin-template/commit/cbbe9a0))


### Reverts

* **$PageCache:** not allow to use nested menu ([12bae6f](https://github.com/johnnymillergh/jm-vue-admin-template/commit/12bae6f))


### BREAKING CHANGES

* **$Build:** no need to modify publicPath when publish application
* **$SideBar:** move layout to /src
* **$compile:** based on vue-cli 3



