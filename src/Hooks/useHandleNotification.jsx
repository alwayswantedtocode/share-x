import axios from "../API/axios";
import { useDispatch, useSelector } from "react-redux";
import { setreadNotice, setUnreadNotice } from "../Reduxtoolkit/authSlice";

const useHandleNotification = (activeTab) => {
  const {currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();



  const markAsRead = async (tabId) => {
    try {
      await axios.put(
        `/api/notifications//${tabId}/mark-read?userId=${currentUser._id}`
      );

      const unReadNotice = await axios.get(
        `/api/notifications/${currentUser._id}/unread`
      );

      const readNotice = await axios.get(
        `/api/notifications/${currentUser._id}/read`
      );
      
      const readNotification = readNotice.data;
      const unreadNotification = unReadNotice.data;
      if (activeTab === "Unread") {
        dispatch(setUnreadNotice(unreadNotification));
      } else if (activeTab === "Read") {
        dispatch(setreadNotice(readNotification));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


   const markAllAsRead = async () => {
     try {
       await axios.put(
         `/api/notifications/mark-all-read?userId=${currentUser._id}`
       );

       const unReadNotice = await axios.get(
         `/api/notifications/${currentUser._id}/unread`
       );
       console.log("unReadNotice:", unReadNotice.data);
       const readNotice = await axios.get(
         `/api/notifications/${currentUser._id}/read`
       );
       console.log("readNotice:", readNotice.data);
       const readNotification = readNotice.data;
       const unreadNotification = unReadNotice.data;
       if (activeTab === "Unread") {
         dispatch(setUnreadNotice(unreadNotification));
       } else if (activeTab === "Read") {
         dispatch(setreadNotice(readNotification));
       }
     } catch (error) {
       console.error("Error fetching data:", error);
     }
   };

  return {
    markAsRead,
    markAllAsRead,
  };
};

export default useHandleNotification;
