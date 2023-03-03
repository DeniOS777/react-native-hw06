import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View } from 'react-native';

import { styles } from './MapScreen.styled';

export const MapScreen = ({ route }) => {
  const location = route.params;

  return (
    <View style={styles.container}>
      <MapView
        region={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        style={styles.map}
      >
        <Marker
          coordinate={{ ...location }}
          title="I am here)"
          description="I see you)"
        />
      </MapView>
    </View>
  );
};
