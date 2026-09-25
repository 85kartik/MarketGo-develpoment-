api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("marketgo_token");

  console.log("TOKEN:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("REQUEST HEADERS:", config.headers);

  return config;
});