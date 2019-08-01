import React ,{Component}from 'react';
import {BoardAddList} from '../../presentational/molecules/BoardAddList';
import { Pagination } from 'react-bootstrap';

/**
 * 
 * @author 우세림
 * @summary 개발자들 사용자 전체게시글
 * 
 */

const UserArray2=[ 
    {id:"1", title:"첫 번째 질문" ,category:"질의응답" ,like:"3" ,answer:"4" ,view:"12" ,day:"2019-06-19"},
    {id:"2", title:"첫 번째 질문첫 번째 질문" ,category:"질의응답" ,like:"3" ,answer:"4" ,view:"12"  ,day:"2019-06-19"},
    {id:"3", title:"두두두 번째" ,category:"개발자 모집" ,like:"3" ,answer:"4" ,view:"12" ,day:"2019-06-19"},
    {id:"4", title:"가나다라마바사아자" ,category:"프로젝트" ,like:"3" ,answer:"4" ,view:"12" ,day:"2019-06-19"},
    {id:"5", title:"코딩이 적성에 안 맞아요" ,category:"질의응답" ,like:"3" ,answer:"4" ,view:"12"  ,day:"2019-06-19"}
]

const user_write_page ={
    margin: "70px auto",
}

class UserWrite extends Component { 
    render(){
        const UserList= UserArray2.map((user)=>{ 
            return <BoardAddList key={user.id} id={user.id} title={user.title} category={user.category} like={user.like} answer={user.answer} view={user.view} day={user.day}></BoardAddList>
        });


        return (
            <>
                <h5 className="user_add_title">
                    작성한 게시글
                </h5>
                <hr />

                <div className="user_add_list">
                    {UserList}
                </div>
                
                <div style={user_write_page}>
                    <Pagination>
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Ellipsis />

                        <Pagination.Item>{10}</Pagination.Item>
                        <Pagination.Item>{11}</Pagination.Item>
                        <Pagination.Item active>{12}</Pagination.Item>
                        <Pagination.Item>{13}</Pagination.Item>
                        <Pagination.Item disabled>{14}</Pagination.Item>

                        <Pagination.Ellipsis />
                        <Pagination.Item>{20}</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>
                </div>
            </>
        );
    }
}


export default UserWrite;