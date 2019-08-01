import React from 'react';

/**
 * 
 * @author 우세림
 * @summary 개발자들 상세 페이지 게시글 정보
 * 
 */
const userPostsNum ={
    width: "100%",
    fontSize: "18px",
    margin: "7px auto 4px auto",
    display: "inline-block",
    fontFamily: "bold"
}

const userPosts ={
    height: "60px",
    float: "left",
    textAlign: "center",
    fontFamily: "bold",
    fontSize: "13px",
    padding: "0px",
    border: "1px solid #ededed"
}

const UserPost = (props) => {
    return (
        <>
            <div style={userPosts}>
                    <div style={userPostsNum}>{props.question}</div>
                    <span>질문</span>
                </div>
                <div style={userPosts}>
                    <div style={userPostsNum}>{props.answer}</div>
                    <span>답글</span>
                </div> 
                <div style={userPosts}>
                    <div style={userPostsNum}>{props.comment}</div>
                    <span>덧글</span>
                </div>
        </>
    );
};

export default UserPost;