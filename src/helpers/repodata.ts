import axios from 'axios';
import { readFile } from 'node:fs/promises';

const getFromURL = (path: string) => {
  console.log(`Getting from URL ${path}`);
  return axios.get(path);
};

const getFromFile = (path: string) => {
  console.log(`Getting from File ${path}`);
  return readFile(path, 'utf8');
};

const isURL = (path: string) => {
  return ['http://', 'https:/'].includes(path.substring(0, 7));
};

const get = (path: string) => {
  return new Promise((resolve, reject) => {
    if (isURL(path)) {
      getFromURL(path)
        .then((res) => resolve(res.data))
        .catch(reject);
    } else {
      getFromFile(path)
        .then((data) => resolve(JSON.parse(data)))
        .catch(reject);
    }
  });
};

const getAggregate = (paths: string[]) => {
  return new Promise((resolve, reject) => {
    const promises: any = [];
    let results: object[] = [];
    paths.forEach((path) => promises.push(get(path)));
    Promise.all(promises).then((data) => {
      data.forEach((records) => {
        results = [...results, ...records];
      });
      resolve(results);
    });
  });
};

export { getFromURL, getFromFile, get, getAggregate };
