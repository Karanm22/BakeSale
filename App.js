import React, { Component } from 'react'
import {View , Text, StyleSheet, Animated,Easing,Dimensions} from "react-native"
import ajax from "./src/ajax"
import DealDetail from './src/DealDetail'
import DealList from './src/DealList'
import SearchBar from './src/SearchBar'

export default class App extends Component {
  titleXPos=new Animated.Value(0);
  state={
    deals:[],
    currentDetailId:null,
    dealsFromSearch:[],
    activeSearchTerm:""
  }

  animateTitle=(direction=1)=>{
    const width=Dimensions.get("window").width-150;
      Animated.timing(
        this.titleXPos,{
          toValue:direction * width/2,
          duration:1000,
          easing:Easing.bounce,
          useNativeDriver: false, // Add this line 
        }
      ).start(({finished})=>{
        if(finished){
          this.animateTitle(-1 * direction)
          console.log("FINISED")
        }

      })
  }
  async componentDidMount(){
    this.animateTitle()
    const deals= await ajax.fetchInitialDeals()
    this.setState((prevState)=>{
      return {deals}
    })
    await LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  
  }
   searchDeals=async(searchTerm)=>{
    let dealsFromSearch=[];
    if(searchTerm){
      dealsFromSearch = await ajax.fetchDealSearchResults(searchTerm)
    }
    this.setState({dealsFromSearch,activeSearchTerm:searchTerm})
  }
 
  setCurrentDeal=(dealId)=>{
    this.setState({
      currentDetailId:dealId
    })
  }
  currentDeal=()=>{
    return this.state.deals.find(
      (deal)=>deal.key===this.state.currentDetailId
    )
  }

  unSetCurrentDeal=()=>{
    this.setState({
      currentDetailId:null
    })
  }
  
  render() {
    if(this.state.currentDetailId){
      return(
      <View style={style.main}>
      <DealDetail
      initialDealData={this.currentDeal()}
      onBack={this.unSetCurrentDeal}
       />
       </View>)
    }

    const dealsToDisplay=this.state.dealsFromSearch.length > 0 ? this.state.dealsFromSearch:this.state.deals;
    console.log(dealsToDisplay)
    if(dealsToDisplay.length > 0){
      return(  
      <View style={style.main}>
        <SearchBar searchDeals={this.searchDeals} initialSearch={this.state.activeSearchTerm} />
        <DealList deals={dealsToDisplay} 
        onItemPress={this.setCurrentDeal}
        /> 
      </View>)
    }
    return (
      <Animated.View style={[style.container,{left:this.titleXPos}]}>
          <Text style={style.header}>BakeSale</Text>
      </Animated.View>
    )
  }
}

const style=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  header:{
    fontSize:40
  },
  main:{
    marginTop:50
  }
})