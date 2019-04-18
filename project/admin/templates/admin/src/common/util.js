import React from 'react';
import axios from 'axios';
import CONST from './const';

export default class Util extends React.Component{
  static getAPI=(url)=>{
    url = CONST.APIHOST + url;

    return axios.get(url)
      .then(response=>{
        if(response.headers['content-type'] === 'application/json; charset=utf-8'){
          return response;
        }else{
          return [];
        }
      })
      .catch(err=>{
        console.error(err);
        return [];
      })
  }

  static deleteAPI=(url)=>{
    url = CONST.APIHOST + url;
    console.log(url);

    return axios.post(url)
      .then(response=>{
        console.log(response);
        return response;
      })
      .catch(err=>{
        console.error(err);
        return [];
      })
  }
}