import * as React from 'react';
import {Dimensions,View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator} from 'react-native';
import HeaderContent from '../HeaderContent/HeaderContent'
import {FlatList} from 'react-native-gesture-handler';
import CustomModel from '../CustomModel/CustomModel'
import {Picker} from '@react-native-community/picker'

const {width,height} = Dimensions.get('window')
var HTMLParser = require('fast-html-parser');
let colors = ['#ffffff', '#c2e8ff'];
export default class EtkinlikTakvimi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMonth: 1,
      years: [],
      selectedYears: '2019',
      datas: [],
      details: [],
      isLoading: true,
      modalVisible: false,
      currentHref: '',
      loadedURL: false,
      currentImageURL: '',
      currentText:'',
      dates : [],
    }
  }
  componentDidMount() {
    return fetch('https://w3.beun.edu.tr/tum-etkinlikler.html')
      .then(res => res.text())
      .then(html => {
        var root = HTMLParser.parse(html);
        root.querySelector('#icerikdiv').querySelector('#yilsecim').querySelectorAll('option').forEach((values) => { this.setState({years:[...this.state.years,values.text]}) });
        var d = new Date();
        var m = d.getMonth() + 1;
        var y = d.getFullYear();
        this.getDatas(m, y);
        this.setState({
          isLoading: false
        })
      }
      )

  }

  getDatas = (month, year) => {
    this.setState({isLoading:true})
    this.state.details.length = 0;
    this.state.datas.length = 0;
    this.state.dates.length = 0;
    return fetch('https://w3.beun.edu.tr/arsiv/etkinlikler/' + month + '/' + year + '/liste.html')
      .then((res) => res.text())
      .then((html) => {
        var root = HTMLParser.parse(html); 
        root.querySelectorAll('a').forEach((value) => this.setState({datas:[...this.state.datas,value.text]}));
        root.querySelectorAll('.col-10').forEach((value)=>this.setState({dates:[...this.state.dates,value.text]}))
        root.querySelectorAll('a').forEach((value) => this.setState({details:[...this.state.details,'https://w3.beun.edu.tr' + value.rawAttributes.href]}));
        this.setState({isLoading:false})
      })
  }
  OpenModal(myIndex) {
    this.showModal(); //MODAL AÇTIĞIMIZ YER
    this.setState({currentHref: this.state.details[myIndex] }) //TODO BURASI OYNANCAK
    return fetch(this.state.details[myIndex])
      .then((res) => res.text())
      .then((html) => {
        var root = HTMLParser.parse(html);
        var imageURL = 'https://w3.beun.edu.tr/' + root.querySelector('#anaicerik').querySelector('img').rawAttributes.src
        this.setState({
          currentImageURL: imageURL,
          loadedURL: true
        })
      })
      .catch(e => {
         this.EtkinlikText(myIndex);
      })
  }
  EtkinlikText(index){
    return fetch(this.state.details[index])
    .then((res)=>res.text())
    .then((html)=>{
      let myText = '';
      var root = HTMLParser.parse(html);
      root.querySelector('#anaicerik').querySelectorAll('p').forEach((value)=>myText+=value.text+'\n')
      this.setState({
        currentText: myText,
        loadedURL : false
      })
    })
  }
  showModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  };
  _unitList = () => { //TODO REMOVE EMPTY ELEMENT IN ARRAY
    return (this.state.years.map((x, i) => { //TODO YEARS LIST
      return (<Picker.Item key={i} value={x} label={x} />)
    }))
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <HeaderContent navigation={this.props.navigation} />
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <CustomModel modalVisible = {this.state.modalVisible} onClose={this.showModal}> 
        <View>
            {this.state.loadedURL
              ?
                <Image
                  source={{ uri: this.state.currentImageURL }}
                  style={{width:width,height:height/1.2,alignSelf:'center'}} //TODO IMAGE SIZE
                  resizeMode='contain'
                /> 
            : <Text style={{textAlign:'center',fontSize:20,fontFamily:'sans-serif-condensed'}}>{this.state.currentText}</Text>}
          </View>
        </CustomModel>

        <HeaderContent navigation={this.props.navigation} />
        <View style={{ alignSelf: 'center', alignItems: 'center'}}>
                    <Text style={{ fontSize: 15,fontWeight:'bold',marginTop:5 }}>TARİH SEÇ</Text>
                    <View style={{flexDirection:'row'}}>
                    <Picker
                        style={{ width: 150}}
                        mode="dropdown"
                        selectedValue={this.state.selectedMonth}
                        onValueChange={(Month) => this.setState({ selectedMonth: Month })}>
                        <Picker.Item label="Ocak" value="1" key="1" />
                        <Picker.Item label="Şubat" value="2" key="2" />
                        <Picker.Item label="Mart" value="3" key="3"/>
                        <Picker.Item label="Nisan" value="4" key="4"/>
                        <Picker.Item label="Mayıs" value="5" key="5"/>
                        <Picker.Item label="Haziran" value="6" key="6" />
                        <Picker.Item label="Temmuz" value="7" key="7"/>
                        <Picker.Item label="Ağustos" value="8" key="8"/>
                        <Picker.Item label="Eylül" value="9" key="9"/>
                        <Picker.Item label="Ekim" value="10" key="10"/>
                        <Picker.Item label="Kasım" value="11" key="11" />
                        <Picker.Item label="Aralık" value="12" key="12"/>
                    </Picker>
                    <Picker
                        style={{ width: 150 }}
                        mode="dropdown"
                        selectedValue={this.state.selectedYears}
                        onValueChange={(Years) => this.setState({ selectedYears: Years })}>
                        {this._unitList()}
                    </Picker>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.getDatas(this.state.selectedMonth, this.state.selectedYears)}
                        style={styles.buttonStyle}
                    >
                        <Text style={{ fontSize: 25, color: 'white' }}>>></Text>
                    </TouchableOpacity>
                </View>
        <FlatList
          showsVerticalScrollIndicator = {false}
          data={this.state.datas}
          keyExtractor={({ id }, index) => index.toString()}
          renderItem={({ item, index }) =>
            <View key={index} style={StyleSheet.flatten([styles.flatList,{backgroundColor:colors[index%colors.length]}])}>
              <TouchableOpacity
                onPress={() => this.OpenModal(index)}
              >
                <Text style={{ color: '#4479cf',fontSize:18 }}>{item}</Text>
                 <Text style={{fontSize:10,marginLeft:'auto'}}>{this.state.dates[index]}</Text>
              </TouchableOpacity>
            </View>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    height: 125,
    shadowColor:'#000',
    shadowOffset:{width:0,height:8},
    shadowOpacity:0.46,
    shadowRadius:11.14,
    elevation:17,
    marginTop:15
  },
  buttonStyle : {
    width: 81, 
    height: 49, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#52b3d9',
    borderRadius:8,
    marginBottom: 15,
    shadowColor: 'black',
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
}
})




