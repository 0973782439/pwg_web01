import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Collapse, Input, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import { IUserStories, ItemFolderGrid } from '../../../interfaces';
interface IItemCollapse {
    key: number | number;
    label: React.ReactElement
    children: React.ReactElement
}
interface Props {
    itemRender: IItemCollapse[]
    columnItemFolderGrid: ColumnsType<ItemFolderGrid>
    stateRequirementGridChart: any
    handleRowClick: (record: ItemFolderGrid) => void
    rowClassName: any
    idSelectedRow: any
}
const RequirementRegisterGridView: React.FC<Props> = ({ itemRender, columnItemFolderGrid, stateRequirementGridChart, rowClassName, handleRowClick, idSelectedRow }) => {

    const [searchResults, setSearchResults] = useState<IItemCollapse[]>();
    const [activeKey, setActiveKey] = useState<number[]>([]);
    const [keySearch, setKeySearch] = useState<string>();
    useEffect(() => {
        const panelKeys = itemRender && itemRender?.map((item) => item.key);
        setActiveKey(panelKeys);
    }, [itemRender]);
    /**
     * Hàm tìm kiếm
     */
    const searchArray = (array: IUserStories, searchTerm: string) => {
        const folderNameShow = array?.folderGrid?.folderNameShow?.toLowerCase().trim();
        return array?.items?.filter((item: ItemFolderGrid) => {
            const entityId = String(item.entityId).toLowerCase().trim();  
            const title = item.title.toLowerCase().trim();
            const assigneeName = item.assigneeName.toLowerCase().trim();
            const businessImportance = item.businessImportance.toLowerCase().trim();
            const searchLower = searchTerm.toLowerCase().trim();
            return  entityId.includes(searchLower) || title.includes(searchLower) || assigneeName.includes(searchLower) || businessImportance.includes(searchLower) || folderNameShow.includes(searchLower);
        });
    }
    const handleSearchRequirement = (e: any) => {
        const key_search = e.target.value;
        setKeySearch(key_search)
        let dataRederCollapse = Array();
        stateRequirementGridChart.forEach((item: IUserStories, index: number) => {
            const res_search = searchArray(item, key_search);
            if (res_search?.length > 0 || item?.folderGrid?.folderNameShow.toLowerCase().trim().includes(key_search.toLowerCase())) {
                dataRederCollapse.push({
                    key: index,
                    label: <div key={index} className='font-bold text-sm'>{item.folderGrid.folderNameShow}</div>,
                    children: <Table key={index} rowClassName={rowClassName} onRow={(record) => ({
                        onClick: () => handleRowClick(record),
                    })}
                        className='text-xs' showHeader={false} columns={columnItemFolderGrid} dataSource={res_search} pagination={false} />,
                });
            }
        });
        setSearchResults(dataRederCollapse);
    }
    /**
     * Đóng và mở Collapse
     */
    const handleChangeCollapse = (key: any) => {
        setActiveKey((prevKey) => (prevKey == key ? '' : key));
    }

    useEffect(() => {
        handleSearchRequirement({ target: { value: keySearch ? keySearch : "" } })
    }, [idSelectedRow, stateRequirementGridChart])

    return (
        <>
            <Row className='justify-between mb-2'>
                <Col>
                    <Button className='text-white bg-[#002060]'>Path</Button>
                </Col>
                <Col>
                    <Input
                        onChange={(e) => handleSearchRequirement(e)}
                        prefix={<img src='http://pinnacle-portal.server2div3.pgtest.co/image/search-1.svg' />}
                        style={{ width: '235px' }}
                        placeholder='Search'>
                    </Input>
                </Col>
            </Row>

            <Table className='requirement-grid-view__table' columns={columnItemFolderGrid} pagination={false} />
            <Collapse activeKey={activeKey} onChange={handleChangeCollapse} className='collapse_grid_view bg-[#ebebeb]' style={{ overflowY: 'auto', height: '69vh' }} items={searchResults ? searchResults : itemRender} />
        </>
    );
};

export default RequirementRegisterGridView;