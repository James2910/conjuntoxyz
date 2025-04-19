import { createSlice } from '@reduxjs/toolkit';

export const HamburgerSlice = createSlice({
  name: 'hamburger',
  initialState: {
    open: false,
    activeOption: 1,
  },
  reducers: {
    toggleModal: (state) => {
      state.open = !state.open;
    },
    openModal: (state) => {
      state.open = true;
    },
    closeModal: (state) => {
      state.open = false;
    },
    setActiveOption: (state, action) => {
      state.activeOption = action.payload;
    },
  },
});

// Exporta las acciones
export const { toggleModal, openModal, closeModal, setActiveOption } = HamburgerSlice.actions;

// Exporta el reducer
export default HamburgerSlice.reducer;
