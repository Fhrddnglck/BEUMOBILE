import * as React from 'react';
import { Button, View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import HeaderContent from '../HeaderContent/HeaderContent'
import { WebView } from 'react-native-webview'


export default class AkademikTakvim extends React.Component {
  
  render() {
    return (
      <View style={styles.container}>
        <HeaderContent navigation={this.props.navigation}/>
        <WebView
          source={{ uri: 'https://w3.beun.edu.tr/akademik_takvim/' }}
          style={{flex:1}}
        />
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})