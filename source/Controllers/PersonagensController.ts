import express from 'express';
import multer from 'multer'

const ConfigMulter = require('../Config/Multer');

const PersonRouter = express.Router();

import { insertPersonagem, ListarPersonagens } from '../Models/Personagens/Personagens';


PersonRouter.get('/', async (req, res) => {
    try
    {   
        const response =  await ListarPersonagens()
        if(response.Status == 200)
            res.status(200).send({Produtos: response.Personagens})
        else 
            res.status(400).send({message: 'Erro ao tentar atualizar produto'})
    }
    catch(err)
    {
        res.status(500).send({error: err.message})
    }
})

PersonRouter.post('/', multer(ConfigMulter).single('arquivo'), async (req, res) => {
    try
    {   
        req.body.DS_URL_IMG = req.file.path;
        const response =  await insertPersonagem(req.body)
        if(response.Status == 201)
            res.status(201).send({
                message: 'Personagem Cadastrado com sucesso'
            }) 
    }
    catch(err)
    {
        res.status(500).send({error: err.message})
    }
})
module.exports = PersonRouter;