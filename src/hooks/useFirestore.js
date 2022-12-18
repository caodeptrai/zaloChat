import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../firebase/config';

const useFirestore = (collect, condition) => {
    const [documents, setDocuments] = useState([]);
  
    React.useEffect(() => {
        
        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
              // reset documents data
              setDocuments([]);
              return;
            }
        }

        const q = query(
            collection(db, collect),
            where(condition.fieldName,
                condition.operator,
                condition.compareValue)
          );
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            let res = {}
            querySnapshot.forEach((doc) => {
               res = {
                id: doc.id,
                ...doc.data()
              } 
                data.push(res);
            });
            setDocuments(data);
          });
        
          return unsubscribe;
        
        
          },[condition.fieldName,
            condition.operator,
            condition.compareValue,collect,condition]);

    return documents;
  };
  
  export default useFirestore;