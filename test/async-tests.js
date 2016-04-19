var ThingToTest = require('../ThingToTest');

// output from these tests, which are all exactly the same except the number passed to ThingToTest, is:
//
//
//  1 passing
//  2 failing
//
//   1) async code that runs after a test is done() affects the next test test 2:
//    Error: the string "error from test 1" was thrown, throw an Error :)
//
//   2) async code that runs after a test is done() affects the next test test 3:
//    Error: the string "error from test 2" was thrown, throw an Error :)
//
//
// You can see from the error messages that the async code from test1 causes test2 to fail, and the async code from test2 causes test3 to fail.
// The async code executes after done() is called and Mocha has moved on to the next test.
// Then the async code causes an exception, and Mocha reports that as an error for whatever test is running at that time.
//
// In reality I know that done() should not be called until *all* possible async operations have completed,
// but in a large web app (Backbone, ajax calls, SPA routing, async at multiple layers) that is very difficult to set up and nearly impossible to ensure.
//
//
// As an extra problem, *if* a previous test's async code causes another test to fail and exit prematurely,
// *but* that test also started its own ajax calls before being interupted,
// then the afterEach will be called and clean up the test, then its async operation will run and possibly explode if it needed
// anything that was torn down (like DOM elements) in the afterEach, causing the next test to fail too (and down they go like dominos)

describe('async code that runs after a test is done() affects the next test', function() {
	beforeEach(function() {
		console.log('BEFORE');
	});

	afterEach(function() {
		console.log('AFTER');
	});

	it('test 1', function(done) {
		var callback = function() {
			done();
		};
		var thingToTest = new ThingToTest(1);
		thingToTest.doStuff(callback);
	});

	it('test 2', function(done) {
		var callback = function() {
			done();
		};
		var thingToTest = new ThingToTest(2);
		thingToTest.doStuff(callback);
	});

	it('test 3', function(done) {
		var callback = function() {
			done();
		};
		var thingToTest = new ThingToTest(3);
		thingToTest.doStuff(callback);
	});
});