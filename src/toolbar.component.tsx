import React from 'react';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import styles from './styles';

const {
  FlashMode: CameraFlashModes,
} = Camera.Constants;

type props = {
  capturing?: boolean,
  flashMode?: any,
  setFlashMode: (mode: boolean) => void,
  toggleCameraType: () => void,
  onCaptureIn: () => void,
  onCaptureOut: () => void,
  onLongCapture: () => void,
  onShortCapture: () => void,
}

export default ({
  capturing = false,
  flashMode = CameraFlashModes.off,
  setFlashMode, toggleCameraType,
  onCaptureIn, onCaptureOut, onLongCapture, onShortCapture,
}: props) => (
  <Grid style={styles.bottomToolbar}>
    <Row>
      <Col style={styles.alignCenter}>
        <TouchableOpacity onPress={() => setFlashMode(
          flashMode === CameraFlashModes.on ? CameraFlashModes.off : CameraFlashModes.on
        )}>
          <Ionicons
            name={flashMode == CameraFlashModes.on ? "md-flash" : "md-flash-off"}
            color="white"
            size={30}
          />
        </TouchableOpacity>
      </Col>
      <Col size={2} style={styles.alignCenter}>
        <TouchableWithoutFeedback
          onPressIn={onCaptureIn}
          onPressOut={onCaptureOut}
          onLongPress={onLongCapture}
          onPress={onShortCapture}>
          <View style={[styles.captureBtn, capturing && styles.captureBtnActive]}>
            {capturing && <View style={styles.captureBtnInternal} />}
          </View>
        </TouchableWithoutFeedback>
      </Col>
      <Col style={styles.alignCenter}>
        <TouchableOpacity onPress={toggleCameraType}>
          <Ionicons
            name="camera-reverse"
            color="white"
            size={30}
          />
        </TouchableOpacity>
      </Col>
    </Row>
  </Grid>
);
