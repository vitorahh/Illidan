import { knex } from "../../Database/configDataBase";
import { Personagens } from "../../Interfaces/Personagens";


export async function ListarPersonagens(){
    try{

        knex.initialize();
       
        const Person = await knex('TB_ILN_PERSONAGEM').select()

        return { Status: 200, Personagens: Person };
    }
    catch(err)
    {
       throw new Error(`Ocorreu um erro ao Buscar Personagens ${err.message}`);
    }
    finally{
        knex.destroy();
     }
 }
 
export async function insertPersonagem(Props:Personagens){
    try{
        
        knex.initialize();

        await knex('TB_ILN_PERSONAGEM').insert({
            DS_PERSONAGEM:Props.DS_PERSONAGEM,
            DS_URL_IMG: Props.DS_URL_IMG
        }).returning('ID_PERSONAGEM')
        
       return { Status:201 }
    }
    catch(err)
    {
       throw new Error(`Ocorreu um erro ao cadastrar Personagem`);
    }
    finally{
        knex.destroy();
     }
 }