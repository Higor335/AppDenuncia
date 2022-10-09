import React from "react";
import { TextInput, View } from "react-native";
import styles from "./styles";

import {Text} from '../Themed'

import main from '../../styles/main';
import NumericInput from "react-native-numeric-input";

interface Props {
    text: string,
    default: number,
    onChange: (value: number) => void
}

export default class AppButton extends React.Component<Props>{

    constructor(props: any){
        super(props)
        this.state = {
            value: this.props.default
        }
    }

    render(): React.ReactNode {

        const change = (value: number) => {
            this.props.onChange(value);
            this.setState({ value });
        }

        return(
            <View style={[main.card, {marginTop: 20, paddingTop: 24, justifyContent: 'flex-start', alignItems: 'flex-start'}]}>
              <Text style={{color: "#000", fontSize: 16, textAlign: 'left'}}>{this.props.text}</Text>
              <View style={{marginTop: 15, backgroundColor: 'transparent'}}>
                <NumericInput
                  value={this.state.value} 
                  onChange={change} 
                  totalWidth={140} 
                  totalHeight={40} 
                  iconSize={50}
                  step={1}
                  valueType='real'
                  rounded 
                  textColor='#000'
                  rightButtonBackgroundColor='#1177d1'
                  leftButtonBackgroundColor='#1177d1'/>
              </View>
              
            </View>
        )
    }

    

}