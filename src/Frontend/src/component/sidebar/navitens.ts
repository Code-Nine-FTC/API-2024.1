import NavigationItemInterface from "./navitens.interface";
import home from "../../assets/sidebar/home.svg"
import tickets from "../../assets/sidebar/tickets.svg"
import faq from "../../assets/sidebar/faq.svg"
import gerenciar from "../../assets/sidebar/gerenciar.svg"
import dashboard from "../../assets/sidebar/dashboard.svg"
import categorias from "../../assets/sidebar/categorias.svg"

const getAdminNavigationItems = () : NavigationItemInterface[] => {
    return [
        { label: 'Dashboard', path: '/dashboard', imageUrl: dashboard },
        { label: 'Tickets', dropdownItems: [
            { label: 'Em atendimento', path: '/ticketsativos' },
            { label: 'Em espera', path: '/ticketsatendimento' },
            { label: 'Finalizados', path: '/ticketsespera' }
            ], imageUrl: tickets},
        { label: 'Gerenciar', path: '/visualizarTodosFuncionarios', imageUrl: gerenciar},
        { label: 'FAQ', path: '/faq', imageUrl: faq},
        { label: 'Categorias', dropdownItems: [
            { label: 'Editar', path: '/categoriaeditar' },
            { label: 'Criar', path: '/categoriacriar' },
            ], imageUrl: categorias},
    ];
};

const getAtendenteNavigationItems = () => {
    return [
        { label: 'Tickets', dropdownItems: [
            { label: 'Em atendimento', path: '/ticketsAtendimento' },
            { label: 'Em espera', path: '/ticketstodos' },
            { label: 'FInalizados', path: '/naoatendidos' }
            ], imageUrl: tickets},
    ];
};

const getDefaultNavigationItems = () => {
    return [
        { label: 'Home', path: '/', imageUrl: home},
        { label: 'Tickets', dropdownItems: [
            { label: 'Ativos', path: '/ticketsAtendimento' },
            { label: 'Todos', path: '/ticketstodos' },
            { label: 'Criar Ticket', path: '/ticket' }
            ], imageUrl: tickets},
    ];
};

export { getAdminNavigationItems, getAtendenteNavigationItems, getDefaultNavigationItems };
