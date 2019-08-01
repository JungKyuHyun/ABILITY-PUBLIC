import React from 'react';
import Badge from 'react-bootstrap/Badge';

/**
 * @author 우세림
 * @summary 20190615 능력치 UI 
 * @see 정규현 // css 추가 
 * @see 정규현 // 조건문 추가, 시나리오 대로 자리수 별로 조회수 문자열 변경
 */

const css = {
    backgroundColor:"#cd6133",
    paddingBottom:"3px"
};

export const AbilityComponent = (props)=>
    {
        let reputation = props.val ? props.val : 0;
        const strReputation = reputation.toString();
        const strReputationLength = reputation.toString().length;
        
        if(strReputationLength >9){
            reputation = strReputation.substr(0, strReputationLength-9)+"G";
        }else if(strReputationLength >6){
            reputation = strReputation.substr(0, strReputationLength-6)+"M";
        }else if(strReputationLength >3){
            reputation = strReputation.substr(0, strReputationLength-3)+"K";
        }
        
        return(
            <Badge id={props.id} style={css} variant="primary">능력 {reputation}</Badge>
        );
    }

export const AbilityComponent2 = (props)=> {
    return(
        <Badge style={css} variant="primary">능력 {props.val}</Badge>
    );
}

export const JobContentComponent = (props) => {
    return(
        <Badge style={css} variant="primary">{props.val}</Badge>
    );
}
export const JobPeriodComponent = (props) => {
    return(
        <Badge style={props.css} variant="primary">{props.val}</Badge>
    );
}    

