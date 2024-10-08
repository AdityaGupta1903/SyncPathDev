"use client"
import React, { useRef, useState } from 'react';
import { Authenticate } from '../api/function';
import { useRouter } from 'next/navigation'  /// Just as useNavigate in React
const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const UsenameRef = useRef<HTMLInputElement>(null);
  const PasswordRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (isLogin) {
      // Handle Login
      const res = await Authenticate(UsenameRef.current?.value ?? "",PasswordRef.current?.value?? "","signin")
      if(res.data.statusCode === 200){
       localStorage.setItem("token",res.data.token);
       router.push('/synchomepage')
      }

    } else {
      // Handle Signup
      const res = await Authenticate(UsenameRef.current?.value ?? "",PasswordRef.current?.value?? "","signup")
      if(res.data.statusCode === 200){
        localStorage.setItem("token",res.data.token);
        router.push('/synchomepage')
       }
      console.log(res);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {isLogin ? 'Login to SyncPath' : 'Sign Up for SyncPath'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
    
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                User Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                ref={UsenameRef}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              ref = {PasswordRef}
              name="password"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={toggleForm}
            className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
