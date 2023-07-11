import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  return (
    <header>
      <nav>
        <ul>
          <li className="left">
            <Link to="/">Budget App</Link>
          </li>
          <li className="right">
            <Link to="/new-transaction">New Transaction</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;