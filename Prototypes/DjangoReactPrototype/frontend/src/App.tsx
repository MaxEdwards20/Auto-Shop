import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'
import { CarListing } from './components/CarListing'

// const rentals = [
//   {
//       "vin": "ZAMGJ45A390047326",
//       "make": "Toyota",
//       "model": "Camry",
//       "edition": "SE",
//       "year": 2009,
//       "color": "Silver",
//       "mileage": 139300,
//       "titleType": "Rebuilt/Reconstructed"
//   },
//   {
//       "vin": "KMHD25LE1DU042025",
//       "make": "Hyundai",
//       "model": "Elantra",
//       "edition": "GT",
//       "year": 2013,
//       "color": "Blue",
//       "mileage": 97540,
//       "titleType": "Clean"
//   },
//   {
//       "vin": "JH4CC2650NC000393",
//       "make": "Batmobile",
//       "model": "1.0",
//       "edition": "LE",
//       "year": 2005,
//       "color": "Black",
//       "mileage": 2300,
//       "titleType": "Clean"
//   },
//   {
//       "vin": "WDDDJ72X97A116339",
//       "make": "Capes",
//       "model": "Superman",
//       "edition": "S",
//       "year": 1964,
//       "color": "red",
//       "mileage": 32000,
//       "titleType": "Salvage"
//   }
// ]

export function App() {
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    refreshList();
  }, []);

  function refreshList(){
    axios
      .get("http://localhost:8000/api/rental/")
      .then((res) => {
        setCarList(res.data);
      })
      .catch((err) => console.log(err));
  };

  
  return (
    <div className="App">
      <button>Add car</button>
      <div className='carList'>
        <ul>
          {carList.map((rental) => (
              <CarListing car={rental} />
            )
          )}
        </ul>
      </div>
    </div>
  )
}
