import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function ActionButton ({number, info, marginLeft, marginRight, marginBottom}) {

    return (
    <TouchableOpacity style = {[styles.infoCard,{marginLeft : marginLeft, marginRight : marginRight, marginBottom : marginBottom}]}>
        <MaterialCommunityIcons name="clipboard-search-outline" size={24} color="black" />
        <Text style = {styles.info}>{info}</Text>
    </TouchableOpacity>
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