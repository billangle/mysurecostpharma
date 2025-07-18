import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './drugAPI';

export const fetchDrugs = createAsyncThunk('drugs/fetchAll', api.fetchDrugs);
export const addDrug = createAsyncThunk('drugs/add', api.createDrug);
export const updateDrug = createAsyncThunk('drugs/update', api.updateDrug);
export const deleteDrug = createAsyncThunk('drugs/delete', api.deleteDrug);

const drugSlice = createSlice({
  name: 'drugs',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrugs.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addDrug.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateDrug.fulfilled, (state, action) => {
        const index = state.items.findIndex(d => d.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteDrug.fulfilled, (state, action) => {
        state.items = state.items.filter(d => d.id !== action.payload);
      });
  },
});

export default drugSlice.reducer;