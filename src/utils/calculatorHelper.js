export const shuffleIds = (questions) => {
    let array = questions.map(question => question.id);
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

export const getMaxResults = (no) => {
    let result = 1;
    for (var i = no; i > 0; i--) {
        result = result * i;
    }

    return result;
}

export const checkDuplicate = (array, destinationArray) => {
    if (!array || !destinationArray) {
        return;
    }
    let isDuplicated = false;
    destinationArray.map(arr => {
        if (JSON.stringify(array) === JSON.stringify(arr)) {
            isDuplicated = true;
        }
        return arr;
    });

    return isDuplicated;
}

export const shuffleQuestions = (questions, numberOfCopy) => {
    if (getMaxResults(questions.length) < numberOfCopy) {
        return null;
    }

    let resultIds = [];
    let copies = [];

    const checkAndPush = () => {
        let array1 = shuffleIds(questions);
        if (!checkDuplicate(array1, resultIds)) {
            resultIds.push(array1);
        } else {
            checkAndPush();
        }
    }

    for (let i = 0; i < numberOfCopy; i++) {
        checkAndPush();
    }

    

    resultIds.map(ids => {
        let copy = [];
        ids.map(id => {
            let qst = questions.find(q => q.id === id);
            copy.push(qst);
            return id;
        });

        copies.push(copy);

        return ids;
    });

    console.log(copies);

    return copies;

}



  