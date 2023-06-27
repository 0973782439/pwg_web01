import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTER } from '../../utils/path';
const { Sider } = Layout;

const items = [
    {
        key: '1',
        icon: <UserOutlined />,
        label: 'Worklist',
    },
    {
        key: '2',
        icon: <img src="http://pinnacle-portal.server2div3.pgtest.co/static/media/dashboard.786a8c2274ee8940910310798245e069.svg" alt="" />,
        label: <Link to={ROUTER.dashboard} >Dashboard</Link>,
    },
    {
        key: '3',
        icon: <img src="http://pinnacle-portal.server2div3.pgtest.co/static/media/release.e73f11c543d0ed37d45c7d609da5385c.svg" alt="" />,
        label: <Link to={ROUTER.release} >Release</Link>,
    },
    {
        key: '4',
        icon: <img src="http://pinnacle-portal.server2div3.pgtest.co/static/media/user-story.8d6afdd4eff1c8678ed4c7709620e340.svg" alt="" />,
        label: <Link to={ROUTER.requirement} >User Stories</Link>,

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