import { CONFIG } from 'src/config-global';

import { SupplierView } from 'src/sections/supplier/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Suppliers - ${CONFIG.appName}`}</title>

      <SupplierView />
    </>
  );
}
