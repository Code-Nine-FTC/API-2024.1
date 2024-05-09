import styles from './Chat.module.css'
import enviarIcon from '../../assets/chat/sendicon.svg'
import { useState } from 'react'
import EnviarMensagemFunc from '../../functions/Chat/enviarMensagemFunc'
import getDate from '../../functions/verData'


const EnviarMensagem = () => {

    const nivel = localStorage.getItem('nivel')
    
    const id = 1

    const cha_id = id

    const usuario = localStorage.getItem('nivel')

    const [texto, setTexto] = useState('');
    const mensagem = {
        resp_mensagem_resposta: texto,
        resp_feita_por_atendente: false,
        resp_data_resposta: '',
        chamado: id
    }

    if (nivel === 'usuario') {
        mensagem.resp_feita_por_atendente = false
    }
    else {
        mensagem.resp_feita_por_atendente = true
    }


    

    // const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    //     const mensagemEnviada = target;
    //     setMensagem(mensagemEnviada)
    // }

    const handleChange = (event:any) => {
        setTexto(event.target.value)
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const dataAtual = getDate()
            const { hora, minuto, segundo } = dataAtual
            mensagem.resp_data_resposta = `${hora}:${minuto}:${segundo}`
            console.log('Enviando mensagem')
            console.log(mensagem)
            const resultado = await EnviarMensagemFunc(mensagem);
            if (resultado.sucess){
                
            }
            
        }
        catch (error: any) {
            alert(error.message)
        }
    } 
    
    return (
        <div className={styles.enviarMensagem}>
            <form method="POST" onSubmit={handleSubmit}className={styles.formMensagem}>
                <input type="text" name="mensagem" value={texto} onChange={handleChange} placeholder="Mensagem"/>
                <button className={styles.enviarButton} type="submit">
                    <img src={enviarIcon} className="enviarIcon" alt="Enviar Mensagem"/>
                </button>
            </form>
        </div>
    )
}

export default EnviarMensagem