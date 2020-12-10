import React, { useContext } from 'react';
import { RegisterContext } from './auth';
import { If } from 'react-if';

function Auth(props) {
	const context = useContext(RegisterContext);

	let okToRender = context.loggedIn ? true : false;
	return <If condition={okToRender}>{props.children}</If>;
}

export default Auth;
