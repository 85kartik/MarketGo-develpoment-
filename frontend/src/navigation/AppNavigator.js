import { NavigationContainer } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

import AuthNavigator from "./AuthNavigator";
import BottomTabs from "./BottomTabs";

import Loader from "../components/Common/Loader";

export default function AppNavigator() {

  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  return (
    <NavigationContainer>
      {user ? <BottomTabs /> : <AuthNavigator />}
    </NavigationContainer>
  );
}