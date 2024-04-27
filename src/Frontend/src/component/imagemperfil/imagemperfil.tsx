import React from 'react';
import myImage from '../../assets/fotoperfil/perfil.svg';
import styles from './Imagemperfil.module.css'; 

interface ImageComponentProps {
  nome: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ nome }) => {
  return (
    <div className={styles.imagecontainer}>
      <img src={myImage} alt="Imagem do perfil" />
      <h3>{nome}</h3>
    </div>
  );
}

export default ImageComponent;
