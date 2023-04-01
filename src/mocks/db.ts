import { faker } from '@faker-js/faker';
import { factory, primaryKey } from '@mswjs/data';

faker.seed(123);

const courseCategory = ['AM', 'A1', 'A2', 'A', 'B', 'B1', 'B2', 'C+E', 'D'];

export const db = factory({
  instructor: {
    id: primaryKey(faker.datatype.uuid),
    firstName: faker.name.firstName,
    lastName: faker.name.lastName,
    city: faker.address.cityName,
    avatar: faker.internet.avatar,
    email: String,
    phone: () => faker.phone.number('!##-###-###'),
    license: () => courseCategory.slice(faker.datatype.number({ min: 0, max: courseCategory.length - 1 })),
  },
});
