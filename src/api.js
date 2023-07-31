import { request } from './utils/axios';

export async function adminLogin(username, password) {
  const response = await request.request({
    method: 'POST',
    url: '/auth/admin/login',
    data: {
      username,
      password,
    },
  });
  return response;
}

export async function createElection(superAdmin, uri) {
  const response = await request.request({
    method: 'POST',
    url: '/create-election/create',
    data: {
      superAdmin,
      uri,
    },
  });
  return response;
}

export async function getListElection() {
  const response = await request.request({
    method: 'GET',
    url: '/create-election/',
  });
  return response;
}

export async function addParty(
  ballotContractAddress,
  uri,
  proposalsUri,
  listVoters
) {
  const response = await request.request({
    method: 'POST',
    url: '/party/add',
    data: {
      ballotContractAddress,
      uri,
      proposalsUri,
      listVoters,
    },
  });
  return response;
}

export async function getAllParty(ballotContractAddress) {
  const response = await request.request({
    method: 'GET',
    url: `/party/${ballotContractAddress}`,
  });
  return response;
}

export async function getPartyById(ballotContractAddress, partyId) {
  const response = await request.request({
    method: 'GET',
    url: `/party/get-party/${ballotContractAddress}/${partyId}`,
  });
  return response;
}

export async function getListProposals(ballotContractAddress, partyId) {
  const response = await request.request({
    method: 'GET',
    url: `/party/list-proposals/${ballotContractAddress}/${partyId}`,
  });
  return response;
}
