import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// import { login } from "@/lib/appwrite";
import { Redirect } from "expo-router";
// import { useGlobalContext } from "@/lib/global-provider";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { login } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-context';

export default function SignIn(){
        const { refetch, loading, isLogged } = useGlobalContext();

        if (!loading && isLogged) return <Redirect href="/" />;
      
        const handleLogin = async () => {
          const result = await login();
          if (result){
            refetch();
          }else{
            Alert.alert("Error", "Failed to Login")
          }
        };
      
        return (
          // purpose of safearea is to make content inside the screen no matter what screen size it is
          <SafeAreaView className="bg-white h-full">

            {/* purpose of scrollview is to make sure if screen is small, user will be able to scroll the content */}
            <ScrollView
              contentContainerStyle={{
                height: "100%",
              }}
            >
              <Image
                source={images.onboarding}
                className="w-full h-4/6"
                resizeMode="contain"
              />
      
              <View className="px-10">
                <Text className="text-base text-center uppercase font-rubik text-black-200">
                  Welcome To Real Scout
                </Text>
      
                <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
                  Let's Get You Closer To {"\n"}
                  <Text className="text-primary-300">Your Ideal Home</Text>
                </Text>
      
                <Text className="text-lg font-rubik text-black-200 text-center mt-12">
                  Login to Real Scout with Google
                </Text>
      
                <TouchableOpacity
                  onPress={handleLogin}
                  className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
                >
                  {/* Purpose of TouchableOpacity:
                   User Interaction: It allows you to make any component respond to touch events (e.g., taps, clicks).
                   Visual Feedback: It provides visual feedback by reducing the opacity of the wrapped content when pressed.
                   Customizable: You can wrap any component (e.g., View, Text, Image) inside TouchableOpacity to make it interactive.
                   Cross-Platform: It works consistently across both iOS and Android platforms. */}

                  <View className="flex flex-row items-center justify-center">
                    <Image
                      source={icons.google}
                      className="w-5 h-5"
                      resizeMode="contain"
                    />
                    <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                      Continue with Google
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
  );
};

