/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import BackIcon from '../../assets/back-icon';

type FullScreenModalProps = {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<any>>;
  children: React.ReactNode;
};

const FullScreenModal = ({open, onClose, children}: FullScreenModalProps) => {
  return (
    <Modal
      visible={open}
      transparent={false}
      animationType="slide"
      onRequestClose={onClose}
      supportedOrientations={['portrait', 'landscape']}
      statusBarTranslucent={true}
      presentationStyle="fullScreen">
      <View
        style={{
          height: StatusBar.currentHeight ?? 20,
          backgroundColor: 'black',
        }}
      />
      <TouchableOpacity onPress={onClose}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: '#f5f5f5',
          }}>
          <BackIcon color="#007AFF" />
          <Text style={styles.link}>Back</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.container}>{children}</View>
      <View
        style={{
          height: 10,
          backgroundColor: '#f5f5f5',
        }}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#f5f5f5',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row', // Alinear horizontalmente el ícono y el texto
    alignItems: 'center', // Centrar verticalmente el ícono y el texto
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5, // Espacio entre el ícono y el texto
  },
  link: {
    color: '#007AFF', // iOS default blue color for links
    textDecorationLine: 'underline',
    marginLeft: -10,
  },
});

export default FullScreenModal;
