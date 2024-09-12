import './App.css';
import imagesVaranasi from '../src/varanasi_image.jpg';

function App() {
  return (
    <>
      <h1 align="center">Varanasi</h1>
      <h2 align="center">Welcome to the store</h2>
      <div align="center">
        {/* Add the image here */}
        <img src={imagesVaranasi} alt="Store" width="300px" height="300px" />
      </div>
    </>
  );
}

export default App;