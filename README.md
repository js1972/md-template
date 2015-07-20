## Background
This repo is a Fiori master-detail template app using OpenUI5.

This template app shows you end-to-end how to setup and manage your UI5 application, from installing, running, testing and building.
- ideal starter for a new Fiori-style app
- it has very useful easy to follow Qunit and Opa tests
- it show cases 'grunt-openui5' and Bower features available
- shows how to automate your Qunit and Opa tests and run them silently in PhantomJS
- shows how to integrate your app with the Continuous Integration platform Travis

more
- has a couple of nice reusable "Fiori" pattern examples, filterbar label (Master) and toggle buttons (LineItem)
- a good examples of how to use promises with models and lists

This repo uses Bower for the OpenUI5 sources by default. As these are debug (non-compressed) sources the log leve is set to ERROR which does slow down the running on the app.
You can use [jQuery.sap.log.setLevel](https://openui5.hana.ondemand.com/#docs/api/symbols/jQuery.sap.log.html) to override this and set the log level in code. Or, you can point to a different source for the OpenUI5/SAPUI5 runtime.

## Current issues
- Unit test are running extremely slow in PhantomJS
- OPA tests are running extremely slow and fail in PhatomJS
- Refactor module loading to use new RequireJS style (currently only used in some modules)
- Might need to play around with bootstrap tag \'data-sap-ui-preload\' to get a performant solution (check existing fiori apps as this stuff is changing from each UI5 release)
- Update source for OpenUI5 coding style - this currently has incorrect quotes for example...

## To get started
Ensure you have installed Node.js

```javascript
git clone https://github.com/js1972/md-template.git
npm install
bower install
```
This will create a local copy of the repository, install all the necessary node packages and also install the OpenUI5 src

## To run the app
```javascript
grunt serve
```
this will setup a server which hosts the app, open up your browser and point it to

[http://localhost:8080/index.html?responderOn=true](http://localhost:8080/index.html?responderOn=true)

this wil run the app using mock data for the OData service.

## Other grunt options include:
Run the app with live browser reloading when changes are made to the app
```javascript
grunt serveLive
```

Build a production version of the app then run it
```javascript
grunt build
grunt serve:dist
```

## To run the Unit and Opa tests

[http://localhost:8080/test-resources/unit/UnitTestsGrunt.qunit.html](http://localhost:8080/test-resources/unit/UnitTestsGrunt.qunit.html)

[http://localhost:8080/test-resources/opa/OpaTestsGrunt.qunit.html](http://localhost:8080/test-resources/opa/OpaTestsGrunt.qunit.html)

## To run the Unit and Opa test via PhantomJS
use one of the following commands to run both, or run individual
```javascript
grunt test

grunt unitTest

grunt opaTest
```
## To integrate with Travis-CI
A CI tool makes working in a team easier with automated builds. These builds are triggered automatically when each developer checks in their code to the repository. The build process incorporates testing, if testing fails the build stops and team members will be notified.

#### how to, very quick only a couple of steps
http://code.tutsplus.com/tutorials/travis-ci-what-why-how--net-34771

the results
https://travis-ci.org/jasper07/md-template



