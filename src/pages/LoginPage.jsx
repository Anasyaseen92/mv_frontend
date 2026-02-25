import React from 'react'
import Login from '../components/Login/Login.jsx'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function LoginPage() {
  const {isAuthenticated} = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() =>{
    if(isAuthenticated === true){
      navigate("/");
    }
  },[])
  return (
    <div>
      <Login/>
    </div>
  )
}

export default LoginPage;