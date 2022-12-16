import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'myfood24-digibete' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const Myfood24Digibete = NativeModules.Myfood24Digibete
  ? NativeModules.Myfood24Digibete
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return Myfood24Digibete.multiply(a, b);
}

export function test(){
  return Myfood24Digibete.test();
}

export function divide(a: number, b: number): Promise<number> {
  return Myfood24Digibete.divide(a,b);
}
