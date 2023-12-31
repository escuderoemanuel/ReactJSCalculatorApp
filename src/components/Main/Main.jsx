import { Button } from './Button/Button';
import { Clear } from './Clear/Clear';
import { Display } from './Display/Display';
import './Main.css';
import { useState } from 'react';
import {
  add,
  subtraction,
  multiplication,
  division,
  percentage,
  recoil,
} from '../../logic/logicMath';

export const Main = () => {
  /* Initial State of Display Input */
  const [input, setInput] = useState('');

  /* Initial State of Display Result */
  const [result, setResult] = useState(0);

  /* Check if lastInputIsOperator */
  const [lastInputIsOperator, setLastInputIsOperator] = useState(false);

  const handleNumberInputAfterResult = (value) => {
    setInput(value); // Set new value as entered number
    setResult(0); // Reset result to zero 0
    setLastInputIsOperator(false); // Reset lastInputIsOperator's state
  };

  // Add Input on Display
  const addInput = (value) => {
    // Declare operators
    const isOperator = ['+', '-', '×', '÷', '%'].includes(value);

    if (result !== 0 && isOperator) {
      setInput(result + value);
      setResult(0);
    } else if (result !== 0 && !isNaN(parseFloat(value))) {
      // If a result has been calculated and a number is pressed, it starts a new operation
      handleNumberInputAfterResult(value);
    } else {
      setInput(
        lastInputIsOperator && isOperator
          ? input.slice(0, -1) + value
          : input + value
      );
      // Updates lastInputIsOperator's state with the entered value
      setLastInputIsOperator(isOperator);
    }
  };

  // Clear Button
  const clearDisplay = () => {
    setInput('');
    setResult(0);
  };

  // Recoil
  const recoilNumber = () => {
    setInput(recoil);
  };

  // equalFn to realize math operations
  const equalFn = () => {
    if (input) {
      // These signs divide the operation
      const parts = input.split(/([+\-×%÷])/);
      const numbers = [];
      const operators = [];

      // Separate numbers and operators
      for (let part of parts) {
        part = part.trim();
        if (
          part === '+' ||
          part === '-' ||
          part === '×' ||
          part === '÷' ||
          part === '%'
        ) {
          operators.push(part);
        } else if (part !== '') {
          numbers.push(parseFloat(part));
        }
      }

      if (numbers.length === 0 || operators.length === 0) {
        alert('Entrada no válida');
        return;
      }

      // It does the math operations
      let result = numbers[0];

      for (let i = 0; i < operators.length; i++) {
        const operator = operators[i];
        const nextNumber = numbers[i + 1];

        if (operator === '+') {
          result = add(result, nextNumber);
        } else if (operator === '-') {
          result = subtraction(result, nextNumber);
        } else if (operator === '×') {
          result = multiplication(result, nextNumber);
        } else if (operator === '÷') {
          result = division(result, nextNumber);
          if (
            result === 'Invalid Operation' ||
            result === 'You cannot calculate the division with zero'
          ) {
            alert(result);
            return;
          }
        } else if (operator === '%') {
          result = percentage(result, nextNumber);
        }

        setResult(result);
      }
      setLastInputIsOperator(false);
    } else {
      alert('Ingresa un valor');
    }
  };

  return (
    <section className='main'>
      <div className='contenedorCalculadora'>
        <div className='calculadora'>
          <div className='display'>
            <Display input={input} result={result} />
          </div>
          <div className='row'>
            <Clear handleClick={clearDisplay}>C</Clear>
            <Button handleClick={recoilNumber}>⇦</Button>
            <Button handleClick={addInput}>%</Button>
            <Button handleClick={addInput}>÷</Button>
          </div>
          <div className='row'>
            <Button handleClick={addInput}>7</Button>
            <Button handleClick={addInput}>8</Button>
            <Button handleClick={addInput}>9</Button>
            <Button handleClick={addInput}>×</Button>
          </div>
          <div className='row'>
            <Button handleClick={addInput}>4</Button>
            <Button handleClick={addInput}>5</Button>
            <Button handleClick={addInput}>6</Button>
            <Button handleClick={addInput}>-</Button>
          </div>
          <div className='row'>
            <Button handleClick={addInput}>1</Button>
            <Button handleClick={addInput}>2</Button>
            <Button handleClick={addInput}>3</Button>
            <Button handleClick={addInput}>+</Button>
          </div>
          <div className='row'>
            <Button handleClick={addInput}>0</Button>
            <Button handleClick={addInput}>.</Button>
            <Button handleClick={equalFn}>=</Button>
          </div>
        </div>
      </div>
    </section>
  );
};
