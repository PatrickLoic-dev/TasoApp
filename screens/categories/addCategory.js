import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView} from 'react-native';
import React,  {useState} from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { userIcon } from '../../utils/icons';
import { ActivityIndicator } from "react-native-paper";
import { TextInput } from 'react-native-paper';
import { createCategory } from '../../api/categoryApi';

export default function AddCategoryScreen({navigation}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  let [isLoading, setIsLoading] = useState();  

  
  const handleNameChange = (value) => {
    setName(value);
    console.log(value);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
    console.log(value);
  };


  const getCont = () => {
    if(isLoading == true){
      return <ActivityIndicator color="white" size={24} style = {{fontSize : 24, color : '#FFF'}}/>;
    }else{
      return <Text style = {{fontSize : 24, color : '#FFF'}}>Add Category</Text>;
    }
  
    }


  const handleCategroySubmission = () => {
    createCategory({
      name : name,
      description : description,
    })
      .then((result) => {
        if (result.status == 201) {
          console.log(result.data);
          setIsLoading(false);
          
          navigation.navigate('CategoryList');
        }
      })
      .catch((err) => {
        console.error("This is the error : " + err);
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style = {styles.header}>
                <TouchableOpacity onPress = {() => navigation.goBack()}>
                  <Entypo name="chevron-left" size={40} color="black" />
                </TouchableOpacity>
                <Text style = {styles.head}>Add a Category</Text>
                <TouchableOpacity style = {styles.profileBtn}>
                  <Image source={userIcon} style = {styles.icon}></Image>
                </TouchableOpacity>
    </View>

    <ScrollView style = {{flex : 1}} showVerticalScrollIndicator = {false}>
      <View>
        <Text style = {styles.label}>Category Name <Text style= {styles.star}>*</Text></Text>
        <TextInput style={styles.input} onChangeText={handleNameChange}/>
      </View>
      <View>
        <Text style = {styles.label}>Description</Text>
        <TextInput
          editable
            multiline
            numberOfLines={4}
            placeholder = "Enter Category Description"
            style={styles.descInput}
            onChangeText={handleDescriptionChange}
        />
      </View>
      

      <TouchableOpacity style = {{backgroundColor : '#009090', padding : 20, borderRadius : 8, alignItems : 'center', marginTop : 16}} onPress={() => {
              handleCategroySubmission(),
              setIsLoading(true)
        }}>
        {getCont()}
      </TouchableOpacity>
      <Text style = {{marginTop : 8}}>All the labels with stars (*) should be filled</Text>
    </ScrollView>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f3f3',
        padding: 30,
        fontSize: 24,
    },
    header : {
        paddingVertical: 30,
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: 'space-between',
    }, 
    head : {
        fontSize: 40,
        fontWeight : 'bold',
        marginRight: 20,
    },
    profileBtn : {
        backgroundColor: '#009090',
        padding: 15,
        height: 70,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    icon : {
        width: 40,
        height: 40
    },
    label :{
        fontSize: 32,
        fontWeight: "bold",
    },
    star:{
        color: '#009090'
    },
    input : {
        height: 70,
        paddingHorizontal : 24,
        fontSize: 24,
        borderRadius: 8,
        marginVertical : 8,
        backgroundColor : '#FFFF',
        borderColor : "#C1C1C1",
        borderWidth: 1,
    },
    descInput: {
        padding: 10, 
        fontSize: 24, 
        borderRadius: 8, 
        marginVertical : 8, 
        backgroundColor : '#FFFF', 
        borderColor : "#C1C1C1", 
        borderWidth: 1,
    },
    productPhoto : {
        height: 200,
        borderRadius: 8,
        marginVertical : 8,
        backgroundColor : '#FFFF',
        borderColor : "#C1C1C1",
        borderWidth : 1,
        alignItems: 'center',
        justifyContent : 'center'
    },
    dropdown: {
        height: 70,
        backgroundColor: '#FFFF',
        borderColor : "#C1C1C1",
        borderWidth: 1,
        paddingHorizontal : 24,
        marginVertical : 8,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    placeholderStyle: {
        fontSize: 24,
        color : '#C1C1C1'
    },
    selectedTextStyle: {
        fontSize: 24,
        fontWeight : '900'
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 24,
    },
    number : {
        marginHorizontal: 20, 
        backgroundColor : "#FFF", 
        fontSize :24, 
        fontWeight : "bold", 
        padding : 10, 
        width : 65, 
        height : 60, 
        textAlign : 'center', 
        borderWidth : 1, 
        borderRadius : 8
    },
    countBtn :  {
        backgroundColor : '#009090',
        padding : 10,
        borderRadius : 8,
    },
})