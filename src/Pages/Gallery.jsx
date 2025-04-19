import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Card from '../Components/GalleryCard';
import supabase from '../Client';

const Gallery = () => {
    const navigate = useNavigate();
    const [crewmateData, setCrewmateData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from("Crewmates")
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.log("Error fetching: ", error);
            } else {
                setCrewmateData(data);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/details/${id}`);
    };

    const handleEditClick = (e, id) => {
        e.stopPropagation(); 
        navigate(`/edit/${id}`);
    };

    const handleDeleteClick = async (e, id) => {
        e.stopPropagation(); 
        
        if (window.confirm("Are you sure you want to delete this crewmate?")) {
            const { error } = await supabase
                .from("Crewmates")
                .delete()
                .eq('id', id);
                
            if (error) {
                console.log("Error deleting: ", error);
            } else {
                // Update state to remove deleted crewmate
                setCrewmateData(prev => prev.filter(crewmate => crewmate.id !== id));
                alert("Crewmate successfully deleted!");
            }
        }
    };

    if (loading) {
        return <div>Loading crewmates...</div>;
    }

    return (
        <div className="gallery">
            <h1>Your Crewmate Gallery:</h1>
            {crewmateData.length === 0 ? (
                <p>No crewmates found. Create some crewmates first!</p>
            ) : (
                <div className="crewmate-grid">
                    {crewmateData.map((crewmate) => (
                        <div 
                            key={crewmate.id} 
                            className="crewmate-card"
                            onClick={() => handleCardClick(crewmate.id)}
                        >
                            <Card 
                                name={crewmate.name}
                                speed={crewmate.speed}
                                color={crewmate.color}
                                onEditClick={(e) => handleEditClick(e, crewmate.id)}
                                onDeleteClick={(e) => handleDeleteClick(e, crewmate.id)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Gallery;