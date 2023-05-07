export const counterSlice = createSlice({
  name: 'auth',
  initialState: {
    login: null,
    userId: null,
    isAuth: false,
    refreshToken: null,
  },
  reducers: {
    setAuthData: (state, action) => {
      state.login = action.login;
      state.userId = action.userId;
      state.refreshToken = action.refreshToken;
      state.isAuth = true;
    },
  }
})

// Action creators are generated for each case reducer function
export const { setAuthData } = counterSlice.actions

export default counterSlice.reducer