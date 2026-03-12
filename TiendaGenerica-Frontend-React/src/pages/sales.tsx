import { CONFIG } from 'src/config-global';

import { SalesView } from 'src/sections/sale/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Sales - ${CONFIG.appName}`}</title>

      <SalesView />
    </>
  );
}
