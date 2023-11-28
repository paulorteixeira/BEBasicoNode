import { Document } from 'mongoose';

interface User extends Document {
    nome: string;
    email: string;
    senha: string;
    fotoPerfil: string;
}

export default User;
