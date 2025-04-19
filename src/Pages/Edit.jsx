import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import Card from '../Components/CreateCard';
import supabase from '../Client';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmateData, setCrewmateData] = useState({
    crewmateName: '',
    crewmateSpeed: '',
    crewmateColor: ''
  });
  const [loading, setLoading] = useState(true);

  const colorOptions = [
    { value: "Red", color: "red" },
    { value: "Green", color: "green" },
    { value: "Blue", color: "lightblue" },
    { value: "Purple", color: "violet" },
    { value: "Yellow", color: "yellow" },
    { value: "Orange", color: "orange" },
    { value: "Pink", color: "pink" },
    { value: "Rainbow" },
  ];

  useEffect(() => {
    const fetchCrewmate = async () => {
      if (!id) return;
      
      const { data, error } = await supabase
        .from("Crewmates")
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.log("Error fetching crewmate:", error);
        setLoading(false);
      } else if (data) {
        setCrewmateData({
          crewmateName: data.name,
          crewmateSpeed: data.speed,
          crewmateColor: data.color
        });
        setLoading(false);
      }
    };

    fetchCrewmate();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCrewmateData(prev => ({ ...prev, [name]: value }));
  };

  const updateCrewmate = async (e) => {
    e.preventDefault();

    const crewmate = {
      name: crewmateData.crewmateName,
      speed: crewmateData.crewmateSpeed,
      color: crewmateData.crewmateColor
    };

    const { error } = await supabase
      .from("Crewmates")
      .update(crewmate)
      .eq('id', id);

    if (error) {
      console.log("Error updating crewmate:", error);
    } else {
      alert("Crewmate successfully updated!");
      navigate('/gallery');
    }
  };

  const deleteCrewmate = async () => {
    if (window.confirm("Are you sure you want to delete this crewmate?")) {
      const { error } = await supabase
        .from("Crewmates")
        .delete()
        .eq('id', id);

      if (error) {
        console.log("Error deleting crewmate:", error);
      } else {
        alert("Crewmate successfully deleted!");
        navigate('/gallery');
      }
    }
  };

  if (loading) {
    return <div>Loading crewmate data...</div>;
  }

  return (
    <div className="edit">
      <h1>Edit Crewmate</h1>
      <form onSubmit={updateCrewmate}>
        <Card
          title="Name:"
          type="text"
          placeholder="Enter crewmate's name"
          name="crewmateName"
          value={crewmateData.crewmateName}
          onChange={handleChange}
        />
        <Card
          title="Speed (mph):"
          type="text"
          placeholder="Enter speed in mph"
          name="crewmateSpeed"
          value={crewmateData.crewmateSpeed}
          onChange={handleChange}
        />
        <Card
          title="Color:"
          type="radio"
          name="crewmateColor"
          options={colorOptions}
          value={crewmateData.crewmateColor}
          onChange={handleChange}
        />

        <div className="button-group">
          <button type="submit" className="update-button">Update Crewmate</button>
          <button type="button" className="delete-button" onClick={deleteCrewmate}>Delete Crewmate</button>
          <button type="button" className="cancel-button" onClick={() => navigate(`/gallery`)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;