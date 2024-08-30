import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const categroyCard = ({item, navigation}) => {
    return (
            <TouchableOpacity style = {styles.productCard} onPress = {() => navigation.navigate('ProductDetails')}>
                <Image source={{uri : "https://www.esquire.co.za/images/noimg.png"}} style = {styles.image}/>
                <View style = {{marginLeft : 16}}>
                    <Text style = {{fontSize : 32, fontWeight : 'bold'}}>{item.name}</Text>
                    <Text style = {{fontSize : 24, color : '#009090'}}>{item.description}</Text>
                </View>
            </TouchableOpacity>
    )
}


export default categroyCard;

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