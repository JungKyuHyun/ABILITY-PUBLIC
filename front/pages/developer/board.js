import React ,{Component,useState,useCallback} from 'react';
import ListgropBootUser from '../../components/presentational/atoms/ListgroupBootUser';
import Tab from 'react-bootstrap/Tab';
import axios from 'axios'; 
import TitleComponent from '../../components/presentational/atoms/TitleComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import LodingComponent from '../../components/presentational/atoms/LodingComponent';
import Page from '../../components/presentational/molecules/Page';
import swal from 'sweetalert'; 
import { Row } from 'react-bootstrap';
import UserCard from '../../components/presentational/molecules/UserCard';

const EndPoint = process.env.NODE_ENV === 'production'? "?" : "?";

const sortbar = {
    width :"295px",
    textAlign:"center"
}
const contentsize ={
    height : "auto"
}

const wrapper = {
  display: "grid",
  gridTemplateColumns: "24% 24% 24% 24%",
  gridGap: "30px 15px",
  marginTop: "20px"
}

export class PostListJson extends Component{
    constructor(props){
        super(props);

        this.state = {
            userlist : [],
            currentPage : 1,
            totalListCount : 0,
            word: ''
        };
        this.getlist = this.getlist.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
    }   
    async componentDidMount() {
           await this.getlist();
    }
    componentDidUpdate() {
      window.scrollTo(0,0);
    }
     getlist(){
            axios.get(this.props.path,{
                params : {
                    currentpage : this.state.currentPage,
                    word: this.state.word!=0?word:""
                }
            }).then((response) => {
            this.setState({
            userlist : response.data.postBoardList,
            totalListCount : response.data.totalListCount
            });
        });
    }

    onChangePage(pageNumber){
        this.setState({
            currentPage : pageNumber
        },()=> this.getlist());
    }

          render(){
          let userlist = this.state.userlist;


          function textLengthOverCut(txt, len, lastTxt) {
            if (txt.length > len) {
                txt = txt.substr(0, len) + lastTxt;
            }
            return txt;
          }

          function tagcomma(tag){
            let minTags = "";
            let tags ="";

            if(tag){
              tags= tag.toString().split(',');
              for (let i = 0; i < 5; i++) {
                if (!tags[i + 1] || i === 4) {
                  minTags += tags[i] + " "
                  break;
                } else {
                  minTags += tags[i] + ", ";
                }
              }
            } else{
              minTags ="태그가 없습니다.";
            }
            return minTags;
          }

          function addcomma(num) {
            if(num.toString().length <= 3){
                return num;
            }
            num = num.toString(); 
            let count = Math.floor((num.length-1)/3);
            let result = "";
            for(var i=0; i<count; i++){
                let length = num.length;
                let strCut = num.substr(length-3, length);
 
                num = num.slice(0, length-3);
                result = ","+strCut + result;
            }
            result = num + result;
            return result;
        }

          return(
              <>
            
              <div style={wrapper} id="list1" >
              {userlist.length > 0 
                  ? userlist.map(user=>( 
                        <UserCard key={user.userid} 
                        userid={user.userid} 
                        userImage={user.user_image} 
                        name={user.nick_name?user.nick_name:"닉네임이 없습니다."} 
                        area={user.area?textLengthOverCut(user.area,13,'...'):"주소가 없습니다."} 
                        reputation={addcomma(user.reputation)} 
                        tags={user.tags?textLengthOverCut(tagcomma(user.tags),18,"..."):"태그가 없습니다."} 
                        path = "/developer/page/" />
                      
                  )) 
                  :                     
                  <>
                      {!this.state.loading && <LodingComponent/>}
                      <h6> </h6>
                  </>
              } </div>
              <Row style={{marginTop:"3rem",justifyContent:"center"}}>
                  <div style={{textAlign:"center"}}>
                      <Page totalListCount={this.state.totalListCount} currentPage={this.state.currentPage} handlePageChange={this.onChangePage}/>
                  </div>
              </Row>
              </>
          );
    }             
}



