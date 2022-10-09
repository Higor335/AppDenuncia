import React from "react";
import { TextInput, View } from "react-native";
import styles from "./styles";

import {Text} from '../Themed'

import main from '../../styles/main';
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
    text: string,
    value: any,
    placeHolder: string,
    items: any[],
    onChangeValue: (value: any) => void
}

export default class AppButton extends React.Component<Props>{

    constructor(props: any){
        super(props)
    }

    render(): React.ReactNode {
        return(
            <View style={[main.card, {marginTop: 20, paddingTop: 24, justifyContent: 'flex-start', alignItems: 'flex-start'}]}>
              <Text style={{color: "#000", fontSize: 16, textAlign: 'left'}}>{this.props.text}</Text>
              <SelectDropdown
                data={this.props.items}
                onSelect={(selectedItem, index) => this.props.onChangeValue(selectedItem)}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                renderDropdownIcon={isOpened => {
                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                  }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
                dropdownIconPosition={"right"}
                defaultButtonText={this.props.placeHolder}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}/>

                
            </View>
        )
    }

    

}