import React, { useEffect, useState } from 'react';
import { Card, Col, Modal, Form, message, Button, Input} from 'antd';
import { useForm } from "antd/lib/form/Form";
import "./Requirement.scss"
import { RequirementUpdate } from '../Requirement';
import { CreateRequirementAPI, DeleteRequirementAPI, GetIsoClassificationAPI, GetRequirementDetailAPI, GetRequirementTypeAPI, GetSubClassificationAPI } from '../../../api/requirement.api';
import { BusinessImportanceAPI } from '../../../api/business.api';
import { IRequirementDetail, ISubClassification, IUser } from '../../../interfaces';
import { getInfoUserLocal } from '../../../utils/token';
import { GetNewId } from '../../../api/common.api';
interface Props{
    GetRequirementGridChart: () => void
    GetRequirementFolderChart: () => void
    idSelectedRow: number|string
}

const Requirement:React.FC<Props> = ({idSelectedRow, GetRequirementGridChart, GetRequirementFolderChart}) => {
    const [form] = useForm();
    const [formAdd] = useForm();
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    // state render select
    const [requirementType, setRequirementType ] = useState<any>()
    const [businessImportance, setBusinessImportance ] = useState<any>()
    const [isoClassification, setIsoClassification ] = useState<any>()
    const [subClassification, setSubClassification]= useState<ISubClassification[]>()
    // data requirement để render Update
    const [requirementDetail, setRequirementDetail] = useState<IRequirementDetail>()
    // 
    const [user, setUser] = useState<IUser>()
    //
    const [newId, setNewId] = useState<number>()
    /**
     * Hàm thêm 1 requirement
     */
    const handleCreateRequirement = (value: any) => {
        const requirementId_new = newId && newId + 1;
        const requirementWorkflow_new = "Daft";
        const requirementOwnerName_new = user?.userId;
        const requirement_new = {...value, requirementId: requirementId_new, requirementWorkflow: requirementWorkflow_new, requirementOwnerName: requirementOwnerName_new};
        const create_requirement = CreateRequirementAPI(requirement_new);
        create_requirement.then((res:any)=>{
            message.success(res.data.message)
            GetRequirementGridChart()
            setOpenModalCreate(false)
        }).catch((error:any)=>{
            message.error(error)
        })
    }
    /**
     * Hàm xoá 1 requirement
     */
    const handleDeleteRequirement = (value: any) => {
        const requirementId = idSelectedRow
        const obj_delete_requirement = {...value, entityId: requirementId}
            
        const delete_requirement = DeleteRequirementAPI(obj_delete_requirement)
        delete_requirement.then((res:any)=>{
            message.success(res.data)
            GetRequirementGridChart()
            form.resetFields()
            setOpenModalDelete(false)
        }).catch((error:any)=>{
            message.error(error)
        })
    }
    /**
     * Hàm gọi api lấy ra để requirement để Update
     */
    const GetRequirementDetail= (id:number | string) => {
        const json = GetRequirementDetailAPI(id);
        json.then((res:any)=> {
            const requirement_detail = res.data.requirementDetail
            requirement_detail.requirementIsoclassification = Number(requirement_detail.requirementIsoclassification)
            requirement_detail.requirementIsosubClassification = Number(requirement_detail.requirementIsosubClassification)
            form.setFieldsValue(requirement_detail);
            if(requirement_detail.requirementIsoclassification != 0){
                GetSubClassification(requirement_detail.requirementIsoclassificationStr)
            }
            setRequirementDetail(requirement_detail)
        })
        .catch((error:any)=> {
            message.error(error.message)
        })
    }
    /**
     * Hàm gọi api lấy ra để select của các option 
     */
    const GetSubClassification = (value: string) => {
        const json = GetSubClassificationAPI(value);
        json.then((res:any)=> {
            setSubClassification(res.data.subClassification)
        })
        .catch((error:any)=> {
            message.error(error.message)
        })
    }
    const GetRequirementType = () => {
        const json = GetRequirementTypeAPI();
        json.then((res:any)=> {
            setRequirementType(res.data)
        })
        .catch((error:any)=> {
            message.error(error.message)
        })
    }
    const GetBusinessImportance = () => {
        const json = BusinessImportanceAPI();
        json.then((res:any)=> {
            setBusinessImportance(res.data)
        })
        .catch((error:any)=> {
            message.error(error.message)
        })
    }
    const GetIsoClassification = () => {
        const json = GetIsoClassificationAPI();
        json.then((res:any)=> {
            setIsoClassification(res.data)
        })
        .catch((error:any)=> {
            message.error(error.message)
        })
    }
    /**
     * Chọn 1 requirement khác thì render lại
     */
    useEffect(() => {
        if(idSelectedRow){
            GetRequirementDetail(idSelectedRow)
        }
    },[idSelectedRow])
    /**
     * lấy ra user trên local storage và render select option
     */
    useEffect(() => {
        GetIsoClassification()
        GetBusinessImportance()
        GetRequirementType()
        const user = getInfoUserLocal()
        const obj_user = JSON.parse(user);
        setUser(obj_user)
    },[])
    /**
     * Mở modal thêm requirement
     */
    const handleOpenModalRequirement = () =>{
        setOpenModalCreate(true)
        formAdd.resetFields()
        const get_new_id_requirement = GetNewId(4)
        get_new_id_requirement.then((res:any)=>{
            setNewId(res.data.newId)
        }).catch((error:any)=>{
        })
    }
    return (
        <Col className='flex-shrink' span={12}>
            <Form form={form} 
            >
                <Card
                    title="Requirement"
                    bordered={false} 
                    style={{ minHeight: '100%'}}
                    extra={
                        <div className='flex items-center justify-center gap-5'>
                            <button type='button' onClick={() => handleOpenModalRequirement()}>
                                <img src="http://pinnacle-portal.server2div3.pgtest.co/image/plus-circle.svg" alt="" />
                            </button>
                            <button onClick={()=>setOpenModalDelete(true)} type='button'>
                                <img src="http://pinnacle-portal.server2div3.pgtest.co/image/trash-extra-card.svg" alt="" />
                            </button>
                        </div>
                    }
                >
                    <RequirementUpdate 
                        GetRequirementDetail={GetRequirementDetail}
                        GetRequirementGridChart={GetRequirementGridChart}
                        GetRequirementFolderChart={GetRequirementFolderChart}
                        idSelectedRow= {idSelectedRow}
                        requirementDetail={requirementDetail}
                        subClassification={subClassification}
                        requirementType={requirementType} 
                        isoClassification={isoClassification} 
                        businessImportance={businessImportance}
                    />
                </Card>
                {/* Create */}
                <Modal className='requirement-grid-view__modal'
                    title={<div className='font-semibold text-lg text-[#002060]'>Create new requirement</div>}
                    centered
                    open={openModalCreate}
                    footer={null}
                    onOk={() => setOpenModalCreate(false)}
                    onCancel={() => setOpenModalCreate(false)}
                    width={785}
                >
                    <Form form={formAdd} onFinish={handleCreateRequirement}>
                        <RequirementUpdate
                            idSelectedRow= {idSelectedRow}
                            GetRequirementDetail={GetRequirementDetail}
                            GetRequirementGridChart={GetRequirementGridChart}
                            GetRequirementFolderChart={GetRequirementFolderChart}
                            user={user}
                            newId={newId}
                            subClassification={subClassification}
                            requirementType={requirementType} 
                            isoClassification={isoClassification} 
                            businessImportance={businessImportance}
                        />
                        <div className='flex justify-end gap-2 mt-2'>
                            <Button onClick={()=>setOpenModalCreate(false)}>Cancel</Button>
                            <Button className='bg-[#002060] text-white' htmlType="submit">Create</Button>
                        </div>
                    </Form>
                </Modal>
                {/* Delete */}
                <Modal className='requirement-grid-view__modal'
                    title={<>
                        <h1 className='font-semibold text-lg text-[#002060] text-center'>Delete Requirement</h1>
                        <p className='text-center text-sm'>Please Enter the Reason for Deleting the Requirement</p>
                    </>}
                    centered
                    open={openModalDelete}
                    footer={null}
                    onOk={() => setOpenModalDelete(false)}
                    onCancel={() => setOpenModalDelete(false)}
                    width={520}
                >
                    <Form form={form} onFinish={handleDeleteRequirement}>
                        <Form.Item name='deleteReason'>
                            <Input />
                        </Form.Item>
                        <div className='flex justify-end'>
                            <Button onClick={()=>{form.resetFields();setOpenModalDelete(false)}}>Cancel</Button>
                            <Button className='bg-[#002060] text-white' htmlType="submit">Ok</Button>
                        </div>
                    </Form>
                </Modal>
            </Form>
        </Col>
    );
};

export default Requirement;