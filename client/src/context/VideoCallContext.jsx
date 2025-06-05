// import  { createContext, useContext, ReactNode, useState } from "react";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import { useParams } from "react-router-dom";
// // Types
// // interface VideoCallContextType {
//   joinRoom: (element) => void;
//   isRoomJoined;
// }
// const VideoCallContext = createContext(null);
// export const useVideoCall = () => {
//   const context = useContext(VideoCallContext);
//   if (!context) {
//     throw new Error("useVideoCall must be used within a VideoCallProvider");
//   }
//   return context;
// };
// // interface VideoCallProviderProps {
//   children;
// }
// export const VideoCallProvider = ({ children }) => {
//   const { roomId } = useParams<{ roomId }>(); // roomId from the URL
//   const [isRoomJoined, setIsRoomJoined] = useState(false);
//   // Function to join the video call room
//   const joinRoom = (element) => {
//     if (isRoomJoined || !roomId) return; // Prevent joining if already in a room
//     const appID = 26539423;
//     const serverSecret = "2e99a5ef6e97c32e6b831afa07ded799";
//     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//       appID,
//       serverSecret,
//       roomId,
//       Date.now().toString(),
//       "test"
//     );
//     const zp = ZegoUIKitPrebuilt.create(kitToken);
//     zp.joinRoom({
//       container,
//       scenario: {
//         mode: ZegoUIKitPrebuilt.VideoConference,
//       },
//     });
//     setIsRoomJoined(true); // Set room as joined
//   };
//   return (
//     <VideoCallContext.Provider value={{ joinRoom, isRoomJoined }}>
//       {children}
//     </VideoCallContext.Provider>
//   );
// };
