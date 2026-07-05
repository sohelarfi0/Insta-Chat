import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {User as IUser} from '../../types';
import { useRouter } from 'expo-router';
import { dummyUsers } from '@/assets/assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/assets/styles/SearchScreen.styles';
import { Colors } from '../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';



export default function search() {

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<IUser[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const fetchUsers = async () => {
    setLoading(true)
    setTimeout(()=>{
      setUsers(dummyUsers)
      setLoading(false)
    },1000)
  }

  useEffect(()=>{
    const timer = setTimeout(fetchUsers, 300)
    return ()=> clearTimeout(timer)
  },[search])

  return (

    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>
                Search
                </Text>
            </View>

            {/* Search */}
            <View style={styles.searchRow}>
              
              <Ionicons name='search' size={16} color={Colors.outlineVariant}/>
              <TextInput style={styles.searchInput}
                        value={search}
                        onChangeText={setSearch}
                        placeholder='Search  by name, email or handle...'
                        placeholderTextColor={Colors.outlineVariant}
                        autoCapitalize='none'
              />
                {search.length > 0 && (
                  <TouchableOpacity onPress={()=>setSearch(" ")}>
                    <Ionicons name='close-circle' size={16} color={Colors.outlineVariant} />
                  </TouchableOpacity>
                )}
            </View>
    </SafeAreaView>
  )
}