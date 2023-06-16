import React from 'react';
import { Button, Layout } from 'antd';
import { logo } from '../../assets/images/index';
const { Header } = Layout;
const Nav = () => {
    return (
        <Header className='bg-[#FFFFFF] p-5 h-[98px] flex justify-between items-center fixed z-50 top-0 left-0 w-full' >
            <img width={200} src={logo} alt="logo-header" />
            <Button>
                Logout
            </Button>
        </Header>
    );
};

export default Nav;