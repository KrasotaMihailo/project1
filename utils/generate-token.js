function token(sumString) {
  const symbolArr = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
  let randomString = '';

  for (let i = 0; i < sumString; i += 1) {
    const index = Math.floor(Math.random() * symbolArr.length);

    randomString += symbolArr[index];
  }

  return randomString;
}

module.exports = token;
