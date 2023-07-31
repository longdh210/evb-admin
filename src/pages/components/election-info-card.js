import { Button } from '@mui/material';
import usa_flag from '../../assets/usa-flag.png';

const ElectionInfoCard = ({
  id,
  image,
  name,
  description,
  address,
  isButton,
  nameButton,
  onClickButtonAdd,
  onClickCard,
  pageName,
  voteCount,
  dateOfBirth,
  hometown,
  academicLevel,
}) => {
  return (
    <div
      className={
        pageName == 'party'
          ? 'w-[100%] h-[40%] rounded-lg overflow-hidden p-4 bg-white'
          : pageName == 'proposals'
          ? 'w-[100%] h-[45%] rounded-lg overflow-hidden p-4 bg-white'
          : 'w-[100%] h-[55%] rounded-lg overflow-hidden p-4 bg-white'
      }
    >
      <div
        className='h-[70%] flex justify-center items-center'
        onClick={onClickCard}
      >
        <img src={image} className='h-full' />
      </div>
      <div className=''>
        <div className='mt-5 flex flex-col font-bold'>
          {id != null ? <span>Id: {id}</span> : <></>}
          {voteCount != null ? <span>Vote count: {voteCount}</span> : <></>}
          <span>Name: {name}</span>
          {dateOfBirth != null ? (
            <span>Data of birth: {dateOfBirth}</span>
          ) : (
            <></>
          )}
          {hometown != null ? <span>Hometown: {hometown}</span> : <></>}
          {academicLevel != null ? (
            <span>Academic level: {academicLevel}</span>
          ) : (
            <></>
          )}
          {description != null ? (
            <span>Description: {description}</span>
          ) : (
            <></>
          )}
          {address != null ? <span>Address: {address}</span> : <></>}
          {isButton == true ? (
            <Button
              variant='contained'
              style={{
                fontWeight: 'bold',
                backgroundColor: 'black',
                marginTop: '10px',
              }}
              onClick={onClickButtonAdd}
            >
              {nameButton}
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElectionInfoCard;
