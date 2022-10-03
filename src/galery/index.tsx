import axios from "axios";
import { ExportSquare } from "iconsax-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, ImageBackground, Linking, RefreshControl, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Text from "../../components/Text";
import Colors from "../../constants/colors";
import layouts from "../../constants/layouts";

export default function Media() {

    const [media,setMedia] = useState<any>([])
    const [page,setPage] = useState<any>(1)
    const [isLast,setIsLast] = useState<any>(false)

    const getMedia = ()=>{
        axios.get('/media',{
            params:{
                per_page:10,
                page:1
            }
        }).then(response=>{
            setMedia(response.data)
        })
        .catch(e=>{
            if (e.response.data.code == 'rest_post_invalid_page_number') {
                setIsLast(true)
            }
        })
    }

    const getMoreMedia = ()=>{

        axios.get('/media',{
            params:{
                per_page:10,
                page:page + 1,
            }
        }).then(response=>{
            setPage(page + 1)
            setMedia([...media,...response.data])
        })
        .catch(e=>{
            if (e.response.data.code == 'rest_post_invalid_page_number') {
                setIsLast(true)
            }
        })
    }

    useEffect(()=>{
        getMedia();
    },[])

    return(
        <View style={{
            flex:1,
            backgroundColor:Colors.white,
        }} >
            <FlatList
                data={media}
                numColumns={2}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={()=>{
                            setMedia([]);
                            setPage(1);
                            setIsLast(false);

                            getMedia();
                        }}
                    />
                }
                contentContainerStyle={{
                    padding:15,
                }}
                onEndReached={()=>getMoreMedia()}
                renderItem={({item,index})=>{

                    const v = item

                    return(
                        <TouchableOpacity onPress={()=>{
                            Linking.openURL(v.guid.rendered)
                        }}>
                            <ImageBackground
                                source={{uri:v.guid.rendered}}
                                style={{
                                    width:layouts.window.width / 2 - 22,
                                    height:170,
                                    marginBottom:15,
                                    marginRight:15,
                                    // marginRight:index != media.length - 1 ? 15 : 0,
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
                }}
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