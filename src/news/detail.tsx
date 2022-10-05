import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import * as Progress from 'react-native-progress';
import WebView from "react-native-webview";
import Colors from "../../constants/colors";

export default function NewsDetail(props:any) {

    const navigation = useNavigation();

    const link = props.route.params.link;

    const [progress,setProgress] = useState<any>();


    useEffect(()=>{
        navigation.setOptions({
            title:props.route.params.title
        })
    },[])

    const runFirst = `
        document.getElementById('header').style.display = 'none';
        document.getElementById('footer').style.display = 'none';
      document.getElementById('secondary').style.display = 'none';
      document.getElementById('comments').style.display = 'none';
      document.getElementById('nav-below').style.display = 'none';
      document.getElementById('entry-author')[0].style.display = 'none';
      true; // note: this is required, or you'll sometimes get silent failures
    `;

    return(
        <View style={{
            flex:1,
            backgroundColor:Colors.primary
        }} >
            <Progress.Bar
                progress={progress}
                color={Colors.primary}
                width={null}
                height={2}
                borderRadius={0}
                borderWidth={0}
                style={{
                    backgroundColor:Colors.grey1
                }}
            />
            <WebView
                source={{uri:link}}
                injectedJavaScript={runFirst}
                onLoadProgress={({ nativeEvent }) =>
                    setProgress(nativeEvent.progress)
                }
                style={{
                    flex:1,
                }}
            />
        </View>
    )
}