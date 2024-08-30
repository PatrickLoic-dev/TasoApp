import { StatusBar } from 'expo-status-bar';
import {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { textSecondaryColor } from "../../utils/constant";
import { tasoLogo } from '../../utils/images';
import { ActivityIndicator } from "react-native-paper";
import { login } from '../../api/authentificationApi';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [isLoading, setIsLoading] = useState();  


  const getCont = () => {
    if(isLoading == true){
      return <ActivityIndicator color="white" size={24} style={styles.floatingButtonText}/>;
    }else{
      return <Text style={styles.floatingButtonText}>Connexion</Text>;
    }
  
    }


    const handleEmailChange = (value) => {
      setEmail(value);
    };
  
    const handlePasswordChange = (value) => {
      setPassword(value);
    };

    const handleLogin = () => {
      login({
        email: email,
        password: password,
      })
        .then((result) => {
          if (result && result.status == 200) {
            console.log(result.data);
            AsyncStorage.setItem("AuthToken", result.data.authToken);
            setIsLoading(false);
            
            navigation.replace("Dashboard");
            
          }
        })
        .catch((err) => {
          console.error("This is the error : " + err);
          setIsLoading(false);
        });
    };


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image source={tasoLogo} style = {styles.logo}></Image>

      <View style = {styles.textInput}>
      <Text style = {styles.label}>Email</Text>
      <TextInput style={styles.input} onChangeText={handleEmailChange} keyboardType = 'email-address'/>
      </View>

      <View style = {styles.textInput}>
      <Text style = {styles.label}>Password</Text>
      <TextInput style={styles.input} onChangeText={handlePasswordChange}/>
      </View>

      <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.floatingButton}
              onPress={ () => {
               handleLogin(),
              setIsLoading(true)
        }}
            >
              {getCont()}
            </TouchableOpacity>
          </View>
      
      <TouchableOpacity style={styles.link}>
              <Text style={{ color: textSecondaryColor, fontWeight: "600" }}>
                Pas encore membre ?
              </Text>
            </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f3f3',
    padding: 30,
    alignItems: "center",
  },
  label :{
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  logo : {
    height: 400,
    width: 520, 
    marginBottom: 32,
  },
  textInput : {
    marginBottom : 16,
  },
  input : {
    height: 50,
    width: 600,
    paddingHorizontal : 24,
    fontSize: 16,
    borderRadius: 8,
    marginTop : 8,
    backgroundColor : '#FFFF',
  },
  link: {
    alignItems: "center",
    marginTop: 8,
    borderBottomWidth: 1,
    width: 145,
    borderBottomColor: textSecondaryColor,
  },
  btnContainer: {
    marginTop: 64,
  },
  floatingButton: {
    backgroundColor: "#009090",
    borderRadius: 15,
    paddingVertical: 12,
    width: 600,
    paddingHorizontal: 114,
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  floatingButtonText: {
    color: "white",
    fontSize: 24,
    alignContent: "center",
    fontWeight: "bold",
  },
});
