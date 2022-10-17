import { GeoPoint, Timestamp } from "firebase/firestore";
import RegistroModel from "../RegistroModel"

class Ocorrencia extends RegistroModel{

    brinco: number;
    ocorrencia: string;
    providencia: string;

    constructor(codigo_usuario: string, data: Timestamp, localizacao: GeoPoint,
        brinco: number,
        ocorrencia: string,
        providencia: string){
        super(codigo_usuario, data, localizacao);

        this.brinco = brinco;
        this.ocorrencia = ocorrencia;
        this.providencia = providencia;
    }



}

export default Ocorrencia;