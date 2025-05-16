// components/ContactsScreen.js
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

const ContactsScreen = () => {
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
      title: 'Emergency Contacts',
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
            <Text style={styles.title}>Emergency Contacts</Text>
            <Text style={styles.content}>List of emergency contact numbers.</Text>
            {/* You can add your contact information here */}
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>National Emergency Hotline:</Text>
              <Text style={styles.contactNumber}>911</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Philippine Red Cross:</Text>
              <Text style={styles.contactNumber}>143</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Bureau of Fire Protection - Metro Manila:</Text>
              <Text style={styles.contactNumber}> (02) 8426-0219 / (02) 8426-0241 / (02) 8426-0259 / (02) 8426-3287</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Philippine National Police (PNP) - NCRPO:</Text>
              <Text style={styles.contactNumber}> (02) 8838-1505 / (02) 8709-4913</Text>
            </View>
            {/* Add more contacts as needed for Caloocan */}
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
  content: {
    fontSize: 16,
    color: '#eee',
    textAlign: 'center',
    marginBottom: 20,
  },
  contactItem: {
    width: '100%',
    paddingVertical: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  contactLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  contactNumber: {
    color: '#eee',
    fontSize: 16,
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

export default ContactsScreen;