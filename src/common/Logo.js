import { Colors } from "./Colors";

const { StyleSheet, View, Text } = require("react-native");

export const Logo =(props)=>{
    return <View style={[{justifyContent:'center', alignSelf:'flex-start'}, props.style]}>
    {/* <Text style={styles.text}>FUN2WAIT</Text> */}
    
    </View>
}
const styles = StyleSheet.create({
text:{
    color:Colors.black,
    fontSize:25,
    textAlignVertical:'center'
}
});
