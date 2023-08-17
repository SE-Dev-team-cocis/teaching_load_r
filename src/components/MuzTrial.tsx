// import React, { useState } from "react";
// import axios from "axios";

// function MuzTrial() {
//   const [amount, setAmount] = useState(0);
//   //   const [campId, setCampId] = useState(0);
//   const [campId, setCampId] = useState(1);

//   const submitPledge = async (e) => {
//     e.preventDefault();

//     const data = {
//       user_id: 1,
//       pledge_amount: amount,
//       campaign_id: campId,
//     };

//     // Posting the data
//     const api = "https://api.sonda.ug/api/makePledge";

//     const response2 = await axios.get(api)
//     console.log(response2.data)

//     try {
//       const response = await axios.post(
//         api,
//         {
//           user_id: 1,
//           pledge_amount: amount,
//           campaign_id: campId,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json"
//           },
//         }
//       );

//       console.log("Response: ", response.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="w-50">
//       <p>Amount got: {amount}</p>
//       <p>Camp id got: {campId}</p>

//       <form action="" onSubmit={(e) => submitPledge(e)}>
//         <div>
//           <label htmlFor="" className="block">
//             Amount
//           </label>
//           <input
//             type="number"
//             name=""
//             value={amount}
//             placeholder="enter the amount..."
//             className="px-2 py-2 "
//             onChange={(e) => setAmount(+e.target.value)}
//           />
//         </div>

//         <label htmlFor="" className="block">
//           Campaign
//         </label>
//         <select onChange={(e) => setCampId(+e.target.value)}>
//           <option value={1}>Wedding 1</option>
//           <option value={2}>Graduation </option>
//           <option value={3}>Kwanjula 1</option>
//           {/* <option value="sdhbskdjbsdk">Kwanjula 2</option> */}
//         </select>

//         <button
//           type="submit"
//           className="bg-green-700 px-2 py-1 rounded block text-white mt-2"
//         >
//           Submit form
//         </button>
//       </form>
//     </div>
//   );
// }

// export default MuzTrial;
