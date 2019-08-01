import React,{useState,useCallback,useEffect} from 'react';
import Link from 'next/link';
import Pagination from "react-js-pagination";
/**
 * @author 신선하 
 * @summary 페이지네이션
 * @see 정규현 리펙토링, 실제 기능 추가 
 * @props startPageBlock, currentPage, totalPage, endPageBlock
 */

const Page = (props) => {
  const [activePage, setActivPage] = useState(1);
  const [totalListCount, setTotalListCount] = useState(1);
  
  useEffect(()=>{
    setTotalListCount(props.totalListCount);
    setActivPage(props.currentPage);
  },[props.currentPage,props.totalListCount]);
  
  return (
    <>
      <div>
      <Pagination
                activePage={activePage}
                itemsCountPerPage={15}
                totalItemsCount={totalListCount-1}
                pageRangeDisplayed={5}
                onChange={props.handlePageChange}
              />
      </div>

    </>
  );
};


export const PageTwo = (props) => {
  const [activePage, setActivPage] = useState(1);
  const [totalListCount, setTotalListCount] = useState(1);
  
  useEffect(()=>{
    setTotalListCount(props.totalListCount);
    setActivPage(props.currentPage);
  },[props.currentPage,props.totalListCount]);
  
  return (
    <>
      <div>
      <Pagination
                activePage={activePage}
                itemsCountPerPage={15}
                totalItemsCount={totalListCount-1}
                pageRangeDisplayed={5}
                onChange={props.handlePageChange}
              />
      </div>

    
    </>
  );
};
export default Page;