import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Button,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchUsers, selectAllUsers } from '../store/users';

const Users = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.users);
  const users = useAppSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View>
      <Button title={'Reload'} onPress={() => dispatch(fetchUsers())} />
      {users.map(user => {
        return (
          <View style={styles.container} key={user.id}>
            <View>
              <View style={styles.dataContainer}>
                <Text>
                  {user.first_name} {user.last_name}
                </Text>
              </View>
              <View style={styles.dataContainer}>
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
    marginBottom: 'auto',
  },
  container: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  dataContainer: {
    flexDirection: 'row',
  },
});
