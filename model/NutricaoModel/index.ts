import { GeoPoint, Timestamp } from "firebase/firestore";
import RegistroModel from "../RegistroModel"

class NutricaoModel extends RegistroModel{

    produto: string;
    quantidade: number;
    piquete: string;

    constructor(codigo_usuario: string, data: Timestamp, localizacao: GeoPoint,
        produto: string,
        quantidade: number,
        piquete: string){
        super(codigo_usuario, data, localizacao);

        this.produto = produto;
        this.quantidade = quantidade;
        this.piquete = piquete;
    }
}

export default NutricaoModel;