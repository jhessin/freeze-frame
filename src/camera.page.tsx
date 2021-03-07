import React from 'react';
import { View, Text } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera  } from 'expo-camera';

import styles from './styles';

export default class CameraPage extends React.Component {
  camera = null;

  state = {
    hasCameraPermission: null,
  };

  async componentDidMount() {
    const camera = await Camera.requestPermissionsAsync();
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

    this.setState({ hasCameraPermission });
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    return (
      <View>
        <Camera
          style={styles.preview}
          ref={(camera: any) => this.camera = camera}
          />
          </View>
    );
  }
}
