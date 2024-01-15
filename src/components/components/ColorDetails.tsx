import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useGetColorByIdQuery } from '../../store/colors';

const ColorDetails = (props: { id: number }) => {
  const { data: color, isFetching } = useGetColorByIdQuery(props.id);

  if (isFetching) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!color) {
    return <Text>No data</Text>;
  }

  const { name, id, year, color: hex, pantone_value } = color.data;

  const renderDetails = (label: string, value: string | number) => (
    <View style={styles.detailsContainer}>
      <Text style={styles.label}>{label}: </Text>
      <Text style={styles.capitalizedText}>{value}</Text>
    </View>
  );

  return (
    <>
      {renderDetails('ID', id)}
      {renderDetails('Year', year)}
      {renderDetails('Name', name)}
      {renderDetails('Hex Code', hex)}
      {renderDetails('Pantone Value', pantone_value)}
    </>
  );
};

export default ColorDetails;

const styles = StyleSheet.create({
  loader: {
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingVertical: 50,
  },
  detailsContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  label: {
    fontWeight: '600',
  },
  capitalizedText: {
    textTransform: 'capitalize',
  },
});
