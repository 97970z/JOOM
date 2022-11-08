# JOOM

- 소켓 통신 기반 실시간 채팅
- 싱글쓰레드 언어인 JavaScript에서 뮤텍스와 세마포어를 대신하여 async/await 비동기 처리 방식 사용
- socket.emit() 으로 이벤트를 보내고 socket.on() 으로 받는다.
- 서버에서 클라이언트 함수를 실행하기 위해서 socket.emit()의 argument로 함수를 보낸다.
- SocketIO를 사용해서 이벤트를 제어하는 방식으로 채팅을 구현

## 기능

- 채팅방 생성
- 생성된 채팅방 목록 확인
- 채팅 시스템

## 실행

```
1. cd JOOM
2. npm install
3. npm run dev
4. 브라우저에서 localhost:5000
```
