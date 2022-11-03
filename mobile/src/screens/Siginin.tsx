import {Center, Text, Icon } from "native-base";
import { Button } from "../../components/button";
import  Logo  from '../assets/logo.svg';
import {Fontisto} from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';

export function SignIn(){
    const {signIn, user} = useAuth();
    return(        
    <Center p={7} flex={1} backgroundColor="gray.900">
        <Logo width={212} height={40}/>
        <Button onPress={signIn} mt={12} type="SECONDARY" title="ENTRAR COM O GOOGLE" leftIcon={<Icon as={Fontisto} name='google'color="white" size='md'/>} />
        <Text textAlign="center" color="white" mt={4}>Não utilizamos nenhuma informação alem{'\n'} do seu e-mai para criação da sua conta.</Text>
    </Center>)
}