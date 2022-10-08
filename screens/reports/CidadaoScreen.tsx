import * as React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

import {Image, TextInput, Alert, TouchableOpacity} from 'react-native';
import { Text, View } from '../../components/Themed';
import main from '../../styles/main';

import DropDownPicker from 'react-native-dropdown-picker';
import NumericInput from 'react-native-numeric-input'
import { auth, db } from '../../config/firebase';
import { collection, addDoc, GeoPoint, Timestamp } from "firebase/firestore";


//helpers
import { alertMessage } from 'helpers/alertMessage';
import { textValidator } from 'helpers/textValidator';
import { findLocation } from 'helpers/locationHelper';
import { handleFirebaseError } from 'helpers/firebaseHandlerExceptions';
import ScreenBase from '../ScreenBase';
import RichTextBox from '../../components/RichTextBox';
import NumericUpDown from '../../components/NumericUpDown';
import AppButton from '../../components/AppButton';
import ComboBox from '../../components/ComboBox';


export default class CidadaoScreen extends ScreenBase{

    constructor(props: any) {
      super(props);
      this.state = {
        //form
        description: '',
        height: 1,
        peso: 60,
        sexo: 'M',

        //state combobox
        items: [
          {label: 'Masculino', value: 'M'},
          {label: 'Feminino', value: 'F'}
        ]
      };
    }

    render(){
      const send = async() => {
        console.log(this.state.peso)
        console.log(this.state.description)
        console.log(this.state.sexo)
        let descError = textValidator(this.state.description);
        if(descError){
          alertMessage("error", 'Ops!', descError)
          return;
        }

        let location = await findLocation();
        console.log(location);
        let reportData = new ReportData(auth.currentUser?.uid, Timestamp.fromDate(new Date()), 
                                          this.state.description, this.state.peso, this.state.sexo,  new GeoPoint(location.coords.latitude, location.coords.longitude), 1);
        console.log(reportData);

        const dbRef = collection(db, "denuncias");
        addDoc(dbRef, reportData)
          .then(async () => {
              console.log("Document has been added successfully");
              alertMessage('success', 'Sucesso!', "Sua ocorrência foi enviada com sucesso!");
              //navigation.navigate('Root', {name: 'UserScreen'})
          })
          .catch(error => {
              handleFirebaseError(error)
          })
      }

      return (
        <View style={main.centered} >

            <RichTextBox text='Descreva a situação da pessoa' 
              placeHolder='Place holder.'
              onChangeText={(text) => this.setState({ description : text})} />

            <NumericUpDown text='Peso aproximado (kg)' 
                default={60}
                onChange={value => this.setState({ peso: value })}/>
    
            <ComboBox text='Sexo da pessoa' 
              value={this.state.sexo} 
              placeHolder= 'Selecione o sexo'
              items={this.state.items}
              onChangeValue={value => {
                console.log(value);
                this.setState( {sexo: value })}}/>

            <View style={{marginBottom: '10%'}}></View>
            
            <AppButton text='Enviar' onPress={send}/>
        </View>
      );
    }

}