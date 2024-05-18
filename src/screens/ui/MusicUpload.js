import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, TouchableNativeFeedback, View } from 'react-native'

import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker'
import { Colors } from '../../common/Colors'
import { useEffect, useState } from 'react';
import { getLoginObject, showToast } from '../../common/LocalStorage';
import { Constants } from '../../axios/Constants';
import storage, { firebase } from '@react-native-firebase/storage';
import { Logo } from '../../common/Logo';
var RNFS = require('react-native-fs');

const MusicUpload = (props) => {
  const [name, onChangeName] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setuserData] = useState()
  const [result, setResult] = useState(DocumentPickerResponse | DirectoryPickerResponse | undefined | null)
const musicCount = props?.route?.params?.count;
  function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  useEffect(() => {

    const getData = async () => {
      const user = await getLoginObject();
      const uid = JSON.parse(user);
      setuserData(uid)


    }
    getData();

  }, [])

  const handleError = (err) => {
    if (isCancel(err)) {
      showToast('Cancelled')
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      showToast('multiple pickers were opened, only the last will be considered')
    } else {
      throw err
    }
  }

  const uploadImageToStorage = async (path, imageName) => {
    if (path.startsWith('content://')) {
      const fileNameAndExtension = imageName
      const destPath = `${RNFS.TemporaryDirectoryPath}/${fileNameAndExtension}`
      await RNFS.copyFile(path, destPath)
      let reference = storage().ref('MusicFiles');
      console.log(reference.fullPath)
      let task = reference.child(imageName?.split('.')[0]).putFile('file://' + destPath);
      task.then(async () => {
        const downloadURL = await task.snapshot.ref.getDownloadURL()
        updateMusicForUSER(downloadURL , imageName)
        setLoading(false)
      }).catch((e) => {
        setLoading(false)
        // showToast('uploading image error => ', e)
      }
      );
    }
  }

  const updateMusicForUSER = (url , nameE) => {
    const id = makeid(10);
    const data = {
      [id]: {
        'url': url,
        'name': name,
        'id': id,
        'namewithextension': nameE
      }
    }
   if(musicCount==0){
    
    firebase
      .firestore()
      .collection(Constants.music_collection)
      .doc(JSON.parse(userData)?.user?.uid)
      .set(data)
      .then((ref) => {
        setLoading(false)
        props?.navigation?.goBack()
        showToast('Image uploaded to the bucket!');
      })
      .catch((error) => {
        setLoading(false)
        showToast(error + '')
        return error
      });
   }else{
    
    firebase
      .firestore()
      .collection(Constants.music_collection)
      .doc(JSON.parse(userData)?.user?.uid)
      .update(data)
      .then((ref) => {
        setLoading(false)
        props?.navigation?.goBack()
        showToast('Image uploaded to the bucket!');
      })
      .catch((error) => {
        setLoading(false)
        showToast(error + '')
        return error
      });
   }
   
   
  }

  const uploadMusicFile = async () => {

    if (!name) {
      showToast('Please enter name')
    } else if (!result) {
      showToast('Please select music file')
    } else {
      // upload file code here
      setLoading(true)
      console.log('RESULT == ' , result);
      uploadImageToStorage(result?.[0]?.uri, (result?.[0]?.name))
    }


  }

  const onPress = () => {
    props?.navigation?.goBack()
  }

  return (
    <View style={styles.container}>
      <Logo press={onPress} isBack={true} style={{ alignSelf: 'center', marginTop: 10 }} />

      <TextInput
        returnKeyType="next"
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder="Enter Music file Name"
        placeholderTextColor={Colors.placeholder_gray}
      />

      <Pressable onPress={() => {
        DocumentPicker.pick({
          type: types.audio,
        })
          .then(setResult)
          .catch(handleError)
      }}
      >


        {result ? <Text style={[styles.txt]}>Select Music file</Text> : <></>}

        <TextInput
          returnKeyType="next"
          style={[styles.input, { marginTop: 10 }]}
          editable={false}
          placeholder={result ? result?.[0].name : "Select Music file"}
          placeholderTextColor={Colors.placeholder_gray}
        />
      </Pressable>



      <TouchableNativeFeedback onPress={() => uploadMusicFile()}>
        <View style={styles.register}>

          {loading ? <ActivityIndicator
            color={Colors.white}

          /> : <Text style={styles.text_login}>{`Upload Music`}</Text>}
        </View>
      </TouchableNativeFeedback>



    </View>
  )
}

export default MusicUpload

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  input: {
    height: 55,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
    fontFamily: 'DMSans-Regular',
    borderRadius: 2,
    color: Colors.black,
    borderColor: Colors.border_stroke,
  },
  txt: {
    color: Colors.placeholder_gray,
    marginTop: 10
  },
  register: {

    borderColor: Colors.status_bar,
    width: '100%',
    borderRadius: 2,
    borderWidth: 1,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 50,
    backgroundColor: Colors.status_bar,
    alignSelf: 'center',
  },


  text_login: {
    fontFamily: 'DMSans-Bold',
    fontSize: 15,
    textAlign: 'center',
    color: Colors.white,

  },

})
