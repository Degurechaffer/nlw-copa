import { VStack, Icon } from "native-base";
import { Button } from "../../components/button";
import { Header } from "../../components/Header";
import {Octicons} from '@expo/vector-icons'

export function Pools() {
  return (
    <VStack flex={1} backgroundColor="gray.900">
        <Header title="Meus Bolões"></Header>
        <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
            <Button leftIcon={<Icon as={Octicons} name="search" color="black" size="md" ></Icon>} title="BUSCAR BOLÃO POR CÓDIGO"></Button>
        </VStack>
    </VStack>
  );
}