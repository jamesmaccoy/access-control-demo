import { buildConfig } from 'payload/config';
import path from 'path';
import { Users } from './collections/Users';
import { Policys } from './collections/Policys';
import { Media } from './collections/Media';
import { ContactRequests } from './collections/ContactRequests';
import { Pockets } from './collections/Pockets';
import { seed } from './seed';

export default buildConfig({
  admin: {
    user: Users.slug,
    logo: path.resolve(__dirname, '../../assets/logo.svg')
  },
  collections: [
    ContactRequests,
    Media,
    Pockets,
    Policys,
    Users,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  onInit: async (payload) => {
    // If the `env` var `PAYLOAD_SEED` is set, seed the db
    if (process.env.PAYLOAD_SEED) {
      await seed(payload);
    }
  }
});
