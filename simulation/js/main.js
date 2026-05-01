// --- Problems (example, adapt as needed) ---
const problems = [
  {
    id: 1,
    title: "Problem 1",
    desc: "Given a positive integer n, compute n! (factorial of n).",
    template: [
      "int main() {",
      "    int n;",
      '    scanf("%d", &n);',
      "    int fact = _____;", // blank 0
      "    for (int i = 1; i <= n; i++) {",
      "        fact _____ i;", // blank 1
      "    }",
      '    printf("%d\\n", fact);',
      "    return 0;",
      "}",
    ],
    blanks: [
      { line: 3, answers: ["1"], placeholder: "initial value" },
      { line: 5, answers: ["*=", "*= "], placeholder: "operator" },
    ],
    hints: [
      "What should fact be initialized to?",
      "Which operator multiplies fact by i?",
      "For n=5, output is 120. For n=3, output is 6.",
    ],
    compilerOutput: "Compiled successfully.",
    runtimeOutput: "For n=5, output is 120. For n=3, output is 6.",
  },
  {
    id: 2,
    title: "Problem 2",
    desc: "Given a positive integer n, compute the sum of factorials from 1! to n!.",
    template: [
      "int main() {",
      "    int n;",
      '    scanf("%d", &n);',
      "    int sum = 0;",
      "    int fact = _____;", // blank 0
      "    for (int i = 1; i <= n; i++) {",
      "        fact _____ i;", // blank 1
      "        sum += fact;",
      "    }",
      '    printf("%d\\n", sum);',
      "    return 0;",
      "}",
    ],
    blanks: [
      { line: 4, answers: ["1"], placeholder: "initial value" },
      { line: 6, answers: ["*=", "*= "], placeholder: "operator" },
    ],
    hints: [
      "What should fact be initialized to?",
      "Which operator multiplies fact by i?",
      "For n=3, output is 9. For n=4, output is 33.",
    ],
    compilerOutput: "Compiled successfully.",
    runtimeOutput: "For n=3, output is 9. For n=4, output is 33.",
  },
  {
    id: 3,
    title: "Problem 3",
    desc: "Given a positive integer n, print all digits of n! in reverse order.",
    template: [
      "int main() {",
      "    int n;",
      '    scanf("%d", &n);',
      "    int fact = 1;",
      "    for (int i = 1; i <= n; i++)",
      "        fact *= i;",
      "    while (fact > 0) {",
      '        printf("%d ", fact % _____);', // blank 0
      "        fact /= _____;", // blank 1
      "    }",
      "    return 0;",
      "}",
    ],
    blanks: [
      { line: 7, answers: ["10"], placeholder: "modulus base" },
      { line: 8, answers: ["10"], placeholder: "divisor" }
    ],
    hints: [
      "What value do you use to get the last digit?",
      "What value do you use to remove the last digit?",
      "For n=4, output is 4 2 1. For n=5, output is 0 2 1 1.",
    ],
    compilerOutput: "Compiled successfully.",
    runtimeOutput: "For n=4, output is 4 2 1. For n=5, output is 0 2 1 1.",
  },
];

let currentProblem = null;
let userInputs = [];

function renderProblemOptions() {
  const select = document.getElementById("problem-select");
  select.innerHTML = problems
    .map((p, i) => `<option value="${i}">Problem ${i + 1}</option>`)
    .join("");
}

function renderProblem(idx) {
  currentProblem = problems[idx];
  userInputs = Array(currentProblem.blanks.length).fill("");
  document.getElementById("problem-desc").textContent = currentProblem.desc;
  renderCodeTemplate();
  renderHints();
  document.getElementById("feedback").textContent = "";
  document.getElementById("runtime-output").textContent = "";
  document.getElementById("run-btn").disabled = true;
}

function renderCodeTemplate() {
  const codeDiv = document.getElementById("code-template");
  codeDiv.innerHTML = "";
  currentProblem.template.forEach((line, idx) => {
    let html = line;
    currentProblem.blanks.forEach((blank, bIdx) => {
      if (blank.line === idx) {
        html = html.replace(
          "_____",
          `<input class="blank-input" data-blank="${bIdx}" value="${userInputs[bIdx] || ""}" placeholder="${blank.placeholder}" />`,
        );
      }
    });
    codeDiv.innerHTML += `<div class="template-line">${html}</div>`;
  });
  // Attach input listeners
  codeDiv.querySelectorAll(".blank-input").forEach((input) => {
    input.addEventListener("input", (e) => {
      const bIdx = +e.target.getAttribute("data-blank");
      userInputs[bIdx] = e.target.value;
      document.getElementById("feedback").textContent = "";
      document.getElementById("runtime-output").textContent = "";
      document.getElementById("run-btn").disabled = true;
    });
  });
}

function renderHints() {
  const hintSelect = document.getElementById("hint-level");
  hintSelect.innerHTML = "";
  hintSelect.innerHTML += `<option value="0" disabled selected>Hint 0</option>`;
  for (let i = 1; i <= currentProblem.hints.length; ++i) {
    hintSelect.innerHTML += `<option value="${i}">Hint ${i}</option>`;
  }
  showHints(0);
  hintSelect.onchange = (e) => showHints(+e.target.value);
}

function showHints(level) {
  const hintsDiv = document.getElementById("hints");
  if (level === 0) {
    hintsDiv.innerHTML = "";
    return;
  }
  hintsDiv.innerHTML = `<div class="hint">${currentProblem.hints[level - 1]}</div>`;
}

function checkAnswers() {
  let allCorrect = true;
  let feedback = "";
  currentProblem.blanks.forEach((blank, i) => {
    const userVal = (userInputs[i] || "").trim();
    if (blank.answers.map((a) => a.trim()).includes(userVal)) {
      feedback += `<div class="feedback-correct">Blank ${i + 1}: Correct</div>`;
    } else {
      feedback += `<div class="feedback-incorrect">Blank ${i + 1}: Incorrect</div>`;
      allCorrect = false;
    }
  });
  document.getElementById("feedback").innerHTML = feedback;
  document.getElementById("run-btn").disabled = !allCorrect;
}

function showRuntimeOutput() {
  document.getElementById("runtime-output").innerHTML =
    `<div class="feedback-all-correct">${currentProblem.runtimeOutput}</div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderProblemOptions();
  renderProblem(0);
  document.getElementById("problem-select").onchange = (e) =>
    renderProblem(+e.target.value);
  document.getElementById("submit-btn").onclick = checkAnswers;
  document.getElementById("run-btn").onclick = showRuntimeOutput;
});
