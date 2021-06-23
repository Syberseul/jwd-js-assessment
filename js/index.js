/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener("DOMContentLoaded", () => {
  const start = document.querySelector("#start");
  start.addEventListener("click", function (e) {
    document.querySelector("#quizBlock").style.display = "block";
    start.style.display = "none";
  });
  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: "Which is the third planet from the sun?",
      o: ["Saturn", "Earth", "Pluto", "Mars"],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: "Which is the largest ocean on Earth?",
      o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      a: 3,
    },
    {
      q: "What is the capital of Australia",
      o: ["Sydney", "Canberra", "Melbourne", "Perth"],
      a: 1,
    },
    {
      q: "How many planets are in our solar system",
      o: ["Six", "Seven", "Eight", "Nine"],
      a: 2,
    },
    {
      q: "Where is the Great Pyramid of Giza",
      o: ["United States", "Egypt", "Australia", "Canada"],
      a: 1,
    },
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector("#quizWrap");
    let quizDisplay = "";
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>

                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>

                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>

                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // Calculate the score
  const calculateScore = () => {
    let score = 0;
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector("#" + li);
        radioElement = document.querySelector("#" + r);

        if (quizItem.a == i) {
          liElement.style.backgroundColor = "#676767";
        }

        if (radioElement.checked && quizItem.a === i) score++;
      }
    });
    return score;
  };

  // submit button
  const btnSubmit = document.querySelector("#btnSubmit");
  const scoreSpan = document.querySelector("#score");
  btnSubmit.addEventListener("click", () => {
    submitTrigger();
  });
  function submitTrigger() {
    calculateScore();
    btnSubmit.style.display = "none";
    scoreSpan.innerHTML = `final score: ${calculateScore()} / 5`;
  }

  // reset button
  const btnReset = document.querySelector("#btnReset");
  btnReset.addEventListener("click", () => location.reload());

  // timer
  start.addEventListener("click", () => {
    const timeString = document.querySelector("#time");
    const timeMin = parseInt(timeString.innerHTML.split(":")[0]);
    const timeSec = parseInt(timeString.innerHTML.split(":")[1]);

    let totalSec = timeMin * 60 + timeSec;
    const interval = setInterval(function () {
      let minLeft, secLeft;

      totalSec--;

      minLeft =
        Math.floor(totalSec / 60) < 10
          ? "0" + Math.floor(totalSec / 60)
          : Math.floor(totalSec / 60);
      secLeft = totalSec % 60 < 10 ? "0" + (totalSec % 60) : totalSec % 60;

      timeString.innerHTML = `${minLeft}:${secLeft}`;

      if (totalSec === 0) {
        clearInterval(interval);
        submitTrigger();
      }
    }, 1000);
  });

  // call the displayQuiz function
  displayQuiz();
});
