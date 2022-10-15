import * as React from 'react';
import { Text, View } from '../components/Themed';
import main from '../styles/main';
import DropDownPicker from 'react-native-dropdown-picker';

interface Props {
  navigation: any
}

export default class ReportScreen extends React.Component<Props> {

  constructor(props){
    super(props)
    this.state = {
      open: false,
      value: 0,
      items: [
        {label: 'Nascimento', value: 'NascimentoScreen'},
        {label: 'Mortalidade', value: 'MortalidadeScreen'},
        {label: 'Nutricao', value: 'NutricaoScreen'}
      ]
    }
  }


  render(): React.ReactNode {

    const { open, value, items } = this.state;

    const setOpen = (open) => {
      this.setState({
        open
      });
    }
  
    const setValue = (callback) => {
      this.setState(state => ({
        value: callback(state.value)
      }));
    }
  
    const setItems = (callback) => {
      this.setState(state => ({
        items: callback(state.items)
      }));
    }

    return (
      <View style={main.centered} >
          <View style={{width: '80%'}}>
            <Text style={{color:'#000', fontFamily: 'poppins'}}>Selecione uma situação</Text>
            <DropDownPicker style={{
              width: '100%', alignContent: 'center', borderRadius: 0, borderColor: 'transparent'
              }}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Selecione uma ocorrência"
              onChangeValue={() => {
                let value = this.state.value;
                this.props.navigation.navigate(value)
              }}
            />
  
          </View>
          
      </View>
    )
  }
};

