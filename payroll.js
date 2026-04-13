const readline = require("readline-sync");

const employees = [];
const numberOfEmployees = 3;

function getPositiveWage(employeeName) {
  let wage;

  do {
    wage = Number(
      readline.question(`Enter hourly wage for ${employeeName}: `)
    );

    if (!Number.isFinite(wage) || wage <= 0) {
      console.log("Invalid input. Wage must be a positive number.");
    }
  } while (!Number.isFinite(wage) || wage <= 0);

  return wage;
}

function getValidHours(employeeName) {
  let hours;

  do {
    hours = Number(
      readline.question(`Enter hours worked for ${employeeName} (0-80): `)
    );

    if (!Number.isFinite(hours) || hours < 0 || hours > 80) {
      console.log("Invalid input. Hours must be between 0 and 80.");
    }
  } while (!Number.isFinite(hours) || hours < 0 || hours > 80);

  return hours;
}

for (let i = 1; i <= numberOfEmployees; i++) {
  let name = "";

  do {
    name = readline.question(`Enter name for employee ${i}: `).trim();

    if (name === "") {
      console.log("Invalid input. Name cannot be empty.");
    }
  } while (name === "");

  const hourlyWage = getPositiveWage(name);
  const hoursWorked = getValidHours(name);

  const regularHours = Math.min(hoursWorked, 40);
  const overtimeHours = Math.max(hoursWorked - 40, 0);

  const regularPay = regularHours * hourlyWage;
  const overtimePay = overtimeHours * hourlyWage * 1.5;
  const totalPay = regularPay + overtimePay;

  employees.push({
    name: name,
    totalHours: hoursWorked,
    regularPay: regularPay,
    overtimePay: overtimePay,
    totalPay: totalPay
  });

  console.log();
}

let highestPaidEmployee = employees[0];

for (let i = 1; i < employees.length; i++) {
  if (employees[i].totalPay > highestPaidEmployee.totalPay) {
    highestPaidEmployee = employees[i];
  }
}

console.log("PAYROLL REPORT");
console.log("---------------------------------------------------------------");
console.log(
  "Name".padEnd(18) +
    "Hours".padEnd(10) +
    "Regular Pay".padEnd(15) +
    "Overtime Pay".padEnd(15) +
    "Total Pay"
);
console.log("---------------------------------------------------------------");

for (const employee of employees) {
  console.log(
    employee.name.padEnd(18) +
      employee.totalHours.toFixed(2).padEnd(10) +
      (`$${employee.regularPay.toFixed(2)}`).padEnd(15) +
      (`$${employee.overtimePay.toFixed(2)}`).padEnd(15) +
      `$${employee.totalPay.toFixed(2)}`
  );
}

console.log("---------------------------------------------------------------");
console.log(
  `Highest-paid employee: ${highestPaidEmployee.name} with $${highestPaidEmployee.totalPay.toFixed(
    2
  )}`
);
