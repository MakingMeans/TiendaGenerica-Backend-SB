import { CONFIG } from 'src/config-global';

import { CatalogView } from 'src/sections/catalog/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Catalog - ${CONFIG.appName}`}</title>

      <CatalogView />
    </>
  );
}
