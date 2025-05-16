import React, { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ImageBackground,
  Animated,
  Easing,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Screens
import AboutUsScreen from './components/AboutUs';
import PollutionScreen from './components/Pollution';
import WeatherScreen from './components/Weather';
import EarthquakeScreen from './components/Earthquake';
import UpdatesScreen from './components/Updates';
import ContactsScreen from './components/Contacts';
import ChatBot from './components/chatbot';

const Stack = createNativeStackNavigator();
const { width } = Dimensions.get('window');
const MENU_WIDTH = width * 0.7;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  tipsLogo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  tipsBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipText: {
    color: '#fff',
    fontSize: 16,
  },
  proceedButton: {
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  proceedText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mainAppContainer: {
    flex: 1,
    position: 'relative',
  },
  mainAppContent: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#eee',
    textAlign: 'center',
    marginBottom: 20,
  },
  featureBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
  slideMenuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: MENU_WIDTH,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
  subMenuItem: {
    paddingVertical: 10,
  },
  slideMenuText: {
    color: '#fff',
    fontSize: 16,
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
  globeMenuBar: {
    position: 'absolute',
    top: 15, // Adjust as needed
    left: 15, // Adjust as needed
    zIndex: 3, // Ensure it's above other elements
  },
});

function HomeScreen({ navigation }) {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = () => {
      spinAnim.setValue(0);
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(spin);
    };
    spin();
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleStart = () => navigation.navigate('Tips');

  return (
    <ImageBackground source={require('./assets/bg.jpeg')} style={styles.background}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Image source={require('./assets/logo.png')} style={styles.logo} resizeMode="contain" />
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Animated.View style={[styles.iconWrapper, { transform: [{ rotate: spin }] }]}>
            <Ionicons name="earth" size={24} color="#4caf50" />
          </Animated.View>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

function TipsScreen({ navigation }) {
  const tips = [
    'The application is navigation-friendly',
    'The category section provides list of climate related scenarios that you need',
    'Information are updated based on current weather time',
    'The application provide emergency contacts in case of unexpected events',
    'Information are credible and accurate',
    'Always turn-on the notification for daily weather updates',
  ];

  const handleProceed = () => navigation.navigate('MainApp');

  return (
    <ImageBackground source={require('./assets/bg.jpeg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('./assets/logo.png')} style={styles.tipsLogo} resizeMode="contain" />
        <View style={styles.tipsBox}>
          {tips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Ionicons name="play" size={16} color="#4caf50" style={{ marginRight: 8 }} />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
            <Text style={styles.proceedText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

function MainAppScreen({ navigation }) {
  const spinAnim = useRef(new Animated.Value(0)).current;
  const menuAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  useEffect(() => {
    const spin = () => {
      spinAnim.setValue(0);
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(spin);
    };
    spin();
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
    Animated.timing(menuAnim, {
      toValue: isMenuVisible ? -MENU_WIDTH : 0,
      duration: 300,
      easing: Easing.easeInOut,
      useNativeDriver: true,
    }).start();
  };

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
    toggleMenu();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Hide the default header
    });
  }, [navigation]);

  return (
    <ImageBackground source={require('./assets/bg.jpeg')} style={styles.background}>
      <StatusBar barStyle="light-content" />
      <View style={styles.mainAppContainer}>
        <TouchableOpacity style={styles.globeMenuBar} onPress={toggleMenu}>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <Ionicons name="earth" size={30} color="#fff" />
          </Animated.View>
        </TouchableOpacity>

        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.mainAppContent}>
          <Image source={require('./assets/logo.png')} style={styles.tipsLogo} resizeMode="contain" />
          <Text style={styles.welcomeText}>Welcome to WeatherWise</Text>
          <Text style={styles.subtitle}>Providing reliable source for better climate-base preparation</Text>
          <View style={styles.featureBox}>
            <Text style={styles.featureTitle}>Current Features:</Text>
            <View style={styles.featureItem}>
              <Ionicons name="cloud" size={20} color="#4caf50" />
              <Text style={styles.featureText}>Real-time weather updates</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="warning" size={20} color="#4caf50" />
              <Text style={styles.featureText}>Emergency contacts</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="information-circle" size={20} color="#4caf50" />
              <Text style={styles.featureText}>Climate information</Text>
            </View>
          </View>
        </ScrollView>

        <Animated.View style={[styles.slideMenuContainer, { transform: [{ translateX: menuAnim }] }]}>
          <ScrollView>
            <TouchableOpacity style={styles.slideMenuItem} onPress={() => handleNavigate('AboutUs')}>
              <Ionicons name="information-circle-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
              <Text style={styles.slideMenuText}>About Us</Text>
            </TouchableOpacity>

            <View>
              <TouchableOpacity style={styles.slideMenuItem} onPress={() => setIsCategoryOpen(!isCategoryOpen)}>
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
                  <TouchableOpacity style={styles.subMenuItem} onPress={() => handleNavigate('Pollution')}>
                    <Text style={styles.slideMenuText}>Pollution</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.subMenuItem} onPress={() => handleNavigate('Weather')}>
                    <Text style={styles.slideMenuText}>Weather</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.subMenuItem} onPress={() => handleNavigate('Earthquake')}>
                    <Text style={styles.slideMenuText}>Earthquake</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <TouchableOpacity style={styles.slideMenuItem} onPress={() => handleNavigate('Updates')}>
              <Ionicons name="refresh-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
              <Text style={styles.slideMenuText}>Updates</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.slideMenuItem} onPress={() => handleNavigate('Contacts')}>
              <Ionicons name="call-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
              <Text style={styles.slideMenuText}>Contacts</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.slideMenuItem} onPress={() => handleNavigate('chatbot')}>
              <Ionicons name="chatbubble-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
              <Text style={styles.slideMenuText}>ChatBot</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.slideMenuItem} onPress={toggleMenu}>
              <Ionicons name="close-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
              <Text style={styles.slideMenuText}>Close Menu</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>

        {isMenuVisible && <TouchableOpacity style={styles.menuOverlay} onPress={toggleMenu} activeOpacity={1} />}
      </View>
    </ImageBackground>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Tips" component={TipsScreen} />
        <Stack.Screen name="MainApp" component={MainAppScreen} />
        <Stack.Screen name="AboutUs" component={AboutUsScreen} />
        <Stack.Screen name="Pollution" component={PollutionScreen} />
        <Stack.Screen name="Weather" component={WeatherScreen} />
        <Stack.Screen name="Earthquake" component={EarthquakeScreen} />
        <Stack.Screen name="Updates" component={UpdatesScreen} />
        <Stack.Screen name="Contacts" component={ContactsScreen} />
        <Stack.Screen name="chatbot" component={ChatBot} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;