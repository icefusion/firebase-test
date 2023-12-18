import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import './App.css'
import { useEffect, useState } from 'react';
import { auth } from './configs/firebase/config';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [profile, setProfile] = useState({});

  const handleAuthentication = async () => {
    console.log("Authenticating user")

    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user;

      console.log('USER ', user);

      // Set to state
      setIsAuth(true);
      setProfile(user.providerData[0]);
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
        <pre></pre>
        <p>Is Auth: {isAuth}</p>
      </div>
    </div>
  );
}

export default App
