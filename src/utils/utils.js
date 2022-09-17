import faker from 'faker';
import bcrypt from 'bcrypt';
faker.locale = 'es';

export const generateProducts = () => {
  return {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    thumbnail: faker.image.imageUrl(),
  };
};

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);
