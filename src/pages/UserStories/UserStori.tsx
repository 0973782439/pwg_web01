import React, { useEffect, useState } from 'react';
import { Row } from 'antd';
import { RequirementRegister } from './RequirementRegister';
import { Requirement } from './Requirement';
import { GetRequirementGridChartAPI } from '../../api/requirement.api';
import { message } from 'antd';

const UserStori = () => {
    const [isView, setIsView] = useState<number>(0)
    const [stateRequirementGridChart ,setStateRequirementGridChart] = useState<any>([])
    const [idSelectedRow, setIdSelectedRow] = useState<any>();
    const GetRequirementGridChart = () => {
        const json = GetRequirementGridChartAPI();
        json.then((res:any)=> {
            setStateRequirementGridChart(res.data.data)
            setIdSelectedRow(res.data.lastestId)
        })
        .catch((error:any)=> {
            message.error(error.message)
        })
    }
    useEffect(() => {
        if (isView == 0) {
            GetRequirementGridChart();
        }
        if (isView == 1) {
            alert('folder');
        }
    },[isView])
    return (
    <Row className='gap-5 flex-nowrap'>
        <RequirementRegister 
            isView={isView} 
            stateRequirementGridChart={stateRequirementGridChart} 
            idSelectedRow={idSelectedRow} 
            setIdSelectedRow={setIdSelectedRow}
            setIsView={setIsView}
        />
        <Requirement 
            GetRequirementGridChart={GetRequirementGridChart}
            idSelectedRow={idSelectedRow} 
        />
    </Row>
    );
};

export default UserStori;