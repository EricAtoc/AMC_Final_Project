import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Animated,
  Easing,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const MENU_WIDTH = width * 0.7;

const PollutionScreen = () => {
  const navigation = useNavigation();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const spinAnim = useRef(new Animated.Value(0)).current;

  // State to track the selected step for the pollution actions
  const [selectedStep, setSelectedStep] = useState(null);

  // State for weather condition (initialized to match the image)
  const [weatherCondition, setWeatherCondition] = useState('Partly cloudy');
  // In a real app, you would fetch this data dynamically

  const myImage = require('../assets/image.png'); // Ensure this path is correct for your video thumbnail image
  const backgroundImage = require('../assets/bgggg.jpg'); // Your background image

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

    // In a real app, you would fetch weather data here and update setWeatherCondition
    // Example: fetchWeather().then(data => setWeatherCondition(data.condition));

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Pollution Information',
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

  // Function to determine the Ionicons name based on weather condition
  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return 'sunny-outline'; // Ionicons name for sunny
      case 'partly cloudy':
        return 'cloudy-outline'; // Ionicons name for partly cloudy/cloudy
      case 'cloudy':
        return 'cloudy-outline';
      case 'rainy':
        return 'rainy-outline'; // Ionicons name for rainy
      case 'thunderstorm':
        return 'thunderstorm-outline'; // Ionicons name for thunderstorm
      // Add more cases for other weather conditions as needed
      default:
        return 'alert-circle-outline'; // Default icon for unknown condition
    }
  };


  // Function to render the content for the selected step
  const renderStepContent = () => {
    if (selectedStep === null) {
      return <Text style={styles.stepContentText}>Select a step above to learn more about actions you can take to reduce air pollution.</Text>;
    }
    // Placeholder content for each step (replace with your actual content)
    switch (selectedStep) {
      case 1:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepContentTitle}>Step 1: Drive Your Car Less</Text>
            <Text style={styles.stepContentText}>Reducing car usage lowers tailpipe emissions, a major source of urban air pollution. Consider walking, biking, carpooling, or using public transportation for shorter trips.</Text>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepContentTitle}>Step 2: Keep Your Car in Good Repair</Text>
            <Text style={styles.stepContentText}>Properly maintained vehicles run more efficiently and produce fewer pollutants. Regular tune-ups, oil changes, and tire inflation can make a difference.</Text>
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepContentTitle}>Step 3: Turn Off Your Engine When Idling</Text>
            <Text style={styles.stepContentText}>Excessive idling wastes fuel and releases unnecessary emissions into the air. If you're waiting for more than a minute, turn off your engine.</Text>
          </View>
        );
      case 4:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepContentTitle}>Step 4: Don't Burn Your Garbage</Text>
            <Text style={styles.stepContentText}>Burning garbage releases toxic pollutants and harmful particulate matter into the atmosphere, significantly impacting air quality and health.</Text>
          </View>
        );
      case 5:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepContentTitle}>Step 5: Limit Backyard Fires in the City</Text>
            <Text style={styles.stepContentText}>While seemingly harmless, backyard fires, especially in urban areas, contribute to localized air pollution and can affect sensitive individuals. Check local regulations.</Text>
          </View>
        );
      case 6:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepContentTitle}>Step 6: Plant and Care for Trees</Text>
            <Text style={styles.stepContentText}>Trees act as natural air filters, absorbing pollutants and releasing oxygen. Planting trees and maintaining urban green spaces helps improve air quality.</Text>
          </View>
        );
      case 7:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepContentTitle}>Step 7: Switch to Electric or Hand-Powered Lawn Equipment</Text>
            <Text style={styles.stepContentText}>Gas-powered lawnmowers and other equipment can be significant polluters. Opting for electric or manual alternatives reduces these emissions.</Text>
          </View>
        );
      case 8:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepContentTitle}>Step 8: Use Less Energy</Text>
            <Text style={styles.stepContentText}>Reducing energy consumption, especially from sources relying on fossil fuels, decreases the demand that leads to power plant emissions. Conserve electricity and heat.</Text>
          </View>
        );
      case 9:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepContentTitle}>Step 9: Become a Champion for Clean Air</Text>
            <Text style={styles.stepContentText}>Educate yourself and others about air pollution, advocate for cleaner policies, and support initiatives that promote clean air in your community.</Text>
          </View>
        );
      default:
        return <Text style={styles.stepContentText}>Select a step above to learn more.</Text>;
    }
  };


  return (
    <View style={styles.mainAppContainer}>
      <ImageBackground source={backgroundImage} style={styles.background}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* --- AQI Card --- */}
          <View style={styles.aqiCard}>
            <Text style={styles.aqiTitle}>Caloocan City Air Quality Index (AQI) | Air Pollution</Text>
            <Text style={styles.aqiSubtitle}>
              Real-time PM2.5, PM10 air pollution level in Caloocan : Last Updated: 2025-05-07 12:25:27 PM (Local Time)
            </Text>

            {/* Pollutant Levels Horizontal ScrollView */}
            <ScrollView horizontal style={styles.pollutantLevelsScroll}>
              <View style={styles.pollutantItem}>
                <Text style={styles.pollutantName}>Particulate {"\n"} (PM2.5)</Text>
                <View style={styles.pollutantValueContainer}>
                  <Text style={styles.pollutantValue}>25</Text>
                  <Text style={styles.pollutantUnit}>µg/m³</Text>
                </View>
              </View>

              <View style={styles.pollutantItem}>
                <Text style={styles.pollutantName}>Particulate {"\n"} (PM10)</Text>
                <View style={styles.pollutantValueContainer}>
                  <Text style={styles.pollutantValue}>40</Text>
                  <Text style={styles.pollutantUnit}>µg/m³</Text>
                </View>
              </View>
              <View style={styles.pollutantItem}>
                <Text style={styles.pollutantName}>Carbon {"\n"} Monoxide (CO)</Text>
                <View style={styles.pollutantValueContainer}>
                  <Text style={styles.pollutantValue}>116</Text>
                  <Text style={styles.pollutantUnit}>ppb</Text>
                </View>
              </View>
              <View style={styles.pollutantItem}>
                <Text style={styles.pollutantName}>Sulfur {"\n"} Dioxide (SO2)</Text>
                <View style={styles.pollutantValueContainer}>
                  <Text style={styles.pollutantValue}>10</Text>
                  <Text style={styles.pollutantUnit}>ppb</Text>
                </View>
              </View>
              <View style={styles.pollutantItem}>
                <Text style={styles.pollutantName}>Nitrogen {"\n"} Dioxide (NO2)</Text>
                <View style={styles.pollutantValueContainer}>
                  <Text style={styles.pollutantValue}>48</Text>
                  <Text style={styles.pollutantUnit}>ppb</Text>
                </View>
              </View>
              <View style={styles.pollutantItem}>
                <Text style={styles.pollutantName}>Ozone {"\n"} (O3)</Text>
                <View style={styles.pollutantValueContainer}>
                  <Text style={styles.pollutantValue}>27</Text>
                  <Text style={styles.pollutantUnit}>ppb</Text>
                </View>
              </View>
            </ScrollView>
          </View>

          {/* --- Current Condition Card (with dynamic weather icon) --- */}
          <View style={styles.currentConditionCard}>
            <View style={styles.aqiInfo}>
              <Text style={styles.aqiValue}>80</Text>
              <Text style={styles.aqiCategory}>Moderate</Text>
              <Text style={styles.pollutantLabel}>PM2.5: 40 µg/m³, PM10: 35 µg/m³</Text>
            </View>
            <View style={styles.weatherInfo}>
              <Text style={styles.temperature}>35°C</Text>
              <Text style={styles.condition}>{weatherCondition}</Text>
              {/* Replace placeholder with dynamic Ionicons */}
              <Ionicons
                name={getWeatherIcon(weatherCondition)}
                size={50}
                color="#FFD700" // Example color for sunny/partly cloudy
                style={styles.weatherIcon} // Apply new style
              />
              <Text style={styles.humidityWind}>Humidity: 62% {"\n"} UV index: 7 {"\n"} Wind: 3.6 km/h</Text>
            </View>
          </View>

          {/* --- Pro-advice Card --- */}
          <View style={styles.adviceCard}>
            <Text style={styles.adviceTitle}>Pro-advice on reducing air pollution {"\n"} in Caloocan areas.</Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=DggMi6FdZck')}>
              <Image
                source={myImage}
                style={styles.videoThumbnail}
              />
            </TouchableOpacity>
            <Text style={styles.videoDescription}>
              Learn how Texans can help reduce air pollution by reducing electricity usage, shopping local, walking or riding a bike, buying second hand, and using ride sharing or public transportation. More tips can be found at TakeCareOfTexas.org.
            </Text>
          </View>

          {/* --- What you can do Card with Interactive Scale --- */}
          <View style={styles.actionsCard}>
            <Text style={styles.actionsTitle}>What you can do about {"\n"} air pollution:</Text>

            {/* Interactive Scale */}
            <View style={styles.interactiveScaleContainer}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((step) => (
                <TouchableOpacity
                  key={step}
                  style={[
                    styles.stepButton,
                    selectedStep === step && styles.selectedStepButton,
                  ]}
                  onPress={() => setSelectedStep(step)}
                >
                  <Text style={[
                    styles.stepButtonText,
                    selectedStep === step && styles.selectedStepButtonText,
                  ]}>
                    {step}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Content area that changes based on selected step */}
            <View style={styles.stepContentArea}>
              {renderStepContent()}
            </View>

             {/* The original action items list - conditionally render */}
             {selectedStep === null && (
                <View>
                    <Text style={styles.actionItem}>• Drive your car less.</Text>
                    <Text style={styles.actionItem}>• Keep your car in good repair.</Text>
                    <Text style={styles.actionItem}>• Turn off your engine when idling.</Text>
                    <Text style={styles.actionItem}>• Don't burn your garbage.</Text>
                    <Text style={styles.actionItem}>• Limit backyard fires in the city.</Text>
                    <Text style={styles.actionItem}>• Plant and care for trees.</Text>
                    <Text style={styles.actionItem}>• Switch to electric or hand-powered {"\n"} lawn equipment.</Text>
                    <Text style={styles.actionItem}>• Use less energy.</Text>
                    <Text style={styles.actionItem}>• Become a champion for clean air.</Text>
                </View>
             )}

          </View>

          {/* --- Reference --- */}
          <View style={styles.referenceCard}>
            <Text style={styles.referenceTitle}>Reference :</Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.aqi.in/dashboard/philippines/metro-manila/caloocan')}>
              <Text style={styles.referenceLink}>https://www.aqi.in/dashboard/philippin {"\n"} es/metro-manila/caloocan</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>


      {/* Slide Menu */}
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

        <TouchableOpacity style={styles.slideMenuItem} onPress={toggleMenu}>
          <Ionicons name="close-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
          <Text style={styles.slideMenuText}>Close Menu</Text>
        </TouchableOpacity>
      </Animated.View>

      {isMenuVisible && (
        <TouchableOpacity style={styles.menuOverlay} onPress={toggleMenu} activeOpacity={1} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  aqiCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  aqiTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  aqiSubtitle: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 12,
    textAlign: 'center',
  },
  pollutantLevelsScroll: {
    marginVertical: 10,
  },
  pollutantItem: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
    width: 100,
    alignItems: 'center',
  },
  pollutantName: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  pollutantValueContainer: {
    alignItems: 'center',
  },
  pollutantValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  pollutantUnit: {
    fontSize: 10,
    color: 'gray',
  },
  currentConditionCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aqiInfo: {
    flex: 1,
    alignItems: 'center',
  },
  aqiValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E4A700',
  },
  aqiCategory: {
    fontSize: 16,
    color: '#E4A700',
    marginBottom: 5,
  },
  pollutantLabel: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
  weatherInfo: {
    flex: 1,
    alignItems: 'center',
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  condition: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
  // Removed weatherIconPlaceholder style
  weatherIcon: { // New style for the weather icon
    marginTop: 5,
    marginBottom: 5,
  },
  humidityWind: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
  adviceCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  adviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  videoThumbnail: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  videoDescription: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
    textAlign: 'center',
  },
  actionsCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  actionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  interactiveScaleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  stepButton: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedStepButton: {
    backgroundColor: '#4db6ac',
    borderColor: '#4db6ac',
  },
  stepButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  selectedStepButtonText: {
    color: '#fff',
  },
  stepContentArea: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    width: '100%',
  },
  stepContent: {
    // Styles for the container of step content
  },
  stepContentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
    textAlign: 'center',
  },
  stepContentText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  actionItem: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
    textAlign: 'left',
    width: '100%',
  },
  referenceCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  referenceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  referenceLink: {
    fontSize: 12,
    color: 'blue',
    textAlign: 'center',
  },
  // Styles for the sliding menu
  mainAppContainer: {
    flex: 1,
    position: 'relative',
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

export default PollutionScreen;