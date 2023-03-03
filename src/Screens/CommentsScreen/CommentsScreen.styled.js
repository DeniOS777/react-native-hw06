import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 8,
    marginBottom: 8,
  },
  inputWrap: {
    position: 'relative',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  input: {
    paddingLeft: 16,
    height: 50,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#E8E8E8',
  },
  btnSendComments: {
    position: 'absolute',
    right: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 34,
    height: 34,
    backgroundColor: '#FF6C00',
    borderRadius: 50,
  },
  itemComments: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  imageWrap: {
    marginRight: 16,
  },
  imageAvatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
  textCommentsWrap: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  },
  text: {
    marginBottom: 8,
    width: 267,
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    lineHeight: 18,
    color: '#212121',
  },
  date: {
    textAlign: 'right',
    fontFamily: 'Roboto-Regular',
    fontSize: 10,
    lineHeight: 12,
    color: '#BDBDBD',
  },
});
