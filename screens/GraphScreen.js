import React from "react";
import { View, Text, StyleSheet } from "react-native";

const GraphScreen = () => {
  return (
    <View style={styles.root}>
      <Text>グラフ画面</Text>
    </View>
  );
};

export default GraphScreen;

const styles = StyleSheet.create({
  root: {
    fllex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
