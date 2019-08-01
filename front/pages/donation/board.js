import React,{useState} from 'react';
import {ButtonComponent} from '../../components/presentational/atoms/ButtonComponent';
/**
 * @author 정규현
 * @summary 후원게시판 생성 // 결제시스템
 */



const Board = () =>{
    const [msg, setMsg] = useState('');
    const onclickDonation = (e)=>{
        setMsg(`1,000만원이 후원되었습니다.
        감사합니다!`);
    };


    return(
        <>
        
        <div style={{textAlign:"center"}}>
            <h1 style={{marginTop:"3rem"}}>Team-Ability에게 후원해 주세요!</h1>
            <hr/>
            <p>후원해 주신 소중한 금액은 저희의 홈페이지의 서버 유지비 등으로 사용됩니다.</p>
            <ButtonComponent onclick={onclickDonation} name="후원하기"/>
            <h2 style={{color:"red",marginTop:"5rem"}}>{msg}</h2>
        </div>
            
            
            
            
        
        </>
    );
};

export default Board;

