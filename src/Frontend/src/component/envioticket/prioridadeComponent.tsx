import styles from '../statusBox/statusBox.module.css'

const Prioridade = ({prioridade} : {prioridade: string}) => {
  var cor = ''
  var texto = ''

  switch (prioridade) {
    case 'baixa':
      cor = '6C63FF';
      texto = 'Baixa';
      break;
    case 'média':
      cor = 'FFB932';
      texto = 'Média';
      break;
    case 'alta':
      cor = 'FF3434'
      texto = 'Alta';
      break;

  }

  return (
    <>
      <button className={styles.prioridadeButton} style={{backgroundColor: `#${cor}`}}>{texto}</button>
    </>
  )
};

export default Prioridade;