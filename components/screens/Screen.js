import React from 'react'
import {View,Text,StyleSheet,SafeAreaView,TouchableOpacity} from 'react-native'

export default class Screen extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <SafeAreaView style={{flex:1}}>
                <TouchableOpacity 
                style={{alignItems:'center',backgroundColor:'yellow',width:'10%',height:'5%',marginLeft:'auto'}}
                onPress={this.props.navigation.openDrawer}
                >
                </TouchableOpacity>
                </SafeAreaView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFF'
    },
    text:{
        color:'#161924',
        fontSize:20,
        fontWeight:'500'
    }
})