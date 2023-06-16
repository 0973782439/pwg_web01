import http from "../utils/http";
import { PATH_API } from "../utils/path";

export const ReleaseAPI = () =>
    http.get(PATH_API.release_dashboard);
export const RequirementAPI = () =>
    http.get(PATH_API.requirement_dashboard);
export const TestCaseAPI = () =>
    http.get(PATH_API.test_case_dashboard);
export const DefectAPI = () =>
    http.get(PATH_API.defect_dashboard);
export const DefectTrendAPI = (defectTrend: number) =>
    http.get(PATH_API.defect_trend_dashboard, {
        params: {
            defectTrend
        }
    });
export const BatchesAPI = () =>
    http.get(PATH_API.batches_dashboard);
export const DailyFrequencyAPI = (fromDate: string, toDate: string, forItem: string) =>
    http.get(PATH_API.batch_test_daily_dashboard, {
        params: {
            fromDate, toDate, forItem
        }
    });
