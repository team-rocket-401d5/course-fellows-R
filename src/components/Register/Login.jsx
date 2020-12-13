import React, { useContext, useState } from 'react';
import { If, Else, Then } from 'react-if';
import { RegisterContext } from '../../context/auth';
import { Button, Form} from 'react-bootstrap';
import Oauth from './Oauth';

function Login(props) {
	const context = useContext(RegisterContext);
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');

	const handleChange = (e) => {
		if (e.target.name === 'username') {
			setUsername(e.target.value);
		} else {
			setPassword(e.target.value);
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		context.login(username, password);
	};

	return (
		<If condition={context.loggedIn}>
			<Then>
				<Button id="btj" variant="dark" onClick={context.logout}>
					Logout
				</Button>
			</Then>
			<Else>

				<Form onSubmit={handleSubmit} style={{width:'100%',maxWidth:350, margin:'0 auto'}} className="justify-content-md-center" >
        
    
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="text"
							name="username"
							placeholder="Enter Username"
							onChange={handleChange}
							className="mr-sm-2"
						/>
					</Form.Group>
    
					<Form.Group controlId="formBasicPassword" >
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							name="password"
							placeholder="Enter password"
							onChange={handleChange}
							className="mr-sm-2"
							
						/>
					</Form.Group>
    
					<Button variant="primary" type="submit" style={{width:'100%',maxWidth:350}}>
						Login
					</Button>
     <div className='oauth'   >
  
					<Oauth   />
   
     </div>
       

      
				</Form>
			</Else>
		</If>
	);
}

export default Login;
