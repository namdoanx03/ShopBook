import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated:false,
    isLoading : true,
    user: {
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: ""
    },
    tempAvatar: ""
};

export const accountSlide = createSlice({
    name: 'account',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
       doLoginAction: (state, action) => {
            state.isAuthenticated = true
            state.isLoading = false
            state.user = action.payload
       },
        doGetAccountAction: (state, action) => {
            state.isAuthenticated = true
            state.isLoading = false
            state.user = action.payload.user
        },
        // eslint-disable-next-line no-unused-vars
        doLogoutAction: (state, action) => {
            localStorage.removeItem("access_token")
            state.isAuthenticated = false
            state.user ={ 
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            }
        },
        doUpdateUserInfoAction: (state, action) => {
            state.user.avatar = action.payload.avatar;
            state.user.phone = action.payload.phone;
            state.user.fullName = action.payload.fullName;
        },

        doUploadAvatarAction: (state, action) => {
            state.tempAvatar = action.payload.avatar
        }
    },
    
    
});

export const { doLoginAction, doGetAccountAction, doLogoutAction, doUpdateUserInfoAction, doUploadAvatarAction } = accountSlide.actions;


export default accountSlide.reducer;
