import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  camera: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    // width: '100%',
    width: 200,
    height: 120,
    borderRadius: 8,
  },
  addPhotoButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#ffffff',
    borderRadius: 50,
  },
  downloadTitle: {
    marginBottom: 22,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  inputTitle: {
    height: 50,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  inputLocation: {
    height: 50,
    marginTop: 16,
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 19,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  button: {
    paddingVertical: 16,
    borderRadius: 100,
  },
  buttonText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
  },
});
