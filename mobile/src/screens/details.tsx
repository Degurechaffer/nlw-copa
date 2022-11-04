import { HStack, useToast, VStack } from "native-base";
import { Header } from "../../components/Header";
import { api } from "../services/api";
import {useFocusEffect, useRoute} from '@react-navigation/native'
import { useEffect, useState } from "react";
import { Loading } from "../../components/loading";
import {PoolCardPros} from '../../components/PoolCard';
import { PoolHeader } from "../../components/PoolHeader";
import { EmptyMyPoolList } from "../../components/EmptyMyPoolList";
import { Option } from "../../components/Option";
import {Share} from 'react-native'
import { Guesses } from "../../components/Guesses";

interface RouteParams{
    id: string;
}

export function Details(){
    const [poolDetails, setPoolDetails] = useState<PoolCardPros>({} as PoolCardPros);
    const route = useRoute();
    const toast = useToast();
    const [optionSelected, setOptionSelected] = useState<'palpites' | 'ranking'>('palpites');
    const { id } = route.params as RouteParams;
    const [isLoading, setIsLoading] = useState(false);
    async function fetchPoolDetails() {
        try {
            setIsLoading(true);
            const response = await api.get(`/pools/${id}`)
            setPoolDetails(response.data.pool);
        } catch (error) {
            console.log(error);
            toast.show({
              title: 'Não foi possível carregar os detalhes do bolão',
              placement: 'top',
              bgColor: 'red.500'
            })
        }finally{
            setIsLoading(false);
        }
    }

    async function HandleCodeShare() {
        await Share.share({
            message: poolDetails.code
        });
    }

    useEffect(() =>{
        fetchPoolDetails();
    },[id])
    if(isLoading){
        return (<Loading/>);
    }

    return (
        <VStack flex={1} bg="gray.900">
            <Header title={poolDetails.title} showBackButton showShareButton onShare={HandleCodeShare}/>
            
            {
                poolDetails._count?.participants > 0 ?
                <VStack px={5} flex={1}>
                    <PoolHeader data={poolDetails}/> 

                    <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                        <Option onPress={() =>setOptionSelected('palpites')} title="Seus Palpites" isSelected={optionSelected === 'palpites'}></Option>
                        <Option onPress={() =>setOptionSelected('ranking')} title="Ranking do Grupo" isSelected={optionSelected === 'ranking'}></Option>
                    </HStack>
                    <Guesses poolId={poolDetails.id} code={poolDetails.code}/>
                </VStack>

                :<EmptyMyPoolList code={poolDetails.code}/>
            }

        </VStack>
    )
};