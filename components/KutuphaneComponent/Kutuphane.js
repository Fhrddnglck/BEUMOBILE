import React from 'react';
import {
    ScrollView,
    RefreshControl,
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { WebView } from 'react-native-webview'
import HeaderContent from '../HeaderContent/HeaderContent'

const {height} = Dimensions.get('window')
export default class Kutuphane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : true,
            canGoBack: false,
            refreshing: false,
            setRefreshing: false,
            uri : 'http://kutuphane.beun.edu.tr/yordambt/yordam.php'
        }
        this.WEBVİEW_REF = React.createRef(); //REFERANCE FOR WEBVİEW
    }
    onNavigationStateChange(navState) {
        console.log(navState.url)
        try{
            this.setState({
                canGoBack: navState.canGoBack,
                uri : navState.url
            });
        }catch(e){
            console.log(e)
        }
    }
    onRefresh = () => {
        
        this.setState({
            uri : 'http://kutuphane.beun.edu.tr/yordambt/yordam.php'
        })
        this.WEBVİEW_REF.current.reload();
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
                <ScrollView
                    style={{flex:1}}
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                    }
                >
                    <WebView
                        ref={this.WEBVİEW_REF}
                        source={{ uri: this.state.uri }}
                        style={{ height:height }}
                        onError = {(e)=>alert('Page error')}
                        renderError = {(e)=>alert('Page error')}
                        onHttpError = {(e)=>alert('Page error')}
                        onLoadStart  ={()=>this.setState({visible : true})}
                        onLoadEnd = {()=>this.setState({visible: false})}
                        allowFileAccess={true}
                        scalesPageToFit={true}
                        originWhitelist={['*']}
                        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
    },
});