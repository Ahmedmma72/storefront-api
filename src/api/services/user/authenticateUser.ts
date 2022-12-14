
import { compareSync } from 'bcrypt';
import getUserByEmail from './getUserByEmail';


const authenticateUser = async ( email : string , password : string ) => {
    try{
        const user = await getUserByEmail(email);
        if(user && compareSync(`${password}${process.env.PEPPER}`, user.password)){
            return user;
        } else {
            return null;
        }
    }catch(err){
        throw new Error(`Could not authenticate user ${email}. Error: ${err}`);
    }
}

export default authenticateUser;