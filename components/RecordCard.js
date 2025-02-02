import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./RecordCard.style";

const RecordCard = ({ record, onDelete }) => {
  return (
    <View style={styles.card}>
      <View style={styles.details}>
        {/* 上段: 種目と日付 */}
        <View style={styles.row}>
          <Text style={styles.exercise}>{record.exercise}</Text>
          <Text style={styles.date}>{record.date}</Text>
        </View>
        {/* 下段: 重量と回数 */}
        <View style={styles.row}>
          <Text style={styles.weight}>重量: {record.weight}kg</Text>
          <Text style={styles.reps}>回数: {record.reps}回</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => onDelete(record.id)}
        style={styles.iconButton}
      >
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default RecordCard;
