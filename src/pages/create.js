import { LoadingButton } from '@mui/lab';
import { CircularProgress, TextField, Button } from '@mui/material';
import { DEPLOY_ELECTION_ADDRESS } from '../common/constants';
import { useState } from 'react';
import { createElection } from '../api';
import { pinFileToIPFS } from '../utils/api/pin-file';
import { pinJSONToIPFS } from '../utils/api/pin-json';
import DrawerAppBar from './components/navbar';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [formState, setFormState] = useState({
    chairPersonAddress: '',
    electionName: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [fileUrl, setFileUrl] = useState('');

  const nav = useNavigate();

  const handleChange = (event) => {
    event.persist();

    updateState(event);
  };

  const updateState = (event) => {
    setFormState((formState) => ({
      ...formState,
      [event.target.name]: event.target.value,
    }));
  };

  const validate = () => {
    if (
      formState.chairPersonAddress == '' ||
      formState.electionName == '' ||
      formState.description == '' ||
      fileUrl == ''
    ) {
      alert('Please fill information');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const check = validate();
    if (check == true) {
      setLoading(true);
      var data = JSON.stringify({
        pinataOptions: {
          cidVersion: 1,
        },
        pinataContent: {
          name: formState.electionName,
          image: fileUrl,
          description: formState.description,
        },
      });
      const result = await pinJSONToIPFS(data);
      console.log(result.data.IpfsHash);
      const uri =
        'https://copper-dramatic-cod-863.mypinata.cloud/ipfs/' +
        result.data.IpfsHash;
      const response = await createElection(formState.chairPersonAddress, uri);
      if (response.data) {
        alert('Create successfully');
        nav('/list', { replace: true });
      }
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    setLoadingUpload(true);
    const file = e.target.files[0];
    const result = await pinFileToIPFS(file);
    console.log(result.IpfsHash);
    setFileUrl(
      'https://copper-dramatic-cod-863.mypinata.cloud/ipfs/' + result.IpfsHash
    );
    setLoadingUpload(false);
  };

  return (
    <div className='flex flex-col h-[100vh] w-[100vw] font-mono justify-center items-center bg-gray-300'>
      <DrawerAppBar></DrawerAppBar>
      <div className='flex flex-col justify-center items-center h-[90vh] w-[90vw] rounded-3xl overflow-hidden bg-white'>
        <div className='flex flex-col justify-center items-center h-full w-auto'>
          <TextField
            name='chairPersonAddress'
            id='outlined-basic'
            label='Chair person address'
            variant='outlined'
            className='w-[25vw]'
            margin='normal'
            onChange={handleChange}
          />
          <TextField
            name='electionName'
            id='outlined-basic'
            label='Name of election'
            variant='outlined'
            className='w-[25vw]'
            margin='normal'
            onChange={handleChange}
          />
          <TextField
            name='description'
            id='outlined-basic'
            label='Description'
            variant='outlined'
            className='w-[25vw]'
            margin='normal'
            onChange={handleChange}
          />
          {fileUrl ? (
            <img src={fileUrl} className='w-24 h-auto mt-2 mb-2' />
          ) : (
            <></>
          )}
          <LoadingButton
            variant='contained'
            component='label'
            style={{ backgroundColor: 'black', fontWeight: 'bold' }}
            loading={loadingUpload}
            loadingIndicator={
              <CircularProgress
                style={{ color: 'white' }}
                size={26}
              ></CircularProgress>
            }
          >
            Upload Election Background IMG
            <input type='file' hidden onChange={handleUpload} />
          </LoadingButton>
          <LoadingButton
            className='w-[25vw] h-[4vh] text-xl font-bold'
            variant='contained'
            style={{
              borderRadius: 35,
              marginTop: 15,
              backgroundColor: 'black',
              fontSize: 16,
              fontWeight: 'bold',
            }}
            onClick={handleSubmit}
            loading={loading}
            loadingIndicator={
              <CircularProgress style={{ color: 'white' }}></CircularProgress>
            }
          >
            Create election
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};

export default Create;
