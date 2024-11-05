import { StyleSheet, Text, View, Image, Button, FlatList, TextInput, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 



const HomeView = ({handlePress, nombre, setNombre, imageView}) => {
    const [posts, setPosts] = useState([])
    const insets = useSafeAreaInsets();

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(data => setPosts(data) )
    },[])
    return(
    <SafeAreaView style={[styles.safeArea,{ paddingTop: insets.top, paddingBottom: insets.bottom }]}>
    <View style={styles.container}>
        <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
            <View style={styles.container}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.body}</Text>
                <Button
                title="click"
                onPress={() => handlePress(item.title)}
                />
            </View>
        )}

        />


    </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        gap: 10
    },
    containerScreen: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#000",
    },
    safeArea: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    button: {
      padding: 10,
      backgroundColor: 'red',
      borderRadius: 5,
      marginBottom: 10
    },
    buttonPressed: {
      backgroundColor: 'green',
      opacity: 0.5,
      padding: 20
    },
    title: {
      fontSize: 30
    },
  
  });

export default HomeView