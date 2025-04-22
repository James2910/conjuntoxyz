// features/facturas/facturasSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';


// 🧾 Buscar facturas con filtros
export const getFacturas = createAsyncThunk(
  'facturas/getFacturas',
  async (filtros, thunkAPI) => {
    try {
      const response = await api.post('facturas/search/all/filters', filtros);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error al obtener facturas');
    }
  }
);

// 📄 Obtener detalles de una factura específica por ID
export const getDetallesFactura = createAsyncThunk(
  'facturas/getDetallesFactura',
  async (idFactura, thunkAPI) => {
    try {
      const response = await api.get(`detallesFacturas/factura/${idFactura}`);
      return {
        idFactura,
        detalles: response.data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error al obtener detalles');
    }
  }
);

// 🏠 Obtener información del residente por ID
export const getResidente = createAsyncThunk(
  'facturas/getResidente',
  async (idResidente, thunkAPI) => {
    try {
      const response = await api.get(`residentes/${idResidente}`);
      return {
        idResidente,
        residente: response.data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error al obtener residente');
    }
  }
);

// 📄 Obtener detalles de la factura y la información del residente
export const getDetallesFacturaConResidente = createAsyncThunk(
  'facturas/getDetallesFacturaConResidente',
  async ({ idFactura, idResidente }, thunkAPI) => {
    try {
      const [detallesFacturaResponse, residenteResponse] = await Promise.all([
        api.get(`detallesFacturas/factura/${idFactura}`),
        api.get(`residentes/${idResidente}`)
      ]);

      return {
        idFactura,
        detalles: detallesFacturaResponse.data,
        residente: residenteResponse.data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error al obtener detalles de factura y residente');
    }
  }
);

const FacturasSlice = createSlice({
  name: 'bills', //'facturas',
  initialState: {
    data: [],
    detalles: {}, // clave = idFactura, valor = array de detalles
    residentes: {}, // clave = idResidente, valor = datos del residente
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFacturas.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getDetallesFactura.fulfilled, (state, action) => {
        const { idFactura, detalles } = action.payload;
        state.detalles[idFactura] = detalles;
      })
      .addCase(getDetallesFacturaConResidente.fulfilled, (state, action) => {
        const { idFactura, detalles, residente } = action.payload;
        state.detalles[idFactura] = detalles;
        state.residentes[residente.idResidente] = residente;
      });
  },
});

export default FacturasSlice.reducer;
