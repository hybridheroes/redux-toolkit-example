import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setMessage } from '../store/message';

const Message = () => {
  const dispatch = useAppDispatch();
  const { message } = useAppSelector(state => state.message);

  const handlePress = () => {
    dispatch(setMessage('Message from Component'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      <Button title={'Set Message'} onPress={handlePress} />
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});
