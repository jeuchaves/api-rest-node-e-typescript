import KeycloakConnect from 'keycloak-connect';

const keycloakConfig = {
    realm: 'myrealm',
    'auth-server-url': 'http://localhost:8080',
    'ssl-required': 'external',
    resource: 'myclient',
    credentials: {
        secret: process.env.KEYCLOAK_SECRET,
    },
    'confidential-port': 0,
};

const keycloak = new KeycloakConnect({ store: true }, keycloakConfig);
export { keycloak };
