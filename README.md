![new_Logo3](https://user-images.githubusercontent.com/42884032/62096751-b6fc5a80-b2bf-11e9-994f-3fc3a8c136d3.png)
            

<br><br><br>

# ABILITY [![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travisci.org/joemccann/dillinger)
ABILITY는 약 1개월 동안 준비한 비트캠프 3조(팀명: ABILITY)의 파이널 프로젝트입니다. 6개월간의 배운 것을 총 활용해서 만든 프로젝트이며, 6명의 팀원이 함께 만들었습니다. 하지만, 뷰 라이브러리로 적용한 React는 별도의 스터디를 병행하며 진행한 것이며, 따로 배우지는 않았습니다. 그렇기 때문에 처음 리액트 설계부분에 부족함이 있어, 서버사이드 렌더링을 일부에만 적용했다는가, 리덕스나 리덕스 사가를 모든 페이지에 적용하지 못한 문제가 있습니다. 하지만, 준비 기간이 2개월(실제 코딩기간 45일) 동안 스터디를 병행하며, 한 사이트를 만들었다는 것을 높게 평가해 주시면 좋겠습니다.

<br>

## 프로젝트 개요
우리 프로젝트는 한국형 Stack overflow를 지향하고 있습니다. 
 여러가지 트랜드를 반영한 최신 기술과 고급 기술들을 많이 적용해서 만든 기술 중심형 프로젝트입니다.
사용자들은 질문을 통해 개발에 대한 해결방안을 얻고, 답변을 통해 일정한 포인트(능력치)를 얻을 수 있는 사이트 입니다.또한 사용자들은 페이지를 통해 구인을 원하는 기업에 지원할 수 있고, 사용자 간의 채팅도 가능하며, 본인이 만든 프로젝트 영상을 다른 사용자들에게 보여줄 수 있는 공간을 제공합니다.

<br>

## 프로젝트 주제 선정 배경
1. 한국에는 철저히 개발자를 위하며, 질문과 답변 중심의 커뮤니티가 부족하다.
2. 실제로 우리가 개발을 하면서 필요한 정보를 **쉽게** 찾을 수 있는 사이트가 필요하다.
3. 내가 만든 프로젝트를 평가 받거나 자랑할 수 있는 공간이 없다.
4. 6개월 동안 배운 기술을 최대한으로 활용하여 사이트 구축을 할 수 있다.

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

## ABILITY 프론트엔드 사이트 로드맵
![ABILITY_Front](https://user-images.githubusercontent.com/42884032/62835412-36603580-bc93-11e9-956d-f0e5903c830d.png)

<br>

## 통계 데이터 활용

![data](https://user-images.githubusercontent.com/42884032/62836109-e08f8b80-bc9a-11e9-9e26-652e94faffb2.png)

<br>

## 아토믹 디자인 패턴 적용 

 리액트로 처음 프로젝트를 진행하다보니, 프로젝트 시작전 폴더 구조의 분할에 대한 공부를 함. 그 중에서 아모믹 디자인 패턴을 적용하여 폴더 구조를 "atoms/, molecules/, organisms/, templates/, pages/"로 구분함. 실제로 느낀 장점은 컴포넌트 분류가 일정한 패턴이라 필요한 컴포넌트를 찾아서 재사용하기 좋음

![atomic](https://user-images.githubusercontent.com/42884032/62836434-af648a80-bc9d-11e9-9cb7-49fa7ac74af4.jpg)

<br>

## NEXT 프레임 워크 사용

코드 스플리팅 및 prefetch, 원활한 SSR 적용을 위한 next 프레임워크 사용

![image](https://user-images.githubusercontent.com/42884032/62148420-a639fc00-b334-11e9-97b7-e2aec7a88879.png)

<br>

## IE 최적화

![ie_polyfill](https://user-images.githubusercontent.com/42884032/62836077-973f3c00-bc9a-11e9-9975-27e7fe4d70ba.png)

<br>

## 서버사이드 렌더링(SSR)

![SSR](https://user-images.githubusercontent.com/42884032/62836049-29931000-bc9a-11e9-8f21-2973d323bfb9.png)

<br>

## Redux-Reducer 설계

![redux_reducer_kyuhyun](https://user-images.githubusercontent.com/42884032/62836182-893deb00-bc9b-11e9-80d9-eee98aea8b65.jpg)

<br>

## Redux-saga를 활용한 로그인 유지 기능

![login](https://user-images.githubusercontent.com/42884032/62835991-79250c00-bc99-11e9-82b1-51eb43431a6e.png)

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

## CLOUD COMPUTING
![KyuHyun cloud Computing](https://user-images.githubusercontent.com/42884032/62835642-c3a48980-bc95-11e9-8247-77b6dac5069b.png)

<br>

## MySQL 저장 프로시저와 스케줄러

![mysql_KyuHyun](https://user-images.githubusercontent.com/42884032/62835838-b4bed680-bc97-11e9-98c2-f2bb44371c49.png)

<br>

## MySQL Trigger

![trigger](https://user-images.githubusercontent.com/42884032/62835885-580feb80-bc98-11e9-9c18-d0e9f006e20b.jpg)

<br>
 
## Mybatis
 
![mybatis](https://user-images.githubusercontent.com/42884032/62835919-a7561c00-bc98-11e9-9140-c93b2b3ae1aa.png)

<br>

## 배포전 번들 사이즈 분석

![bundle_KyuHyun](https://user-images.githubusercontent.com/42884032/62836350-d8d0e680-bc9c-11e9-8408-7215865a6f25.png)

<br>

## 데몬 & 무중단 배포

![deploy_KyuHyun](https://user-images.githubusercontent.com/42884032/62836232-2567f200-bc9c-11e9-89ea-1883a18d4052.jpg)

<br>

## 로봇 배제 표준

![robots](https://user-images.githubusercontent.com/42884032/62836286-9c9d8600-bc9c-11e9-9901-6afbe55e9430.jpg)

<br>

## 형상관리 및 도구
GIT - SourceTree, BASH, ZSH

![image](https://user-images.githubusercontent.com/42884032/62141283-4557f700-b327-11e9-8335-915f724bae97.png)

<br>

## 구글 에널리틱스에 의한 추적

![googleAn](https://user-images.githubusercontent.com/42884032/62835552-c6eb4580-bc94-11e9-88c3-2e5a7c7b63ce.jpg)

<br>

## ABILITY 구성원 : 정규현(리더), 신선하, 강기훈, 정진호, 곽호원, 우세림
- 정규현 : https://github.com/JungKyuHyun/ , https://blog.naver.com/ajdkfl6445 
- 신선하 : https://github.com/sunha-shin/
- 강기훈 : https://github.com/alkalisummer
- 정진호 : https://github.com/jhguma
- 곽호원 : https://github.com/kwakhowon
- 우세림 : https://github.com/selim0915

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
