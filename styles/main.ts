import { processFontFamily } from 'expo-font';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "poppins"
  },

  container: {
    flex: 1,
    backgroundColor: "#e0dee6",

  },
  buttonText:{
    color:"white",
    fontFamily: "poppins",
    fontSize: 16
  },

  centeredprofile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  card:{
    width: '80%',
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  cardDenuncias:{
    width: '80%',
    borderRadius: 8,
    backgroundColor: '#fff',
    flexDirection: "row",
    flexWrap: "wrap",
    textAlign: 'center',
    marginBottom: 80,
    padding: 10
  },

  profileBackground:{
    width: '100%',
    top: 0,
    position: 'absolute',
    backgroundColor: '#1177d1',
    justifyContent: 'center',
    height: '30%',
    alignItems: 'center',
  },
  
  cardProfileIcon:{
    width: '90%',
    flexDirection: "row",
    flexWrap: "wrap",
    textAlign: 'center',
    justifyContent: "center",
    backgroundColor: "transparent",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 60,
    elevation: 3,
    padding: 20,
  },

  cardProfile:{
    width: '80%',
    height: '25%',
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 60,
    elevation: 3,
  },

  buttonSignOut:{
    width:"40%",
    backgroundColor:"#1177d1",
    borderColor: "#0d5ca2",
    borderRadius:8,
    
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  buttonText:{
    color:"white",
    fontFamily: "poppins",
    fontSize: 16
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    height: 40,
    margin: -1,
    padding: 10,
    width: "60%",
    borderRadius: 1,
    borderColor: '#c9cbcc',
    borderWidth: 1,
    color: '#495057',
  },

  
  loginField: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      height: 40,
      width: '90%',
      borderRadius: 1,
      marginTop: 20
  },
  inputIcon: {
    padding: 5,
    backgroundColor: '#eceeef',
    height: 38,
    width: 32,
    textAlign: 'center',
  },
  viewIcon:{
    borderColor: '#c9cbcc',
    borderWidth: 1,
  },

  buttonOtherLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderWidth: 0.5,
    borderColor: '#fff',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 5,
    margin: 5,
  },
  buttonAnonyStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A3439',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    borderRadius: 5,
    width: '60%',
    margin: 5,
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  buttonTextStyle: {
    color: '#fff',
    marginBottom: 4,
    marginLeft: 10,
  },
  buttonIconSeparatorStyle: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
  },

});