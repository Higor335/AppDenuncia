import { GeoPoint, Timestamp } from "firebase/firestore";
import RegistroModel from "../RegistroModel"

class AnaliseInvernadaModel extends RegistroModel{

    pasto: string;
    agua: number;


    constructor(codigo_usuario: string, data: Timestamp, localizacao: GeoPoint,
        pasto: string,
        agua: number){
        
        super(codigo_usuario, data, localizacao);

        this.pasto = pasto;
        this.agua = agua;
        
    }



}

export default AnaliseInvernadaModel;
