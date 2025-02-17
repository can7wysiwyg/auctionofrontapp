import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { StatusBar, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import AppNavigator from './components/AppNavigator';
import store from './redux/store';
import AuthProvider from './redux/slices/AuthProvider';

// Enable screens
enableScreens();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
        <StatusBar style="auto" />
      </SafeAreaView>
    </Provider>
  );
}