import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <main
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>An Error page!</h1>
      <p>Could not find this page</p>
      <Link to={'/'}>Home</Link>
    </main>
  );
}

export default ErrorPage;
