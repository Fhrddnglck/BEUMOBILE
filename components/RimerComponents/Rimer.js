import * as React from 'react';
import { TextInput, Button, View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Picker, Alert, } from 'react-native';
import { WebView } from 'react-native-webview'
import HeaderContent from '../HeaderContent/HeaderContent'


export default class Rimer extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <HeaderContent navigation={this.props.navigation}/>
        <WebView
          source={{ uri: 'http://webapp.beun.edu.tr/iletisimformu/rimer' }}
          style={{flex:2,marginBottom:-160}}
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





