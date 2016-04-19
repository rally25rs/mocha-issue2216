function AnotherThingToTest(testNum) {
	this.testNum = testNum;
}

AnotherThingToTest.prototype.doStuff = function(callback) {
	callback(); // will call the done() back in the test.
	this.foo(); // causes an exception after done() is called.
};

module.exports = AnotherThingToTest;