
import { knex } from '../../Database/configDataBase';
import { hash, compare} from 'bcryptjs';

interface Register {
    user:string,
    username:string,
    password:string,
    idPersonagem:Int32Array
}

export async function Register(user:Register){
   try{
         knex.initialize();
        user.password = await hash(user.password, 10);
        
        const UserDTO =  {
              DS_NOME: user.user
             ,DS_LOGIN: user.username
             ,DS_SENHA: user.password
             ,ID_PERSONAGEM: user.idPersonagem
            }

          const iduser = await knex('TB_ILN_USUARIOS').where({DS_LOGIN: user.username}).select('ID_USUARIO')

          if(iduser.length > 0)
               return { status:409, message:'Usuario ja cadastrado'};
          else
          {
             const response = await knex('TB_ILN_USUARIOS').insert(UserDTO).returning("ID_USUARIO")
             return {status: 200, idUser: response[0]}
          }
              
     }catch(err){
        throw new Error(`Ocorreu um erro ao efetuar o cadastro do usuario ${err.message}`);
      }
      finally{
         knex.destroy();
      }
};

export async function doLogin(user:{ username:string, password:string }){
   try{
      knex.initialize();
      
      const User = await knex('TB_ILN_USUARIOS').where({DS_LOGIN: user.username, FL_STATUS: 1}).first();
      
      if(!User)
         return {Status: 400, message: 'Usuario invalido!'}

      if(!await compare(user.password, User.DS_SENHA))
         return {Status: 400, message: 'Senha Invalida!'}

      return { Status:200, UserID:User.ID_USUARIO }

   }catch(err){
      throw new Error(`Ocorreu um erro ao tentar logar`);
   }
   finally{
      knex.destroy();
   }
}