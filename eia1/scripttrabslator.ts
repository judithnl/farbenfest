window.addEventListener("load", function () {
    
    //15 Sätze für die Datenbank
    var Sentences = [
        {german: "Guten Tag",
        words: ["Buenos", "Dias"]
        },        
        {german: "Ich heiße Judith",
        words: ["me", "llama", "Judith"]
        },
        {german: "Wie heißt du?",
        words: ["como","te","llamas"]
        },
        {german: "Woher kommst Du?",
        words: ["De", "Dónde", "Eres?"]
        },
        {german: "Ich komme aus Biberach",
        words: ["Soy", "De", "Biberach"]
        },
        {german: "Entschuldigung, das verstehe ich nicht",
        words: ["Perdón", "No", "Entiendo"]
        },
        {german: "Ich spreche nicht viel Spanisch",
        words: ["No", "Hablo", "Mucho", "Español"]
        },
        {german: "Wie spricht man das aus?",
        words: ["¿Cómo", "Se", "Pronuncia", "Esto?"]
        },
        {german: "Könnten Sie das bitte wiederholen?",
        words: ["¿Uste", "Podría", "Repetirlo", "Por", "Favor?"]
        },
        {german: "Wie geht es dir?",
        words: ["Cómo", "Està", "Usted?"]
        },
        {german: "Danke gut und dir?",
        words: ["Bien", "Gracias", "Y", "Tu?"]
        },
        {german: "Das verrückte Leben!",
        words: ["¡La", "vida", "loca!"]
        },
        {german: "Sprechen Sie Englisch?",
        words: ["Hablas","ingles"]
        },
        {german: "Was kostet das?",
        words: ["¿Cuánto", "Cuesta", "Esto?"]
        },
        {german: "Wo ist die Biliothek?",
        words: ["¿Dónde", "esta","la","biblioteca?"]
        }];
    
    
    //Variablen
    let Sentence = 0;
    let points =  0;
    let clickedWord = 0;
    let amountSentences = [];
    let doneExercise = 1;
    
    //Schwierigkeitsstufe anwenden und Satz ausgeben
    function chooseMode(_mode) {
        currentMode = _mode;
        let Sentences1 = [];
        for (let i = 0; i< _mode; i++) {
            let count = Math.round(Math.random() * Sentences.length - 1);
            let Sentences2 = getSentence(count);
            Sentences1.push(Sentences2);
        }
        return Sentences;
    }
    //entfernen des verwendeten Satzes aus dem Array Sentences
    function getSentence(_count) {
        let task = Sentences.splice(_count, 1);
        return task[0];
    }

    //Mischen der spanischen Worte in den words Arrays
    function shuffleWords(_words) {
        let counter = _words.length;
        let shuffledWords = [];
        let words2 = _words.slice();
        for (let index = 0; index < counter; index++) {
            let count = Math.round(Math.random() * words2.length - 1);
            shuffledWords.push(words2.splice(count, 1)[0]);
        }return shuffledWords;
    }

    //Worte entfernen, neuer Satz
    function shownewSentence(_mode) {
        removeWords();
        amountSentences = chooseMode(_mode);
        newSentence();
    }

    //deutscher Satz wird angezeigt in Feld für Deutsch
    function germanSentence(_aufgabe) {
        document.getElementById("german").innerHTML = _aufgabe.german;
    }

    //Menü unsichtbar machen, wenn die Modi gestartet werden
    function removeMenu() {
        let easy = document.getElementById("easy");
        let medium = document.getElementById("medium");
        let hard = document.getElementById("hard");
        let Button = document.getElementById("hard");
        let button2 = document.getElementById("language");
        easy.style.display = "none";
        medium.style.display = "none";
        hard.style.display = "none";
        Button.style.display = "none";
       button2.style.display = "none";
    }

    
    function Words(_words, _aufgabe) {
        removeMenu();
        _words.forEach((word) => {
            showWord(word, _aufgabe);
        });
    }

    //Worte anzeigen und zu klickbaren Buttons machen
    function showWord(_word, _aufgabe) {
        let button = document.createElement("button");
        button.addEventListener("click", function () {
            let spanish = document.getElementById("spanish");
            let words = [];
                words = _aufgabe.words;
            
            //Punktzahl
            if (checkCorrectness(_word, clickedWord, words) == true) {
                if (clickedWord == 0) {
                    spanish.innerHTML = "";
                    spanish.innerHTML = _word + " ";
                    clickedWord++;
                    points++;
                }
                
                else if (clickedWord == words.length - 1) {
                    spanish.innerHTML += _word;
                    clickedWord = 0;
                    points++;
                    doneExercise++;
                    newSentence();
                }
                else {
                    spanish.innerHTML += _word + " ";
                    clickedWord++;
                    points++;
                }
            }
            //Punktabzug wenn Wort nicht korrekt
            else {
                clickedWord = 0;
                spanish.innerHTML = "";
                points--;
                if (points < 0) {
                    points = 0;
                }
            }

            //Punktzahl anzeigen und Fortschritt messen
            document.querySelector("#punkte").innerHTML = String(points);
            document.querySelector("#fortschritt").innerHTML = String(doneExercise + "/" + currentMode);
            document.querySelector("#fsanzeige").setAttribute("style", "height: " + Number(doneExercise)/(currentMode) * 100 + "%");
        });

        button.innerHTML = _word;
        let word3 = document.getElementById("words");
        word3.appendChild(button);
    }


    function newSentence() {
        Sentence++;
        document.querySelector("#spanish").innerHTML = String("");

        //Nach letztem Satz: YOU MADE IT
        if (currentMode == Sentence - 1) {
            let german = document.getElementById("spanish");
            german.innerHTML = "YOU MADE IT!";
            removeWords();

            //Punkte anzeigen
            spanish.innerHTML="YOU GOT"+points+"!";
            document.querySelector("german").innerHTML=String("")
            return;
        }
        //neuer Satz mit neuen Worten
        removeWords();
        let spanish = [];
        spanish = shuffleWords(amountSentences[Sentence - 1].words);
        Words(spanish, amountSentences[Sentence- 1]);
        germanSentence(amountSentences[Sentence - 1]);   
    }

    //Kontrolle ob gewähltes Wort korrekt ist
    function checkCorrectness(_word, _position, _correctWords) {
        if (_word == _correctWords[_position]) {
            return true;
        }
        else {
            return false;
        }
    }

    //Entfernt die Worte nach gelöstem Satz
    function removeWords() {
        let words = document.getElementById("words");
        words.innerHTML = "";
    }
    //Buttons für die Schwierigkeitsstufe & den Start der Modi
    document.querySelector("#easy").addEventListener("click", function(){shownewSentence(5)});
    document.querySelector("#medium").addEventListener("click", function () {shownewSentence(10)});
    document.querySelector("#hard").addEventListener("click", function () {shownewSentence(15)}); 
});