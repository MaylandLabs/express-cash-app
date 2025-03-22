import React, { useState } from "react"
import { Modal, View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from "react-native"



export const CustomAlert = ({ visible, title, message, buttons, onClose }) => {
  const [animation] = useState(new Animated.Value(0))

  React.useEffect(() => {
    if (visible) {
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
      }).start()
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start()
    }
  }, [visible, animation])

  const getButtonStyle = (style) => {
    switch (style) {
      case "cancel":
        return styles.cancelButton
      case "destructive":
        return styles.destructiveButton
      default:
        return styles.defaultButton
    }
  }

  const getButtonTextStyle = (style) => {
    switch (style) {
      case "cancel":
        return styles.cancelButtonText
      case "destructive":
        return styles.destructiveButtonText
      default:
        return styles.defaultButtonText
    }
  }

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1],
  })

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.alertContainer,
            {
              transform: [{ scale }],
              opacity,
            },
          ]}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{message}</Text>
          </View>
          <View style={styles.buttonContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.button, getButtonStyle(button.style), index > 0 && { marginLeft: 8 }]}
                onPress={() => {
                  button.onPress()
                  if (button.style !== "cancel") {
                    onClose()
                  }
                }}
              >
                <Text style={[styles.buttonText, getButtonTextStyle(button.style)]}>{button.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </View>
    </Modal>
  )
}

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alertContainer: {
    width: width - 60,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleContainer: {
    width: "100%",
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  messageContainer: {
    width: "100%",
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  defaultButton: {
    backgroundColor: "#79C72B",
  },
  cancelButton: {
    backgroundColor: "#E9E9EB",
  },
  destructiveButton: {
    backgroundColor: "#FF3B30",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  defaultButtonText: {
    color: "#055B72",
  },
  cancelButtonText: {
    color: "#000",
  },
  destructiveButtonText: {
    color: "white",
  },
})

