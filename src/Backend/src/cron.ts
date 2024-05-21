import cron from 'node-cron'
import ChamadoService from './services/chamadoService'

// Criação da instância 
const chamadoService = new ChamadoService()

// Agenda uma tarefa para ser feita a cada 10 minutos
const tarefaSla = cron.schedule('* * * * *', async()=>{
    try{
        const resultado = await chamadoService.verificarSLA()
        console.log(resultado.message)
    }catch(error){
        console.error(`Erro ao verificar Sla ${error}`)
    }
    
})

export default tarefaSla