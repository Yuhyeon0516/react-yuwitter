# Nomadcoders 강의를 듣고 React & Firebase로 만든 Twitter Clone 입니다.<br/>(강의링크: https://nomadcoders.co/nwitter)

## 참고사항

강의에서는 react-router-dom을 @5.3.0 버젼, firebase는 @9.6.1을 사용하였으나<br/>
react-router-dom, firebase 모두 버젼이 변동 됨으로 사용법에 많은 변화가 있어 숙지가 필요해보여<br/>
Clone 당시 최신인 react-router-dom은 @6.14.1으로, firebase는 @9.23.0으로 구현해보았습니다.

```
yuwitter@0.1.0 /Users/kim-yuhyeon/Desktop/Web/react-yuwitter
├── @testing-library/jest-dom@5.16.5
├── @testing-library/react@13.4.0
├── @testing-library/user-event@13.5.0
├── firebase@9.23.0 <==
├── react-dom@18.2.0
├── react-router-dom@6.14.1 <==
├── react-scripts@5.0.1
├── react@18.2.0
└── web-vitals@2.1.4
```

## Login

Login은 Firebase를 이용하여 Email & Password, Google, Github Login을 구현해두었습니다.<br/>
만약 가입이 된 Email인 경우 Create Account 진행 시 이미 가입 된 계정이라고 표시해주는<br/>
Error Message도 구현해두었으면 Sign in Button을 통하여 Login 시도가 가능하게 제작하였습니다.<br/>
(비디오)

## Home

Home Page에서는 게시물을 올릴 수 있으며 firestore의 snapshot 기능을 이용하여<br/>
타 계정에서도 실시간으로 게시물이 올라오는것을 확인 할 수 있습니다.<br/>
추가로 이미지 첨부도 firebase의 storage 기능을 이용하여 구현해두었습니다.<br/>
이전에 본인의 계정으로 올린 게시물의 Text를 수정하거나 삭제하는 기능도 구현해두었습니다.<br/>
(아래 영상의 좌측은 제 구글계정, 우측은 test 계정으로 Login하여 test하였습니다.)<br/>
(비디오)

## Profile

Profile Page는 특별한 기능없이 Logout 기능만 구현해두었습니다.<br/>
추후 본인이 올린 게시물만 보여줄수있게 구현예정입니다.<br/>
(비디오)
