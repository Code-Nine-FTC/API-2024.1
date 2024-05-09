function getDate() {
    const hoje = new Date()
    const ano = hoje.getFullYear()
    const mes = hoje.getMonth() + 1
    const dia = hoje.getDay()
    const hora = hoje.getHours()
    const minuto = hoje.getMinutes()
    const segundo = hoje.getSeconds()

    return {hoje, ano, mes, dia, hora, minuto, segundo}
}

export default getDate