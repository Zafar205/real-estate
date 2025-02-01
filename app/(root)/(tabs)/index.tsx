import { Text, View } from "react-native";
import { Link } from "expo-router";


export default function Index() {
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Text className="text-lg my-10 font-rubik text-3xl"> Welcome to our app</Text>
            <Link href="/sign-in">SignIn</Link>
            <Link href="/explore">Explore</Link>
            <Link href="/profile">Profile</Link>
            <Link href="/properties/12">Properties</Link>
        </View>
    );
}