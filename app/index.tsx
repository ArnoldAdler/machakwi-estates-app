/////////////////////////
import { Redirect } from "expo-router";
export default function Login() {
  // var deviceWidth = Dimensions.get("window").width;
  // const router = useRouter();
  // useEffect(() => {
  //   router.push("/home");
  //   return () => {};
  // }, []);
  return <Redirect href="/home" />;
}
