import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator, Image, Button, Alert, Modal, ScrollView, Animated } from 'react-native'
import HeaderContent from '../HeaderContent/HeaderContent'
import CustomModel from '../CustomModel/CustomModel'
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
    }
    handlePressIn = () => {
        console.log("Presss");
        console.log('dsadsa')
        //TODO MAKE ANIMATION
    }
    showModal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        });
    };
    openModal(index) {
        this.showModal();
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
    componentDidMount() {
        return fetch('https://w3.beun.edu.tr/rss')
            .then((response) => response.text())
            .then((responseData) => rssParser.parse(responseData))
            .then((rss) => {
                rss.items.forEach((value) => {
                    //MORE MONTH WILL CHANGE
                    date.push(value.published.replace('Feb','Subat').replace('May','Mayıs').replace('Jan','Ocak').replace('Dec','Aralık').split('+0300'));
                    array.push(value.links[0].url)
                })
                

                this.setState({
                    isLoading: false,
                    dataSource: rss.items
                })
            }).catch(error => { console.log('error:' + error) });
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
                    <CustomModel modalVisible={this.state.modalVisible} onClose={this.showModal}>

                        <View style={{ marginTop: 22 }}>
                            <View style={{ alignItems: 'center' }}>
                                <ScrollView>
                                    <Text style={{ fontSize: 15, textAlign: 'center' }}>{this.state.currentContent}</Text>
                                </ScrollView>

                            </View>
                        </View>
                    </CustomModel>

                    <FlatList
                        data={this.state.dataSource}            //tostring has rescue from cellvisualze
                        keyExtractor={({ id }, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            <View style={{ marginTop: 10, backgroundColor: colors[index % colors.length], flexDirection: 'row' }}>
                                <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image
                                        style={{ width: 30, height: 30 }}
                                        source={require('../../src/images/duyuru-icon-list.png')}
                                    />
                                </View>
                                <View style={{ flex: 3, flexDirection: 'column' }}>
                                    <TouchableOpacity style={styles.listStyle} onPress={() => this.openModal(index)}>
                                        <View>
                                            <Text style={{ color: '#2060ba', textAlign: 'center', fontWeight: 'bold' }}>{item.title}</Text>
                                        </View>
                                        <View style={{ marginTop: 'auto', alignItems: 'center' }}>
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