import bcrypt from "bcrypt";


export const hashPassword = (password: string) => {
    const salt = parseInt(process.env.SALT as string, 10);
    const pepper = process.env.PEPPER as string;
    const hash = bcrypt.hashSync(password + pepper, salt);
    return hash;
}
