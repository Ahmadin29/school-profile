import { useEffect, useRef } from "react"
import { View, ViewStyle } from "react-native"
import PagerView from "react-native-pager-view"
import Text from "../Text"

interface SliderProps {
    containerStyle?:ViewStyle,
    renderItem:any,
    data:any,
    sliderWidth:any,
    sliderHeight:any,
}

export default function Slider(props:SliderProps) {

    let sliderRef = useRef<any>();

    useEffect(()=>{
        animatingSlider()
    },[])

    const animatingSlider = ()=>{

    }

    return(
        <PagerView
            style={{
                width:props.sliderWidth,
                height:props.sliderHeight,
            }}
            ref={sliderRef}
        >
            {
                props.data.map((v:any,i:any)=>{
                    return <View key={i} >{props.renderItem(v)}</View>
                })
            }
        </PagerView>
    )
}