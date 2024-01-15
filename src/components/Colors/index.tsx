import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Button,
} from 'react-native';
import { useGetColorsQuery } from '../../store/colors';
import ColorDetails from '../components/ColorDetails';

const Colors = () => {
  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
  const { data: colors, error, isFetching } = useGetColorsQuery();

  if (isFetching) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (error) {
    return <Text>Error while loading data</Text>;
  }

  if (!colors) {
    return <Text>No data</Text>;
  }

  return (
    <View>
      {colors.data.map(({ id, name, color }) => {
        const isSelected = id === selectedColorId;

        return (
          <View style={styles.container} key={id}>
            <View style={styles.colorHeaderContainer}>
              <View style={styles.colorLabel}>
                <View
                  style={[styles.colorCircle, { backgroundColor: color }]}
                />
                <Text style={styles.capitalizedText}>{name}</Text>
              </View>
              <Button
                title={isSelected ? 'Collapse' : 'Expand'}
                onPress={() => setSelectedColorId(isSelected ? null : id)}
              />
            </View>
            {isSelected && (
              <View style={styles.colorDetailsContainer}>
                <ColorDetails id={selectedColorId} />
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default Colors;

const styles = StyleSheet.create({
  loader: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  container: {
    marginVertical: 5,
    borderBottomWidth: 1,
  },
  colorHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  capitalizedText: {
    textTransform: 'capitalize',
  },
  colorDetailsContainer: {
    paddingVertical: 5,
    borderTopWidth: 1,
  },
});
