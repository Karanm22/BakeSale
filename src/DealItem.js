import React, { Component } from 'react'
import { View,Text, Image,StyleSheet, TouchableOpacity } from 'react-native'
import {priceDisplay} from "./utils/util"
export default class DealItem extends Component {
    handlePress=()=>{
        console.log(this.props.onClicking)
        console.log(this.props.onClicking(this.props.deal.key))
    }
    render() {
        const {deal} = this.props
       
        return (
            <TouchableOpacity onPress={this.handlePress}
                 style={style.deal}>
                <Image source={{uri:deal.media[0]}} 
                style={style.image}
                />
                <View style={style.info}>
                <Text style={style.title}>{deal.title}</Text>
                <View style={style.footer}>
                <Text style={style.cause}>{deal.cause.name}</Text>
                <Text style={style.price}>{priceDisplay(deal.price)}</Text>

                </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const style =StyleSheet.create({
    image:{
        width:"100%",
        height:150,
        backgroundColor:"#ccc"
    },
    deal:{
        marginHorizontal:12,
        marginTop:12
    },
    info:{
        padding:10,
        backgroundColor:"#fff",
        borderColor:"#bbb",
        borderWidth:1,
        borderTopWidth:0
    },
    title:{
        fontSize:16,
        fontWeight:"bold",
        marginBottom:5
    },
    footer:{
        flexDirection:"row"
    },
    cause:{
        flex:2
    },
    price:{
        fontWeight:"500"
    }
})
