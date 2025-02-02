import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { FAB } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import RecordCard from "../components/RecordCard";

const RecordListScreen = ({ navigation, records, deleteRecord }) => {
  return (
    <LinearGradient
      colors={["#000000", "#00FF00"]} // 黒から緑
      start={{ x: 0, y: 0 }} // 左上から開始
      end={{ x: 1, y: 1 }} // 右下で終了
      style={styles.gradient}
    >
      <View style={styles.root}>
        <FlatList
          data={records}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RecordCard record={item} onDelete={deleteRecord} />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              記録がありません。新しい記録を追加してください！
            </Text>
          }
        />

        {/* フローティングボタン */}
        <FAB
          style={styles.fab}
          icon="plus"
          label="追加"
          onPress={() => navigation.navigate("RecordInput")}
          color="white"
          uppercase={false}
        />
      </View>
    </LinearGradient>
  );
};

export default RecordListScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  root: {
    flex: 1,
    padding: 16,
  },
  emptyText: {
    textAlign: "center",
    marginVertical: 20,
    color: "#888",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "blue",
  },
});
