# pc domhandler

> A lightwieght playcanvas dom handler plugin for loading , removing and updating html,css files.
>
> Just get the built file from /dist folder and drop to playcanvas

### Usage

```javascript
var test = new esr.DomHandler('test.css','test.html') 

// for loading
test.loadDom();

// for removing
test.removeDom();

// for updating
test.update();

// for status of files
test.loaded // Boolean

```

