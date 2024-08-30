import { Text, StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { filterIcon, searchIcon, userIcon, addIcon, chevronRight } from '../../utils/icons'
import { getProducts } from '../../api/productApi';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSelector,useDispatch } from 'react-redux/dist/react-redux';
import { addToCart } from '../../redux/cartReducer';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function CreateOrderScreen({navigation}) {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [productList, setProductList] = useState(products);
  const cart = useSelector(state => state.cart.products);
  console.log('Cart :' + cart);
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    dispatch(addToCart(item));
  }

    const areItemsPresent = () => {
      let itemsPresent = false;
      if (cart.length >= 1) {
          itemsPresent = true;
      }
      return itemsPresent 
  }


  useEffect(() => {
      // Fetch all products initially
      getAllProducts();

      // Fetch user profile every 60 seconds
      const interval = setInterval(() => {
          getAllProducts();
      }, 30000); // 10000 milliseconds = 10 seconds

      // Clean up the interval to avoid memory leaks
      return () => clearInterval(interval);

  }, []);


  const filterProductList = (text) => {
  setSearchText(text);
  if (text) {
      const filteredList = products.filter(product =>
          product.name.toLowerCase().includes(text.toLowerCase())
      );
      setProductList(filteredList);
  } else {
      setProductList(products);
  }
};

  const getAllProducts = () =>{
      getProducts().then((result) => {
          setProducts(result.data);
          setProductList(result.data);
          console.log('List Data :');
          console.log(productList);
      }).catch(err => {
          console.error("Error"+ err);    
      });
  }

  const itemCard = ({item}) => {
      return (
              <View style = {styles.productCard}>
                  <Image source={{uri : item.productPhoto}} style = {styles.image}/>
                  <View style = {{marginLeft : 16, flexDirection : 'row'}}>
                      <View style ={{overflow : 'hidden', width : 200}}>
                      <Text style = {{flexWrap : 'wrap',flex : 1, fontSize : 32, fontWeight : 'bold'}}>{item.name}</Text>
                      <Text style = {{fontSize : 16, color : '#009090'}}>{item.category.name}</Text>
                      </View>
                      <View>
                      <Text style = {{fontSize : 24, color : '#009090'}}>Stock : {item.stockQuantity}</Text>
                      <Text style = {{fontSize : 24, color : '#000'}}>Price : {item.unitPrice} FCFA</Text>
                      </View>
                      <TouchableOpacity style = {styles.detailBtn} onPress = {() => {addItemToCart(item)}}>
                        <MaterialIcons name="add-shopping-cart" size={32} color="#FFF" />
                      </TouchableOpacity>
                  </View>
              </View>
      )
  }
  


  return (
      <SafeAreaView style={styles.container}>
          <View style = {styles.header}>
              <Text style = {styles.head}>Products</Text>
              <TouchableOpacity style = {styles.profileBtn} onPress = {()=> navigation.navigate('Cart')}>
               <MaterialCommunityIcons name="cart-outline" size={44} color="black" />
               {areItemsPresent() && <View style={{ height: 30, width: 30, backgroundColor: '#FE5300', borderRadius: 24, position: 'absolute', top: 2, right: 4, alignItems : 'center', justifyContent : 'center' }}><Text style = {{fontSize : 24, color : '#FFF'}}>{cart.length}</Text></View>}
              </TouchableOpacity>
          </View>
          <View>
              <View style = {{flexDirection: 'row', alignItems : 'center'}}>
                  <View style={styles.searchBar}>
                      <TextInput
                          style={styles.textInput}
                          placeholder="Search..."
                          onChangeText={filterProductList}
                      />
                      <Image source = {searchIcon} style = {{height : 40, width : 40}}/>
                  </View>
                  <TouchableOpacity style = {styles.filter}>
                      <Text style = {{fontSize : 16, color : '#FFF', fontWeight : 'bold'}}>Filter</Text>
                      <Image source={filterIcon} style = {styles.icon}/>
                  </TouchableOpacity>
              </View>
          </View>

          <FlatList
                  data={productList}
                  keyExtractor={(item) => item._id}
                  renderItem={itemCard}
                  style = {styles.view}
              />
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

      padding: 15,
      height: 70,
      width: 70,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
  },
  addBtn : {
      backgroundColor: '#009090',
      padding: 15,
      height: 100,
      width: 100,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom : 20,
      right : 20,
      borderRadius: 50,
  },
  filter: {
      backgroundColor: '#009090',
      padding: 15,
      height: 50,
      width: 100,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      borderRadius: 12,
  },
  icon : {
      width: 40,
      height: 40
  },
  addIcon: {
      width: 60,
      height: 60
  },
  searchBar: {
      flex : 1,
      height: 50,
      margin: 12,
      borderWidth: 1,
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      flexDirection: 'row',
  },  
  textInput: {
      flex: 1,
      fontSize: 16,
  },
  image : {   
      width : 150,
      height : 150,
      borderRadius: 15
  },

  detailBtn : {
      backgroundColor : '#009090',
      padding : 8,
      borderRadius : 16,
      flexDirection : 'row',
      width : 80,    
      alignItems : 'center',
      justifyContent : 'center',
      marginLeft : 24,
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