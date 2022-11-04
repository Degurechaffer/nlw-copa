import { Box, useToast, FlatList } from 'native-base';
import { useEffect, useState } from 'react';
import { api } from  '../src/services/api'
import { Game, GameProps } from '../components/Game'
import {EmptyMyPoolList} from '../components/EmptyMyPoolList'
import { Loading } from './loading';
interface Props {
  poolId: string;
  code: string;
}

export function Guesses({ poolId, code }: Props) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [firstTeamPoints, setFirstTeamPoints] = useState('');
  const [SecondTeamPoints, setSecondTeamPoints] = useState('');
  const [games, setGames] = useState<GameProps[]>([]);
  async function fetchGames() {
    try {
      setIsLoading(true);

      const response = await api.get(`/pools/${poolId}/games`);
      setGames(response.data.games);
    } catch (error) {

      toast.show({
        title: 'Não foi possível listar os jogos',
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() =>{
    fetchGames();
  },[poolId])

    if(isLoading){
      return <Loading/>
    }

    async function handleGuessConfirm(gameId: string) {
      try {
        if (!firstTeamPoints.trim() || !SecondTeamPoints.trim()) {
          return toast.show({
            title: 'Informe o placar para palpitar',
            placement: 'top',
            bgColor: 'red.500'
          });
        }
  
        await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
          firstTeamPoints: Number(firstTeamPoints),
          secondTeamPoints: Number(SecondTeamPoints),
        });
  
        toast.show({
          title: 'Palpite realizado com sucesso!',
          placement: 'top',
          bgColor: 'green.500'
        });
  
        fetchGames();
  
      } catch (error) {
        console.log(error);
  
        toast.show({
          title: 'Não foi possível enviar o palpite',
          placement: 'top',
          bgColor: 'red.500'
        });
      }
    }

  return (
    <FlatList
      data={[]}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Game data={item} setFirstTeamPoints={setFirstTeamPoints} setSecondTeamPoints={setSecondTeamPoints} onGuessConfirm={() => handleGuessConfirm(item.id)}/>
      )}
      _contentContainerStyle={{pb:20}}
      ListEmptyComponent={() => <EmptyMyPoolList code={code}/>}
    />
  );
}
