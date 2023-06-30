import React, { useCallback, useEffect, useState } from 'react';
import type { CollapseProps } from 'antd';
import { Collapse, Spin } from 'antd';
import {Card, Row, Col, Progress} from 'antd'
import { GetMiniDashboardAPI } from '../../../api/requirement.api';

interface Props{
  idSelectedRow: number|string
}
const MiniDashboard:React.FC<Props> = ({idSelectedRow}) => {

  const [miniDashboard, setMiniDashboard] = useState<any>([]);
  const [activeKey, setActiveKey] = useState([]);
  const [collapseOpened, setCollapseOpened] = useState(false);
  const GetMiniDashboard = useCallback(() => {
    const get_mini_dashboard = GetMiniDashboardAPI(idSelectedRow)
    get_mini_dashboard.then((res:any)=>{
      setCollapseOpened(false)
      setMiniDashboard(res.data.miniDashboard)
    })
  }, [idSelectedRow])
  let items: CollapseProps['items'] = [
    {
      key: '1',
      label: <div className='flex justify-between'>
          <h3 className='font-semibold'>Mini-Dashboard</h3>
          <img src="	http://pinnacle-portal.server2div3.pgtest.co/icons/dropdown.svg" alt="" />
      </div>,
      children: <Row className='justify-between items-center'>
                  <div className='text-center inline-block w-full'>
                    % Test Execution
                  </div>
                  <div className='flex justify-evenly items-center w-full'>
                      {!collapseOpened ? miniDashboard?.map((item: any, index: number) => {
                          return item?.miniDashboardItems?.map((data:any)=>{
                            return (<Row key={data} className='flex-col items-center gap-2'>
                              <Col>
                                  <span className='text-[#abb2b6] text-xs'>{data.name}</span>
                              </Col>
                              <Col>
                                  <Progress
                                      size={62}
                                      type="circle"
                                      percent={100}
                                      strokeColor={data.backColor}
                                      format={() => <span style={{ color: data.backColor }}>{data.value}</span>}
                                  />
                              </Col>
                          </Row>)
                          })
                      }) : <Spin/>}
                  </div>
              </Row>,
        showArrow: false
    },
  ];


  const handleCollapseChange = (keys:any) => {
    const isOpened = keys.includes('1');
    if (isOpened && !collapseOpened) {
      GetMiniDashboard();
      setCollapseOpened(true);
    }
      setActiveKey(keys)
  };
  useEffect(() => {
    setActiveKey([])
    setCollapseOpened(false);
  }, [idSelectedRow]);
    return (
        <Card size="small"
          bordered={true} 
          className='my-2 p-0'
          style={{boxShadow:'0px 3px 5px 0px rgba(0, 0, 0, 0.15)'}}
          >
            <Collapse className='bg-white' bordered={false} activeKey={activeKey} items={items}  onChange={handleCollapseChange}/>
        </Card>
    );
}

export default React.memo(MiniDashboard);