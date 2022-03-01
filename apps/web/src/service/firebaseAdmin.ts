const admin = require('firebase-admin')
const serviceAccount = {
  type: 'service_account',
  project_id: 'dueldao',
  private_key_id: '9c0ea89676c5ddfab40008cc83e9f07d87bbda48',
  private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
  client_email: 'firebase-adminsdk-o806c@dueldao.iam.gserviceaccount.com',
  client_id: '102270398932351256962',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-o806c%40dueldao.iam.gserviceaccount.com'
}

if (!admin.apps.length) {
  admin.initializeApp({
    // @ts-ignore
    credential: admin.credential.cert(serviceAccount)
  })
}

export default admin
