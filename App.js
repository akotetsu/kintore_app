import React, { useState, useEffect } from "react";
import { StyleSheet, ImageBackground, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RecordListScreen from "./screens/RecordListScreen";
import RecordInputScreen from "./screens/RecordInputScreen";
import GraphScreen from "./screens/GraphScreen";
import uuid from "react-native-uuid";
import { LinearGradient } from "expo-linear-gradient";

const Stack = createStackNavigator();
const STORAGE_KEY = "training-records";

export default function App() {
  const [records, setRecords] = useState([]);

  const saveRecordsToStorage = async (records) => {
    try {
      const jsonValue = JSON.stringify(records);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error("データの保存に失敗しました:", e);
    }
  };

  const loadRecordsFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue) {
        const loadedRecords = JSON.parse(jsonValue);
        setRecords(loadedRecords);
      }
    } catch (e) {
      console.error("データの読み込みに失敗しました:", e);
    }
  };

  useEffect(() => {
    loadRecordsFromStorage();
  }, []);

  const addRecord = (newRecord) => {
    const updatedRecords = [...records, { id: uuid.v4(), ...newRecord }];
    setRecords(updatedRecords);
    saveRecordsToStorage(updatedRecords);
  };

  const deleteRecord = (id) => {
    const updatedRecords = records.filter((record) => record.id !== id);
    setRecords(updatedRecords);
    saveRecordsToStorage(updatedRecords);
  };

  return (
    <>
      {/* ステータスバーを白く設定 */}
      <StatusBar
        barStyle="light-content" // テキストとアイコンを明るい色に
        //translucent={false} // ステータスバーがオーバーレイしないよう
      />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: "center",
            headerBackground: () => (
              <LinearGradient
                colors={["rgba(0, 0, 0, 0.8)", "rgba(0, 255, 0, 0.5)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1 }}
              />
            ),
            headerTintColor: "white", // ヘッダー文字色
          }}
        >
          <Stack.Screen name="RecordList" options={{ title: "記録一覧" }}>
            {(props) => (
              <ImageBackground
                source={require("./assets/images/haikei.png")}
                style={styles.backgroundImage}
                resizeMode="cover"
              >
                <LinearGradient
                  colors={["rgba(0, 0, 0, 0.8)", "rgba(0, 255, 0, 0.5)"]}
                  style={styles.gradient}
                >
                  <RecordListScreen
                    {...props}
                    records={records}
                    deleteRecord={deleteRecord}
                  />
                </LinearGradient>
              </ImageBackground>
            )}
          </Stack.Screen>
          <Stack.Screen name="RecordInput" options={{ title: "記録の追加" }}>
            {(props) => (
              <ImageBackground
                source={require("./assets/images/background.png")}
                style={styles.backgroundImage}
                resizeMode="cover"
              >
                <LinearGradient
                  colors={["rgba(0, 0, 0, 0.8)", "rgba(0, 255, 0, 0.5)"]}
                  style={styles.gradient}
                >
                  <RecordInputScreen {...props} addRecord={addRecord} />
                </LinearGradient>
              </ImageBackground>
            )}
          </Stack.Screen>
          <Stack.Screen name="Graph" options={{ title: "グラフ" }}>
            {(props) => (
              <ImageBackground
                source={require("./assets/images/haikei.png")}
                style={styles.backgroundImage}
                resizeMode="cover"
              >
                <LinearGradient
                  colors={["rgba(0, 0, 0, 0.8)", "rgba(0, 255, 0, 0.5)"]}
                  style={styles.gradient}
                >
                  <GraphScreen {...props} records={records} />
                </LinearGradient>
              </ImageBackground>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    opacity: 0.87, // 透明度
  },
  gradient: {
    flex: 1,
  },
});
