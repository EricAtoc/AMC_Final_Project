// components/EarthquakeScreen.js
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

const EarthquakeScreen = () => {
  const navigation = useNavigation();
  const spinAnim = useRef(new Animated.Value(0)).current;
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [latestEarthquake, setLatestEarthquake] = useState(null);
  const [safetyTips, setSafetyTips] = useState([]);

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

    // Simulate fetching latest earthquake data (replace with actual API call)
    const fetchLatestEarthquake = async () => {
      const simulatedData = {
        location: 'Near Caloocan City, Metro Manila, Philippines',
        time: 'Monday, May 5, 2025 at 09:50 AM PST',
        magnitude: 4.2,
      };
      setLatestEarthquake(simulatedData);
      setSafetyTipsBasedOnMagnitude(simulatedData?.magnitude);
    };

    fetchLatestEarthquake();
  }, []);

  const setSafetyTipsBasedOnMagnitude = (magnitude) => {
    if (magnitude >= 0 && magnitude < 3) {
      setSafetyTips(['Generally not felt, but recorded. No damage.']);
    } else if (magnitude >= 3 && magnitude < 4) {
      setSafetyTips(['Often felt by people, but rarely causes damage.']);
    } else if (magnitude >= 4 && magnitude < 5) {
      setSafetyTips([
        'Felt by most and may cause damage to poorly constructed buildings.',
        'Stay indoors if you are inside.',
        'Move away from windows and unsecured objects.',
      ]);
    } else if (magnitude >= 5 && magnitude < 6) {
      setSafetyTips([
        'Can cause damage of varying severity to poorly constructed buildings. Slight damage to well-built ordinary structures.',
        'Drop, cover, and hold on.',
        'Stay away from windows and outside walls.',
      ]);
    } else if (magnitude >= 6 && magnitude < 7) {
      setSafetyTips([
        'Can be destructive in areas up to about 100 kilometers across where people live on poorly built structures. Slight to moderate damage to well-built ordinary structures.',
        'Expect strong shaking. Drop, cover, and hold on.',
        'If outdoors, find a clear spot away from buildings, trees, and power lines.',
      ]);
    } else if (magnitude >= 7 && magnitude < 8) {
      setSafetyTips([
        'Can cause damage to most buildings, even well-built ones to varying degrees. Well-designed structures are likely to be damaged.',
        'Expect very strong shaking. Drop, cover, and hold on.',
        'Be prepared for aftershocks.',
      ]);
    } else if (magnitude >= 8) {
      setSafetyTips([
        'Can cause great destruction in areas up to several hundred kilometers across. Well-built structures can be destroyed. Heavy damage and collapse will occur in poorly built or badly designed structures.',
        'Expect violent shaking. Drop, cover, and hold on firmly.',
        'Be prepared for major aftershocks. Evacuate if you are in a dangerous area once the shaking stops.',
      ]);
    } else {
      setSafetyTips(['No significant earthquake detected.']);
    }
  };

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
      title: 'Earthquake Safety',
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
            <Text style={styles.title}>Latest Earthquake Information</Text>
            {latestEarthquake ? (
              <View style={styles.earthquakeCard}>
                <Text style={styles.earthquakeLocation}>Location: {latestEarthquake.location}</Text>
                <Text style={styles.earthquakeTime}>Time: {latestEarthquake.time}</Text>
                <Text style={styles.earthquakeMagnitude}>Magnitude: {latestEarthquake.magnitude.toFixed(1)}</Text>
                {safetyTips.length > 0 && (
                  <View style={styles.safetyTipsContainer}>
                    <Text style={styles.safetyTipsTitle}>Safety Tips:</Text>
                    {safetyTips.map((tip, index) => (
                      <Text key={index} style={styles.safetyTipItem}>
                        • {tip}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ) : (
              <Text style={styles.loadingText}>Fetching latest earthquake data...</Text>
            )}
          </View>
        </ScrollView>

        {/* Slide Menu (remains the same) */}
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
  earthquakeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  earthquakeLocation: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  earthquakeTime: {
    color: '#eee',
    fontSize: 14,
    marginBottom: 8,
  },
  earthquakeMagnitude: {
    color: '#f44336', // Example color for emphasis
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  safetyTipsContainer: {
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  safetyTipsTitle: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
  },
  safetyTipItem: {
    color: '#eee',
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 3,
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

export default EarthquakeScreen;