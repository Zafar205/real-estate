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
            <Link href="/sign-in">
              <Text>SignIn</Text>
            </Link>
            <Link href="/explore">
              <Text>Explore</Text>
            </Link>
            <Link href="/profile">
              <Text>Profile</Text>
            </Link>
            <Link href="/properties/12">
              <Text>Properties</Text>
            </Link>
        </View>
    );
}