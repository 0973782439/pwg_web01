import { ILogIn } from "../interfaces/IAuthentication";
import http from "../utils/http";
import { PATH_API } from "../utils/path";

export const Login = (value: ILogIn) =>
    http.post(PATH_API.login, value);
