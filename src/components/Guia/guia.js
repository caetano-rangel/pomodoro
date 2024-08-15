import React, { useState } from 'react';
import { Text, View, TouchableOpacity, LayoutAnimation, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from "./styles";

export default function Guia({ navigation, route }) {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const toggleExpand = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(index === expandedIndex ? -1 : index);
  };

  const faqData = [
    {
      question: "O que é o Método Pomodoro?",
      answer: "O Método Pomodoro é uma técnica de gerenciamento de tempo desenvolvida por Francesco Cirillo. Ele divide o trabalho em intervalos de 25 minutos, chamados de 'Pomodoros', seguidos por uma breve pausa de 5 minutos. Após quatro Pomodoros, você faz uma pausa mais longa de 15-30 minutos. Isso ajuda a melhorar a concentração e a produtividade."
    },
    {
      question: "Como o aplicativo Pomodoro funciona?",
      answer: "Nosso aplicativo Pomodoro permite que você configure e gerencie seus intervalos de trabalho e pausas. Você pode personalizar a duração dos Pomodoros e das pausas, além de mudar o tema e sons."
    },
    {
      question: "Posso personalizar os intervalos do Pomodoro?",
      answer: "Sim! Você pode ajustar a duração dos Pomodoros e das pausas nas configurações do aplicativo. Isso permite que você adapte a técnica Pomodoro às suas necessidades e preferências pessoais."
    },
    {
      question: "O que acontece se eu precisar pausar o temporizador?",
      answer: "Se você precisar interromper um Pomodoro ou pausa, você pode pausar o temporizador a qualquer momento e retomar quando estiver pronto. Tenha em mente que isso pode afetar o cronograma das suas tarefas e intervalos."
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.faqTitle}>FAQ</Text>
      <View contentContainerStyle={styles.scrollContainer}>
        {faqData.map((faq, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.item,
              index === expandedIndex && styles.itemExpanded
            ]}
            onPress={() => toggleExpand(index)}
            activeOpacity={0.8}
          >
            <View style={styles.questionContainer}>
              <Text style={styles.title}>{faq.question}</Text>
              <Ionicons
                name={index === expandedIndex ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#D6BD98"
                style={styles.icon}
              />
            </View>
            {index === expandedIndex && (
              <View style={styles.answerContainer}>
                <Text style={styles.answer}>{faq.answer}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
