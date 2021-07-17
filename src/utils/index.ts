var validator = require('validator');
import axios from 'axios';
import {Alert} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import prompt from 'react-native-prompt-android';

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
        .post(REST_DOMAIN + 'restore', {email})
        .then(data => resolve(data.data))
        .catch(e => reject(e)),
    ),
  createGroup: token => {
    const query =
      'mutation{createGroup(group:{name:"Genesis Group"}){code, createdAt}}';
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
  leaveGroup: token => {
    const query = `mutation{leaveGroup{code, createdAt}}`;
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
  updateGroup: (token, date) => {
    const query = `mutation{updateGroup(group: {createdAt: "${date.toISOString()}"}){createdAt}}`;
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

  getImageCode: (token, uri) =>
    new Promise((resolve, reject) => {
      // const fs = RNFetchBlob.fs;
      // RNFetchBlob.fs
      //   .readFile(uri, 'base64')
      //   .then(data => {
      //     console.log(data);
      //     resolve(data);
      //   })
      //   .catch(e => reject(e));
      console.log('fetch');
      RNFetchBlob.fetch(
        'POST',
        REST_DOMAIN + 'image',
        {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
          ContentType: 'multipart/form-data',
        },
        [
          {
            name: 'image',
            filename: 'image.png',
            type: 'image/png',
            data: RNFetchBlob.wrap(uri),
          },
        ],
      )
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(e => reject(e));
    }),
  getVideoCode: (token, uri) =>
    new Promise((resolve, reject) => {
      // const fs = RNFetchBlob.fs;
      // RNFetchBlob.fs
      //   .readFile(uri, 'base64')
      //   .then(data => {
      //     console.log(data);
      //     resolve(data);
      //   })
      //   .catch(e => reject(e));
      console.log('fetch');
      RNFetchBlob.fetch(
        'POST',
        REST_DOMAIN + 'video',
        {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
          ContentType: 'multipart/form-data',
        },
        [
          {
            name: 'video',
            filename: 'video.mp4',
            type: 'video/mp4',
            data: RNFetchBlob.wrap(uri),
          },
        ],
      )
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(e => reject(e));
    }),
  showConfirmDialog: (cb, title, content, mainBtn) => {
    return Alert.alert(title, content, [
      {
        text: mainBtn,
        onPress: () => {
          cb();
        },
      },
      {
        text: 'Cancel',
      },
    ]);
  },
  showInput: (title, cb, def) => {
    console.log(title);
    prompt(
      title,
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Submit',
          onPress: cb,
        },
      ],
      {
        cancelable: false,
        defaultValue: def,
      },
    );
  },
  updateUser: (token, {name, phone, birthday, avatar, password}) => {
    let query = '';
    password &&
      password.length >= 8 &&
      (query = `mutation{updateUser(user: {password: "${password}"}){phone}}`);
    name &&
      name.length &&
      (query = `mutation{updateUser(user: {name: "${name}"}){name}}`);
    phone &&
      phone.length &&
      (query = `mutation{updateUser(user: {phone: "${phone}"}){phone}}`);
    birthday &&
      birthday.length &&
      (query = `mutation{updateUser(user: {birthday: "${birthday}"}){birthday}}`);
    avatar &&
      (query = `mutation{updateUser(user: {avatar: "${avatar}"}){avatar}}`);
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
  sendChat: (token, {text, image, video}) => {
    let query = '';
    text &&
      text.length &&
      (query = `mutation{sendChat(chat:{text:\"${text}\"}){text,createdAt}}`);

    image &&
      image &&
      (query = `mutation{sendChat(chat:{image:\"${image}\"}){image,createdAt}}`);
    video &&
      video.length &&
      (query = `mutation{sendChat(chat:{video:\"${video}\"}){video,createdAt}}`);
    console.log('query', query);
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
};
