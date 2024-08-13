import { Request, Response } from "express";
import { Router } from "express";
import { atualizarPessoa, criarPessoa, obterPessoa, removerPessoa, selecionarPessoas } from "../controllers/controller";

const router = Router();

router
    .post("/pessoa", criarPessoa)
    .put("/pessoa/:idPessoa", atualizarPessoa)
    .delete("/pessoa/:idPessoa", removerPessoa)
    .get("/pessoas", selecionarPessoas)
    .get("/pessoa/:idPessoa", obterPessoa)
    .get("/", (req: Request, res: Response) => {
        res.send("API rodando!");
    });

export default router;
