const multer = require('multer');
const path = require('path');
import crypto from 'crypto'


//Configuração do Multer e o crypto para mudar o nome do arquivo
module.exports = {
    dest: path.resolve(__dirname,'..','..','tmp'),
    storage: multer.diskStorage({
        destination: (req: any, file: any, cb: (arg0: null, arg1: any) => void) =>{
            cb(null, path.resolve(__dirname,'..','..','tmp'));
        },
        filename: (req: any, file: { key: string; originalname: any; }, cb: (arg0: Error | null, arg1?: string) => void) => {
            crypto.randomBytes(16, (err, hash) =>{
                if(err) 
                cb (err);

                file.key = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, file.key);
            })
        }
    })
}