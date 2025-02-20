export type RootStackParamList = {
    home: undefined;
    review: { albumId: string };
  };
  
  declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }