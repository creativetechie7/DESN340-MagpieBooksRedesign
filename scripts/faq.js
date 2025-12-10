// FAQ Category Button Functionality
document.addEventListener('DOMContentLoaded', function() {
  const faqButtons = document.querySelectorAll('.faqButton');
  const faqSections = document.querySelectorAll('.faqSection');

  // Function to show a specific FAQ section
  function showFAQSection(targetId) {
    // Hide all sections
    faqSections.forEach(section => {
      section.style.display = 'none';
    });

    // Show the target section
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.style.display = 'block';
    }

    // Close all answers in the newly shown section
    const answers = targetSection.querySelectorAll('.faqAnswer');
    const questions = targetSection.querySelectorAll('.faqQuestionButton');
    answers.forEach(answer => answer.classList.remove('active'));
    questions.forEach(question => question.classList.remove('active'));
  }

  // Add click event listeners to all FAQ category buttons
  faqButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');

      // Remove active class from all buttons
      faqButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      // Show the corresponding FAQ section
      showFAQSection(targetId);
    });
  });

  // FAQ Question Dropdown Functionality
  const faqQuestions = document.querySelectorAll('.faqQuestionButton:not(.artistCreditsQuestion)');

  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const answer = this.nextElementSibling;

      // Toggle active class on question and answer
      this.classList.toggle('active');
      answer.classList.toggle('active');
    });
  });

  // Show the first section by default on page load
  if (faqButtons.length > 0) {
    faqButtons[0].classList.add('active');
    const firstTargetId = faqButtons[0].getAttribute('data-target');
    showFAQSection(firstTargetId);
  }

  // Artist Credits Toggle Functionality
  const artistCreditsQuestion = document.querySelector('.artistCreditsQuestion');
  const artistCreditsAnswer = document.querySelector('.artistCreditsAnswer');

  if (artistCreditsQuestion && artistCreditsAnswer) {
    artistCreditsQuestion.addEventListener('click', function() {
      // Toggle active class on question and answer
      this.classList.toggle('active');
      artistCreditsAnswer.classList.toggle('active');
    });
  }
});
