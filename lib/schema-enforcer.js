(function(){
    var root = {};
    // Dependencies --------------------------------------------------------------
    root.async = (typeof require === 'function') ? require('async') : window.async;
    if (typeof root.async !== 'object') {
        throw new Error('Module async is required (https://github.com/caolan/async)');
    }
    root['schema-inspector'] = (typeof require === 'function') ? require('schema-inspector') : window['schema-inspector'];
    if (typeof root['schema-inspector'] !== 'object') {
        throw new Error('Module schema-inspector is required (https://github.com/Atinux/schema-inspector)');
    }
    var async = root.async;
    var inspector = root['schema-inspector'];
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
})()