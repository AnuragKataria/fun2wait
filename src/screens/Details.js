import { Image, Text, StyleSheet, TouchableOpacity, View, Platform, Pressable, ScrollView } from "react-native/";
import { Colors } from "../common/Colors";
import { ImagesIcons } from "../common/ImagesIcons";


const Details = (props) => {
    const title = props?.route?.params?.title;
    const desc = props?.route?.params?.desc;
    console.log(title, desc)
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Image resizeMode={'contain'} style={styles.img} source={ImagesIcons._logo} />
                <Text style={[styles.text_register, { marginLeft: 5, fontSize: 20, marginBottom: 5, fontWeight: 'bold' }]}>{'Details'}</Text>

            </View>



            <View style={{ marginTop: 20, paddingBottom: 30 }}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>{title}</Text>

                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <Text style={styles.text}>{desc}</Text>

                </ScrollView>
            </View>
        </View >

    );
}
export default Details;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: Colors.white
    },
    text: {
        color: Colors.black,
        fontSize: 20,
        verticalAlign: 'middle',


    },

    img: {
        tintColor: Colors.status_bar,
        height: 40,
        alignSelf: 'center',
        width: 50,
    },
    text_register: {
        fontFamily: 'DMSans-Bold',
        fontSize: 15,

        textAlign: 'center',
        color: Colors.black,
    },
});