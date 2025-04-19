import { useState } from 'react'
import Card from '../Components/CreateCard';
import '../App.css';
import supabase from '../Client';
  
const Create = () => {
    const [crewmateData, setCrewmateData] = useState({
        crewmateName: '',
        crewmateSpeed: '',
        crewmateColor: ''
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCrewmateData(prev => ({...prev, [name]: value}));
    }

    const createCrewmate = async (e) => {
        e.preventDefault();

        const crewmate = {
            name: crewmateData.crewmateName,
            speed: crewmateData.crewmateSpeed,
            color: crewmateData.crewmateColor
        };

        const {data, error} = await supabase.from('Crewmates').insert([crewmate]);

        if(error){
            console.log("Error creating crewmate: ", error);
        }else{
            //console.log("Inserted: ", data);
            alert("Crewmate successfully created!");
            setCrewmateData({
                crewmateName: '',
                crewmateSpeed: '',
                crewmateColor: ''
            });
        }
    }
    
    return (
        <form className="create" onSubmit={createCrewmate}>
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
    
            <button type="submit" className="submit-button">Submit</button>
        </form>
    );
};
export default Create;