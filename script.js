// Array of real sentences to be referenced
const realSentences = [
    {
        sentence: "Oh, you must not talk about dying yet.",
        author: "Charles Dickens",
        book: "Oliver Twist",
    },
    {
        sentence: "It's all over, Mrs. Thingummy!",
        author: "Charles Dickens",
        book: "Oliver Twist"
    },
    {
        sentence: "No wedding ring, I see.",
        author: "Charles Dickens",
        book: "Oliver Twist"
    },
    {
        sentence: "Oliver cried lustily.",
        author: "Charles Dickens",
        book: "Oliver Twist"
    },
    {
        sentence: "What's your name, boy?",
        author: "Charles Dickens",
        book: "Oliver Twist"
    },
    {
        sentence: "Yet I cannot tarry longer.",
        author: "Gibran Kahlil Gibran",
        book: "The Prophet"
    },
    {
        sentence: "And what is it to work with love?",
        author: "Gibran Kahlil Gibran",
        book: "The Prophet"
    },
    {
        sentence: "Work is love made visible.",
        author: "Gibran Kahlil Gibran.",
        book: "The Prophet"
    },
    {
        sentence: "Now I am old-fashioned.",
        author: "Agatha Christie",
        book: "The Murder on the Links"
    },
    {
        sentence: "I knew you weren’t such a mutt as you looked.",
        author: "Agatha Christie",
        book: "The Murder on the Links"
    },
    {
        sentence: "It’s cut from a cottage loaf.",
        author: "Agatha Christie",
        book: "The Murder on the Links"
    },
];

const playGame = () => {
    let sentenceIndex = randomNumber(); // Randomly select a sentence
    let letterArray = firstLetterArray(sentenceIndex); // create an array consisting of the first letters of that sentence

    const incompleteSentence = document.getElementById('incomplete-sentence');
    const sentenceForm = document.getElementById('sentenceForm');
    const submitButton = document.getElementById('submit');
    
    displaySentence(letterArray); // display the first letter of each sentence to the user along with input boxes for the user to complete each word
    
    let bookSentence;
    submitButton.onclick = function() {
        let userSentence = getUserSentence(sentenceIndex); // get the sentence the user submits, check if it's valid
        if (isValidSentence(userSentence, letterArray)) {
            bookSentence = displaySentenceChoices(userSentence, sentenceIndex); // display the user sentence and the book sentence
        } else {
            displayErrorMessage(userSentence, letterArray);
        }
    }

    //highlight the sentence selected by the user
    let userChoice;
    let sentence1 = document.getElementById('sentence1');
    let sentence2 = document.getElementById('sentence2');

    sentence1.onclick = function() {
        highlightSentence(sentence1, sentence2);
        userChoice = sentence1;
    }
    sentence2.onclick = function() {
        highlightSentence(sentence2, sentence1);
        userChoice = sentence2;
    }
    
    //display the correct answer when the users presses 'submit' for the second time;
    document.getElementById('submitGuess').onclick = function() {
        displayAnswer(bookSentence.innerHTML, userChoice.innerHTML, sentenceIndex);
    }
}

playGame();

//Generate a random number within the bounds of the array of sentences
function randomNumber() {
    return Math.floor(Math.random() * realSentences.length);
}

// Get an array of first letters of each word
function firstLetterArray(sentenceIndex) {
    const wordArray = realSentences[sentenceIndex].sentence.split(" ");
    const letterArray = [wordArray[0][0]];
    
    for (let i = 1; i < wordArray.length; i++) {
        letterArray.push(wordArray[i][0].toLowerCase());
    }

    return letterArray
}

//display a form consisting of the first letter of each word in the book sentence plus a text input space for the user to complete the word
function displaySentence(letterArray) {
    let formHTML = `<form id="sentenceForm">`;
    letterArray.forEach(letter => {
        formHTML += `<div class="word"><input type="text" id="${letter}" name="${letter}" placeholder="${letter}"></input></div>`;
    })
    formHTML += `</form>`;
    sentenceForm.innerHTML = formHTML;
}

// Get the user's sentence
function getUserSentence(sentenceIndex) {
    var form = document.getElementById("sentenceForm");
    var userSentence = "";
    for (let i = 0; i < form.length - 1; i++) {
        //userSentence += form.elements[i].name;
        userSentence += form.elements[i].value.trim();
        userSentence += " ";
    }
    userSentence = userSentence.trim();

    return userSentence;
}

// check if the sentence is long enough and starts with the correct letters
function isValidSentence(userSentence, letterArray) {
    let userSentenceArray = userSentence.split(" ");

    if (userSentenceArray.length != letterArray.length) {
        return false;
    }

    for (let i = 0; i < userSentenceArray.length; i++) {
        if (userSentenceArray[i][0].toLowerCase() != letterArray[i].toLowerCase()) {
            return false;
        }
    }

    return true;
}git 

// show an error message if the user sentence does not pass validation
function displayErrorMessage(userSentence, letterArray) {
    let userSentenceArray = userSentence.split(" ");

    if (userSentenceArray.length != letterArray.length) {
        document.getElementById('invalid-submission').innerHTML = "Don't leave any words blank."
        document.getElementById('invalid-submission').style.display = "block";
    } else {
        for (let i = 0; i < userSentenceArray.length; i++) {
            if (userSentenceArray[i][0].toLowerCase() != letterArray[i].toLowerCase()) {
                document.getElementById('invalid-submission').innerHTML = `The ${getOrdinal(i + 1)} word must start with the letter ${letterArray[i].toUpperCase()}`;
                document.getElementById('invalid-submission').style.display = "block";
                return;
            }
        }
    }
}

// return a correct ordinal for use in the error message
function getOrdinal(n) {
    if (n === 1) {
        return "1st";
    } else if (n === 2) {
        return "2nd";
    } else if (n === 3) {
        return "3rd";
    } else {
        return `${n}th`;
    }
}

//display the sentence options: written by the user or the sentence from the book
function displaySentenceChoices(userSentence, sentenceIndex) {
    document.getElementById('incomplete-sentence').style.display = "none";

    let bookSentence = realSentences[sentenceIndex].sentence;
    
    // select either 0 or 1 and use the selection to determine the order in which the sentences are displayed
    let userNumber = Math.floor(Math.random() * 2); // select either 0 or 1

    if (userNumber === 1) {
        document.getElementById('sentence1').innerHTML = userSentence;
        document.getElementById('sentence2').innerHTML = bookSentence;
        document.getElementById('select-sentence').style.display = "block";
        return document.getElementById('sentence2');
    } else {
        document.getElementById('sentence2').innerHTML = userSentence;
        document.getElementById('sentence1').innerHTML = bookSentence;
        document.getElementById('select-sentence').style.display = "block";
        return document.getElementById('sentence1');
    }
}


function highlightSentence(clickedElement, otherElement) {
    clickedElement.style.backgroundColor = "#1D70A2";
    clickedElement.style.color = "#9AC2C9"
    otherElement.style.backgroundColor =  "#9AC2C9";
    otherElement.style.color = "#1D70A2";
}

function displayAnswer(bookSentence, userChoice, sentenceIndex) {
    if (userChoice == bookSentence) {
        document.getElementById('answer-text').innerHTML = `That's right!<br>${realSentences[sentenceIndex].author} wrote this sentence<br>in <i>${realSentences[sentenceIndex].book}</i>`;
    } else if (userChoice != bookSentence) {
        document.getElementById('answer-text').innerHTML = "Try again."
    }
    document.getElementById('answer').style.display = "block";
}