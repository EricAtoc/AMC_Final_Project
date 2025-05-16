import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const MENU_WIDTH = width * 0.7;

const ChatBot = () => {
  const navigation = useNavigation();
  const spinAnim = useRef(new Animated.Value(0)).current;
  const menuAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you?', sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

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

  const spinValue = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const toggleMenu = () => {
    const toValue = isMenuVisible ? -MENU_WIDTH : 0;
    Animated.timing(menuAnim, {
      toValue,
      duration: 300,
      easing: Easing.easeInOut,
      useNativeDriver: true,
    }).start(() => setIsMenuVisible(!isMenuVisible));
  };

  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);

  // Navigation header setup (missing before)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'ChatBot',
      headerStyle: {
        backgroundColor: '#4db6ac',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 15 }} onPress={toggleMenu}>
          <Animated.View style={{ transform: [{ rotate: spinValue }] }}>
            <Ionicons name="earth" size={24} color="#fff" />
          </Animated.View>
        </TouchableOpacity>
      ),
      headerRight: () => <View />,
    });
  }, [navigation, toggleMenu, spinValue]);

  // Replace with your actual API key if needed
  const API_KEY = 'AIzaSyCFG85QlaTa7bBDjOMQMl_8rnHrwZs7QWc';
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage = { text: inputText, sender: 'user' };
    setMessages(prev => [userMessage, ...prev]);
    setInputText('');
    setLoading(true);

    try {
      const requestBody = {
        contents: [{ parts: [{ text: inputText }] }]
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I didn\'t understand that.';

      setMessages(prev => [{ text: responseText, sender: 'bot' }, ...prev]);
    } catch (error) {
      console.error('API Error:', error);
      setMessages(prev => [{
        text: 'Sorry, I encountered an error processing your request.',
        sender: 'bot'
      }, ...prev]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessage : styles.botMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.sender === 'user' && styles.userMessageText
      ]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Messages */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messagesList}
        inverted={false}
      />

      {/* Input Field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          placeholderTextColor="#999"
          editable={!loading}
        />
        <TouchableOpacity
          style={[styles.sendButton, loading && styles.disableButton]}
          onPress={handleSend}
          disabled={loading}
        >
          <Text style={styles.sendButtonText}>{loading ? 'Sending...' : 'Send'}</Text>
        </TouchableOpacity>
      </View>

      {/* Slide-out Menu */}
      <Animated.View style={[styles.slideMenuContainer, { transform: [{ translateX: menuAnim }] }]}>
        <TouchableOpacity style={styles.slideMenuItem} onPress={() => { navigation.navigate('AboutUs'); toggleMenu(); }}>
          <Ionicons name="information-circle-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
          <Text style={styles.slideMenuText}>About Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.slideMenuItem} onPress={toggleCategory}>
          <Ionicons name={isCategoryOpen ? 'chevron-down-outline' : 'chevron-forward-outline'} size={20} color="#fff" style={{ marginRight: 10 }} />
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

        <TouchableOpacity style={styles.slideMenuItem} onPress={() => { navigation.navigate('Updates'); toggleMenu(); }}>
          <Ionicons name="refresh-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
          <Text style={styles.slideMenuText}>Updates</Text>
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
      </Animated.View>

      {/* Dim overlay */}
      {isMenuVisible && (
        <TouchableOpacity style={styles.menuOverlay} onPress={toggleMenu} activeOpacity={1} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },

  messagesList: {
    flexGrow: 1, padding: 16, flexDirection: 'column-reverse',
    paddingBottom: 8,
  },
  messageContainer: {
    maxWidth: '80%', padding: 12, borderRadius: 12, marginBottom: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, shadowRadius: 2, elevation: 2,
  },
  userMessage: { alignSelf: 'flex-end', backgroundColor: '#007AFF' },
  botMessage: { alignSelf: 'flex-start', backgroundColor: '#E5E5EA' },
  messageText: { fontSize: 16 },
  userMessageText: { color: '#fff' },

  inputContainer: {
    flexDirection: 'row', padding: 8, backgroundColor: '#fff',
    borderTopWidth: 1, borderTopColor: '#ddd',
  },
  input: {
    flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 8, marginRight: 8, fontSize: 16,
  },
  sendButton: {
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#007AFF', borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 8,
  },
  sendButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  disableButton: { opacity: 0.5 },

  slideMenuContainer: {
    position: 'absolute', top: 0, left: 0, width: MENU_WIDTH, height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.85)', paddingTop: 60, paddingHorizontal: 20,
    zIndex: 2,
  },
  slideMenuItem: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 15,
    borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  subMenuItem: { paddingVertical: 10 },
  slideMenuText: { color: '#fff', fontSize: 18 },

  menuOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1,
  },
});

export default ChatBot;
