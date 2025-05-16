// components/UpdatesScreen.js
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const MENU_WIDTH = width * 0.7;

const UpdatesScreen = () => {
  const navigation = useNavigation();
  const spinAnim = useRef(new Animated.Value(0)).current;
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [location, setLocation] = useState('Caloocan, Philippines');

  // State for weather data
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);

  useEffect(() => {
    const spin = () => {
      spinAnim.setValue(0);
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => spin());
    };
    spin();

    // Simulate fetching weather data for Caloocan
    const fetchWeatherData = async () => {
      // Typical weather data for Caloocan (April-May)
      const simulatedCurrentWeather = {
        temperature: 34,
        condition: 'Sunny',
        humidity: 65,
        uvIndex: 11,
        wind: 4.1,
        visibility: 8,
        pressure: 1010,
        location: 'Caloocan, Philippines',
      };
      setCurrentWeather(simulatedCurrentWeather);

      const simulatedHourlyForecast = [
        { time: 'Now', temp: 34, condition: 'Sunny' },
        { time: '1 PM', temp: 35, condition: 'Sunny' },
        { time: '2 PM', temp: 36, condition: 'Sunny' },
        { time: '3 PM', temp: 35, condition: 'Partly cloudy' },
        { time: '4 PM', temp: 34, condition: 'Partly cloudy' },
        { time: '5 PM', temp: 33, condition: 'Partly cloudy' },
      ];
      setHourlyForecast(simulatedHourlyForecast);

      const simulatedDailyForecast = [
        { day: 'Today', high: 36, low: 27, condition: 'Sunny', humidity: 60, uvIndex: 11 },
        { day: 'Tomorrow', high: 35, low: 26, condition: 'Partly cloudy', humidity: 65, uvIndex: 10 },
        { day: 'Friday', high: 34, low: 26, condition: 'Thunderstorms', humidity: 75, uvIndex: 8 },
        { day: 'Saturday', high: 33, low: 25, condition: 'Rainy', humidity: 80, uvIndex: 6 },
      ];
      setDailyForecast(simulatedDailyForecast);
    };

    fetchWeatherData();
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
    Animated.timing(menuAnim, {
      toValue: isMenuVisible ? -MENU_WIDTH : 0,
      duration: 300,
      easing: Easing.easeInOut,
      useNativeDriver: true,
    }).start();
  };

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return 'sunny-outline';
      case 'partly cloudy':
        return 'partly-sunny-outline';
      case 'cloudy':
        return 'cloudy-outline';
      case 'rainy':
        return 'rainy-outline';
      case 'thunderstorms':
        return 'thunderstorm-outline';
      case 'clear':
        return 'moon-outline';
      default:
        return 'alert-circle-outline';
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Caloocan Weather',
      headerStyle: {
        backgroundColor: '#4db6ac',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 15 }} onPress={toggleMenu}>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <Ionicons name="earth" size={24} color="#fff" />
          </Animated.View>
        </TouchableOpacity>
      ),
      headerRight: () => <View />,
    });
  }, [navigation, spin]);

  return (
    <ImageBackground source={require('../assets/bg.jpeg')} style={styles.background}>
      <View style={styles.mainAppContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.mainAppContent}>
            <Text style={styles.title}>Caloocan Weather Updates</Text>
            
            {/* Location Banner */}
            <View style={styles.locationBanner}>
              <Ionicons name="location" size={20} color="#fff" />
              <Text style={styles.locationText}>{location}</Text>
            </View>

            {/* Current Weather Card */}
            {currentWeather && (
              <View style={styles.weatherCard}>
                <Text style={styles.weatherCardTitle}>Current Weather</Text>
                <View style={styles.currentWeatherRow}>
                  <View style={styles.currentWeatherMain}>
                    <Ionicons
                      name={getWeatherIcon(currentWeather.condition)}
                      size={60}
                      color={currentWeather.condition === 'Sunny' ? '#FFD700' : '#fff'}
                      style={styles.currentWeatherIcon}
                    />
                    <View style={styles.temperatureContainer}>
                      <Text style={styles.currentTemperature}>{currentWeather.temperature}°C</Text>
                    </View>
                  </View>
                  <View style={styles.currentWeatherDetails}>
                    <Text style={styles.currentCondition}>{currentWeather.condition}</Text>
                    <Text style={styles.currentDetailText}>Humidity: {currentWeather.humidity}%</Text>
                    <Text style={styles.currentDetailText}>UV Index: {currentWeather.uvIndex} (Very High)</Text>
                    <Text style={styles.currentDetailText}>Wind: {currentWeather.wind} km/h</Text>
                    <Text style={styles.currentDetailText}>Pressure: {currentWeather.pressure} hPa</Text>
                  </View>
                </View>
              </View>
            )}

            {/* Hourly Forecast */}
            {hourlyForecast.length > 0 && (
              <View style={styles.weatherCard}>
                <Text style={styles.weatherCardTitle}>Hourly Forecast</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hourlyForecastScroll}>
                  {hourlyForecast.map((hour, index) => (
                    <View key={index} style={styles.hourlyItem}>
                      <Text style={styles.hourlyTime}>{hour.time}</Text>
                      <Ionicons
                        name={getWeatherIcon(hour.condition)}
                        size={30}
                        color={hour.condition === 'Sunny' ? '#FFD700' : '#fff'}
                        style={styles.hourlyIcon}
                      />
                      <Text style={styles.hourlyTemp}>{hour.temp}°C</Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Daily Forecast */}
            {dailyForecast.length > 0 && (
              <View style={styles.weatherCard}>
                <Text style={styles.weatherCardTitle}>3-Day Forecast</Text>
                {dailyForecast.map((day, index) => (
                  <View key={index} style={styles.dailyItem}>
                    <Text style={styles.dailyDay}>{day.day}</Text>
                    <Ionicons
                      name={getWeatherIcon(day.condition)}
                      size={30}
                      color={day.condition === 'Sunny' ? '#FFD700' : '#fff'}
                      style={styles.dailyIcon}
                    />
                    <Text style={styles.dailyTempRange}>{day.high}°C / {day.low}°C</Text>
                    <View style={styles.dailyDetails}>
                      <Text style={styles.dailyDetailText}>Humidity: {day.humidity}%</Text>
                      <Text style={styles.dailyDetailText}>UV: {day.uvIndex}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Climate Information */}
            <View style={styles.weatherCard}>
              <Text style={styles.weatherCardTitle}>Caloocan Climate Info</Text>
              <View style={styles.climateInfoItem}>
                <Ionicons name="thermometer-outline" size={20} color="#fff" />
                <Text style={styles.climateInfoText}>Average Annual Temperature: 28°C</Text>
              </View>
              <View style={styles.climateInfoItem}>
                <Ionicons name="umbrella-outline" size={20} color="#fff" />
                <Text style={styles.climateInfoText}>Rainy Season: June to November</Text>
              </View>
              <View style={styles.climateInfoItem}>
                <Ionicons name="sunny-outline" size={20} color="#FFD700" />
                <Text style={styles.climateInfoText}>Dry Season: December to May</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Menu (same as ContactsScreen) */}
        <Animated.View
          style={[
            styles.slideMenuContainer,
            {
              transform: [{ translateX: menuAnim }],
            },
          ]}
        >
          <TouchableOpacity style={styles.slideMenuItem} onPress={() => navigation.navigate('AboutUs')}>
            <Ionicons name="information-circle-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
            <Text style={styles.slideMenuText}>About Us</Text>
          </TouchableOpacity>

          <View>
            <TouchableOpacity style={styles.slideMenuItem} onPress={toggleCategory}>
              <Ionicons
                name={isCategoryOpen ? 'chevron-down-outline' : 'chevron-forward-outline'}
                size={20}
                color="#fff"
                style={{ marginRight: 10 }}
              />
              <Text style={styles.slideMenuText}>Category</Text>
            </TouchableOpacity>
            {isCategoryOpen && (
              <View style={{ marginLeft: 20 }}>
                <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('Pollution')}>
                  <Text style={styles.slideMenuText}>Pollution</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('Weather')}>
                  <Text style={styles.slideMenuText}>Weather</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('Earthquake')}>
                  <Text style={styles.slideMenuText}>Earthquake</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.slideMenuItem} onPress={() => navigation.navigate('Updates')}>
            <Ionicons name="refresh-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
            <Text style={styles.slideMenuText}>Updates</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.slideMenuItem} onPress={() => navigation.navigate('Contacts')}>
            <Ionicons name="call-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
            <Text style={styles.slideMenuText}>Contacts</Text>
          </TouchableOpacity>
                 <TouchableOpacity style={styles.slideMenuItem} onPress={() => { navigation.navigate('chatbot'); toggleMenu(); }}>
          <Ionicons name="chatbubble-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
          <Text style={styles.slideMenuText}>ChatBot</Text>
        </TouchableOpacity>

          <TouchableOpacity style={styles.slideMenuItem} onPress={toggleMenu}>
            <Ionicons name="close-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
            <Text style={styles.slideMenuText}>Close Menu</Text>
          </TouchableOpacity>
        </Animated.View>

        {isMenuVisible && (
          <TouchableOpacity style={styles.menuOverlay} onPress={toggleMenu} activeOpacity={1} />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  mainAppContainer: {
    flex: 1,
    position: 'relative',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  mainAppContent: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  locationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 10,
    borderRadius: 20,
    marginBottom: 15,
  },
  locationText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
  weatherCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '100%',
  },
  weatherCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  currentWeatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  currentWeatherMain: {
    alignItems: 'center',
  },
  temperatureContainer: {
    alignItems: 'center',
  },
  currentWeatherIcon: {
    marginBottom: 5,
  },
  currentTemperature: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  currentWeatherDetails: {
    alignItems: 'flex-start',
  },
  currentCondition: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  currentDetailText: {
    fontSize: 14,
    color: '#eee',
    marginBottom: 3,
  },
  hourlyForecastScroll: {
    paddingVertical: 10,
  },
  hourlyItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    width: 70,
  },
  hourlyTime: {
    fontSize: 12,
    color: '#eee',
    marginBottom: 5,
  },
  hourlyIcon: {
    marginBottom: 5,
  },
  hourlyTemp: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  dailyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  dailyDay: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
  },
  dailyIcon: {
    marginHorizontal: 10,
  },
  dailyTempRange: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    width: 80,
    textAlign: 'right',
  },
  dailyDetails: {
    marginLeft: 10,
  },
  dailyDetailText: {
    fontSize: 10,
    color: '#ddd',
  },
  climateInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  climateInfoText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
  },
  slideMenuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: MENU_WIDTH,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    paddingTop: 60,
    paddingHorizontal: 20,
    zIndex: 2,
  },
  slideMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  slideMenuText: {
    color: '#fff',
    fontSize: 18,
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  subMenuItem: {
    paddingVertical: 10,
  },
});

export default UpdatesScreen;