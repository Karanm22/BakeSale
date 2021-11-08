import React, { Component } from 'react'
import {View, StyleSheet, FlatList} from "react-native"
import DealItem from './DealItem'

export default class DealList extends Component {
    
    render() {
        console.log(this.props.onItemPress)
        return (
            <View style={style.list}>
                <FlatList
                data={this.props.deals}
                renderItem={({item})=>
                <DealItem deal={item}
                    onClicking={this.props.onItemPress}
                />
                } />
            </View>
        )
    }
}

const style=StyleSheet.create({
    list:{
        backgroundColor:"#eee",
        width:"100%",
       
    }
})