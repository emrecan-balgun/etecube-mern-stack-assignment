import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';

import { changeShow } from '../store/etecube/etecubeSlice';
import EtecubeLogo from '../assets/img/etecube-logo.png';
import Login from './Login';
import Register from './Register';

function Membership() {
  const dispatch = useDispatch();
  const showLogin = useSelector((state) => state.etecube.showLogin);

  const [option, setOption] = useState('Login');

  const changePage = () => {
    setOption(option === 'Login' ? 'Register' : 'Login');
    dispatch(changeShow());
  };

  return (
    <div className="grid h-screen place-items-center bg-gradient-to-br from-[#ff966d] via-[#fa538d] to-[#89379c]">
      <div
        className="relative w-[800px] h-[400px] bg-white rounded-md"
        style={{ boxShadow: '0 5px 20px rgba(0, 0, 0, .5)' }}
      >
        <div
          className="absolute top-0 left-0 w-[300px] h-[400px] bg-gradient-to-r from-[#ff966d] to-[#fa538d] rounded-t-md rounded-b-md text-center transition z-[2]"
          style={{ transition: '1s cubic-bezier(.95,.32,.37,1.31)' }}
        >
          <div className="flex flex-col items-center justify-center">
            <img className="object-cover w-full" src={EtecubeLogo} />
            <h2 className="tracking-tight text-white">ETECube</h2>
            <Button
              className="w-[150px] h-10 rounded-lg outline-none bg-transparent text-white visible cursor-pointer hover:!border-white hover:!text-white"
              onClick={() => {
                changePage();
              }}
            >
              {option}
            </Button>
          </div>
        </div>

        <div
          className="absolute top-0 left-[300px] w-[500px] h-full text-center z-[1] opacity-100 visible"
          style={{ transition: '1s cubic-bezier(.95, .32,.37,1.31)' }}
        >
          {showLogin ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
}

export default Membership;
