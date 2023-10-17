import { Mail, Phone } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import style from "./Footer.module.css";

const Footer = () => {
  const [visible, setVisible] = useState(false);

  const visibility = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  window.addEventListener("scroll", visibility);

  return (
    <div className={style.footerContainer}>
      <div className={style.contact}>
        <h1>Contact Us</h1>
        <h5>
          {" "}
          <Phone /> 8210997459{" "}
        </h5>
        <h6>
          {" "}
          <Mail /> kingejaz143@gmail.com{" "}
        </h6>
      </div>
      <div className={style.copyright}>
        <h1> &copy; Mohammad Ejaz</h1>
      </div>
      <Tooltip title={"Back to Top"} placement="left-start" arrow>
        <i
          className="fa-solid fa-circle-chevron-up"
          id="backToTop"
          style={{
            display: visible ? "inline" : "none",
            position: "fixed",
            bottom: "10%",
            color: "var(--black)",
            zIndex: "4",
            cursor: "pointer",
            fontSize: "30px",
            width: "30%",
            right: "-20%",
          }}
          onClick={scrollToTop}
        ></i>
      </Tooltip>
    </div>
  );
};

export default Footer;
