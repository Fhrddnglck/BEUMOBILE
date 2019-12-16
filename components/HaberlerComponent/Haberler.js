import React,{Component} from 'react';
import HeaderContent from '../HeaderContent/HeaderContent'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';

export default class Haberler extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View>
                <HeaderContent navigation={this.props.navigation} />
                <Text>Haberler</Text></View>
        )
    }

}