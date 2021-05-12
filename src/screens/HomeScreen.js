import React, { useState } from 'react';
import {View,Text,StyleSheet} from 'react-native';
import TextBar from '../components/textBar';



const HomeScreen = () => {
    const [term,setTerm] = useState('');

    const storeTerm = () => {
        console.log({term});
    }
    return <View>
        <Text>HomeScreen now Visible</Text>
        <TextBar
            term={term}
            onTermChange={setTerm}
            onTermSubmit={storeTerm}   //call helper function which adds the text to Notes  
        />
        <Text>New Todo : {term} </Text>
    </View>
}

const styles = StyleSheet.create({

});

export default HomeScreen