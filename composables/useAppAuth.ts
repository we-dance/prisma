export const useAppAuth = () => {
  const uid = ref(null);
  const authQuery = useState<string>("auth-query", () => "");
  const authQueryLoading = useState<boolean>("auth-query-loading", () => false);

  const callbackUrl = "/";

  const { signIn, data, status } = useAuth();

  const auth = async (query: string) => {
    if (status.value === "authenticated") {
      return data.value;
    }

    return new Promise((resolve, reject) => {
      const unwatch = watch(data, (newData) => {
        if (newData) {
          console.log("newData", newData);
          unwatch();
          authQuery.value = "";
          resolve(newData);
        }
      });

      authQuery.value = query;
      authQueryLoading.value = true;

      // Optional: Add timeout
      setTimeout(() => {
        unwatch();
        authQuery.value = "";
        reject(new Error("Authentication timeout"));
      }, 300000); // 5 minute timeout
    });
  };

  const login = async (provider: string, options?: any) => {
    const { error, url } = await signIn(provider, {
      ...options,
      redirect: false,
      callbackUrl,
    });
    if (error) {
      return signInErrors[error] ? signInErrors[error] : error;
    } else {
      if (authQueryLoading.value) {
        authQueryLoading.value = false;
      } else {
        navigateTo(url, { external: true });
      }

      return null;
    }
  };

  const signInErrors: { [key: string]: string } = {
    default: "Unable to sign in.",
    Signin: "Try signing in with a different account.",
    OAuthSignin: "Try signing in with a different account.",
    OAuthCallbackError: "Try signing in with a different account.",
    OAuthCreateAccount: "Try signing in with a different account.",
    EmailCreateAccount: "Try signing in with a different account.",
    Callback: "Try signing in with a different account.",
    OAuthAccountNotLinked:
      "To confirm your identity, sign in with the same account you used originally.",
    EmailSignin: "The e-mail could not be sent.",
    CredentialsSignin:
      "Sign in failed. Check the details you provided are correct.",
    SessionRequired: "Please sign in to access this page.",
  };

  return {
    auth,
    login,
    signInErrors,
    uid,
    authQuery,
  };
};
