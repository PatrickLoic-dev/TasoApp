import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { SvgUri } from 'react-native-svg'
import { chevronRight, userIcon } from '../../utils/icons'
import InfoCardComponent from '../../components/infoCard'
import ActionButton from '../../components/menuButton'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function HomeScreen({navigation}) {

  function ActionButton ({number, info, marginLeft, marginRight, marginBottom}) {

    return (
    <TouchableOpacity style = {[styles.infoCard,{marginLeft : marginLeft, marginRight : marginRight, marginBottom : marginBottom}]} onPress = {()=> navigation.navigate('OrderScreen')}>
        <MaterialCommunityIcons name="clipboard-search-outline" size={24} color="black" />
        <Text style = {styles.info}>{info}</Text>
    </TouchableOpacity>
    )
    }



    return (
      <View style = {styles.container}>
            <View style = {styles.header}>
                <Text style = {styles.head}>Taso Lounge Dashboard</Text>
                <TouchableOpacity style = {styles.profileBtn}>
                <Image source={userIcon} style = {styles.icon}></Image>
                </TouchableOpacity>
            </View>
            <View>
                <Text style = {styles.sectionHead}>Recent Activity</Text>
                
                <View style = {styles.cardSection}>
                  <InfoCardComponent number = {741} info = "PRODUCTS" marginBottom={24}/>
                  <InfoCardComponent number = {123} info = "TOTAL ORDERS" marginLeft={24} marginRight={24} />
                  <InfoCardComponent number = {12} info = "PROVIDERS"/>
                  <InfoCardComponent number = {1} info = "CUSTOMERS"/>
                
                </View>
            </View>

            <View>
                <Text style = {styles.sectionHead}>Actions</Text>
                
                <View style = {styles.cardSection}>
                  <ActionButton number = {741} info = "Add an order"/>
                </View>
            </View>
      </View>
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
      sectionHead: {        
        fontSize: 32,
        fontWeight : 'bold',
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
      nextBtn : {
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
      cardSection : {
          marginTop: 40,
          flexWrap : 'wrap',
          flexDirection : 'row',
          alignItems : 'center',
      },
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