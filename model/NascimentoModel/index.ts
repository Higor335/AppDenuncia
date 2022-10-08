import { GeoPoint, Timestamp } from "firebase/firestore";
import RegistroModel from "../RegistroModel"

class NascimentoModel extends RegistroModel{

    sexo: string;
    peso: number;
    medicamento: string;
    brinco: number;
    piquete: string;
    nome_mae: string;

    constructor(codigo_usuario: string, data: Timestamp, localizacao: GeoPoint,
        sexo: string,
        peso: number,
        medicamento: string,
        brinco: number,
        piquete: string,
        nome_mae: string){
        super(codigo_usuario, data, localizacao);

        this.sexo = sexo;
        this.peso = peso;
        this.medicamento = medicamento;
        this.brinco = brinco;
        this.piquete = piquete;
        this.nome_mae = nome_mae;
    }



}

export default NascimentoModel;
