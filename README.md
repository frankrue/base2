# Base 2
> Provides a template for all HTML5, CSS, and JS projects. Ultimately, the output is built and minified to protect proprietary intellectual property.

## Contents
- [Basic Setup](#setup)
- [Basic Watching/Editing](#watch)
- [Building/Minifying for Distribution](#build)
- [Deploying to Amazon Elastic Beanstalk](#deploy)

## <a name="setup"></a>Basic Setup

```bash
npm install
bower install
```

## <a name="watch"></a>Basic Watching/Editing
Gulp will run a watch server at localhost:3000 and open Chrome to view your work. This will also take care of compiling SASS and refreshing the page on JS changes.
```bash
gulp
```

## <a name="defaults"></a>Defaults
Make sure you add any global constants to the Defaults.js file, including (if you're using Keen tracking) the Keen `projectId`, `writeKey`, and `readKey`. 

## <a name="tracking"></a>Tracking with [Keen.IO](http://keen.io)
You can easily track anything at all by using API calls to Keen. This first requires that you [set up a new project](https://keen.io/add-project?organization_id=54ec9b7296773d6071c8e284) in your Keen Boco Digital dashboard.

The code to do this looks like this:
```javascript
// don't forget to include a defined Tracking.js module from the utils folder
Tracking.send("global", { name: "app-init" } );
```
Keep in mind that the first and second parameters are wide open. The first must always be a string, but it can be any collection name (single word with hyphens or underscores) you want; the second is a JavaScript object, so can include ANY properties you want. It's a good idea to ensure you're collecting lots of *good* data in this object.

## <a name="build"></a>Building/Minifying for Distribution
To distribute the file so that our work is protected, us the following command:
```bash
gulp build
```

This will create a build folder *which is also necessary for Amazon deployment*, which you can then upload anywhere with the dependencies therein.

> **Please note:** The `inc` folder is used for assets that need to be copied into the `build` folder. Put files in folders within `inc` like `audio`, `video`, etc.


## <a name="deploy"></a>Deploying to Amazon Elastic Beanstalk
If you already have your Amazon Credentials set up, you can use the following commands to get a real server instance running (non-load-balanced, single-instance) for the first time:

```bash
eb init
eb create
```

Then use this command for new deploys:
```bash
eb deploy
```

Finally, use this to terminate the server when the project is done:
```bash
eb terminate
```
