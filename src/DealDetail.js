import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, ScrollView,Dimensions, TouchableOpacity,Animated,PanResponder, Button, Linking} from 'react-native';
import {priceDisplay} from './utils/util';
import ajax from './ajax';
export default class DealDetail extends Component {

    imageXPos=new Animated.Value(0)
    width=Dimensions.get("window").width
    imagePanResponder=PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderMove:(evt,gs)=>{
            console.log("moving",gs.dx)
            this.imageXPos.setValue(gs.dx)
        },
        onPanResponderRelease:(evt,gs)=>{
            console.log("released",gs)
            
            if(Math.abs(gs.dx) > this.width * 0.4){
                const direction=Math.sign(gs.dx)
                //swipe left -1 and swipe right 1
                Animated.timing(this.imageXPos,{
                    toValue:direction * this.width,
                    duration:250,
                    useNativeDriver:false
                }).start(()=>this.handleSwipe(-1 * direction))
            }
            else{
                Animated.spring(this.imageXPos,{
                    toValue:0,
                    useNativeDriver:false
                }).start()
            }
        }
    })

    handleSwipe=(indexDirection)=>{
        if(!this.state.deal.media[this.state.imageIndex+indexDirection]){
            Animated.spring(this.imageXPos,{
                toValue:0,
                useNativeDriver:false
            }).start()
            return
        }
        this.setState((prev)=>({
            imageIndex:prev.imageIndex+indexDirection
        }),()=>{
            //Next image animation
            this.imageXPos.setValue(indexDirection * this.width);
            Animated.spring(this.imageXPos,{
                toValue:0,
            }).start()
        })
    }
  state = {
    deal: this.props.initialDealData,
    imageIndex:0
  };

  async componentDidMount() {
    const fullDeal = await ajax.fetchDealDetail(this.state.deal.key);
    console.log(fullDeal);
    this.setState({
      deal: fullDeal,
    });
  }
  openDealUrl=()=>{
      Linking.openURL(this.state.deal.url)
  }
  render() {
    const {deal} = this.state;
    return (
      <ScrollView style={style.deal}>
          <TouchableOpacity onPress={this.props.onBack}>
              <Text style={style.back}>Back</Text>
          </TouchableOpacity>
        <View>
            
        <Animated.Image 
        {...this.imagePanResponder.panHandlers}
        source={{uri: deal.media[this.state.imageIndex]}}
        style={[style.image,{left:this.imageXPos}]} />
        </View>
        <View>
            <Text style={style.title}>{deal.title}</Text>
        </View>
        <View style={style.detail}>
        <View style={style.footer}>
            <View style={style.info}>
                <Text style={style.price}>{priceDisplay(deal.price)}</Text>
                <Text style={style.cause}>{deal.cause.name}</Text>
            </View>
            {
           deal.user &&  
        <View>
           <Image source={{uri:deal.user.avatar}} style={style.avatar} />
           <Text>{deal.user.name}</Text>
       </View>
       }
          </View>
          <View style={style.description}>
        <Text>{deal.description}</Text>
        </View>
        </View>
        <Button title="Buy this deal" onPress={this.openDealUrl}/>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({

  image:{
      width:"100%",
      height:150,
      backgroundColor:"#ccc"
  },
  title:{
      fontSize:16,
      padding:10,
      fontWeight:"bold",
      backgroundColor:"rgba(237,149,45,0.4)"
  },
  footer:{
      flexDirection:"row",
      justifyContent:"space-around",
      alignItems:"center",
      marginTop:15
  },
  info:{
      alignItems:"center"
  },
  user:{
      alignItems:"center"
  },
  cause:{
      marginVertical:10,
  },
price:{
    fontWeight:"bold"
},
avatar:{
    width:60,
    height:60,
    borderRadius:30
},
description:{
    borderColor:"#ddd",
    borderWidth:1,
    borderStyle:"dotted",
    margin:10,
    padding:10
},
back:{
    marginBottom:5,
    color:"#22f",
    marginLeft:15,
    fontSize:18
}
});
