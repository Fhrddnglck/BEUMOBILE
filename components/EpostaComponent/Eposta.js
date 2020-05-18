import * as React from 'react';
import { Button, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview'
import HeaderContent from '../HeaderContent/HeaderContent'


var EduChoose = {
  Ogrenci: 'Ogrenci',
  Personel: 'Personel',
}
export default class Eposta extends React.Component {

  state = {
    selectedChoose: EduChoose.Ogrenci
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderContent navigation={this.props.navigation} />
        <View style={styles.chooseList}>
          <TouchableOpacity onPress={() => this.setState({ selectedChoose: EduChoose.Ogrenci })}
            style={{
              backgroundColor: this.state.selectedChoose === EduChoose.Ogrenci ? '#72a3f2' : 'white',
              alignItems: 'center',
              justifyContent:'center',
              width: 200
            }}>
            <Text style={StyleSheet.flatten([styles.buttonText, { color: this.state.selectedChoose === EduChoose.Ogrenci ? 'white' : '#1186bd', fontSize: this.state.selectedChoose === EduChoose.Ogrenci ? 20 : 15 }])}>Öğrenci E-Posta</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ selectedChoose: EduChoose.Personel })}
            style={{
              backgroundColor: this.state.selectedChoose === EduChoose.Personel ? '#72a3f2' : 'white',
              alignItems: 'center',
              justifyContent:'center',
              width: 200
            }}>
            <Text style={StyleSheet.flatten([styles.buttonText, { color: this.state.selectedChoose === EduChoose.Personel ? 'white' : '#1186bd', fontSize: this.state.selectedChoose === EduChoose.Personel ? 20 : 15 }])}>Personel E-Posta</Text>
          </TouchableOpacity>
        </View>
        {this.state.selectedChoose === EduChoose.Ogrenci
          ? <WebView
            source={{ uri: 'https://stu.karaelmas.edu.tr/sm/src/login.php' }}
            style={{ flex: 2 }}
          />
          :
          <WebView
            source={{ uri: 'https://posta.beun.edu.tr' }}
            style={{ flex: 2 }}
          />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  chooseList: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: '#1186bd'
  },
  buttonText: {
    fontSize: 15,
  },

});






