var mocha = require('mocha');
var expect = require('chai').expect;
var sanitizeString = require('../../lib/helpers').sanitizeString;

describe('sanitize string test', function() {
  var input1 = 'some,values,"these,are,between,double,quotes"';
  var expectedOutput1 = 'some,values,these|are|between|double|quotes';
  var result1 = sanitizeString(input1);

  var input2 = 'these,"are,some",comma,"separated,values,with,some",double,"quotes"';
  var expectedOutput2 = 'these,are|some,comma,separated|values|with|some,double,quotes';
  var result2 = sanitizeString(input2);

  it('should replace commas between double quotes with a placeholder', function() {
    expect(result1).to.eql(expectedOutput1);
    expect(result2).to.eql(expectedOutput2);
  });
});
