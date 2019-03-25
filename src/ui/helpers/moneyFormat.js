module.exports = function (value) {
  var strValue = '' + value;
  return '$' + strValue.substring(0, strValue.length - 2) + '.' + strValue.substring(strValue.length - 2);
};
