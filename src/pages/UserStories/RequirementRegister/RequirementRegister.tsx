import React from 'react';
import { Card, Col, Table, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import './RequirementRegister.scss'
import { IUserStories, ItemFolderGrid } from '../../../interfaces';
import { RequirementRegisterGridView, RequirementRegisterFolderView } from '../RequirementRegister';
interface Props {
    idSelectedRow?: number | string
    setIdSelectedRow?: any
    stateRequirementGridChart?: any
    isView?: number
    setIsView?: any
}
const RequirementRegister: React.FC<Props> = ({ idSelectedRow, setIdSelectedRow, stateRequirementGridChart, isView, setIsView }) => {

    const columnItemFolderGrid: ColumnsType<ItemFolderGrid> = [
        {
            title: 'ID',
            dataIndex: 'entityId',
            key: 'entityId',
            sorter: (a, b) => a.entityId.length - b.entityId.length,
            ellipsis: true,
            width: "70px"
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.length - b.title.length,
            ellipsis: true,
        },
        {
            title: 'Business Importance',
            dataIndex: 'businessImportance',
            key: 'businessImportance',
            sorter: (a, b) => a.businessImportance.length - b.businessImportance.length,
            ellipsis: true,
        },
        {
            title: 'Assignee',
            dataIndex: 'assigneeName',
            key: 'assigneeName',
            sorter: (a, b) => a.assigneeName.length - b.assigneeName.length,
            ellipsis: true,
        },
    ];
    /**
     * Hàm xử lý khi click vào 1 record
     */
    const handleRowClick = (record: ItemFolderGrid) => {
        setIdSelectedRow(record.entityId)
    };
    const rowClassName = (record: ItemFolderGrid) => {
        return record.entityId === idSelectedRow ? 'selected-row' : '';
    };
    /**
     * Mảng để render dữ liệu ra Collapse
     */
    const itemRender = stateRequirementGridChart?.map((item: IUserStories, index: number) => {
        const dataRenderTable = item?.items?.map((data: ItemFolderGrid) => {
            return {
                entityId: data.entityId,
                title: data.title,
                businessImportance: data.businessImportance,
                assigneeName: data.assigneeName,
            }
        })
        return {
            key: index,
            label: <div className='font-bold text-sm'>{item.folderGrid.folderNameShow}</div>,
            children: <Table rowClassName={rowClassName} onRow={(record) => ({
                onClick: () => handleRowClick(record),
            })} className='text-xs' showHeader={false} columns={columnItemFolderGrid} dataSource={dataRenderTable} pagination={false} />,
        }
    })
    /**
     * Hàm xử lý thay đổi View requiment register
     */
    const handleChangeRequirementView = (value: number) => {
        setIsView(value)
    }

    return (
        <Col className='flex-shrink' span={12}>
            <Card
                title="Requirement Register"
                bordered={false}
                extra={
                    <Select
                        onChange={handleChangeRequirementView}
                        defaultValue={0}
                        style={{ width: 120 }}
                        options={[
                            { value: 0, label: 'Grid View' },
                            { value: 1, label: 'Folder View' },
                        ]}
                    />
                }
                style={{ minHeight: '100%', }}
            >
                {
                    isView === 0 ? <RequirementRegisterGridView
                        rowClassName={rowClassName}
                        handleRowClick={handleRowClick}
                        itemRender={itemRender}
                        columnItemFolderGrid={columnItemFolderGrid}
                        stateRequirementGridChart={stateRequirementGridChart} />
                        : <RequirementRegisterFolderView />
                }
            </Card>
        </Col>
    );
};

export default RequirementRegister;