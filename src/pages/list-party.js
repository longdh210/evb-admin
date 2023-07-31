import { useEffect, useState } from 'react';
import { getAllParty } from '../api';
import DrawerAppBar from './components/navbar';
import { CircularProgress } from '@mui/material';
import ElectionInfoCard from './components/election-info-card';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ListParty = () => {
  const location = useLocation();
  let ballotContractAddress = location.state.ballotContractAddress;
  console.log(ballotContractAddress);

  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoadingData(true);
      const res = await getAllParty(ballotContractAddress);
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
              id={item.partyId}
              image={item.image}
              name={item.name}
              description={item.description}
              isButton={true}
              nameButton='View list proposals'
              pageName='party'
              //   onClickCard={() => console.log('run')}
              onClickButtonAdd={() => {
                nav(
                  `/list-proposals/${ballotContractAddress}/${item.partyId}`,
                  {
                    state: {
                      ballotContractAddress: ballotContractAddress,
                      partyId: item.partyId,
                    },
                  }
                );
              }}
            ></ElectionInfoCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListParty;
