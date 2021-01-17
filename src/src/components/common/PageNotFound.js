import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {

	return (
		<>
			<h1> Page not found </h1>
			<Link path="/">Back to home</Link>
		</>
	)
}

export default PageNotFound;