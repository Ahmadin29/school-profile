import { useEffect, useState } from "react";
import { Image, ImageBackground, Linking, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/colors";
import Text from "../Text";
import moment from 'moment'
import { ExportSquare, Message2, MessageText } from "iconsax-react-native";
import layouts from "../../constants/layouts";
import { useNavigation } from "@react-navigation/native";
import Slider from "../Slider";
import { ScrollView } from "react-native-gesture-handler";

interface NewsWidgetProps {
    data:any
}

export default function GaleryWidget(props:NewsWidgetProps) {

    const navigation = useNavigation();

    const [galery,setGalery] = useState<any>([]);

    useEffect(()=>{
        setGalery(props.data)
    },[props.data])
    
    return(
        <View style={{
            padding:15,
        }} >
            <View style={{
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"space-between",
                marginBottom:15,
            }} >
                <View>
                    <Text weight="SemiBold" >Galeri Sekolah</Text>
                </View>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('Galery' as never)
                }} >
                    <Text>Lihat Lainnya</Text>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                    galery.map((v:any,i:any)=>{
                        return(
                            <TouchableOpacity key={i} onPress={()=>{
                                Linking.openURL(v.guid.rendered)
                            }}>
                                <ImageBackground
                                    source={{uri:v.guid.rendered}}
                                    style={{
                                        width:200,
                                        height:170,
                                        marginBottom:10,
                                        marginRight:i != galery.length - 1 ? 15 : 0,
                                    }}
                                    imageStyle={{
                                        borderRadius:20,
                                    }}
                                >
                                    <View style={{
                                        width:30,
                                        height:30,
                                        alignItems:"center",
                                        justifyContent:"center",
                                        backgroundColor:Colors.text+99,
                                        bottom:10,
                                        position:"absolute",
                                        borderRadius:20,
                                        right:10,
                                    }} >
                                        <ExportSquare size={20} variant="Bold" color="white" />
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}