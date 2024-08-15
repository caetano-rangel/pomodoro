import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import styles from "./styles";


export default function Badges({ navigation, route }) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>medals</Text>
      <View style={styles.content}>
        <Text style={styles.titleMedal}>workaholic</Text>
        <View style={styles.line} />
        <View style={styles.boxMedals}>
          <View style={styles.medals}>
            <FontAwesome5 name="medal" size={30} color="#b9b9b9" />
            <Text style={styles.textMedal}>complete</Text>
            <Text style={styles.textMedal}>10 pomos</Text>
          </View>
          <View style={styles.medals}>
            <FontAwesome5 name="medal" size={30} color="#b9b9b9" />
            <Text style={styles.textMedal}>complete</Text>
            <Text style={styles.textMedal}>50 tasks</Text>
          </View>
          <View style={styles.medals}>
            <FontAwesome5 name="medal" size={30} color="#b9b9b9" />
            <Text style={styles.textMedal}>complete</Text>
            <Text style={styles.textMedal}>100 tasks</Text>
          </View>
          <View style={styles.medals}>
            <FontAwesome5 name="medal" size={30} color="#b9b9b9" />
            <Text style={styles.textMedal}>complete</Text>
            <Text style={styles.textMedal}>200 tasks</Text>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.titleMedal}>gold runner</Text>
        <View style={styles.line} />
        <View style={styles.boxMedals}>
          <View style={styles.medals}>
            <FontAwesome5 name="medal" size={30} color="#b9b9b9" />
            <Text style={styles.textMedal}>complete</Text>
            <Text style={styles.textMedal}>10 minutos</Text>
          </View>
          <View style={styles.medals}>
            <FontAwesome5 name="medal" size={30} color="#b9b9b9" />
            <Text style={styles.textMedal}>complete</Text>
            <Text style={styles.textMedal}>50 tasks</Text>
          </View>
          <View style={styles.medals}>
            <FontAwesome5 name="medal" size={30} color="#b9b9b9" />
            <Text style={styles.textMedal}>complete</Text>
            <Text style={styles.textMedal}>100 tasks</Text>
          </View>
          <View style={styles.medals}>
            <FontAwesome5 name="medal" size={30} color="#b9b9b9" />
            <Text style={styles.textMedal}>complete</Text>
            <Text style={styles.textMedal}>200 tasks</Text>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.titleMedal}>Health</Text>
        <View style={styles.line} />
        <View style={styles.boxMedals}>
          <View style={styles.medals}>
            <FontAwesome5 name="medal" size={30} color="#b9b9b9" />
            <Text style={styles.textMedal}>complete</Text>
            <Text style={styles.textMedal}>10 alongs</Text>
          </View>
          <View style={styles.medals}>
            <FontAwesome5 name="medal" size={30} color="#b9b9b9" />
            <Text style={styles.textMedal}>complete</Text>
            <Text style={styles.textMedal}>50 tasks</Text>
          </View>
          <View style={styles.medals}>
            <FontAwesome5 name="medal" size={30} color="#b9b9b9" />
            <Text style={styles.textMedal}>complete</Text>
            <Text style={styles.textMedal}>100 tasks</Text>
          </View>
          <View style={styles.medals}>
            <FontAwesome5 name="medal" size={30} color="#b9b9b9" />
            <Text style={styles.textMedal}>complete</Text>
            <Text style={styles.textMedal}>200 tasks</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
