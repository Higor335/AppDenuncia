import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import {SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import {Image, TextInput, TouchableOpacity} from 'react-native';
import { Text, View ,} from '../components/Themed';
import main from '../styles/main';

import logo from 'assets/images/capivara.png'; 
import anonimo from 'assets/images/anonimo.png';
import google from 'assets/images/google.png';
import background from 'assets/cpan.jpg';

import { getAuth, signInAnonymously, signInWithEmailAndPassword  } from "firebase/auth";

//helpers
import { alertMessage } from 'helpers/alertMessage';
import { emailValidator } from 'helpers/emailValidator'
import { passwordValidator } from 'helpers/passwordValidator'
import { handleFirebaseError } from 'helpers/firebaseHandlerExceptions';

import { auth } from 'config/firebase';
import AppButton from '../components/AppButton';

interface Props {
  navigation: any
}

export default class LoginScreen extends React.Component<Props> {

  constructor(props: any){
    super(props)
    this.state = {
      email: '',
      password: ''
    };

    auth.onAuthStateChanged(() => { // evento quando logar/deslogar
      if(auth.currentUser){ // verifica se foi feito login
        this.props.navigation.navigate('UserScreen')
      }
    })
  }

  
  
  render(): React.ReactNode {

    // funcoes
    const onLogInPressed = () => {
      let email = this.state.email;
      let password = this.state.password;
      const emailError = emailValidator(email)
      const passwordError = passwordValidator(password)
      if(emailError){
        alertMessage('error', 'Ops!', emailError);
        return;
      }
      if(passwordError){
        alertMessage('error', 'Ops!', passwordError);
        return;
      }
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          this.props.navigation.navigate('UserScreen')
        })
        .catch((error) => {
          handleFirebaseError(error)
        });
    }

    const signAnononly = () => {
      const auth = getAuth();
      signInAnonymously(auth)
        .then(() => {
          this.props.navigation.navigate('UserScreen')
        })
        .catch((error) => {
          handleFirebaseError(error)
        });
    }

    return (
      <View style={main.centered}>
      <Image source={background} style={{height: '40%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, top: 0, width: '100%', position: 'absolute'}}/>
      <Image source={logo} style={{marginBottom: 2}}/>
      
      <View style={main.card}>
          <Text style={{color: "#000", fontWeight: "bold", fontSize: 18}}>Seja bem-vindo(a)!</Text>
          <Text style={{color: "#000", fontSize: 15}}>Faça o login ou entre anonimamente.</Text>
          <View style={main.loginField}>
            <View style={main.viewIcon}>
              <SimpleLineIcons style={main.inputIcon} name="user" size={20} color="#343a40" />
            </View>
            <TextInput style={main.input}
                onChangeText={(text) => this.setState( { email: text })}
                autoCapitalize="none"
                textContentType="emailAddress"
                keyboardType="email-address" placeholder="Digite seu e-mail" />
          </View>

          <View style={main.loginField}>
            <View style={main.viewIcon}>
              <MaterialCommunityIcons  style={main.inputIcon} name="key" size={20} color="#343a40" />
            </View>
            <TextInput style={main.input} onChangeText={(text) => this.setState( { password: text })} placeholder="Digite sua senha" secureTextEntry={true}/>
          </View>

          <AppButton text='Fazer Login' onPress={onLogInPressed}/>

          <TouchableOpacity onPress={() => {this.props.navigation.navigate('RegisterScreen')}}>
            <Text style={{ alignSelf:'center', margin: 15, color: "#1177d1"}}>Criar uma conta</Text>
          </TouchableOpacity>
          
          <View style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
            <View style={{backgroundColor: 'black', height: 1, flex: 1, alignSelf: 'center'}} />
            <Text style={{ alignSelf:'center', paddingHorizontal:5, color: "#000"}}>ou se preferir</Text>
            <View style={{backgroundColor: 'black', height: 1, flex: 1, alignSelf: 'center'}} />
          </View>

          <View style={{backgroundColor:'transparent', flexDirection: 'row',
        flexWrap: 'wrap',}}>
            <TouchableOpacity style={main.buttonOtherLogin} activeOpacity={0.5} >
              <Image
                source={google}
                style={main.buttonImageIconStyle}
              />
            </TouchableOpacity>

            <TouchableOpacity style={main.buttonOtherLogin} activeOpacity={0.5} onPress={signAnononly}>
              <Image
                source={anonimo}
                style={main.buttonImageIconStyle}
              />
            </TouchableOpacity>
          </View>
          

      </View>
      

    </View>
    )
  }
};