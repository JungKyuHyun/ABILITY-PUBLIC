import React, {Component} from 'react';	
import AdminBox from '../../presentational/molecules/AdminBox';	
import BoardListBox from '../../presentational/molecules/BoardListBox';	
import ChartRadius from '../../presentational/molecules/ChartRadius';	
import ChartLine from '../../presentational/molecules/ChartLine';	
import ChartBar from '../../presentational/molecules/ChartBar'	
import {Row, Col} from 'react-bootstrap';	
import axios from 'axios';	


const EndPoint = process.env.NODE_ENV === 'production'? "?/test" : "?/test";


 const title={	
   fontSize:"25px",	
   fontWeight:"bold",	
   fontFamily:"sans-serif",	
   color:"#5F4B8B"	
}	

 const title_div={	
   marginBottom:"25px",	
   marginTop:"20px"	
}	

 const chartline={	
   display:"flex",	
   justifyContent:"center"	
}	

 const marginBottom={	
  marginBottom:"100px"	
}	

 class DashBoard extends Component {	
  constructor(props){	
    super(props);	
    this.state = {	
      allpost:0,	
      usercount:0,	
      leavemember:0,	
      todayjoin:0,	
      question:0,	
      freeboard:0,	
      project:0,	
      delete:0,	
      noanswer:0,	
      jobcount:0	
    }	

   }	

   async componentDidMount(){	
    await axios.get(EndPoint,{	
      auth:{	
      userid:"69"	
     }	
 }).then(response => {	
       this.setState({	
         allpost:response.data	
       })	
    });	

     await axios.get(EndPoint).then(response =>{	
      this.setState({	
        usercount:response.data	
      })	
    });	

     await axios.get(EndPoint).then(response =>{	

       this.setState({	
        leavemember:response.data	
      })	
    });	

     await axios.get(EndPoint).then(response =>{	
     this.setState({	
       todayjoin:response.data	
     })	
   });	

    await axios.get(EndPoint).then(response =>{	
     this.setState({	
       question:response.data	
     })	
   });	

    await axios.get(EndPoint).then(response =>{	
     this.setState({	
      freeboard:response.data	
     })	
   });	

    await axios.get(EndPoint).then(response =>{	
     this.setState({	
       project:response.data	
     })	
   });	

   await axios.get(EndPoint).then(response =>{	
    this.setState({	
      delete:response.data	
    })	
  });	

   await axios.get(EndPoint).then(response =>{	
    this.setState({	
      noanswer:response.data	
    })	
  });	

   await axios.get(EndPoint).then(response =>{	
    this.setState({	
      jobcount:response.data	
    })	
  });	

  }	

   render(){	
    let data = this.state;	
    return (	
        <>	
        <Row>	
            <Col sm={12} md={12}>	
             <AdminBox total= {data.allpost}	
                       question={data.question} 	
                       project={data.project} 	
                       totaluser={data.usercount} 	
                       newuser={data.todayjoin}	
                       outuser={data.leavemember} 	
                       untreated={data.accuse}	
                       freeboard={data.freeboard}	
                       delete={data.delete}	
                       noanswer={data.noanswer}	
                       jobcount={data.jobcount}	
                       />	
            </Col>	
          </Row>  	

           <Row>	
            <Col sm={12} md={12} style={chartline}>	
              <ChartLine/>	
            </Col>	
          </Row>	
          <Row>	
            <Col sm={12} md={6}>	
            <ChartRadius question={data.question} freeboard={data.freeboard} project={data.project} job={data.jobcount}></ChartRadius>	
            </Col>	
            <Col sm={12} md={6}>	
              <ChartBar/>	
            </Col>	
          </Row>	
          <br></br>	

           <Row>	
    	
          </Row>	
          <div style={title_div}>   	
          <span style={title}>최근 게시물</span>	
          </div>	
          <Row>	
            <Col sm={12} md={6}>	
              <BoardListBox boardtitle="질의응답" categoryid="1"/>    	
            </Col>	
            <Col sm={12} md={6}>	
              <BoardListBox boardtitle="자유게시판" categoryid="7"/>    	
            </Col>	
          </Row>	
          <br/><br/>	
          <Row>	
            <Col sm={12} md={6}>	
              <BoardListBox boardtitle="프로젝트 게시판" categoryid="2"/>    	
            </Col>	
            <Col sm={12} md={6}>	
              <BoardListBox boardtitle="구인구직 게시판" categoryid="4"/>	
            </Col>	
          </Row>	
          <div style={marginBottom}></div>	
        </>	
    );	
}	
}	

 export default DashBoard;