import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform,
    ScrollView
} from "react-native";

class MenuItem extends Component {
    render() {
        const { navName, Mysrc, name } = this.props;
        return (
            <TouchableOpacity
                onPress={() => this.props.propsNav(navName)}
                style={styles.containerBottomItem}
            >
                <Image
                    style={{ width: 15, height: 15 }}
                    source={Mysrc}
                />
                <View style={styles.button}>
                    <Text style={styles.txtBottom}>{name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default class CustomComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.containertopRow}>

                    <Image
                        style={styles.imageTopRow}
                        source={require('../src/images/beulogo-drawe.png')}
                    />
                </View>
                <View style={{ marginTop: 10, backgroundColor: 'black', width: '85%', height: 0.7, alignSelf: 'center' }}></View>
                <ScrollView style={styles.containerBottom}>
                    <MenuItem navName='Anasayfa' name='Anasayfa' Mysrc={require('../src/images/drawer-home-icon.png')} propsNav={navigate} />
                    <MenuItem navName='Duyurular' name='Duyurular' Mysrc={require('../src/images/commercial-icon.png')} propsNav={navigate} />
                    <MenuItem navName='EtkinlikTakvimi' name='Etkinlik Takvimi' Mysrc={require('../src/images/activity-icon.png')} propsNav={navigate} />
                    <MenuItem navName='Haberler' name='Haberler' Mysrc={require('../src/images/news-drawer.png')} propsNav={navigate} />
                    <MenuItem navName='YemekListesi' name='Yemek Listesi' Mysrc={require('../src/images/food-icon.png')} propsNav={navigate} />
                    <MenuItem navName='AkilliKart' name='Akıllı Kart' Mysrc={require('../src/images/card-icon.png')} propsNav={navigate} />
                    <MenuItem navName='Uzem' name='Uzem' Mysrc={require('../src/images/uzem-icon.png')} propsNav={navigate} />
                    <MenuItem navName='Eposta' name='E-posta' Mysrc={require('../src/images/student-mail-icon.png')} propsNav={navigate} />
                    <MenuItem navName='TelefonRehberi' name='Telefon Rehberi' Mysrc={require('../src/images/phoneMain-icon.png')} propsNav={navigate} />
                    <MenuItem navName='PersonelAra' name='Personel Ara' Mysrc={require('../src/images/icon-search.png')} propsNav={navigate} />
                    <MenuItem navName='AkademikTakvim' name='Akademik Takvim' Mysrc={require('../src/images/calendar-icon.png')} propsNav={navigate} />
                    <MenuItem navName='ebys' name='Ebys' Mysrc={require('../src/images/ebys-icon.png')} propsNav={navigate} />
                    <MenuItem navName='Rimer' name='Rimer' Mysrc={require('../src/images/rimer-icon.png')} propsNav={navigate} />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c2e8ff'
    },
    containerBottom: {
        marginTop: 5,
    },
    containertopRow: {
        marginTop: 5,
        marginLeft: 10,
        justifyContent: "center",
        alignItems: 'center'
    },
    txtBottom: {
        marginLeft: 10,
        color: 'black',
        fontSize: 15,
        fontWeight:'bold'
    },
    imageTopRow: {
        height: 100,
        width: 100,
        ...Platform.select({
            ios: {
                borderRadius: 110 / 2
            },
            android: {
                borderRadius: 110
            }
        })
    },
    icon: {
        height: 25,
        width: 25,
        marginRight: 10
    },
    button: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },

    containertopRowText: {
        flexDirection: 'column',
        marginLeft: 5
    },
    containerBottomItem: {
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderBottomColor: '#E6FAFF',
        borderBottomWidth: 0.5,
        marginTop: 5
    }
});