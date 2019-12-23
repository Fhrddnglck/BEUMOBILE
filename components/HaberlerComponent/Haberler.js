import * as React from 'react';
import { Dimensions, Button, Modal, View, Text, TouchableOpacity, Image, StyleSheet, Picker, ActivityIndicator } from 'react-native';
import HeaderContent from '../HeaderContent/HeaderContent'
import { FlatList, ScrollView } from 'react-native-gesture-handler';



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
            currentHrefs: [],
            loadedURL: false,
            currentText: '',
            dates : [],
        }
    }
    componentDidMount() {
        return fetch('https://w3.beun.edu.tr/tum-haberler.html')
            .then(res => res.text())
            .then(html => {
                var root = HTMLParser.parse(html);
                root.querySelector('#icerikdiv').querySelector('#yilsecim').querySelectorAll('option').forEach((values) => { this.setState({ years: [...this.state.years, values.text] }) });
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
        this.state.details.length = 0;
        this.state.datas.length = 0;
        this.state.dates.length = 0;
        return fetch('https://w3.beun.edu.tr/arsiv/haberler/' + month + '/' + year + '/liste.html')
            .then((res) => res.text())
            .then((html) => {
                var root = HTMLParser.parse(html);
                root.querySelectorAll('a').forEach((value) => this.setState({ datas: [...this.state.datas, value.text] }));
                root.querySelectorAll('.col-10').forEach((value)=>this.setState({dates:[...this.state.dates,value.text]}))
                root.querySelectorAll('a').forEach((value) => this.setState({ details: [...this.state.details, 'https://w3.beun.edu.tr' + value.rawAttributes.href] }));
            })

    }
    OpenModal(myIndex) {
        this.setState({
            currentText: '',
            currentHrefs: [],
        })
        this.setState({ modalVisible: true, currentHref: this.state.details[myIndex] })
        return fetch(this.state.details[myIndex])
            .then((res) => res.text())
            .then((html) => {
                var root = HTMLParser.parse(html);
                root.querySelector('#anaicerik').querySelectorAll('p').forEach(value => this.state.currentText += value.text);
                root.querySelector('#anaicerik').querySelector('#gallery-1').querySelectorAll('a').forEach(value => this.setState({ currentHrefs: [...this.state.currentHrefs, value.rawAttributes.href] }))
                this.setState({
                    loadedURL: true
                })
            })
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    _unitList = () => { //TODO REMOVE EMPTY ELEMENT IN ARRAY
        return (this.state.years.map((x, i) => { //TODO YEARS LIST
            return (<Picker.Item value={x} label={x} />)
        }))
    }
    ImageArray = () => {
        return (this.state.currentHrefs.map((value, i) => {
            return (<Image
                style={{ width: 75, height: 75 }}
                source={{ uri: value }}
            />)
        }))
    }
    render() {
        const { navigate } = this.props.navigation;
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
                    <ScrollView>
                        <Text>{this.state.currentText}</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{this.ImageArray()}</View>
                    </ScrollView>
                </Modal>
                <HeaderContent navigation={this.props.navigation} />
                <View>
                    <Text>TARİH SEÇ</Text>
                    <Picker
                        itemStyle={{ color: 'red' }}
                        style={{ width: 150, borderWidth: 1, borderColor: 'red' }}
                        selectedValue={this.state.selectedMonth}

                        onValueChange={(Month) => this.setState({ selectedMonth: Month })}>
                        <Picker.Item label="Ocak" value="1" />
                        <Picker.Item label="Şubat" value="2" />
                        <Picker.Item label="Mart" value="3" />
                        <Picker.Item label="Nisan" value="4" />
                        <Picker.Item label="Mayıs" value="5" />
                        <Picker.Item label="Haziran" value="6" />
                        <Picker.Item label="Temmuz" value="7" />
                        <Picker.Item label="Ağustos" value="8" />
                        <Picker.Item label="Eylül" value="9" />
                        <Picker.Item label="Ekim" value="10" />
                        <Picker.Item label="Kasım" value="11" />
                        <Picker.Item label="Aralık" value="12" />
                    </Picker>
                    <Picker
                        style={{ width: 150 }}
                        selectedValue={this.state.selectedYears}
                        onValueChange={(Years) => this.setState({ selectedYears: Years })}>
                        {this._unitList()}
                    </Picker>
                    <TouchableOpacity
                        onPress={() => this.getDatas(this.state.selectedMonth, this.state.selectedYears)}
                        style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#52b3d9', borderRadius: 180, marginBottom: 15 }}
                    >
                        <Text style={{ fontSize: 25, color: 'white' }}>>></Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.datas}
                    keyExtractor={({ id }, index) => index}
                    renderItem={({ item, index }) =>
                        <View style={StyleSheet.flatten([styles.flatList, { backgroundColor: colors[index % colors.length] }])}>
                            <TouchableOpacity
                                onPress={() => this.OpenModal(index)}
                            >
                                <Text style={{ color: '#4479cf' }}>{item}</Text>
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
        height: 100
    }
})




