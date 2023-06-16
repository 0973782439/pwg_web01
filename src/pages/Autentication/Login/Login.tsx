import React from 'react';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import "./Login.scss";
import { logo } from "../../../assets/images/index"
import { useAppDispatch } from '../../../app/hooks';
import { AuthActions } from '../../../app/Redux/Auth.slice';
const Login = () => {
    const dispatch = useAppDispatch()
    const handleLogin = (values: any) => {
        dispatch(AuthActions.login(values))
    }

    return (
        <div className='login'>
            <div className='wrapper'>
                <Card className='card_login' bordered={false}>
                    <Row className='flex-col justify-center'>
                        <Col className='flex justify-end'>
                            <img src={logo} alt="logo" className='img_header' />
                        </Col>
                        <Col span={16} className='m-auto flex justify-center items-center flex-col w-full'>
                            <h1 className='title'>Welcome</h1>
                            <p className='descriptions'>Please enter your contact details to connect.</p>
                            <Form className='w-full' layout="vertical" autoComplete="off" onFinish={handleLogin}>
                                <Form.Item
                                    label="Username"
                                    name="account"
                                    rules={[{ required: true, message: "Please enter account information" }]}
                                    className="text-base font-medium mb-[24px]"
                                >
                                    <Input className='py-1 px-[11px] h-[50px] bg-[#f9f9f9] text-base font-medium rounded-xl' placeholder='Enter your usename' style={{ color: 'rgb(140, 140, 140)' }} />
                                </Form.Item>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[{ required: true, message: "Please enter account information" }]}
                                    className="text-base font-medium mb-[24px]"
                                >
                                    <Input type='password' className='py-1 px-[11px] h-[50px] bg-[#f9f9f9] text-base font-medium rounded-xl' placeholder='Enter your password' style={{ color: 'rgb(140, 140, 140)' }} />
                                </Form.Item>
                                <a style={{ color: 'rgba(0,0,0,.85)' }} className='text-right underline mt-4 block text-base font-medium text-[#4B4B4B]' href="#">Forgot password</a>
                                <Button htmlType='submit' className='btb_singin mt-10'>
                                    Sing in
                                </Button>
                            </Form>
                        </Col>
                        <Col>
                        </Col>
                        <Col className='img_footer'>
                            <span className='text_footer'>
                                © Copyright PinnacleQM 2014 - 2022. All Rights Reserved
                            </span>
                        </Col>
                    </Row>
                </Card>
            </div>

        </div>


    );
};

export default Login;