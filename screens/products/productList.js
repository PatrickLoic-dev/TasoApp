import { Text, StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { filterIcon, searchIcon, userIcon, addIcon, chevronRight } from '../../utils/icons'
import { getProducts } from '../../api/productApi';
import itemCard from '../../components/itemCard';


export default function ProductListScreen({navigation}) {

    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [productList, setProductList] = useState(products);

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
                <TouchableOpacity style = {styles.productCard} onPress = {() => {navigation.navigate('ProductDetails', item)}}>
                    <Image source={{uri : item.productPhoto}} style = {styles.image}/>
                    <View style = {{marginLeft : 16}}>
                        <Text style = {{fontSize : 32, fontWeight : 'bold'}}>{item.name}</Text>
                        <Text style = {{fontSize : 24, color : '#009090'}}>{item.category.name}</Text>
                        <Text style = {{fontSize : 24, color : '#009090'}}>Stock : {item.quantity}</Text>
                        <Text style = {{fontSize : 24, color : '#000'}}>Price : {item.unitPrice} FCFA</Text>
                    </View>
                </TouchableOpacity>
        )
    }
    


    return (
        <SafeAreaView style={styles.container}>
            <View style = {styles.header}>
                <Text style = {styles.head}>Products</Text>
                <TouchableOpacity style = {styles.profileBtn}>
                <Image source={userIcon} style = {styles.icon}></Image>
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
           
            <TouchableOpacity 
                style = {styles.addBtn}
                onPress = {() => navigation.navigate('AddProduct')}>
                    <Image source={addIcon} style = {styles.addIcon}></Image>
            </TouchableOpacity>
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
        borderRadius : 32,
        flexDirection : 'row',
        width : 200,    
        alignItems : 'center',
        justifyContent : 'space-between',
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