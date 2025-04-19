import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import supabase from '../Client';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data, error } = await supabase
        .from("Crewmates")
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.log("Error fetching crewmate:", error);
        setLoading(false);
      } else {
        setCrewmate(data);
        setLoading(false);
      }
    };

    fetchCrewmate();
  }, [id]);

  if (loading) {
    return <div>Loading crewmate details...</div>;
  }

  if (!crewmate) {
    return <div>Crewmate not found!</div>;
  }

  const getCrewmateDetails = () => {
    const speedCategory = parseInt(crewmate.speed) > 10 ? "Fast" : "Slow";
    const estimatedTaskCompletion = parseInt(crewmate.speed) > 10 ? "Quick" : "Standard";
    
    return {
      speedCategory,
      estimatedTaskCompletion,
      joinDate: new Date(crewmate.created_at).toLocaleDateString(),
      colorPersonality: getColorPersonality(crewmate.color)
    };
  };

  const getColorPersonality = (color) => {
    const personalities = {
      "Red": "Bold and decisive",
      "Green": "Analytical and patient",
      "Blue": "Calm and trustworthy",
      "Purple": "Creative and intuitive",
      "Yellow": "Optimistic and energetic",
      "Orange": "Sociable and enthusiastic",
      "Pink": "Compassionate and caring",
      "Rainbow": "Versatile and unpredictable"
    };
    
    return personalities[color] || "Unknown personality";
  };

  const details = getCrewmateDetails();
  const imageSrc = `/src/assets/${crewmate.color?.toLowerCase()}.png`;

  return (
    <div className="crewmate-details">
      <h1>Crewmate #{id} Details</h1>
      
      <div className="details-card">
        <img src={imageSrc} alt={`${crewmate.color} crewmate`} className="crewmate-img-large" />
        
        <div className="details-info">
          <h2>{crewmate.name}</h2>
          
          <div className="details-sections">
            <div className="details-section">
              <h3>Basic Information</h3>
              <p><strong>Name:</strong> {crewmate.name}</p>
              <p><strong>Speed:</strong> {crewmate.speed} mph</p>
              <p><strong>Color:</strong> {crewmate.color}</p>
              <p><strong>Joined:</strong> {details.joinDate}</p>
            </div>
            
            <div className="details-section">
              <h3>Additional Information</h3>
              <p><strong>Speed Category:</strong> {details.speedCategory}</p>
              <p><strong>Task Completion:</strong> {details.estimatedTaskCompletion}</p>
              <p><strong>Personality Traits:</strong> {details.colorPersonality}</p>
            </div>
          </div>
          
          <div className="details-actions">
            <button className="edit-btn" onClick={() => navigate(`/edit/${id}`)}>
              Edit Crewmate
            </button>
            <button className="back-btn" onClick={() => navigate('/gallery')}>
              Back to Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;