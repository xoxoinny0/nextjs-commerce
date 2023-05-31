import { GoogleLogin } from '@react-oauth/google'
import { GoogleOAuthProvider } from '@react-oauth/google'

const CLIENT_ID =
  '963948090397-9duu6rq1ooefuqrehh5r0v2cb0kr2lv7.apps.googleusercontent.com'

export default function Google() {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div style={{ display: 'flex' }}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            fetch(
              `/api/auth/sign-up?credential=${credentialResponse.credential}`
            )
              .then((res) => res.json())
              .then((data) => console.log(data))
          }}
          onError={() => {
            console.log('Login Failed')
          }}
        />
      </div>
    </GoogleOAuthProvider>
  )
}
