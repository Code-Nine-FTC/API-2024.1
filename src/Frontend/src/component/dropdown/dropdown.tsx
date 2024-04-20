import React, { useState, useEffect } from 'react';
import { NavLink, useLocation} from 'react-router-dom';
import DropdownInterface from './dropdown.interface';

const Dropdown: React.FC<DropdownInterface> = ({items }) => {
    const location = useLocation() 
    const telaAtiva = location.pathname
    const [isAtivo, setIsAtivo] = useState(false);

    // Usa a rota atual para comparar se o item está ativo

    useEffect(() => {
        setIsAtivo(items.some(item => item.path === location.pathname));
    }, [items, location.pathname]);
    

    return (
        <ul className={`dropdown-menu ${isAtivo ? 'ativo' : ''}`}>
            {items.map(item => (
                <li className={`dropdown-item ${telaAtiva === item.path ? 'ativo' : ''}`}>
                    <NavLink to={item.path}>{item.label}</NavLink>
                </li>
            ))}
        </ul>
    );
};

export default Dropdown;
