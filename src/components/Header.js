import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header><Link className="backToHome" to="/">Movie Cards Library</Link></header>
    );
  }
}

export default Header;
