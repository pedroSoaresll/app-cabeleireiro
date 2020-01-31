export const mountAuthValue = (establishment, googleUserInfo) => {
  return {
    app: {...establishment},
    google: {...googleUserInfo.user},
  };
};
