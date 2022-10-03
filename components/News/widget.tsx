import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Colors from "../../constants/colors";
import Text from "../Text";
import moment from 'moment'
import { Message2, MessageText } from "iconsax-react-native";
import layouts from "../../constants/layouts";
import { useNavigation } from "@react-navigation/native";

interface NewsWidgetProps {
    data:any
}

export default function NewsWidget(props:NewsWidgetProps) {

    const navigation = useNavigation();

    const [news,setNews] = useState<any>([]);

    useEffect(()=>{
        setNews(props.data)
    },[props.data])

    const renderNews = ()=>{
        return(
            news.map((v:any,i:number)=>{
                return(
                    <TouchableOpacity style={{
                        flexDirection:"row",
                        marginTop:10,
                        alignItems:"center",
                    }} key={i}
                    onPress={()=>{
                        navigation.navigate('NewsDetail' as never,{
                            link:v.link,
                            title:v.title.rendered,
                        }as never)
                    }}
                    >
                        <View style={{
                            width:55,
                            height:55,
                            alignItems:"center",
                            justifyContent:"center",
                            backgroundColor:Colors.text,
                            borderRadius:10,
                            marginRight:15,
                        }} >
                            <MessageText size={24} color={Colors.white} variant="Bold" />
                        </View>
                        <View style={{
                            width:layouts.window.width - 100
                        }} >
                            <Text weight="SemiBold" >{v.title.rendered}</Text> 
                            <Text size={10} >Di posting pada {moment(v.date).format('DD MMM YYYY')} oleh <Text size={10} weight="SemiBold" >ADMIN</Text></Text> 
                        </View>
                    </TouchableOpacity>
                )
            })
        )
    }
    
    return(
        <View style={{
            padding:15,
            backgroundColor:Colors.primary+22,
        }} >
            <View style={{
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"space-between"
            }} >
                <View>
                    <Text weight="SemiBold" >Berita Sekolah</Text>
                    <Text size={12} >Informasi terbaru tentang sekolah</Text>
                </View>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('NewsList' as never)
                }} >
                    <Text>Lihat Lainnya</Text>
                </TouchableOpacity>
            </View>
            <View>
                {renderNews()}
            </View>
        </View>
    )
}