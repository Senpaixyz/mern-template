import {useState, useEffect, useContext } from 'react';
import AuthService from '../../services/AuthService';
import toast from 'react-hot-toast';


import Logout from '../tools/Logout';


const Dashboard = () => {
  const user = AuthService.getAuthUser().user;

  return (
    <>
        <h1>DASHBOARD</h1>

        <h5>UID: {user?._id}</h5>
        <h5>USERNAME: {user?.name}</h5>
        <h5>EMAIL: {user?.email}</h5>


        <Logout  />
        
    </>
  )
}

export default Dashboard;