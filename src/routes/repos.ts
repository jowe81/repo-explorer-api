import { Router, Request, Response } from 'express';
import { getAggregate } from '../helpers/repodata';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  const sources = [
    './data/repos.json',
    'https://api.github.com/users/silverorange/repos',
  ];
  getAggregate(sources).then((jsonData) => {
    res.json(jsonData);
  });
});
