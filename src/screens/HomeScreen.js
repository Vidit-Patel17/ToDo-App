import React, { useState ,useEffect} from 'react';
import {View,Text,StyleSheet, FlatList,TouchableOpacity, ScrollView, Button} from 'react-native';
import TextBar from '../components/textBar';
import AsyncStorage  from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    const [term,setTerm] = useState('');
    const [ToDo,setTodo] = useState([]);
    //term to take input
    //ToDo is an array of todo's which are term which is added on pressing enter

    //addItem is called by onEndEditing from the input
    const addItem = () => {
        if(term){
            const newToDo = {name: term, done: false}
            setTodo([...ToDo,newToDo]);
            setTerm('');
            console.log(ToDo)
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

    //useEffect is used to convert the array and store it in the memory everytime it changes.
    useEffect(() => {
        AsyncStorage.setItem('notes',JSON.stringify({ToDo}))
    }, [{ToDo}]); 

    return <View style= {{flexDirection: 'column'}}>
        <View style = {styles.top} >
            <TextBar
                term={term}
                onTermChange={setTerm}
                onTermSubmit={() => addItem()}   //call helper function which adds the text to Notes  
            />
            <Text>New Todo : {term} </Text>
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
            <Button
                title="Clear Done"
                onPress = {() => removeDone()}
            />
            <Button
                title="Clear All"
                onPress = {() => removeAll()}
            />
        </View>

    </View>
}



const styles = StyleSheet.create({
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
        width: '100%',
        alignContent: 'center'
    }
});

export default HomeScreen