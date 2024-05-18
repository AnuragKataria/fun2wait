import { Colors } from "./Colors";
import { ImagesIcons } from "./ImagesIcons";

const { StyleSheet, View, Text, Image, Pressable } = require("react-native");

export const Logo = (props) => {
    return <View style={[{
        marginTop:5,
        flexDirection: 'row',
        alignItems: 'center'
    }]}>
        {props?.isBack ?<Pressable onPress={props?.press}><Image style={{ marginLeft:10, width: 30, height: 30 }}
         resizeMode={'contain'} source={ImagesIcons.back} /></Pressable>  : <></>}

        <View style={{ flex: 1 }}>
            <View style={[{
                borderColor: Colors.status_bar,
                borderWidth: 1,
                marginRight:props?.isBack? 40:0,
                justifyContent: 'center',
                flexDirection: 'row',
            }, props.style]}>

                <Text style={styles.text1}>Alarm</Text>
                <Text style={styles.text2}>Admin</Text>

            </View>
        </View>
    </View>
}
const styles = StyleSheet.create({
    text1: {
        backgroundColor: Colors.status_bar,
        color: Colors.white,
        padding: 5,
        fontFamily: 'DMSans-Bold',
        fontSize: 20,
        textAlignVertical: 'center'
    },
    text2: {
        backgroundColor: Colors.white,
        color: Colors.status_bar,
        padding: 5,

        fontFamily: 'DMSans-Bold',

        fontSize: 20,
        textAlignVertical: 'center'
    }
});
