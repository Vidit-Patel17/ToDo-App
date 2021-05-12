import React from 'react';
import {TextInput,View,StyleSheet} from 'react-native';

const SearchBar = ({term,onTermChange,onTermSubmit}) => {
    return <View style = {styles.bar}>
        <TextInput 
            style={styles.input} 
            placeholder="ToDo"
            value = {term}
            onChangeText = {onTermChange}
            onEndEditing = {onTermSubmit} //executes when user presses enter
        />
    </View>
};

const styles = StyleSheet.create({
    bar: {
        backgroundColor: 'grey',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 7,
        marginTop: 10,
        marginBottom: 10,   
        flexDirection: 'row'
    },
    icon:{
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 3
    },
    input: {
        flex: 1,
        marginHorizontal: 10,
        fontSize: 18
    }
});

export default SearchBar;