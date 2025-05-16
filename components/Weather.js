// components/WeatherScreen.js
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
// API Key is not needed in this version as it's displaying static knowledge/updates
// const API_KEY = 'YOUR_API_KEY_HERE';

const WeatherScreen = () => { // This component will now display Weather Knowledge & Updates
  const navigation = useNavigation();
  const spinAnim = useRef(new Animated.Value(0)).current;
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  // State for simulated weather data - Removed from here
  // const [currentWeather, setCurrentWeather] = useState(null);
  // const [hourlyForecast, setHourlyForecast] = useState([]);
  // const [dailyForecast, setDailyForecast] = useState([]);

  // Weather knowledge content - Moved from UpdatesScreen
  const weatherKnowledge = [
    {
      title: 'Flood Prevention Tips',
      items: [
        'Plant trees and maintain vegetation to absorb rainwater',
        'Create proper drainage systems in your community',
        'Avoid building in flood-prone areas',
        'Install flood barriers or sandbags in vulnerable areas',
        'Keep gutters and drains clear of debris'
      ]
    },
    {
      title: 'Climate Change Solutions',
      items: [
        'Plant more trees to absorb CO2',
        'Reduce, reuse, and recycle to minimize waste',
        'Use energy-efficient appliances and LED lighting',
        'Support renewable energy sources like solar and wind',
        'Reduce meat consumption to lower carbon footprint'
      ]
    },
    {
      title: 'Extreme Weather Preparedness',
      items: [
        'Create an emergency kit with food, water, and first aid',
        'Have a family emergency plan',
        'Stay informed about weather alerts',
        'Know evacuation routes in your area',
        'Protect important documents in waterproof containers'
      ]
    }
  ];

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

    // Simulate fetching weather data - Removed from here
    // const fetchWeatherData = async () => { /* ... */ };
    // fetchWeatherData();

  }, []); // Dependencies updated if needed

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

  // Function to get weather icon - Removed from here
  // const getWeatherIcon = (condition) => { /* ... */ };


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Weather Knowledge & Updates', // Changed Title
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
  }, [navigation, spin, toggleMenu]);


  return (
    <ImageBackground source={require('../assets/bg.jpeg')} style={styles.background}>
      <View style={styles.mainAppContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.mainAppContent}>
            <Text style={styles.title}>Weather Knowledge & Updates</Text> {/* Changed Title */}

            {/* Current Weather Card - Removed from here */}
            {/* Hourly Forecast - Removed from here */}
            {/* Daily Forecast - Removed from here */}

            {/* Weather Knowledge Cards - Moved from UpdatesScreen */}
            {weatherKnowledge.map((section, index) => (
              <View key={index} style={styles.weatherCard}>
                <Text style={styles.weatherCardTitle}>{section.title}</Text>
                <View style={styles.knowledgeDetails}>
                  {section.items.map((item, itemIndex) => (
                    <Text key={itemIndex} style={styles.knowledgeItem}>
                      • {item}
                    </Text>
                  ))}
                </View>
              </View>
            ))}

            {/* Latest App Update - Moved from UpdatesScreen */}
            <View style={styles.weatherCard}>
              <Text style={styles.weatherCardTitle}>Latest App Update</Text>
              <Text style={styles.updateTime}>Tuesday 11:00 am</Text>
              <Text style={styles.updateTitle}>App Enhancements!</Text>
              <View style={styles.updateDetails}>
                <Text style={styles.updateDetailItem}>• User interface improvements</Text>
                <Text style={styles.updateDetailItem}>• Weather forecast accuracy increased</Text>
                <Text style={styles.updateDetailItem}>• Added new weather knowledge section</Text>
              </View>
            </View>

          </View>
        </ScrollView>

        {/* Menu - matching WeatherScreen style */}
        <Animated.View
          style={[
            styles.slideMenuContainer,
            {
              transform: [{ translateX: menuAnim }],
            },
          ]}
        >
          <ScrollView>
            <TouchableOpacity style={styles.slideMenuItem} onPress={() => { navigation.navigate('AboutUs'); toggleMenu(); }}>
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
                  <TouchableOpacity style={styles.subMenuItem} onPress={() => { navigation.navigate('Pollution'); toggleMenu(); }}>
                    <Text style={styles.slideMenuText}>Pollution</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.subMenuItem} onPress={() => { navigation.navigate('Weather'); toggleMenu(); }}>
                    <Text style={styles.slideMenuText}>Weather</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.subMenuItem} onPress={() => { navigation.navigate('Earthquake'); toggleMenu(); }}>
                    <Text style={styles.slideMenuText}>Earthquake</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <TouchableOpacity style={styles.slideMenuItem} onPress={() => { navigation.navigate('Updates'); toggleMenu(); }}>
              <Ionicons name="refresh-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
              <Text style={styles.slideMenuText}>Weather & Updates</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.slideMenuItem} onPress={() => { navigation.navigate('Contacts'); toggleMenu(); }}>
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
          </ScrollView>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  weatherCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '100%',
    // Removed specific alignment for weather display
    // alignItems: 'center',
  },
  weatherCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  // Styles for Weather Display - Removed from here
  currentWeatherRow: {
    // Removed
  },
  currentWeatherMain: {
    // Removed
  },
  currentWeatherIcon: {
    // Removed
  },
  currentTemperature: {
    // Removed
  },
  currentWeatherDetails: {
    // Removed
  },
  currentCondition: {
    // Removed
  },
  currentDetailText: {
    // Removed
  },
  hourlyForecastScroll: {
    // Removed
  },
  hourlyItem: {
    // Removed
  },
  hourlyTime: {
    // Removed
  },
  hourlyIcon: {
    // Removed
  },
  hourlyTemp: {
    // Removed
  },
  dailyItem: {
    // Removed
  },
  dailyDay: {
    // Removed
  },
  dailyIcon: {
    // Removed
  },
  dailyTempRange: {
    // Removed
  },
  // Styles for Weather Knowledge/Updates - Moved from UpdatesScreen
  knowledgeDetails: {
    marginTop: 10,
  },
  knowledgeItem: {
    color: '#eee',
    fontSize: 14,
    marginBottom: 5,
  },
  updateTime: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  updateTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  updateDetails: {
    marginTop: 10,
  },
  updateDetailItem: {
    color: '#eee',
    fontSize: 14,
    marginBottom: 5,
  },
  // Keep shared menu styles
  slideMenuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: MENU_WIDTH,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    paddingTop: 60,
    paddingHorizontal: 10,
    zIndex: 2,
  },
  slideMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
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
    paddingHorizontal: 10,
  },
});

export default WeatherScreen;