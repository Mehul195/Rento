import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import { useNavigate } from 'react-router-dom';
import { propertiesAtom } from '../store/atoms/properties';
import { useRecoilState } from "recoil";
import { v4 } from "uuid";
import { imageDb } from "./../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import axios from 'axios';
import TobBar from "./../components/TopBar"

const CreateProperty = () => {
    const navigate = useNavigate();
    const [properties, setProperties] = useRecoilState(propertiesAtom);

    const [typeOfProperty, setTypeOfProperty] = useState("");
    const [description, setDescription] = useState("");
    const [Price, setPrice] = useState("");
    const [imageLink, setImageLink] = useState(null);
    const [location, setLocation] = useState("");
    const [shortLink, setShortLink] = useState("");
    const [availability, setAvailability] = useState(true);
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    const handleUploadImage = () => {
        const imgRef = ref(imageDb, `files/${v4()}`);
        uploadBytes(imgRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageLink(url);
            });
        }).catch((error) => {
            console.error('Error uploading image:', error);
        });
        console.log("This is the image link" , imageLink);
    }

    const handleCreateProperty = async () => {
        // Check if any of the required fields are empty
        if (!typeOfProperty || !description || !Price || !imageLink || !location || !shortLink) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/user/properties", {
                typeOfProperty: typeOfProperty,
                description: description,
                price: Price,
                imageLink: imageLink,
                location: location,
                shortLink: shortLink,
                avialability: availability
            }, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });

            let newProperty = {
                typeOfProperty: typeOfProperty,
                description: description,
                price: Price,
                imageLink: imageLink,
                location: location,
                shortLink: shortLink,
                avialability: availability
            }

            await setProperties(newProperty);
            alert("Property Added congo!");
            navigate("/landing");
        } catch (err) {
            console.log("there is problem creating the property", err);
        }
    }

    return (
        <>
        <TobBar/>
        <div className="container mx-auto mt-5">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <div className="md:col-span-2 lg:col-span-3 xl:col-span-4">
                        <form className="bg-white rounded-lg shadow-md">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                                <div>
                                    <label htmlFor="property-name" className="block text-sm font-medium text-gray-700">Property Name</label>
                                    <input id="property-name" className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" type="text" placeholder='Mention size in bhk also' onChange={(e) => setTypeOfProperty(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                                    <input id="location" className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" type="text" onChange={(e) => setLocation(e.target.value)} />
                                </div>
                            </div>
                            <div className="p-6">
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                                <input id="price" className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" type="text" onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className="p-6">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea id="description" className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" defaultValue={""} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                                <div>
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                                    <input id="image" className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" type="file" name="photo" accept="image/*" onChange={handleImageChange} />
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300" type="button" onClick={handleUploadImage}>Upload Image</button>
                                </div>
                                <div>
                                    <label htmlFor="shortlink" className="block text-sm font-medium text-gray-700">Shortlink</label>
                                    <input id="shortlink" className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" type="text" onChange={(e) => setShortLink(e.target.value)} />
                                </div>
                            </div>
                            <div className="p-6">
                                <label htmlFor="availability" className="block text-sm font-medium text-gray-700">Availability</label>
                                <select id="availability" className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" onChange={(e) => setAvailability(e.target.value)}>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </div>
                            <div className="flex justify-center p-6">
                                <button type="button" className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-white font-semibold py-2 px-6 rounded-md transition duration-300" onClick={handleCreateProperty}>Create Property</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default CreateProperty;
