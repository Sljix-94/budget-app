import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  let inputElement = null;

  const inputClasses = [classes.input];

  if (props.invalid && props.shouldValidate && props.touched)
    inputClasses.push(classes.Invalid);

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          {...props.elementConfig}
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "checkbox":
      inputElement = (
        <span className={classes.checkbox}>
          <input
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
          />
          I agree to the Tearms of Users
        </span>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};
export default input;
