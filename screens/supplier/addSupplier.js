import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput} from 'react-native';
import React,  {useState} from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { userIcon } from '../../utils/icons';
import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from 'react-native-paper';
import ActivityIndicator from 'react-native-paper';
import { createSupplier } from '../../api/supplierApi';



export default function AddSupplierScreen({navigation}) {
    const [image, setImage] = useState(null);
    let [isLoading, setIsLoading] = useState(); 
    const [Name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [mail, setMail] = useState("");

    const getCont = () => {
        if(isLoading == true){
            return <ActivityIndicator color="white" size={24} style = {{fontSize : 24, color : '#FFF'}}/>;
        }else{
            return <Text style = {{fontSize : 24, color : '#FFF'}}>Add Supplier</Text>;
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

        const handleSupplierSubmission = () => {
        createSupplier({
            name : Name,
            contactNumber : phoneNumber,
            email : mail,
        })
            .then((result) => {
            if (result && result.status == 200) {
            console.log(result.data);
            setIsLoading(false);
            
            navigation.navigate('SupplierList');
            
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

    const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    console.log("PhoneNumber : "+value);
    };
    const handleMailChange = (value) => {
    setMail(value);
    console.log("Mail : "+value);
    };

return (
        <SafeAreaView style={styles.container}>
            <View style = {styles.header}>
                <TouchableOpacity onPress = {() => navigation.goBack()}>
                    <Entypo name="chevron-left" size={40} color="black" />
                </TouchableOpacity>
                <Text style = {styles.head}>Add a Supplier</Text>
                <TouchableOpacity style = {styles.profileBtn}>
                    <Image source={userIcon} style = {styles.icon}></Image>
                </TouchableOpacity>
            </View>

            <ScrollView style = {{flex : 1}} showVerticalScrollIndicator = {false}>
                <View style = {{alignItems : 'center'}}>
                        {image ? (
                        <TouchableOpacity style = {styles.avatar} onPress={pickImage}>
                            <Avatar.Image size={200} source={{uri : image==""? avatarImage : image}} style = {{marginBottom : 16}}/>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.avatarBtn} onPress={pickImage}>
                            <Feather name="camera" size={64} color="black" />
                        </TouchableOpacity>
                    )} 
                    <Text style = {styles.label}>Supplier's Photo</Text>
                </View>
                <View>
                    <Text style = {styles.label}>Supplier Name <Text style= {styles.star}>*</Text></Text>
                    <TextInput style={styles.input} onChangeText={handleNameChange}/>
                </View>
                <View>
                    <Text style = {styles.label}>Phone Number <Text style= {styles.star}>*</Text></Text>
                    <TextInput style={styles.input} keyboardType = 'phone-pad' onChangeText={handlePhoneNumberChange}/>
                </View>
                <View>
                    <Text style = {styles.label}>Mail <Text style= {styles.star}>*</Text></Text>
                    <TextInput style={styles.input} keyboardType = 'email-address' onChangeText={handleMailChange}/>
                </View>

                <TouchableOpacity style = {{backgroundColor : '#009090', padding : 20, borderRadius : 8, alignItems : 'center', marginTop : 16}} onPress = {() => {handleSupplierSubmission(), setIsLoading(true)}}>
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
    avatar : {
        alignItems : 'center',
    },
    avatarBtn : {
        backgroundColor : "#C1C1C1",
        height : 200,
        width : 200,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 100,
        marginBottom : 8
    }
})