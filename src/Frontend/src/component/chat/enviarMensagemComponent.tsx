import styles from './Chat.module.css'
import enviarIcon from '../../assets/chat/sendicon.svg'
import { useState } from 'react'
import EnviarMensagemFunc from '../../functions/Chat/enviarMensagemFunc'
import getDate from '../../functions/verData'
import RecebeData from '../../functions/dataString'
import { getNivelAcesso } from '../../services/auth'
import Swal from 'sweetalert2';

const EnviarMensagem = ({ id }: { id: number })=> {

    const nivel = getNivelAcesso()

    const [texto, setTexto] = useState('');
    const mensagem = {
        texto: texto,
        autoria: false,
        data: '',
        chamado: id
    }

    if (nivel !== 'usuario') {
        mensagem.autoria = true
    }

    const handleChange = (event:any) => {
        setTexto(event.target.value)
        mensagem.texto = event.target.value
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (mensagem.texto.length > 300 || mensagem.texto === '') {
            Swal.fire({
                title: 'Erro',
                text: 'A mensagem é invalida',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
        else{
            try {
                const dataAtual = getDate()
                const { hora, minuto, segundo } = dataAtual
                const data = `${hora}:${minuto}:${segundo}`
                mensagem.data = data
                console.log('Enviando mensagem')
                console.log(mensagem)
                const resultado = await EnviarMensagemFunc(mensagem);
                if (resultado.success){
                    alert('Funcionou')
                    setTexto('')
                }
            }
            catch (error: any) {
                alert(error.message)
            }
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