const Board = () => {
    const [isvalue,setIsvalue] = useState("");
    const [isdata,setIsdata] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    let changeValue = useCallback((e)=> {
        setIsvalue(e.target.value);
    },[isvalue]);

    const handlePageChange= useCallback((pageNumber)=> {
        setCurrentPage(pageNumber);
      },[currentPage]);

    const inputValue = useCallback(()=>{
        if(isvalue === "" || isvalue.includes("  ") ){
            swal({
                text: "검색 내용이 없습니다.",
                title: "검색 실패",
                timer: "3000",
                icon: "/static/image/Logo2.png"
             });
        }else{
            setIsdata([]);
            setLoading(true);
                axios.get(EndPoint, {
                  params: { 
                    currentPage : 1,
                    dropdown: document.getElementById("dropdown-basic").textContent,
                    content: isvalue
                  }
                  }).then((response)=> {
                      setLoading(false);       
                      setIsdata(response.data.postBoardList);
                  }).catch((xhr) => {
                      console.log("실패 : ",xhr);
                    });
                  }

                  
              },[isdata,isvalue,loading]);

              function textLengthOverCut(txt, len, lastTxt) {
                if (txt.length > len) {
                    txt = txt.substr(0, len) + lastTxt;
                }
                return txt;
              }
    
              function tagcomma(tag){
                let minTags = "";
                let tags ="";
    
                if(tag){
                  tags= tag.toString().split(',');
                  for (let i = 0; i < 5; i++) {
                    if (!tags[i + 1] || i === 4) {
                      minTags += tags[i] + " "
                      break;
                    } else {
                      minTags += tags[i] + ", ";
                    }
                  }
                } else{
                  minTags ="태그가 없습니다.";
                }
                return minTags;
              }
    
              function addcomma(num) {
                if(num.toString().length <= 3){
                    return num;
                }
                num = num.toString(); 
                let count = Math.floor((num.length-1)/3);
                let result = "";
                for(var i=0; i<count; i++){
                    let length = num.length;
                    let strCut = num.substr(length-3, length);
     
                    num = num.slice(0, length-3);
                    result = ","+strCut + result;
                }
                result = num + result;
                return result;
            }

      return (
      <>
      
       <TitleComponent title="개발자들">
          <FontAwesomeIcon icon={faUsers} style={{width:"35px",height:"auto"}}/>
        </TitleComponent>
            <ListgropBootUser style={sortbar} inputId="search" list1="능력치순" list2="신규순" list3="이름순" 
                    onChange={changeValue} onClick={inputValue} placeholder="검색 내용" >
                    <Tab.Content style={contentsize} >
                        <Tab.Pane eventKey="#link1" >
                            <PostListJson path={EndPoint+"/0"}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#link2" >
                            <PostListJson path={EndPoint+"/1"}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#link3">
                            <PostListJson path={EndPoint+"/2"}/> 
                        </Tab.Pane>
                        <Tab.Pane eventKey="#search"> 
                          
                        <div style={wrapper} id="list2">
                          {isdata.length > 0 ?
                               isdata.map(user=>{
                                return(
                                  <UserCard key={user.userid} 
                                            userid={user.userid} 
                                            userImage={user.user_image} 
                                            name={user.nick_name?user.nick_name:"닉네임이 없습니다."} 
                                            area={user.area?textLengthOverCut(user.area,13,'...'):"주소가 없습니다."} 
                                            reputation={addcomma(user.reputation)} 
                                            tags={user.tags?textLengthOverCut(tagcomma(user.tags),18,"..."):"태그가 없습니다."} 
                                            path = "/developer/page/" />
                                  )
                                }) 
                              : <div style={{margin: "20% 165%", width: "100%"}}>검색 결과가 없습니다.</div>   
                          }
                        </div>
                        
                        </Tab.Pane>
                    </Tab.Content>
                </ListgropBootUser>
        </>
    )
}


export default Board;