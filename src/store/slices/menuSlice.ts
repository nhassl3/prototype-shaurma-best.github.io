import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import MENU from '../../data/menu'

interface MenuState {
	activeIndex: number;
}

const initialState: MenuState = { activeIndex: 0};

const menuSlice = createSlice({
	name: "menu",
	initialState,
	reducers: {
		setIndex(state, action: PayloadAction<number>) {
			state.activeIndex = action.payload;
		},
		next(state) {
			state.activeIndex = (state.activeIndex+1) % MENU.length;
		},
		prev(state) {
			state.activeIndex = (state.activeIndex-1) % MENU.length;
		},
	},
});

export const { setIndex, next, prev } = menuSlice.actions;
export default menuSlice.reducer;