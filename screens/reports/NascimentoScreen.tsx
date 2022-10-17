import React from "react";
import { render } from "react-dom"
import { ScrollView, TouchableOpacity, View } from "react-native";
import AppButton from "../../components/AppButton";
import ComboBox from "../../components/ComboBox";
import ScreenBase from "../ScreenBase"
import main from '../../styles/main';
import NumericUpDown from "../../components/NumericUpDown";
import RichTextBox from "../../components/RichTextBox";
import styles from "../../components/AppButton/styles";

import { Text} from '../../components/Themed';
import NascimentoModel from "../../model/NascimentoModel";
import { auth, db } from "../../config/firebase";
import { addDoc, collection, GeoPoint, Timestamp } from "firebase/firestore";
import { findLocation } from "helpers/locationHelper";
import { alertMessage } from "helpers/alertMessage";
import { handleFirebaseError } from "helpers/firebaseHandlerExceptions";

export default class NascimentoScreen extends ScreenBase{

    constructor(props){
        super(props);
        this.state = {
            sexo: 'M',
            peso: 50,
            medicamento: '',
            brinco: 0,
            piquete: '',
            nome_mae: '',

            items_sexo: [ 'Masculino', 'Feminino']
        }
    }

    render() {

        const enviar = async() => {
            let codigo_usuario = auth.currentUser?.uid;
            let data = Timestamp.fromDate( new Date());
            let loc = await findLocation();
            let localizacao = new GeoPoint(loc.coords.latitude, loc.coords.longitude);


            let sexo = this.state.sexo;
            let peso = this.state.peso;
            let medicamento = this.state.medicamento;
            let brinco = this.state.brinco;
            let piquete = this.state.piquete;
            let nome_mae = this.state.nome_mae;
            console.log('pre model')
            let nascimentoModel = new NascimentoModel(codigo_usuario, data, localizacao, sexo, peso, medicamento, brinco, piquete, nome_mae)
            console.log(nascimentoModel)

            const dbRef = collection(db, "nascimento");
            addDoc(dbRef, JSON.parse( JSON.stringify(nascimentoModel)))
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

                    <ComboBox text='Sexo do bezerro' 
                        value={this.state.sexo} 
                        placeHolder= 'Selecione o sexo'
                        items={this.state.items_sexo}
                        onChangeValue={value => {
                            console.log(value);
                            this.setState( {sexo: value })}}/>

                    <NumericUpDown text="Selecione o peso (kg)"
                        default={120}
                        onChange={value => this.setState( { peso: value } )}
                    />

                    <RichTextBox 
                        text= "Digite o medicamento"
                        placeHolder= "Coloque o nome do medicamento"
                        onChangeText={(value) => {this.setState( { medicamento: value } )}}
                    />

                    <NumericUpDown text="Selecione o brinco do bezerro"
                        default={0}
                        onChange={value => this.setState( { brinco: value } )}
                    />

                    <RichTextBox 
                        text= "Digite o piquete"
                        placeHolder= "coloque o piquete"
                        onChangeText={(value) => {this.setState( { piquete: value } )}}
                    />

                    <RichTextBox 
                        text= "Digite o nome do mãe"
                        placeHolder= "insira o nome da mãe"
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
