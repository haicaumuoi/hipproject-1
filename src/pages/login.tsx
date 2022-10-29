import indeedLogo from '../assets/logos/logo.png';
import googleLogo from '../assets/logos/google.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/posts',
});

const clientId =
  '613985939864-7h3brr80t1hh5cu13gtmlou9kr44s36t.apps.googleusercontent.com';

function Login() {
  const [user, setUser] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  const loginGoogle = (email: string) => {
    client
      .post('https://hipproback.herokuapp.com/api/login', {
        email: email,
      })
      .then((response) => {
        setUser(response.data);
        setIsSignedIn(response.data.success);
        //   isSignedIn ? (
        //     navigate('/')
        //   ) : (
        //     <Snackbar open={!isSignedIn} autoHideDuration={2000}>
        //       <Alert severity="error" sx={{ width: '100%' }}>
        //         Log in failed!
        //       </Alert>
        //     </Snackbar>
        //   );
        console.log(isSignedIn);
      });
  };

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      });
    };
    gapi.load('client:auth2', initClient);
  });

  const onSuccess = (res: any) => {
    loginGoogle(res.profileObj.email);
    console.log('Login Success: currentUser:', res.profileObj);
  };

  const onFailure = (err: any) => {
    console.log('failed:', err);
  };

  return (
    <div className=" w-full h-screen pt-20 flex flex-col bg-gray-100 justify-start items-center">
      <img src={indeedLogo} alt={'logo'} className="w-20" />

      <div className="w-[31%] h-fit pb-10 mt-8 border border-gray-400 flex flex-col justify-start items-start bg-white rounded-lg">
        <h1 className="mx-5 mt-7 text-xl font-bold">
          Ready to take the next step?
        </h1>
        <p className="text-lg mx-5 my-2">Sign In With Google</p>
        <p className="text-xs mx-5">
          By logging in, you understand and agree to {"Hipproject's"} Terms. You
          also acknowledge our Cookie and Privacy policies.
        </p>

        <GoogleLogin
          clientId={clientId as string}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
          className="flex items-center w-11/12 h-12 rounded-lg mx-auto text-center border-gray-300 border mt-5 justify-center cursor-pointer hover:bg-slate-100 transition-all text-black"
        />
      </div>
    </div>
  );
}

export default Login;
