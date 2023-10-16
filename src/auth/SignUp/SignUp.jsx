import React, { useState } from "react";
import style from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";

import data from "../user.json";
import { Context } from "../../App";
const Sign = () => {
  const navigate = useNavigate();
  const { setLogged, setOpenSnack } = Context();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pass: "",
    repass: "",
  });

  const change = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormData({ ...formData, [name]: value });
  };

  const log = (e) => {
    var flag = true;
    e.preventDefault();
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (formData.pass !== formData.repass) {
      setOpenSnack({
        open: true,
        html: `Re entered password didn't matched.`,
        severity: "error",
        time: "1500",
      });
      flag = false;
    }
    if (formData.pass === "") {
      setOpenSnack({
        open: true,
        html: `Password can't be empty.`,
        severity: "error",
        time: "1500",
      });
      flag = false;
    }
    if (formData.pass < 4) {
      setOpenSnack({
        open: true,
        html: `Password should be length greater than 3.`,
        severity: "error",
        time: "1500",
      });
      flag = false;
    }
    if (formData.name === "") {
      setOpenSnack({
        open: true,
        html: `User Name can't be empty`,
        severity: "error",
        time: "1500",
      });
      flag = false;
    }
    if (formData.name < 3) {
      setOpenSnack({
        open: true,
        html: `username length greater than 3.`,
        severity: "error",
        time: "1500",
      });
      flag = false;
    }
    if (validRegex.test(formData.email) === false) {
      setOpenSnack({
        open: true,
        html: `Please enter a valid email.`,
        severity: "error",
        time: "1500",
      });
      flag = false;
    }
    let id = Math.floor(data.length + Math.random() * 100);

    if (flag) {
      data.push(formData);
      setLogged({ id: id, name: formData.name });
      navigate("/products");
      setOpenSnack({
        open: true,
        html: `Welcome ${formData.name}`,
        severity: "success",
        time: "1000",
      });
    }
  };

  return (
    <div className={style.sign}>
      <div className={style.signContainer}>
        <h1 className={style.title}>Register</h1>
        <form className={style.formContainer}>
          <div>
            <h1>Email-Id</h1>
            <input
              type="email"
              placeholder="email@abc.com"
              required
              autoFocus
              name="email"
              onChange={change}
            />
            <h1>User Name </h1>
            <input
              type="text"
              placeholder="username"
              required
              name="name"
              onChange={change}
            />
            <h1> Password </h1>
            <input
              type="password"
              placeholder="password"
              required
              name="pass"
              onChange={change}
            />
            <h1> Re-Enter Password </h1>
            <input
              type="text"
              placeholder="password"
              required
              name="repass"
              onChange={change}
            />
            <button onClick={log}> Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sign;
