import { Payload } from "payload";
import { User, Pocket, Policy } from "./payload-types";

export const seed = async (payload: Payload): Promise<void> => {
  const policy1 = await payload.create<Policy>({
    collection: 'policys',
    data: {
      title: 'Policy 1',
    }
  });

  const policy2 = await payload.create<Policy>({
    collection: 'policys',
    data: {
      title: 'Policy 2',
    }
  });

  // Local API methods skip all access control by default
  // so we can easily create an admin user directly in init
  await payload.create<User>({
    collection: 'users',
    data: {
      email: 'dev@payloadcms.com',
      password: 'test',
      firstName: 'Payload',
      lastName: 'CMS',
      roles: ['admin']
    }
  })

  // This user will be created with the default role of `editor`
  await payload.create<User>({
    collection: 'users',
    data: {
      email: 'policy1@payloadcms.com',
      password: 'test',
      firstName: 'Policy1',
      lastName: 'User',
      policys: [policy1.id]
    }
  })

  // This pocket will be created and assigned to policy 1
  await payload.create<Pocket>({
    collection: 'pockets',
    data: {
      _status: 'published',
      title: 'policy 1 Home',
      content: [
        {
          children: [
            {
              text: "Here's some content for policy 1's home pocket."
            }
          ]
        }
      ],
      policy: policy1.id
    }
  })

  // This pocket will be created and assigned to policy 2
  await payload.create<Pocket>({
    collection: 'pockets',
    data: {
      _status: 'published',
      title: 'Policy 2 Home',
      content: [
        {
          children: [
            {
              text: "Here's some content for policy 2's home pocket."
            }
          ]
        }
      ],
      policy: policy2.id
    }
  })
}