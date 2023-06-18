import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Menu, Layout } from 'antd';
const { Sider } = Layout;

const items = [
    {
        key: '1',
        icon: <UserOutlined />,
        label: 'Worklist',
    },
    {
        key: '2',
        icon: <VideoCameraOutlined />,
        label: 'Dashboard',
    },
    {
        key: '3',
        icon: <UploadOutlined />,
        label: 'Release',
    },
    {
        key: '4',
        icon: <UploadOutlined />,
        label: 'User Stories',
    },
    {
        key: '5',
        icon: <UploadOutlined />,
        label: 'Workbench',
    },
    {
        key: '6',
        icon: <UploadOutlined />,
        label: 'Test Lab',
    },
    {
        key: '7',
        icon: <UploadOutlined />,
        label: 'Execute',
    },
    {
        key: '8',
        icon: <UploadOutlined />,
        label: 'Bugs',
    },
    {
        key: '9',
        icon: <UploadOutlined />,
        label: 'Reports',
    },
    {
        key: '10',
        icon: <UploadOutlined />,
        label: 'Enginuity Workbench',
    },
    {
        key: '11',
        icon: <UploadOutlined />,
        label: 'Batch Scheduling',
    },
    {
        key: '12',
        icon: <UploadOutlined />,
        label: 'Virtual Tester Monitor',
    },
]
const MenuNav = () => {
    return (
        <Sider
            width={250}
            breakpoint="lg"
            collapsedWidth="0"
            style={{ background: '#002060', padding: '10px 20px', position:"fixed", left:0, top: 98, zIndex: 50, height: '100%'}}
        >
            <div className="demo-logo-vertical" />
            <Menu
                className='font-semibold'
                style={{ background: '#002060', color: 'white', fontSize: '14px', fontFamily: 'Calibri' }}
                mode="inline"
                defaultSelectedKeys={['2']}
            >
                <Menu.ItemGroup key="mainMenu" title={<h2 className='text-white'>MAIN MENU</h2>} />
                {items.map((item: any) => {
                    return <Menu.Item icon={item.icon} key={item.key}>{item.label}</Menu.Item>
                })}
            </Menu>
        </Sider>
    );
};

export default MenuNav;