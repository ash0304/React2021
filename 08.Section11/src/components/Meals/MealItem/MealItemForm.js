import React, { useRef, useState } from 'react';

import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    // expose後就可以使用current內的資訊
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    // Validate Input value
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddtoCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {/* {因為Input是客製化Component, 所以要使用useRef的話} */}
      {/* {在Input Component內要使用React.forwardRef() 來expose資訊給這層 */}
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: `amount${props.id}`,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please Enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
