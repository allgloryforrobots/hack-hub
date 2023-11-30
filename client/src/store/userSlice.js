import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: false,
    user: null
}

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            // а стоит ли это делать в reducer?
            state.isAuth = false
            state.user = null
        },
        setAuth: (state) => {
            state.isAuth = true
        },
        // incrementByAmount: (state, action) => {
        //     state.value += action.payload
        // },
        setUser: (state, action) => {
            state.user = action.payload
            state.isAuth = true
        }
    },
})

export const { logout, setAuth, setUser } = userSlice.actions
export default userSlice.reducer