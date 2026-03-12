import { CONFIG } from 'src/config-global';

import { ClientView } from 'src/sections/client/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Clients - ${CONFIG.appName}`}</title>

      <ClientView />
    </>
  );
}
