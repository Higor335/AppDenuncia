import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import ScreenBase from "../ScreenBase"
import main from '../../styles/main';
import RichTextBox from "../../components/RichTextBox";
import NumericUpDown from "../../components/NumericUpDown";
import styles from "../../components/AppButton/styles";

import { Text} from '../../components/Themed';
import NutricaoModel from "../../model/NutricaoModel";
import { auth, db } from "../../config/firebase";
import { addDoc, collection, GeoPoint, Timestamp } from "firebase/firestore";
import { findLocation } from "helpers/locationHelper";
import { alertMessage } from "helpers/alertMessage";
import { handleFirebaseError } from "helpers/firebaseHandlerExceptions";

export default class NutricaoScreen extends ScreenBase{

    constructor(props){
        super(props);
        this.state = {
            produto:"",
            piquete:"",
            quantidade:0
        }
    }

    render() {

        const enviar = async() => {
            let codigo_usuario = auth.currentUser?.uid;
            let data = Timestamp.fromDate( new Date());
            let loc = await findLocation();
            let localizacao = new GeoPoint(loc.coords.latitude, loc.coords.longitude);


            let produto = this.state.produto;
            let piquete = this.state.piquete;
            let quantidade = this.state.quantidade
            console.log('pre model')
            let nutricaoModel = new NutricaoModel(codigo_usuario, data, localizacao, produto, piquete, quantidade)
            console.log(nutricaoModel)

            const dbRef = collection(db, "nutricao");
            addDoc(dbRef, JSON.parse( JSON.stringify(nutricaoModel)))
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
                        text= "Informe o produto"
                        placeHolder= "Whey Protein"
                        onChangeText={(value) => {this.setState( { produto: value } )}}
                    />

                    <NumericUpDown text="Selecione a quantidade"
                        default={1}
                        onChange={value => this.setState( { quantidade: value } )}
                    />

                    <RichTextBox 
                        text= "Insira o piquete"
                        placeHolder= "Digite as informações referentes ao piquete"
                        onChangeText={(value) => {this.setState( { piquete: value } )}}
                    />
                    
                    <TouchableOpacity style={styles.button} onPress={enviar}>

                        <Text style={main.buttonText}>Enviar</Text>

                    </TouchableOpacity >

                </View>

            </ScrollView>
            

        );

    }
    

}
