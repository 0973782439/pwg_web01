import React, { useEffect } from 'react';
import { Col, Row, Progress } from 'antd';
import { Pie } from '@ant-design/plots';
import { ReleaseAPI } from '../../../api/dashboard.api';
import { IResponseDashBoard } from '../../../interfaces';
interface Props {
    stateReleases: any
    setStateReleases: any
}
const Releases: React.FC<Props> = ({ stateReleases, setStateReleases }) => {
    useEffect(() => {
        const json = ReleaseAPI()
        json.then((res: any) => {
            setStateReleases(res.data)
        }).catch((error: any) => {
        })
    }, [])
    const data_ReleaseWorkflow = stateReleases?.releaseWorkflow?.workflowItems || [];
    const colorPalette = data_ReleaseWorkflow?.map((item: IResponseDashBoard) => item.backColor);
    const configPie = {
        appendPadding: 10,
        data: data_ReleaseWorkflow,
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

    return (
        <Row className='gap-4 flex-nowrap'>
            <Col style={{ boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.05)', padding: '12px', border: '1px solid #f0f0f0' }} span={14}>
                <div style={{ width: '100%', }}>
                    <div>Release Workflow</div>
                    <Pie {...configPie} />
                </div>
            </Col>
            <Col style={{ boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.05)', padding: '12px', border: '1px solid #f0f0f0' }} span={10}>
                <div className='mb-[35px] w-full'>
                    <div className='mb-[35px]'>Custom Release</div>

                    <div className='ml-[50px]'>
                        {stateReleases?.releaseCustom?.map((item: IResponseDashBoard, index: number) => {
                            return (<Row key={index} className='mb-[45px] items-center gap-8'>
                                <Col>
                                    <Progress
                                        size={62}
                                        type="circle"
                                        percent={item.value == 0 ? 0 : 100}
                                        strokeColor={item.backColor}
                                        format={() => <span style={{ color: item.backColor }}>{item.value}</span>}
                                    />
                                </Col>
                                <Col>
                                    <span style={{ color: item.backColor }}>{item.text}</span>
                                </Col>
                            </Row>)
                        })}
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default Releases;