import { atom } from 'recoil';

export const authAtom = atom({
  key: 'authAtom',
  default: localStorage.getItem('token') || null,
});
