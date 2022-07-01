import API from 'api';
import axios from 'axios';

const TOKEN = 'TOKEN';
const TOKEN_KEY = sessionStorage.getItem(TOKEN);

export const checkDuplicateId = async CMSId => {
  try {
    const response = await API.get('/api/v1/login/checkUserId', {
      params: {
        userId: CMSId,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const initPassword = async (storeId, storeEmail, CMSId) => {
  try {
    const res = await API.post(`/api/v1/email`, {
      storeId: storeId,
      receiveMailAddr: storeEmail,
      receiveName: CMSId,
    });

    if (res.status === 200) alert('비밀번호 초기화 이메일이 발송되었습니다.');
  } catch (error) {
    console.error(error);
  }
};

export const getStoreList = async (page, input, mode) => {
  try {
    const response = await API.get('/api/v1/user/search', {
      params: {
        cpage: page,
        rowItem: 10,
        sortMode: 1,
        searchInput: input,
        searchMode: mode,
        orderMode: false,
        role: 1,
      },
      headers: { Authorization: `Bearer ${TOKEN_KEY}` },
    });

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getStoreIdAndEmail = async storeId => {
  try {
    const response = await API.get('/api/v1/robot/store', {
      params: { storeId: storeId },
    });

    // 1. 매장 아이디가 있고 CMS 계정이 만들어져있는 경우 -> 400 error -> 가입된 매장입니다.
    // 2. 매장 아이디가 있고 CMS 계정이 없는 경우 -> 200 ->
    // 3. 매장 아이디가 없는 경우 -> 400 -> '가입된 매장입니다'라는 값이 없으면 -> '등록되지 않는 매장 ID'

    return response.data;
  } catch (error) {
    if (error.response.status === 400) {
      if (error.response.data.message === '가입된 매장 입니다.') {
        return error.response.data.message;
      } else {
        return '등록되지 않은 매장 ID입니다';
      }
    } else {
      console.error(error);
    }
  }
};
export const changeToken = async data => {
  try {
    const response = await API.post('/api/v1/user/change/token', data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
