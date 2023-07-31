import axios from 'axios';
// import 'dotenv/config';

// var data = JSON.stringify({
//   pinataOptions: {
//     cidVersion: 1,
//   },
//   pinataMetadata: {
//     name: 'testing',
//     keyvalues: {
//       customKey: 'customValue',
//       customKey2: 'customValue2',
//     },
//   },
//   pinataContent: {
//     somekey: 'somevalue',
//   },
// });
export const pinJSONToIPFS = async (data) => {
  var config = {
    method: 'post',
    url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzNDdkMDIwYS03NzRhLTQ1NTItYjYzMS0xZWQ4ZTZiYmU1YWIiLCJlbWFpbCI6ImxvbmdkaDIxMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYzc3MmFlNGQ0NjQ0OTQ4MzZiMmUiLCJzY29wZWRLZXlTZWNyZXQiOiJmZTRlYzRkMDc5ODllODE4MWMxODc5OWEzZDUxNzJhNzVhNmZiNGQzOTZiZmIzZjNkNDMzNGUxZDg0ZWRhN2Y3IiwiaWF0IjoxNjg4MTUwMDU2fQ.mAj0IKotEOQZu4NGaFiyf5_22z6W5Nwy2T-budrrw_0`,
    },
    data: data,
  };

  const res = await axios(config);
  return res;
};
