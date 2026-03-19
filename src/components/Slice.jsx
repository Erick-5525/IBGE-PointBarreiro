import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchIbgeData = createAsyncThunk(
    'ibge/fetchData',
    async (endpoint) => {
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/${endpoint}`);
        const data = await response.json();
        return data;
    }
);

const ibgeSlice = createSlice({
    name: 'ibge',
    initialState: {
        estados: [],
        municipios: [],
        regioes: [],
        loading: false,
        error: null
    },
    reducers: {
        clearMunicipios: (state) => {
            state.municipios = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIbgeData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchIbgeData.fulfilled, (state, action) => {
                state.loading = false;
                const endpointUtilizado = action.meta.arg;

                if (endpointUtilizado.includes('municipios')) {
                    state.municipios = action.payload;
                }
                else if (endpointUtilizado.endsWith('estados')) {
                    state.estados = action.payload;
                }
                else if (endpointUtilizado === 'regioes') {
                    state.regioes = action.payload;
                }
            })
            .addCase(fetchIbgeData.rejected, (state) => {
                state.loading = false;
                state.error = "Erro ao buscar dados do IBGE";
            });
    },
});

export const { clearMunicipios } = ibgeSlice.actions;
export default ibgeSlice.reducer;