import React, { useCallback, useEffect, useState } from 'react';
import { Card, Row, Col, Collapse, Spin, Table } from 'antd'
import type { CollapseProps } from 'antd';
import { Pie } from '@ant-design/plots';
import { GetExecutionStatusAPI, GetIssueStatusAPI } from '../../../api/requirement.api';
interface Props {
    idSelectedRow?: number
}
const Status: React.FC<Props> = ({ idSelectedRow }) => {

    const [openExecution, setOpenExecution] = useState<boolean>(true)
    const [openIssueStatus, setOpenIssueStatus] = useState<boolean>(true)
    const [activeKeyIssueStatus, setActiveKeyIssueStatus] = useState([]);
    const [activeKeyExecutionStatus, setActiveKeyExecutionStatus] = useState([]);

    const [issueStatus, setIssueStatus] = useState<any>([])
    const [executionStatus, setExecutionStatus] = useState<any>([])
    /**
     * Gọi api 
     */
    const GetIssueStatus = useCallback(() => {
        const get_issue_status = GetIssueStatusAPI(idSelectedRow)
        get_issue_status.then((res: any) => {
            setOpenIssueStatus(false)
            setIssueStatus(res.data)
        })
    }, [idSelectedRow]);
    const GetExecutionStatus = useCallback(() => {
        const get_execution_status = GetExecutionStatusAPI(idSelectedRow)
        get_execution_status.then((res: any) => {
            setOpenExecution(false)
            setExecutionStatus(res.data.executionStatus)
        })
    }, [idSelectedRow]);

    const handleClickIssueStatus = (key: any) => {
        const isOpened = key.includes('1');
        if (isOpened && !openIssueStatus) {
            GetIssueStatus()
            setOpenIssueStatus(true)
        }
        setActiveKeyIssueStatus(key)
    }
    const handleClickExecutionStatus = (key: any) => {
        const isOpened = key.includes('1');
        if (isOpened && !openExecution) {
            GetExecutionStatus()
            setOpenExecution(true)
        }
        setActiveKeyExecutionStatus(key)
    }
    useEffect(() => {
        setActiveKeyIssueStatus([])
        setActiveKeyExecutionStatus([])
        setOpenIssueStatus(false);
        setOpenExecution(false)
    }, [idSelectedRow]);

    const transformData = (data: any) => {
        const transformedData = data?.filter((item: any) => item.issueStatusValue
        );
        return transformedData;
    };
    const checkNoData = issueStatus?.issueStatus?.every((item: any) => item.issueStatusValue == 0)
    const configPie = {
        data: transformData(issueStatus?.issueStatus),
        angleField: 'issueStatusValue',
        colorField: 'issueStatusName',
        radius: 0.9,
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
        statistic: {
            title: false || undefined,
            content: {
                content: checkNoData ? "<img src='http://pinnacle-portal.server2div3.pgtest.co/icons/chart_no_data.svg'/> " : `<div><div>Total</div><div>${issueStatus.total}</div></div>`,
                style: {
                    fontSize: '18px',
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',

                },
            },
        },
    };

    const itemIssueStatus: CollapseProps['items'] = [
        {
            key: '1',
            label: <div className='flex justify-between'>
                <h3 className='font-semibold'>Issue Status</h3>
                <img src="	http://pinnacle-portal.server2div3.pgtest.co/icons/dropdown.svg" alt="" />
            </div>,
            children: <div className='flex justify-evenly items-center w-full'>
                {!openIssueStatus ? <Pie {...configPie} /> : <Spin />}

            </div>
            ,
            showArrow: false
        },
    ];
    const itemExecutionStatus: CollapseProps['items'] = [
        {
            key: '1',
            label: <div className='flex justify-between'>
                <h3 className='font-semibold'>Execution Status</h3>
                <img src="	http://pinnacle-portal.server2div3.pgtest.co/icons/dropdown.svg" alt="" />
            </div>,
            children: <div className='flex justify-evenly items-center w-full'>
                {!openExecution ? <table>
                    <thead className='font-light'>
                        <tr>
                            <th className='font-normal text-xs text-[#9a9ea4] leading-4 text-center p-1'></th>
                            <th className='font-normal text-xs text-[#9a9ea4] leading-4 text-center p-1'>Test Cases</th>
                            <th className='font-normal text-xs text-[#9a9ea4] leading-4 text-center p-1'>Tests</th>
                            <th className='font-normal text-xs text-[#9a9ea4] leading-4 text-center p-1'>Conditions</th>
                            <th className='font-normal text-xs text-[#9a9ea4] leading-4 text-center p-1'>Test Steps</th>
                        </tr>
                    </thead>
                    <tbody className='font-normal text-sm text-[#9a9ea4] leading-4 text-center'>
                        <tr>
                            <td className='p-2'>Not Run :</td>
                            <td className='text-[#6bb2d6]'>{executionStatus?.testCasesToExecute}</td>
                            <td className='text-[#6bb2d6]'>{executionStatus?.testsToExecute}</td>
                            <td className='text-[#6bb2d6]'>{executionStatus?.conditionsNotRun}</td>
                            <td className='text-[#6bb2d6]'>{executionStatus?.testStepsNotRun}</td>
                        </tr>
                        <tr>
                            <td className='p-2'>In Progress :</td>
                            <td className='text-[#6bb2d6]'>{executionStatus?.testCasesInProgress}</td>
                            <td className='text-[#6bb2d6]'>{executionStatus?.testsInProgress}</td>
                            <td className='text-[#6bb2d6]'>{executionStatus?.conditionsInProgress}</td>
                            <td className='text-[#6bb2d6]'>{executionStatus?.testStepsInProgress}</td>
                        </tr>
                        <tr>
                            <td className='p-2'>Failed :</td>
                            <td className='text-[#6bb2d6]'>{executionStatus?.testCasesFailed}</td>
                            <td className='text-[#6bb2d6]'>{executionStatus?.testsFailed}</td>
                            <td className='text-[#6bb2d6]'>{executionStatus?.conditionsFailed}</td>
                            <td className='text-[#6bb2d6]'>{executionStatus?.testStepsFailed}</td>
                        </tr>
                        <tr>
                            <td className='p-2'>Blocked :</td>
                            <td className='text-[#6bb2d6]'>{executionStatus?.testCasesBlocked}</td>
                            <td className='text-[#6bb2d6]'>{executionStatus?.testsBlocked}</td>
                            <td className='text-[#6bb2d6]'>{executionStatus?.conditionsBlocked}</td>
                            <td className='text-[#6bb2d6]'>{executionStatus?.testStepsBlocked}</td>
                        </tr>
                        <tr>
                            <td className='p-2'>Passed :</td>
                            <td className='text-[#6bb2d6]'>{executionStatus?.testCasesPassed}</td>
                            <td className='text-[#6bb2d6]'>{executionStatus?.testsPassed}</td>
                            <td className='text-[#6bb2d6]'>{executionStatus?.conditionsPassed}</td>
                            <td className='text-[#6bb2d6]'>{executionStatus?.testStepsPassed}</td>
                        </tr>
                        <tr>
                            <td className='p-2'>Total :</td>
                            <td className='text-[#6bb2d6]'>{executionStatus?.testCasesTotal}</td>
                            <td className='text-[#6bb2d6]'>{executionStatus?.testsTotal}</td>
                            <td className='text-[#6bb2d6]'>{executionStatus?.conditionsTotal}</td>
                            <td className='text-[#6bb2d6]'>{executionStatus?.testStepsTotal}</td>
                        </tr>
                    </tbody>
                </table> : <Spin />}

            </div>,
            showArrow: false
        },
    ];
    return (
        <Row className='gap-1 flex-nowrap'>
            <Col style={{ width: '50%' }}>
                <Card size="small"
                    bordered={true}
                    className='my-2 p-0'
                    style={{ boxShadow: '0px 3px 5px 0px rgba(0, 0, 0, 0.15)' }}
                >
                    <Collapse activeKey={activeKeyExecutionStatus} onChange={handleClickExecutionStatus} className='bg-white' bordered={false} items={itemExecutionStatus} />
                </Card>
            </Col>
            <Col style={{ width: '50%' }}>
                <Card size="small"
                    bordered={true}
                    className='my-2 p-0'
                    style={{ boxShadow: '0px 3px 5px 0px rgba(0, 0, 0, 0.15)' }}
                >
                    <Collapse activeKey={activeKeyIssueStatus} onChange={handleClickIssueStatus} className='bg-white' bordered={false} items={itemIssueStatus} />
                </Card>
            </Col>
        </Row>
    );
};

export default Status;