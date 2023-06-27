import { useState, useEffect } from "react";
import http from "../utils/http";

const useFetchSelect = (func: any) => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = () => {
      try {
        const json = func;
        json.then((res: any) => {
          setData(res.data);
        });
      } catch (error) {}
    };
    fetchData();
  }, []);
  return [data, setData];
};

export default useFetchSelect;
