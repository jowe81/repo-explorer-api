# Repo-Explorer
- This is my solution to the SilverOrange screening assignment.
- Thanks for the learning opportunity!

## Also important to know
- As a new developer who just graduated from Bootcamp the assignment took me much longer than 4 hours.
- Typescript was not part of the schooling program and I haven't had exposure to it, hence the poor use of it.

## Run the Express API server
```sh
git clone https://github.com/jowe81/repo-explorer-api
cd repo-explorer-api
yarn install
yarn start
```
Note: The API pulls from Github on every request to the ```/repos``` endpoint. A way to improve it would be to implement caching of the data and to just check Github periodically for changes.

## Run the React app
```sh
git clone https://github.com/jowe81/repo-explorer
cd repo-explorer
yarn install
yarn start
```
Note: The React App expects the [API Server](https://github.com/jowe81/repo-explorer-api) at localhost:4000 (see [https://github.com/jowe81/repo-explorer/blob/main/src/hooks/useApplicationData.tsx](https://github.com/jowe81/repo-explorer/blob/main/src/hooks/useApplicationData.tsx))

