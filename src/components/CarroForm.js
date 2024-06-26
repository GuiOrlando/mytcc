// CarroForm.js
import React, { useState, useEffect } from 'react';
import { addCarro, editCarro, getAllCarros } from '../services/api';

const CarroForm = ({ onSubmit, carro }) => {
  const [marca, setMarca] = useState(carro ? carro.marca : '');
  const [modelo, setModelo] = useState(carro ? carro.modelo : '');
  const [ano, setAno] = useState(carro ? carro.ano : new Date().getFullYear());
  const [chassi, setChassi] = useState(carro ? carro.chassi : '');
  const [placa, setPlaca] = useState(carro ? carro.placa : '');
  const [cor, setCor] = useState(carro ? carro.cor : '');
  const [carros, setCarros] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);

  const marcasCarro = [
    "Chevrolet", "Hyundai", "BMW", "Ford", "Volkswagen", "Fiat", "Peugeot",
    "Volvo", "Audi", "Renault", "Honda", "Mercedes", "Land Rover", "KIA",
    "Citroën", "Jeep", "Toyota", "Mitsubishi"
  ];

  const anosCarro = Array.from({ length: new Date().getFullYear() - 2010 + 1 }, (_, idx) => 2010 + idx);

  const fetchCarros = async () => {
    try {
      const response = await getAllCarros();
      setCarros(response);
      const pages = Math.ceil(response.length / 5);
      setTotalPages(pages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCarros();
  }, []);

  const isDuplicateChassiOrPlaca = () => {
    const foundCarro = carros.find(
      (car) => car.chassi === chassi || car.placa === placa
    );
    return !!foundCarro;
  };

  const clearFields = () => {
    setMarca('');
    setModelo('');
    setAno(new Date().getFullYear());
    setChassi('');
    setPlaca('');
    setCor('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (chassi.length !== 17) {
      alert('O Chassi deve conter 17 caracteres.');
      return;
    }

    if (placa.length !== 7) {
      alert('A Placa deve conter 7 caracteres.');
      return;
    }

    if (isDuplicateChassiOrPlaca()) {
      alert('Já existe um carro cadastrado com esse Chassi ou Placa.');
      return;
    }

    const newCarro = { marca, modelo, ano, chassi, placa, cor };

    try {
      if (carro) {
        await editCarro(carro.id, newCarro);
      } else {
        await addCarro(newCarro);
      }
      onSubmit();
      fetchCarros();
      clearFields(); // Limpa os campos após a submissão do formulário
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className='App-container-addcarros'>
      <div className='btn-form'>
        <button onClick={handleToggleForm}>
          {showForm ? '' : ''}
        </button>
      </div>
      <div className={`add-carro-form ${showForm ? 'active' : ''}`}>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Marca:</span>
            <select
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              required
            >
              <option value="" disabled>Selecione a marca</option>
              {marcasCarro.map((marca, index) => (
                <option key={index} value={marca}>{marca}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Modelo:</span>
            <input
              type="text"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              required
            />
          </label>
          <label>
            <span>Ano:</span>
            <select
              value={ano}
              onChange={(e) => setAno(e.target.value)}
              required
            >
              <option value="" disabled>Selecione o ano</option>
              {anosCarro.map((ano, index) => (
                <option key={index} value={ano}>{ano}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Chassi:</span>
            <input
              type="text"
              value={chassi}
              onChange={(e) => setChassi(e.target.value)}
              maxLength={17} // Definindo o máximo de 17 caracteres para o Chassi
              minLength={17} // Definindo o mínimo de 17 caracteres para o Chassi
              required
            />
          </label>
          <label>
            <span>Placa:</span>
            <input
              type="text"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
              maxLength={7} // Definindo o máximo de 7 caracteres para a Placa
              minLength={7} // Definindo o mínimo de 7 caracteres para a Placa
              required
            />
          </label>
          <label>
            <span>Cor:</span>
            <input
              type="text"
              value={cor}
              onChange={(e) => setCor(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="salvar-button">Salvar</button>
        </form>
      </div>
    </div>
  );
};

export default CarroForm;
