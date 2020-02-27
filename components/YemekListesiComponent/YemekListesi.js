import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator, ScrollView, Image, FlatList } from 'react-native'
import HeaderContent from '../HeaderContent/HeaderContent'

var HTMLParser = require('fast-html-parser');
let sources = [];
let date = [];
let newDatas = [];
let slicedFirst = [];
let slicedSecond = [];
var nowadays;

var EduChoose = {
    BIRINCI : 'BIRINCI',
    IKINCI : 'IKINCI',
}

//old --> #c2e8ff
let colors = ['#ffffff', '#e1eded'];
export default class YemekListesi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            selectedButton: EduChoose.BIRINCI
        };

    }
    checkSelectedButton(value, userType) {
        if (value) {
            this.setState({
                dataSource: slicedFirst,
                selectedButton: userType
            })
        } else {
            this.setState({
                dataSource: slicedSecond,
                selectedButton: userType
            })
        }
    }
    componentDidMount() {
        return fetch('https://w3.beun.edu.tr/yemek-listesi.html')
            .then((res) => res.text())
            .then((html) => {
                var root = HTMLParser.parse(html)
                root.querySelector('#sy').querySelectorAll('.tarih').forEach(value => { date.push(value) })
                root.querySelector('#sy').querySelectorAll('tbody').forEach((value) => { sources.push(value) })
                for (var i = 0; i < sources.length; i++) {
                    newDatas.push('                                ' + date[i].text + sources[i].text)
                }
                slicedFirst = newDatas.slice(0, sources.length / 2);
                slicedSecond = newDatas.slice(sources.length / 2, sources.length);
                this.setState({
                    isLoading: false,
                    dataSource: slicedFirst,
                })
                var d = new Date();
                nowadays = d.getDate();
                //nowadays = date[18].childNodes[0].text.toString().slice(0,2);
                console.log(nowadays);
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

                <View style={styles.contentNav}>
                    <HeaderContent navigation={this.props.navigation} />
                    <Text style={{ textAlign: 'center', fontSize: 25 }}>{this.state.myText}</Text>
                    <View style={styles.chooseList}>
                        <TouchableOpacity onPress={() => this.checkSelectedButton(true, EduChoose.BIRINCI)}
                            style={{
                                backgroundColor: this.state.selectedButton === EduChoose.BIRINCI ? '#72a3f2' : 'white',
                                alignItems: 'center',
                                width: 200
                            }}>
                            <Text style={StyleSheet.flatten([styles.buttonText, { color: this.state.selectedButton === EduChoose.BIRINCI ? 'white' : '#1186bd', fontSize: this.state.selectedButton === EduChoose.BIRINCI ? 25 : 15 }])}>I. Öğretim</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.checkSelectedButton(false, EduChoose.IKINCI)}
                            style={{
                                backgroundColor: this.state.selectedButton === EduChoose.IKINCI ? '#72a3f2' : 'white',
                                alignItems: 'center',

                                width: 200
                            }}>
                            <Text style={StyleSheet.flatten([styles.buttonText, { color: this.state.selectedButton === EduChoose.IKINCI ? 'white' : '#1186bd', fontSize: this.state.selectedButton === EduChoose.IKINCI ? 25 : 15 }])}>II. Öğretim</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={this.state.dataSource}
                        horizontal={false} //you may remove this item for vertical list
                        keyExtractor={({ id }, index) => index.toString()}                                                                                                    //vertical '100%'
                        renderItem=
                        {({ item, index }) =>
                            <View
                                style={{
                                    backgroundColor: date[index].childNodes[0].text.slice(0, 2) == nowadays ? '#ff5d52' : colors[index % colors.length] ,
                                    marginTop: 25,
                                    justifyContent: 'center',
                                    width: '100%',
                                    alignSelf: 'center',
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 8
                                    },
                                    shadowOpacity: 0.46,
                                    shadowRadius: 11.14,
                                    elevation: 17
                                }}>
                                <Text style={{ color: 'black' }}>{item}</Text>
                            </View>}
                    />
                </View>
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
    chooseList: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center',
        marginBottom: 10,
        borderWidth: 0.5,
        borderColor: '#1186bd'
    },
    listButtonLeft: {
        backgroundColor: '#1186bd',
        alignItems: 'center',
        width: 200
    },
    listButtonRight: {
        backgroundColor: 'white',
        alignItems: 'center',
        width: 200
    },
    buttonText: {
        fontSize: 15,
    },
    text: {
        color: '#161924',
        fontSize: 20,
        fontWeight: '500'
    },
    contentNav: {
        flex: 4,
    },
})