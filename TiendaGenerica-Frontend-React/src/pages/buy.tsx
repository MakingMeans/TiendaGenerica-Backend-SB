import { CONFIG } from 'src/config-global';

import { BuyView } from 'src/sections/buy/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Buy - ${CONFIG.appName}`}</title>

      <BuyView />
    </>
  );
}
