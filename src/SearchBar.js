import React, { Component } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import debounce from "lodash.debounce"
export default class SearchBar extends Component {
    state={
        searchTerm:""
    }
    debouncedSearchDeals=debounce(this.props.searchDeals,300)
    handleChange=(searchTerm)=>{
        this.setState({
           searchTerm
        },()=>{
            this.debouncedSearchDeals(this.state.searchTerm)
        })
    }
    
    render() {
        return (
            <TextInput 
             style={style.input} 
             placeholder="Search All Deals"
             onChangeText={this.handleChange}
             />
        )
    }
}

const style= StyleSheet.create({
    input:{
        height:50,
        marginHorizontal:15
    }
})
