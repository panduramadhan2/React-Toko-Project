import FIREBASE from '../config/FIREBASE';
import {storeData} from '../utils';

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';

export const registerUser = (data, password) => {
  return dispatch => {
    // LOADING
    dispatch({
      type: REGISTER_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    FIREBASE.auth()
      .createUserWithEmailAndPassword(data.email, password)
      .then(success => {
        // Ambil UID, buat dataBaru (data+uid)

        const dataBaru = {
          ...data,
          uid: success.user.uid,
        };

        //Simpan ke Realtime Database Firebase
        FIREBASE.database()
          .ref('users/' + success.user.uid)
          .set(dataBaru);

        //SUKSES
        dispatch({
          type: REGISTER_USER,
          payload: {
            loading: false,
            data: dataBaru,
            errorMessage: false,
          },
        });

        //Local Storage (Async Storage)
        storeData('user', dataBaru);
      })
      .catch(error => {
        // ERROR
        dispatch({
          type: REGISTER_USER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
        alert(error.message);
      });
  };
};

export const loginUser = (email, password) => {
  return dispatch => {
    // LOADING
    dispatch({
      type: LOGIN_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    FIREBASE.auth()
      .signInWithEmailAndPassword(email, password)
      .then(success => {
        // Signed in
        FIREBASE.database()
          .ref('/users/' + success.user.uid)
          .once('value')
          .then(resDB => {
            if (resDB.val()) {
              //SUKSES
              dispatch({
                type: LOGIN_USER,
                payload: {
                  loading: false,
                  data: resDB.val(),
                  errorMessage: false,
                },
              });

              //Local Storage (Async Storage)
              storeData('user', resDB.val());
            } else {
              // ERROR
              dispatch({
                type: LOGIN_USER,
                payload: {
                  loading: false,
                  data: false,
                  errorMessage: 'Data user tidak ada',
                },
              });
              alert('Data user tidak ada');
            }
          });
        // ...
      })
      .catch(error => {
        console.log('Error : ', error);
        // ERROR
        dispatch({
          type: LOGIN_USER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
        alert(error.message);
      });
  };
};
