import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: '#ffffff',
  },
  containerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  wrapImageProfile: {
    marginRight: 8,
    overflow: 'hidden',
  },
  imageProfile: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  textName: {
    marginBottom: 4,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 15,
    color: '#212121',
  },
  textEmail: {
    fontSize: 13,
    lineHeight: 13,
    color: 'rgba(33, 33, 33, 0.8)',
  },
  imagePosts: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  imageTitle: {
    marginBottom: 8,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textComment: {
    marginLeft: 6,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  textPlace: {
    marginLeft: 6,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    textDecorationLine: 'underline',
  },
});
