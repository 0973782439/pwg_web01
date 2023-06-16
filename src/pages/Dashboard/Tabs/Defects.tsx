import React, { useEffect, useState } from 'react';
import { Col, Row, Progress, Space, Select } from 'antd';
import { Pie, Column } from '@ant-design/plots';
import { IResponseDashBoard } from '../../../interfaces';
import { DefectAPI, DefectTrendAPI } from '../../../api/dashboard.api';
interface Props {
    stateDefect: any
    setStateDefect: any
}
const Defects: React.FC<Props> = ({ stateDefect, setStateDefect }) => {
    const [stateDefectTrend, setStateDefectTrend] = useState<any>([])
    const fetchDefect = () => {
        const jsonDefect = DefectAPI()
        jsonDefect.then((res: any) => {
            setStateDefect(res.data)
        }).catch((error: any) => {
        })
    }
    const fetchDefectTrend = (value: number) => {
        const jsonDefectTrand = DefectTrendAPI(value)
        jsonDefectTrand.then((res: any) => {
            setStateDefectTrend(res.data)
        }).catch((error: any) => {
        })
    }
    useEffect(() => {
        fetchDefect();
        fetchDefectTrend(1);
    }, [])
    const data_DefectWorkflow = stateDefect?.defectWorkflow?.workflowItems || [];
    const colorPalette = data_DefectWorkflow?.map((item: IResponseDashBoard) => item.backColor);
    const colorDefectTrend = stateDefectTrend?.map((item: any) => item.backColor);
    const configPie = {
        appendPadding: 10,
        data: data_DefectWorkflow,
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
    const configDefectTrend = {
        data: stateDefectTrend,
        color: colorDefectTrend,
        columnWidthRatio: 0.6,
        xField: 'dateCurrentString',
        yField: 'totalDefect',
        isStack: true,
        seriesField: 'serverityName',
        groupField: 'dateCurrentString',
        tooltip: {
            formatter: (datum: any) => ({
                name: datum.serverityName,
                value: datum.totalDefect,
            }),
        },
        scrollbar: {
            type: 'horizontal' as 'horizontal' | 'vertical' | undefined,
        },
        legend: {
            position: 'top-right' as const,
        },
    };
    const handleChangeDefectTrend = (value: number) => {
        fetchDefectTrend(value)
    }
    return (
        <>
            <Row className='gap-4 flex-nowrap'>
                <Col style={{ boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.05)', padding: '12px', border: '1px solid #f0f0f0' }} span={14}>
                    <div style={{ width: '100%', }}>
                        <div className='mb-[35px]'>Defect Workflow</div>
                        <Pie {...configPie} />
                    </div>
                </Col>
                <Col style={{ boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.05)', padding: '12px', border: '1px solid #f0f0f0' }} span={10}>
                    <div className='mb-[35px] w-full'>
                        <div className='mb-[35px]'>Defect Trend</div>
                        <Space wrap>
                            <Select
                                defaultValue={1}
                                style={{ minWidth: 150, marginBottom: 20 }}
                                onChange={handleChangeDefectTrend}
                                options={[
                                    { value: 1, label: 'Today' },
                                    { value: 2, label: 'Yesterday' },
                                    { value: 3, label: 'Last Week' },
                                    { value: 4, label: 'Last month' },
                                    { value: 5, label: 'Project' },
                                ]}
                            />
                        </Space>
                        <Column {...configDefectTrend} />
                    </div>
                </Col>
            </Row>
            <Row className='gap-4 flex-nowrap'>
                <Col style={{ boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.05)', padding: '12px', border: '1px solid #f0f0f0' }} span={18}>
                    <div className='mb-[35px] w-full'>
                        <div className='mb-[35px]'>Test Case Exception</div>
                        <div className='flex justify-evenly items-center'>
                            {stateDefect?.defectExceptions?.map((item: IResponseDashBoard, index: number) => {
                                return (<Row key={index} className='flex-col items-center gap-2'>
                                    <Col className='w-[180px] text-center'>
                                        <span style={{ color: item.backColor, minHeight: '44px', display: 'inline-block' }}>{item.text}</span>
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
                <Col style={{ boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.05)', padding: '12px', border: '1px solid #f0f0f0' }} span={6}>
                    <div className='mb-[35px] w-full'>
                        <div className='mb-[35px]'>Defect Risk</div>
                        <div className='flex justify-evenly items-center'>
                            {stateDefect?.defectRisk?.map((item: IResponseDashBoard, index: number) => {
                                return (<Row key={index} className='flex-col items-center gap-2'>
                                    <Col className='w-[180px] text-center'>
                                        <span style={{ color: item.backColor, minHeight: '44px', display: 'inline-block' }}>{item.text}</span>
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

export default Defects;