import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView} from 'react-native';
import React,  {useState, useEffect} from 'react';
import { getCategories } from '../../api/categoryApi';
import Entypo from '@expo/vector-icons/Entypo';
import { userIcon } from '../../utils/icons';
import { TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { createProduct } from '../../api/productApi';
import { ActivityIndicator } from "react-native-paper";
const data = [];

export default function AddProductScreen({navigation}) {
  const [name,setName] = useState('');
  const [description,setDescription] = useState("");
  const [category,setCategory] = useState(null);
  const [unitPrice, setUnitPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const [value, setValue] = React.useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [image, setImage] = useState(null);

  let [isLoading, setIsLoading] = useState(); 

  
  useEffect(() => {
    GetCategories();
    }, []);
  
  const GetCategories = () =>{
    getCategories().then((result) => {
        console.log("Categories :" + result.data);
        result.data.forEach(category => {
        data.push(category);
        });
        console.log(data);
    }).catch(err => {
        console.error("Error"+ err);    
    });
}



  const getCont = () => {
    if(isLoading == true){
      return <ActivityIndicator color="white" size={24} style = {{fontSize : 24, color : '#FFF'}}/>;
    }else{
      return <Text style = {{fontSize : 24, color : '#FFF'}}>Add Product</Text>;
    }
  
    }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleProductSubmission = () => {
    createProduct({
      name : name,
      unitPrice : unitPrice,
      description : description,
      category : category._id,
      quantity : stock,
    })
      .then((result) => {
        if (result && result.status == 200) {
          console.log(result.data);
          setIsLoading(false);
          
          navigation.goBack();
          
        }
      })
      .catch((err) => {
        console.error("This is the error : " + err);
        setIsLoading(false);
      });
  };

  const handleNameChange = (value) => {
    setName(value);
    console.log("Name : "+value);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
    console.log("Description : "+value);
  };
  const handleUnitPriceChange = (value) => {
    setUnitPrice(value);
    console.log("UnitPrice : "+value);
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style = {styles.header}>
                  <TouchableOpacity onPress = {() => navigation.goBack()}>
                    <Entypo name="chevron-left" size={40} color="black" />
                  </TouchableOpacity>
                  <Text style = {styles.head}>Add a Product</Text>
                  <TouchableOpacity style = {styles.profileBtn}>
                    <Image source={userIcon} style = {styles.icon}></Image>
                  </TouchableOpacity>
      </View>

      <ScrollView style = {{flex : 1}} showsVerticalScrollIndicator = {false}>
        <View>
          <Text style = {styles.label}>Product Name <Text style= {styles.star}>*</Text></Text>
          <TextInput style={styles.input} onChangeText={handleNameChange} />
        </View>
        <View>
          <Text style = {styles.label}>Description</Text>
          <TextInput
            editable
              multiline
              numberOfLines={4}
              placeholder = "Enter Product Description"
              style={styles.descInput}
              onChangeText={handleDescriptionChange}
          />
        </View>
        <View>
          <Text style = {styles.label}>Category <Text style= {styles.star}>*</Text></Text>
          <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: '#009090' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="name"
                valueField="value"
                placeholder={!isFocus ? 'Select a category' : '...'}
                searchPlaceholder="Search..."
                value={category}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setCategory(item);
                    setIsFocus(false);
                    console.log(item);
                }}
                />
        </View>

        <View style = {{flexDirection : 'row',}}>
        <View style = {{marginRight : 40}}>
          <Text style = {styles.label}>Unit Price <Text style= {styles.star}>*</Text></Text>
          <TextInput style={[styles.input,{width : 475}]}  keyboardType = 'numeric' onChangeText={handleUnitPriceChange}/>
        </View>
        <View>
          <Text style = {styles.label}>Initial Stock <Text style= {styles.star}>*</Text></Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical : 10, }}>
            <TouchableOpacity onPress={() => {stock > 0 && setStock(stock - 1), console.log(stock)}} style = {styles.countBtn}><AntDesign name="minus" size={40} color="black" /></TouchableOpacity>
            <TextInput style={styles.number}>{stock}</TextInput>
            <TouchableOpacity onPress={() => {setStock(stock + 1), console.log(stock)}} style = {styles.countBtn}><Ionicons name="add-outline" size={40} color="black" /></TouchableOpacity>
          </View>
        </View>
        </View>

        <View>
        <Text style = {styles.label}>Photo</Text>
        {image ? (
          <TouchableOpacity style={styles.productPhoto} onPress={pickImage}>
            <Image source={{ uri: image }} style={styles.productPhoto} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.productPhoto} onPress={pickImage}>
            <Feather name="camera" size={64} color="black" />
          </TouchableOpacity>
        )}
        </View>

        <TouchableOpacity style = {{backgroundColor : '#009090', padding : 20, borderRadius : 8, alignItems : 'center', marginTop : 16}} onPress={() => {
              handleProductSubmission(),
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