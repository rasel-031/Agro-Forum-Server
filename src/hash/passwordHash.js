import bcrypt from 'bcrypt';

const passwordHash = (password) =>{
 return bcrypt.hash(password, 10);
}

export default passwordHash;