import axios from "axios";
import { useEffect, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import GaleryWidget from "../components/Galery/widget";
import NewsWidget from "../components/News/widget";
import Slider from "../components/Slider";
import Text from "../components/Text";
import Colors from "../constants/colors";
import SliderData from "../data/slider";

export default function Index() {

    const [news,setNews] = useState<any>([]);
    const [sliders,setSliders] = useState<any>([]);
    const [media,setMedia] = useState<any>([]);

    useEffect(()=>{
        getNews();
        getSlider();
        getMedia();
    },[])

    const getNews = async()=>{
        axios.get('/posts',{
            params:{
                per_page:5,
            }
        }).then(response=>{
            setNews(response.data)
        })
        .catch(e=>{
            console.log(e.response);
        })
    }

    const getSlider = ()=>{
        axios.get('/media?search=slider').then(response=>{
            setSliders(response.data)
        })
        .catch(e=>{
            console.log(e.response);
        })
    }

    const getMedia = ()=>{
        axios.get('/media',{
            params:{
                per_page:10,
                page:1,
            }
        }).then(response=>{
            setMedia(response.data)
        })
        .catch(e=>{
            console.log(e.response);
        })
    }

    return(
        <ScrollView style={{
            flex:1,
            backgroundColor:Colors.white,
        }} >
            <Slider
                data={sliders}
                sliderWidth={"100%"}
                sliderHeight={200}
                renderItem={(data:any)=>{
                    return(
                        <View style={{
                            padding:15,
                        }} >
                            <Image
                                source={{uri:data.guid.rendered}}
                                style={{
                                    width:"100%",
                                    height:170,
                                    borderRadius:20,
                                    marginBottom:10,
                                }}
                            />
                        </View>
                    )
                }}
            />
            <NewsWidget
                data={news}
            />
            <GaleryWidget
                data={media}
            />
        </ScrollView>
    )
}