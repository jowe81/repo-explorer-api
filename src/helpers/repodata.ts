import axios from 'axios';
import { readFile } from 'node:fs/promises';

const getFromURL = (path: string) => axios.get(path);

const getFromFile = (path: string) => readFile(path, 'utf8');

const isURL = (path: string) => {
  return ['http://', 'https:/'].includes(path.substring(0, 7));
};

/**
 * Read repo data from URL or file
 * @param path
 * @returns a promise to the repo data from the path
 */
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

/**
 * Read and aggregate repo data from files and/or URLs
 * @param paths an array with paths to files/URLs
 * @returns a promise to the repo data from all paths
 */
const getAggregate = (paths: string[]) => {
  return new Promise((resolve, reject) => {
    const promises: any = [];
    let results: any = [];
    paths.forEach((path) => promises.push(get(path)));
    Promise.all(promises)
      .then((data) => {
        data.forEach((records) => {
          results = [...results, ...records];
        });
        const filteredResults = results.filter(
          (record: any) => record.fork === false
        );
        resolve(filteredResults);
      })
      .catch(reject);
  });
};

export { get, getAggregate };
