import { rest } from 'msw';
import { setupServer } from 'msw/node';

// eslint-disable-next-line import/no-unresolved
import zoneCreate from './zone.create.json';

const handler = [
  rest.post('/api/packages', (req, res, ctx) => {
    return res(ctx.json(zoneCreate));
  }),
];

export default setupServer(...handler);
