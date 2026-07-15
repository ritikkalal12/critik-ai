import React from 'react';
import { auth, googleProvider } from '../utils/firebase';
import { signInWithPopup } from 'firebase/auth';

function App() {
  const googleLogin = async () => {
    const data = await signInWithPopup(auth, googleProvider);
    console.log(data);
  };

  return (
    <div className='w-full h-screen flex items-center justify-center bg-black'>
      <button className='w-50 h-24 bg-white' onClick={googleLogin}>
        Continue with Google
      </button>
    </div>
  );
}

export default App;
