function numbersRandom(cant) {
  let numbers = [];
  for (let i = 1; i <= cant; i++) {
    let numberRandom = Math.floor(Math.random() * cant);
    numbers.push(numberRandom);
  }
  return numbers;
}

function countValues(list) {
  console.log(list);
  let mapNumbersCount = [];

  for (let i = 0; i < list.length; i++) {
    let count = 0;
    let data = {};
    let key = list[i];
    list.forEach((element) => {
      if (element === list[i]) {
        count++;
      }
    });

    data[`${key}`] = count;
    mapNumbersCount.push(data);
  }

  return mapNumbersCount;
}

function uniqueValuesListObj(mapNumbersCount) {
  let hash = {};
  let array = mapNumbersCount.filter((e) => (hash[Object.keys(e)[0]] ? false : (hash[Object.keys(e)[0]] = true)));
  return array;
}

process.on('message', (cant) => {
  let randoms = [];
  for (let i = 0; i <= cant; i++) {
    let numsRandom = numbersRandom(1000);
    let listObjMap = countValues(numsRandom);
    randoms = randoms.concat(listObjMap);
  }

  let result = uniqueValuesListObj(randoms);
  process.send(result);
});
