import { StyleSheet } from 'react-native';

export const shadowStyle = StyleSheet.create({
  shadow: {
    // iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    
    // Android
    elevation: 6,
  }
});
