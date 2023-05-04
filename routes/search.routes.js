// const rings=await RingModel.aggregate([
//     {
//       $search: {
//         index: "searchRings",
//         text:{
//           query:req.query.q,
//           path:{
//             'wildcard':'*'
//           }
//         }
//       }
//     }
// ]);