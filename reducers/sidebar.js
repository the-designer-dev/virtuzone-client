import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const SidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    sidebar: true,
  },
  reducers: {
    setSidebar(state, action) {
      state.sidebar = !state.sidebar;
    },
  },
});

export const {setSidebar} = SidebarSlice.actions;
export default SidebarSlice.reducer;
