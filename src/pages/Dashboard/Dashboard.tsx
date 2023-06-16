import React, { useState } from 'react';
import { Card, Tabs } from 'antd';
import type { TabsProps } from 'antd'
import { Batches, Defects, Releases, Requirement, TestCase } from './Tabs';
const Dashboard = () => {
    const [stateReleases, setStateReleases] = useState<any>([]);
    const [stateRequirement, setStateRequirement] = useState<any>([]);
    const [stateTestCase, setStateTestCase] = useState<any>([]);
    const [stateDefect, setStateDefect] = useState<any>([]);
    const [stateBatches, setStateBatches] = useState<any>([]);
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Releases`,
            children: <Releases stateReleases={stateReleases} setStateReleases={setStateReleases} ></Releases>,
        },
        {
            key: '2',
            label: `Requirements`,
            children: <Requirement stateRequirement={stateRequirement} setStateRequirement={setStateRequirement} ></Requirement>,
        },
        {
            key: '3',
            label: `Test Cases`,
            children: <TestCase stateTestCase={stateTestCase} setStateTestCase={setStateTestCase}></TestCase>,
        },
        {
            key: '4',
            label: `Batches`,
            children: <Batches stateBatches={stateBatches} setStateBatches={setStateBatches}></Batches>,
        },
        {
            key: '5',
            label: `Defects`,
            children: <Defects stateDefect={stateDefect} setStateDefect={setStateDefect}></Defects>,
        },
    ];
    return (
        <Card title="Dashboard" bordered={false} style={{ minHeight: '100%', }}>
            <Tabs defaultActiveKey="1" items={items} />
        </Card>
    );
};

export default Dashboard;