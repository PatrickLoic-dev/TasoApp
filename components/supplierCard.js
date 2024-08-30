import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const supplierCard = ({item, navigation}) => {
    return (
        <TouchableOpacity style = {styles.productCard}>
        <Image source={{uri : item.avatar}} style = {styles.image}/>
        <View style = {{marginLeft : 16}}>
            <Text style = {{fontSize : 32, fontWeight : 'bold'}}>Name : {item.name}</Text>
            <Text style = {{fontSize : 24, color : '#009090'}}>Phone : {item.contactNumber}</Text>
            <Text style = {{fontSize : 24, color : '#009090'}}>Mail : {item.email}</Text>
        </View>
    </TouchableOpacity>

    )
}


export default supplierCard;

const styles = StyleSheet.create({
    image : {   
        width : 150,
        height : 150,
        borderRadius: 15
    },
    productCard : {
        backgroundColor: '#FFF',
        height: 200,
        marginTop : 32,
        alignItems : 'center',
        paddingHorizontal : 24,
        flexDirection : 'row',
        borderRadius : 12
    },
})