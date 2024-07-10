import { Link } from 'react-router-dom';
import ban1 from './assets/ban1.png';
import ban2 from './assets/ban2.png';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <div className="w-full bg-secondary text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
         
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <img 
          src={ban1} 
          alt="Imagen Superior" 
          className="w-full md:w-1/2 object-cover"
        />
      </div>
      <div className="w-full bg-verde text-white py-4">
        <div className="container mx-auto text-center">
          <Link to="/number-board">
            <button className="text-white py-4 px-8 rounded bg-blue-500 text-2xl">
              Seleccionar Números
            </button>
          </Link>
          
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <img 
          src={ban2}
          alt="Imagen Inferior" 
          className="w-full md:w-1/2 object-cover"
        />
      </div>
    </div>
  );
};

export default Home;










  