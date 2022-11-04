import { NativeBaseProvider, StatusBar, Center } from 'native-base'
import {useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold} from '@expo-google-fonts/roboto'
import { Loading } from './components/loading';
import { THEME } from './src/styles/theme';
import { AuthContextProvider } from './src/contexts/AuthContext';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_500Medium, Roboto_700Bold});
  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle='light-content'
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <Routes/> : <Loading/>}
      </AuthContextProvider> 
    </NativeBaseProvider>
  );
}
