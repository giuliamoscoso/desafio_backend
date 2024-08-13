import { Request, Response } from "express";
import { pessoasPool } from "../database/connection";
import { RowDataPacket } from "mysql2";

interface IPessoa {
    nome: string;
    dataNascimento: Date;
    salario: number;
    observacoes: string;
    nomeMae: string;
    nomePai: string;
    cpf: string;
}

export const criarPessoa = async (req: Request, res: Response) => {
    try {
        const dados: IPessoa = req.body;

        const [result] = await pessoasPool
            .promise()
            .query<RowDataPacket[][]>(`CALL inserirPessoa(?,?,?,?,?,?,?);`, [
                dados.nome,
                dados.dataNascimento,
                dados.salario,
                dados.observacoes,
                dados.nomeMae,
                dados.nomePai,
                dados.cpf,
            ]);

        const idPessoa = result[0][0].idPessoa;
        console.log("idPessoa: ", idPessoa);

        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar registro!" });
    }
};

export const atualizarPessoa = async (req: Request, res: Response) => {
    try {
        const dados: IPessoa = req.body;

        const [result] = await pessoasPool
            .promise()
            .query<RowDataPacket[][]>(`CALL atualizarPessoa(?,?,?,?,?,?,?,?);`, [
                req.params.idPessoa,
                dados.nome,
                dados.dataNascimento,
                dados.salario,
                dados.observacoes,
                dados.nomeMae,
                dados.nomePai,
                dados.cpf,
            ]);

        const resultado = result[0][0].Resultado;
        console.log("Resultado: ", resultado);

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar registro!" });
    }
};

export const removerPessoa = async (req: Request, res: Response) => {
    try {
        const [result] = await pessoasPool.promise().query<RowDataPacket[][]>(`CALL removerPessoa(?);`, [req.params.idPessoa]);

        const resultado = result[0][0].Resultado;
        console.log("Resultado: ", resultado);

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao remover registro!" });
    }
};

export const selecionarPessoas = async (req: Request, res: Response) => {
    try {
        const [result] = await pessoasPool.promise().query<RowDataPacket[][]>(`CALL selecionartodasPessoas();`);

        console.log("Registros: ", result[0]);

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao selecionar registros!" });
    }
};

export const obterPessoa = async (req: Request, res: Response) => {
    try {
        const [result] = await pessoasPool.promise().query<RowDataPacket[][]>(`CALL obterPessoa(?);`, [req.params.idPessoa]);

        console.log("Registro: ", result[0]);

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao selecionar registro!" });
    }
};
