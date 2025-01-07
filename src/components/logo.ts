import { buildConfig } from 'payload/config';
import { ReactNode } from 'react';
// ... other imports

const MyCustomLogo = () => (
    <img src="../../assets/og-image.png" alt="My Logo" /> // or any custom React component
);


export default buildConfig({
    // ... other config
    admin: {
        // ... other admin config
        components: {
            graphics: {
                Logo: MyCustomLogo,
            },
        },
    },
    // ... other config
});

