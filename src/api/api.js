import axios from "axios";

const baseURL = 'http://localhost:5050/api';

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "X-Requested-With",
    "X-Requested-With": "XMLHttpRequest",
    // Authorization: JSON.parse(localStorage.getItem("Authorization")).token
  }
});

export const api = {
  async login(username, password) {
    const uri = '/auth/login';
    const body = { username: username, password: password }

    return instance.post(uri, body);
  },

  async loginByToken(token) {
    const uri = '/auth/login-by-token';
    const body = { token }

    return instance.post(uri, body).then(response => response.data
    )
      .catch(error => {
        debugger
      });
  },

  async register(userData) {
    const { username, password, dateOfBirth, email, country } = userData;

    const uri = '/auth/registration';
    const body = { username, password, dateOfBirth, email, country}

    return await instance.post(baseURL + uri, body)
      .then(response => {
        // response.data
        return { error: false }
      })
      .catch(err => {
        // debugger
        return { error: true, message: err.response.data }
      })
  },

  async refreshToken(refreshToken) {
    const uri = '/auth/refresh-token'
    return await instance.post(uri, { refreshToken: refreshToken }).then(response => {
      // debugger
      return {
        token: response.data.tokenType + ' ' + response.data.token,
        expirationDate: response.data.expirationDate
      };
    }).catch(error => {
      // debugger
    })
  },

  async getWords(token, userId) {
    const uri = '/words?user-id=' + userId;

    return await instance.get(uri, { headers: { Authorization: token } }).then(response => {
      debugger
      return response.data
    })
      .catch(err => {
        debugger;
      })
  },

  async addWord(token, userId, word, translation) {
    const uri = '/words';
    const body = { word: word, translation: translation, userId: userId }

    return await instance.post(uri, body, { headers: { Authorization: token } }).then(response => {
        // debugger
        return response.data
      }
    )
      .catch(err => {
        // debugger;
      })
  },

  async deleteWord(token, id) {
    const uri = '/words/' + id;

    return await instance.delete(uri, { headers: { Authorization: token } }).then(response => {
        // debugger
        return response.data
      }
    )
      .catch(err => {
        // debugger;
      })
  },

  async sendWordsForTesting(token, amount, method, userId) {
    const uri = `/testing?method=${method}&amount=${amount}&user-id=${userId}`;
    // debugger
    let requestedWords = {};
    await instance.get(uri, { headers: { Authorization: token } }).then(response => {
      debugger;
      requestedWords = response.data
    }).catch(err => {
      // debugger;
    });

    return requestedWords;
  }
}
