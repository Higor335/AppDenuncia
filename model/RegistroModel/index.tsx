import { GeoPoint, Timestamp } from "firebase/firestore";

class RegistroModel{

    codigo_usuario: any;
    data: Timestamp;
    localizacao: GeoPoint;

    constructor(codigo_usuario: any, data: Timestamp, localizacao: GeoPoint){
        this.codigo_usuario = codigo_usuario;
        this.data = data;
        this.localizacao = localizacao;
    }

}

export default RegistroModel;