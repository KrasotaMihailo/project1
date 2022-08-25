function token(sumString) {
    const symbolArr = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    var randomString = "";
    for (let i = 0; i < sumString; i++) {
      var index = Math.floor(Math.random() * symbolArr.length);
      randomString += symbolArr[index];
    }
    return randomString;
  }

  module.exports = token