import api from './api';

export const get = establishmentId =>
  api.get(`/establishments/${establishmentId}/queue`);

export const update = (session, newQueue) =>
  api.post(
    `/establishments/${session.app._id}/queue`,
    {
      newQueue,
    },
    {
      headers: {
        token: session.google.id,
      },
    },
  );
