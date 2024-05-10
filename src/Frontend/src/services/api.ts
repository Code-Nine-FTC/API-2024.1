import axios from "axios";
import { getToken } from "./auth";

// Cria uma instância do Axios com baseURL configurada para o endereço da API
const api = axios.create({
    baseURL: 'http://127.0.0.1:5000'
})

// Interceptor de requisição para adicionar token de autenticação aos cabeçalhos de autorização
api.interceptors.request.use(async config =>{
    // Recupera o token de autenticação
    const token = getToken()

    // Verifica se o token esta presente e se existir, adiciona ao cabeçalhos de requisição
    if (token){
        config.headers.Authorization = `Bearer ${token}` 
    }

    // retorna a configuração da requisição atualizada com o token adicionado no cabeçalho
    return config
})

export default api