import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform,
} from "react-native";

class MenuItem extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={() => this.props.propsNav(this.props.name)}
                style={styles.containerBottomItem}
            >
                <Image
                    style={{ width: 20, height: 20 }}
                    source={this.props.Mysrc}
                />
                <View style={styles.button}>
        <Text style={styles.txtBottom}>{this.props.name}</Text>
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
                <View style={{ marginTop: 10, backgroundColor: 'black', width: '85%', height: 1, alignSelf: 'center' }}></View>
                <View style={styles.containerBottom}>
                     <MenuItem name='Anasayfa' Mysrc={require('../src/images/drawer-home-icon.png')} propsNav={navigate} />
                     <MenuItem name='YemekListesi' Mysrc={require('../src/images/food-icon.png')} propsNav={navigate} />
                     <MenuItem name='Duyurular' Mysrc={require('../src/images/commercial-icon.png')} propsNav={navigate} />
                     <MenuItem name='AkademikTakvim' Mysrc={require('../src/images/calendar-icon.png')} propsNav={navigate} />
                     <MenuItem name='TelefonRehberi' Mysrc={require('../src/images/phoneMain-icon.png')} propsNav={navigate} />
                     <MenuItem name='EtkinlikTakvimi' Mysrc={require('../src/images/activity-icon.png')} propsNav={navigate} />
                     <MenuItem name='Haberler' Mysrc={require('../src/images/news-drawer.png')} propsNav={navigate} />
                     <MenuItem name='Rimer' Mysrc={require('../src/images/rimer-icon.png')} propsNav={navigate} />
                     <MenuItem name='Eposta' Mysrc={require('../src/images/mail-icon.png')} propsNav={navigate} />
                     <MenuItem name='PersonelAra' Mysrc={require('../src/images/icon-search.png')} propsNav={navigate} />
                     <MenuItem name='ebys' Mysrc={require('../src/images/ebys-icon.png')} propsNav={navigate} />
                     <MenuItem name='AkilliKart' Mysrc={require('../src/images/card-icon.png')} propsNav={navigate} />
                </View>
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
        marginTop: 25,
    },
    containertopRow: {
        marginTop: 10,
        marginLeft: 10,
        justifyContent: "center",
        alignItems: 'center'
    },
    txtBottom: {
        marginLeft: 10,
        color: 'black',
        fontSize: 15,
        fontWeight: '100'
    },
    imageTopRow: {
        height: 110,
        width: 110,
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