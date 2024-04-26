import React from 'react';
import myImage from '../../assets/fotoperfil/perfil.svg';
import './imagemperfil.css'; 

interface ImageComponentProps {
  nome: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ nome }) => {
  return (
    <div className="image-container">
      <img src={myImage} alt="Imagem do perfil" />
      <h3>{nome}</h3>
    </div>
  );
}

export default ImageComponent;
