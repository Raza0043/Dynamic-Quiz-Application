document.addEventListener("DOMContentLoaded", function () {
    var loginBtn = document.getElementById("login-btn");
    var signupBtn = document.getElementById("signup-btn");
    var loginForm = document.getElementById("login-form");
    var signupForm = document.getElementById("signup-form");
    var quizContainer = document.getElementById("quiz-container");
    var subjectSelection = document.getElementById("subject-selection");
    var navbar = document.getElementById("navbar");
    var userInfo = document.getElementById("user-info");
    var subjectInfo = document.getElementById("subject-info");
    var nextButton = document.getElementById("next-btn");
    var questionElement = document.getElementById("question");
    var answerButtons = document.getElementById("answer-buttons").children;
    var timerElement = document.getElementById("timer");
  
    var subjects = {
      english: [
        { question: "What is a noun?", options: ["A person", "An action", "A place", "All of these"], correct: 3 },
         { question: "How many alphabats in English ?", options: ["26", "90", "27", "All of these"], correct: 1},
        { question: "How many vowels in english?", options: ["1", "5", "3" ,"All of these"], correct: 2 },
        { question: "What is a synonym for 'happy'??", options: ["Sad", "joyful", "angry", "All of these"], correct: 1 },
        { question: "What does the adjective 'rapid' mean?", options: ["Fast", "Slow", "loud", "All of these"], correct: 3 },
       
      ],
      html: [
        { question: "What does HTML stand for?", options: ["HyperText Markup Language", "High Text Machine Language", "HyperTool Markup Language", "None"], correct: 0 },
        
      ],
      python: [
        { question: "Who created Python?", options: ["Guido van Rossum", "Elon Musk", "Dennis Ritchie", "James Gosling"], correct: 0 },
    
      ],
      cplusplus: [
        { question: "C++ is a:", options: ["High-level language", "Low-level language", "Both", "None"], correct: 2 },
      
      ],
      r_language: [
        { question: "What is R used for?", options: ["Data Analysis", "Web Development", "Networking", "Gaming"], correct: 0 },
        
      ]
    };
  
    var currentSubject = "";
    var currentQuestionIndex = 0;
    var score = 0;
    var timer = 10;
    var timerInterval;
  
    function loadQuestion() {
      var quizData = subjects[currentSubject];
      var currentQuestion = quizData[currentQuestionIndex];
  
      questionElement.textContent = currentQuestion.question;
  
      for (var i = 0; i < answerButtons.length; i++) {
        answerButtons[i].textContent = currentQuestion.options[i];
        answerButtons[i].dataset.correct = i === currentQuestion.correct;
      }
  
      timer = 10;
      timerElement.textContent = timer;
      nextButton.disabled = true;
      startTimer();
    }
  
    function startTimer() {
      clearInterval(timerInterval);
      timerInterval = setInterval(function () {
        timer--;
        timerElement.textContent = timer;
  
        if (timer <= 0) {
          clearInterval(timerInterval);
          nextQuestion();
        }
      }, 1000);
    }
  
    function nextQuestion() {
      clearInterval(timerInterval);
      var quizData = subjects[currentSubject];
  
      if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
      } else {
        showResult();
      }
    }
  
    function showResult() {
      quizContainer.classList.add("hidden");
      document.getElementById("result").classList.remove("hidden");
      document.getElementById("score").textContent = score;
    }
  
    function checkAnswer(event) {
      var correct = event.target.dataset.correct === "true";
      if (correct) {
        score++;
      }
      nextButton.disabled = false;
    }
  
 
    document.querySelectorAll(".subject-btn").forEach(function (button) {
      button.addEventListener("click", function () {
        currentSubject = button.dataset.subject;
        subjectInfo.textContent = button.textContent;
        subjectSelection.classList.add("hidden");
        quizContainer.classList.remove("hidden");
        loadQuestion();
      });
    });
  
    for (var i = 0; i < answerButtons.length; i++) {
      answerButtons[i].addEventListener("click", checkAnswer);
    }
  
    nextButton.addEventListener("click", nextQuestion);
  
    
    signupBtn.addEventListener("click", function () {
      signupForm.classList.add("active");
      loginForm.classList.remove("active");
      signupBtn.classList.add("active");
      loginBtn.classList.remove("active");
    });
  
    loginBtn.addEventListener("click", function () {
      loginForm.classList.add("active");
      signupForm.classList.remove("active");
      loginBtn.classList.add("active");
      signupBtn.classList.remove("active");
    });
  
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var username = document.getElementById("new-username").value.trim();
      var email = document.getElementById("new-email").value.trim();
      var password = document.getElementById("new-password").value.trim();
  
      if (!username || !email || !password) {
        Swal.fire("Error!", "Please fill all fields.", "error");
        return;
      }
  
      var userData = { username: username, email: email, password: password };
      localStorage.setItem("userData", JSON.stringify(userData));
      Swal.fire("Success!", "Account created successfully!", "success");
      signupForm.reset();
    });
  
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var username = document.getElementById("username").value.trim();
      var password = document.getElementById("password").value.trim();
      var storedUserData = JSON.parse(localStorage.getItem("userData"));
  
      if (storedUserData && storedUserData.username === username && storedUserData.password === password) {
        Swal.fire("Success!", "Logged in successfully!", "success");
        navbar.classList.remove("hidden");
        userInfo.textContent = `User: ${storedUserData.username}`;
        subjectSelection.classList.remove("hidden");
        loginForm.reset();
      } else {
        Swal.fire("Error!", "Invalid username or password.", "error");
      }
    });
  });
  