import { View, Text, TouchableOpacity } from 'react-native'
import React, {use, useState} from 'react'
import { dummyUserProfile } from '@/assets/assets'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '@/assets/styles/ProfileScreen.styles'
import { ScrollView } from 'react-native-gesture-handler'
import { Colors } from '../../../constants/Colors'
import {Ionicons} from "@expo/vector-icons"


export default function profile() {
  const {auth } = {auth: {user : dummyUserProfile}}

  const user = auth.user;
  const [editMode, setEditMode] = useState(false);
  const [profileName, setProfileName] = useState(auth.user?.name || "")
  const [profileHandle, setProfileHandle] = useState(auth.user?.handle || "")
  const [profileUri, setProfileUri] = useState<string | null>(null)
  const [profileBio, setProfileBio] = useState(auth.user?.bio || "")
  const [loading, setLoading] = useState(false)

  const displayAvater = avatarUri || user?.avatar

  const pickAvatar = async ()=>{

  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile 

          </Text>
          {!editMode && (
            <TouchableOpacity style={styles.editBtn} onPress={()=> setEditMode(true)}>
            <Text style={styles.editBtn} onPress={()=>setEditMode(true)}>
              <Ionicons name="pencil" size={16} color={Colors.primary}/>
              <Text style={styles.editBtnText}>Edit</Text>
            </Text>
            </TouchableOpacity>
          )}

        </View>

        {/* Avatar */}
        <View >
          <TouchableOpacity onPress={{edit}}></TouchableOpacity>

        </View>

        {/* Edit form */}

        {/* profile Options */}

        {/* Sign out */}

      </ScrollView>

    </SafeAreaView>
  )
}