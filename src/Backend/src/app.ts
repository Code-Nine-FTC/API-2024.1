import express from 'express'
import cors from 'cors'
import 'reflect-metadata'
import { Connection } from './config/data-source'
import dotenv from 'dotenv';
import path from 'path';
import clienteRoutes from './routes/clienteRoutes'
import funcionarioRoutes from './routes/funcionarioRoutes'
import Funcionario from './entities/funcionario';
import * as bcrypt from 'bcrypt';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config({ path: path.resolve(__dirname, '.env') })

//inicializa a aplicação
const app = express()

app.use(cors())
app.use(express.json()) 
app.use(clienteRoutes)
app.use(funcionarioRoutes)

app.use((req, res, next) => {
    console.log('Incoming request:');
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

//inicializa o banco de dados e da start se estiver ok!
Connection.initialize().then(() => {
    console.log(`Conexão com o banco de dados bem sucedida! :)`)
    insertAdmin().catch(error => {
        console.log(`Erro ao inserir administrador: `,error)
    })
    const port = process.env.PORT || 3000
    app.listen(port, ()=> {
        console.log(`Servido rodando na porta ${port}`)
    })
}).catch(error => {
    console.error("Erro ao inicializar conexão com o banco de dados:", error);
});
async function insertAdmin(){
        const funcionarioRepository = await Connection.getRepository(Funcionario)
        const count = await funcionarioRepository.count()
        const admin = await funcionarioRepository.findOne({where: {func_is_admin: true}})
        if (count === 0 || !admin)  {
            const administrador = new Funcionario()
            administrador.func_nome ='CodeNine'
            administrador.func_cpf ='41094483877'
            administrador.func_email='nine.codek9@gmail.com'
            administrador.func_expediente_inicio ='00:00:00'
            administrador.func_expediente_final ='00:00:00'
            administrador.func_is_admin =true
            let senha = bcrypt.hash('CodeNine', 10)
            administrador.func_senha = senha
            await funcionarioRepository.save(administrador)
            console.log(`Administrador inserido com sucesso`)
        }    
    }