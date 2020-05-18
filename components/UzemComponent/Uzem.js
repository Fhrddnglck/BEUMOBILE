import * as React from 'react';
import { Button, View, Text, TouchableOpacity, Image, StyleSheet,ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview'
import HeaderContent from '../HeaderContent/HeaderContent'
export default class Eposta extends React.Component {
    state = {
        visible : true
    }
    render() {
        return (
            <View style={styles.container}>
                <HeaderContent navigation={this.props.navigation} />
                {this.state.visible 
                ?
                <ActivityIndicator
                
                />
                :
                null
            }
                <WebView
                    source={{ uri: 'https://ue.beun.edu.tr' }}
                    style={{ flex: 1 }}
                    onError = {(e)=>alert('Page error')}
                    renderError = {(e)=>alert('Page error')}
                    onHttpError = {(e)=>alert('Page error')}
                    onLoadStart  ={()=>this.setState({visible : true})}
                    onLoadEnd = {()=>this.setState({visible: false})}
                    allowFileAccess={true}
                    scalesPageToFit={true}
                    originWhitelist={['*']}
                    
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






