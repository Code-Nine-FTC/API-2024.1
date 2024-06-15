import React, { useState } from 'react';
import Sidebar from "../component/sidebar/sidebar";
import CadastroCategoriaAdm from "../functions/categoria/criarCategoriaAdm";
import styles from '../component/chamadoAdm/chamadoAdm.module.css';
import { toast, Toaster } from 'react-hot-toast';

const TicketAdm = () => {
    const [formData, setFormData] = useState({ 
        cat_titulo: '',
        cat_horario: '',
        cat_prioridade: '' 
    });
    

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        
        try {
            const verificaCampoVazio = Object.values(formData).some(value => 
                typeof value === 'string' && (value.trim() === "" || value.trim().length === 0)
              );
          
              if (verificaCampoVazio ) {
                toast.error("Por favor, preencha todos os campos corretamente.");
                return;
              }
        
           const resultado = await CadastroCategoriaAdm(formData);
           if (resultado?.success){
            console.log(formData)
            toast.success(resultado.message);
           }
           else {
            let errorMessage = resultado?.message || 'Erro ao adicionar categoria, tente novamente mais tarde.';
            toast.error(errorMessage);
           }
        } catch (error: any) {
            let errorMessage = error.message || 'Erro ao adicionar categoria, tente novamente mais tarde.';
            toast.error(errorMessage);
            // alert('Erro ao criar categoria.');
            console.error(error);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
        <div>
            <Toaster 
            position="top-center"
            reverseOrder={false}
            />
         </div>
            <Sidebar/>
            <div className={styles.container}>
                <header className={styles.title}>
                    <h1>Criar categorias</h1>
                    <br />
                    <br />
                    <hr className={styles.linha} />
                </header>
                <form className={styles.form} onSubmit={handleFormSubmit}>
                    <div>
                        <br />
                        <input
                            className={styles.seletor}
                            type="text"
                            id="cat_titulo"
                            name="cat_titulo"
                            maxLength={25}
                            placeholder="Título da categoria"
                            value={formData.cat_titulo}
                            onChange={handleInputChange}
                            required
                        />
                        <br />
                    </div>
                    <br />
                    <div>
                        <br />
                        <select
                            className={styles.seletor}
                            name="cat_horario"
                            value={formData.cat_horario}
                            onChange={handleInputChange}
                            required
                        >
                            <option disabled value="">Horário</option>
                            <option value="00:03:00">00:03:00</option>
                            <option value="00:02:00">00:02:00</option>
                            <option value="00:01:00">00:01:00</option>
                        </select>
                    </div>
                    <br />
                    <div>
                        <br />
                        <select
                            className={styles.seletor}
                            name="cat_prioridade"
                            value={formData.cat_prioridade}
                            onChange={handleInputChange}
                            required
                        >
                            <option disabled value="">Prioridade</option>
                            <option value="alta">Alta</option>
                            <option value="média">Média</option>
                            <option value="baixa">Baixa</option>
                        </select>
                    </div>
                    <br />
                    <div className={styles.buttonsContainer}>
                        <button type="submit" id={styles.Editar}>Salvar</button>
                        <button type="button" id={styles.OutroBotao} onClick={() => setFormData({ cat_titulo: '', cat_horario: '', cat_prioridade: '' })}>Cancelar</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default TicketAdm;