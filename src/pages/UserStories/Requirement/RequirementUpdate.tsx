import React, { useState } from 'react';
import { Card, Row, Col, Form, Input, Select, message } from 'antd'
import { IIosClassification, IReleasesGanttChart, IRequirementDetail, IRequirementType, ISubClassification, IUser } from '../../../interfaces';
import { Activity, MiniDashboard, Status } from '../Requirement';
import { UpdateRequirementAPI } from '../../../api/requirement.api';
const dayjs = require('dayjs');
require('dayjs/locale/en');
const { TextArea } = Input;
interface Props {
    newId?: number
    user?: IUser
    requirementType?: any
    isoClassification?: any
    businessImportance?: any
    subClassification?: ISubClassification[]
    requirementDetail?: IRequirementDetail
    idSelectedRow: number | string
    GetRequirementGridChart: (id: number|string) => void
    GetRequirementFolderChart: (id: number|string) => void
    GetRequirementDetail: (id: number | string) => void
}
const RequirementUpdate: React.FC<Props> = ({ GetRequirementGridChart,GetRequirementFolderChart, GetRequirementDetail, requirementType, isoClassification, businessImportance, subClassification, requirementDetail, user, newId, idSelectedRow }) => {

    const [dataUpdate, setDataUpdate] = useState<any>()
    
    type ValidReleaseDetailKeys = keyof typeof requirementDetail;

    const handleUpdateRequirement = () => {
        if (dataUpdate != null || dataUpdate != undefined) {
            const update_requirement = UpdateRequirementAPI(dataUpdate)
            update_requirement.then((res: any) => {
                message.success(res.data)
                GetRequirementGridChart(idSelectedRow)
                GetRequirementFolderChart(idSelectedRow)
                GetRequirementDetail(idSelectedRow)
                setDataUpdate(undefined)
            }).catch((error: any) => {
                message.error(error.response.data.message)
            })
        }
    }
    const handleChangeInput = (e: any) => {
        const { name, value } = e.target
        const obj_update = {
            modifiedFields: [{
                fieldName: name,
                newValue: value,
                oldValue: requirementDetail?.[name as ValidReleaseDetailKeys]
            }],
            updateRequirementDto: {
                ...requirementDetail, [name]: value
            }
        }
        setDataUpdate(obj_update)
    }
    const handleChangeSelect = (name: string, value: string) => {
        const obj_update = {
            modifiedFields: [{
                fieldName: name,
                newValue: value,
                oldValue: requirementDetail?.[name as ValidReleaseDetailKeys]
            }],
            updateRequirementDto: {
                ...requirementDetail, [name]: value
            }
        }
        setDataUpdate(obj_update)
    }
    return (
        <>
            {/* Summary */}
            <Card size="small"
                title="Summary"
                bordered={true}
                className='mb-2 relative'
                style={{ boxShadow: '0px 3px 5px 0px rgba(0, 0, 0, 0.15)' }}
            >
                <Row className='justify-between'>
                    <Col className='flex' span={4}>
                        <Form.Item
                            label="Version"
                            className="text-sm font-normal flex-shrink-0"
                            name="requirementVersion"
                        >
                            {requirementDetail
                                ? <Input onChange={handleChangeInput} onBlur={handleUpdateRequirement} name="requirementVersion" className='w-[100px] flex-shrink-1 custom_text_input' />
                                : <Input className='w-[100px] flex-shrink-1 custom_text_input' />
                            }
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            label="Title"
                            className="text-sm font-normal"
                            name="requirementTitle"
                            rules={[{ required: true, message: "A Requirement must have a Title" }]}
                        >
                            {requirementDetail
                                ? <Input onChange={handleChangeInput} onBlur={handleUpdateRequirement} name="requirementTitle" placeholder='Please enter' className='custom_text_input' />
                                : <Input placeholder='Please enter' className='custom_text_input' />
                            }
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item
                            label="Workflow"
                            className="text-sm font-normal"
                            name="requirementWorkflow"
                        >
                            <span className='custom_text_input'>{requirementDetail ? requirementDetail?.requirementWorkflow : "Daft"}</span>
                        </Form.Item>
                    </Col>
                </Row>
                <Row className='justify-between'>
                    <Col span={4}>
                        <Form.Item
                            label="ID"
                            className="text-sm font-normal"
                            name="requirementId"
                        >
                            <span className='custom_text_input'>{requirementDetail ? requirementDetail?.requirementId : newId}</span>
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            label="Type"
                            className="text-sm font-normal"
                            name="requirementType"
                            rules={[{ required: true, message: "A Requirement must have a Type" }]}
                        >
                            {
                                requirementDetail ? <Select
                                    onBlur={handleUpdateRequirement}
                                    onChange={(value) => handleChangeSelect('requirementType', value)}
                                    className='custom_select'
                                    placeholder="Select"
                                    options={requirementType?.requirementType.map((item: IRequirementType) => ({
                                        value: item.requirementTypeId,
                                        label: item.requirementTypeTitle,
                                    }))}
                                /> : <Select
                                    className='custom_select'
                                    placeholder="Select"
                                    options={requirementType?.requirementType.map((item: IRequirementType) => ({
                                        value: item.requirementTypeId,
                                        label: item.requirementTypeTitle,
                                    }))}
                                />
                            }
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item
                            label="Owner "
                            className="text-sm font-normal"
                            name="requirementOwnerName"
                        >
                            <span className='text-[#E67886]'>{requirementDetail ? requirementDetail?.requirementOwnerName : user?.fullname}</span>
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
            <div style={{ height: '61vh', overflowY: 'auto' }}>
                {/* Classification */}
                <Card size="small"
                    title="Classification"
                    bordered={true}
                    style={{ boxShadow: '0px 3px 5px 0px rgba(0, 0, 0, 0.15)' }}
                >
                    <Row className='justify-between'>
                        <Col span={10}>
                            <Form.Item
                                label="IOS Classification"
                                className="text-sm font-normal"
                                name="requirementIsoclassification"
                            >
                                {
                                    requirementDetail ? <Select
                                        onBlur={handleUpdateRequirement}
                                        onChange={(value) => handleChangeSelect('requirementIsoclassification', value)}
                                        className='custom_select'
                                        placeholder="Select"
                                        options={isoClassification?.iosClassification.map((item: IIosClassification) => ({
                                            value: item.isoclassificationId,
                                            label: item.isoclassificationDescription,
                                        }))}
                                    /> : <Select
                                        className='custom_select'
                                        placeholder="Select"
                                        options={isoClassification?.iosClassification.map((item: IIosClassification) => ({
                                            value: item.isoclassificationId,
                                            label: item.isoclassificationDescription,
                                        }))}
                                    />
                                }
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item
                                label="Sub-Classification"
                                className="text-sm font-normal"
                                name="requirementIsosubClassification"
                            >
                                {
                                    requirementDetail ? <Select
                                        onBlur={handleUpdateRequirement}
                                        onChange={(value) => handleChangeSelect('requirementIsosubClassification', value)}
                                        className='custom_select'
                                        placeholder="Select"
                                        options={subClassification?.map((item) => ({
                                            value: item.isoclassificationId,
                                            label: item.isoclassificationDescription,
                                        }))}
                                    /> : <Select
                                        className='custom_select'
                                        placeholder="Select"
                                        options={subClassification?.map((item) => ({
                                            value: item.isoclassificationId,
                                            label: item.isoclassificationDescription,
                                        }))}
                                    />
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
                {/* Requirement Importance */}
                <Card size="small"
                    title="Requirement Importance"
                    bordered={true}
                    className='my-2'
                    style={{ boxShadow: '0px 3px 5px 0px rgba(0, 0, 0, 0.15)' }}
                >
                    <Row className='justify-between'>
                        <Col span={24}>
                            <Form.Item
                                label="Business Importance"
                                className="text-sm font-normal"
                                name="requirementBusinessImportance"
                                rules={[{ required: true, message: "A Requirement must have a Business Importance" }]}
                            >
                                {
                                    requirementDetail ? <Select
                                        onBlur={handleUpdateRequirement}
                                        onChange={(value) => handleChangeSelect('requirementBusinessImportance', value)}
                                        className='custom_select'
                                        placeholder="Select"
                                        options={businessImportance?.releasesGanttChart.map((item: IReleasesGanttChart) => ({
                                            value: item.businessImportanceId,
                                            label: item.businessImportanceDescription,
                                        }))}
                                    /> : <Select
                                        className='custom_select'
                                        placeholder="Select"
                                        options={businessImportance?.releasesGanttChart.map((item: IReleasesGanttChart) => ({
                                            value: item.businessImportanceId,
                                            label: item.businessImportanceDescription,
                                        }))}
                                    />
                                }

                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
                {/* Requirement Detail */}
                <Card size="small"
                    title="Requirement Detail"
                    bordered={true}
                    className='my-2'
                    style={{ boxShadow: '0px 3px 5px 0px rgba(0, 0, 0, 0.15)' }}
                >
                    <Row className='flex flex-row justify-between'>
                        <Col span={24}>
                            <Form.Item
                                label="Description"
                                className="text-sm font-normal custom_label"
                                name="requirementDescription"
                                rules={[{ required: true, message: "A Requirement must include a description" }]}
                            >
                                {requirementDetail
                                    ? <TextArea onChange={handleChangeInput} onBlur={handleUpdateRequirement} name="requirementDescription" className='custom_text_input' style={{ resize: "none" }} rows={4} />
                                    : <TextArea className='custom_text_input' style={{ resize: "none" }} rows={4} />
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className='justify-between'>
                        <Col span={24}>
                            <Form.Item
                                label="Comments"
                                className="text-sm font-normal custom_label"
                                name="requirementComments"
                            >

                                {requirementDetail
                                    ? <TextArea onChange={handleChangeInput} onBlur={handleUpdateRequirement} name="requirementComments" className='custom_text_input' style={{ resize: "none" }} rows={4} />
                                    : <TextArea className='custom_text_input' style={{ resize: "none" }} rows={4} />
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                    {requirementDetail &&
                        <Row className='justify-between'>
                            <Col span={24}>
                                <Form.Item
                                    label="Deprecation"
                                    className="text-sm font-norma custom_label"
                                    name="requirementDeprecatingReason"
                                >
                                    <span className='custom_text_input'>{requirementDetail?.requirementDeprecatingReason}</span>
                                </Form.Item>
                            </Col>
                        </Row>
                    }
                </Card>
                {requirementDetail &&
                    <>
                        {/* Workflow */}
                        <Card size="small"
                            title="Workflow"
                            bordered={true}
                            className='my-2'
                            style={{ boxShadow: '0px 3px 5px 0px rgba(0, 0, 0, 0.15)' }}
                        >
                            <Row className='flex flex-row items-center justify-between'>
                                <Col span={7}>
                                    <Row>
                                        <span>Created:</span>
                                    </Row>
                                    <Row className='justify-between'>
                                        <Col>
                                            <span className='custom_text_input'>{requirementDetail.createdBy}</span>
                                        </Col>
                                        <Col>
                                            <span className='custom_text_input'>{dayjs(requirementDetail.requirementCreatedOn).locale('en').format('DD MMM YYYY')}</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <span>Approved:</span>
                                    </Row>
                                    <Row className='justify-between'>
                                        <Col>
                                            <span className='custom_text_input'>{requirementDetail.approvedBy}</span>
                                        </Col>
                                        <Col>
                                            <span className='custom_text_input'>{requirementDetail.requirementApprovedOn && dayjs(requirementDetail.requirementApprovedOn).locale('en').format('DD MMM YYYY')}</span>
                                        </Col>
                                    </Row>

                                </Col>

                                <Col span={1}>
                                    <div className='workflow__border-right'></div>
                                </Col>

                                <Col span={7}>
                                    <Row>
                                        <span>Assigned:</span>
                                    </Row>
                                    <Row className='justify-between'>
                                        <Col><span className='custom_text_input'>{requirementDetail.assignedTo}</span></Col>
                                        <Col><span className='custom_text_input'>{dayjs(requirementDetail.requirementAssignedOn).locale('en').format('DD MMM YYYY')}</span></Col>
                                    </Row>
                                    <Row>
                                        <span>Deprecated:</span>
                                    </Row>
                                    <Row className='justify-between'>
                                        <Col>
                                            <span className='custom_text_input'>{requirementDetail.deprecatedBy}</span>
                                        </Col>
                                        <Col>
                                            <span className='custom_text_input'>{requirementDetail.requirementDeprecatedOn && dayjs(requirementDetail.requirementDeprecatedOn).locale('en').format('DD MMM YYYY')}</span>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col span={1}>
                                    <div className='workflow__border-right'></div>
                                </Col>

                                <Col span={7}>
                                    <Row>
                                        <span>Modified:</span>
                                    </Row>
                                    <Row className='justify-between'>
                                        <Col>
                                            <span className='custom_text_input'>{requirementDetail.modified}</span>
                                        </Col>
                                        <Col>
                                            <span className='custom_text_input'>{requirementDetail.modifiedOn && dayjs(requirementDetail.modifiedOn).locale('en').format('DD MMM YYYY')}</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                        {/* Mini-Dashboard */}
                        <MiniDashboard idSelectedRow={idSelectedRow}></MiniDashboard>
                        <Status idSelectedRow={idSelectedRow}></Status>
                        <Activity idSelectedRow={idSelectedRow}></Activity>
                    </>
                }

            </div>
        </>
    );
};

export default RequirementUpdate;