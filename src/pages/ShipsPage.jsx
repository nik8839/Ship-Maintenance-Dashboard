import { useParams } from 'react-router-dom';
import ShipList from '../components/Ships/ShipList';
import ShipDetail from '../components/Ships/ShipDetail';

const ShipsPage = () => {
  const { id } = useParams();

  return (
    <div className="p-4">
      {id ? <ShipDetail shipId={id} /> : <ShipList />}
    </div>
  );
};

export default ShipsPage;
