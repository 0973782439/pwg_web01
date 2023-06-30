import React, { useCallback, useEffect, useState } from 'react';
import { Row } from 'antd';
import { RequirementRegister } from './RequirementRegister';
import { Requirement } from './Requirement';
import { GetRequirementFolderChartAPI, GetRequirementGridChartAPI } from '../../api/requirement.api';
import { message } from 'antd';

const UserStori = () => {
    const [isView, setIsView] = useState<number>(1)
    const [stateRequirementGridChart, setStateRequirementGridChart] = useState<any>([])
    const [stateRequirementFolderView, setStateRequirementFolderView] = useState<any>([])
    const [idSelectedRow, setIdSelectedRow] = useState<any>(undefined);
    /**
     * Hàm gọi api lấy RequirementGridChart
     */
    const GetRequirementGridChart  = useCallback((id?:number|string) => {
        const json = GetRequirementGridChartAPI();
        json.then((res: any) => {
            setStateRequirementGridChart(res.data.data)
            if(idSelectedRow == undefined){
                setIdSelectedRow(id ? id : res.data.lastestId)
            }
        })
            .catch((error: any) => {
                message.error(error.message)
            })
    }, [])
    /**
     * Hàm gọi api lấy RequirementFolderChart
     */
    const GetRequirementFolderChart  = useCallback((id?:number|string) => {
        const json = GetRequirementFolderChartAPI('');
        json.then((res: any) => {
            setStateRequirementFolderView(res.data.data)
            if(idSelectedRow == undefined){
                setIdSelectedRow(id ? id : res.data.lastestRequirementId)
            }
        })
            .catch((error: any) => {
                message.error(error.message)
            })
    }, [])
    useEffect(() => {
        if (isView == 0) {
            GetRequirementGridChart();
        }
        if (isView == 1) {
            GetRequirementFolderChart()
        }
    }, [isView])
    return (
        <Row className='gap-5 flex-nowrap'>
            <RequirementRegister
                isView={isView}
                stateRequirementGridChart={stateRequirementGridChart}
                stateRequirementFolderView={stateRequirementFolderView}
                idSelectedRow={idSelectedRow}
                setIdSelectedRow={setIdSelectedRow}
                setIsView={setIsView}
            />
            <Requirement
                GetRequirementGridChart={GetRequirementGridChart}
                GetRequirementFolderChart={GetRequirementFolderChart}
                idSelectedRow={idSelectedRow}
            />
        </Row>
    );
};

export default UserStori;