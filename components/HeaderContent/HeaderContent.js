import * as React from 'react';
import { Image, TouchableOpacity, StyleSheet, View ,Text,Animated} from 'react-native'
import { Easing } from 'react-native-reanimated';

export default class HeaderContent extends React.Component {
    constructor(props){
        super(props);
        this.spinValue  = new Animated.Value(0);   //START POSITION VALUE
    }
    spin(){ //ANIMATION
        this.spinValue.setValue(0)
        Animated.timing(
            this.spinValue,{
                toValue:1, //TARGET POSITION VALUE 
                duration:360, // TIMING
                easing:Easing.linear, //LINEAR shape
                useNativeDriver:true //best performance
            }
        ).start()
    }
    render() {
        const spin = this.spinValue.interpolate({
            inputRange:[0,1],
            outputRange:['0deg','360deg']
        })
        return (
            <View style={styles.headerNav}>
                {/* <Image
                    style={{ width: 60, height: 60, marginLeft: 5, marginTop: 5 }}
                    source={require('../../src/images/beulogo-tabs.png')}
                />
                <Text style={{fontSize:25,marginLeft:'auto',alignSelf:'center',color:'#2e2322',textShadowColor:'black',textShadowOffset:{height:1},textShadowRadius:5}}>ZBEÜ<Text style={{fontSize:30,alignSelf:'center',fontWeight:'bold',color:'#72a3f2'}}>MOBİL</Text></Text> */}
                <Image
                source = {require('../../src/images/headerr.jpeg')}
                style={{width:'85%',height:60}}
                resizeMode = 'contain'
                />
                <TouchableOpacity
                    style={{marginLeft: 'auto'}}
                    onPress={this.props.navigation.openDrawer}
                    onPressIn = {()=>this.spin()}
                    
                >
                    <Animated.Image
                        style={{ width: 60, height: 60, transform:[{rotate:spin}],marginTop:5}}
                        source={require('../../src/images/BUTTON.png')}
                    />

                </TouchableOpacity>
            </View>


        );
    }

}
const styles = StyleSheet.create({
    headerNav: {
        flexDirection: 'row',
        //backgroundColor:'#edf2f5',
        backgroundColor:'#F7F7F7',
        width: '100%',
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15
        //flex: 1
    },
});