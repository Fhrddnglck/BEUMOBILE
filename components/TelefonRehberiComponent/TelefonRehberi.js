import React from 'react';
import { ScrollView, ActivityIndicator, Button, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import HeaderContent from '../HeaderContent/HeaderContent'
import { TextInput, FlatList } from 'react-native-gesture-handler';

var HTMLParser = require('fast-html-parser');

var idariBirimLine = false;
const colors = ['green','#81CFE0','red','orange']
export default class RehberEkrani extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      col1: [],
    };

  }
  componentDidMount() {
    return fetch('https://w3.beun.edu.tr/iletisim/birimler.html')
      .then((res) => res.text())
      .then((html) => {
        var root = HTMLParser.parse(html)
        root.querySelector('#anaicerik').querySelector('.row').childNodes[1].querySelectorAll('.row').forEach(value => this.setState({col1:[...this.state.col1,value.text]}))
        root.querySelector('#anaicerik').querySelector('.row').childNodes[3].querySelectorAll('.row').forEach(value => this.setState({col1:[...this.state.col1,value.text]}))
        this.setState({
          isLoading: false,
        })

        //burada deneme yapabiliyoruz

      }).catch((error) => {
        console.log(error);
      })
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
        <HeaderContent navigation={this.props.navigation} />
        <Text style={{color:'black',fontWeight:'bold'}}>Birimler</Text>
        <View style={styles.contentNav}>
            <FlatList
              data={this.state.col1}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item,index }) => 
              <View style={StyleSheet.flatten([styles.flatListStyle,{borderLeftColor:colors[index%colors.length]}])}>{item=='İdari Birimler'|| item=='Akademik Birimler'?<Text style={{fontSize:25,fontWeight:'bold'}}>{item}</Text>:<Text>{item}</Text>}</View>}
             
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500'
  },
  contentNav: {
    //backgroundColor:'red',
    flex: 4,
    flexDirection: 'row'
  },
  headerNav: {
    flexDirection: 'row',
    width: '100%',
    flex: 1
  },
  flatListStyle:{
    marginLeft:8,
    borderLeftWidth:2,
    marginTop:5,
    borderLeftColor:'#81CFE0'
  }
})
