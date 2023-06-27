import http from "../utils/http";
import { PATH_API } from "../utils/path";

export const BusinessImportanceAPI = () =>
    http.get(PATH_API.business_importance);