import { rest } from 'msw';
import { db } from '../db';

interface InstructorsResponse {
  instructors: {
    username: string;
  };
}

export const instructors = [
  rest.get<InstructorsResponse>('/instructors', async (req, res, ctx) => {
    return await res(
      ctx.status(200),
      ctx.json({
        instructors: db.instructor.getAll(),
      })
    );
  }),

  rest.delete('/instructors/:id', async (req, res, ctx) => {
    const { id } = req.params;

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (id) {
      const removedInstructor = db.instructor.delete({
        where: {
          id: {
            equals: id,
          },
        },
      });

      return await res(
        ctx.status(200),
        ctx.json({
          removedInstructor,
        })
      );
    }

    return await res(
      ctx.status(400),
      ctx.json({
        error: 'Please provide ID of removed instructor',
      })
    );
  }),
];
