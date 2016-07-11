(function(){
    var root = {};
    // Dependencies --------------------------------------------------------------
    root.async = (typeof require === 'function') ? require('async') : window.async;
    if (typeof root.async !== 'object') {
        throw new Error('Module async is required (https://github.com/caolan/async)');
    }
    var async = root.async;
   // Dependencies --------------------------------------------------------------
    root['SchemaInspector'] = (typeof require === 'function') ? require('schema-inspector') : window['SchemaInspector'];
    if (typeof root['SchemaInspector'] !== 'object') {
        throw new Error('Module async is required (https://github.com/caolan/async)');
    }
    var async = root.async;
    var inspector = root['SchemaInspector'];
    var SchemaEnforcer = function(schema) {
        var child = function (object) {
            this.schema = schema;
            this.object = object;
            var result = inspector.validate(schema, object);
            if (result.valid) {
                return object;
            } else {
                throw new Error(result.format());
            }
        }
        return child;
    }
    // if server-side (node.js) else client-side
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = SchemaEnforcer;
    }
    else {
        window.SchemaEnforcer = SchemaEnforcer;
    }
})()