import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import { GetHistoriesAPI } from '../../../../api/requirement.api';
import { IHistories } from '../../../../interfaces';
const dayjs = require('dayjs');
require('dayjs/locale/en');

interface DataType {
    key: string;
    field: string;
    timestamp: string;
    modifiedBy: string;
    oldValue: string;
    newValue: string;
}
interface Props{
    idSelectedRow?: number
}
const History:React.FC<Props> = ({idSelectedRow}) => {
    const [histories, setHistories] = useState<IHistories[]>([]);
    const GetHistories = useCallback(() => {
        const get_histoties = GetHistoriesAPI(idSelectedRow)
        get_histoties.then((res: any) => {
            const obj_histories = res.data.histories.map((item:any)=>{
                return {...item, timestamp:dayjs(item.timestamp).format('DD/MM/YYYY')}
            })
            console.log(obj_histories)
            // obj_histories.timestamp = dayjs(res.data.histories.timestamp).format('DD/MM/YYYY')
            setHistories(obj_histories)
        })
    }, [idSelectedRow])
    useEffect(()=>{
        GetHistories()
    },[])
    const columns: ColumnsType<DataType> = [
        {
            key: 'field',
            title: 'Field',
            dataIndex: 'field',
            sorter: (a, b) => a.field.length - b.field.length,
            ellipsis: true,
        },
        {
            key: 'timestamp',
            title: 'Timestamp',
            dataIndex: 'timestamp',
            sorter: (a, b) => a.timestamp.length - b.timestamp.length

        },
        {
            key: 'modifiedBy',
            title: 'Modified By',
            dataIndex: 'modifiedBy',
            sorter: {
                compare: (a, b) => a.modifiedBy.length - b.modifiedBy.length,
                multiple: 2,
            },
        },
        {
            key: 'oldValue',
            title: 'Old Value',
            dataIndex: 'oldValue',
            sorter: {
                compare: (a, b) => a.oldValue?.length - b.oldValue?.length,
                multiple: 1,
            },
        },
        {
            key: 'newValue',
            title: 'New Value',
            dataIndex: 'newValue',
            sorter: {
                compare: (a, b) => a.newValue.length - b.newValue.length,
                multiple: 1,
            },
        },
    ];
    return (
        <Row>
            <Col>
                <Table style={{ width: '100%' }} columns={columns} dataSource={histories} pagination={false} />
            </Col>
        </Row>
    );
};

export default History;