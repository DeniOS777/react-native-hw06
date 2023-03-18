import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  imagePosts: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  wrapTitleAndDelete: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
