import * as React from 'react';
import { TextInput, Button, View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Picker, Alert, } from 'react-native';
import { WebView } from 'react-native-webview'
import HeaderContent from '../HeaderContent/HeaderContent'



export default class AkilliKart extends React.Component {
  constructor(props) {
    super(props);
    this.WEBVİEW_REF = React.createRef(); //REFERANCE FOR WEBVİEW
  }
  refreshScreen(webViewState) {
    console.log(webViewState.url)
    if (webViewState.url == 'https://w3.beun.edu.tr/') {
      this.WEBVİEW_REF.current.reload(); //PERFECT SOLUTION 
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderContent navigation={this.props.navigation} />
        <WebView
          ref={this.WEBVİEW_REF}
          source={{ uri: 'http://otomasyon.beun.edu.tr' }}
          style={{ flex: 2, marginBottom: -120 }}
          scalesPageToFit={true}
          onNavigationStateChange={this.refreshScreen.bind(this)}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }

});





