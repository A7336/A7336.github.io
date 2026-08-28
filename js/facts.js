let facts = [];
let factIndex = 0;

export async function initFacts() {
  const numEl = document.getElementById('factNum');
  const descEl = document.getElementById('factDesc');
  const prevBtn = document.getElementById('prevFactBtn');
  const nextBtn = document.getElementById('nextFactBtn');

  if (!numEl || !descEl) return;

  try {
    const res = await fetch('data/facts.json');
    facts = await res.json();
  } catch {
    // Fallback inline data if JSON fetch fails
    facts = [
      { num: "2+", desc: "Years of software engineering & web experience." },
      { num: "15+", desc: "Projects completed across full-stack and raw code." }
    ];
  }

  function updateFact() {
    numEl.innerText = facts[factIndex].num;
    descEl.innerText = facts[factIndex].desc;
  }

  prevBtn?.addEventListener('click', () => {
    factIndex = (factIndex - 1 + facts.length) % facts.length;
    updateFact();
  });

  nextBtn?.addEventListener('click', () => {
    factIndex = (factIndex + 1) % facts.length;
    updateFact();
  });
}