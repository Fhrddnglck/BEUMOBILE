import React from 'react';
import {
    ScrollView,
    RefreshControl,
    StyleSheet,
    Text,
    SafeAreaView,
    BackHandler,
    View,
    Dimensions
} from 'react-native';
import { WebView } from 'react-native-webview'
import HeaderContent from '../HeaderContent/HeaderContent'

const {height} = Dimensions.get('window')
export default class Kutuphane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canGoBack: false,
            refreshing: false,
            setRefreshing: false,
            uri : 'http://kutuphane.beun.edu.tr/yordambt/yordam.php'
        }
        this.WEBVİEW_REF = React.createRef(); //REFERANCE FOR WEBVİEW
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    onNavigationStateChange(navState) {
        console.log(navState.url)
        this.setState({
            canGoBack: navState.canGoBack,
            uri : navState.url
        });
    }
    handleBackPress = () => {
        if (this.state.canGoBack) {
            this.WEBVİEW_REF.current.goBack();
        }
        else {
            this.props.navigation.goBack(null)
        }
        return true;
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