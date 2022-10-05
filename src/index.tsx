import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import GaleryWidget from "../components/Galery/widget";
import NewsWidget from "../components/News/widget";
import Slider from "../components/Slider";
import Text from "../components/Text";
import Colors from "../constants/colors";
import SliderData from "../data/slider";
import BottomSheet from 'react-native-raw-bottom-sheet';
import { basicsInfo } from "../constants/config";
import Button from "../components/Button";

export default function Index() {

    const [news,setNews] = useState<any>([]);
    const [sliders,setSliders] = useState<any>([]);
    const [media,setMedia] = useState<any>([]);

    useEffect(()=>{
        getNews();
        getSlider();
        getMedia();

        greatingRefs?.current?.open()
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

    let greatingRefs = useRef<any>()

    const greatings = ()=>{
        return(
            <BottomSheet 
                ref={greatingRefs}
                height={650}
                customStyles={{
                    container:{
                        borderRadius:20,
                    }
                }}
            >
                <ScrollView>
                    <View style={{
                        padding:15,
                    }} >
                        <Text size={20} >Sambutan Kepala Sekolah{'\n'}<Text size={20} weight="SemiBold" >{basicsInfo.name}</Text></Text>
                        <Image
                            source={{uri:basicsInfo.kepsek}}
                            style={{
                                width:"100%",
                                height:300,
                                marginVertical:20,
                                borderRadius:20,
                            }}
                        />
                        <Text>Puji syukur kepada Allah SWT, Tuhan Yang Maha Esa yang telah memberikan rahmat dan anugerah-Nya sehingga website SMPN 53 Jakarta ini dapat terbit. Kami sadar sepenuhnya dalam rangka memajukan pendidikan di era berkembangnya Teknologi Informasi yang begitu pesat, sangat diperlukan berbagai sarana prasarana yang kondusif, kebutuhan berbagai informasi siswa, guru, orangtua maupun masyarakat, sehingga kami berusaha mewujudkan hal tersebut semaksimal mungkin. Semoga dengan adanya website ini dapat membantu dan bermanfaat, terutama informasi yang berhubungan dengan pendidikan, ilmu pengetahuan dan informasi seputar SMPN 53 Jakarta.
                        {'\n'}{'\n'}Besar harapan kami, sarana ini dapat memberi manfaat bagi semua pihak yang ada dilingkup pendidikan dan pemerhati pendidikan secara khusus bagi SMPN 53 Jakarta.
                        {'\n'}{'\n'}Akhirnya kami mengharapkan masukan dari berbagai pihak untuk website ini agar kami terus belajar dan meng-update diri. Terima kasih atas kerjasamanya, maju terus untuk mencapai SMPN 53 Jakarta yang lebih baik lagi.
                        {'\n'}{'\n'}Wassalamualaikum wr.wb.
                        </Text>
                        <Button
                            label="Tutup"
                            onPress={()=>{
                                greatingRefs.current.close()
                            }}
                            style={{
                                marginTop:20,
                            }}
                        />
                    </View>
                </ScrollView>
            </BottomSheet>
        )
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
            {greatings()}
        </ScrollView>
    )
}