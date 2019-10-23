# pc domhandler

>  A lightwieght playcanvas dom handler plugin for loading , removing and updating html,css files.If files are loaded and you change the given file contents in runtime , it automatically updates on the browser.
>
>  By default , autoUpdate is enabled , but you can change it later
>
>  Just get the built file from /dist folder and drop to playcanvas.

### Usage

```javascript
var test = new esr.DomHandler('test.css','test.html') 

// for loading
test.loadDom();

// for removing
test.removeDom();

// for status of files
test.loaded // Boolean

// for autoUpdate property
test.autoUpdate // Boolean

// for toggling autoUpdate
test.toggleAutoUpdate()
```

