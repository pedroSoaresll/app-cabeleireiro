import api from './api';

export const create = (name, googleId) =>
  api.post('/establishments', {
    name,
    googleId,
  });
