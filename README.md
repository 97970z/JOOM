# JOOM

- 소켓 통신 기반 실시간 채팅
- 싱글쓰레드 언어인 JavaScript에서 뮤텍스와 세마포어를 대신하여 async/await 비동기 처리 방식 사용
- socket.emit() 으로 이벤트를 보내고 socket.on() 으로 받는다.
- 서버에서 클라이언트 함수를 실행하기 위해서 socket.emit()의 argument로 함수를 보낸다.
- SocketIO를 사용해서 이벤트를 제어하는 방식으로 채팅을 구현

## 기능 ##

- 채팅방 생성
- 생성된 채팅방 목록 확인
- 채팅 시스템

## 실행 ##

```
1. cd JOOM
2. npm init
3. npm run dev
4. 브라우저에서 localhost:5000
```
 
## 구동 영상 ##

## 약간의 코드 ##

### server.js (서버) ##

```javascript
socket.on("enter_room", async (roomName, done) => {
  // socket.join을 이용해 소켓통신 채널을 생성한다.
  socket.join(roomName);
  done();
  // 채널 생성후 welcome이벤트 호출 ( roomName을 argument로 넘겨준다 )
  socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));
  // welcome이벤트 후 Main화면에 접속해있는 다른 클라이언트 화면에 생성된 roomList를 보여주도록 비동기 처리
  await wsServer.sockets.emit("room_change", publicRooms());
});
```

### app.js (클라이언트) ##

```javascript
// home.pug에서 enter_room 버튼 입력 이벤트(handleRoomSubmit) Listening
form.addEventListener("submit", handleRoomSubmit);

async function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  // enter_room 버튼 클릭 시 enter_room 이벤트 호출 및 initCall() 함수 비동기 처리
  socket.emit("enter_room", input.value, await initCall);
  roomName = input.value;
  input.value = "";
}

async function initCall() {
  room.hidden = false;
  welcome.hidden = true;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room: ${roomName}`;
  const msgForm = room.querySelector("#msg");
  // 메시지 전송버튼 이벤트(handleMessageSubmit) Listening
  msgForm.addEventListener("submit", await handleMessageSubmit);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  // new_message 이벤트 호출
  socket.emit("new_message", input.value, roomName, () => {
    // 메시지 출력 함수 addMessage()
    addMessage(`Me: ${value}`);
  });
  input.value = "";
}

async function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  // addMessage() 호출할때마다 li태그를 home.pug에 추가
  await ul.appendChild(li);
  scroll1.scrollTop = scroll1.scrollHeight;
}
```
