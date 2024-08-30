import { Text, StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import React, { Component, useState, useEffect } from 'react'
import { filterIcon, searchIcon, userIcon, addIcon } from '../../utils/icons'
import { getCategories } from '../../api/categoryApi';
import categroyCard from '../../components/categoryCard';


export default function CategoryListScreen({navigation}) {
    const [categories, setCategories] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [categoryList, setCategoryList] = useState(categories);

    useEffect(() => {
        // Fetch user profile initially
        getAllCategories();

        // Fetch user profile every 60 seconds
        const interval = setInterval(() => {
            getAllCategories();
        }, 30000); // 10000 milliseconds = 10 seconds

        // Clean up the interval to avoid memory leaks
        return () => clearInterval(interval);

    }, []);


    const filterCategoryList = (text) => {
        setSearchText(text);
        if (text) {
            const filteredList = categories.filter(category =>
                category.name.toLowerCase().includes(text.toLowerCase())
            );
            setCategoryList(filteredList);
        } else {
            setCategoryList(categories);
        }
    };

    const getAllCategories = () =>{
        getCategories().then((result) => {
            console.log('Data :');
            console.log(result.data);
            setCategories(result.data);
        }).catch(err => {
            console.error("Error"+ err);    
        });
    }

return (
        <SafeAreaView style={styles.container}>
            <View style = {styles.header}>
                <Text style = {styles.head}>Categories</Text>
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
                            onChangeText={filterCategoryList}
                        />
                        <Image source = {searchIcon} style = {{height : 40, width : 40}}/>
                    </View>
                </View>
            </View>

                    <FlatList
                            data={categoryList}
                            keyExtractor={(item) => item._id}
                            renderItem={categroyCard}
                            style = {styles.view}
                        />

                <TouchableOpacity style = {styles.addBtn} onPress = {() => navigation.navigate('AddCategory')}>
                    <Image source={addIcon} style = {styles.icon}></Image>
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
    }
})