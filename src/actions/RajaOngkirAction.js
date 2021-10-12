import axios from 'axios';
import {
  API_HEADER_RAJAONGKIR,
  API_RAJAONGKIR,
  API_TIMEOUT,
} from '../utils/constant';

export const GET_PROVINSI = 'GET_PROVINSI';
export const GET_KOTA = 'GET_KOTA';

export const getProvinsiList = () => {
  return dispacth => {
    // LOADING
    dispacth({
      type: GET_PROVINSI,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    axios({
      method: 'get',
      url: API_RAJAONGKIR + 'province',
      timeout: API_TIMEOUT,
      headers: API_HEADER_RAJAONGKIR,
    })
      .then(response => {
        if (response.status !== 200) {
          // ERROR
          dispacth({
            type: GET_PROVINSI,
            payload: {
              loading: false,
              data: false,
              errorMessage: response,
            },
          });
        } else {
          // BERHASIL
          dispacth({
            type: GET_PROVINSI,
            payload: {
              loading: false,
              data: response.data ? response.data.rajaongkir.results : [],
              errorMessage: false,
            },
          });
        }
      })
      .catch(error => {
        // ERROR
        dispacth({
          type: GET_PROVINSI,
          payload: {
            loading: false,
            data: false,
            errorMessage: error,
          },
        });
        alert(error);
      });
  };
};

export const getKotaList = provinsi_id => {
  return dispacth => {
    // LOADING
    dispacth({
      type: GET_KOTA,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    axios({
      method: 'get',
      url: API_RAJAONGKIR + 'city?province=' + provinsi_id,
      timeout: API_TIMEOUT,
      headers: API_HEADER_RAJAONGKIR,
    })
      .then(response => {
        if (response.status !== 200) {
          // ERROR
          dispacth({
            type: GET_KOTA,
            payload: {
              loading: false,
              data: false,
              errorMessage: response,
            },
          });
        } else {
          // BERHASIL
          dispacth({
            type: GET_KOTA,
            payload: {
              loading: false,
              data: response.data ? response.data.rajaongkir.results : [],
              errorMessage: false,
            },
          });
        }
      })
      .catch(error => {
        // ERROR
        dispacth({
          type: GET_KOTA,
          payload: {
            loading: false,
            data: false,
            errorMessage: error,
          },
        });
        alert(error);
      });
  };
};
