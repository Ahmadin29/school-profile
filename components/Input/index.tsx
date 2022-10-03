import * as React from 'react';
import { KeyboardTypeOptions, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import Text from "../Text";
import Colors from "../../constants/colors";
import { IconButton } from 'react-native-paper';
import Ionicon from '@expo/vector-icons/Ionicons';

interface InputProps {
    containerStyle? : ViewStyle,
    inputStyle?     : ViewStyle,
    labelStyle?      : TextStyle | {},
    messageStyle?    : TextStyle,
    
    label?          : string,
    message?        : string,
    value?          : string | number | any,
    icon?           : any,
    placeholder?     : string,
    color?          : 'primary' | 'text' | 'textSecondary' | 'success' | 'danger' | 'warning' | 'white',

    onChangeText?    : (e:any)=>void,
    disabled?        : boolean,
    keyboardType?    : KeyboardTypeOptions,

    inputType?      : 'password' | undefined,
    multiline?      : boolean,
}

export default function Input(props:InputProps) {

    const [eye,setEye] = React.useState(false);
    const [focus,setFocus] = React.useState(false);

    return(
        <View style={[
            {
                marginBottom:10,
            },
            props.containerStyle,
        ]} >
            {
                props.label && <Text style={[props.labelStyle,{}]} weight="Medium" color={focus ? "primary" : props.color ? props.color : "text"} size={10} >{props.label}</Text>
            }
            <View style={{
                flexDirection:"row",
                alignItems:"center",
                borderBottomWidth:1,
                borderBottomColor:focus ? Colors.primary : props.color ? Colors[props.color] : Colors.grey1,
            }} >
                <TextInput
                    onChangeText={props.onChangeText}
                    value={props.value}
                    placeholder={props.placeholder}
                    style={[
                        props.inputStyle,
                        {
                            paddingBottom:5,
                            paddingTop:0,
                            paddingHorizontal:0,
                            fontFamily:'Roboto-Regular',
                            color:props.disabled ? Colors.textSecondary : Colors.text,
                            flex:1,
                        }
                    ]}
                    onFocus={()=>{
                        setFocus(true)
                    }}
                    multiline={props.multiline}
                    onBlur={()=>{
                        setFocus(false)
                    }}
                    secureTextEntry={props.inputType == 'password' && !eye ? true : false}
                    keyboardType={props.keyboardType}
                    editable={!props.disabled}
                />
                {
                    props.inputType == 'password' &&
                    <IconButton
                        icon={()=><Ionicon name={eye ? 'md-eye-off-outline' : 'md-eye-outline'} size={24} />}
                        onPress={()=>{
                            setEye(!eye)
                        }}
                        style={{
                            margin:0,
                        }}
                    />
                }
            </View>
            {
                props.message &&
                <View style={{
                    marginTop:5,
                }} >
                    <Text size={10} style={[props.messageStyle,{}]} color={props.color ? props.color : "textSecondary"} >{props.message}</Text>
                </View>
            }
        </View>
    )
}