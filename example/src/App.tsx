import * as React from 'react';

import { StyleSheet, View, Text, NativeModules, TurboModuleRegistry, Button } from 'react-native';
import { multiply, test, divide } from 'myfood24-digibete';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();
  React.useEffect(() => {
    divide(5,2).then(setResult);
  }, []);
  // test();
  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <Button title="Click Me" onPress={()=>{test()}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
