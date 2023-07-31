import { useEffect, useState } from 'react';
import { getAllParty } from '../api';
import DrawerAppBar from './components/navbar';
import { CircularProgress, Button } from '@mui/material';
import ElectionInfoCard from './components/election-info-card';
import { getListProposals } from '../api';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import trump from '../assets/trump.jpeg';
import biden from '../assets/biden.jpeg';

const ListProposal = () => {
  const location = useLocation();
  let ballotContractAddress = location.state.ballotContractAddress;
  let partyId = location.state.partyId;

  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoadingData(true);
      const res = await getListProposals(ballotContractAddress, partyId);
      console.log(res.data);
      setData(res.data);
      setLoadingData(false);
    }
    fetchData();
  }, []);

  return (
    <div className='h-[100vh] w-[100vw] flex flex-col justify-center items-center font-mono bg-slate-300'>
      <DrawerAppBar></DrawerAppBar>
      {loadingData ? (
        <CircularProgress size={100}></CircularProgress>
      ) : (
        <div className='h-full w-[100vw] p-2 grid grid-cols-4 gap-4'>
          {data.map((item) => (
            <ElectionInfoCard
              id={item.proposalId}
              image={item.image}
              name={item.name}
              voteCount={item.voteCount}
              // nameButton='Vote'
              dateOfBirth={item.dateOfBirth}
              hometown={item.hometown}
              academicLevel={item.academicLevel}
              isButton={false}
              pageName={'proposals'}
              //   onClickCard={() => console.log('run')}
              // onClickButtonAdd={() => {
              //   setBallotContractAddress(item.electionAddress);
              //   setOpenDialog(true);
              // }}
            ></ElectionInfoCard>
          ))}
          {/* <div className='w-[100%] h-[60%] rounded-lg overflow-hidden p-4 bg-white'>
            <div
              className='h-[70%] flex justify-center items-center'
              //   onClick={onClickCard}
            >
              <img src={trump} className='h-full' />
            </div>
            <div className=''>
              <div className='mt-5 flex flex-col font-bold'>
                <span>Id: 0</span>
                <span>Vote count: 5</span>
                <span>Name: Trump</span>
                <span>Date of birth: 11/06/1972</span>
                <span>Hometown: NewYork</span>
                <span>Academic level: Master</span>
                <Button
                  variant='contained'
                  style={{
                    fontWeight: 'bold',
                    backgroundColor: 'black',
                    marginTop: '10px',
                  }}
                >
                  Vote
                </Button>
              </div>
            </div>
          </div> */}
          {/* <div className='w-[100%] h-[60%] rounded-lg overflow-hidden p-4 bg-white'>
            <div
              className='h-[70%] flex justify-center items-center'
              //   onClick={onClickCard}
            >
              <img src={biden} className='h-full' />
            </div>
            <div className=''>
              <div className='mt-5 flex flex-col font-bold'>
                <span>Id: 0</span>
                <span>Vote count: 8</span>
                <span>Name: Biden</span>
                <span>Date of birth: 27/2/1970</span>
                <span>Hometown: NewYork</span>
                <span>Academic level: Master</span>
                <Button
                  variant='contained'
                  style={{
                    fontWeight: 'bold',
                    backgroundColor: 'black',
                    marginTop: '10px',
                  }}
                >
                  Vote
                </Button>
              </div>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default ListProposal;
