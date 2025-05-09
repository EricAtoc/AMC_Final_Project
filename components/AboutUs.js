// components/AboutUsScreen.js
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
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

const AboutUsScreen = () => {
  const navigation = useNavigation();
  const spinAnim = useRef(new Animated.Value(0)).current;
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

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
      title: 'About Us',
      headerStyle: {
        backgroundColor: '#4db6ac', // Same as MainApp header
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
      headerRight: () => <View />, // To balance the header
    });
  }, [navigation, spin, toggleMenu]);

  return (
    <ImageBackground source={require('../assets/bg.jpeg')} style={styles.background}>
      <View style={styles.mainAppContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.mainAppContent}>
            <Image source={require('../assets/logo.png')} style={styles.tipsLogo} resizeMode="contain" />

            <Text style={styles.welcomeText}>About WeatherWise</Text>
            <Text style={styles.subtitle}>Our mission, vision, and values.</Text>

            <View style={styles.aboutUsContent}>
              <Text style={styles.sectionTitle}>Mission</Text>
              <Text style={styles.sectionText}>
                At WeatherWise, our vision is to offer credible, timely information and insights regarding climate events, weather trends, and environmental trends.
                We collect and compile the latest news and updates from reputable sources, giving you a full picture of the current climate landscape.
                Through this useful information, we hope to enable people and communities to stay informed and make choices that enhance sustainability and climate resilience.
              </Text>

              <Text style={styles.sectionTitle}>Vision</Text>
              <Text style={styles.sectionText}>
                Our vision is to become a reliable source of climate and weather news, enabling individuals to comprehend the effects of global climate phenomena.
                We aim to establish a platform that promotes awareness, inspires action, and facilitates informed decision-making for the protection of the environment.
                Through carefully selected content and climate news, we aspire to develop a global community committed to building a more sustainable and resilient world.
              </Text>

              <Text style={styles.sectionTitle}>Responsibility</Text>
              <Text style={styles.definitionTitle}>Definition:</Text>
              <Text style={styles.sectionText}>
                Taking accountability for the impact of weather information and warnings on communities, businesses, and individuals.
              </Text>

              <Text style={styles.sectionTitle}>Accuracy</Text>
              <Text style={styles.definitionTitle}>Definition:</Text>
              <Text style={styles.sectionText}>
                Providing precise and reliable weather information based on the latest data and technology.
              </Text>

              <Text style={styles.sectionTitle}>Environmental Stewardship</Text>
              <Text style={styles.definitionTitle}>Definition:</Text>
              <Text style={styles.sectionText}>
                Promoting sustainability and actively working to preserve the environment in the face of changing weather patterns and climate change.
              </Text>
            </View>
          </View>
        </ScrollView>

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
  },
  mainAppContent: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  tipsLogo: {
    width: 220,
    height: 120,
    marginBottom: 20,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  aboutUsContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#558b2f',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2e7d32',
    marginBottom: 10,
  },
  definitionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    color: '#7cb342',
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

export default AboutUsScreen;