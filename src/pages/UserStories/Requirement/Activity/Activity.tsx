import React from 'react';
import {Card, Tabs} from 'antd'
import type { TabsProps } from 'antd'
import History from './History';
import ActivityAttachments from './ActivityAttachments';
interface Props{
    idSelectedRow: number|string
}
const Activity:React.FC<Props> = ({idSelectedRow}) => {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `History`,
            children: <History idSelectedRow={idSelectedRow}></History>,
        },
        {
            key: '2',
            label: `Manage Test Case Coverage`,
            children: <History idSelectedRow={idSelectedRow}></History>,
        },
        {
            key: '3',
            label: `Attachments`,
            children: <ActivityAttachments idSelectedRow={idSelectedRow}></ActivityAttachments>,
        },
    ];
    return (
        <Card size="small"
            title="Activity"
            bordered={true}
            style={{ boxShadow: '0px 3px 5px 0px rgba(0, 0, 0, 0.15)' }}
        >
            <Tabs defaultActiveKey="1" items={items} />
        </Card>
    );
};

export default Activity;