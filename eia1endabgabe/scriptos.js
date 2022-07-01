window.addEventListener("load", function () {
    var sentences = [
        {
            german: "Guten Tag",
            ukrainian: ["Доброго", "ранку"],
            spanish: ["Buenos", "Dias"]
        },
        {
            german: "Ich heiße Judith",
            ukrainian: ["Мене", "звати", "Judith"],
            spanish: ["Me", "Llamo", "Judith"]
        },
        {
            german: "Wie heißt du?",
            ukrainian: ["Як", "вас", "звати?"],
            spanish: ["¿cómo", "te", "llamas?"]
        },
        {
            german: "Was geht?",
            ukrainian: ["що", "працює?"],
            spanish: ["¿Qué", "pasa?"]
        },
        {
            german: "Entschuldigung, das verstehe ich nicht",
            ukrainian: ["Шкода,", "що", "я", "не", "розумію"],
            spanish: ["Perdón", "No", "Entiendo"]
        },
        {
            german: "Sprechen Sie Englisch?",
            ukrainian: ["ви", "говорите", "англійською?"],
            spanish: ["¿Habla", "inglés?"]
        },
        {
            german: "Wie spricht man das aus?",
            ukrainian: ["як", "ви", "це", "вимовляєте?"],
            spanish: ["¿Cómo", "Se", "Pronuncia", "Esto?"]
        },
        {
            german: "Könnten Sie das bitte wiederholen?",
            ukrainian: ["Ви", "можете", "повторити,", "що?"],
            spanish: ["¿Uste", "Podría", "Repetirlo", "Por", "Favor?"]
        },
        {
            german: "Woher kommst Du?",
            ukrainian: ["Звідки", "ти", "родом?"],
            spanish: ["De", "Dónde", "Eres?"]
        },
        {
            german: "Ich komme aus Biberach",
            ukrainian: ["Я", "з", "Biberach"],
            spanish: ["Soy", "De", "Biberach"]
        },
        {
            german: "Wie geht es dir?",
            ukrainian: ["Як", "ти?"],
            spanish: ["Cómo", "Està", "Usted?"]
        },
        {
            german: "Danke gut. Und dir?",
            ukrainian: ["Добре,", "дякую.", "І", "навіть?"],
            spanish: ["Bien", "Gracias", "Y", "Tu?"]
        },
        {
            german: "Wo ist die Bibliothek?",
            ukrainian: ["де", "бібліотеки?"],
            spanish: ["¿Dónde", "está", "la", "biblioteca?"]
        },
        {
            german: "Vielen Dank",
            ukrainian: ["Дуже", "дякую"],
            spanish: ["¡Muchas", "gracias!"]
        },
        {
            german: "Was kostet das?",
            ukrainian: ["Що", "це", "коштує?"],
            spanish: ["¿Cuánto", "Cuesta", "Esto?"]
        }
    ];
    var exercise = 0;
    var currentDifficulty = 0;
    var currentLanguage = "esp";
    var setOfTasks = [];
    var clickedWord = 0;
    var score = 0;
    var doneExercise = 0;
    //Je nach gewählter Schwierigkeit werden 5, 10 oder 15 Übungen ausgewählt und in das Array ExerciseSentences eingefügt
    function setDifficulty(_difficulty) {
        currentDifficulty = _difficulty;
        var exerciseSentences = [];
        for (var index = 0; index < _difficulty; index++) {
            // -1, da array von 0-14 anstatt 0-15
            var pointer = Math.round(Math.random() * sentences.length - 1);
            var newSentence = getSentence(pointer);
            exerciseSentences.push(newSentence);
        }
        return exerciseSentences;
    }
    //Verschiebt die ausgewählte Aufgabe in den temporären Aufgabenhalter, damit keine doppelte Selektion möglich ist und die Aufgabe gelöst werden muss
    function getSentence(_pointer) {
        var chosenExercise = sentences.splice(_pointer, 1);
        return chosenExercise[0];
    }
    function mixWords(_words) {
        var counter = _words.length;
        var mixedWords = [];
        var copyOfWords = _words.slice();
        for (var index = 0; index < counter; index++) {
            var pointer = Math.round(Math.random() * copyOfWords.length - 1);
            mixedWords.push(copyOfWords.splice(pointer, 1)[0]);
        }
        return mixedWords;
    }
    function newTask(_difficulty) {
        clearWords();
        // show difficulties
        setOfTasks = setDifficulty(_difficulty);
        nextTask();
    }
    function showGermanTranslation(_aufgabe) {
        var document;
        document.querySelector("german").innerHTML = _aufgabe.german;
    }
    function showWords(_words, _aufgabe) {
        hideMenu();
        _words.forEach(function (word, i) {
            showWord(word, _aufgabe);
        });
    }
    function hideMenu() {
        var document;
        var easyButton = document.getElementById("easy");
        var mediumButton = document.getElementById("medium");
        var hardButton = document.getElementById("hard");
        var languageButton = document.getElementById("language");
        var rulesButton = document.getElementById("rules");
        easyButton.style.display = "none";
        mediumButton.style.display = "none";
        hardButton.style.display = "none";
        languageButton.style.display = "none";
        rulesButton.style.display = "none";
    }
    function showWord(_word, _aufgabe) {
        var document;
        var elem = document.createElement("button");
        elem.addEventListener("click", function () {
            var translator = document.getElementById("translator");
            var words = [];
            if (currentLanguage == "esp") {
                words = _aufgabe.spanish;
            }
            else if (currentLanguage == "ukr") {
                words = _aufgabe.ukrainian;
            }
            if (testWordIfCorrect(_word, clickedWord, words) == true) {
                // Setze das Wort in den Kasten ein und mache weiter
                if (clickedWord == 0) {
                    translator.innerHTML = "";
                    translator.innerHTML = _word + " ";
                    clickedWord++;
                    score++;
                }
                else if (clickedWord == words.length - 1) {
                    translator.innerHTML += _word;
                    clickedWord = 0;
                    score++;
                    doneExercise++;
                    nextTask();
                }
                else {
                    translator.innerHTML += _word + " ";
                    clickedWord++;
                    score++;
                }
            }
            else {
                // Breche ab und starte Aufgabe neu
                clickedWord = 0;
                translator.innerHTML = "";
                score--;
                alert("Falsch - Minuspunkt! Lösen Sie den Satz erneut!");
                if (score < 0) {
                    score = 0;
                }
            }
            document.querySelector("#score").innerHTML = String(score);
            document.querySelector("#progress").innerHTML = String("Übung " + doneExercise + "/" + currentDifficulty);
            document.querySelector("#progressbar").setAttribute("style", "height: " + Number(doneExercise) / (currentDifficulty) * 100 + "%");
        });
        elem.innerHTML = _word;
        var wordContainer = document.getElementById("words");
        wordContainer.appendChild(elem);
    }
    function nextTask() {
        exercise++;
        var document;
        document.querySelector("#translator").innerHTML = String("");
        if (currentDifficulty == exercise - 1) {
            var translator = document.getElementById("translator");
            var de = document.getElementById("de");
            de.innerHTML = "Glückwunsch, Sie haben alles gelöst!";
            if (currentLanguage == "esp") {
                translator.innerHTML = "¡Enhorabuena, lo has solucionado todo!";
            }
            else if (currentLanguage == "ukr") {
                translator.innerHTML = "Вітаю, ви все вирішили!";
            }
            clearWords();
            return;
        }
        clearWords();
        // Die neue Aufgabe wird ausgeführt.
        // TODO: Bei beenden der ersten Aufgabe muss die nächste gezeigt werden
        var words = [];
        if (currentLanguage == "esp") {
            words = mixWords(setOfTasks[exercise - 1].spanish);
        }
        else if (currentLanguage == "ukr") {
            words = mixWords(setOfTasks[exercise - 1].ukrainian);
        }
        showWords(words, setOfTasks[exercise - 1]);
        showGermanTranslation(setOfTasks[exercise - 1]);
    }
    function testWordIfCorrect(_word, _position, _correctWords) {
        console.log("Gewählte Wort: " + _word);
        console.log("Wort an Position " + _position + " ist: " + _correctWords[_position]);
        if (_word == _correctWords[_position]) {
            return true;
        }
        else {
            return false;
        }
    }
    function clearWords() {
        var document;
        var words = document.getElementById("words");
        words.innerHTML = "";
    }
    function language() {
        var document;
        if (document.querySelector("#language").getAttribute("class") == "spain") {
            currentLanguage = "esp";
            document.querySelector("#language").setAttribute("class", "ukraine");
            document.querySelector("#language").innerHTML = String("Ukrainisch");
            document.querySelector("#translator").innerHTML = String("elegir dificultad");
        }
        else {
            currentLanguage = "ukr";
            document.querySelector("#language").setAttribute("class", "spain");
            document.querySelector("#language").innerHTML = String("Spanisch");
            document.querySelector("#translator").innerHTML = String("вибрати складність");
        }
    }
    function rules() {
        alert("Die Sätze durch klick auf die Wörter übersetzen. Richtig/Falsch gibt +1/-1 Punkt. Bei falsch wird der aktuelle Satz außerdem zurückgesetzt. Leicht = 5 Runden, Mittel = 10 und Schwer = 15. Optional auch in ukrainisch spielbar.");
    }
    var document;
    document.querySelector("#easy").addEventListener("click", function () { newTask(5); });
    document.querySelector("#medium").addEventListener("click", function () { newTask(10); });
    document.querySelector("#hard").addEventListener("click", function () { newTask(15); });
    document.querySelector("#language").addEventListener("click", function () { language(); });
    document.querySelector("#rules").addEventListener("click", function () { rules(); });
});
//# sourceMappingURL=scriptos.js.map