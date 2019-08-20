import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker  from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import api from '../services/api';

export default class New extends Component {
  static navigationOptions = {
    headerTitle: 'Nova publicação'
  };

  state = {
    image: null,
    preview: null,
    author: '',
    place: '',
    description: '',
    hashtags: ''
  }

  selectPicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true
    });

    if (!result.cancelled) {
      this.setState({ preview: result.uri });
    }
  };

  takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
    });

    
    let prefix;
    let ext;

    if(result.fileName){
      [prefix, ext] = result.fileName.split('.');
      ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
    } else {
      prefix = new Date().getTime();
      ext = 'jpg';
    }
    
    const image = {
      uri: result.uri,
      type: result.type,
      name : `${prefix}.${ext}`
    }
    
    if (!result.cancelled) {
      this.setState({ preview: result.uri, image });
    }
  };  

  handelSubmit = async () => {

    const data = new FormData();

    data.append('image', this.state.image);
    data.append('author', this.state.author);
    data.append('place', this.state.place);
    data.append('desription', this.state.desription);
    data.append('hashtags', this.state.hashtags);

    await api.post('posts', data);

    this.props.navigation.navigate('Feed');
}
  
  render() {
    
    let {preview} = this.state;

    return(

      <ScrollView>

        <View style={StyleSheet.container}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
            <TouchableOpacity style={styles.selectButton} onPress={this.selectPicture}>
                <Text style={styles.selectButtonText}>Galeria</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.selectButton} onPress={this.takePicture}>
                <Text style={styles.selectButtonText}>Camera</Text>
            </TouchableOpacity>
          </View>

          <View>
            {preview &&
              <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                <Image source={{ uri: preview }} style={{  width: '90%', height: 400,  }} />
              </View>
            }
          </View>


          <TextInput
            style={styles.input}
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='Nome do autor'
            placeholderTextColor='#999'
            value={this.state.author}
            onChangeText={author => this.setState({ author })}
          />

          <TextInput
            style={styles.input}
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='Local'
            placeholderTextColor='#999'
            value={this.state.place}
            onChangeText={place => this.setState({ place })}
          />

          <TextInput
            style={styles.input}
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='Descrição'
            placeholderTextColor='#999'
            value={this.state.description}
            onChangeText={description => this.setState({ description })}
          />

          <TextInput
            style={styles.input}
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='Hashtags'
            placeholderTextColor='#999'
            value={this.state.hashtags}
            onChangeText={hashtags => this.setState({ hashtags })}
          />

          <TouchableOpacity style={styles.shareButton} onPress={this.handelSubmit}>
            <Text style={styles.shareButtonText}>Compartilhar</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  selectButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCC',
    borderStyle: 'dashed',
    height: 42,
    paddingHorizontal: 15,

    justifyContent: 'center',
    alignItems: 'center',
  },

  selectButtonText: {
    fontSize: 16,
    color: '#666',
  },

  preview: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 4,
  },

  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginTop: 10,
    fontSize: 16,
  },

  shareButton: {
    backgroundColor: '#7159c1',
    borderRadius: 4,
    height: 42,
    marginTop: 15,

    justifyContent: 'center',
    alignItems: 'center',
  },

  shareButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
});