import { GeoPoint, Timestamp } from "firebase/firestore";
import RegistroModel from "../RegistroModel"

class MortalidadeModel extends RegistroModel{

    brinco: number;
    causa: string;
    nome_mae: string;

    constructor(codigo_usuario: string, data: Timestamp, localizacao: GeoPoint,
        brinco: number,
        causa: string,
        nome_mae: string){
        super(codigo_usuario, data, localizacao);

        this.brinco = brinco;
        this.causa = causa;
        this.nome_mae = nome_mae;
    }



}

export default MortalidadeModel;
