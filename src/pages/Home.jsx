import Products from "../components/product";
import { useBoolean } from '../hooks/use-boolean';

const Home = () => {
  const modalBoolean = useBoolean();

  return (
    <>
      <h1>Hello, I am Home</h1>

      <button onClick={modalBoolean.onTrue} style={{ marginBottom: 20 }}>
        Open Modal
      </button>

      {modalBoolean.value && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            backgroundColor: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 8,
              minWidth: 300,
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
          >
            <h3>Modal Title</h3>
            <p>This is a modal using useBoolean()</p>
            <button onClick={modalBoolean.onFalse}>Close</button>
          </div>
        </div>
      )}

      <Products />
      <input type="text" onChange={(e) => console.log(e.target.value)} />
    </>
  );
};

export default Home;
