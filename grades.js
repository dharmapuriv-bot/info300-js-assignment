const readline = require("readline-sync");

function getValidScore(message) {
  let score;

  do {
    score = Number(readline.question(message));

    if (!Number.isFinite(score) || score < 0 || score > 100) {
      console.log("Invalid input. Score must be between 0 and 100.");
    }
  } while (!Number.isFinite(score) || score < 0 || score > 100);

  return score;
}

function getLetterGrade(score) {
  if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}

const currentAverage = getValidScore("Enter your current average: ");

let numberOfFinalScores;

do {
  numberOfFinalScores = Number(
    readline.question("How many hypothetical final exam scores do you want to test? ")
  );

  if (
    !Number.isInteger(numberOfFinalScores) ||
    numberOfFinalScores <= 0
  ) {
    console.log("Invalid input. Enter a whole number greater than 0.");
  }
} while (!Number.isInteger(numberOfFinalScores) || numberOfFinalScores <= 0);

const forecastResults = [];

for (let i = 1; i <= numberOfFinalScores; i++) {
  const finalExamScore = getValidScore(
    `Enter hypothetical final exam score #${i}: `
  );

  const finalCourseAverage = currentAverage * 0.75 + finalExamScore * 0.25;

  let status = "";
  if (finalCourseAverage > currentAverage) {
    status = "Improved";
  } else if (finalCourseAverage < currentAverage) {
    status = "Declined";
  } else {
    status = "Stayed the same";
  }

  forecastResults.push({
    finalScore: finalExamScore,
    finalAverage: finalCourseAverage,
    letterGrade: getLetterGrade(finalCourseAverage),
    status: status
  });
}

console.log("\nGRADE FORECAST REPORT");
console.log("----------------------------------------------------------------");
console.log(
  "Final Exam".padEnd(15) +
    "Course Average".padEnd(18) +
    "Letter Grade".padEnd(15) +
    "Result"
);
console.log("----------------------------------------------------------------");

for (const result of forecastResults) {
  console.log(
    result.finalScore.toFixed(2).padEnd(15) +
      result.finalAverage.toFixed(2).padEnd(18) +
      result.letterGrade.padEnd(15) +
      result.status
  );
}

console.log("----------------------------------------------------------------");