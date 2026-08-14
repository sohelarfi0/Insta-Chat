import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, FlatList, Alert } from 'react-native'
import React, { useState , useEffect} from 'react'
import { useRouter } from 'expo-router'
import { dummyConversationData, dummyMessages, dummyUsers } from '@/assets/assets'
import { SafeAreaView } from 'react-native-safe-area-context'
import { stylePropsBuilder } from 'react-native-reanimated/lib/typescript/common'
import { styles } from '@/assets/styles/ChatScreen.styles'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../../constants/Colors'
import { formatTime } from '../../../utils/formatTime'
import Avatar from '../../../components/Avatar'
import Bubble from '../../../components/Bubble'
import { Image } from 'expo-image'
import { TextInput } from 'react-native-gesture-handler'
import * as ImagePicker from 'expo-image-picker'


export default function ChatScreen() {
  const router = useRouter()
  let {auth, messages, users, selectedConversation, typingUsers} = {
    auth: {},
    messages: dummyMessages,
    users: dummyUsers,
    selectedConversation: dummyConversationData[0],
    typingUsers: {
      [dummyUsers[0]._id]: true,

    }

  }

  const [text, setText] = useState("")
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mediaUri, setMediaUri] = useState<string | null> (null)
  const flatListRef = React.useRef<FlatList>(null)

  const partner = selectedConversation?.participant;

  // Scroll to bottom when messages update

  useEffect(()=>{
    if(messages.length > 0){
      setTimeout(()=> flatListRef.current?.scrollToEnd({animated: true}), 100)
    }
  },[messages])

  const deleteChat = () => {

  }

  const pickMedia = async ()=>{
      const {status } = await ImagePicker.
      requestCameraPermissionsAsync();
  
      if(status !== 'granted'){
        Alert.alert("Permission needed", "Allow access to your photos to send media.");
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images','videos','livePhotos'],
        quality: 0.8,
      });
      if(!result.canceled && result.assets[0]){
        const asset = result.assets[0];
        setMediaUri(asset.uri)
      }
  
    }


    const handleTyping = (val: string)=>{
      setText(val)
    }


  

  // Typing indicator helpers
  const typingEntries = Object.entries(typingUsers).filter(([uid, isTyping])=>{
    if(!isTyping || uid === auth.user?._id) return false;
    return partner?._id === uid;
  })

  if(!selectedConversation){
    return (
      <SafeAreaView style={styles.safe}>
        <TouchableOpacity style={styles.backBtn} onPress={()=> router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.onSurface}/>

        </TouchableOpacity>
        <View style={styles.emptyState}>
          <Ionicons name="chatbubbles-outline" size={52} color={Colors.outlineVariant}/>
          <Text style={styles.emptyText}>Conversation not found</Text>
        </View>
      </SafeAreaView>
    )
  }

  const headerName = partner!.name;
  const headerAvatar = partner!.avatar;
  const headerSub = partner!.isOnline ? "online" : partner?.lastSeen ? `Last seen 
  ${formatTime(formatTime(partner.lastSeen))}` : "offline";



  return (
    <SafeAreaView style={styles.safe} edges={["top","bottom"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={()=> router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.onSurface}/>

        </TouchableOpacity>
        <Avatar name={headerName} src={headerAvatar} size={38} online={partner?.isOnline}/>
          <View style={styles.headerInfo} >
            <Text style={styles.headerName} numberOfLines={1}>
              {headerName}
              <Text style={styles.headerHandle}>@{partner?.handle}</Text>

            </Text>
            <Text style={[styles.headerSub, partner?.isOnline && {color: Colors.online}]}>
              {headerSub}
            </Text>



          </View>
          <View style= {styles.headerActions}>
            <TouchableOpacity style={styles.backBtn} >
          <Ionicons name="call-outline" size={20} color={Colors.onSurfaceVariant}/>

        </TouchableOpacity>
        <TouchableOpacity style={styles.backBtn} >
          <Ionicons name="videocam-outline" size={20} color={Colors.onSurfaceVariant}/>

        </TouchableOpacity>
        <TouchableOpacity style={styles.backBtn} onPress={deleteChat}>
          <Ionicons name="trash-outline" size={20} color={Colors.onSurfaceVariant}/>

        </TouchableOpacity>
          </View>
     </View>

     {/* main */}

     <KeyboardAvoidingView style={styles.kav} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
     keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>

      {/* Messages */}
      {loading ? (
        <ActivityIndicator style={{flex: 1}} color = {Colors.primary}/>


      ):(
        <FlatList data={messages}
        ref = {flatListRef}
        keyExtractor={(m)=> m._id}
        contentContainerStyle={styles.messageList}
        renderItem={({item: msg, index})=>{
          const isMine = msg.sender === auth.user?._id;
          const prev = messages[index-1];
          const showGap = !prev || prev.sender !== msg.sender;
          return (
            <View style={showGap && index > 0 ? {marginTop: 10} : { }}>
              <Bubble msg={msg} isMine={isMine}/>
            </View>
          )
        }}
        onContentSizeChange={()=> flatListRef.current?.scrollToEnd({animated: false})}
        />
      )}

      {/* Typing Indicator */}
      {typingEntries.length > 0 && (
        <View style={styles.typingRow}>
          {typingEntries.map(([uid])=>{
            const u = users.find((x)=>x._id === uid) || partner;
            return (
              <Text key={uid} style={styles.typingText}>
                {u?.name || "Someone"} is typing...
              </Text>

            )
          })}
        </View>
      )}

      {/* Input */}
      <View style={styles.inputBar}>
        {/* Media preview */}
        {mediaUri && (
          <View style={styles.mediaPreview}>
            <Image source={{uri:mediaUri}} style={styles.mediaThumb}/>
            <TouchableOpacity style={styles.mediaRemove} onPress={()=> setMediaUri(null)}>
              <Ionicons name="close-circle" size={20} color="#fff"/>
            </TouchableOpacity>
          </View>
            
        )}
        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.attachBtn} onPress={pickMedia}>
              <Ionicons name="image-outline" size={22} color={Colors.onSurfaceVariant}/>
            </TouchableOpacity>

            <TextInput style={styles.textInput}
            value={text}
            onChangeText={handleTyping}
            placeholder="Type a message..."
            multiline
            maxLength={2000}
          />

        </View>
      </View>



     </KeyboardAvoidingView>
    </SafeAreaView>
  )
}