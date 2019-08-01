import React, { Component } from 'react';
import BannerCard from '../../presentational/molecules/BannerCard';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAd } from '@fortawesome/free-solid-svg-icons';

const endpoint = process.env.NODE_ENV === 'production'? "?" : "?";



const banner_div = {
    display:"flex",
    flexDirection:"column"

}

const h3_css={
    color:"#5F4B8B",
    fontFamily:"sans-serif",
    fontWeight:"bold",
    marginLeft:"10px",
    marginBottom:"30px",
    fontSize:"28px"
}

const icon ={
    width:"30px",
    height:"30px",
    color:"#5F4B8B",
   paddingBottom:0
}

const title={
    marginBottom:"60px",
    marginLeft:"20px",
    marginTop:"30px"
}
class BannerInfo extends Component {
  constructor(props){
      super(props);
      this.state ={
          bannerlist:[],
          todaycount:[]
      }
  }

 async componentDidMount(){
      await axios.get(endpoint).then(response=>{
          this.setState({
              bannerlist:response.data
          })
      })
  }
  
  render(){
      const BannerList = this.state.bannerlist.map((banner)=>{
           return <BannerCard key={banner.id} id={banner.id} click_count={banner.click_count} image={banner.image} date_created={banner.date_created} title={banner.title} url={banner.url} client={banner.client} description={banner.banner_desc}/>
      });
      return(
          <>
          <div style={title}>
           <FontAwesomeIcon icon={faAd} style={icon}/>
          <span style={h3_css}>배너 목록</span>
          </div>
          <div style={banner_div}>
          {BannerList}
          </div>
          </>
      )
  }


}


export default BannerInfo;