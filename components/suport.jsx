import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, FlatList, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Send, ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';

const Soporte = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { id: '1', text: "Hola, ¿en qué puedo ayudarte hoy?", isUser: false },
    { id: '2', text: "Tengo una pregunta sobre mi cuenta", isUser: true },
    { id: '3', text: "Claro, estaré encantado de ayudarte. ¿Qué necesitas saber sobre tu cuenta?", isUser: false },
  ]);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  React.useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const sendMessage = () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, { id: Date.now().toString(), text: message, isUser: true }]);
      setMessage("");
      // Aquí se simularía el envío del mensaje al backend y la respuesta del soporte
    }
  };

  const renderChatMessage = ({ item }) => (
    <View style={[styles.messageBubble, item.isUser ? styles.userMessage : styles.supportMessage]}>
      <Text style={[styles.messageText, { fontFamily: 'Poppins_400Regular' }]}>{item.text}</Text>
    </View>
  );

  return (
    <LinearGradient colors={["#006B7A", "#004C5E"]} style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="white" />
        </Pressable>
        <Text style={[styles.headerTitle, { fontFamily: 'Poppins_600SemiBold' }]}>Soporte</Text>
      </View>
      <FlatList
        data={chatHistory}
        renderItem={renderChatMessage}
        keyExtractor={item => item.id}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { fontFamily: 'Poppins_400Regular' }]}
          value={message}
          onChangeText={setMessage}
          placeholder="Escribe tu mensaje aquí..."
          placeholderTextColor="#A0A0A0"
        />
        <Pressable onPress={sendMessage} style={styles.sendButton}>
          <Send size={24} color="white" />
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginBottom: 8,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#1A3644',
  },
  supportMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#006B7A',
  },
  messageText: {
    color: 'white',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#1A3644',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#006B7A',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Soporte;

