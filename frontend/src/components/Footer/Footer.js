import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <div className="git-hub-container">
          <img
            src="https://logos-download.com/wp-content/uploads/2016/09/GitHub_logo.png"
            alt="github-img"
          />
        </div>
        <p className="copy-right-para">
          2023&copy; Copyright Raj Reddy Center For Technology And Society All Rights Reserved
        </p>
      </div>
    );
  }
}

export default Footer;
