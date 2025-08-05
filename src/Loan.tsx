import React, { useState } from "react";
import "./Loan.css";

const Loan: React.FC = () => {
  const [inputDate, setInputDate] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState(false);

  const calculateYearsMonthsDays = () => {
    setError(false);
    setResult("");

    if (!inputDate) {
      setResult("Please select a date.");
      return;
    }

    const selectedDate = new Date(inputDate);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      setError(true);
      setResult("Error: Selected date is in the future. Please select a past or current date.");
      return;
    }

    let years = today.getFullYear() - selectedDate.getFullYear();
    let months = today.getMonth() - selectedDate.getMonth();
    let days = today.getDate() - selectedDate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const parts = [];
    if (years > 0) parts.push(years + (years === 1 ? " year" : " years"));
    if (months > 0) parts.push(months + (months === 1 ? " month" : " months"));
    if (days > 0) parts.push(days + (days === 1 ? " day" : " days"));

    if (parts.length === 0) parts.push("0 days");

    if (years === 0 && months === 0 && days === 0) {
      setResult("The date you selected is today.");
    } else {
      setResult("The selected date was " + parts.join(" and ") + " ago.");
    }
  };

  return (
    <div className="container">
      <h1>Date Difference</h1>
      <input
        type="date"
        value={inputDate}
        onChange={(e) => setInputDate(e.target.value)}
      />
      <button onClick={calculateYearsMonthsDays}>Calculate</button>
      <div className={`result ${error ? "error" : ""}`}>{result}</div>
    </div>
  );
};

export default Loan;
