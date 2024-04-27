// import axios from "axios";
// import { useState } from "react";

// export default function ChangeAvatar() {
//     const [img, setImg] = useState(null);

//   const sendFile = React.useCallback(async () => {
//     try {
//       const data = new FormData();
//       data.append("avatar", img);

//       await axios
//         .post("http://localhost:3000/api/upload", data, {
//           headers: {
//             "content-type": "mulpipart/form-data",
//           },
//           withCredentials: true,
//         })
//         .then((res) => {
//           getProfff();
//           userContext.setUser((prev) => ({
//             ...prev,
//             avatar_url: res.data,
//           }));
//         });
//     } catch (error) {}
//   }, [img]);
//   return (
//     <div className="ProfileChange">
//       <input type="file" onChange={(e) => setImg(e.target.files[0])} />
//       <button onClick={sendFile}>Изменить</button>
//     </div>
//   );
// }
