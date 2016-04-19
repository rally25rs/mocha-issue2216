var AnotherThingToTest = require('../AnotherThingToTest');

// the output of these 3 tests is:
//
// 2 passing (50ms)
// 2 failing
//
// I think some reporters total this up to 4 tests.

describe('if an exception occurs after done() is called, test is reported as both success and failure', function() {
	it('test 1', function(done) {
		var callback = function() {
			done();
		};
		var thingToTest = new AnotherThingToTest();
		thingToTest.doStuff(callback);
	});

	it('test 2', function(done) {
		var callback = function() {
			done();
		};
		var thingToTest = new AnotherThingToTest();
		thingToTest.doStuff(callback);
	});
});