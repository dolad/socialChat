import React from 'react';
import {Text, TextInput, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const CustomInput = props => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <>
      <TextInput
        style={[
          styles.textInput,
          props.multiline && {height: props.numberOfLines * 40},
          hasError && styles.errorInput,
        ]}
        value={value}
        onChangeText={text => onChange(name)(text)}
        placeholderTextColor={'grey'}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    width: '100%',
    margin: 5,
    padding: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    borderColor: Colors.black.background,
    textAlignVertical: 'top',
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  errorInput: {
    borderColor: 'red',
  },
});

export default CustomInput;
