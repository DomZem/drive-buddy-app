import { setupWorker } from 'msw';
import { db } from './db';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

const seed = () => {
  for (let i = 0; i < 20; i++) {
    const instructor = db.instructor.create();
    instructor.email = `${instructor.firstName}.${instructor.lastName}@gmail.com`.toLowerCase();
  }
};

seed();
