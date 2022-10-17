import React from "react";
import { render } from "react-dom"
import { ScrollView, TouchableOpacity, View } from "react-native";
import ScreenBase from "../ScreenBase"
import main from '../../styles/main';
import NumericUpDown from "../../components/NumericUpDown";
import RichTextBox from "../../components/RichTextBox";
import styles from "../../components/AppButton/styles";

import { Text} from '../../components/Themed';
import AnaliseInvernadaModel from "../../model/AnaliseInvernadaModel";
import { auth, db } from "../../config/firebase";
import { addDoc, collection, GeoPoint, Timestamp } from "firebase/firestore";
import { findLocation } from "helpers/locationHelper";
import { alertMessage } from "helpers/alertMessage";
import { handleFirebaseError } from "helpers/firebaseHandlerExceptions";

export default class AnaliseInvernadaScreen extends ScreenBase{

    constructor(props){
        super(props);
        this.state = {
            pasto: '',
            agua: 0,
        }
    }

    render() {

        const enviar = async() => {
            let codigo_usuario = auth.currentUser?.uid;
            let data = Timestamp.fromDate( new Date());
            let loc = await findLocation();
            let localizacao = new GeoPoint(loc.coords.latitude, loc.coords.longitude);
            //let localizacao = new GeoPoint(50, 5);
            let pasto = this.state.pasto;
            let agua = this.state.agua;
            let analiseInvernadaModel = new AnaliseInvernadaModel(codigo_usuario, data, localizacao, pasto, agua)
            console.log(analiseInvernadaModel)
            const dbRef = collection(db, "analise_invernada");
            addDoc(dbRef, JSON.parse( JSON.stringify(analiseInvernadaModel)))
            .then(async () => {
                alertMessage('success', 'Sucesso!', "Sua ocorrência foi enviada com sucesso!");
                //navigation.navigate('Root', {name: 'UserScreen'})
            })
            .catch(error => {
                handleFirebaseError(error)
            })

        }

        return(
            <ScrollView>
                <View style={main.centered} >

                    <RichTextBox 
                        text= "Digite os dados referentes ao pasto"
                        placeHolder= "Informe os dados referentes ao pasto"
                        onChangeText={(value) => {this.setState( { pasto: value } )}}
                    />

                    <NumericUpDown text="Selecione a quantidade de água em litros"
                        default={0}
                        onChange={value => this.setState( { agua: value } )}
                    />

                    <TouchableOpacity style={styles.button} onPress={enviar}>

                        <Text style={main.buttonText}>Enviar</Text>

                    </TouchableOpacity >

                </View>

            </ScrollView>
            

        );

    }
    

}
