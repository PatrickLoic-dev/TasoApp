import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity, removeItem } from '../../redux/cartReducer';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { addToCart } from '../../redux/cartReducer';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function CartScreen({navigation}) {
    const dispatch = useDispatch();
    const products = useSelector(state => state.cart.products);
    const [stock, setStock] = useState(0);

    const increaseQuantity = (item) => {
        dispatch(incrementQuantity(item));
    }

    const decrementQuantity = (item) => {
       if(item.quantity == 1){
        dispatch(removeItem(item._id));
       }else{
        dispatch(decrementQuantity(item));
       }
    }

    const totalPrice = () => {
        let total = 0;
        products.forEach(item => {
            total += item.stockQuantity * item.price;
        });
        return total
    }


    const itemCard = ({item}) => {
        return (
                <View style = {styles.productCard}>
                    <Image source={{uri : item.productPhoto}} style = {styles.image}/>
                    <View style = {{marginLeft : 16, flexDirection : 'row'}}>
                        <View style ={{overflow : 'hidden', width : 200}}>
                            <Text style = {{fontSize : 16, color : '#009090'}}>{item.productCode}</Text>
                            <Text style = {{flexWrap : 'wrap',flex : 1, fontSize : 32, fontWeight : 'bold'}}>{item.name}</Text>
                            <Text style = {{fontSize : 24, color : '#000'}}>Price : {item.unitPrice} FCFA</Text>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical : 10, }}>
                                <TouchableOpacity onPress={() => increaseQuantity(item)} style = {styles.countBtn}><AntDesign name="minus" size={40} color="black" /></TouchableOpacity>
                                <TextInput style={styles.number}>{item.quantity}</TextInput>
                                <TouchableOpacity onPress={() => decrementQuantity} style = {styles.countBtn}><Ionicons name="add-outline" size={40} color="black" /></TouchableOpacity>
                            </View>
                            <TouchableOpacity style = {styles.detailBtn} onPress = {() => {addItemToCart(item)}}>
                                <MaterialIcons name="add-shopping-cart" size={32} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
        )
    }


  return (
    <SafeAreaView style={styles.container}>
    <View style = {styles.header}>
        <Text style = {styles.head}>Cart</Text>
    </View>

    <ScrollView>
        {products?.map((item, index) => (
                <View style = {styles.productCard} key = {index}>
                <Image source={{uri : item.productPhoto}} style = {styles.image}/>
                <View style = {{marginLeft : 16, flexDirection : 'row'}}>
                    <View style ={{overflow : 'hidden', width : 200}}>
                    <Text style = {{flexWrap : 'wrap',flex : 1, fontSize : 32, fontWeight : 'bold'}}>{item.name}</Text>
                    <Text style = {{fontSize : 24, color : '#000'}}>Price : {item.unitPrice} FCFA</Text>
                    <Text style = {{fontSize : 16, color : '#009090'}}>{item.category.name}</Text>
                    </View>
                    <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical : 10, }}>
                        <TouchableOpacity onPress={() => {stock > 0 && setStock(stock - 1), console.log(stock)}} style = {styles.countBtn}><AntDesign name="minus" size={40} color="black" /></TouchableOpacity>
                        <TextInput style={styles.number}>{stock}</TextInput>
                        <TouchableOpacity onPress={() => {setStock(stock + 1), console.log(stock)}} style = {styles.countBtn}><Ionicons name="add-outline" size={40} color="black" /></TouchableOpacity>
                    </View>
                    <TouchableOpacity style = {styles.detailBtn} onPress = {() => {addItemToCart(item)}}>
                        <MaterialIcons name="add-shopping-cart" size={32} color="#FFF" />
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        ))}
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
    countBtn :  {
        backgroundColor : '#009090',
        padding : 10,
        borderRadius : 8,
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
    stockQuantity : {
        fontSize: 20,
        color : '#009090'
    },
    info : {
        fontSize: 22,
        marginTop : 12,
        textAlign : 'center',
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