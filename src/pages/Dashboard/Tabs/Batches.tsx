import React, { useEffect, useState } from 'react';
import type { DatePickerProps } from 'antd';
import { BatchesAPI, DailyFrequencyAPI } from '../../../api/dashboard.api';
import { Col, Row, Progress, Space, DatePicker, Select } from 'antd';
import { Pie, Column } from '@ant-design/plots';
import { IResponseDashBoard } from '../../../interfaces';
interface Props {
    stateBatches: any
    setStateBatches: any
}
const Batches: React.FC<Props> = ({ stateBatches, setStateBatches }) => {
    const [stateDailyFrequency, setStateDailyFrequency] = useState<any>([])
    const [stateDate, setStateDate] = useState<any>({ fromDate: '2022-05-13', toDate: '2022-06-13', forItem: 'Test Cases' })
    const fetchBatches = () => {
        const jsonDefect = BatchesAPI()
        jsonDefect.then((res: any) => {
            setStateBatches(res.data)
        }).catch((error: any) => {
        })
    }
    const fetchDailyFrequency = (fromDate: string, toDate: string, forItem: string) => {
        const DailyFrequency = DailyFrequencyAPI(fromDate, toDate, forItem)
        DailyFrequency.then((res: any) => {
            setStateDailyFrequency(res.data)
        }).catch((error: any) => {
        })
    }
    useEffect(() => {
        fetchDailyFrequency(stateDate.fromDate, stateDate.toDate, stateDate.forItem)
        fetchBatches();
    }, [])
    useEffect(() => {
        fetchDailyFrequency(stateDate.fromDate, stateDate.toDate, stateDate.forItem)
    }, [stateDate])
    const data_BatchWorkflow = stateBatches?.batchWorkflowDashboard?.workflowItem || [];
    const colorPalette = data_BatchWorkflow?.map((item: IResponseDashBoard) => item.backColor);
    const configPie = {
        appendPadding: 10,
        data: data_BatchWorkflow,
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
    const data = stateDailyFrequency;
    const config = {
        data,
        xField: 'dateStartedString',
        yField: 'totalRuns',
        minColumnWidth: 20,
        maxColumnWidth: 20,
        scrollbar: {
            type: 'horizontal' as 'horizontal' | 'vertical' | undefined,
        },
        tooltip: {
            formatter: (datum: any) => ({
                name: datum.dateStartedString,
                value: datum.totalRuns,
            }),
        },
    };
    const onChangeFromDate: DatePickerProps['onChange'] = (date, dateString) => {
        setStateDate((prev: any) => ({ ...prev, fromDate: dateString }))
    };
    const onChangeToDate: DatePickerProps['onChange'] = (date, dateString) => {
        setStateDate((prev: any) => ({ ...prev, toDate: dateString }))
    };
    const onChangeForItem = (value: string) => {
        setStateDate((prev: any) => ({ ...prev, forItem: value }))
    };
    return (
        <>
            <Row className='gap-4 flex-nowrap'>
                <Col style={{ boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.05)', padding: '12px', border: '1px solid #f0f0f0' }} span={14}>
                    <div style={{ width: '100%', }}>
                        <div className='mb-[35px]'>Batch Workflow</div>
                        <Pie {...configPie} />
                    </div>
                </Col>
                <Col style={{ boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.05)', padding: '12px', border: '1px solid #f0f0f0' }} span={10}>
                    <div className='mb-[35px] w-full'>
                        <div className='mb-[35px]'>Test Daily Frequency</div>
                        <Row className='mb-[35px]'>
                            <Col className='flex gap-4 items-center' span={12}>
                                <label htmlFor="fromdate">
                                    From:
                                </label>
                                <Space wrap>
                                    <DatePicker id="fromdate" onChange={onChangeFromDate} />
                                </Space>
                            </Col>
                            <Col className='flex gap-4 items-center' span={12}>
                                <label htmlFor="todate">
                                    To:
                                </label>
                                <Space wrap>
                                    <DatePicker id="todate" onChange={onChangeToDate} />
                                </Space>
                            </Col>
                        </Row>
                        <Row className='mb-[35px]'>
                            <Col className='flex gap-4 items-center' span={12}>
                                <label htmlFor="foritem">
                                    For:
                                </label>
                                <Space wrap>
                                    <Select
                                        style={{ minWidth: 150 }}
                                        onChange={onChangeForItem}
                                        options={[
                                            { value: 'Test Cases', label: 'Test Cases' },
                                            { value: 'Components', label: 'Components' },
                                            { value: 'Test Steps', label: 'Test Steps' },
                                        ]}
                                    />
                                </Space>
                            </Col>
                        </Row>
                        <Column {...config} />
                    </div>
                </Col>
            </Row>  
            <Row className='gap-4 flex-nowrap'>
                <Col style={{ boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.05)', padding: '12px', border: '1px solid #f0f0f0' }} span={24}>
                    <div className='mb-[35px] w-full'>
                        <div className='mb-[35px]'>Batch Exception</div>
                        <div className='flex justify-evenly items-center'>
                            {stateBatches?.batchExceptionDashboard?.map((item: IResponseDashBoard, index: number) => {
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

export default Batches;