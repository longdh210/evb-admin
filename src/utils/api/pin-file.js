import axios from 'axios';
import FormData from 'form-data';
// import 'dotenv/config';

const JWT = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzNDdkMDIwYS03NzRhLTQ1NTItYjYzMS0xZWQ4ZTZiYmU1YWIiLCJlbWFpbCI6ImxvbmdkaDIxMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYzc3MmFlNGQ0NjQ0OTQ4MzZiMmUiLCJzY29wZWRLZXlTZWNyZXQiOiJmZTRlYzRkMDc5ODllODE4MWMxODc5OWEzZDUxNzJhNzVhNmZiNGQzOTZiZmIzZjNkNDMzNGUxZDg0ZWRhN2Y3IiwiaWF0IjoxNjg4MTUwMDU2fQ.mAj0IKotEOQZu4NGaFiyf5_22z6W5Nwy2T-budrrw_0`;

export const pinFileToIPFS = async (fileInput) => {
  const formData = new FormData();
  //   const src = 'path/to/file.png';

  const file = fileInput;
  formData.append('file', file);

  const metadata = JSON.stringify({
    name: 'File name',
  });
  formData.append('pinataMetadata', metadata);

  const options = JSON.stringify({
    cidVersion: 0,
  });
  formData.append('pinataOptions', options);

  try {
    const res = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: JWT,
        },
      }
    );
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
