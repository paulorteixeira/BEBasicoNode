import { Schema, model } from 'mongoose';
import User from '@/utils/interfaces/userInterface';

const UserSchema = new Schema(
    {
        // User: Nome, CPF, Data de nascimento, Celular, Email, Senha, Lembrete(quer receber mensagem?SMS,email
        nome: { type: String, require: true },
        email: { type: String, require: true },
        senha: { type: String, require: true, select: false },
        fotoPerfil: { type: String, require: false },

    },
    {
        timestamps: true,
    },
);

export default model<User>('User', UserSchema);
