import { Image, StyleSheet, View } from "react-native"
import { Colors } from "../../common/Colors"
import SelectDropdown from "react-native-select-dropdown";
import { Fonts } from "../../common/Fonts";
import { ImagesIcons } from "../../common/ImagesIcons";
import { height } from "../../common/Constants";

export const Dropdown = (props) => {







    return props.search ?
        <View style={styles.drop_down_main} >
            <SelectDropdown
                ref={props?.dropdownRef}
                defaultValueByIndex={props.index}
                defaultValue={props?.defaultValue ?? ''}
                data={props.data}
                onSelect={(selectedItem, index) => {
                    props.onDone(selectedItem)
                }}

                search
                searchPlaceHolder={props.placeholder}
                defaultButtonText={props.placeholder}
                searchInputTxtStyle={{ fontFamily: Fonts.regular }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                    return item;
                }}
                dropdownIconPosition={'right'}
                renderDropdownIcon={isOpened => {
                    return <Image style={{ height: 15, width: 15 }} resizeMode={'center'} source={ImagesIcons.triangle_black} />;
                }}
                buttonStyle={[styles.dropdown1BtnStyle, props.width, props.style]}
                buttonTextStyle={[styles.dropdown1BtnTxtStyle, props.txtStyle]}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
            />

        </View > : <View style={styles.drop_down_main}>
            <SelectDropdown
                ref={props?.dropdownRef}
                defaultValueByIndex={props.index}
                defaultValue={props?.defaultValue ?? ''}
                data={props.data}
                onSelect={(selectedItem, index) => {
                    props.onDone(selectedItem)
                }}


                defaultButtonText={props.placeholder}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                    return item;
                }}
                dropdownIconPosition={'right'}
                renderDropdownIcon={isOpened => {
                    return <Image style={{ height: 15, width: 15 }} resizeMode={'center'} source={ImagesIcons.triangle_black} />;
                }}
                buttonStyle={[styles.dropdown1BtnStyle, props.width, props.style]}
                buttonTextStyle={[styles.dropdown1BtnTxtStyle, props.txtStyle]}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
            />

        </View>



}




const styles = StyleSheet.create({
    drop_down_main: {

        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 0,
    },
    dropdown1BtnStyle: {
        height: 55,
        backgroundColor: Colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.light_gray_back,
    },
    dropdown1BtnStyleAccount: {
        height: 40,


        backgroundColor: Colors.transparent,

    },
    dropdown1BtnTxtStyle: {
        color: Colors.black,
        textAlign: 'left',
        left: 8,

        fontFamily: Fonts.regular,
        fontSize: 15
    },
    dropdown1BtnTxtStyleAccount: {
        color: Colors.white,
        textAlign: 'left',
        left: 10,


        fontFamily: Fonts.regular,
        fontSize: 12
    },
    dropdown1DropdownStyle: {
        backgroundColor: '#EFEFEF',

    },
    dropdown1RowStyle: {
        backgroundColor: Colors.white
    },
    dropdown1RowTxtStyle: {
        color: Colors.dark_gray,
        textAlign: 'left',
        fontFamily: Fonts.regular,
        fontSize:15
    },

})
