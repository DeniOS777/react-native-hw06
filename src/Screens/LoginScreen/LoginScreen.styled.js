import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  containerPage: {
    flex: 1,
  },
  containerForm: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  form: {
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 40,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    marginBottom: 32,
    fontFamily: 'Roboto-Medium',
    lineHeight: 35,
    fontSize: 32,
    textAlign: 'center',
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    paddingLeft: 16,
    marginBottom: 16,
    height: 50,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 43,
    marginBottom: 16,
    paddingVertical: 16,
    backgroundColor: '#FF6C00',
    borderRadius: 100,
  },
  buttonShowPassword: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    paddingVertical: 15,
    paddingRight: 16,
  },
  buttonTitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#ffffff',
  },
  text: {
    marginRight: 4,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 19,
  },
  redirecLinkTitle: {
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 19,
    color: '#000080',
  },
  wrapTextAndLink: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
