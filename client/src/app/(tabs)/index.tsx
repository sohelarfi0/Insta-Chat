import React, { useEffect, useState } from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TextInput,
} from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import { styles } from '@/assets/styles/MessagesScreen.styles'
import { Colors } from '../../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'

import StoriesBar from '../../../components/StoriesBar'
import StoryViewer from '../../../components/StoryViewer'
import ConvoItem from '../../../components/ConvoItem'

import { Conversation, UserStory } from '../../../types'
import { api } from '../../../context/AppContext'

export default function MessagesScreen() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedStory, setSelectedStory] = useState<UserStory | null>(null)

  const router = useRouter()

  const fetchConversations = async () => {
    setLoading(true)
    try {
      const { data } = await api.get<{ success: boolean; conversations: Conversation[] }>(
        '/api/messages/conversations'
      )
      if (data?.success) setConversations(data.conversations)
    } catch (error) {
      console.error('Failed to fetch conversations', error)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchConversations()
  }, [])

  const lowerSearch = search.toLowerCase()

  const filtered = search
    ? conversations.filter(
        (c) =>
          c.participant?.name?.toLowerCase().includes(lowerSearch) ||
          c.participant?.handle?.toLowerCase().includes(lowerSearch)
      )
    : conversations

  const openConvo = (c: Conversation) => {
    router.push(`/chat/${c._id}`)
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Conversations</Text>

        <View style={styles.headerRight}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {conversations.length}
            </Text>
          </View>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <Ionicons
          name="search"
          size={16}
          color={Colors.outlineVariant}
        />

        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Search conversations..."
          placeholderTextColor={Colors.outlineVariant}
        />

        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons
              name="close-circle"
              size={16}
              color={Colors.outlineVariant}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Stories */}
      <StoriesBar
        onViewStroy={(us) => setSelectedStory(us)}
      />

      {/* Story Viewer */}
      {selectedStory && (
        <StoryViewer
          userStory={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}

      {/* Divider */}
      <View style={styles.divider} />

      {/* Conversation list */}
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: 40 }}
          color={Colors.primary}
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(c) => c._id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <ConvoItem
              convo={item}
              selected={false}
              onPress={() => openConvo(item)}
            />
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons
                name="chatbubbles-outline"
                size={44}
                color={Colors.outlineVariant}
              />

              <Text style={styles.emptyTitle}>
                No conversations yet
              </Text>

              <Text style={styles.emptySubtitle}>
                Go to Search to start chatting
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  )
}