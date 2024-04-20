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
            { label: 'Ativos', path: '/ticketsativos' },
            { label: 'Em atendimento', path: '/ticketsatendimento' },
            { label: 'Em espera ', path: '/ticketsespera' }
            ], imageUrl: tickets},
        { label: 'Gerenciar', path: '/teste', imageUrl: gerenciar},
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
            { label: 'Em atendimento', path: '/ematendimento' },
            { label: 'Finalizados', path: '/ticketstodos' },
            { label: 'Não atendidos', path: '/naoatendidos' }
            ], imageUrl: tickets},
    ];
};

const getDefaultNavigationItems = () => {
    return [
        { label: 'Home', path: '/', imageUrl: home},
        { label: 'Tickets', dropdownItems: [
            { label: 'Ativos', path: '/ativos' },
            { label: 'Todos', path: '/ticketstodos' },
            { label: 'Criar Ticket', path: '/criarticket' }
            ], imageUrl: tickets},
    ];
};

export { getAdminNavigationItems, getAtendenteNavigationItems, getDefaultNavigationItems };
