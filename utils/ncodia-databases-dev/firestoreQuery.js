import { useQuery } from "@tanstack/react-query";
import { firebaseConfig } from "../../config";
import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";

export const useFirestoreQuery = (queryName, queryClient) => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const collectionRef = collection(db, "employees");
  const querySnapshot = query(collectionRef);

  return useQuery({
    queryKey: queryName,
    queryFn: async () => {
      return new Promise((resolve, reject) => {
        onSnapshot(
          querySnapshot,
          (data) => {
            const formattedData = data.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            var currentValue = queryClient.getQueryData(queryName);
            if (currentValue) {
              console.log("NEW DATA", formattedData);
              queryClient.setQueryData(queryName, formattedData);
            } else {
              console.log("UPDATE DATA", formattedData);
            }
            resolve(formattedData);
          },
          (error) => {
            console.error("ERROR FFFF fetching data:", error);
            reject(error);
          }
        );
      });
    },
    staleTime: 10000,
  });
};
