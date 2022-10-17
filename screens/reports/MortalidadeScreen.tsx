import React from "react";
import { render } from "react-dom"
import { ScrollView, TouchableOpacity, View } from "react-native";
import ScreenBase from "../ScreenBase"
import main from '../../styles/main';
import NumericUpDown from "../../components/NumericUpDown";
import RichTextBox from "../../components/RichTextBox";
import styles from "../../components/AppButton/styles";

import { Text} from '../../components/Themed';
import MortalidadeModel from "../../model/MortalidadeModel";
import { auth, db } from "../../config/firebase";
import { addDoc, collection, GeoPoint, Timestamp } from "firebase/firestore";
import { findLocation } from "helpers/locationHelper";
import { alertMessage } from "helpers/alertMessage";
import { handleFirebaseError } from "helpers/firebaseHandlerExceptions";

export default class MortalidadeScreen extends ScreenBase{

    constructor(props){
        super(props);
        this.state = {
            brinco: 0,
            causa: '',
            nome_mae: '',
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
            let causa = this.state.causa;
            let nome_mae = this.state.nome_mae;
            let mortalidadeModel = new MortalidadeModel(codigo_usuario, data, localizacao, brinco, causa, nome_mae)
            console.log(mortalidadeModel)
            const dbRef = collection(db, "mortalidade");
            addDoc(dbRef, JSON.parse( JSON.stringify(mortalidadeModel)))
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

                    <NumericUpDown text="Selecione o brinco do bovino"
                        default={0}
                        onChange={value => this.setState( { brinco: value } )}
                    />

                    <RichTextBox 
                        text= "Informe a causa da morte"
                        placeHolder= "Informe a causa"
                        onChangeText={(value) => {this.setState( { causa: value } )}}
                    />

                    <RichTextBox 
                        text= "Digite o nome do mãe"
                        placeHolder= "informe o nome da mãe"
                        onChangeText={(value) => {this.setState( { nome_mae: value } )}}
                    />

                    <TouchableOpacity style={styles.button} onPress={enviar}>

                        <Text style={main.buttonText}>Enviar</Text>

                    </TouchableOpacity >

                </View>

            </ScrollView>
            

        );

    }
    

}
