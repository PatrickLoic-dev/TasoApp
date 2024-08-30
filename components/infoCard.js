import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

export default function InfoCardComponent ({number, info, marginLeft, marginRight, marginBottom}) {

    return (
    <View style = {[styles.infoCard,{marginLeft : marginLeft, marginRight : marginRight, marginBottom : marginBottom}]}>
        <Text style = {styles.number}>{number}</Text>
        <Text style = {styles.quantity}>Qty</Text>
        <Text style = {styles.info}>{info}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    infoCard : {
        padding : 32,
        backgroundColor: '#FFF',
        height : 170,
        width : 220,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 20
    },
    number : {
        fontSize: 30,
        fontWeight: 'bold',
        color : '#009090'
    },  
    quantity : {
        fontSize: 20,
        color : '#009090'
    },
    info : {
        fontSize: 22,
        marginTop : 12,
        textAlign : 'center',
    }
})