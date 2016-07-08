Schema-Enforcer is a powerful tool to enforce schema on JS objects.
It's based on powerful schema-inspector module https://github.com/Atinux/schema-inspector
It's designed to work both client-side and server-side and to be scalable with allowing asynchronous and synchronous calls.

## Installation

### Node.js
<pre>npm install schema-enforcer</pre>

### Browser
<pre>bower install schema-enforcer</pre>
(Or download [async.js](https://raw.github.com/caolan/async/master/lib/async.js) and [schema-inspector.js](https://raw.github.com/Atinux/schema-inspector/master/lib/schema-inspector.js) and [schema-enforcer.js]() manually).
```html
<script type="text/javascript" src="bower_components/async/lib/async.js"></script>
<script type="text/javascript" src="bower_components/schema-inspector/lib/schema-inspector.js"></script>
<script type="text/javascript" src="bower_components/schema-enforcer/lib/schema-enforcer.js"></script>
```

## Usage

```javascript
var inspector = require('schema-inspector');

// Data that we want to sanitize and validate
var data = {
	firstname: 'sterling  ',
	lastname: '  archer',
	jobs: 'Special agent, cocaine Dealer',
	email: 'NEVER!',
};

// Sanitization Schema
var sanitization = {
	type: 'object',
	properties: {
		firstname: { type: 'string', rules: ['trim', 'title'] },
		lastname: { type: 'string', rules: ['trim', 'title'] },
		jobs: {
			type: 'array',
			splitWith: ',',
			items: { type: 'string', rules: ['trim', 'title'] }
		},
		email: { type: 'string', rules: ['trim', 'lower'] }
	}
};
// Let's update the data
inspector.sanitize(sanitization, data);
/*
data is now:
{
	firstname: 'Sterling',
	lastname: 'Archer',
	jobs: ['Special Agent', 'Cocaine Dealer'],
	email: 'never!'
}
*/

// Validation schema
var validation = {
	type: 'object',
	properties: {
		firstname: { type: 'string', minLength: 1 },
		lastname: { type: 'string', minLength: 1 },
		jobs: {
			type: 'array',
			items: { type: 'string', minLength: 1 }
		},
		email: { type: 'string', pattern: 'email' }
	}
};
var result = inspector.validate(validation, data);
if (!result.valid)
	console.log(result.format());
/*
	Property @.email: must match [email], but is equal to "never!"
*/
```

**Tips:** it's recommended to use one schema for the sanitzation and another for the validation,

## In the browser

```html
<script type="text/javascript" src="async.js"></script>
<script type="text/javascript" src="schema-inspetor.js"></script>
<script type="text/javascript">
	var schema = { /* ... */ };
	var candidate = { /* ... */ };
	SchemaInspector.validate(schema, candidate, function (err, result) {
		if (!result.valid)
			return alert(result.format());
	});
</script>
```

