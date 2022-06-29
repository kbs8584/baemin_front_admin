export const HOME_ROUTE_BUTTONS = [
  {
    id: 0,
    name: '매장관리',
    path: '/',
  },
  {
    id: 1,
    name: '매장아이디 생성',
    path: 'create-id',
  },
  {
    id: 2,
    name: '배민갤러리',
    path: 'gallery',
  },
  {
    id: 3,
    name: '중간관리자',
    path: 'middle-admin',
  },
];

export const MIDDLE_ADMIN_INPUTFIELD = [
  {
    title: '중간관리자 ID',
    placeholder: 'ID를 입력해주세요.',
    button: {
      has: true,
      type: 'checkDuplicate',
      name: '중복검사',
    },
  },
  {
    title: '관리자명',
    placeholder: '관리자명을 입력해주세요.',
    button: {
      has: true,
      type: 'checkDuplicate',
      name: '중복검사',
    },
  },
  {
    title: '이메일',
    placeholder: '대표 이메일을 입력해주세요.',
    button: {
      has: true,
      type: 'checkDuplicate',
      name: '중복검사',
    },
  },
  {
    title: '비밀번호',
    placeholder: '비밀번호를 입력해주세요.',
    button: {
      has: true,
      type: 'autoGenerate',
      name: '자동생성',
    },
  },
];
