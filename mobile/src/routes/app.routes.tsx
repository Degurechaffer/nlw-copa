import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { New } from '../screens/New';
import { Pools } from '../screens/Pools';
import { PlusCircle, SoccerBall} from 'phosphor-react-native'
import {useTheme} from 'native-base'
import {Platform} from 'react-native'
import { Find } from '../screens/Find';
import { Details } from '../screens/details';


const { Navigator, Screen }= createBottomTabNavigator();
export function AppRoutes(){
    const { colors, sizes } = useTheme();

    const size = sizes[6];

    return (
        <Navigator screenOptions={{tabBarStyle:{position: 'absolute', height: 87, borderTopWidth: 0, backgroundColor: colors.gray[800]},
        headerShown: false, tabBarActiveTintColor: colors.yellow[500], tabBarInactiveTintColor: colors.gray[500],
        tabBarItemStyle:{position:'relative', top: Platform.OS === 'android' ? -10 : 0}, tabBarLabelPosition:'beside-icon'}}>
            <Screen name="new" component={New} options={{tabBarIcon: ( {color}) => <PlusCircle color={color}  size={size}/>,
        tabBarLabel: 'Novo bolão'}}/>
            <Screen name="pools" component={Pools} options={{tabBarIcon: ({color}) => <SoccerBall color={color} size={size} />, tabBarLabel: 'Meus bolões'}}/>
            <Screen name="find" component={Find} options={{ tabBarButton: () => null}}/>
            <Screen name="details" component={Details} options={{ tabBarButton: () => null}}/>
        </Navigator>
    )
}
