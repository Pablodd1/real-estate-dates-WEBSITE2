import { useState, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  serverTimestamp,
  doc,
  updateDoc,
  increment
} from 'firebase/firestore';
import { useAuth } from './useAuth';
import { toast } from 'sonner'; // Assuming sonner is installed for notifications

export function useMatching() {
  const { user, profile } = useAuth();
  const [isMatching, setIsMatching] = useState(false);

  const checkAndCreateMatch = async (senderId: string, receiverId: string) => {
    // Check if the receiver already sent a key to the sender
    const q = query(
      collection(db, 'keys'),
      where('senderId', '==', receiverId),
      where('receiverId', '==', senderId)
    );
    
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      // It's a match! (Inspection Period)
      const matchDoc = await addDoc(collection(db, 'matches'), {
        users: [senderId, receiverId],
        createdAt: serverTimestamp(),
        status: 'inspection_period'
      });
      
      return true;
    }
    return false;
  };

  const submitKey = useCallback(async (receiverId: string) => {
    if (!user || !profile) return false;

    // Check Tier Limits
    if (profile.role === 'Standard' && profile.keysUsedToday >= 10) {
      toast.error("Daily key limit reached. Upgrade to Elite to build your empire faster.");
      return false;
    }

    setIsMatching(true);
    try {
      // 1. Record the key
      await addDoc(collection(db, 'keys'), {
        senderId: user.uid,
        receiverId,
        status: 'pending',
        timestamp: serverTimestamp(),
      });

      // 2. Increment user's keysUsedToday
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        keysUsedToday: increment(1)
      });

      // 3. Check for mutual match
      const isMatch = await checkAndCreateMatch(user.uid, receiverId);
      
      if (isMatch) {
        toast.success("Protocol Activated! You've entered the Inspection Period with a new partner.", {
          duration: 5000,
          icon: '🤝'
        });
        // Here we could trigger a specific UI animation for a match
      } else {
        toast.success("Key submitted successfully.");
      }

      setIsMatching(false);
      return true;
    } catch (error) {
      console.error("Error submitting key:", error);
      toast.error("Failed to submit key.");
      setIsMatching(false);
      return false;
    }
  }, [user, profile]);

  const passProfile = useCallback(async (receiverId: string) => {
      if (!user) return;
      // Record the pass so we don't show them again (optional but good practice)
      try {
        await addDoc(collection(db, 'passes'), {
            senderId: user.uid,
            receiverId,
            timestamp: serverTimestamp(),
        });
        return true;
      } catch(e) {
          console.error("Error passing", e);
          return false;
      }
  }, [user]);

  return { submitKey, passProfile, isMatching };
}
