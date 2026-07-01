import { View, Text, Module, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, {useState} from 'react'
import { useRouter } from 'expo-router'
import {SafeAreaView} from 'react-native-safe-area-context'
import {styles} from '@/assets//styles/AuthScreen.styles'
import {LinearGradient} from 'expo-linear-gradient'
import { Colors } from '../../../constants/Colors'
import {SvgXml} from 'react-native-svg'

type Mode = "login" | "register"

export default function AuthScreen() {
  const [mode, setMode] = useState<Mode>("login")
  const [name, setName] = useState(" ")
  const [handle, setHandle] = useState(" ")
  const [email, setEmail] = useState(" ")
  const [password, setPassword] = useState(" ")
  const [verification, setVerification] = useState(" ")
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)

  const router = useRouter();

  const svgMarkup= `<svg width="63" height="70" viewBox="0 0 63 70" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M33.817 52.382c0-15.988 12.96-28.948 28.948-28.948v17.585c0 15.987-12.96 28.948-28.948 28.948zm-4.869 0c0-15.988-12.96-28.948-28.948-28.948v17.585c0 15.987 12.96 28.948 28.948 28.948z" fill="#fff"/>
  <g clip-path="url(#a)">
    <path d="M31.487 0c0 8.764 7.049 15.881 15.786 15.992l.207.001-.207.001c-8.737.11-15.786 7.228-15.786 15.992 0-8.833-7.16-15.993-15.993-15.993 8.833 0 15.993-7.16 15.993-15.993" fill="#fff"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M15.494 0H47.48v31.986H15.494z"/>
    </clipPath>
  </defs>
</svg>`
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.kav} 
      behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled">
          {/*  Logo */}
          <View style={styles.logoRow}>
            <LinearGradient colors={[Colors.primary, Colors.primaryContainer]} style={styles.logoBox}>
             
             <SvgXml xml={svgMarkup}  width="50%" height="50%"/>
              </LinearGradient>
              <Text style={styles.appName}>InstaChat</Text>

          </View>
          {/* Hero text */}
          <Text style={styles.heading}>
            {mode === "login" ? "Welcome back!" : "Create account"}
          </Text>
          <Text style={styles.subheading}>
            {mode === "login" ? "Sign in to continue chatting" : "Fill in your details to get started."}
          </Text>
          {/* Form */}

          <View style={styles.form}>
            {mode === "register" && (
              <>
              <View style={styles.field}>
                

              </View>
              
              </>
            )}

          </View>

          
          </ScrollView>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}