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

export const stageFile = (body, type) => postApi(body, `/${type}/stage`);

export const publishFile = (body, type) => postApi(body, `/${type}/publish`);

export const editFile = (body, type) => postApi(body, `/${type}/edit`);

export const fetchAll = type => getApi(`/${type}/all`);

export const logIn = (body, queryString) =>
  postApi(body, `/login${queryString}`);
