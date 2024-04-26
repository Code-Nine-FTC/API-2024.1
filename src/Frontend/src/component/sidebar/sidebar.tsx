import React, { useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css'
import Dropdown from '../dropdown/dropdown';
import perfilicone from '../../assets/sidebar/iconperfil.png'
import { getAdminNavigationItems, getAtendenteNavigationItems, getDefaultNavigationItems } from './navitens'

// Inicia a função da Sidebar, recebendo o usuario logado no momento (userRole), para alterar as opções
// Define os States para verificar se a Sidebar esta aberte ou fechada, e o mesmo para o menu Dropdown
const Sidebar = ({ userTipo }: { userTipo: string }) => { 
    const [isSidebarAberta, setIsSidebarAberta] = useState(false);
    const [isDropdownAberto, setIsDropdownAberto] = useState<number | null>(null);
    const [ativoNavItem, setAtivoNavItem] = useState('');
    const location = useLocation()

    /* Função para abrir a Sidebar, alterando a classe dela para sidebar.open, utilizando um botão, alterando
    sua classe também */
    const abrirSidebar = () => {
        setIsSidebarAberta(!isSidebarAberta);
        const button = document.querySelector('.sidebarButton');
        const sidebar = document.querySelector('.sidebar');
        if (button) {
            button.classList.toggle('open');
            sidebar?.classList.toggle('open');
        }
    };

    // Função para abrir o menu Dropdown, utilizando setstate de acordo com o valor que indica se esta aberto
    const abrirDropdown = (index: number) => {
        setIsDropdownAberto(prevState => (prevState === index ? null : index !== prevState ? index : null));
    };

    // Função que importa os itens de navegação do modulo navitens, de acordo com o usuário logado
    const getNavigationItems = () => {
        switch (userTipo) {
            case 'admin':
                return getAdminNavigationItems();
            case 'atendente':
                return getAtendenteNavigationItems();
            default:
                return getDefaultNavigationItems();
        }
    };

    // Função que altera o nome da classe para ativo quando está em sua rota respectiva
    const getClassNames = (item: any) => {  
        let classNames = `navitemdiv ${ativoNavItem === item.label ? 'ativo' : ''}`;
        if (item.path && item.path === location.pathname) {
            classNames += ' ativo';
        }
        if ('dropdownItems' in item && item.dropdownItems !== undefined){
            if (item.dropdownItems.some((dropdownItem: any) => dropdownItem.path === location.pathname)) {
                classNames += ' ativo';
            }
        }
            return classNames;
    }

    return (
        <>
        <div className={styles.sidebarContainer}>
            <button onClick={abrirSidebar} className="sidebar-button">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <section className="sidebar">
                <div className="userinfo">
                    <img src="" alt="Foto de perfil"/>
                    <div className="infouser">
                        <Link to="/perfil" id="linkperfil"> Eu </Link>
                        <h2> {userTipo.charAt(0).toUpperCase() + userTipo.slice(1)} </h2>
                        {/* Deixa a primeira letra do nome maiúscula */}
                    </div>
                </div>
                <ul className="navItens">
                    {/* Percorre cada valor retornado pela função de receber
                    os itens da navegação */}
                    {getNavigationItems().map((item, index) => (
                        <div className={getClassNames(item)}>
                            <li key={index} onClick={() => {
                                /* Quando o elemento da navegação for clicado, uma verificação é ativida,
                                checando se o item é um dropdown, contendo o mesmo valor */
                                if ('dropdownItems') {
                                    abrirDropdown(index);
                                }
                                /* Se possui, a função toggleDropdown é chamada, utilizando o index
                                do elemento para abrir apenas ele */
                                setAtivoNavItem(item.label); // Atualiza qual item está ativo
                                }} className={ativoNavItem === item.label ? 'active' : ''}>
                                {/* Caso seja um item comum de navegação, ele possui uma rota, a sua existência
                                é verificada e definida em link */}
                                {'path' in item ?(
                                    <Link to={item.path || '/*'}>
                                        <img src={item.imageUrl} alt={item.label}></img>
                                        <div className="alignlabel">{item.label} </div>
                                    </Link>
                                ) : (
                                    // Caso não possua uma rota, o nome do item de dropdown é renderizado
                                    <span id="alignspan">
                                        <img src={item.imageUrl} alt={item.label}></img>
                                        <div className="alignlabel">
                                            {item.label}
                                        </div>
                                    </span>
                                )}
                                {/* Verifica se o dropdown esta com o state de aberto, e checa novamente se o 
                                item da navegação é um dropdown, assim renderizando seus itens */}
                                {('dropdownItems' in item && item.dropdownItems !== undefined) && isDropdownAberto=== index && (
                                    <Dropdown items={item.dropdownItems} />
                                )}
                            </li>
                        </div>
                    ))}
                     <div id="logout">
                        <Link to="/registro">Logout →</Link>
                    </div>
                </ul>
            </section>
        </div>
        </>
    );
};

export default Sidebar;