import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import {Image, TextInput, TouchableOpacity} from 'react-native';
import { useEffect } from 'react';

// expo & libraries
import {SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons'; 

//components
import { Text, View ,} from '../components/Themed';
import MenuIcon from '../components/MenuIcon';

import main from '../styles/main';

//assets
import logo from 'assets/images/capivara.png';
import background from 'assets/cpan.jpg';

//firebase
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {db, app} from '../config/firebase'

//helpers
import { emailValidator } from 'helpers/emailValidator'
import { passwordValidator } from 'helpers/passwordValidator'
import { nameValidator } from 'helpers/nameValidator'
import { handleFirebaseError } from 'helpers/firebaseHandlerExceptions';
import { alertMessage } from 'helpers/alertMessage';
import { render } from 'react-dom';

interface Props{
  navigation: any
}

export default class RegisterScreen extends React.Component<Props> {

  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

  render(){

    const onSignUpPressed = () => {
      const nameError = nameValidator(this.state.name)
      const emailError = emailValidator(this.state.email)
      const passwordError = passwordValidator(this.state.password)
      if(emailError){
        alertMessage("error", 'Ops!', emailError);
        return;
      }
      if(nameError){
        alertMessage("error", 'Ops!', nameError);
        return;
      }
      if(passwordError){
        alertMessage("error", 'Ops!', passwordError);
        return;
      }
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then(async (userData) =>{ 
          updateProfile(auth.currentUser, {displayName: this.state.name}).then(() => { console.log('perfil atualizado')});
          this.props.navigation.navigate('UserScreen')
          
       })
      .catch(error => {
          handleFirebaseError(error)
      });
    }

    return (
    
      <View style={main.centered}>
        <Image source={background} style={{height: '40%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, top: 0, width: '100%', position: 'absolute'}}/>
        <Image source={logo} style={{marginBottom: 2}}/>
        
        <View style={main.card}>
            <Text style={{color: "#000", fontWeight: "bold", fontSize: 18}}>Criar nova conta</Text>
            <Text style={{color: "#000", fontSize: 15}}>Preencha os dados para continuar.</Text>
  
            <View style={main.loginField}>
              <View style={main.viewIcon}>
                <SimpleLineIcons style={main.inputIcon} name="user" size={20} color="#343a40" />
              </View>
              <TextInput style={main.input} value={this.state.name}
                  onChangeText={(text) => this.setState({ name: text})}
                  autoCapitalize="words"
                  textContentType="name"
                  keyboardType="default" placeholder="Digite seu nome e sobrenome" />
            </View>
  
            <View style={main.loginField}>
              <View style={main.viewIcon}>
                <Foundation style={main.inputIcon} name="mail" size={20} color="#343a40" />
              </View>
              <TextInput style={main.input} value={this.state.email}
                  onChangeText={(text) => this.setState({ email: text })}
                  autoCapitalize="none"
                  textContentType="emailAddress"
                  keyboardType="email-address" placeholder="Digite seu e-mail" />
            </View>
  
  
            <View style={main.loginField}>
              <View style={main.viewIcon}>
                <MaterialCommunityIcons  style={main.inputIcon} name="key" size={20} color="#343a40" />
              </View>
              <TextInput style={main.input} onChangeText={(text) => this.setState({ password: text})} placeholder="Digite sua senha" secureTextEntry={true}/>
            </View>
  
            <TouchableOpacity style={main.buttonSignOut} onPress={onSignUpPressed}>
              <Text style={main.buttonText}>Registrar</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('LoginScreen')}}>
              <Text style={{ alignSelf:'center', margin: 15, color: "#1177d1"}}>Já tenho uma conta.</Text>
            </TouchableOpacity>
            
  
        </View>
        
  
      </View>
    )
  }
  
};