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
var SchemaEnforcer = require('schema-enforcer');

// User Schema
var schema = {
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

var User   = new SchemaEnforcer(schema);

// user we want to create 
var userData = {
	firstname: 'sterling  ',
	lastname: '  archer',
	jobs: 'Special agent, cocaine Dealer',
	email: 'NEVER!',
};

// will throw an error as jobs property is expected to be array
var newUserInstance = new User(userData)


// Let's update the data
/*
userData = 
{
	firstname: 'Sterling',
	lastname: 'Archer',
	jobs: ['Special Agent', 'Cocaine Dealer'],
	email: 'never!'
}
// will return and instance of user
var newUserInstance = new User(userData)
```

## In the browser

```html
<script type="text/javascript" src="async.js"></script>
<script type="text/javascript" src="schema-inspetor.js"></script>
<script type="text/javascript" src="schema-enforcer.js"></script>
<script type="text/javascript">
	 var User = new SchemaEnforcer({
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
            });
            var myUser = new User({
                firstname: 'sterling  ',
                lastname: '  archer',
                jobs: ['Special agent, cocaine Dealer'],
                email: 'NEVER!',
            })
</script>
```

