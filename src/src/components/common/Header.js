import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from './logo.png';
import "./Header.css";

function Header() {

	const flexStyle = {
		flex: '1'
	}
	return (
		<header className="flex-container" style={{
			justifyContent: 'space-around',
			alignItems: 'baseline'
		}}>
			<div  style={flexStyle}>
				<Link to="/" className="removeAnchorStyles">
        			<img src={logo} className="App-logo" alt="logo" />
					<h1>Gecko Portal</h1>
				</Link>
			</div>
			<div className="flex-container">
				<div style={Object.assign({}, flexStyle, {})}>
					<NavLink to="/" exact style={{marginRight: '10px'}} activeClassName="navlink-active">
						<button className="removeAnchorStyles" >Home</button>
					</NavLink>
					<NavLink to="/datagraph" activeClassName="navlink-active">
						<button className="removeAnchorStyles" >Datagraph</button>
					</NavLink>
					</div>
			</div>
      	</header>

	)
}

export default Header;