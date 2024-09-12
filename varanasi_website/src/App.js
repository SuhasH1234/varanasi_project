import './App.css';
import imagesVaranasi from '../src/varanasi_image.jpg';
import imagesVaranasi1 from '../src/varanasi_image1.jpg';

function App() {
  return (
    <>
      <h1 align="center">Varanasi</h1>
      <h2 align="center">Welcome to the store</h2>
      <div className="image-container">
        <img src={imagesVaranasi} alt="Store" className="responsive-image" />
        <img src={imagesVaranasi1} alt="Store" className="responsive-image" />
      </div>
    </>
  );
}
export default App;
