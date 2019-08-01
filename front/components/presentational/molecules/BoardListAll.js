import React,{useState, useEffect} from 'react';
import axios from 'axios';
import BoardList from './BoardList';

/**
 * @author 정규현
 * @summary 배너 리스트
 */

const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

const BoardListAll = ()=>{
    const [dataList, setDataList] = useState([]);
    const [orderby, setOrderby] = useState(0);

    const getApiData = () =>{
        axios.get(backUrl,
          {
            params : {
              orderby:orderby,
              start: 0,
              end: 15
            }
          })
        .then((res) => {
          setDataList(res['data']);
        })
        .catch((res)=>{
          setIsLoding(false);
          console.log(res);
        });
      }

    useEffect( ()=>{
        getApiData();
    },[]);

        const result = dataList.map((content)=>{
            <div key={JSON.stringify(content['id'])}>
            <BoardList  seq={JSON.stringify(content['id'])}
                        hashtag={JSON.stringify(content['tags']).replace('"','').replace('"','')}
                        title={JSON.stringify(content['title']).replace('"','').replace('"','')}
                        view_count={JSON.stringify(content['view_count'])}
                        like={JSON.stringify(content['likecount'])}
                        answer={JSON.stringify(content['replycount'])}
                        reputation={JSON.stringify(content['reputation'])}
                        id={JSON.stringify(content['nick_name']).replace('"','').replace('"','')}
                        day={JSON.stringify(content['date_created']).replace('"','').replace('"','')}
                        imagepath={JSON.stringify(content['user_image']).replace('"','').replace('"','')}
                        path="detail"/>  
                <hr style={{marginTop:"5px", marginBottom:"5px"}}/>
                {JSON.stringify(content['id'])}
            </div>
            });
    return (
        <>
        {result}
        </>
    );
}
export default BoardListAll;
 