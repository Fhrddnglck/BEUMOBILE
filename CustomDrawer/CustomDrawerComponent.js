import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform,
} from "react-native";

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
                <View style={{marginTop:10,backgroundColor:'black',width:'85%',height:1,alignSelf:'center'}}></View>
                <View style={styles.containerBottom}>
                    <TouchableOpacity
                        onPress={() => navigate('Anasayfa')}
                        style={styles.containerBottomItem}
                    >
                        <Image
                            style={{ width: 20, height: 20 }}
                            source={require('../src/images/drawer-home-icon.png')}
                        />
                        <View style={styles.button}>
                            <Text style={styles.txtBottom}>Anasayfa</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigate('YemekListesi')}
                        style={styles.containerBottomItem}
                    >
                        <Image
                            style={{ width: 20, height: 20 }}
                            source={require('../src/images/food-icon.png')}
                        />
                        <View style={styles.button}>
                            <Text style={styles.txtBottom}>Yemek Listesi</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigate('Duyurular')}
                        style={styles.containerBottomItem}
                    >
                        <Image
                            style={{ width: 20, height: 20 }}
                            source={require('../src/images/commercial-icon.png')}
                        />
                        <View style={styles.button}>
                            <Text style={styles.txtBottom}>Duyurular</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigate('AkademikTakvim')}
                        style={styles.containerBottomItem}
                    >
                        <Image
                            style={{ width: 20, height: 20 }}
                            source={require('../src/images/calendar-icon.png')}
                        />
                        <View style={styles.button}>
                            <Text style={styles.txtBottom}>Akademik Takvim</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigate('TelefonRehberi')}
                        style={styles.containerBottomItem}
                    >
                        <Image
                            style={{ width: 20, height: 20 }}
                            source={require('../src/images/phoneMain-icon.png')}
                        />
                        <View style={styles.button}>
                            <Text style={styles.txtBottom}>Telefon Rehberi</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigate('EtkinlikTakvimi')}
                        style={styles.containerBottomItem}
                    >
                        <Image
                            style={{ width: 18, height: 18 }}
                            source={require('../src/images/activity-icon.png')}
                        />
                        <View style={styles.button}>
                            <Text style={styles.txtBottom}>Etkinlik Takvimi</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigate('Rimer')}
                        style={styles.containerBottomItem}
                    >
                        <Image
                            style={{ width: 20, height: 20 }}
                            source={require('../src/images/rimer-icon.png')}
                        />
                        <View style={styles.button}>
                            <Text style={styles.txtBottom}>Rimer</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigate('Eposta')}
                        style={styles.containerBottomItem}
                    >
                        <Image
                            style={{ width: 20, height: 20 }}
                            source={require('../src/images/mail-icon.png')}
                        />
                        <View style={styles.button}>
                            <Text style={styles.txtBottom}>E-posta</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigate('PersonelAra')}
                        style={styles.containerBottomItem}
                    >
                        <Image
                            style={{ width: 20, height: 20 }}
                            source={require('../src/images/icon-search.png')}
                        />
                        <View style={styles.button}>
                            <Text style={styles.txtBottom}>Personel Ara</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigate('ebys')}
                        style={styles.containerBottomItem}
                    >
                        <Image
                            style={{ width: 20, height: 20 }}
                            source={require('../src/images/ebys-icon.png')}
                        />
                        <View style={styles.button}>
                            <Text style={styles.txtBottom}>EBYS</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigate('AkilliKart')}
                        style={styles.containerBottomItem}
                    >
                        <Image
                            style={{ width: 20, height: 20 }}
                            source={require('../src/images/card-icon.png')}
                        />
                        <View style={styles.button}>
                            <Text style={styles.txtBottom}>Akıllı Kart Para Yükleme</Text>
                        </View>
                    </TouchableOpacity>
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
    containerBottom:{
        marginTop:25,
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
        marginTop:5
    }
});