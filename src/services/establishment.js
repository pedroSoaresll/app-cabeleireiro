import api from './api';

export const create = (name, googleId) =>
  api.post('/establishments', {
    name,
    googleId,
  });

export const update = (establishmentId, googleId) => (name, address) =>
  api.put(
    `/establishments/${establishmentId}`,
    {
      name,
      address,
    },
    {
      headers: {
        token: googleId,
      },
    },
  );
