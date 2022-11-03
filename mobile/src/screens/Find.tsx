import { Heading, VStack } from "native-base";
import { Button } from "../../components/button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
export function Find() {
  return (
    <VStack flex={1} backgroundColor="gray.900">
        <Header showBackButton title="Buscar por código"/>
        <VStack mt={8} mx={5} alignItems="center">
            <Heading fontFamily="heading" color="white" fontSize="lg" mb={8} textAlign="center" >Encontre um bolão através de{'\n'}seu código unico!</Heading>
            <Input mb={2} placeholder="Qual o código do Bolão?"></Input>
            <Button title="BUSCAR BOLÃO"></Button>
        </VStack>
    </VStack>
  );
}