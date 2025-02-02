import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "./InputScreen.style";

const RecordInputScreen = ({ navigation, addRecord }) => {
  const [exercise, setExercise] = useState(null);
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // ドロップダウン設定
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "ベンチプレス", value: "ベンチプレス" },
    { label: "スクワット", value: "スクワット" },
    { label: "デッドリフト", value: "デッドリフト" },
  ]);

  const handleSave = () => {
    if (exercise && weight && reps) {
      addRecord({
        exercise,
        weight: parseInt(weight),
        reps: parseInt(reps),
        date: date.toISOString().split("T")[0],
      });
      navigation.goBack();
    } else {
      alert("すべてのフィールドを入力してください！");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* 画面タップでキーボードを閉じる */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
          data={[{ key: "form" }]} // FlatList で 1 要素のみ表示
          renderItem={() => (
            <View style={styles.inner}>
              <Text style={styles.label}>種目:</Text>
              <DropDownPicker
                open={open}
                value={exercise}
                items={items}
                setOpen={setOpen}
                setValue={setExercise}
                setItems={setItems}
                placeholder="種目を選択"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                textStyle={styles.textWhite}
                modal={true} // ドロップダウンの競合を防ぐ
              />

              <Text style={styles.label}>重量 (kg):</Text>
              <TextInput
                style={[styles.input, styles.textWhite]}
                value={weight}
                onChangeText={setWeight}
                placeholder="例: 100"
                placeholderTextColor="white"
                keyboardType="numeric"
              />

              <Text style={styles.label}>回数:</Text>
              <TextInput
                style={[styles.input, styles.textWhite]}
                value={reps}
                onChangeText={setReps}
                placeholder="例: 10"
                placeholderTextColor="white"
                keyboardType="numeric"
              />

              <Text style={styles.label}>日付:</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateButtonText}>{date.toDateString()}</Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === "ios" ? "inline" : "default"}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setDate(selectedDate);
                    }
                  }}
                />
              )}

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>記録を保存</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.key}
          keyboardShouldPersistTaps="handled"
        />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RecordInputScreen;
