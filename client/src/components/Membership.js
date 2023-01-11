import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Image, Typography } from 'antd';

import { changeShow } from '../store/etecube/etecubeSlice';
import EtecubeLogo from '../assets/img/etecube-logo.png';
import Login from './Login';
import Register from './Register';

function Membership() {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const showLogin = useSelector((state) => state.etecube.showLogin);

  const [option, setOption] = useState('Login');

  const changePage = () => {
    setOption(option === 'Login' ? 'Register' : 'Login');
    dispatch(changeShow());
  };

  return (
    <div className="h-screen">
      <div className="h-full flex flex-col justify-center items-center md:flex-row bg-[url('/src/assets/img/banner-bg.png')]">
        <div className="hidden md:flex w-full p-4 md:w-1/2 md:p-0 flex-col items-center justify-center">
          <img src={EtecubeLogo} className="w-1/5 h-1/5" alt="etecube_logo" />
          <Title className="!text-white tracking-tight" level={1}>
            ETECube
          </Title>
          <Button
            className="w-1/4 rounded-lg outline-none bg-transparent text-white visible cursor-pointer hover:!border-white hover:!text-white"
            onClick={() => {
              changePage();
            }}
          >
            {option}
          </Button>
        </div>
        <div className="w-full md:w-1/2 flex mt-4 md:mt-0 flex-col items-center justify-center">
          <div className="w-1/2 mx-auto">
            {showLogin ? <Login /> : <Register />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Membership;
