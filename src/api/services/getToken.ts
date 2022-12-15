import jwt from 'jsonwebtoken';

const getToken = async (id: string|number) => {
    return jwt.sign({ id }, process.env.JWT_PRIVATE_KEY as string, {
      expiresIn: '30d',
    });
};

export default getToken;
 