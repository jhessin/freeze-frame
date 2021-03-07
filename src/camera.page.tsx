import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import { Camera } from 'expo-camera';

import Toolbar from './toolbar.component';
import styles from './styles';

export default class CameraPage extends React.Component {
  camera = React.createRef<Camera>();

  state = {
    captures: [],
    flashMode: Camera.Constants.FlashMode.off,
    capturing: false,
    cameraType: Camera.Constants.Type.back,
    hasCameraPermission: null,
  };

  setFlashMode = (flashMode: any) => this.setState({ flashMode });

  handleCaptureIn = () => this.setState({ capturing: true });

  handleCaptureOut = () => {
    if (this.state.capturing && this.camera.current)
      this.camera.current.stopRecording();
  }

  handleShortCapture = async () => {
    if (!this.camera.current) return;
    const photoData = await this.camera.current.takePictureAsync();
    this.setState({
      capturing: false,
      captures: [photoData, ...this.state.captures],
    });
  }

  handleLongCapture = async () => {
    if (!this.camera.current) return;
    const videoData = await this.camera.current.recordAsync();
    this.setState({
      capturing: false,
      captures: [
        videoData,
        ...this.state.captures,
      ],
    });
  }
  async componentDidMount() {
    const camera = await Camera.requestPermissionsAsync();
    const hasCameraPermission = (camera.status === 'granted');

    this.setState({ hasCameraPermission });
  }

  toggleCameraType = () =>
    this.setState({
      cameraType: this.state.cameraType === Camera.Constants.Type.back ?
        Camera.Constants.Type.front :
        Camera.Constants.Type.back,
    })

  takeSnapshot() {
    if (this.camera.current) {
      this.camera.current.takePictureAsync();
    }
  }

  render() {
    const {
      hasCameraPermission,
      flashMode,
      cameraType,
      capturing,
    } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    return (
      <Fragment>
        <View>
          <Camera
            type={cameraType}
            flashMode={flashMode}
            style={styles.preview}
            ref={this.camera}
          >
          </Camera>
        </View>

        <Toolbar
          capturing={capturing}
          flashMode={flashMode}
          setFlashMode={this.setFlashMode}
          toggleCameraType={this.toggleCameraType}
          onCaptureIn={this.handleCaptureIn}
          onCaptureOut={this.handleCaptureOut}
          onLongCapture={this.handleLongCapture}
          onShortCapture={this.handleShortCapture}
        />
      </Fragment>
    );
  }
}
