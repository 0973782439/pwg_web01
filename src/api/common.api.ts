import http from "../utils/http";
import { PATH_API } from "../utils/path";

export const GetNewId = (type: number) =>
    http.get(`${PATH_API.get_new_id}?type=${type}`);
