import express from 'express'
import cors from 'cors'
import 'reflect-metadata'
import { Connection } from './config/data-source'
import dotenv from 'dotenv';
import path from 'path';
import clienteRoutes from './routes/clienteRoutes'

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config({ path: path.resolve(__dirname, '.env') })

//inicializa a aplicação
const app = express()

app.use(cors())
app.use(express.json()) 
app.use(clienteRoutes)

//inicializa o banco de dados e da start se estiver ok!
Connection.initialize().then(async () => {
    console.log(`Conexão com o banco de dados bem sucedida! :)`)
    const port = process.env.PORT || 3000
    app.listen(port, ()=> {
        console.log(`Servido rodando na porta ${port}`)
    })
})
