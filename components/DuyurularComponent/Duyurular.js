import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator, Image, Button, Alert, Modal, ScrollView,Animated } from 'react-native'
import HeaderContent from '../HeaderContent/HeaderContent'

import * as rssParser from 'react-native-rss-parser'
var HTMLParser = require('fast-html-parser');

let array = [];
let date = [];
let colors = ['#ffffff', '#edebeb'];
export default class Duyurular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            modalVisible: false,
            currentContent: ''
        }
        this.handlePressIn = this.handlePressIn.bind(this);
    }
    handlePressIn(){
        console.log("Presss");
        //TODO MAKE ANIMATION
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    openModal(index) {

        return fetch(array[index])
            .then((res) => res.text())
            .then((html) => {
                var root = HTMLParser.parse(html);
                var yazi = root.querySelector('#anaicerik').text
                this.setState({
                    currentContent: yazi
                })
            })
    }
    OpenModalAndSetModel(visible, index) {
        this.setModalVisible(visible);
        this.openModal(index);
    }
    componentDidMount() {
        return fetch('https://w3.beun.edu.tr/rss')
            .then((response) => response.text())
            .then((responseData) => rssParser.parse(responseData))
            .then((rss) => {
                rss.items.forEach((value) => {
                    if(value.published[3]=='N'&&value.published[4]=='o'&&value.published[5]=='v'){
                        //TODO DATE CHANGE TURKISH FROM ENG
                    }
                    date.push(value.published.split('+0300'));
                    array.push(value.links[0].url)
                })

                this.setState({
                    isLoading: false,
                    dataSource: rss.items
                })
            }).catch(error => { console.log('error:'+error) });
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
                <View style={styles.contentNav}>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                    >
                        <View style={{display:'flex',flexDirection:'row'}}>
                            <Image
                                style={{ width: 75, height: 75}}
                                source={require('../../src/images/beulogo-tabs.png')}
                            />
                            <TouchableOpacity
                                onPressIn={()=>this.handlePressIn()}
                                style={{ width: 75, height: 75,marginLeft:'auto'}}
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>

                                <Image
                                    style={{ width: 75, height: 75 }}
                                    source={require('../../src/images/check-close-icon.png')}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 22, backgroundColor: '#ffd4e1' }}>
                            <View style={{ alignItems: 'center' }}>
                                <ScrollView>
                                    <Text style={{ fontSize: 15, textAlign: 'center' }}>{this.state.currentContent}</Text>
                                </ScrollView>

                            </View>
                        </View>
                    </Modal>




                    <FlatList
                        data={this.state.dataSource}
                        keyExtractor={({ id }, index) => index}
                        renderItem={({ item, index }) => 
                        <View style={{marginTop: 10, backgroundColor: colors[index%colors.length],flexDirection:'row' }}>
                            <View style={{flex:0.5,justifyContent:'center',alignItems:'center'}}>
                            <Image
                            style={{ width: 30, height:30}}
                            source={require('../../src/images/duyuru-icon-list.png')}
                            />
                            </View>
                            <View style={{flex:3,flexDirection:'column'}}>
                            <TouchableOpacity style={styles.listStyle} onPress={() => this.OpenModalAndSetModel(true, index)}>
                                <View>
                                <Text style={{ color: '#2060ba', textAlign: 'center',fontWeight:'bold' }}>{item.title}</Text>
                                </View>
                                <View style={{marginTop:'auto',alignItems:'center'}}>
                                <Text>{date[index]}</Text>
                                </View>
                            </TouchableOpacity>
                            </View>
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
    },
    text: {
        color: '#161924',
        fontSize: 20,
        fontWeight: '500'
    },
    contentNav: {
        flex: 4
    },
    headerNav: {
        flexDirection: 'row',
        width: '100%',
        flex: 1
    },
    listStyle: {
        height: 100
    }

})