import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import schema from "./formSchema";

const initialFormValues = {
  name: "",
  pizzaSize: "",
  olives: false,
  mushrooms: false,
  jalapenos: false,
  extraCheese: false,
  instructions: "",
};

const initialFormErrors = {
  name: "",
  pizzaSize: "",
};

export default function Form() {
  const [orders, setOrders] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(true);

  const postNewOrder = (newOrder) => {
    axios
      .post("https://reqres.in/api/products", newOrder)
      .then((newOrder) => {
        setOrders([...orders, newOrder.data]);
        setFormValues(initialFormValues);
      })
      .catch((err) => {
        debugger;
        console.log(err);
      });
  };

    const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
  };

  const change = (evt) => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === "checkbox" ? checked : value;
    inputChange(name, valueToUse);
  };

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const submit = (evt) => {
    evt.preventDefault();
    const newOrder = {
      name: formValues.name.trim(),
      pizzaSize: formValues.pizzaSize,
      toppings: ["olives", "mushrooms", "jalapenos", "extraCheese"].filter(
        (topping) => formValues[topping]
      ),
      instructions: formValues.instructions.trim(),
    };
    postNewOrder(newOrder);
  };

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div>
      <h2>Place Your Order</h2>
      <form onSubmit={submit}>
        <div className="errors-container">
          <div>{formErrors.name}</div>
          <div>{formErrors.pizzaSize}</div>
        </div>
        <br />

        <div className="form-container">
          <label>Name: </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formValues.name}
            onChange={change}
          />
          <br />
          <label>Pizza Size: </label>
          <select
            name="pizzaSize"
            value={formValues.pizzaSize}
            onChange={change}
          >
            <option value="">--- select size ---</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="Extra Large">Extra Large</option>
          </select>
          <br />
          <h4>Toppings</h4>
          <label>
            Olives{" "}
            <input
              type="checkbox"
              name="olives"
              checked={formValues.olives}
              onChange={change}
            />
          </label>
          <br />
          <label>
            Mushrooms{" "}
            <input
              type="checkbox"
              name="mushrooms"
              checked={formValues.mushrooms}
              onChange={change}
            />
          </label>
          <br />
          <label>
            Jalapenos{" "}
            <input
              type="checkbox"
              name="jalapenos"
              checked={formValues.jalapenos}
              onChange={change}
            />
          </label>
          <br />
          <label>
            Extra Cheese{" "}
            <input
              type="checkbox"
              name="extraCheese"
              checked={formValues.extraCheese}
              onChange={change}
            />
          </label>
          <br />
          <h4>Special Instructions</h4>
          <input
            type="text"
            name="instructions"
            placeholder="Enter delivery instructions"
            value={formValues.instructions}
            onChange={change}
          />
          <br />
          <br />
          <button disabled={disabled}>Add to Order</button>

          <div className="order-container">
            {orders.map((order) => {
              if (!order) {
                return <h3>Working on finding your order...</h3>;
              }
              return (
                <div className="order-details">
                  <h2>Your pizza is on it's way!</h2>
                  <h4>Size:</h4>
                  <p>{order.pizzaSize}</p>
                  <h4>Toppings:</h4>
                  <p>{order.toppings[0]}</p>
                  <p>{order.toppings[1]}</p>
                  <p>{order.toppings[2]}</p>
                  <p>{order.toppings[3]}</p>
                  <h4>Delivery Instructions:</h4>
                  <p>{order.instructions}</p>
                </div>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
}