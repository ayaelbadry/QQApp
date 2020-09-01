import React, {Component} from 'react';

import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import AddPost from './src/components/AddPost';
import ListPost from './src/components/ListPost';
import EditPost from './src/components/EditPost';
import PostDetails from './src/components/PostDetails';
import Cities from './src/components/Cities';
import NavigatorApp from './src/components/internetView'
import NetInfo from "@react-native-community/netinfo";

// stack root between screens
const RootStack = createStackNavigator(
  {
    Cities: Cities,
    Post: ListPost,
    PostDetails: PostDetails,
    AddPost: AddPost,
    EditPost: EditPost,
  },
  {
    initialRouteName: 'Cities',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#FA5252',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);
const AppContainer = createAppContainer(RootStack);

export default class App extends Component{
  // check internet connection
  constructor(props) {
    super(props);
    this.state = {
      connectVar: true
    }

  }
  componentDidMount(){
    if (Platform.OS === "android") {
      
      NetInfo.fetch().then(state => {
        console.log('state', state)
        if (state.isConnected) {
          console.log('true')
          this.setState({connectVar: true})
       
        } else {
          console.log('false')
          this.setState({connectVar: false})
        }
      });
    } else {
      // For iOS devices
      NetInfo.isConnected.addEventListener(
        "connectionChange",
        this.handleFirstConnectivityChange
      );
    }

    
  }
 
  handleFirstConnectivityChange = isConnected => {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );

    if (isConnected === false) {
      Alert.alert("You are offline!");
      this.setState({connectVar: isConnected})
    } else {
      Alert.alert("You are online!");
    }
  };
  componentWillUnmount(){
    NetInfo.removeEventListener(
      "connectionChange", 
       this.handleFirstConnectivityChange
      
    )
  }
  render() {
     return (
       <View style={{flex: 1}}>
         {this.state.connectVar ? <AppContainer /> : <NavigatorApp />}

       </View>
     )

  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },


});
