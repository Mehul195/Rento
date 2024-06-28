import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const NewLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/auth/login", {
        email: email,
        password: password
      });
      const data = res.data;
      localStorage.setItem("token", data.token);
      toast.success('Login successful!');
      navigate('/landing');
    } catch (err) {
      console.log(err);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-screen-md">
        <div className="grid grid-cols-2">
          <div className="w-full h-full bg-gray-200">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxL5ATunFhHOvr6_cbOJkg-a_qtOZbGpQzjw&usqp=CAU" alt="Your Image Alt Text" className="w-full h-full object-cover" />
          </div>
          <div className="p-6 flex flex-col gap-1.5">
            <div className="space-y-1.5 p-6 flex flex-col gap-1.5">
              <div className="text-sm font-semibold tracking-wide">Welcome back</div>
              <div className="text-lg font-bold">Login to your account</div>
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium leading-none" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium leading-none" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-4 self-start border border-primary rounded-full"
                type="submit"
              >
                Login
              </button>
            </form>
            <div className="flex justify-center">
              <p className="text-sm text-gray-600">New to the website? <a href="/signup" className="text-primary hover:underline">Sign up</a></p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
