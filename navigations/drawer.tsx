import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { Image, Linking, View } from "react-native";
import Text from "../components/Text";
import Colors from "../constants/colors";
import Index from "../src";
import {Home,Teacher,MessageText, Award, Category2, MaskRight} from 'iconsax-react-native'
import { basicsInfo } from "../constants/config";
import News from "../src/news";
import Media from "../src/galery";
import Profile from "../src/profile";
import Ekskul from "../src/ekskul";

export default function DrawerNavigators() {
    const Drawer = createDrawerNavigator();

    const CustomDrawerContent = (props:any)=> {
        return (
            <DrawerContentScrollView {...props} style={{
                flex:1,
                backgroundColor:Colors.white,
            }}>
                <View style={{
                    padding:15,
                    borderBottomWidth:1,
                    borderBottomColor:Colors.grey1,
                    marginBottom:10,
                }} >
                    <Image
                        source={require('../assets/images/logo.png')}
                        style={{
                            width:70,
                            height:70,
                            marginBottom:15,
                        }}
                    />
                    <Text size={20}>Selamat datang di {'\n'}<Text size={20} weight="SemiBold" >{basicsInfo.name}</Text></Text>
                </View>
                <DrawerItemList
                    {...props}
                />
                <DrawerItem
                    label={()=><Text>E - Learning</Text>}
                    icon={()=>{
                        return(
                            <View style={{
                                marginLeft:0,
                                marginRight:-20,
                            }} >
                                <Home size={24} color={Colors.primary} variant="Bold" />
                            </View>
                        )
                    }}
                    style={{
                        marginTop:0,
                    }}
                    onPress={() => {
                        Linking.openURL('https://elearning.smpn53jakarta.sch.id/')
                    }}
                />
            </DrawerContentScrollView>
        );
    }

    return(
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={CustomDrawerContent}
            screenOptions={{
                drawerActiveBackgroundColor:Colors.primary+11,
                drawerItemStyle:{
                    padding:0,
                    marginBottom:0,
                    marginTop:0,
                    paddingVertical:0,
                    paddingTop:0,
                },
                headerTitle:()=>(
                    <View style={{
                        flexDirection:"row",
                        alignItems:"center",
                    }} >
                        <Image
                            source={require('../assets/images/logo.png')}
                            style={{
                                width:40,
                                height:40,
                                marginLeft:-15,
                                marginRight:15,
                            }}
                        />
                        <Text size={12} >Selamat Datang di{'\n'}<Text weight="SemiBold" >{basicsInfo.name}</Text></Text>
                    </View>
                )
            }}
        >
            <Drawer.Screen
                name="Home" component={Index} 
                options={{
                    drawerIcon:({focused})=>(
                        <View style={{
                          marginLeft:0,
                          marginRight:-20,
                        }} >
                            <Home size={24} color={Colors.primary} variant="Bold" />
                        </View>
                    ),
                        drawerLabel:({focused})=>(
                        <Text weight={focused ? 'SemiBold' : 'Regular'}  >Halaman Depan</Text>
                    ),
                }}
            />
            <Drawer.Screen
                name="Profile" component={Profile} 
                options={{
                    drawerIcon:({focused})=>(
                        <View style={{
                            marginLeft:0,
                            marginRight:-20,
                        }} >
                            <Teacher size={24} color={Colors.primary} variant="Bold" />
                        </View>
                    ),
                        drawerLabel:({focused})=>(
                        <Text weight={focused ? 'SemiBold' : 'Regular'}>Profile Sekolah</Text>
                    ),
          
                }}
            />
            <Drawer.Screen
                name="News" component={News} 
                options={{
                    drawerIcon:({focused})=>(
                        <View style={{
                          marginLeft:0,
                          marginRight:-20,
                        }} >
                            <MessageText size={24} color={Colors.primary} variant="Bold" />
                        </View>
                    ),
                        drawerLabel:({focused})=>(
                        <Text weight={focused ? 'SemiBold' : 'Regular'}  >Berita Sekolah</Text>
                    ),
          
                }}
            />
            <Drawer.Screen
                name="Ekskul" component={Ekskul} 
                options={{
                    drawerIcon:({focused})=>(
                        <View style={{
                          marginLeft:0,
                          marginRight:-20,
                        }} >
                            <Award size={24} color={Colors.primary} variant="Bold" />
                        </View>
                    ),
                        drawerLabel:({focused})=>(
                        <Text weight={focused ? 'SemiBold' : 'Regular'}  >EkstraKurikuler</Text>
                    ),
          
                }}
            />
            <Drawer.Screen
                name="Galery" component={Media} 
                options={{
                    drawerIcon:({focused})=>(
                        <View style={{
                          marginLeft:0,
                          marginRight:-20,
                        }} >
                            <Category2 size={24} color={Colors.primary} variant="Bold" />
                        </View>
                    ),
                        drawerLabel:({focused})=>(
                        <Text weight={focused ? 'SemiBold' : 'Regular'}  >Galeri</Text>
                    ),
          
                }}
            />
        </Drawer.Navigator>
    )
}