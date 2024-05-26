import React, { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';
import Dropdown from '../dropdown/dropdown';
import perfilicone from '../../assets/fotoperfil/perfilsidebar.svg';
import { getAdminNavigationItems, getAtendenteNavigationItems, getDefaultNavigationItems } from './navitens';
import { getNivelAcesso, getToken, logout } from '../../services/auth';

const Sidebar = () => {
    const userTipo = getNivelAcesso();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const sidebarcontainerRef = useRef<HTMLDivElement>(null);
    const [isSidebarAberta, setIsSidebarAberta] = useState(false);
    const [isDropdownAberto, setIsDropdownAberto] = useState<number | null>(null);
    const [ativoNavItem, setAtivoNavItem] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const abrirSidebar = () => {
        setIsSidebarAberta(!isSidebarAberta);
        if (buttonRef.current) {
            buttonRef.current.classList.toggle(styles.open);
        }
        if (sidebarRef.current) {
            sidebarRef.current.classList.toggle(styles.open);
        }
        if (sidebarcontainerRef.current) {
            sidebarcontainerRef.current.classList.toggle(styles.open)
        }
    };

    const abrirDropdown = (index: number) => {
        setIsDropdownAberto(prevState => (prevState === index ? null : index !== prevState ? index : null));
    };

    const getNavigationItems = () => {
        switch (userTipo) {
            case 'administrador':
                return getAdminNavigationItems();
            case 'atendente':
                return getAtendenteNavigationItems();
            case 'usuario':
                return getDefaultNavigationItems();
            default:
                return [];
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getClassNames = (item: any) => {
        let classNames = `${styles.navitemdiv} ${ativoNavItem === item.label ? styles.ativo : ''}`;
        if (item.path && item.path === location.pathname) {
            classNames += ` ${styles.ativo}`;
        }
        if ('dropdownItems' in item && item.dropdownItems !== undefined) {
            if (item.dropdownItems.some((dropdownItem: any) => dropdownItem.path === location.pathname)) {
                classNames += ' ativo';
            }
        }
        return classNames;
    };

    return (
        <>
        <button ref={buttonRef} onClick={abrirSidebar} className={styles.sidebarButton}>
                <span></span>
                <span></span>
                <span></span>
            </button>
        <div ref={sidebarcontainerRef} className={styles.sidebarContainer}>
            <section ref={sidebarRef} className={styles.sidebar}>
                {userTipo !== null && userTipo !== '' && (
                <> 
                    <div className={styles.userinfo}>
                    <img src={perfilicone} alt="Foto de perfil"/>
                    <div className={styles.infouser}>
                    {userTipo === 'administrador' || userTipo === 'atendente' ? 
                            <Link to="/visualizar/perfil/funcionario" id={styles.linkperfil}> Eu </Link>
                        : <Link to="/visualizarcliente" id={styles.linkperfil}> Eu </Link>}
                        <h2> {userTipo.charAt(0).toUpperCase() + userTipo.slice(1)} </h2>
                        {/* Deixa a primeira letra do nome maiúscula */}
                    </div>
                </div>
                <ul className={styles.navItens}>
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
                                }} className={ativoNavItem === item.label ? styles.active : ''}>
                                {/* Caso seja um item comum de navegação, ele possui uma rota, a sua existência
                                é verificada e definida em link */}
                                {'path' in item ?(
                                    <Link to={item.path || '/*'}>
                                        <img src={item.imageUrl} alt={item.label}></img>
                                        <div className={styles.alignlabel}>{item.label} </div>
                                    </Link>
                                ) : (
                                    // Caso não possua uma rota, o nome do item de dropdown é renderizado
                                    <span id={styles.alignspan}>
                                        <img src={item.imageUrl} alt={item.label}></img>
                                        <div className={styles.alignlabel}>
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
                     <div id={styles.logout} onClick={handleLogout}>
                        <h1> Logout → </h1>
                    </div>
                </ul>
                </>
                )}
                {(userTipo === null || userTipo === '') && (
                    <div className={styles.x}>
                        <h1>Tem uma conta ?</h1><br></br>
                        <Link to="/login" className={styles.button}> Faça Login </Link>
                        <br></br>
                        <h2>Ainda não possui uma conta ?</h2><br></br>
                        <Link to="/registro" className={styles.button}>Registre-se</Link>
                    </div>
                )}
            </section>
        </div>
        </>
    );
};

export default Sidebar;
