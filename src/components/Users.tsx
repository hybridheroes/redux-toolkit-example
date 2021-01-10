import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  Button
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchUsers, selectAllUsers } from '../store/users';

const Users = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.users);
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View>
      <Button title={'Reload'} onPress={() => dispatch(fetchUsers())} />
      {users.map((user) => {
        return (
          <View style={styles.container} key={user.id}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <View>
              <View style={styles.dataContainer}>
                <Text>Name: </Text>
                <Text>{user.first_name}</Text>
              </View>
              <View style={styles.dataContainer}>
                <Text>Last Name: </Text>
                <Text>{user.last_name}</Text>
              </View>
              <View style={styles.dataContainer}>
                <Text>Email: </Text>
                <Text>{user.email}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  loader: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  container: {
    flexDirection: 'row',
    marginVertical: 10
  },
  dataContainer: {
    flexDirection: 'row'
  },
  avatar: {
    width: 100,
    height: 100,
    marginRight: 10
  }
});
