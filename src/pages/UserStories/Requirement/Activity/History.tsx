import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row, Table, Input } from 'antd'
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
interface Props {
    idSelectedRow: number|string
}
const columns: ColumnsType<DataType> = [
    {
        key: 'field',
        title: 'Field',
        dataIndex: 'field',
        sorter: {
            compare: (a, b) => a.field.localeCompare(b.field) - b.field.localeCompare(a.field),
            multiple: 2,
        },
        ellipsis: true,
    },
    {
        key: 'timestamp',
        title: 'Timestamp',
        dataIndex: 'timestamp',
        sorter: (a, b) => dayjs(a.timestamp).unix() - dayjs(b.timestamp).unix()
    },
    {
        key: 'modifiedBy',
        title: 'Modified By',
        dataIndex: 'modifiedBy',
        sorter: {
            compare: (a, b) => a.modifiedBy.localeCompare(b.modifiedBy) - b.modifiedBy.localeCompare(a.modifiedBy),
            multiple: 2,
        },
    },
    {
        key: 'oldValue',
        title: 'Old Value',
        dataIndex: 'oldValue',
        sorter: {
            compare: (a, b) => a.oldValue?.localeCompare(b.oldValue) - b.oldValue?.localeCompare(a.oldValue),
            multiple: 1,
        },
    },
    {
        key: 'newValue',
        title: 'New Value',
        dataIndex: 'newValue',
        sorter: {
            compare: (a, b) => a.newValue.localeCompare(b.newValue) - b.newValue.localeCompare(a.newValue),
            multiple: 1,
        },
    },
];
const History: React.FC<Props> = ({ idSelectedRow }) => {

    const [histories, setHistories] = useState<IHistories[]>([]);
    const [searchResults, setSearchResults] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)

    /**
     * Gọi api histories
     */

    const GetHistories = useCallback(() => {
        setLoading(true)
        const get_histoties = GetHistoriesAPI(idSelectedRow)
        get_histoties.then((res: any) => {
            const obj_histories = res.data.histories.map((item: any) => {
                return { ...item, timestamp: dayjs(item.timestamp).format('DD/MM/YYYY') }
            })
            setHistories(obj_histories)
            setLoading(false)
        })
    }, [idSelectedRow])

    useEffect(() => {
        GetHistories()
    }, [idSelectedRow])

    /**
     * Hàm tìm kiếm histories
     */

    const handleSearchHistories = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key_search = e.target.value.toLowerCase().trim();
        const result = histories?.filter((item:IHistories)=>{
            const field_new = item.field?.toLowerCase().trim();
            const timestamp = item.timestamp?.toLowerCase().trim();
            const oldValue = item.oldValue?.toLowerCase().trim();
            const newValue = item.newValue?.toLowerCase().trim();
            const modifiedBy = item.modifiedBy?.toLowerCase().trim();
            return field_new?.includes(key_search) || modifiedBy?.includes(key_search) || timestamp?.includes(key_search) || oldValue?.includes(key_search) || newValue?.includes(key_search)
        })
        setSearchResults(result)
    }

    /**
     * Hàm reload histories
     */

    const handleReloadHistories  = () => {
        GetHistories()
        setSearchResults(undefined)
    }

    return (
        <Row className='justify-end gap-2'>
            <Col className='flex flex-row items-center gap-3'>
                <img onClick={handleReloadHistories} className='h-6 cursor-pointer' src="http://pinnacle-portal.server2div3.pgtest.co/icons/reload.svg" alt="" />
                <Input
                    onChange={(e) => handleSearchHistories(e)}
                    prefix={<img src='http://pinnacle-portal.server2div3.pgtest.co/image/search-1.svg' />}
                    style={{ width: '200px' }}
                    placeholder='Search'>
                </Input>
            </Col>
            <Col>
                <Table loading={loading} style={{ width: '100%' }} columns={columns} dataSource={searchResults ? searchResults : histories} pagination={false} />
            </Col>
        </Row>
    );
};

export default History;