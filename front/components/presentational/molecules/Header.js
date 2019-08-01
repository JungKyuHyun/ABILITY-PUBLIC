import React, {Component} from 'react';
import {Top} from '../../container/organisms/Top';
import {SearchbarComponent} from '../atoms/SearchbarComponent';
import SideBar from '../../container/organisms/SideBar';

/**
 * @author 정규현
 * @summary 기존 파일을 기존 로직에 맞추기 위해 생성
 *          홈페이지 상단 바(header) 부분을 나타내는 컴포넌트
 */

class Header extends Component{
    render(){
        return(
            <>
                <div id="root" className="item1">
                    <div className="navbar-LayOut">
                        <Top/>
                        <SearchbarComponent name="SeachBar"/>
                    </div>
                </div>
                <div className="SideBar_Ability">
                    <SideBar/>
                    {this.props.children}
                </div>
            </>
        );
    }
}

export default Header;