import React from "react";
import { render } from "react-dom"
import { ScrollView, TouchableOpacity, View } from "react-native";
import ScreenBase from "../ScreenBase"
import main from '../../styles/main';
import NumericUpDown from "../../components/NumericUpDown";
import RichTextBox from "../../components/RichTextBox";
import styles from "../../components/AppButton/styles";

import { Text} from '../../components/Themed';
import OcorrenciaModel from "../../model/OcorrenciaModel";
import { auth, db } from "../../config/firebase";
import { addDoc, collection, GeoPoint, Timestamp } from "firebase/firestore";
import { findLocation } from "helpers/locationHelper";
import { alertMessage } from "helpers/alertMessage";
import { handleFirebaseError } from "helpers/firebaseHandlerExceptions";

export default class OcorrenciaScreen extends ScreenBase{

    constructor(props){
        super(props);
        this.state = {
            brinco: '',
            ocorrencia: '',
            providencia: '',
        }
    }

    render() {

        const enviar = async() => {
            let codigo_usuario = auth.currentUser?.uid;
            let data = Timestamp.fromDate( new Date());
            let loc = await findLocation();
            let localizacao = new GeoPoint(loc.coords.latitude, loc.coords.longitude);
            //let localizacao = new GeoPoint(50, 5);
            let brinco = this.state.brinco;
            let ocorrencia = this.state.ocorrencia;
            let providencia = this.state.providencia;
            let ocorrenciaModel = new OcorrenciaModel(codigo_usuario, data, localizacao, brinco, ocorrencia, providencia)
            console.log(ocorrenciaModel)
            const dbRef = collection(db, "ocorrencia");
            addDoc(dbRef, JSON.parse( JSON.stringify(ocorrenciaModel)))
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
                        text= "Digite o código do brinco"
                        placeHolder= "Informe o código do brinco"
                        onChangeText={(value) => {this.setState( { brinco: value } )}}
                    />

                    <RichTextBox 
                        text= "Digite os dados da ocorrência"
                        placeHolder= "Informe os dados da ocorrência"
                        onChangeText={(value) => {this.setState( { ocorrencia: value } )}}
                    />

                    <RichTextBox 
                        text= "Digite a providência"
                        placeHolder= "Informe a providência"
                        onChangeText={(value) => {this.setState( { providencia: value } )}}
                    />

                    <TouchableOpacity style={styles.button} onPress={enviar}>

                        <Text style={main.buttonText}>Enviar</Text>

                    </TouchableOpacity >

                </View>

            </ScrollView>
            

        );

    }
    

}
