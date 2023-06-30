import { ICreateRequirement } from "../interfaces";
import http from "../utils/http";
import { PATH_API } from "../utils/path";

export const GetRequirementGridChartAPI = () =>
    http.get(PATH_API.get_requirement_grid_chart);
export const GetRequirementFolderChartAPI = (search? :string) =>
    http.get(`${PATH_API.get_requirement_folder_chart}?searchString=${search}`);
export const GetRequirementDetailAPI = (id: any) =>
    http.get(`${PATH_API.get_requirement_detail}?id=${id}`);
export const GetRequirementTypeAPI = () =>
    http.get(PATH_API.get_requirement_type);
export const GetIsoClassificationAPI = () =>
    http.get(PATH_API.get_iso_classification);
export const GetSubClassificationAPI = (value: string) =>
    http.get(`${PATH_API.get_sub_classification}?isoClassificationDescription=${value}`);
export const CreateRequirementAPI = (values:ICreateRequirement) =>
    http.post(PATH_API.create_requirement, values);
export const DeleteRequirementAPI = (values:any) =>
    http.delete(PATH_API.delete_requirement, {data:values});
export const GetMiniDashboardAPI = (idRequirement:any) =>
    http.get(`${PATH_API.get_mini_dashboard}?id=${idRequirement}`);
export const GetIssueStatusAPI = (idRequirement:any) =>
    http.get(`${PATH_API.get_issue_status}?id=${idRequirement}`);
export const GetExecutionStatusAPI = (idRequirement:any) =>
    http.get(`${PATH_API.get_execution_status}?id=${idRequirement}`);
export const GetHistoriesAPI = (idRequirement:any) =>
    http.get(`${PATH_API.get_histories}?id=${idRequirement}`);
export const UpdateRequirementAPI = (obj_update:any) =>
    http.post(PATH_API.update_requirement, obj_update);