import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

export const CheckBox = ({
  onCheck,
  isChecked,
}: {
  onCheck: (isChecked: boolean) => void;
  isChecked: boolean;
}) => {
  const [checked, setChecked] = useState(isChecked);

  const handlePress = () => {
    const newState = !checked;
    setChecked(newState);
    onCheck(newState);
  };

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View
        style={[styles.checkbox, checked ? styles.checked : styles.unchecked]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderRadius: 12, // Añadido para bordes redondeados
  },
  unchecked: {
    borderWidth: 2,
    borderColor: '#007AFF', // Color azul de iOS para el borde
    backgroundColor: 'transparent', // Fondo transparente para el estado no marcado
  },
  checked: {
    backgroundColor: '#007AFF', // Color azul de iOS para el fondo marcado
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold', // Puede ajustar esto para hacer el símbolo de verificación más grueso
    fontSize: 16,
  },
});
