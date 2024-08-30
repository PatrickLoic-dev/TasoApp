import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { userIcon } from '../../utils/icons';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';


export default function ProductDetailScreen({route, navigation}) {
  const product = route.params;
  return (
    <SafeAreaView  style={styles.container}>
      <View style = {styles.header}>
                  <TouchableOpacity onPress = {() => navigation.goBack()}>
                    <Entypo name="chevron-left" size={40} color="black" />
                  </TouchableOpacity>
                    <Text style = {styles.head}>Product Details</Text>
                  <TouchableOpacity style = {styles.profileBtn}>
                    <Image source={userIcon} style = {styles.icon}></Image>
                  </TouchableOpacity>
      </View>
      <View>
        <View style = {{alignItems: 'center'}}>
          <Image source={{uri : "https://www.esquire.co.za/images/noimg.png"}} style = {styles.image}/>
        </View>
        <View style = {{marginLeft : 16, marginTop : 16}}>
            <View>
              <Text style = {{fontSize : 32, fontWeight : 'bold'}}>Product Code</Text>
              <Text style = {{fontSize : 24, fontWeight : 'bold'}}>{product.productCode}</Text>
            </View>
            <View>
              <Text style = {{fontSize : 32, fontWeight : 'bold'}}>Product Name</Text>
              <Text style = {{fontSize : 24, fontWeight : 'bold'}}>{product.name}</Text>
            </View>
            <View style= {{marginVertical : 16}}>
              <Text style = {{fontSize : 32, fontWeight : 'bold'}}>Category</Text>
              <Text style = {{fontSize : 24, fontWeight : 'bold'}}>{product.category.name}</Text>
            </View>
            <View>
              <Text style = {{fontSize : 32, fontWeight : 'bold'}}>Stock</Text>
              <Text style = {{fontSize : 24, fontWeight : 'bold', color : '#009090'}}>{product.stockQuantity}</Text>
            </View>
            <View>
              <Text style = {{fontSize : 32, color : '#000', fontWeight : 'bold'}}>Price</Text>
              <Text style = {{fontSize : 24, fontWeight : 'bold'}}>{product.unitPrice} FCFA</Text>
            </View>
        </View>

        <View>
          <TouchableOpacity style = {{backgroundColor : '#009090', padding : 20, borderRadius : 8, alignItems : 'center', justifyContent : 'center', marginTop : 16, flexDirection : 'row'}}>
            <Feather name="shopping-cart" size={40} color="#FFF" />
            <Text style = {{fontSize : 24, color : '#FFF', marginLeft : 16}}>Restock Product</Text>
          </TouchableOpacity>
          <View style = {{flexDirection  : 'row'}}>
          <TouchableOpacity style = {{backgroundColor : '#e5c51a', padding : 20, borderRadius : 8, alignItems : 'center', justifyContent : 'center', marginTop : 16, marginRight : 16,width : 362, flexDirection : 'row'}}>
            <Feather name="edit-2" size={40} color="#FFF" />
            <Text style = {{fontSize : 24, color : '#FFF', marginLeft : 16}}>Edit Product</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {{backgroundColor : '#df2c14', padding : 20, borderRadius : 8, alignItems : 'center', justifyContent : 'center', marginTop : 16, width : 362, flexDirection : 'row'}}>
            <Feather name="trash-2" size={40} color="#FFF" />
            <Text style = {{fontSize : 24, color : '#FFF', marginLeft : 16}}>Delete Product</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>

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
  image : {   
    width : 350,
    height : 350,
    borderRadius: 15
},
})