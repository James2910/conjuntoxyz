import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api'; // 👈 usamos la misma instancia que en BillsSlice

// 👥 Obtener residentes con filtros
export const getResidentes = createAsyncThunk(
  'home/getResidentes',
  async (filtros, thunkAPI) => {
    try {
      const response = await api.post('/residentes/search/all/filters', filtros);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error al obtener residentes');
    }
  }
);

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    data: null,
    residentes: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getResidentes.fulfilled, (state, action) => {
        state.residentes = action.payload;
      });
  },
});

export default homeSlice.reducer;
