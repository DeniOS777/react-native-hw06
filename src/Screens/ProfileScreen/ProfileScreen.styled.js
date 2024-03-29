import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  listTitle: {
    marginBottom: 32,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    lineHeight: 35,
    color: '#212121',
  },
  btnLogOut: {
    zIndex: 5,
    position: 'absolute',
    right: 0,
    paddingRight: 16,
    paddingTop: 22,
  },
  containerAvatar: {
    zIndex: 10,
    position: 'absolute',
    top: -60,
    alignSelf: 'center',
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    overflow: 'hidden',
  },
  avatar: {
    width: 120,
    height: 120,
    objectFit: 'cover',
  },
  btnDeleteAvatar: {
    zIndex: 10,
    position: 'absolute',
    top: 22,
    right: 117,
    transform: [{ rotate: '45deg' }],
    borderRadius: '50%',
    backgroundColor: '#fff',
  },
  postsList: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 90,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 130,
    minHeight: 750,
  },
});
