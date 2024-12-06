import NumberField from "./NumberField.jsx";
import RadioField from "./RadioField.jsx";
import EmptySvg from "./EmptySvg.jsx";
import CalcSvg from "./CalcSvg.jsx";
import "./CalculatorForm.css";
import { useEffect, useState } from "react";





function CalculatorForm() {
  const [mortgAmError, setMortgAmError] = useState('')
  const [mortgTermError, setMortgTermError] = useState('')
  const [interestRateError, setInterestRateError] = useState('')
  const [mortgTypeError, setMorgTypeError] = useState('')
  const [valid, setValid] = useState(false)
  const [monthly, setMonthly] = useState(0)
  const [total, setTotal] = useState(0)
  const [monthlyInterest, setMonthlyInterest] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [type, setType] = useState('')
  

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = Object.fromEntries(formData); 
    const isValid = validateForm(payload)
    if(isValid){
      const principal = payload["Mortgage Amount"]
      const period = payload["Mortgage Term"]
      const anualRate = payload["Interest Rate"]
      const type = payload["Mortgage Type"]
      calculateMortgage(principal, period, anualRate, type)
    }
    setValid(isValid)
  }

  function calculateMortgage(p, per, r, t){
    const i = r / (12*100)
    const n = per * 12
    const monthly = (p * i) / ( 1 - Math.pow( 1 + i, -n))
    const total = monthly * n
    const totalInterest = total - p
    const monthlyInterest = totalInterest / n
    setMonthly(monthly)
    setTotal(total)
    setMonthlyInterest(monthlyInterest)
    setTotalInterest(totalInterest)
  }

  function validateForm(data){
   const a = validateMortAmount(data["Mortgage Amount"])
   const b = validateMortTerm(data["Mortgage Term"]) 
   const c = validateInteresRate(data["Interest Rate"]) 
   const d = validateMortgType(data["Mortgage Type"])
   return a && b && c && d
  }

  function validateMortAmount(input){
    if(!input){
      setMortgAmError('This field is required')
      return false
    } else if(isNaN(input)){
      setMortgAmError('This field must be a number (1 - 500.000)')
      return false
    } else if(input < 0 || input > 500000){
      setMortgAmError('Numbers allowed in range (1 - 500.000)')
      return false
    } else if(input % 1 !== 0){
      setMortgAmError('Number must be an integer')
      return false
    }  else{
      setMortgAmError('')
      return true
    }
    
  }

  function validateMortTerm(input){
    if(!input){
      setMortgTermError('This field is required')
      return false
    } else if(isNaN(input)){
      setMortgTermError('This field must be a number (1 - 30)')
      return false
    } else if(input < 0 || input > 30){
      setMortgTermError('Numbers allowed in range (1 - 30)')
      return false
    } else if(input % 1 !== 0){
      setMortgTermError('Number must be an integer')
      return false
    } else {
      setMortgTermError('')
      return true
    }
    
  }

  function validateInteresRate(input){
    if(!input){
      setInterestRateError('This field is required')
      return false
    } else if(isNaN(input)){
      setInterestRateError('This field must be a percentage (1 - 100)')
      return false
    } else if(input < 0 || input > 100){
      setInterestRateError('Numbers allowed in range (1 - 100)')
      return false
    } else {
      setInterestRateError('')
      return true
    }
    
  }

  function validateMortgType(input){
    if(!input){
      setMorgTypeError('This field is required')
      return false
    } else{
      setMorgTypeError('')
      setType(input)
      return true
    }
  }

  function handleReset(){
    setValid(false)
  }



  return (
    <main>
      <form onReset={handleReset} onSubmit={handleSubmit}>
        <header>
          <h1>Mortgage Calculator</h1>
          <button  type="reset">Clear All</button>
        </header>
        <section className="calculator_options">
          <NumberField error={mortgAmError} fieldName={"Mortgage Amount"} prefix={"£"}></NumberField>
          <section className="mortgage_type">
            <NumberField
              error={mortgTermError}
              fieldName={"Mortgage Term"}
              sufix={"years"}
            ></NumberField>
            <NumberField error={interestRateError} fieldName={"Interest Rate"} sufix={"%"}></NumberField>
          </section>
          <RadioField error={mortgTypeError} options={["Repayment", "Interest Only"]}></RadioField>

          <button type="submit" className="submit_btn">
            <CalcSvg></CalcSvg> Calculate Repayments
          </button>
        </section>
      </form>
      <section className="results_section">
        {!valid && <div className="results_wrapper">
            <EmptySvg></EmptySvg>
            <h2 className="result_title">Results shown here</h2>
            <p className="result_description">Complete the form and click “calculate repayments” to see what your monthly repayments would be.</p>
        </div>}
        {valid && <div className="results_wrappersolved">
          <div className="wrappersolved_header">
            <h2 className="result_title">Your results</h2>
            <p className="result_descriptionsolved">Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.</p>
          </div>
            <div className="payments_card">
            <div className="payments_cardsection">
              <h3 className="result_descriptionsolved">{type === 'Repayment' ? "Your monthly repayments" : "Your monthly interest"}</h3>
              <span className="payment_amount">{type === 'Repayment' ? `£${Number(monthly.toFixed(2)).toLocaleString()}` : `£${Number(monthlyInterest.toFixed(2)).toLocaleString()}`}</span>
              </div>
              <div className="payments_divisor"></div>
              <div className="payments_cardsection">
              <h3 className="result_descriptionsolved">{type === 'Repayment' ? "Total you'll repay over the term" : "Total interest you'll pay"}</h3>
              <span className="payment_anual">{type === 'Repayment' ? `£${Number(total.toFixed(2)).toLocaleString()}` : `£${Number(totalInterest.toFixed(2)).toLocaleString()}`}</span>
              </div>
            </div>
        </div>}
      </section>
    </main>
  );
}

export default CalculatorForm;
