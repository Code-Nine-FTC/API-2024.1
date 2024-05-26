import "reflect-metadata";
import { DataSource } from "typeorm"; // conexão com o banco de dados
import Cliente from "../entities/cliente";
import Funcionario from "../entities/funcionario";
import Chamado from "../entities/chamado";
import Resposta from "../entities/resposta";
import Faq from "../entities/faq";
import { config } from "dotenv";
import path from 'path';
import Categoria from "../entities/categoria";

config({ path: path.resolve(__dirname, '.env') });

export const Connection = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT|| '3306'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Cliente, Funcionario, Chamado, Resposta, Faq, Categoria],
    migrations: [],
    subscribers: [],
});
