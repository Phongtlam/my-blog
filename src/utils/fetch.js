/* global fetch */

import apiUrl from '../urls';

export const api = (body, method, route) =>
  new Promise((resolve, reject) => {
    fetch(`${apiUrl.nodeServer}${route}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method,
      body: method === 'POST' ? JSON.stringify(body) : null
    })
      .then(res => resolve(res.json()))
      .catch(error => reject(error));
  });

const postApi = (body, route) => api(body, 'POST', route);

const getApi = route => api(null, 'GET', route);

export const stagePost = body => postApi(body, '/post/stage');

export const publishPost = body => postApi(body, '/post/publish');

export const fetchAllPosts = () => getApi('/post/allposts');
