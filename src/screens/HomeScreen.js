import React, { useState ,useEffect} from 'react';
import {View,Text,StyleSheet, FlatList} from 'react-native';
import TextBar from '../components/textBar';
import AsyncStorage  from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    const [term,setTerm] = useState('');
    const [ToDo,setTodo] = useState([]);

    const addItem = () => {
        if(term){
            setTodo([...ToDo,term]);
            setTerm('');
        }
    } 

    useEffect(() => {
        AsyncStorage.setItem('notes',JSON.stringify({ToDo}))
        console.log(ToDo)
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
            <FlatList
                data={ToDo}
                renderItem={ ({item}) => {
                    return <Text>{item}</Text>
                }}
            />
        </View>
    </View>
}



const styles = StyleSheet.create({
    top:{
        height: '22%'
    },
    bottom: {
        height: '72%',
        borderColor: 'grey',
        borderWidth: 1,
        margin: 10
    }
});

export default HomeScreen