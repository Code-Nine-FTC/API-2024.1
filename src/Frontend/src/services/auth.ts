// Trata da autenticação do usuário

// string usada como chave para armazenar e recuperar o token
export const TOKEN_KEY = "@airbnb-Token";
export const NIVEL_ACESSO_KEY = "@airbnb-NivelAcesso"; 
export const AUTENTICADO_KEY = "@airbnb-Autenticado";
// Nova chave para armazenar o nível de acesso

// Verifica se tem um token armazenado no localStorage
export function isAuthenticated() {
    // const token = localStorage.getItem(TOKEN_KEY);
    // return token !== null;
    const authStatus = localStorage.getItem(AUTENTICADO_KEY);
    return authStatus === 'true';
}

// Armazena o token e o nível de acesso no localStorage
export function login(token: string, nivelAcesso: string, setAuthStatus: (status: boolean) => void, setUserLevel: (level: string) => void, setToken: (token: string) => void) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(NIVEL_ACESSO_KEY, nivelAcesso);
    localStorage.setItem(AUTENTICADO_KEY, 'true');
    setAuthStatus(true);
    setUserLevel(nivelAcesso);
    setToken(token);
}

// Recupera o token armazenado no localStorage
export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

// Recupera o nível de acesso armazenado no localStorage
export function getNivelAcesso() {
    return localStorage.getItem(NIVEL_ACESSO_KEY);
}

// Remove o token e o nível de acesso do localStorage
export function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(NIVEL_ACESSO_KEY);
    localStorage.setItem(AUTENTICADO_KEY, 'false');
}
