import React, { useState } from "react";
import MenuButton from "../../components/menuButton/MenuButton";
import "./calculator.scss";

function Calculator() {
 
  const [currentState, setCurrentState] = useState("0");
  const [prevState, setPrevState] = useState("");
  const [calculateState, setCalculateState] = useState(false)

    const handleNumber = (event) => {

    if(currentState.length === 13){
      return
    }

    if(calculateState === true){
      setPrevState(event.target.name)
      setCurrentState(event.target.name)
      setCalculateState(false)
      return
    }

    // Need to change this so that when the decimal is clicked the . still remains
    // Checks the event input against the sum, if the current sum is 0 Then a 0 can't be added
    // Changes the 0 to the inputted number if 0 only 
    // Else appends a new number to the end of the sum
  
      if(event.target.name === "0" && currentState === "0")
      {
        return
      } else if (currentState === "0"){
        setCurrentState(event.target.name);
        setPrevState(event.target.name)    
      } else if (prevState[prevState.length-1] === "1" || "2" || "3" || "4"||"5"||"6"||"7"||"8"||"9")
        {
          if (currentState.includes("+" || "-" || "*" || "/" )){
            setPrevState(prevState.concat(event.target.name));
            setCurrentState(event.target.name)
          } else {
            setPrevState(prevState.concat(event.target.name));
            setCurrentState(currentState.concat(event.target.name))
          }
        } 
      else {
        setPrevState(prevState.concat(event.target.name));
        setCurrentState(event.target.name)
      }
    }

    // if calculated state true + number press ---> reset previous and current operand + calculated state false
    // if calculated state true + operation press ---> use calculated sum + concat event handler 

    const handleOperator = event => {
      const lastChar = prevState[prevState.length -1]
      const secondLastChar = prevState[prevState.length -2]
      const operatorsNoMinus = ["+","*","/"]

      if(currentState.length === 13){
        return
      }

      if(calculateState === true){
        setPrevState(currentState + event.target.name)
        setCurrentState(event.target.name)
        setCalculateState(false)
        return
      }

      if(lastChar === event.target.name)
      { // if previous operation === event handler --> return (do nothing)
        return
      }
      else if(operatorsNoMinus.includes(lastChar) && event.target.name === "-")
      { 
        // if previous operation is (+,/,*) && event handler === ("-") --> concat "-" to previous operand
        setPrevState(prevState + "-")
        setCurrentState(event.target.name);
      }
      else if (operatorsNoMinus.includes(lastChar) && operatorsNoMinus.includes(event.target.name)){
        // if previous operation is (+,/,*) && event handler === (+,/,*) --> replace previous operation with event handler 
        setPrevState(prevState.slice(0,-1) + event.target.name)
        setCurrentState(event.target.name)
      }
      else if(lastChar === "-" && operatorsNoMinus.includes(secondLastChar) && operatorsNoMinus.includes(event.target.name))
      { // if previous operation is ("-") && the previous previous operation (0,-2) === (+,/,*) && event handler === (+,/,*) 
        // --> remove both operators and replace with the event handler
        setPrevState(prevState.slice(0,-2) + event.target.name)
        setCurrentState(event.target.name)
      }
      else if(lastChar === "-" && operatorsNoMinus.includes(event.target.name)){
        // if previous operation is ("-") && event handler === (+,/,*) --> replace previous operation with event handler
        setPrevState(prevState.slice(0,-1) + event.target.name)
        setCurrentState(event.target.name)
      }
      else {
        // else add the operation to the expression
        setPrevState(prevState.concat(event.target.name))
        setCurrentState(event.target.name);
      }
    }

    const handleDecimal = event => {

    // Prevents a second decimal point from being inputted into the calculation
      if (currentState.includes(".") && event.target.innerText === ".") {
        return
      } else {
        setCurrentState(currentState.concat(event.target.name));
        setPrevState(prevState.concat(event.target.name))
      }
    }

    const calculate = () => {
      setCurrentState(parseFloat(eval(prevState).toFixed(8)))
      setPrevState(prevState + "=" + parseFloat(eval(prevState).toFixed(8))); 
      setCalculateState(true)
      console.log("current State is: " + currentState)
      console.log("previous State is: " + prevState)
    };

    const clearAll = () => {
      // Clears all of the current calculation being inputted and the saved previous number
      setCurrentState("0")
      setPrevState("")
    }

    const deletePrevious = () =>{
      //deletes the last inputted number
      setCurrentState(currentState.slice(0, -1));
    }
  return (
    <div className="calculator-page">
      <MenuButton/>
      <div className="calculator-wrapper">
    <div className="calculator-container">
      <div className="display" >
        <div className="previous-operand">
          <h2>{prevState}</h2>
        </div>
        <div className="current-operand" id="display">
          <h1>{currentState}</h1>
        </div>
      </div>
      <button onClick={clearAll} className="span-two alt-color" id="clear">
        AC
      </button>
      <button onClick={deletePrevious} className="alt-color" id="delete">
        DEL
      </button>
      <button onClick={handleOperator} className="alt-color-2" name="+" id="add">
        &#43;
      </button>
      <button onClick={handleNumber} name="7" id="seven">
        7
      </button>
      <button onClick={handleNumber} name="8" id="eight">
        8
      </button>
      <button onClick={handleNumber} name="9" id="nine">
        9
      </button>
      <button onClick={handleOperator} className="alt-color-2" name="*" id="multiply">
        &times;
      </button>
      <button onClick={handleNumber} name="4" id="four">
        4
      </button>
      <button onClick={handleNumber} name="5" id="five">
        5
      </button>
      <button onClick={handleNumber} name="6" id="six">
        6
      </button>
      <button onClick={handleOperator} className="alt-color-2" name="-" id="subtract">
        &minus;
      </button>
      <button onClick={handleNumber} name="1" id="one">
        1
      </button>
      <button onClick={handleNumber} name="2" id="two">
        2
      </button>
      <button onClick={handleNumber} name="3" id="three">
        3
      </button>
      <button onClick={handleOperator} className="alt-color-2" name="/" id="divide">
        &divide;
      </button>
      <button onClick={handleNumber} className="alt-color-2" name="0" id="zero">
        0
      </button>
      <button
        onClick={handleDecimal}
        className="alt-color-2"
        name="."
        id="decimal"
      >
        .
      </button>
      <button
        onClick={calculate}
        className="span-two alt-color"
        name="="
        id="equals"
      >
        &#61;
      </button>
    </div>
  </div>
    );
  
    </div>
  );
}

export default Calculator;
