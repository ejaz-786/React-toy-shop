import React, { useState } from "react";
import style from "./Login.module.css";
import data from "../user.json";
import { Context } from "../../App";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const { setLogged, setOpenSnack } = Context();
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
  });

  const log = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormData({ ...formData, [name]: value });
  };

  const validation = (e) => {
    e.preventDefault();
    if (formData.email === "" || formData.pass === "") {
      setOpenSnack({
        open: true,
        html: `Please fill all the fields !!`,
        severity: "error",
        time: "1500",
      });
    } else {
      data.forEach((val) => {
        if (val.email === formData.email && val.pass === formData.pass) {
          setLogged({ id: val.id, name: val.name });
          setOpenSnack({
            open: true,
            html: `Welcome ${val.name}`,
            severity: "success",
            time: "1000",
          });
          setFormData({ email: "", pass: "" });
          navigate("/products");
        } else {
          setOpenSnack({
            open: true,
            html: `No matching user found! Please try again.`,
            severity: "error",
            time: "1500",
          });
        }
      });
    }
  };
  return (
    <div className={style.login}>
      <div className={style.signContainer}>
        <h1
          style={{ textAlign: "center", fontSize: "2.5rem", paddingTop: "5vh" }}
        >
          Log In
        </h1>
        <form id="registerForm" className={style.formContainer}>
          <div>
            <h1>Email-Id</h1>
            <input
              type="email"
              placeholder="email@abc.com"
              required
              autoFocus
              value={formData.email}
              name="email"
              onChange={log}
            />
            <h1> Password </h1>
            <input
              type="password"
              placeholder="password"
              required
              name="pass"
              value={formData.pass}
              onChange={log}
            />
            <p id="notice"></p>
            <button onClick={validation}> Login </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
