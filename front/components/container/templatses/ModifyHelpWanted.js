import React from 'react';
import {PrecautionsComponent} from '../../presentational/atoms/PrecautionsComponent';
import {HelpWantedComponent} from '../../presentational/atoms/HelpWantedComponent';
import {ButtonComponent} from '../../presentational/atoms/ButtonComponent';
import CkeditorOne from '../../presentational/atoms/CkeditorOne';
import {GridArea} from '../organisms/GridArea';

/**
 * 
 * @author 곽호원
 * @summary 구인공고 수정 페이지 
 */
const buttoncss = {
    textAlign : "right",
    paddingRight : "10px",
    marginTop : "10px"
}

const ModifyHelpWanted = () => {
    return (
        <GridArea>
            <PrecautionsComponent />
            <HelpWantedComponent />
            <h6>기업 설명</h6>
            <CkeditorOne />
            <h6>직무 소개</h6>
            <CkeditorOne />
            <div style={buttoncss}>
                <ButtonComponent name="돌아가기" />&nbsp;&nbsp;
                <ButtonComponent name="수정"/>
            </div>
       </GridArea>
    );
};

export default ModifyHelpWanted;