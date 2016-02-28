'use strict';

import React, {
	View,
  ListView,
	Text,
  TextInput,
	StyleSheet,
  Image,
  TouchableHighlight,
  ActivityIndicatorIOS,
} from 'react-native';

import Photo from './Photo';
import api from '../Utils/api'
class Main extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      photoInfo: {},
      sort: 'asc',
			searchedTag: '',
			isLoading: false,
			error: false
		}
	}
  handleChange(e){
    this.setState({
      searchedTag: e.nativeEvent.text
    });
    if (e.nativeEvent.text.length > 3) {
    	this.setState({
    		isLoading: true
    	});
      this.fetchData();
    }
  }
	handleResponse(res) {
    if(res.photos.total === 0){
      this.setState({
        error: 'No photo was found!',
        isLoading: false
      })
    } else {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(res.photos.photo),
        photoInfo: res.photos.photo,
        isLoading: false,
        error: false,
        // searchedTag: ''
      });
    }
	}
	componentDidMount() {
    this.setState({
      isLoading: true,
    });
    this.fetchData();
  }
  fetchData() {
    api.getPhotos(this.state.searchedTag)
    .then((jsonRes) => this.handleResponse(jsonRes))
    .catch((err) => {
      this.setState({
        isLoading: false,
        error: `There was an error: ${err}`
      })
    });
  }
  openPhoto(photo) {
    this.props.navigator.push({
      component: Photo,
      title: photo.title,
      passProps: {photoInfo: photo}
    })
  }
  renderPhoto(rowData: string, sectionID: number, rowID: number) {
    var uri = `https://farm${rowData.farm}.staticflickr.com/${rowData.server}/${rowData.id}_${rowData.secret}.jpg`;
    return (
      <View style={styles.photContainer}>
        <TouchableHighlight onPress={() => this.openPhoto(rowData)} underlayColor="transparent">
          <Image
            source={{uri: uri}}
            style={styles.thumbnail}
          />
        </TouchableHighlight>
      </View>
    )
  }
	render() {
    var showErr = (
      this.state.error ? <Text style={styles.error}> {this.state.error} </Text> : <View></View>
    );
		return (
			<View style={styles.mainContainer}>
        <Text style={styles.title}>
          Search Photos
        </Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.searchedTag}
          onChange={this.handleChange.bind(this)} />
          {showErr}
          <ActivityIndicatorIOS
		        animating={this.state.isLoading}
		        color="#111"
		        size="large">
          </ActivityIndicatorIOS>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderPhoto.bind(this)}
            contentContainerStyle={styles.list}
            initialListSize={21}
            pageSize={3}
          />
      </View>
		)
	}
}

var styles = StyleSheet.create({
	list: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  thumbnail: {
    width: 100,
    height: 100,
  },
  photContainer: {
    padding: 5
  },
  listView: {
    marginTop: 40,
    backgroundColor: '#F5FCFF',
  },
	mainContainer: {
    flex: 1,
    padding: 15,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  error: {
    color: 'red',
    padding: 10
  }
})

module.exports = Main;