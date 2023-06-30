import http from "../utils/http";
import { PATH_API } from "../utils/path";

export const GetReleaseAttachmentAPI = (entityId: any, entityTypes: any) =>
    http.get(`${PATH_API.get_release_attachment}?entityId=${entityId}&entityTypes=${entityTypes}`);
export const GetAttachmentDetailAPI = (attachmentId: any) =>
    http.get(`${PATH_API.get_attachment_detail}?attachmentId=${attachmentId}`);

export const DeleteAttachmentAPI= (attachmentId: any) =>
    http.delete(`${PATH_API.delete_attachment}?attachmentId=${attachmentId}`,{data:attachmentId});
export const CreateUpdateAttachmentAPI = (values: any) =>{
    const formData = new FormData();
    formData.append("AttachmentId", values.AttachmentId);
    formData.append("EntityId", values.EntityId);
    formData.append("Description", values.Description);
    formData.append("EntityType", values.EntityType);
    formData.append("FileType", values.FileType);
    formData.append("FileObject", values.FileObject);
    return http.post(PATH_API.create_update_attachment, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}