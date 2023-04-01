import { rest } from 'msw';
import { db } from '../db';

export const instructors = [
  rest.get('/instructors', async (req, res, ctx) => {
    return await res(
      ctx.status(200),
      ctx.json({
        instructors: db.instructor.getAll(),
      })
    );
  }),
];
