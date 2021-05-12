import React, { useState } from 'react';
import {View,Text,StyleSheet} from 'react-native';
import TextBar from '../components/textBar';



const HomeScreen = () => {
    const [term,setTerm] = useState('');

    const storeTerm = () => {
        console.log({term});
    }
    return <View style= {{flexDirection: 'column'}}>
        <View style = {styles.top} >
            <TextBar
                term={term}
                onTermChange={setTerm}
                onTermSubmit={storeTerm}   //call helper function which adds the text to Notes  
            />
            <Text>New Todo : {term} </Text>
        </View>
        <View style = {styles.bottom}>
            <Text>//Different todo lists</Text>
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