import React, { useState ,useEffect} from 'react';
import {View,Text,StyleSheet, FlatList,TouchableOpacity, ScrollView, Button} from 'react-native';
import TextBar from '../components/textBar';
import AsyncStorage  from '@react-native-async-storage/async-storage';


const get = async () => {
    try {
        const value = await AsyncStorage.getItem('notes') 
        if(value !== null){
            
            const obj = JSON.parse(value)
            console.log(obj.ToDo)
            return obj.ToDo
        }
        else   
            return []    
    } 
    catch (error) {
        console.error(error);
        return null;
    }
};


const HomeScreen = () => {
    const [term,setTerm] = useState('');
    const [ToDo,setTodo] = useState(get());
    //term to take input
    //ToDo is an array of todo's which are term which is added on pressing enter
    
    //addItem is called by onEndEditing from the input
    const addItem = () => {
        if(term){
            const newToDo = {name: term, done: false}
            setTodo([...ToDo,newToDo]);
            setTerm('');
        }
    } 

    const removeDone = () => {
        const updateToDo = ToDo.filter( (elem) => {
            if(!elem.done){
                return elem
            }
        })

        setTodo(updateToDo);
    }

    const removeAll = () => {
        setTodo([]);
    }

    const _storeData = async () => {
        try {
          await AsyncStorage.setItem('notes',JSON.stringify({ToDo}));
        } 
        catch (error) {
          console.log(error)
        }
      };

    //useEffect is used to convert the array and store it in the memory everytime it changes.
    useEffect( () => {
        _storeData()
    }, [{ToDo}]); 

    return <View >
        <View style = {styles.top} >
            <TextBar
                term={term}
                onTermChange={setTerm}
                onTermSubmit={() => addItem()}   //call helper function which adds the text to Notes  
            />
            <Text style={styles.txt}>New Todo : {term} </Text>
        </View>
        
        <View style = {styles.bottom}>
            <ScrollView>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={ToDo}
                renderItem={ ({item}) => {
                    return <TouchableOpacity
                        onPress = {() => {
                            if(item.done){
                                item.done = false;
                            }
                            else{
                                item.done = true;
                            }
                            setTodo([...ToDo])
                        }}
                    >
                        <Text  style={[styles.todo, 
                            item.done ? { color: 'grey' }:{ color: 'black' }
                        ]}>
                            {item.name}</Text>
                    </TouchableOpacity>
                }}
            />
            </ScrollView>
        </View>
        <View style={styles.clearBTN}>
            <TouchableOpacity
                style = {styles.btn}
                onPress = {() => removeDone()}
            >
                <Text style = {styles.btnColor} >Clear Done</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style = {styles.btn}
                onPress = {() => removeAll()}
            >
                <Text style = {styles.btnColor} >Clear All</Text>
            </TouchableOpacity>
        </View>

    </View>
}



const styles = StyleSheet.create({
    txt:{
        marginLeft:10,
        fontSize: 20,
        marginTop: 3
    },
    top:{
        height: '22%'
    },
    bottom: {
        height: '65%',
        borderColor: 'grey',
        borderWidth: 1,
        margin: 10
    },
    todo: {
        fontSize: 18,
        margin: 3,
    },
    clearBTN: {
        flexDirection: 'row',
        width: '100%'
    },
    btn: {
        flex :1,
    },
    btnColor: {
        color: 'blue',
        fontSize: 20,
        marginVertical: 5,
        alignSelf: 'center'
    }
});

export default HomeScreen