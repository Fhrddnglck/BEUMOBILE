import * as React from 'react';
import { Button, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview'
import HeaderContent from '../HeaderContent/HeaderContent'
export default class ebys extends React.Component {
  render() {
    return (
        <View style={styles.container}>
        <HeaderContent navigation={this.props.navigation}/>
        <WebView
          source={{ uri: 'https://ebys.beun.edu.tr/enVision/Login.aspx?ReturnUrl=%2fenvision' }}
          style={{flex:2}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
      flex:1
    }
    
    });
    
    




