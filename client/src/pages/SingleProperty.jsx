import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddressLink from './AddressLink';
import PlaceGallery from './PlaceGallery';

const SingleProperty = () => {
  const {Id} = useParams();
  const [Property,setProperty] = useState(null);


  const fetchProperties = async()=>{
    try{
      const response = await axios.get(`http://localhost:8000/user/properties/${Id}` , {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setProperty(response.data);
    }
    catch(err){
      console.log("error fetching the specific property" , err);
    }
  }

  useEffect(() => {
    if (!Id) {
      return;
    }
    fetchProperties();
  }, [Id]);

  if (!Property) return '';


  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{Property.type}</h1>
      <AddressLink>{Property.location}</AddressLink>
      <PlaceGallery Property={Property} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {Property.description}
          </div>
          {console.log("ye hai number" , Property.authorno)}
         Contact {Property.authorno}<br />
          Check-out: 24 hrs After check in<br />
          Availability :  Available
        </div>
        <div>
        </div>
      </div>
    </div>
  );    
}

export default SingleProperty