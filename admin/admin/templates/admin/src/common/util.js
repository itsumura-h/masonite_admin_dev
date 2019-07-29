import React from 'react';
import axios from 'axios';
import CONST from './const';
import {store} from './store';

export default class Util extends React.Component{

  static contentType=()=>{
    return new FormData();
    // return new URLSearchParams();
  }

  static getAPI=(url, params={})=>{
    url = CONST.APIHOST + url;
    params = this.setLoginParamas(params);
    const header = this.setCustomLoginHeader();

    // return axios.get(url, {params: params, headers: header})
    return axios.get(url, {params: params})
      .then(response=>{
        return response;
      })
      .catch(err=>{
        this.loginFale(err);
        console.error(err);
        return [];
      })
  }

  static postAPI=(url, params)=>{
    url = CONST.APIHOST + url;
    params = this.setLoginParamas(params);

    const newParams = this.contentType();
    Object.keys(params).forEach((key)=>{
      newParams.append(key, params[key]);
    });

    return axios.post(url, newParams)
      .then(response=>{
        return response;
      })
      .catch(err=>{
        this.loginFale(err);
        return err.response;
      })
  }

  static putAPI=(url, params)=>{
    url = CONST.APIHOST + url;
    params = this.setLoginParamas(params);

    const newParams = this.contentType();
    Object.keys(params).forEach((key)=>{
      newParams.append(key, params[key]);
    });

    return axios.post(url, newParams)
      .then(response=>{
        return response;
      })
      .catch(err=>{
        this.loginFale(err);
        return err.response;
      })
  }

  static deleteAPI=(url, params={})=>{
    url = CONST.APIHOST + url;
    params = this.setLoginParamas(params);

    const newParams = new FormData();
    Object.keys(params).forEach((key)=>{
      newParams.append(key, params[key]);
    });

    return axios.post(url, newParams)
      .then(response=>{
        return response;
      })
      .catch(err=>{
        this.loginFale(err);
        return err.response;
      })
  }

  static loginApi=(url, params)=>{
    url = CONST.APIHOST + url;

    const newParams = new FormData();
    Object.keys(params).forEach((key)=>{
      newParams.append(key, params[key]);
    });

    return axios.post(url, newParams)
      .then(response=>{
        return response;
      })
      .catch(err=>{
        console.error(err);
        return err.response;
      })
  }

  static logoutApi=()=>{
    const url = CONST.APIHOST + '/admin/api/logout';

    const params = new FormData();
    params.append('login_id', window.localStorage.getItem('login_id'));
    params.append('login_token', window.localStorage.getItem('login_token'));

    return axios.post(url, params)
      .then(response=>{
        return response;
      })
      .catch(err=>{
        console.error(err);
        return err.response;
      })
  }

  static setLoginParamas=(params)=>{
    params['login_id'] = window.localStorage.getItem('login_id');
    params['login_token'] = window.localStorage.getItem('login_token');
    params['login_permission'] = window.localStorage.getItem('login_permission');

    return params;
  }

  static setCustomLoginHeader=()=>{
    return {
      'X-LOGIN-ID': window.localStorage.getItem('login_id'),
      'X-LOGIN-TOKEN': window.localStorage.getItem('login_token'),
      'X-LOGIN-PERMISSION': window.localStorage.getItem('login_permission')
    }
  }

  static loginFale=(error)=>{
    if(error.response && error.response.status === 403){
      window.localStorage.removeItem('login_id');
      window.localStorage.removeItem('login_token');
      window.localStorage.removeItem('login_name');
      window.localStorage.removeItem('login_permission');
      window.location.href = '/admin/login';
    }
  }

  static dateToString=(date, format)=>{
    format = format.replace(/YYYY/, date.getFullYear());
    format = format.replace(/MM/, date.getMonth() + 1);
    format = format.replace(/DD/, date.getDate());
    return format;
  }

  static setModelTitle=()=>{
    const model_en_url = window.location.pathname.split('/')[2];
    const model_en_store = store.get('modelStr')['en'];

    model_en_url !== model_en_store &&
    Object.keys(store.get('info')).length > 0 &&
      store.get('info').models.some(model=>{
        if(window.location.pathname.split('/')[2] === model['en']){
          store.set('modelStr')(model);
          return true;
        }
        return false;
      });
  }
}
