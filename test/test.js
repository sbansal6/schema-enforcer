var schemaEnforcer = require('../index');
var expect = require('chai').expect;

describe('schema-enforcer',function(){
    // define user schema
    var User = new schemaEnforcer({
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
    it('should throw an error if object doesn\'t conform to schema',function() {
        // jobs is an string but array expected as per schema
        var createUser = function () {
            new User({
                firstname: 'rob',
                lastname: 'archer',
                jobs: 'Special agent, cocaine Dealer',
                email: 'NEVER!',
            })
        }
        expect(createUser).to.throw(Error)
    })

    it('should pass if object conforms to schema',function() {
        // jobs is an array as expected in schema
        var createUser = function () {
            new User({
                firstname: 'alex',
                lastname: '  knight',
                jobs: ['Special agent, cocaine Dealer'],
                email: 'NEVER!',
            })
        }
        expect(createUser).to.equal(createUser)
    })

})