import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import { isAdminOrHasPolicyAccess } from "../access/isAdminOrHasPolicyAccess";
import { isLoggedIn } from "../access/isLoggedIn";

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  access: {
    // Anyone logged in can create
    create: isLoggedIn,
    // Only admins or editors with policy access can update
    update: isAdminOrHasPolicyAccess(),
    // Only admins or editors with policy access can read
    read: isAdminOrHasPolicyAccess(),
    // Only admins or editors with policy access can delete
    delete: isAdminOrHasPolicyAccess(),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'policy',
      type: 'relationship',
      relationTo: 'policys',
      required: true,
      // If user is not admin, set the policy by default
      // to the first policy that they have access to
      defaultValue: ({ user }) => {
        if (!user.roles.includes('admin') && user.policys?.[0]) {
          return user.policys[0];
        }
      }
    }
  ]
}