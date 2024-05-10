function RecebeData(data: string): Date {
    let partesData = data.split(":");
    let hora = new Number(partesData[2].valueOf()).valueOf();
    let minuto = new Number(partesData[1].valueOf()).valueOf();
    let segundos = new Number(partesData[0].valueOf()).valueOf();
    return new Date(hora, minuto, segundos);
}

export default RecebeData