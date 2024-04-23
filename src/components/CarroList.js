// CarroList.js

import React, { useEffect, useState } from 'react';
import { deleteCarro, getAllCarros } from '../services/api';
import CarroForm from './CarroForm';

const CarroList = () => {
  const [carros, setCarros] = useState([]);
  const [editCarroData, setEditCarroData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [carrosPerPage] = useState(5);
  const [searchInput, setSearchInput] = useState('');
  const [filteredCarros, setFilteredCarros] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCarros();
        setCarros(response);
        setFilteredCarros(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCarro(id);
      setCarros(carros.filter((carro) => carro.id !== id));
      setFilteredCarros(filteredCarros.filter((carro) => carro.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (carro) => {
    setEditCarroData(carro);
  };

  const handleFormSubmit = () => {
    setEditCarroData(null);
    getAllCarros().then((response) => {
      setCarros(response);
      setFilteredCarros(response);
    });
  };

  // Get current cars
  const indexOfLastCar = currentPage * carrosPerPage;
  const indexOfFirstCar = indexOfLastCar - carrosPerPage;
  const currentCarros = filteredCarros.slice(indexOfFirstCar, indexOfLastCar);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Search
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchInput(searchTerm);
    const filteredData = carros.filter(
      (carro) =>
        carro.placa.toLowerCase().includes(searchTerm) ||
        carro.chassi.toLowerCase().includes(searchTerm)
    );
    setFilteredCarros(filteredData);
  };

  return (
    <div>
      <div className="list-title">
        <h2>Lista de Carros</h2>
      </div>
      <div className="App-container-addcarros">
        <input
          type="text"
          placeholder="Buscar por placa ou chassi"
          value={searchInput}
          onChange={handleSearch}
        />
        <ul>
          {currentCarros.map((carro) => (
            <li key={carro.id}>
              <div className="carro-info">
                {carro.marca} - {carro.modelo} ({carro.ano}) - Chassi: {carro.chassi} - Placa: {carro.placa} - Cor: {carro.cor}
              </div>
              <div className="btn-ex-edit">
                <button onClick={() => handleDelete(carro.id)}>Excluir</button>
                <button onClick={() => handleEdit(carro)}>Editar</button>
              </div>
            </li>
          ))}
        </ul>
        <div className="pagination">
          {carros.length > carrosPerPage && currentPage > 1 && (
            <button onClick={() => paginate(currentPage - 1)}> {'<'} </button>
          )}
          {carros.length > carrosPerPage &&
            Array.from({ length: Math.ceil(carros.length / carrosPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={index + 1 === currentPage ? 'active' : (index >= currentPage + 2 || index < currentPage - 2 ? 'hide' : '')}
              >
                {index + 1}
              </button>
            ))}
          {carros.length > carrosPerPage && currentPage < Math.ceil(carros.length / carrosPerPage) && (
            <button onClick={() => paginate(currentPage + 1)}> {'>'} </button>
          )}
        </div>
      </div>
      {editCarroData ? (
        <div>
          <h2>Editar Carro</h2>
          <CarroForm onSubmit={handleFormSubmit} carro={editCarroData} />
        </div>
      ) : (
        <div>
          
          <CarroForm onSubmit={handleFormSubmit} />
        </div>
      )}
    </div>
  );
};

export default CarroList;