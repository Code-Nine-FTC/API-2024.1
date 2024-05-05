import React from 'react';
import myImage from '../../assets/fotoperfil/perfil.svg';
import styles from './Imagemperfil.module.css'; 



const ImageComponent: React.FC = () => {
  return (
    <div className={styles.imagecontainer}>
      <img src={myImage} alt="Imagem do perfil" />
      
    </div>
  );
}

export default ImageComponent;
