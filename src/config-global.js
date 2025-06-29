
import packageJson from '../package.json';

// ----------------------------------------------------------------------

export const CONFIG = {
  site: {
    name: 'Ecommerce App',
    serverUrl: process.env.REACT_APP_SERVER_URL ?? '',
    assetURL: process.env.NEXT_PUBLIC_ASSET_URL ?? '',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
    version: packageJson.version,
  },
  /**
   * Auth
   * @method jwt | amplify | firebase | supabase | auth0
   */
  auth: {
    method: 'jwt',
    skip: false,
    redirectPath: '/dashboard/shared',
  },
};