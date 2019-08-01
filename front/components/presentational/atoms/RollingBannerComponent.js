import React,{useState, useCallback} from 'react';
import {Carousel} from 'react-bootstrap';
import axios from 'axios';


/**
 * @author 정규현
 * @summary 이미지 롤링
 */

const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";


const RollingBannerComponent = (props) => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);
  
    const handleSelect = useCallback((selectedIndex, e) => {
      setIndex(selectedIndex);
      setDirection(e.direction);
    },[index, direction]);

    const onClickBanner = useCallback((id, path) => () => {
      axios.post(backUrl, {
          id:id,
      })
      .then((res)=>{
      })
      
    },[]);

    if(props.data){
      const banners = props.data.map((banner)=>
          <Carousel.Item key={banner.id}>
            <span onClick={onClickBanner(banner.id, banner.connect_url)} style={{cursor:"pointer"}}>
            <a href={banner.connect_url} target="_blank">
              <img
                className="d-block w-100"
                src={banner.file_path}
                alt={banner.title}
                style={{width:"1140px",height:"auto"}}/>
            </a>
            </span>
            
          </Carousel.Item>
      );

      return (
        <>
          <Carousel activeIndex={index} direction={direction} onSelect={handleSelect}>
            {banners}
          </Carousel>
        </>
      );
    }else{
      return(
        " "
      );
    };
  
  }

  export default RollingBannerComponent;