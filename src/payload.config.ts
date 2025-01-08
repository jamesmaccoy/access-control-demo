import { buildConfig } from 'payload/config';
import path from 'path';
import { Users } from './collections/Users';
import { Policys } from './collections/Policys';
import { Media } from './collections/Media';
import { ContactRequests } from './collections/ContactRequests';
import { Pockets } from './collections/Pockets';
import { seed } from './seed';
import { MyCustomLogo } from './graphics/logo';
import { myCustomIcon } from './graphics/Icon';

export default buildConfig({
  admin: {
    user: Users.slug,
    components: {
      graphics: {
          Icon: myCustomIcon,
          Logo: MyCustomLogo,
      },
  },

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
