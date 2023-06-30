import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row, Table, Button, Modal, Form, Input, Popconfirm, Image, message } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import { IAttachment } from '../../../../interfaces';
import { CreateUpdateAttachmentAPI, DeleteAttachmentAPI, GetAttachmentDetailAPI, GetReleaseAttachmentAPI } from '../../../../api/attachment';
import { useForm } from "antd/lib/form/Form";
const dayjs = require('dayjs');
require('dayjs/locale/en');
interface DataType {
    key: string;
    attachmentDescription: string
    attachedByName: string
    attachedOn: string
}
interface Props {
    idSelectedRow: number | string
}

const ActivityAttachments: React.FC<Props> = ({ idSelectedRow }) => {
    const [form] = useForm();
    const [loading, setLoading] = useState<boolean>(true)
    const [openModalViewAttachment, setOpenModalViewAttachment] = useState<boolean>(false)
    const [openModalCreateAttachment, setOpenModalCreateAttachment] = useState<boolean>(false)
    const [src, setSrc] = useState<any>()
    const [attachments, setAttachments] = useState<IAttachment[]>([]);
    const [attachmentDetail, setAttachmentDetail] = useState<any>()
    const [idAttachmentDetail, setIdAttachmentDetail] = useState<number>()
    /**
     * Thay đổi file và xem priview
     */
    const handleImageUpload = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Data = reader.result;
            const obj_file = {
                fileName: file.name,
                attachmentDescription: file.name,
                FileType: file.type,
                src: base64Data,
                file: file
            }
            form.setFieldsValue(obj_file)
            setSrc(obj_file);
        };
        reader.readAsDataURL(file);
    };
    /**
     * Hàm gọi api attachment
     */
    const GetAttachments = useCallback(() => {
        setLoading(true)
        const get_attachments = GetReleaseAttachmentAPI(idSelectedRow, 4)
        get_attachments.then((res: any) => {
            const obj_attachments = res.data.attachments.map((item: IAttachment) => {
                return { ...item, attachedOn: dayjs(item.attachedOn).format('DD/MM/YYYY') }
            })
            setAttachments(obj_attachments)
            setLoading(false)
        })
    }, [idSelectedRow])

    useEffect(() => {
        form.resetFields()
        GetAttachments()
    }, [idSelectedRow])
    /**
    * Xem chi tiết attachment và update
    */
    const handleViewAttachment = (record: any) => {
        setOpenModalViewAttachment(true)
        setIdAttachmentDetail(record.attachmentId)
        const json = GetAttachmentDetailAPI(record.attachmentId)
        json.then((res: any) => {
            const res_attachment = res.data.attachment
            setAttachmentDetail(res_attachment)
            form.setFieldsValue(res_attachment)
        }).catch((error: any) => {
        })
    }
    const handleUpdateAttachment = (values: any) => {
        const obj_update = {
            Description: values.attachmentDescription,
            EntityType: 4,
            EntityId: idSelectedRow,
            AttachmentId: idAttachmentDetail,
            FileType: src?.FileType ? src?.FileType : 'jpg',
            FileObject: src?.file,
        }
        const json = CreateUpdateAttachmentAPI(obj_update)
        json.then((res: any) => {
            setOpenModalViewAttachment(false)
            message.success(res.data)
            GetAttachments()
            setSrc(undefined)
        }).catch((error: any) => {
            message.error(error.response.data)
        })
    }
    /**
     * Xác nhận và xoá attchment
     */
    const handleOpenPopconfirmAttachment = (record: any) => {
        setIdAttachmentDetail(record.attachmentId)
    }
    const handleConfirmDeleteAttachment = (e: any) => {
        const json = DeleteAttachmentAPI(idAttachmentDetail)
        json.then((res: any) => {
            message.success(res.data)
            GetAttachments()
        }).catch((error: any) => {
            console.log(error)
            message.error(error.response.data)
        })
    };
    /**
     * Mở modal thêm và thêm attachment
     */
    const handleOpenModalCreateAttachment = () => {
        setOpenModalCreateAttachment(true)
    }
    const handleCreateAttachment = (values:any) => {
        const obj_update = {
            Description: values.attachmentDescription,
            EntityType: 4,
            EntityId: idSelectedRow,
            AttachmentId: 0,
            FileType: src?.FileType,
            FileObject: src?.file,
        }
        const json = CreateUpdateAttachmentAPI(obj_update)
        json.then((res: any) => {
            setOpenModalCreateAttachment(false)
            message.success(res.data)
            GetAttachments()
            setSrc(undefined)
            form.resetFields()
        }).catch((error: any) => {
            setOpenModalCreateAttachment(true)
            message.error(error.response.data)
        })
    }
    const columns: ColumnsType<DataType> = [
        {
            key: 'attachmentDescription',
            title: 'Description',
            dataIndex: 'attachmentDescription',
            sorter: (a, b) => a.attachmentDescription.length - b.attachmentDescription.length,
            ellipsis: true,
        },
        {
            key: 'attachedByName',
            title: 'Attached By',
            dataIndex: 'attachedByName',
            sorter: (a, b) => a.attachedByName.length - b.attachedByName.length
        },
        {
            key: 'attachedOn',
            title: 'Attached On',
            dataIndex: 'attachedOn',
            sorter: {
                compare: (a, b) => a.attachedOn.length - b.attachedOn.length,
                multiple: 2,
            },
        },
        {
            key: 'view',
            title: 'View',
            dataIndex: 'view',
            render: (text, record) => (
                <Button type="primary"
                    onClick={() => handleViewAttachment(record)}
                >
                    <img src="http://pinnacle-portal.server2div3.pgtest.co/icons/eye-view.svg" alt="view_attachmentId" />
                </Button>
            ),
        },
        {
            key: 'remove',
            title: 'Remove',
            dataIndex: 'remove',
            render: (text, record) => (
                <Popconfirm
                    title="Are you sure to delete this attachment "
                    onConfirm={handleConfirmDeleteAttachment}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary"
                        onClick={() => handleOpenPopconfirmAttachment(record)}
                    >
                        <img src="http://pinnacle-portal.server2div3.pgtest.co/image/trash-2.svg" alt="delete_attachmentId" />
                    </Button>
                </Popconfirm>
            ),
        },
    ];
    return (
        <Row className='justify-end gap-2'>
            <Col className='flex flex-row items-center gap-3'>
                <Button onClick={handleOpenModalCreateAttachment} type="primary" className='bg-[#002060] text-white attachment__add__button'>Add new</Button>
            </Col>
            <Col>
                <Table loading={loading} style={{ width: '100%' }} columns={columns} dataSource={attachments} pagination={false} />
            </Col>
            {/* View */}
            <Modal className='requirement-grid-view__modal'
                title={<h1 className='font-semibold text-lg text-[#002060]'>Update Attachment</h1>}
                centered
                open={openModalViewAttachment}
                footer={null}
                onOk={() => setOpenModalViewAttachment(false)}
                onCancel={() => { form.resetFields(); setSrc(undefined); setOpenModalViewAttachment(false) }}
                width={520}
            >
                <Form form={form} onFinish={handleUpdateAttachment}>
                    <Row>
                        {src &&
                            <Col span={24}>
                                <Image loading='lazy'
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    src={src.src}
                                />
                            </Col>
                        }
                        <Col span={24} className='h-10 bg-[#ededed] rounded-lg my-5 text-[#5daad6] px-3' style={{ border: '1px solid #5daad6' }}>
                            <a href={attachmentDetail?.fileObjectUrl} target='_blank' className='flex h-full justify-between items-center'>
                                <div>{src ? src.attachmentDescription : attachmentDetail?.fileName}</div>
                                <span>
                                    <svg viewBox="64 64 896 896" focusable="false" data-icon="download" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M505.7 661a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path></svg>
                                </span>
                            </a>
                        </Col>
                        <Col span={24} className='h-10 bg-[#002060] rounded-lg mb-8 text-white' style={{ border: '1px solid #5daad6' }}>
                            <label className='flex h-full justify-center items-center gap-1 cursor-pointer z-0'>
                                <Input onChange={handleImageUpload} name="fileObjectUrl" className='w-full h-10 cursor-pointer' style={{ display: 'none' }} type="file" />
                                <span>
                                    <svg viewBox="64 64 896 896" focusable="false" data-icon="upload" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path></svg>
                                </span>
                                <span>Upload</span>
                            </label>
                        </Col>
                    </Row>
                    <Form.Item name='attachmentDescription'>
                        <Input className='h-10 text-[#8c8c8c] font-semibold text-base' />
                    </Form.Item>
                    <div className='flex justify-end'>
                        <Button onClick={() => { form.resetFields(); setSrc(undefined); setOpenModalViewAttachment(false) }}>Cancel</Button>
                        <Button className='bg-[#002060] text-white' htmlType="submit">Update</Button>
                    </div>
                </Form>
            </Modal>
            {/* Add new */}
            <Modal className='requirement-grid-view__modal'
                title={<h1 className='font-semibold text-lg text-[#002060]'>Add Attachment</h1>}
                centered
                open={openModalCreateAttachment}
                footer={null}
                onOk={() => setOpenModalCreateAttachment(false)}
                onCancel={() => { form.resetFields(); setSrc(undefined); setOpenModalCreateAttachment(false) }}
                width={520}
            >
                <Form form={form} onFinish={handleCreateAttachment}>
                    <Row>
                        {src &&
                            <>
                                <Col span={24}>
                                    <Image
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        src={src.src}
                                    />
                                </Col>
                                <Col span={24} className='flex items-center h-10 bg-[#ededed] rounded-lg my-5 text-[#5daad6] px-3' style={{ border: '1px solid #5daad6' }}>
                                    <span>{src?.fileName}</span>
                                </Col>
                            </>
                        }
                        <Col span={24} className='h-10 bg-[#002060] rounded-lg mb-8 text-white' style={{ border: '1px solid #5daad6' }}>
                            <label className='flex h-full justify-center items-center gap-1 cursor-pointer z-0'>              
                                <Input onChange={handleImageUpload} name="fileObjectUrl" className='w-full h-10 cursor-pointer' style={{ display: 'none' }} type="file" />
                                <span>
                                    <svg viewBox="64 64 896 896" focusable="false" data-icon="upload" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path></svg>
                                </span>
                                <span>Upload</span>
                            </label>
                        </Col>
                    </Row>
                    <Form.Item name='attachmentDescription'>
                        <Input className='h-10 text-[#8c8c8c] font-semibold text-base' />
                    </Form.Item>
                    <div className='flex justify-end'>
                        <Button onClick={() => { form.resetFields(); setSrc(undefined); setOpenModalCreateAttachment(false) }}>Cancel</Button>
                        <Button className='bg-[#002060] text-white' htmlType="submit">Add</Button>
                    </div>
                </Form>
            </Modal>

        </Row>
    );
};

export default ActivityAttachments;