import React, { useState } from "react";
import "./Loan.css";

const Loan: React.FC = () => {
  const [inputDate, setInputDate] = useState("");
  const [amount, setAmount] = useState("");
  const [interest, setInterest] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState(false);

  // Format number in Indian numbering system
  const formatIndianNumber = (num: number | string) => {
    const number = typeof num === "string" ? parseFloat(num) : num;
    if (isNaN(number)) return "";
    return number.toLocaleString("en-IN");
  };

  const calculateYearsMonthsDays = () => {
    setError(false);
    setResult("");

    if (!inputDate) {
      setResult("Please select a date.");
      return;
    }

    const principal = Number(amount);
    const monthlyRate = Number(interest) / 100;

    if (!amount || isNaN(principal) || principal <= 0) {
      setResult("Please enter a valid loan amount.");
      return;
    }

    if (!interest || isNaN(monthlyRate) || monthlyRate < 0) {
      setResult("Please enter a valid interest percentage.");
      return;
    }

    const selectedDate = new Date(inputDate);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      setError(true);
      setResult(
        "Error: Selected date is in the future. Please select a past or current date."
      );
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
      return;
    }

    // Calculate total months (approximate)
    const totalMonths = years * 12 + months + days / 30;

    // Calculate interest based on monthly rate
    const interestAmount = principal * monthlyRate * totalMonths;
    const totalAmount = principal + interestAmount;

    setResult(
      `The selected date was ${parts.join(
        " and "
      )} ago.\nLoan Amount: ₹${formatIndianNumber(principal)}\nMonthly Interest Rate: ${(monthlyRate * 100).toFixed(
        2
      )}%\nInterest Accrued: ₹${formatIndianNumber(interestAmount.toFixed(2))}\nTotal Amount Payable: ₹${formatIndianNumber(totalAmount.toFixed(2))}`
    );
  };

  const clearData = () => {
    setInputDate("");
    setAmount("");
    setInterest("");
    setResult("");
    setError(false);
  };

  return (
    <div className="container">
      <h1>Intrest Calculator</h1>

      <label>
        Select Date:
        <input
          type="date"
          value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
        />
      </label>

      <label>
        Loan Amount (₹):
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          min="0"
        />
        {amount && (
          <small className="helper-text">
            ₹ {formatIndianNumber(amount)}
          </small>
        )}
      </label>

      <label>
        Interest Percentage (% per month):
        <input
          type="number"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          placeholder="Enter interest %"
          min="0"
          step="0.01"
        />
      </label>

      <button onClick={calculateYearsMonthsDays}>Calculate</button>


      <div className={`result ${error ? "error" : ""}`}>
        {result.split("\n").map((line, i) => (
          <p key={i}>{line}</p>

          
        )  ) }
        <button onClick={clearData} className="clear-btn">
        Clear
      </button>
      
      </div>
    </div>
  );
};

export default Loan;
