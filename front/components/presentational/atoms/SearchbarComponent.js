import React from 'react';
import {InputGroup, Button, FormControl, Container, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ListGroup from 'react-bootstrap/ListGroup'
import Link from 'next/link';

/**
 * @author 정규현
 * @summary 검색바 컴포넌트를 생성 props.
 * 
 */
const formCss ={
  border:"1px solid #5F4B8B",
  borderRadius:"15px 0 0 15px",
  borderRightStyle:"none",
};

const formCss3 ={
  border:"1px solid #5F4B8B",
  borderRadius:"0 0 0 0px",
  borderRightStyle:"none",
  borderLeft:"none"
};

const formCss2 ={
  border:"1px solid #5F4B8B",
  borderLeftStyle:"none",
  borderRadius:"0 15px 15px 0",
};
const searchCss ={
  borderStyle:"none",
  height : "38px",backgroundColor:"white"
};
const searchCss2 ={
  position : "absolute",
  right : "0px",
  bottom : "0px",
  border:"1px solid #5F4B8B",
  borderLeftStyle:"none",
  borderRadius:"0 15px 15px 0",
};

const searchCss3 ={
  right : "0px",
  bottom : "0px",
  border:"1px solid #5F4B8B",
  borderLeftStyle:"none",
  borderRadius:"0 15px 15px 0",
};
 export const SearchbarComponent = (props) =>
  <InputGroup id={props.name}>
    <FormControl style={formCss}
      placeholder={props.content}
      aria-label={props.content}
      aria-describedby="basic-addon2"
    />
    <InputGroup.Append>
      <Button variant="outline-secondary"><i className="fas fa-eraser"></i></Button>
      <Button variant="outline-secondary"><i className="fas fa-search"></i></Button>
    </InputGroup.Append>
  </InputGroup>

export const  UserSearchbarComponent = (props) =>
  <>
  
  <InputGroup id={props.name}>
    <FormControl style={formCss}
                placeholder={props.content}
                aria-label={props.content}
                aria-describedby="basic-addon2"
                onKeyDown={props.input}
                id={props.inputId}
                maxLength="30"
                onChange={props.onChange}
                onKeyPress={props.onKeyPress}
                value={props.value}
    />
    <InputGroup.Append>
            <ListGroup style={searchCss}>
              <ListGroup.Item action href="#search" style={searchCss}>
                <Button variant="outline-secondary" id="userSearch_btn" style={searchCss2} onClick={props.onClick}>
                    <FontAwesomeIcon icon={faSearch} style={{color:"#5F4B8B"}}/>
                </Button>
              </ListGroup.Item>
            </ListGroup>
    </InputGroup.Append>
  </InputGroup>
  </>

export const  UserSearchbarComponent3 = (props) =>
<>

<Container>
  <Row>
    <Col style={{width:"32rem"}}>
      <InputGroup id={props.name}>
        <FormControl style={formCss}
                    placeholder={props.content}
                    aria-label={props.content}
                    aria-describedby="basic-addon2"
                    onKeyDown={props.input}
                    id={props.inputId}
                    maxLength="30"
                    onChange={props.onChange}
                    onKeyPress={props.onKeyPress}
                    value={props.value}
        />
        <InputGroup.Append>
                <div style={props.serach? props.serach: searchCss}>
                  <div style={searchCss}>
                    <Link href={{pathname:props.path ,query: {word : props.word} }} as="/" replace>
                    <Button variant="outline-secondary" id="userSearch_btn" style={props.serach?props.serach:searchCss3} onClick={props.onClick}>
                        <FontAwesomeIcon icon={faSearch} style={{color:"#5F4B8B"}}/>
                    </Button>
                    </Link>
                  </div>
                </div>
        </InputGroup.Append>
      </InputGroup>
      </Col>
      </Row>
</Container>
</>

export const AllSearchComponent = (props) =>{
  return(
<>
<style>
 
</style>
<Container id="searchbox" style={{minWidth:"150px"}}>
  <Row>
    <Col style={{width:"32rem"}} id="searchbox">
      <InputGroup id={props.name}>
        <FormControl style={formCss}
                    placeholder={props.content}
                    aria-label={props.content}
                    aria-describedby="basic-addon2"
                    onKeyDown={props.input}
                    id={props.inputId}
                    maxLength="30"
                    onChange={props.onChange}
                    onKeyPress={props.onKeyPress}
                    value={props.value}
        />
        <InputGroup.Append>
                <div style={props.serach? props.serach: searchCss}>
                  <div style={searchCss}>
                    <Link href={{pathname:props.path ,query: {word : props.word} }} as="/" replace>
                    <Button variant="outline-secondary" id="userSearch_btn" style={props.serach?props.serach:searchCss3} onClick={props.onClick}>
                        <FontAwesomeIcon icon={faSearch} style={{color:"#5F4B8B"}}/>
                    </Button>
                    </Link>
                  </div>
                </div>
        </InputGroup.Append>
      </InputGroup>
      </Col>
      </Row>
</Container>
</>
  )
}
export const  UserSearchbarComponent2 = (props) =>
  <>
 
  <InputGroup id={props.name}>
    <FormControl style={formCss3}
                placeholder={props.content}
                aria-label={props.content}
                aria-describedby="basic-addon2"
                onKeyDown={props.input}
                id={props.inputId}
                maxLength="30"
                onChange={props.onChange}
    />
    <InputGroup.Append>
      <Button variant="outline-secondary" id="userSearch_btn" style={formCss2} onClick={props.onClick}>
        <FontAwesomeIcon icon={faSearch} style={{color:"#5F4B8B"}}/>
      </Button>
    </InputGroup.Append>
  </InputGroup>
  </>

export const SingleSeachbarComponent = (props) =>
<InputGroup id={props.name}>
  <FormControl style={formCss}
    placeholder={props.content}
    aria-label={props.content}
    aria-describedby="basic-addon2"
    />
</InputGroup>


export const SingleButtonComponent = () => {
  return(
    <InputGroup.Append>
      <Button variant="outline-secondary"><i className="fas fa-search"></i></Button>
    </InputGroup.Append>
  )
}
