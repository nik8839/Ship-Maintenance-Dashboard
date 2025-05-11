import React, { useContext } from 'react';
import { useShips } from '../../contexts/ShipsContext';
import { useNavigate } from 'react-router-dom';

const ShipList = () => {
  const { ships, deleteShip } = useShips();
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4 font-bold">Ships</h2>
      <button className="btn" onClick={() => navigate('/ships/new')}>Add Ship</button>
      <table className="table-auto w-full mt-4 border">
        <thead>
          <tr>
            <th>Name</th><th>IMO</th><th>Flag</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ships.map(ship => (
            <tr key={ship.id}>
              <td>{ship.name}</td>
              <td>{ship.imo}</td>
              <td>{ship.flag}</td>
              <td>{ship.status}</td>
              <td>
                <button onClick={() => navigate(`/ships/${ship.id}`)}>View</button>
                <button onClick={() => navigate(`/ships/edit/${ship.id}`)}>Edit</button>
                <button onClick={() => deleteShip(ship.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipList;
