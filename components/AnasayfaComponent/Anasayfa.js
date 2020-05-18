import * as React from 'react';
import { BackHandler, View, Text, ActivityIndicator, FlatList, Alert, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import HeaderContent from '../HeaderContent/HeaderContent'
import { WebView } from 'react-native-webview'



class MainButton extends React.Component {
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    // console.log(this.props.navigation)
    // if(this.props.navigation.state.routeName==='undefined'){
    //   Alert.alert(
    //     'Exit App',
    //     'Exiting the application?', [{
    //       text: 'Cancel',
    //       onPress: () => console.log('Cancel Pressed'),
    //       style: 'cancel'
    //     }, {
    //       text: 'OK',
    //       onPress: () => BackHandler.exitApp()
    //     },], {
    //     cancelable: false
    //   }
    //   )
    //   return true;
    // }
  }
  render() {
    return (
      <TouchableOpacity style={styles.buttons}
        onPress={() => this.props.nav(this.props.name)}
      >
        <Image
          style={styles.buttonsImage}
          source={this.props.mySrc}
        />
        <Text style={{ fontFamily: 'sans-serif-light', color: '#72a3f2', fontSize: 12, marginTop: 4 }}>{this.props.textname}</Text>
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
        {/* <View style={{ flex: 0.21, marginTop: 5, width: '90%', marginLeft: 16 }} pointerEvents='none'>
          <WebView
            source={{ uri: 'https://w3.beun.edu.tr' }}
            pointerEvents='none'
            style={styles.webViewStyle}
          />
        </View> */}
        <View style={styles.buttonsBack}>
          <MainButton textname='Haberler' name='Haberler' nav={navigate} mySrc={require('../../src/images/main-news.png')} />
          <MainButton textname='Duyurular' name='Duyurular' nav={navigate} mySrc={require('../../src/images/main-anno.png')} />
          <MainButton textname='Telefon Rehberi' name='TelefonRehberi' nav={navigate} mySrc={require('../../src/images/main-phone.png')} />
          <MainButton textname='Akademik Takvim' name='AkademikTakvim' nav={navigate} mySrc={require('../../src/images/main-calen.png')} />
          <MainButton textname='Kütüphane' name='Kutuphane' nav={navigate} mySrc={require('../../src/images/main-library.png')} />
          <MainButton textname='Uzem' name='Uzem' nav={navigate} mySrc={require('../../src/images/main-uzem.png')} />
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
    width: '100%',
    marginTop: -45,
    resizeMode: 'cover'
  },
  buttonsImage: {
    width: 50,
    height: 50
  }
})


