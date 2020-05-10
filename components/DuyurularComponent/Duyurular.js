import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, Image, Linking } from 'react-native';
import HeaderContent from '../HeaderContent/HeaderContent'
import { FlatList } from 'react-native-gesture-handler';
import CustomModel from '../CustomModel/CustomModel'
import { Picker } from '@react-native-community/picker'


var HTMLParser = require('fast-html-parser');
let colors = ['#ffffff', '#c2e8ff'];
const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
export default class Duyurular extends React.Component {
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
            currentText: '',
            currentHeader: '',
            dates: [],
            linkTexts: [],
            linkHrefs: [],
            exampleTextArray : [],
        }
    }
    componentDidMount() {
        return fetch('https://w3.beun.edu.tr/tum-duyurular.html')
            .then(res => res.text())
            .then(html => {
                var root = HTMLParser.parse(html);
                root.querySelector('#icerikdiv').querySelector('#yilsecim').querySelectorAll('option').forEach((values) => { this.setState({ years: [...this.state.years, values.text] }) });
                var d = new Date();
                var m = d.getMonth() + 1;
                var y = d.getFullYear();
                this.getLastThreeMonth(m, y);
                this.setState({
                    selectedMonth: m,
                    selectedYears: y
                })
            }
            )

    }
    getLastThreeMonth = async (month, year) => {
        this.setState({ isLoading: true })
        this.state.details.length = 0;
        this.state.datas.length = 0;
        this.state.dates.length = 0;
        var st, nd, styear, ndyear;
        st = month - 1;
        styear = year;
        nd = month - 2;
        ndyear = year;
        if (st <= 0) {
            st = 12 - st;
            styear--;
        }
        if (nd <= 0) {
            nd = 12 - nd;
            ndyear--;
        }
        await fetch('https://w3.beun.edu.tr/arsiv/duyurular/' + month + '/' + year + '/liste.html')
            .then((res) => res.text())
            .then((html) => {
                var root = HTMLParser.parse(html);
                root.querySelectorAll('a').forEach((value) => this.setState({ datas: [...this.state.datas, value.text] }))
                root.querySelectorAll('.col-10').forEach((value) => this.setState({ dates: [...this.state.dates, value.text] }))
                root.querySelectorAll('a').forEach((value) => this.setState({ details: [...this.state.details, 'https://w3.beun.edu.tr' + value.rawAttributes.href] }))
            })
        await fetch('https://w3.beun.edu.tr/arsiv/duyurular/' + st + '/' + styear + '/liste.html')
            .then((res) => res.text())
            .then((html) => {
                var root = HTMLParser.parse(html);
                root.querySelectorAll('a').forEach((value) => this.setState({ datas: [...this.state.datas, value.text] }))
                root.querySelectorAll('.col-10').forEach((value) => this.setState({ dates: [...this.state.dates, value.text] }))
                root.querySelectorAll('a').forEach((value) => this.setState({ details: [...this.state.details, 'https://w3.beun.edu.tr' + value.rawAttributes.href] }))
            })
        await fetch('https://w3.beun.edu.tr/arsiv/duyurular/' + nd + '/' + ndyear + '/liste.html')
            .then((res) => res.text())
            .then((html) => {
                var root = HTMLParser.parse(html);
                root.querySelectorAll('a').forEach((value) => this.setState({ datas: [...this.state.datas, value.text] }))
                root.querySelectorAll('.col-10').forEach((value) => this.setState({ dates: [...this.state.dates, value.text] }))
                root.querySelectorAll('a').forEach((value) => this.setState({ details: [...this.state.details, 'https://w3.beun.edu.tr' + value.rawAttributes.href] }))
                this.setState({ isLoading: false })
            })
    }

    getDatas = (month, year) => {
        this.setState({ isLoading: true })
        this.state.details.length = 0;
        this.state.datas.length = 0;
        this.state.dates.length = 0;
        return fetch('https://w3.beun.edu.tr/arsiv/duyurular/' + month + '/' + year + '/liste.html')
            .then((res) => res.text())
            .then((html) => {
                var root = HTMLParser.parse(html);
                root.querySelectorAll('a').forEach((value) => this.setState({ datas: [...this.state.datas, value.text] }))
                root.querySelectorAll('.col-10').forEach((value) => this.setState({ dates: [...this.state.dates, value.text] }))
                root.querySelectorAll('a').forEach((value) => this.setState({ details: [...this.state.details, 'https://w3.beun.edu.tr' + value.rawAttributes.href] }))
                this.setState({ isLoading: false })
            })
    }

    renderText = () =>{
        const fields = [];
        for(let i=1; i<this.state.exampleTextArray.length; i++){
            fields.push(
            this.state.exampleTextArray[i][1]==false
            ?
            <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'sans-serif-condensed' }}>{this.state.exampleTextArray[i][0]}</Text>
            :
            <Text onPress={()=>{
                try{
                    if(this.state.exampleTextArray[i][1][0]==='.'){
                        Linking.openURL('https://w3.beun.edu.tr/'+this.state.exampleTextArray[i][1])
                    }else{
                        Linking.openURL(this.state.exampleTextArray[i][1])
                    }
                }catch(e){
                    console.log(e)
                }

            }} style={{ textAlign: 'center', fontSize: 20, fontFamily: 'sans-serif-condensed',color:'#6f94e3' }}>{this.state.exampleTextArray[i][0]}</Text>
            )
        }
        return fields;
    }

    OpenModal(myIndex) {
        this.state.linkTexts.length = 0;
        this.state.linkHrefs.length = 0;
        this.state.exampleTextArray.length = 0;
        this.showModal()
        this.setState({ currentText: '' })
        return fetch(this.state.details[myIndex])
            .then(res => res.text())
            .then(html => {
                var root = HTMLParser.parse(html)
                var baslik = root.querySelector('#anaicerik').childNodes[1].text
                var yazim = ''
                root.querySelector('#anaicerik').childNodes.forEach((e, index) => {
                    try {
                        //yazim = yazim + e.text
                        e.childNodes.forEach(el => {
                             if (el.tagName === 'a') {
                                 var obj = [el.text,el.attributes.href]
                                 this.setState({exampleTextArray: [...this.state.exampleTextArray,obj]})
                             }
                             else if(el.tagName==='span'){
                                 if(el.childNodes.length<2){
                                     var obj = [el.text,false]
                                     this.setState({exampleTextArray:[...this.state.exampleTextArray,obj]})
                                 }else{
                                     try{
                                     //console.log(el.childNodes)
                                     var obj1 = [el.childNodes[0].text,false]
                                     this.setState({exampleTextArray:[...this.state.exampleTextArray,obj1]})
                                     var obj = [el.childNodes[1].text,el.childNodes[1].attributes.href]
                                     console.log(obj)
                                     this.setState({exampleTextArray:[...this.state.exampleTextArray,obj]})
                                     }catch(e){

                                     }

                                 }
                             }
                             else{
                                //yazim = yazim + el.text
                                var obj = [el.text,false]
                                this.setState({exampleTextArray: [...this.state.exampleTextArray,obj]})
                             }
                        })
                    } catch (e) {
                    }
                })
                yazim = yazim.replace(baslik, '')
                this.setState({
                    currentText: yazim,
                    currentHeader: baslik
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
    _unitList_month = () => { //TODO REMOVE EMPTY ELEMENT IN ARRAY
        return (months.map((x, i) => { //TODO YEARS LIST
            return (<Picker.Item key={i + 1} value={i + 1} label={x} />)
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
                <CustomModel modalVisible={this.state.modalVisible} onClose={this.showModal}>
                    <ScrollView
                        contentContainerStyle={{ paddingBottom: 100 }}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>{this.state.currentHeader}</Text>
                        {/* {this.state.linkTexts.length > 0
                            ? //KELIMEYI BUL LINKI VER
                            <Text style={{color:'blue'}} onPress = {()=> Linking.openURL('https://stackoverflow.com/questions/30540252/how-does-one-display-a-hyperlink-in-react-native-app')}>{this.state.currentText +"||" + this.state.currentText.search("dir")}</Text>
                            :
                            <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'sans-serif-condensed' }}>{this.state.currentText}</Text>
                        } */}
                        {/* <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'sans-serif-condensed' }}>{this.state.currentText}</Text> */}
                        {this.renderText()}
                    </ScrollView>
                </CustomModel>

                <HeaderContent navigation={this.props.navigation} />
                <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 5 }}>TARİH SEÇ</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Picker
                            style={{ width: 150 }}
                            mode="dropdown"
                            selectedValue={this.state.selectedMonth}
                            onValueChange={(Month) => this.setState({ selectedMonth: Month })}>
                            {this._unitList_month()}
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
                    showsVerticalScrollIndicator={false}
                    data={this.state.datas}
                    keyExtractor={({ id }, index) => index.toString()}
                    renderItem={({ item, index }) =>
                        <View key={index} style={StyleSheet.flatten([styles.flatList, { backgroundColor: colors[index % colors.length] }])}>
                            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ width: 30, height: 30 }}
                                    source={require('../../src/images/duyuru-icon-list.png')}
                                />
                            </View>
                            <View style={{ flex: 3, flexDirection: 'column' }}>
                                <TouchableOpacity
                                    style={{ height: '100%' }}
                                    onPress={() => this.OpenModal(index)}
                                >
                                    <Text style={{ color: '#4479cf', textAlign: 'center', fontSize: 18 }}>{item}</Text>
                                    <Text style={{ fontSize: 10, marginLeft: 'auto', marginTop: 'auto' }}>{this.state.dates[index]}</Text>
                                </TouchableOpacity>
                            </View>
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
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 17,
        marginTop: 15
    },
    buttonStyle: {
        width: 81,
        height: 49,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#52b3d9',
        borderRadius: 8,
        marginBottom: 15,
        shadowColor: 'black',
        shadowOffset: { width: 8, height: 8 },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 17,
    }
})




