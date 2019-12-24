import React, { Component } from 'react'
import { Modal, View, Image, TouchableOpacity,Text } from 'react-native'

export default class CustomModel extends React.Component {
    constructor(props) {
        super(props);
    }


    onClose = () => {
        this.props.onClose() //ONCLOSE FUNCTION IN PROPS ONCLOSE
    };


    render() {
        if (!this.props.modalVisible) { //IF MODALVISIBLE FALSE RETURN NULL
            return null;
          }
        return (
            <Modal
                animationType="slide"
                transparent={false}
            >
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Image
                        style={{ width: 75, height: 75 }}
                        source={require('../../src/images/beulogo-tabs.png')}
                    />
                    <TouchableOpacity

                        style={{ width: 75, height: 75, marginLeft: 'auto' }}
                        onPress={() => {
                            this.onClose(); //ONCLOSE FUNCTION
                        }}>

                        <Image
                            style={{ width: 75, height: 75 }}
                            source={require('../../src/images/check-close-icon.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    {this.props.children}
                </View>
            </Modal>
        )
    }

}
