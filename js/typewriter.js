const words = [
  "Software Developer?",
  "CS Student.",
  "Systems Engineer?",
  "Problem Solver."
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

export function initTypewriter() {
  const typewriterElement = document.getElementById("typewriter");
  if (!typewriterElement) return;

  function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();
}