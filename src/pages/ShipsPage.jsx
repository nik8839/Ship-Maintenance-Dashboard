import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ShipList from "../components/Ships/ShipList";
import ShipDetail from "../components/Ships/ShipDetail";

const ShipsPage = () => {
  const { id } = useParams();

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Ships</h2>
        <Link
          to="/ships/new"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Create Ship
        </Link>
      </div>

      {id ? <ShipDetail shipId={id} /> : <ShipList />}
    </div>
  );
};

export default ShipsPage;
