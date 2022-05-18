import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenModal: {
    imageCropper: false,
    tts: false,
    syncRobot: false,
  },
  currentMode: {
    serving: 0,
    cruise: 0,
    guide: 0,
    promote: 0,
  },
  bgm: "",

  currentCustomize: {
    mode: "/",
    scene: "",
  },

  currentLayoutIndexByScene: {
    move: "1",
    birthday: "1",
    arrive: "1",
    cruise: "1",
    wait: "1",
    promote: "1",
    checkReservation: "1",
    checkPersonCount: "1",
    guideMove: "1",
    guideArrive: "1",
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setOptionValue: (state, action) => {
      state.optionValue = action.payload;
    },
    // setIsOpenModal: (state, action) => {
    //   // 어디 modal인지 정보 필요
    // },
    // setCurrentMode: (state, action) => {
    //   // 무슨 mode인지 정보 필요
    // },
    setCurrentCustomize: (state, action) => {
      state.currentCustomize[action.payload.key] = action.payload.value;
    },
    setCurrentLayoutIndexByScene: (state, action) => {
      state.currentLayoutIndexByScene[state.currentCustomize.scene] =
        action.payload;
    },
  },
});

export const {
  setOptionValue,
  setCurrentCustomize,
  setCurrentLayoutIndexByScene,
} = appSlice.actions;
export default appSlice.reducer;
