import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { dummyConversationData, dummyMessages, dummyUsers } from '@/assets/assets'
import { SafeAreaView } from 'react-native-safe-area-context'
import { stylePropsBuilder } from 'react-native-reanimated/lib/typescript/common'
import { styles } from '@/assets/styles/ChatScreen.styles'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../../constants/Colors'
import { formatTime } from '../../../utils/formatTime'

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

  const partner = selectedConversation?.participant;

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
    <View>
      <Text>Chat id</Text>
    </View>
  )
}