# 🦊 Liar Game - Frontend

실시간 멀티플레이어 소셜 추리 게임 **라이어 게임**의 프론트엔드 애플리케이션입니다.
Next.js + Socket.io 기반으로 구현된 실시간 웹 게임입니다.

---

## 게임 소개

라이어 게임은 플레이어 중 한 명이 **라이어** 로 배정되는 사회적 추리 게임입니다.

- **시민**: 모두 동일한 정답(단어)을 받고, 라이어를 찾아야 합니다.
- **라이어**: 카테고리(주제)만 알고 정답을 모르는 채로 들키지 않아야 합니다.
- 채팅으로 서로 이야기하며 라이어를 찾거나, 라이어가 정답을 맞히면 승패가 결정됩니다.

---

## 기술 스택

| 분류          | 기술                                               |
| ------------- | -------------------------------------------------- |
| 프레임워크    | [Next.js](https://nextjs.org/) 16.1.2 (App Router) |
| UI 라이브러리 | React 19.2.3                                       |
| 상태 관리     | [Zustand](https://zustand-demo.pmnd.rs/) 5.0.10    |
| 실시간 통신   | [Socket.io-client](https://socket.io/) 4.8.3       |
| 스타일링      | [Tailwind CSS](https://tailwindcss.com/) 3.4.19    |
| 언어          | TypeScript 5                                       |
| 폰트          | Pretendard (Fontsource)                            |
| 린터          | ESLint 9                                           |

---

## 프로젝트 구조

```
src/
├── app/                        # Next.js App Router 페이지
│   ├── page.tsx                # 홈 (로비로 리다이렉트)
│   ├── layout.tsx              # 루트 레이아웃 (폰트 설정)
│   ├── globals.css             # 글로벌 스타일 & 애니메이션
│   ├── lobby/
│   │   └── page.tsx            # 로비 페이지 (방 생성/참가)
│   └── game/
│       └── page.tsx            # 게임 페이지 (채팅 & 게임 로직)
│
├── components/
│   ├── lobby/                  # 로비 전용 컴포넌트
│   │   ├── Action.tsx          # 방 생성/참가 버튼 영역
│   │   ├── CreateRoom.tsx      # 방 생성 플로우
│   │   └── JoinRoom.tsx        # 방 참가 플로우
│   │
│   └── ui/                     # 재사용 UI 컴포넌트
│       ├── Button.tsx          # 공통 버튼
│       ├── Modal.tsx           # 기본 모달
│       ├── ModalButton.tsx     # 모달용 버튼 변형
│       ├── CreateRoomModal.tsx # 방 코드 표시 & 복사
│       ├── JoinRoomModal.tsx   # 방 코드 입력
│       ├── NickNameModal.tsx   # 닉네임 입력
│       └── EndedGameModal.tsx  # 게임 종료 결과 표시
│
├── lib/
│   ├── socket.ts               # Socket.io 싱글톤 인스턴스
│   └── socketGame.ts           # 소켓 이벤트 핸들러 & 리스너
│
├── stores/
│   └── gameStore.ts            # Zustand 전역 상태 관리
│
└── types/
    └── game.ts                 # TypeScript 타입 정의
```

---

## 시작하기

### 사전 요구사항

- Node.js 18 이상
- npm / yarn / pnpm
- 백엔드 서버 실행 중 (API 서버 + WebSocket 서버)

### 설치

```bash
git clone https://github.com/your-org/front.git
cd front
npm install
```

### 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성합니다.

```env
# 백엔드 REST API 주소
NEXT_PUBLIC_API_URL=http://localhost:5000
```

> **참고**: WebSocket 서버 주소는 현재 `src/lib/socket.ts`에 `http://localhost:5001/game`으로 고정되어 있습니다.

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 으로 접속합니다.

### 프로덕션 빌드

```bash
npm run build
npm start
```

---

## 주요 기능

### 로비

- 게임 규칙 설명 화면
- **방 생성**: 새 게임 방 생성 및 초대 코드 발급
- **방 참가**: 초대 코드로 기존 방 입장
- **닉네임 등록**: 닉네임 설정 후 JWT 토큰 발급

### 게임

- **플레이어 목록**: 실시간 접속자 현황
- **실시간 채팅**: Socket.io 기반 메시지 브로드캐스트
- **역할 배정**: 게임 시작 시 자동으로 라이어/시민 역할 부여
  - 시민: 정답 단어 표시
  - 라이어: 카테고리(주제)만 표시
- **게임 제어**: 방장이 게임 시작/종료 가능
- **자동 감지**: 시민이 라이어의 정답 맞히기를 채팅에서 자동 감지
- **결과 모달**: 게임 종료 시 라이어 정체 공개

---

## API & 소켓 이벤트

### REST API

| Method   | Endpoint                 | 설명                   |
| -------- | ------------------------ | ---------------------- |
| `POST`   | `/room/create`           | 새 방 생성             |
| `POST`   | `/room/nickname`         | 닉네임 등록 & JWT 발급 |
| `POST`   | `/room/join`             | 방 참가                |
| `DELETE` | `/room/quit?roomId=<id>` | 방 퇴장                |

### WebSocket 이벤트

**클라이언트 → 서버**

| 이벤트       | 설명                           |
| ------------ | ------------------------------ |
| `join`       | 게임 방 접속 (`roomId`, `jwt`) |
| `chat`       | 채팅 메시지 전송               |
| `game_start` | 게임 시작 요청                 |
| `game_end`   | 게임 종료 요청                 |

**서버 → 클라이언트**

| 이벤트         | 설명                   |
| -------------- | ---------------------- |
| `join_success` | 방 입장 성공           |
| `join_error`   | 방 입장 실패           |
| `user_joined`  | 새 플레이어 입장       |
| `user_left`    | 플레이어 퇴장          |
| `chat_message` | 채팅 메시지 수신       |
| `game_info`    | 역할 및 비밀 정보 수신 |
| `game_started` | 게임 시작됨            |
| `game_ended`   | 게임 종료 및 결과      |
| `game_error`   | 게임 오류              |
| `disconnect`   | 연결 끊김              |

---

## 상태 관리

[Zustand](https://zustand-demo.pmnd.rs/)를 사용하며 `src/stores/gameStore.ts`에 정의되어 있습니다.

**주요 상태**

```ts
roomCode; // 현재 방 코드
players; // 플레이어 목록
nickname; // 내 닉네임
token; // JWT 인증 토큰
gameStatus; // 게임 상태 (waiting | playing | ended)
selectedTheme; // 게임 카테고리 (라이어에게 보임)
selectedItem; // 게임 정답 (시민에게 보임)
liar; // 라이어 플레이어 정보
```

**주요 액션**

```ts
createRoom(); // 방 생성
joinRoom(); // 방 참가
createNickname(); // 닉네임 등록
setGameInfo(); // 게임 정보 설정
setGameResult(); // 게임 결과 설정
resetGame(); // 상태 초기화
```

---

## 스크립트

```bash
npm run dev    # 개발 서버 실행 (hot reload)
npm run build  # 프로덕션 빌드
npm start      # 프로덕션 서버 실행
npm run lint   # ESLint 코드 검사
```

---

## 아키텍처 특이사항

- **클라이언트 사이드 라이어 감지**: 서버 부하를 줄이기 위해 채팅 메시지에서 라이어의 정답 맞히기를 클라이언트에서 감지합니다.
- **Snapshot 패턴**: 서버 데이터 불일치(null 값) 처리를 위한 스냅샷 구조가 적용되어 있습니다.
- **JWT 인증**: 닉네임 등록 후 발급된 토큰으로 소켓 연결을 인증합니다.
- **싱글톤 소켓**: `src/lib/socket.ts`에서 Socket.io 인스턴스를 싱글톤으로 관리합니다.

---

## 라이선스

이 프로젝트는 개인/팀 프로젝트입니다. 라이선스는 별도로 명시되지 않았습니다.
