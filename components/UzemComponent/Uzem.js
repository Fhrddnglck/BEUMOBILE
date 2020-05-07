import * as React from 'react';
import { Button, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview'
import HeaderContent from '../HeaderContent/HeaderContent'
export default class Eposta extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <HeaderContent navigation={this.props.navigation} />
                <WebView
                    source={{ uri: 'https://ue.beun.edu.tr' }}
                    style={{ flex: 1 }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }

});






