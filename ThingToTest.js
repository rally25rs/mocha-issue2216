function ThingToTest(testNum) {
	this.testNum = testNum;
}

ThingToTest.prototype.doStuff = function(callback) {
	var testNum = this.testNum;

	setTimeout(function() {
		throw 'error from test ' + testNum;
	}, 150);
	setTimeout(function() {
		callback();
	}, 100);
};

module.exports = ThingToTest;