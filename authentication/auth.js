import bcrypt from 'bcrypt';

const saltround = 10;

const hashedPassword = await bcrypt.hash(password, saltround);

const match = await bcrypt.compare(inputPassword, storedHash);

if(!match) {
    return res.status(404).send({error: "Password does not match"})
}