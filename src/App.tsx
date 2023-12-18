import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import './App.css'
import { useEffect, useState } from 'react';
import { auth } from './configs/firebase/config';

function App() {
  const [isAuth, setIsAuth] = useState('No');
  const [profile, setProfile] = useState({uid: '', email: '', name: ''});

  const handleAuthentication = async () => {
    console.log("Authenticating user")

    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user;

      console.log('USER ', user);

      const userData = {
        uid: user.providerData[0].uid ?? '', 
        email: user.providerData[0].email ?? '', 
        name: user.providerData[0].displayName ?? ''
      };

      // Set to state
      setIsAuth('Yes');
      setProfile(userData);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    console.log('Profile: ', profile);
  }, [profile])

  return (
    <div>
      <h1>Test Login using Firebase</h1>
      <div className="profile">
        <button onClick={handleAuthentication}>
          Click to Login
        </button>
        <h2>Profile Data</h2>
        <ul>
          <li>Id: {profile.uid}</li>
          <li>Name: {profile.name}</li>
          <li>Email: {profile.email}</li>
        </ul>        
        <p>Is Authenticated: {isAuth}</p>
      </div>
    </div>
  );
}

export default App
