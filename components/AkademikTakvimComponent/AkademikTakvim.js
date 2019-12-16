import * as React from 'react';
import { Button, View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import HeaderContent from '../HeaderContent/HeaderContent'
import { WebView } from 'react-native-webview'


export default class AkademikTakvim extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      myText: '',
      myButton: ''
    };

  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderContent navigation={this.props.navigation}/>
        <WebView
          source={{ uri: 'https://w3.beun.edu.tr/akademik_takvim/' }}
          style={{flex:2,marginRight:-150}}
        />
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor:'blue'
  },
  headerNav: {
    flexDirection: 'row',
    width: '100%',
    //backgroundColor:'yellow',
    flex: 1
  },
  text: {
    color: '#161924',
    fontSize: 20,
    fontWeight: '500'
  },
  contentNav: {
    //backgroundColor:'red',
    flex: 4
  }
})