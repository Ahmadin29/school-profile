import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { MessageText } from "iconsax-react-native";
import moment from "moment";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import Text from "../../components/Text";
import Colors from "../../constants/colors";
import layouts from "../../constants/layouts";

export default function News() {

    const navigation = useNavigation();

    const [news,setNews] = useState<any>([]);
    const [page,setPage] = useState<any>(1);
    const [isLast,setIsLast] = useState<any>(false);

    useEffect(()=>{
        getNews()
    },[])

    const getNews = async()=>{
        axios.get('/posts',{
            params:{
                per_page:15,
                page:1
            }
        }).then(response=>{
            setNews(response.data)
        })
        .catch(e=>{
            console.log(e.response);
        })
    }

    const getMoreNews = async()=>{
        axios.get('/posts',{
            params:{
                per_page:15,
                page:page + 1,
            }
        }).then(response=>{
            setPage(page + 1)
            setNews([...news,...response.data])
        })
        .catch(e=>{
            if (e.response.data.code == 'rest_post_invalid_page_number') {
                setIsLast(true)
            }
        })
    }

    const renderNews = ({item}:any)=>{

        const v = item;

        return(
            <TouchableOpacity style={{
                marginTop:10,
                flexDirection:"row",
                borderBottomWidth:1,
                paddingBottom:10,
                borderBottomColor:Colors.grey1,
            }}
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
                    backgroundColor:Colors.primary,
                    borderRadius:10,
                    marginRight:15,
                }} >
                    <MessageText size={24} color={Colors.white} variant="Bold" />
                </View>
                <View style={{
                    width:layouts.window.width - 100
                }} >
                    <Text weight="SemiBold" color="primary" >{v.title.rendered}</Text> 
                    <Text size={10} >Di posting pada {moment(v.date).format('DD MMM YYYY')} oleh <Text size={10} weight="SemiBold" >ADMIN</Text></Text> 
                    <TouchableOpacity style={{
                        marginTop:10,
                    }} >
                        <Text weight="SemiBold" >Selengkapnya</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    return(
        <View style={{
            flex:1,
            backgroundColor:Colors.white,
        }} >
            <FlatList
                data={news}
                renderItem={renderNews}
                style={{
                    paddingHorizontal:15,
                }}
                contentContainerStyle={{
                    paddingBottom:30,   
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={()=>{
                            setNews([]);
                            setPage(1);
                            setIsLast(false);

                            getNews();
                        }}
                    />
                }
                onEndReached={()=>getMoreNews()}
                ListFooterComponent={()=>{
                    if (!isLast) {
                        return(
                            <View style={{
                                padding:15,
                            }} >
                                <ActivityIndicator size={30} />
                            </View>
                        )
                    }else{
                        return null
                    }
                }}
            />
        </View>
    )
}