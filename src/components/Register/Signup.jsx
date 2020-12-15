import React, { useState, useContext } from 'react';
import { RegisterContext } from '../../context/auth';
import { If, Else, Then } from 'react-if';
import { Button, Form} from 'react-bootstrap';
import Oauth from './Oauth';

function Signup(props) {
	const context = useContext(RegisterContext);
	const [ username, setusername ] = useState('');
	const [ password, setpassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');

	const handleChange = (e) => {
		if (e.target.name === 'username') {
			setusername(e.target.value);
		} else if (e.target.name === 'password') {
			setpassword(e.target.value);
		} else if (e.target.name === 'Confirm') {
			setConfirmPassword(e.target.value);
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) alert('your passwords are not equal');
		else context.signup(username, password);
	};

	return (
		<If condition={context.loggedIn}>
			<Then />
			<Else>
				<Form onSubmit={handleSubmit} style={{width:'100%',maxWidth:350, margin:'0 auto'}} className="justify-content-md-center">
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Username</Form.Label>

						<Form.Control
							type="text"
							name="username"
							placeholder="Enter Username"
							onChange={handleChange}
							className="mr-sm-2"
							value={username}
						/>
					</Form.Group>

					<Form.Group controlId="formBasicEmail">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							name="password"
							placeholder="Enter password"
							onChange={handleChange}
							className="mr-sm-2"
							value={password}
						/>
					</Form.Group>

					<Form.Group controlId="formBasicEmail">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							name="Confirm"
							placeholder="Confirm password"
							onChange={handleChange}
							className="mr-sm-2"
							value={confirmPassword}
						/>
					</Form.Group>

					<Button variant="primary" type="submit"  style={{width:'100%',maxWidth:350}}>
						signup
					</Button>
          <div className='oauth'   >
  
  <Oauth   />

</div>
				</Form>
			</Else>
		</If>
	);
}

export default Signup;
