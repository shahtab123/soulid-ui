import fs from 'fs';
import path from 'path';

const STORE_PATH = path.join(process.cwd(), 'src/data/store.json');

interface Profile {
  id: string;
  name: string;
  region: string;
  age: number;
  skillTags: string[];
  walletAddress: string;
  idFile?: string;
}

interface SoulboundToken {
  id: string;
  profileId: string;
  title: string;
  description: string;
  date: string;
  issuer: string;
  evidence?: string;
  type: string;
}

interface Store {
  profiles: Profile[];
  soulboundTokens: SoulboundToken[];
}

export const readStore = (): Store => {
  try {
    const data = fs.readFileSync(STORE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { profiles: [], soulboundTokens: [] };
  }
};

export const writeStore = (data: Store) => {
  fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2));
};

export const addProfile = (profile: Omit<Profile, 'id'>) => {
  const store = readStore();
  const newProfile = {
    ...profile,
    id: Math.random().toString(36).substr(2, 9),
  };
  store.profiles.push(newProfile);
  writeStore(store);
  return newProfile;
};

export const getProfile = (id: string) => {
  const store = readStore();
  return store.profiles.find(p => p.id === id);
};

export const addSoulboundToken = (token: Omit<SoulboundToken, 'id'>) => {
  const store = readStore();
  const newToken = {
    ...token,
    id: Math.random().toString(36).substr(2, 9),
  };
  store.soulboundTokens.push(newToken);
  writeStore(store);
  return newToken;
};

export const getSoulboundTokens = (profileId: string) => {
  const store = readStore();
  return store.soulboundTokens.filter(t => t.profileId === profileId);
}; 