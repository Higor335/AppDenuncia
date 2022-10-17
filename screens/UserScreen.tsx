import * as React from 'react';
import {Image } from 'react-native';

// expo libraries
import * as Location from 'expo-location';

//helpers
import { alertMessage } from 'helpers/alertMessage';

//components
import { Text, View } from '../components/Themed';

// styles
import main from '../styles/main';

//firebase
import { collection, query, where, getDocs, onSnapshot, loadBundle} from "firebase/firestore";

//config
import { auth, db } from '../config/firebase';

//main button
import PlusButton from '../components/PlusButton';

//assets
import user from 'assets/images/user.png';
import exclamation from 'assets/images/exclamation2.png';
import { FloatingAction } from 'react-native-floating-action';


interface Props {
  navigation: any
}

export default class UserScreen extends React.Component<Props> {

  constructor(props: any){
    super(props)
    this.state = {
      denuncias: 0,
      loaded: false,
    }
  }
 
  async fetchDenuncias(){
    const q = query(collection(db, "denuncias"), where("codigo_usuario", "==", auth.currentUser?.uid));
      var docs = await getDocs(q);
      this.setState({ denuncias: docs.size})
      
      onSnapshot(q, querySnapshot => {
        this.setState({ denuncias: querySnapshot.size})
      }, err => {
        console.log(`Encountered error: ${err}`);
      });
      this.setState({loaded: true})
  }

  componentDidMount() {
    if(!this.state.loaded)
      this.fetchDenuncias();
  }

  render(): React.ReactNode {

    let image;
    if(auth.currentUser && auth.currentUser?.photoURL){
      image = <Image source={{uri : auth.currentUser?.photoURL}} style={{marginBottom: 2, width: 100, borderRadius: 150 / 2, height:100}}/>
    }else{
      image = <Image source={user} style={{marginBottom: 2, width: 100, height:100}}/>
    }

    const handlePress = async (name) => {
      if(name == 'bt_new'){
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alertMessage('error',
            "Permissão insuficiente",
            "Desculpa, nós precisamos da permissão de Localização para isso funcionar");
          return;
        }
        this.props.navigation.navigate('ReportScreen')
      }else if(name == 'bt_logout'){
        try {
          await auth.signOut();
          this.props.navigation.navigate('LoginScreen')
      
        } catch (error) {
          console.log(error);
        }
      }
    }

    return (
    
      <View style={main.centeredprofile} >
        <View style={main.profileBackground}>
        <Text style={{color:'#fff', fontFamily:'poppins', fontWeight: "bold", fontSize: 30}}>Perfil</Text>
        </View>
  
  
        <View style={main.cardProfile}>
          <View style={{top: 0, backgroundColor:'transparent'}}> 
            {
              image
            }
          </View>
          <Text style={{color:'#000', fontFamily:'poppins', fontSize: 20, fontWeight: "bold"}}>{auth.currentUser?.isAnonymous ? "Anônimo" : auth.currentUser?.displayName}</Text>
        </View>
  
        <View style={main.cardDenuncias}>
  
          <View style={{width: '20%', backgroundColor:'transparent'}}>
            <Image source={exclamation} style={{width: 40, height: 40}}></Image>
          </View>
  
          <View style={{width: '70%', backgroundColor:'transparent', top: '50%', position: 'absolute', right:40}}>
            <Text>
              <Text style={{color:'#000', fontFamily:'poppins'}}>Você possui </Text>
              <Text style={{color:'#000', fontFamily:'poppins', fontWeight: "bold"}}>{this.state.denuncias}</Text>
              
              <Text style={{color:'#000', fontFamily:'poppins'}}> relatórios</Text>
            </Text>
          </View>
          
        </View>
  
        <FloatingAction actions={actions} iconWidth={30} showBackground={false} iconHeight={30} buttonSize={70} onPressItem={name => handlePress(name)}
        />
  
      </View>
    );
  }

};



const actions = [
  {
    text: "Novo relatório",
    icon: require("assets/images/icons/plus.png"),
    name: "bt_new",
    position: 1,
    buttonSize: 50,
    textStyle: {fontSize: 16, fontWeight: 'bold' }
  },

  {
    text: "Sair",
    icon: require("assets/images/icons/logout.png"),
    name: "bt_logout",
    position: 2,
    buttonSize: 50,
    textStyle: {fontSize: 16, fontWeight: 'bold' }
  },
 
];

