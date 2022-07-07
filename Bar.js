import React from "react";
import { StyleSheet, Text, View, Image } from 'react-native';
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import AppName from "./AppName";
import Setting from "./Setting";
import Token from "./Token";

function Bar() {
    return(
        <View style={styles.bar}>
            <AppName />
            <Token userName = {clickProps.userName}/>
            <Setting />  
        </View>
    )
  }

export default Bar

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: 'green',
        height: '12%',
        alignItems: 'flex-end',
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        
      },
})