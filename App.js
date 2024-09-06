import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import * as Location from "expo-location"

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "b3d3853d8086991a2e24665bb55f5a41";

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const ask = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setOk(false);
    }

    console.log(status);

    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });

    setCity(location.at(0).region);

    console.log(location);

    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
    const json = await response.json();
    console.log(json);
  }

  useEffect(() => {
    ask();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temperature}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temperature}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temperature}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#73b0ff"
  },
  city: {
    flex: 1.2,
    justifyContent: "center", //  세로로 가운데
    alignItems: "center", //  가로로 가운데
  },
  cityName: {
    color: "white",
    fontSize: 68,
    fontWeight: "500"
  },
  weather: {
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temperature: {
    color: "white",
    marginTop: 50,
    fontSize: 178,
  },
  description: {
    color: "white",
    marginTop: -30,
    fontSize: 60,
  }
});