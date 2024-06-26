import NavigationItemInterface from "./navitens.interface";
import home from "../../assets/sidebar/home.svg"
import tickets from "../../assets/sidebar/tickets.svg"
import faq from "../../assets/sidebar/faq.svg"
import gerenciar from "../../assets/sidebar/gerenciar.svg"
import dashboard from "../../assets/sidebar/dashboard.svg"
import categorias from "../../assets/sidebar/categorias.svg"

const getAdminNavigationItems = () : NavigationItemInterface[] => {
    return [
        { label: 'Dashboard', path: '/dashboard/:id', imageUrl: dashboard },
        { label: 'Tickets', dropdownItems: [
            { label: 'Em atendimento', path: '/ticketsativos' },
            { label: 'Em espera', path: '/ticketsespera' },
            { label: 'Todos', path: '/todostickets' }
            ], imageUrl: tickets},
        { label: 'Gerenciar', path: '/visualizarTodosFuncionarios', imageUrl: gerenciar},
        { label: 'FAQ', dropdownItems: [
            { label: 'Editar', path:'/listafaqadm'},
            { label: 'Criar', path: '/faqadm'}
            ], imageUrl: faq},
        { label: 'Categorias', dropdownItems: [
            { label: 'Editar', path: '/listarcategorias' },
            { label: 'Criar', path: '/ticketadm' },
            ], imageUrl: categorias},
    ];
};

const getAtendenteNavigationItems = () => {
    return [
        { label: 'Tickets', dropdownItems: [
            { label: 'Em atendimento', path: '/ticketsAtendimento' },
            { label: 'Em espera', path: '/ticketsespera' },
            { label: 'Finalizados', path: '/todostickets' }
            ], imageUrl: tickets},
    ];
};

const getDefaultNavigationItems = () => {
    return [
        { label: 'Home', path: '/', imageUrl: home},
        { label: 'Tickets', dropdownItems: [
            { label: 'Ativos', path: '/ticketsAtendimento' },
            { label: 'Todos', path: '/todostickets' },
            { label: 'Criar Ticket', path: '/criarticket' }
            ], imageUrl: tickets},
    ];
};

export { getAdminNavigationItems, getAtendenteNavigationItems, getDefaultNavigationItems };
