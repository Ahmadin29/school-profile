import { useNavigation } from "@react-navigation/native";
import { Award, MessageText } from "iconsax-react-native";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import Text from "../../components/Text";
import Colors from "../../constants/colors";
import layouts from "../../constants/layouts";
import ekskulData from '../../data/ekskul';

export default function Ekskul() {

    const navigation = useNavigation()

    return(
        <FlatList
            style={{
                flex:1,
                backgroundColor:Colors.white,
            }}
            data={ekskulData}
            contentContainerStyle={{
                paddingHorizontal:15,
            }}
            renderItem={({index,item})=>{
                return(
                    <TouchableOpacity style={{
                        flexDirection:"row",
                        marginTop:10,
                        alignItems:"center",
                        borderBottomWidth:1,
                        borderBottomColor:Colors.grey1,
                        paddingBottom:10,
                    }}
                    onPress={()=>{
                        navigation.navigate('NewsDetail' as never,{
                            link:item.link,
                            title:item.title,
                        }as never)
                    }}
                    >
                        <View style={{
                            width:55,
                            height:55,
                            alignItems:"center",
                            justifyContent:"center",
                            backgroundColor:Colors.primary,
                            borderRadius:10,
                            marginRight:15,
                        }} >
                            <Award size={24} color={Colors.white} variant="Bold" />
                        </View>
                        <View style={{
                            width:layouts.window.width - 100
                        }} >
                            <Text weight="SemiBold" >{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )
            }}
        />
    )
}