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
    display: 'block',
    width: 60,
    height: 60,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  textName: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 15,
    color: '#212121',
  },
  textEmail: {
    fontSize: 14,
    lineHeight: 13,
    color: 'rgba(33, 33, 33, 0.8)',
  },
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
