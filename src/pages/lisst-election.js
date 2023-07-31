import ElectionInfoCard from './components/election-info-card';
import usa_flag from '../assets/usa-flag.png';
import { getListElection, addParty } from '../api';
import { useEffect, useState } from 'react';
import DrawerAppBar from './components/navbar';
import { Dialog, CircularProgress, TextField, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { pinFileToIPFS } from '../utils/api/pin-file';
import { pinJSONToIPFS } from '../utils/api/pin-json';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useNavigate } from 'react-router-dom';

const ListElection = () => {
  const [formState, setFormState] = useState({
    partyName: '',
    description: '',
    proposalsInfo: '',
    listVoters: '',
  });
  const [loadingData, setLoadingData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  // const [listProposalsUrl, setListProposalsUrl] = useState([]);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [ballotContractAddress, setBallotContractAddress] = useState('');
  // const [proposalsInfo, setProposalInfo] = useState('');

  const nav = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoadingData(true);
      const res = await getListElection();
      console.log(res.data);
      setData(res.data);
      setLoadingData(false);
    }
    fetchData();
  }, []);

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

  const updateState = (event) => {
    setFormState((formState) => ({
      ...formState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChange = (event) => {
    event.persist();

    updateState(event);
  };

  const validate = () => {
    if (
      formState.partyName == '' ||
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
      const myTextareaByLine = formState.proposalsInfo.split('\n');

      // party metadata
      var data = JSON.stringify({
        pinataOptions: {
          cidVersion: 1,
        },
        pinataContent: {
          name: formState.partyName,
          image: fileUrl,
          description: formState.description,
        },
      });
      const result = await pinJSONToIPFS(data);
      console.log(result.data.IpfsHash);
      const uri =
        'https://copper-dramatic-cod-863.mypinata.cloud/ipfs/' +
        result.data.IpfsHash;

      var listProposalsUrl = [];
      for (var i = 0; i < myTextareaByLine.length; i++) {
        const myLineByLine = myTextareaByLine[i].split(' ');

        // proposals metadata
        var proposalData = JSON.stringify({
          pinataOptions: {
            cidVersion: 1,
          },
          pinataContent: {
            name: myLineByLine[0],
            dob: myLineByLine[1],
            hometown: myLineByLine[2],
            academicLevel: myLineByLine[3],
            image: myLineByLine[4],
          },
        });
        // console.log('data:', proposalData);
        const result = await pinJSONToIPFS(proposalData);
        console.log(result.data.IpfsHash);
        listProposalsUrl.push(
          'https://copper-dramatic-cod-863.mypinata.cloud/ipfs/' +
            result.data.IpfsHash
        );
      }
      var listVotersConverted = formState.listVoters.split('\n');
      const response = await addParty(
        ballotContractAddress,
        uri,
        listProposalsUrl,
        listVotersConverted
      );
      if (response.data) {
        alert('Create successfully');
        nav('/list', { replace: true });
      }
    }
    setLoading(false);
    setOpenDialog(false);
    setFileUrl('');
  };

  return (
    <div className='h-[100vh] w-[100vw] flex flex-col justify-center items-center font-mono bg-slate-300'>
      <Dialog maxWidth='xl' open={openDialog}>
        <div className='flex flex-col p-6 items-center'>
          <TextField
            name='partyName'
            id='outlined-basic'
            label='Name of party'
            variant='outlined'
            className='w-[30vw]'
            margin='normal'
            onChange={handleChange}
          />
          <TextField
            name='description'
            id='outlined-basic'
            label='Description'
            variant='outlined'
            className='w-[30vw]'
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
            style={{
              backgroundColor: 'black',
              fontWeight: 'bold',
              marginTop: '10px',
              width: '50%',
            }}
            loading={loadingUpload}
            loadingIndicator={
              <CircularProgress
                style={{ color: 'white' }}
                size={26}
              ></CircularProgress>
            }
          >
            Upload Party IMG
            <input type='file' hidden onChange={handleUpload} />
          </LoadingButton>
          <TextareaAutosize
            name='proposalsInfo'
            id='outlined-basic'
            label='Description'
            variant='outlined'
            className='w-[30vw] border border-slate-300 rounded mt-5 p-3'
            style={{ height: '85px' }}
            margin='normal'
            onChange={handleChange}
            placeholder='Proposal infomation, include: name, date of birth, home town, academic level, image. Ex: Trump 11/06/1965 NewYork Master link/img.png'
          ></TextareaAutosize>
          <TextareaAutosize
            name='listVoters'
            id='outlined-basic'
            label='Description'
            variant='outlined'
            className='w-[30vw] border border-slate-300 rounded mt-5 p-3'
            style={{ height: '85px' }}
            margin='normal'
            onChange={handleChange}
            placeholder='Ex: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
            0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
          ></TextareaAutosize>
          <LoadingButton
            variant='contained'
            style={{
              fontWeight: 'bold',
              backgroundColor: 'black',
              marginTop: '15px',
              width: '100%',
            }}
            onClick={handleSubmit}
            loading={loading}
            loadingIndicator={
              <CircularProgress style={{ color: 'white' }}></CircularProgress>
            }
          >
            Add party and Begin
          </LoadingButton>
        </div>
      </Dialog>
      <DrawerAppBar></DrawerAppBar>
      {data == [] ? <h1>There are no elections yet</h1> : <></>}
      {loadingData ? (
        <CircularProgress size={100}></CircularProgress>
      ) : (
        <div className='h-full w-[100vw] p-2 grid grid-cols-4 gap-4'>
          {data.map((item) => (
            <ElectionInfoCard
              image={item.image}
              name={item.name}
              description={item.description}
              address={item.electionAddress}
              isButton={true}
              nameButton='Add party'
              onClickCard={() =>
                nav(`/list-party/${item.electionAddress}`, {
                  state: {
                    ballotContractAddress: item.electionAddress,
                  },
                })
              }
              onClickButtonAdd={() => {
                setBallotContractAddress(item.electionAddress);
                setOpenDialog(true);
              }}
            ></ElectionInfoCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListElection;
