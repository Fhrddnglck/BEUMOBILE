import * as React from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import HeaderContent from '../HeaderContent/HeaderContent'
import { WebView } from 'react-native-webview'

export default class AnaEkran extends React.Component {

  render() {
    return (
      <ImageBackground
       style={{flex:1}}
       source={require('../../src/images/beu-back-2.png')}
       >
          <HeaderContent navigation={this.props.navigation} />
          <View style={{ flex: 0.3, height: 15,marginTop:5,width:'100%' }} pointerEvents='none'>
            <WebView
              source={{ uri: 'https://w3.beun.edu.tr' }}
              pointerEvents='none'
              style={styles.webViewStyle}
            />
          </View>
          <View style={styles.buttonsBack}>
            <TouchableOpacity style={styles.buttons}
              onPress={() => this.props.navigation.navigate('YemekListesi')}
            //Burda yine ()=> koymazsak otomatik çağırıyor böyle onpress daha sağlıklı çalışıyor
            >
              <Image
                style={styles.buttonsImage}
                source={require('../../src/images/main-food.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons}
              onPress={() => this.props.navigation.navigate('Duyurular')}
            >
              <Image
                style={styles.buttonsImage}
                source={require('../../src/images/main-anno.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons}
              onPress={() => this.props.navigation.navigate('AkademikTakvim')}
            >
              <Image
                style={StyleSheet.flatten([styles.buttons,{width:65,height:65}])}
                source={require('../../src/images/main-calen.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons}
              onPress={() => this.props.navigation.navigate('TelefonRehberi')}
            >
              <Image
                style={styles.buttonsImage}
                source={require('../../src/images/main-phone.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons}
              onPress={() => this.props.navigation.navigate('Eposta')}
            >
              <Image
                style={StyleSheet.flatten([styles.buttons,{width:70,height:70}])}
                source={require('../../src/images/main-letter.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons}
              onPress={() => this.props.navigation.navigate('PersonelAra')}
            >
              <Image
                style={StyleSheet.flatten([styles.buttons,{width:60,height:60}])}
                source={require('../../src/images/main-search.png')}
              />
            </TouchableOpacity>
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
    borderRadius:180,
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
    position: 'absolute',
    width: '89%',
    height: 170,
    marginTop: -45,
    marginLeft:20,
  },
  buttonsImage: {
    width: 50,
    height: 50
  }
})


