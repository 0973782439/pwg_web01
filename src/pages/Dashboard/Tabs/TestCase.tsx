import React, { useEffect } from 'react';
import { Col, Row, Progress } from 'antd';
import { Pie } from '@ant-design/plots';
import { IResponseDashBoard } from '../../../interfaces';
import { TestCaseAPI } from '../../../api/dashboard.api';
interface Props {
    stateTestCase: any
    setStateTestCase: any
}
const TestCase: React.FC<Props> = ({ stateTestCase, setStateTestCase }) => {
    useEffect(() => {
        const json = TestCaseAPI()
        json.then((res: any) => {
            setStateTestCase(res.data)
        }).catch((error: any) => {
        })
    }, [])
    const data_TestCaseWorkflow = stateTestCase?.testCaseWorkflow?.workflowItem || [];
    const colorPalette = data_TestCaseWorkflow?.map((item: IResponseDashBoard) => item.backColor);
    const configPie = {
        appendPadding: 10,
        data: data_TestCaseWorkflow,
        angleField: 'value',
        colorField: 'text',
        color: colorPalette,
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            offset: '-50%',
            content: '{value}',
            style: {
                textAlign: 'center',
                fontSize: 14,
            },
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
    };
    return (
        <>
            <Row className='gap-4 flex-nowrap'>
                <Col style={{ boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.05)', padding: '12px', border: '1px solid #f0f0f0' }} span={14}>
                    <div style={{ width: '100%', }}>
                        <div>Test Case Workflow</div>
                        <Pie {...configPie} />
                    </div>
                </Col>
                <Col style={{ boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.05)', padding: '12px', border: '1px solid #f0f0f0' }} span={12}>
                    <div className='mb-[35px] w-full'>
                        <div className='mb-[35px]'>Custom Test Case</div>

                        <div className='ml-[50px]'>
                            {stateTestCase?.testCaseCustom?.map((item: IResponseDashBoard, index: number) => {
                                return (<Row key={index} className='mb-[45px] items-center gap-8'>
                                    <Col>
                                        <Progress
                                            size={62}
                                            type="circle"
                                            percent={100}
                                            strokeColor={item.backColor}
                                            format={() => <span style={{ color: item.backColor }}>{item.value}</span>}
                                        />
                                    </Col>
                                    <Col>
                                        <span style={{ color: item.backColor }}>{item.text}</span>
                                    </Col>
                                </Row>)
                            })}
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col style={{ boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.05)', padding: '12px', border: '1px solid #f0f0f0' }} span={14}>
                    <div className='mb-[35px] w-full'>
                        <div className='mb-[35px]'>Test Case Exception</div>
                        <div className='flex justify-evenly items-center'>
                            {stateTestCase?.testCaseException?.map((item: IResponseDashBoard, index: number) => {
                                return (<Row key={index} className='flex-col items-center gap-2'>
                                    <Col>
                                        <span style={{ color: item.backColor }}>{item.text}</span>
                                    </Col>
                                    <Col>
                                        <Progress
                                            size={62}
                                            type="circle"
                                            percent={100}
                                            strokeColor={item.backColor}
                                            format={() => <span style={{ color: item.backColor }}>{item.value}</span>}
                                        />
                                    </Col>
                                </Row>)
                            })}
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default TestCase;