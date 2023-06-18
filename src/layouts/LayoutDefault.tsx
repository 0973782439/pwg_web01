import React from 'react';
import { Card, Layout } from 'antd';
import Nav from '../components/Header/Nav';
import MenuNav from '../components/Menu/MenuNav';
const { Content } = Layout;
interface Props {
    children: any
}
const LayoutDefault: React.FC<Props> = ({ children }) => {
    return (
        <Layout className='w-[100%] h-[100vh]'>
            <Nav></Nav>
            <Layout className='gap-5 mt-[98px] w-full'>
                <MenuNav></MenuNav>
                <Layout style={{marginLeft: 270}}>
                    <Content style={{ padding: '10px 0 20px 0'}}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>

    );
};

export default LayoutDefault;   