var validator = require('validator');
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';

const REST_DOMAIN = 'http://10.0.2.2:2021/rest/';
const GRAPH_DOMAIN = 'http://10.0.2.2:2021/graphql';
export default {
  isValidPassword: (password: string) => password.length >= 8,
  isValidUsername: (username: string) => username.length > 0,
  isValidName: (name: string) => name.length > 0,
  isValidCode: (code: string) => code.length === 5,
  isValidEmail: (email: string) => validator.isEmail(email),
  sendLogin: (username: string, password: string) =>
    new Promise((resolve, reject) =>
      axios
        .post(REST_DOMAIN + 'login', {username, password})
        .then(data => resolve(data.data))
        .catch(e => reject(e)),
    ),
  sendSignup: (
    name: string,
    username: string,
    email: string,
    password: string,
  ) =>
    new Promise((resolve, reject) =>
      axios
        .post(REST_DOMAIN + 'register', {
          name,
          username,
          email,
          password,
        })
        .then(data => resolve(data.data))
        .catch(e => reject(e)),
    ),
  sendValidate: token =>
    new Promise((resolve, reject) =>
      axios
        .post(REST_DOMAIN + 'validate', {token})
        .then(data => resolve(data.data))
        .catch(e => reject(e)),
    ),
  sendRestore: email =>
    new Promise((resolve, reject) =>
      axios
        .post(REST_DOMAIN + 'restore-pw', {email})
        .then(data => resolve(data.data))
        .catch(e => reject(e)),
    ),
  createGroup: token => {
    const query = 'mutation{createGroup(group:{name:"Genesis Group"}){code}}';
    return new Promise((resolve, reject) =>
      axios
        .post(
          GRAPH_DOMAIN,
          {query},
          {headers: {Authorization: 'Bearer ' + token}},
        )
        .then(data => resolve(data.data))
        .catch(e => reject(e)),
    );
  },
  joinGroup: (token, code) => {
    const query = `mutation{joinGroup(group:{code:\"${code}\"}){code, createdAt}}`;
    return new Promise((resolve, reject) =>
      axios
        .post(
          GRAPH_DOMAIN,
          {query},
          {headers: {Authorization: 'Bearer ' + token}},
        )
        .then(data => resolve(data.data))
        .catch(e => reject(e)),
    );
  },
  getImageBase64: uri => {
    const fs = RNFetchBlob.fs;
    let imagePath = '';
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', 'http://www.example.com/image.png')
      // the image is now dowloaded to device's storage
      .then(resp => {
        // the image path you can use it directly with Image component
        imagePath = resp.path();
        return resp.readFile('base64');
      })
      .then(base64Data => {
        // here's base64 encoded image
        console.log(base64Data);
        // remove the file from storage
        return fs.unlink(imagePath);
      });
  },
};
