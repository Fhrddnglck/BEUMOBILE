import * as React from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import HeaderContent from '../HeaderContent/HeaderContent'
import { WebView } from 'react-native-webview'

class MainButton extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.buttons}
        onPress={() => this.props.nav(this.props.name)}
      >
        <Image
          style={styles.buttonsImage}
          source={this.props.mySrc}
        />
      </TouchableOpacity>

    )
  }
}

export default class AnaEkran extends React.Component {

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../../src/images/beu-back-2.png')}
      >
        <HeaderContent navigation={this.props.navigation} />
        <View style={{ flex: 0.25, marginTop: 5, width: '90%', marginLeft: 16 }} pointerEvents='none'>
          <WebView
            source={{ uri: 'https://w3.beun.edu.tr' }}
            pointerEvents='none'
            style={styles.webViewStyle}
          />
        </View>
        <View style={styles.buttonsBack}>
          <MainButton name='YemekListesi' nav={navigate} mySrc={require('../../src/images/main-food.png')} />
          <MainButton name='Duyurular' nav={navigate} mySrc={require('../../src/images/main-anno.png')} />
          <MainButton name='AkademikTakvim' nav={navigate} mySrc={require('../../src/images/main-calen.png')} />
          <MainButton name='TelefonRehberi' nav={navigate} mySrc={require('../../src/images/main-phone.png')} />
          <MainButton name='Eposta' nav={navigate} mySrc={require('../../src/images/main-letter.png')} />
          <MainButton name='PersonelAra' nav={navigate} mySrc={require('../../src/images/main-search.png')} />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerNav: {
    flexDirection: 'row',
    width: '100%',
    flex: 1
  },
  text: {
    color: '#161924',
    fontSize: 20,
    fontWeight: '500'
  },
  contentNav: {
    flex: 4
  },
  buttons: {
    backgroundColor: 'white',
    height: 150,
    width: 150,
    borderRadius: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsBack: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignContent: 'space-around'
  },
  webViewStyle: {
    flex: 1,
    marginTop: -45,
    resizeMode: 'cover'
  },
  buttonsImage: {
    width: 50,
    height: 50
  }
})


