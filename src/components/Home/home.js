import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Modal, StyleSheet, Animated} from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons, FontAwesome5, FontAwesome, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import styles from "./styles";

const DEFAULT_POMODORO_TIME = 25 * 60;
const DEFAULT_BREAK_TIME = 5 * 60;

export default function Home() {
  const [seconds, setSeconds] = useState(DEFAULT_POMODORO_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [soundModalVisible, setSoundModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#1A3636');
  const [isHeartbeatActive, setIsHeartbeatActive] = useState(false);
  const [isSettingsModalBlocked, setIsSettingsModalBlocked] = useState(false);
  const [stretchingStatus, setStretchingStatus] = useState('Alongamento');


  const [colorSlideAnim] = useState(new Animated.Value(-300));
  const [soundSlideAnim] = useState(new Animated.Value(600));
  const [settingsSlideAnim] = useState(new Animated.Value(600));

  const [pomodoroTime, setPomodoroTime] = useState(DEFAULT_POMODORO_TIME / 60);
  const [breakTime, setBreakTime] = useState(DEFAULT_BREAK_TIME / 60);

  const [soundObject, setSoundObject] = useState(null);

  const resetTimer = () => {
    if (isBreak) {
      setSeconds(breakTime * 60);
    } else {
      setSeconds(pomodoroTime * 60);
    }
  };

  useEffect(() => {
    let timer = null;
    if (isActive) {
      timer = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 0) {
            if (isHeartbeatActive) {
              // Quando o tempo de alongamento chega a zero
              setIsActive(false); // Para o cronômetro
              return 5 * 60; // Mantém o tempo de alongamento em 5 minutos
            } else if (isBreak) {
              // Alterna para o Pomodoro após o intervalo
              setIsBreak(false);
              return pomodoroTime * 60;
            } else {
              // Alterna para o intervalo após o Pomodoro
              setIsBreak(true);
              return breakTime * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isActive, isBreak, pomodoroTime, breakTime, isHeartbeatActive]);

  useEffect(() => {
    resetTimer(); // Reinicia o cronômetro quando o tempo do Pomodoro ou intervalo mudar
  }, [pomodoroTime, breakTime]);

  useEffect(() => {
    return () => stopSound();
  }, []);

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const playSound = async (soundUrl) => {
    try {
      if (soundObject) {
        await soundObject.stopAsync();
        await soundObject.unloadAsync();
        setSoundObject(null);
      }
      const { sound } = await Audio.Sound.createAsync(soundUrl);
      setSoundObject(sound);
      await sound.playAsync();
    } catch (error) {
      console.error("Erro ao tocar o som:", error);
    }
  };

  const stopSound = async () => {
    if (soundObject) {
      await soundObject.stopAsync();
      setSoundObject(null);
    }
  };

  const showColorModal = () => {
    setColorModalVisible(true);
    Animated.spring(colorSlideAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const hideColorModal = () => {
    Animated.spring(colorSlideAnim, {
      toValue: 600,
      useNativeDriver: true,
    }).start(() => setColorModalVisible(false));
  };

  const showSoundModal = () => {
    setSoundModalVisible(true);
    Animated.spring(soundSlideAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const hideSoundModal = () => {
    Animated.spring(soundSlideAnim, {
      toValue: 600,
      useNativeDriver: true,
    }).start(() => setSoundModalVisible(false));
  };

  const showSettingsModal = () => {
    setSettingsModalVisible(true);
    Animated.spring(settingsSlideAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const hideSettingsModal = () => {
    Animated.spring(settingsSlideAnim, {
      toValue: 600,
      useNativeDriver: true,
    }).start(() => setSettingsModalVisible(false));
  };

  const handleHeartbeatPress = () => {
    setIsHeartbeatActive(!isHeartbeatActive);
    setIsActive(false);
    if (isHeartbeatActive) {
      // Se o heartbeat estiver ativo, define o tempo para 5 minutos
      setSeconds(25 * 60);
      setIsSettingsModalBlocked(false);
    } else {
      // Se o heartbeat estiver desativado, define o tempo de volta para 25 minutos
      setSeconds(5 * 60);
      setIsSettingsModalBlocked(true);
    }
    setIsHeartbeatActive(!isHeartbeatActive);
  };

  useEffect(() => {
    if (isHeartbeatActive && seconds === 5 * 60) {
      setIsSettingsModalBlocked(true);
    } else {
      setIsSettingsModalBlocked(false);
    }
  }, [seconds, isHeartbeatActive]);

  useEffect(() => {
    let statusTimer = null;
    if (isActive && isHeartbeatActive) {
      setStretchingStatus('Pescoço');
      statusTimer = setInterval(() => {
        setStretchingStatus((prev) => {
          switch (prev) {
            case 'Alongamento':
              return 'Pescoço';
            case 'Pescoço':
              return 'Ombros';
            case 'Ombros':
              return 'Braços';
            case 'Braços':
              return 'Tronco';
            case 'Tronco':
              return 'Perna';
            case 'Perna':
              return 'Alongamento';
            default:
              return 'Alongamento';
          }
        });
      }, 60000); // Muda o status a cada 1 minuto
    } else {
      clearInterval(statusTimer);
      if (!isActive && isHeartbeatActive) {
        setStretchingStatus('Alongamento');
      }
    }
    return () => clearInterval(statusTimer);
  }, [isActive, isHeartbeatActive]);
  

  const audioFiles = {
    vento: require('../../../assets/audio/vento.mp3'),
    fogueira: require('../../../assets/audio/fogueira.wav'),
    chuva: require('../../../assets/audio/chuva.wav'),
    bird: require('../../../assets/audio/bird.wav'),
    forest: require('../../../assets/audio/forest.wav'),
    trovao: require('../../../assets/audio/trovao.wav'),
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.icon} onPress={showSoundModal}>
          <FontAwesome5 name="itunes-note" size={30} color="#D6BD98" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={showColorModal}>
          <MaterialIcons name="color-lens" size={30} color="#D6BD98" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={isSettingsModalBlocked ? null : showSettingsModal}>
          <FontAwesome name="gear" size={30} color="#D6BD98" />
        </TouchableOpacity>
      </View>
      <View style={styles.clock}>
        <Text style={[styles.textClock, isHeartbeatActive && styles.textClockHeart]}>
          {isHeartbeatActive ? <Ionicons name="heart" size={50} color="#D6BD98" /> : (isActive ? "Stay Focused" : "Start Focus")}
        </Text>
        <Text style={styles.timeText}>{formatTime(seconds)}</Text>
          <TouchableOpacity>
            <Text style={styles.status}>{isHeartbeatActive ? stretchingStatus : 'Status'}</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.play} onPress={() => setIsActive(!isActive)}>
          <FontAwesome name={isActive ? 'pause' : "play"} size={20} color="#677D6A" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.treino} onPress={handleHeartbeatPress}>
          {isHeartbeatActive ? (
              <FontAwesome6 name="clock" size={20} color="#677D6A" />
            ) : (
              <FontAwesome name="heartbeat" size={20} color="#677D6A" />
            )}
        </TouchableOpacity>
      </View>

      {/* Modal de Cores */}
      <Modal
        transparent={true}
        visible={colorModalVisible}
        animationType='slide'
        onRequestClose={hideColorModal}
      >
        <Animated.View style={[styles.modalContainer, { transform: [{ translateY: colorSlideAnim }] }]}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={hideColorModal}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
            <View style={styles.colors}>
              <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#1A3636' }]} onPress={() => setBackgroundColor('#1A3636')} />
              <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#FF6347' }]} onPress={() => setBackgroundColor('#FF6347')} />
              <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#4682B4' }]} onPress={() => setBackgroundColor('#4682B4')} />
              <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#32CD32' }]} onPress={() => setBackgroundColor('#32CD32')} />
            </View>
          </View>
        </Animated.View>
      </Modal>

      {/* Modal de Sons */}
      <Modal
        transparent={true}
        visible={soundModalVisible}
        animationType='slide'
        onRequestClose={hideSoundModal}
      >
        <Animated.View style={[styles.modalContainer, { transform: [{ translateY: soundSlideAnim }] }]}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={hideSoundModal}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
            <View style={styles.sounds}>
              <TouchableOpacity style={styles.soundOption} onPress={() => playSound(audioFiles.vento)}>
                <Ionicons name="rainy" size={24} color="#D6BD98" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.soundOption} onPress={() => playSound(audioFiles.fogueira)}>
                <Ionicons name="bonfire" size={24} color="#D6BD98" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.soundOption} onPress={() => playSound(audioFiles.chuva)}>
                <FontAwesome6 name="bolt-lightning" size={20} color="#D6BD98" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.soundOption} onPress={stopSound}>
                <MaterialIcons name="block" size={24} color="#D6BD98" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Modal>

      {/* Modal de Configurações */}
      <Modal
        transparent={true}
        visible={settingsModalVisible}
        animationType='slide'
        onRequestClose={hideSettingsModal}
      >
        <Animated.View style={[styles.modalContainer, { transform: [{ translateY: settingsSlideAnim }] }]}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={hideSettingsModal}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.time}>Pomodoro Time - {pomodoroTime} minutes</Text>
              <Slider
                value={pomodoroTime}
                minimumValue={1}
                maximumValue={60}
                step={1}
                onValueChange={(value) => setPomodoroTime(value)}
                style={styles.slider}
              />
            </View>
            <View>
              <Text style={styles.break}>Break Time - {breakTime} minutes</Text>
              <Slider
                value={breakTime}
                minimumValue={1}
                maximumValue={30}
                step={1}
                onValueChange={(value) => setBreakTime(value)}
                style={styles.slider}
              />
              <Text style={styles.end}></Text>
            </View>
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
}