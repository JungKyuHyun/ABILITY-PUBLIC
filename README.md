![new_Logo3](https://user-images.githubusercontent.com/42884032/62096751-b6fc5a80-b2bf-11e9-994f-3fc3a8c136d3.png)
            

<br><br><br>

# ABILITY [![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travisci.org/joemccann/dillinger)
ABILITY는 약 1개월 동안 준비한 비트캠프 3조(팀명: ABILITY)의 파이널 프로젝트입니다. 6개월간의 배운 것을 총 활용해서 만든 프로젝트이며, 6명의 팀원이 함께 만들었습니다. 하지만, 뷰 라이브러리로 적용한 React는 별도의 스터디를 병행하며 진행한 것이며, 따로 배우지는 않았습니다. 그렇기 때문에 처음 리액트 설계부분에 부족함이 있어, 서버사이드 렌더링을 일부에만 적용했다는가, 리덕스나 리덕스 사가를 모든 페이지에 적용하지 못한 문제가 있습니다. 하지만, 준비 기간이 2개월(실제 코딩기간 45일) 동안 스터디를 병행하며, 한 사이트를 만들었다는 것을 높게 평가해 주시면 좋겠습니다.


<br>
<br>

## 프로젝트 개요
우리 프로젝트는 한국형 Stack overflow를 지향하고 있습니다. 
 여러가지 트랜드를 반영한 최신 기술과 고급 기술들을 많이 적용해서 만든 기술 중심형 프로젝트입니다.
사용자들은 질문을 통해 개발에 대한 해결방안을 얻고, 답변을 통해 일정한 포인트(능력치)를 얻을 수 있는 사이트 입니다.또한 사용자들은 페이지를 통해 구인을 원하는 기업에 지원할 수 있고, 사용자 간의 채팅도 가능하며, 본인이 만든 프로젝트 영상을 다른 사용자들에게 보여줄 수 있는 공간을 제공합니다.

<br>
<br>
<br>

## 프로젝트 주제 선정 배경
1. 한국에는 철저히 개발자를 위하며, 질문과 답변 중심의 커뮤니티가 부족하다.
2. 실제로 우리가 개발을 하면서 필요한 정보를 **쉽게** 찾을 수 있는 사이트가 필요하다.
3. 내가 만든 프로젝트를 평가 받거나 자랑할 수 있는 공간이 없다.
4. 6개월 동안 배운 기술을 최대한으로 활용하여 사이트 구축을 할 수 있다.
<br>
<br>




## Target
- 초기 : 개발 입문자 - 영어에 약하고 원하는 정보를 찾을 수 있는 능력이 부족하다.
- 그 이후 : 개발 입문자 & 숙련된 개발자 - 초기부터 사용하고 있는 개발자들을 중심으로 꾸준히 사이트 규모를 늘려나가며, 많은 수의 질문과 답변을 기반으로 더 많은 개발자들을 모은다.

<br>

## 프로젝트 기본 설정
- 기본색 : #5F4B8B(울트라 바이올렛), #F3F3F3(화이트), #242729 (검정)
- line-height : 1.3
- 기본 폰트 : font-family : Noto Sans,Arial, "Helvetica Neue", Helvetica, sans-serif
- 텍스트 에디터 폰트, 코드 폰트 : hack, Arial, "Helvetica Neue", Helvetica, sans-serif
- 연속된 버튼은 다른 색으로 한다. 
- 메인 버튼이나 중요한 버튼은 #5F4B8B 색상(PRIMARY를 강제로 색상 변경 - 전역)으로 한다.
- 대부분의 버튼은 "오른쪽"에 위치 시킨다.(모바일 사용자의 편의성 극대화)

<br>


## URL : www.team-ability.com


<br>

<br>
<br>

## ABILITY 프론트엔드 사이트 로드맵
![ABILITY_Front](https://user-images.githubusercontent.com/42884032/62835412-36603580-bc93-11e9-956d-f0e5903c830d.png)

<br><br>


## 아토믹 디자인 패턴 적용 

 리액트로 처음 프로젝트를 진행하다보니, 프로젝트 시작전 폴더 구조의 분할에 대한 공부를 함. 그 중에서 아모믹 디자인 패턴을 적용하여 폴더 구조를 "atoms/, molecules/, organisms/, templates/, pages/"로 구분함. 실제로 느낀 장점은 컴포넌트 분류가 일정한 패턴이라 필요한 컴포넌트를 찾아서 재사용하기 좋음

![image](https://user-images.githubusercontent.com/42884032/62147835-645c8600-b333-11e9-9db9-c75623e16317.png)


<br>


## NEXT.js (프로젝트 중간에 변경) 

코드 스플리팅 및 prefetch, 원활한 SSR 적용을 위한 next 프레임워크 사용

![image](https://user-images.githubusercontent.com/42884032/62148420-a639fc00-b334-11e9-97b7-e2aec7a88879.png)

<br>

## 서버사이드 렌더링 구현 

메인 페이지 데이터에 한해서 구현. css, data, helmet SSR 적용 
![image](https://user-images.githubusercontent.com/42884032/62148540-dc777b80-b334-11e9-947a-0b452e40cbc6.png)

<br>

## EsLint 사용

 팀원의 코딩스타일을 통일하기 위해 사용(프론트에서는 react-recommand, 백엔드 node.js에서는 airbnb 적용)
![eslint](https://user-images.githubusercontent.com/42884032/62835492-3280e300-bc94-11e9-9713-69eb2b0af0e1.jpg)
<br/>



## ABILITY 백엔드 사이트 로드맵
![ABILITY-Back-end](https://user-images.githubusercontent.com/42884032/62835383-dc5f7000-bc92-11e9-8833-cf699bb8849a.png)

<br>

## DATABASE ERD
![ERD](https://user-images.githubusercontent.com/42884032/62096542-f70f0d80-b2be-11e9-89c3-3645b1aed1ba.jpg)

<br>
<br>

## CLOUD COMPUTING
![KyuHyun cloud Computing](https://user-images.githubusercontent.com/42884032/62835642-c3a48980-bc95-11e9-8247-77b6dac5069b.png)
<br>
<br>

## MySQL 사용기술
 -Mybatis : dynamic query (동적 쿼리 적용)
 <br>
 - 스케줄러 1개, 프로시저 1개, 트리거 12개
![image](https://user-images.githubusercontent.com/42884032/62145032-bbf7f300-b32d-11e9-9bb3-685e2eae85db.png)


<br>

## 배포전 번들 사이즈 분석(client)
![image](https://user-images.githubusercontent.com/42884032/62143542-23f90a00-b32b-11e9-90ed-260617992ba1.png)

 - 현재 가장 큰 파일 크기를 가진 것은 확인해 보니, amchart 모듈이었습니다. 하지만, 아직 이 부분의 이슈가 정리되지 않아 트리 쉐이킹을 할 수 없는 상황이라고 판단하여, 그대로 사용하되 빌드시 압축방식을 변경하여 gzip 방식으로 최대한 압축하였습니다. 실제로 빌드될때 1mb 이상의 파일은 존재 하지 않습니다. 

<br>

## 배포전 번들 사이즈 분석(front-server)
![image](https://user-images.githubusercontent.com/42884032/62143551-28bdbe00-b32b-11e9-923b-d21d90e09931.png)

<br>

## 프론트 서버 및 백엔드 서버 데몬 적용(PM2)
![image](https://user-images.githubusercontent.com/42884032/62148731-3d9f4f00-b335-11e9-842a-9d0e09ddfa2b.png)


<br>


## 형상관리 및 도구
GIT - SourceTree, BASH, ZSH

![image](https://user-images.githubusercontent.com/42884032/62141283-4557f700-b327-11e9-8335-915f724bae97.png)

<br>

## 구글 에널리틱스에 의한 추적

![googleAn](https://user-images.githubusercontent.com/42884032/62835552-c6eb4580-bc94-11e9-88c3-2e5a7c7b63ce.jpg)




<br>

## ABILITY 구성원 : 정규현(조장), 신선하, 강기훈, 정진호, 곽호원, 우세림
- 정규현 : https://github.com/JungKyuHyun/ , https://blog.naver.com/ajdkfl6445 
- 신선하 : https://github.com/sunha-shin/
- 강기훈 : https://github.com/alkalisummer
- 정진호 : https://github.com/jhguma
- 곽호원 : https://github.com/kwakhowon
- 우세림 : https://github.com/selim0915



<br>
<br>

## 공통 업무
기존 프로젝트 분석(프로젝트 및 PPT) 및 문서화, 목업툴을 통한 페이지별 디자인 및 레이아웃 구성, 시나리오 수정




<br>


## 구성원별 수행 업무
![image](https://user-images.githubusercontent.com/42884032/62143409-e8f6d680-b32a-11e9-9ddd-b80528b0af76.png)

![image](https://user-images.githubusercontent.com/42884032/62141002-db3f5200-b326-11e9-83c7-27d7d69b04fc.png)

![image](https://user-images.githubusercontent.com/42884032/62141006-dda1ac00-b326-11e9-83c7-ae1bc426db8c.png)

![image](https://user-images.githubusercontent.com/42884032/62141016-e09c9c80-b326-11e9-9836-2c52d298c6e2.png)

![image](https://user-images.githubusercontent.com/42884032/62141029-e2fef680-b326-11e9-8a73-cfdd92a540fe.png)

![image](https://user-images.githubusercontent.com/42884032/62141035-e5615080-b326-11e9-8156-0b9385134a74.png)
