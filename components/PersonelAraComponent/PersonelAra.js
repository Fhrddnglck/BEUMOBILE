import React from 'react';
import { ScrollView, ActivityIndicator, Button, View, Text, TouchableOpacity, Image, StyleSheet, Picker, Modal } from 'react-native';
import HeaderContent from '../HeaderContent/HeaderContent'
import { TextInput, FlatList } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';
var HTMLParser = require('fast-html-parser');

let deneme = [];
let myArray = [];
let detail = [];
let colors = ['#ffffff', '#39b36c'];
export default class PersonelAra extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      name: '',
      dataSource: [],
      modalVisible: false,
      currentHref: '',
    };
  }
  OpenModal(myIndex) {
    this.setState({ modalVisible: true, currentHref: detail[myIndex] })
    //console.log(detail[myIndex])
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  _getDatas = (search) => {
    if(search.length>2 || search.length==0){
      deneme = [];
      this.state.dataSource.length = 0; // array remove elements
      myArray = [];
      detail = [];
      this.setState({
        name: search
      })
      
      return fetch('http://webapp.beun.edu.tr/namesearch?type=rehber&q=' + encodeURIComponent(this.state.name.toUpperCase().replace(/I/g,"İ")))
        .then((res) => res.text())
        .then((html) => {
          var root = HTMLParser.parse(html);
          root.querySelector('table').querySelector('tbody').querySelectorAll('td').forEach((value, index) => {
            if (value.text.trim() == 'Özgeçmiş') {
              //console.log(value.childNodes[0].rawAttributes.href + "///" + index);
              detail.push(value.childNodes[0].rawAttributes.href);
            }
            deneme.push(value.text);
          }) //TODO WILL BE CONTINUED
          var newArrayIndex = 0;
          for (var i = 0; i < deneme.length; i += 6) {
            myArray[newArrayIndex] = deneme[i] + '\n' + deneme[i + 1] + '\n' + deneme[i + 2] + '\n' + deneme[i + 3] + '\n' + deneme[i + 4] + '\n';
            newArrayIndex++;
          }
          this.setState({
            dataSource: myArray
          })
        })
    }
  }
  render() {
    return (
      <View style={styles.container} >
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Image
              style={{ width: 75, height: 75 }}
              source={require('../../src/images/beulogo-tabs.png')}
            />
            <TouchableOpacity

              style={{ width: 75, height: 75, marginLeft: 'auto' }}
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}>

              <Image
                style={{ width: 75, height: 75 }}
                source={require('../../src/images/check-close-icon.png')}
              />
            </TouchableOpacity>
          </View>
          <WebView
            source={{ uri: this.state.currentHref }}
            style={{ flex: 2 }}
          />
        </Modal>
        <HeaderContent navigation={this.props.navigation} />
        <View style={{marginTop: 10,alignItems:'center'}}>
          <Text style={{ fontWeight: 'bold',fontSize:20}}>Zonguldak Bülent Ecevit Üniversitesi</Text>
          <Text style={{ fontWeight: 'bold',fontSize:20}}>Telefon Rehberi</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text>Ad-Soyad ya da numara girerek arama yapabilirsiniz.</Text>
          <TextInput
            placeholder='...'
            onChangeText={(value) => this._getDatas(value)}
            style={styles.inputStyle}
          />
        </View>
        <FlatList
          data={this.state.dataSource} //TODO CV NAVIGATION
          keyExtractor={({ id }, index) => index.toString()}
          renderItem={({ item, index }) =>
            <View style={StyleSheet.flatten([styles.flatList,{backgroundColor:colors[index%colors.length]}])}>
              <Text style={{ color: 'black' }}>{item}</Text>
              {this.isTextShow(index)}
            </View>}

        />
      </View>


    )

  }
  isTextShow(myIndex) {

    if (detail[myIndex] != undefined) {
      return (
        <TouchableOpacity onPress={() => this.OpenModal(myIndex)}>
          <View style={{alignItems:'center',width:'30%',alignSelf:'center',borderWidth:1.2,borderRadius:25,borderColor:myIndex%2==0?'#39b36c':'#ffffff'}}>
            <Text style={{color:myIndex%2==0?'#39b36c':'#ffffff',fontWeight:'bold',padding:10}}>ÖZGEÇMİŞ</Text>
          </View>

        </TouchableOpacity>
      )
    }
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flatList: {
    marginTop:10,
    justifyContent: 'center',
    alignSelf: 'center',
    width:'100%',
    height: 170
  },
  inputStyle:{
    shadowColor:'#000',
    shadowOffset:{width:0,height:8},
    shadowOpacity:0.46,
    shadowRadius:11.14,
    elevation:17,
    marginTop:15,
    width: 200, 
    borderColor: '#cceded', 
    borderWidth: 1,
    borderRadius:15,
    backgroundColor:'#e1eded'
  }
});