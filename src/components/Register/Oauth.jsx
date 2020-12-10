import React, { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import { RegisterContext } from '../../context/auth';

function Oauth() {
  const context = useContext(RegisterContext);
  let options = {
    client_id: '1014187475049-t1ia1v1in4t4us48lmlsugme36of0as0.apps.googleusercontent.com',
    redirect_uri: 'http://localhost:4000/oauth',
  };

  const responseGoogle = async response => {
    console.log(response);
    console.log(response.profileObj.email);

    const email = { email: response.profileObj.email };
    context.oauth(email);
  };
  //   return <a href={authURL}>continue with google</a>;

  return (
    <GoogleLogin
      clientId={options.client_id}
      redirectUri={options.redirect_uri}
      buttonText="Continue using gmail"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
      style={{width:'100%'}}
    />
  );
}

export default Oauth;
