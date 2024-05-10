import { IClienteInput, IClienteLoggin, IClienteUpdate } from "../interfaces/ICliente";
import Cliente from "../entities/cliente";
import { Connection } from "../config/data-source";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export class ClienteService {
    public async cadastrarCliente(dadosCliente: IClienteInput) {
        try {
            console.log('Recebendo dados no clienteService')
            console.log(dadosCliente)
            const clienteRepository = Connection.getRepository(Cliente)
            // Procura se o e-mail ou o cpf já são cadastrados
            const cliente = await clienteRepository.findOne({
                where: [
                    { cli_email: dadosCliente.cli_email },
                    { cli_cpf: dadosCliente.cli_cpf },
                ]
            })
            if (!cliente) {
                // Validação de CPF
                const cpfValidado = this.validarCpf(dadosCliente.cli_cpf)
                if (!cpfValidado) {
                    console.log('CPF invalido')
                    return { success: false, message: `CPF inválido` }
                }
                // Criptografia de Senha
                const senhaCriptografada = await bcrypt.hash(dadosCliente.cli_senha, 10)
                dadosCliente.cli_senha = senhaCriptografada
                // Criando novo usario
                const novoCliente = clienteRepository.create(dadosCliente)
                // Salvando novo cliente
                await clienteRepository.save(novoCliente)
                return { success: true, message: `Cliente cadastrado com sucesso` }
            }
            return { success: false, message: `Usuario já cadastrado` }

        } catch (error) {
            console.error(`Erro ao cadastrar cliente:`, error)
            return { success: false, message: `Erro ao cadastrar cliente` }
        }
    }
    public async logginCliente(dadosLogin: IClienteLoggin) {
        try {
            const secret = process.env.SECRET
            const clienteRepository = Connection.getRepository(Cliente)
            console.log("Dados recebidos no backend")
            console.log(dadosLogin)
            const cliente = await clienteRepository.findOne({ where: { cli_email: dadosLogin.cli_email } })
            if (!cliente) {
                console.log("Cliente não encontrado")
                return { success: false, message: `Cliente não encontrado` }
            }
            if (!bcrypt.compareSync(dadosLogin.cli_senha, cliente.cli_senha)) {
                console.log("Dados invalidos")
                return { success: false, message: `Dados invalidos` }
            }
            const token = jwt.sign({ id: cliente.cli_id, nivelAcesso: 'usuario'}, secret)
            console.log("Autenticação realizada com sucesso")
            return { success: true, message: `Autenticação realizada com sucesso`, token,  nivelAcesso: 'usuario' }
        } catch (error) {
            console.error(`Erro ao logar cliente: ${error}`)
            console.log("Erro ao logar cliente", error)
            return { success: false, message: `Erro ao logar cliente` }
        }
    }
    public async editarCliente(id: number, dadosUpdate: IClienteUpdate) {
        try {
            const clienteRepository = Connection.getRepository(Cliente)
            const cliente = await clienteRepository.findOne({ where: { cli_id: id } })

            if (!cliente) {
                return { success: false, message: `Cliente não encontrado` }
            }
            if (dadosUpdate.cli_cpf) {
                const cpfValidado = this.validarCpf(dadosUpdate.cli_cpf)
                if (cpfValidado) {
                    const cpfExistente = await clienteRepository.findOne({ where: { cli_cpf: dadosUpdate.cli_cpf } })
                    if (cpfExistente && cpfExistente.cli_id !== id) {
                        return { success: false, message: `CPF já cadastrado` }
                    }
                } else {
                    return { success: false, message: `CPF inválido` }
                }
            }
            if (dadosUpdate.cli_email) {
                const emailExistente = await clienteRepository.findOne({ where: { cli_email: dadosUpdate.cli_email } })

                if (emailExistente && emailExistente.cli_id !== id) {
                    return { success: false, message: `E-mail já cadastrado` }
                }
            }
            if (dadosUpdate.cli_senha) {
                const senhaCriptografada = await bcrypt.hash(dadosUpdate.cli_senha, 10)
                dadosUpdate.cli_senha = senhaCriptografada
            }

            const clienteUpdate = { ...cliente, ...dadosUpdate }
            await clienteRepository.update(id, clienteUpdate)
            return { success: true, message: `Cliente atualizado com sucesso`, clienteUpdate }
        } catch (error) {
            console.error(`Erro ao editar cliente: ${error}`)
            return { success: false, message: `Erro ao editar cliente` }
        }
    }
    public async visualizarCliente(id: number) {
        try {
            const clienteRepository = Connection.getRepository(Cliente)
            const cliente = await clienteRepository.findOne({ where: { cli_id: id } })
            if (!cliente) {
                return { success: false, message: `Cliente não entrado` }
            }
            return { success: true, message: `Cliente encontrado`, cliente }
        } catch (error) {
            console.error(`Erro ao encontrar cliente: ${error}`)
            return { success: false, message: `Erro ao encontrar o cliente` }
        }
    }
    public async desativarCliente(id: number) {
        try {
            const clienteRepository = Connection.getRepository(Cliente)
            const cliente = await clienteRepository.findOne({ where: { cli_id: id } })
            if (!cliente) {
                return { success: false, message: `Cliente não entrado` }
            }
            cliente.ativo = false
            await clienteRepository.save(cliente)
            return { success: true, message: `Cliente desativado com sucesso`, cliente }
        } catch (error) {
            console.error(`Erro ao encontrar cliente: ${error}`)
            return { success: false, message: `Erro ao encontrar o cliente` }
        }
    }
    private validarCpf(cpf: string): boolean {
        if (!cpf) {
            console.log('Deu erro na verificação do CPF')
            console.log(cpf)
            return false
        }
        // console.log(cpf)
        // Remove todos os elementos que não seja númerico
        // Verifica se o cpf tem tamanho igual a 11
        if (cpf.length !== 11) {
            console.log('Deu erro no length')
            return false
        }
        // Verifica se todos os numeros são iguais
        if (/^(\d)\1{10}$/.test(cpf)) {
            return false
        }

        // Calculando o primeiro digito verificador cpf[10]
        let soma = 0
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i)
        }
        let resto = soma % 11
        let digitoVerificador1: number
        if (resto < 2) {
            digitoVerificador1 = 0
        } else {
            digitoVerificador1 = 11 - resto
        }

        // Verifica se o primeiro digito verificador é diferente do que foi calulado
        if (parseInt(cpf.charAt(9)) !== digitoVerificador1) {
            return false
        }
        // Calcula o segundo digito vereficador
        soma = 0
        resto = 0
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i)
        }
        resto = soma % 11
        let digitoVerificador2: number
        if (resto < 2) {
            digitoVerificador2 = 0
        } else {
            digitoVerificador2 = 11 - resto
        }

        // Verifica se o segundo digito verificador é diferente do que foi calculado 
        if (parseInt(cpf.charAt(10)) !== digitoVerificador2) {
            return false
        }
        // CPF Valido
        console.log('CPF Validado')
        return true
    }
}