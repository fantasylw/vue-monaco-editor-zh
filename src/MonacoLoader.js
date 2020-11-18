/*eslint-disable */
module.exports = {
 
  load(srcPath = 'https://microsoft.github.io/monaco-editor/node_modules/monaco-editor/min',callback) {
    var requireConfig = {
      paths: { vs: `${srcPath}/vs` },
      'vs/nls': {
        availableLanguages: {
          '*': 'zh-cn'
        }
      }
    }
    var loaderUrl = `${requireConfig.paths.vs}/loader.js`;
    var context=window;
    var onGotAmdLoader = function() {
      if (context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
        // Do not use webpack
        if (requireConfig.paths && requireConfig.paths.vs) {
          context.require.config(requireConfig);
        }
      }
      // Load monaco
      context['require'](['vs/editor/editor.main'], function() {
        try{
           callback();
         }catch(err){

         }
       
      });
      // Call the delayed callbacks when AMD loader has been loaded
      if (context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
        context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__ = false;
        var loaderCallbacks = context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__;
        if (loaderCallbacks && loaderCallbacks.length) {
          var currentCallback = loaderCallbacks.shift();
          while (currentCallback) {
            currentCallback.fn.call(currentCallback.context);
            currentCallback = loaderCallbacks.shift();
          }
        }
      }
    };
    // Load AMD loader if necessary
    if (context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
      // We need to avoid loading multiple loader.js when there are multiple editors loading concurrently
      //  delay to call callbacks except the first one
      context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__ = context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__ || [];
      context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__.push({
        context: this,
        fn: onGotAmdLoader
      });
    } else {
      if (typeof context.require === 'undefined') {
        var loaderScript = context.document.createElement('script');
        loaderScript.type = 'text/javascript';
        loaderScript.src = loaderUrl;
        loaderScript.addEventListener('load', onGotAmdLoader);
        context.document.body.appendChild(loaderScript);
        context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__ = true;
      } else {
        onGotAmdLoader();
      }
    }
  }
}
