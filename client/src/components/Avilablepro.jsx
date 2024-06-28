import React, { useState } from "react";
import { Grid, Paper, Typography, Card, Button } from "@mui/material";
import { useRecoilValue } from "recoil";
import { propertiesAtom } from "../store/atoms/properties";
import { searchedValueAtom } from "../store/atoms/user";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ButtonGroup,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

export function Avilablepro() {
  const properties = useRecoilValue(propertiesAtom);
  const searchedValue = useRecoilValue(searchedValueAtom);

  if (!properties || properties.length === 0) {
    return null;
  }

  const filteredProperties = searchedValue
    ? properties.filter(
        (oneproperty) =>
          (oneproperty.type || "")
            .toLowerCase()
            .includes((searchedValue || "").toLowerCase()) ||
          (oneproperty.description || "")
            .toLowerCase()
            .includes((searchedValue || "").toLowerCase()) ||
          (oneproperty.location || "")
            .toLowerCase()
            .includes((searchedValue || "").toLowerCase())
      )
    : properties;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {filteredProperties.map((oneproperty) => (
        <Property key={oneproperty.id} oneproperty={oneproperty} />
      ))}
    </div>
  );
}

export function Property({ oneproperty }) {
  const type = oneproperty.type || "";
  const description = oneproperty.description || "";
  const price = oneproperty.price || "";
  const location = oneproperty.location || "";
  const imageLink = oneproperty.imageLink || "";

  const navigate = useNavigate();

  return (
    <div className="bg-card text-card-foreground w-full max-w-sm rounded-xl border shadow-sm overflow-hidden m-2.5 transform transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg" data-v0-t="card">
      <div className="aspect-16/9">
        <img
          src={imageLink}
          width={400}
          height={225}
          alt="Property"
          style={{ aspectRatio: "400/225", objectFit: "cover" }}
        />
      </div>
      <div className="p-6">
        <h2 className="text-lg font-medium">{oneproperty.location}</h2>
        {/* <p className="text-sm text-gray-500">San Francisco, CA</p> */}
        <div className="flex items-center space-x-4 text-2xl font-semibold mt-4">
          <div>{oneproperty.price} per month</div>
          <div className="text-base font-normal ml-auto">2 bd</div>
          <div className="text-base font-normal">2 ba</div>
        </div>
        <p className="text-sm leading-none text-gray-500 mt-2">
          {oneproperty.description}
        </p>
      </div>
      <div className="flex items-center p-4">
      <button
            className="inline-block w-full py-2 px-4 text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring focus:ring-gray-300 rounded-md"
            onClick={() => {
              navigate("/properties/" + oneproperty._id);
            }}
          >
            View Details
          </button>
      </div>
    </div>

   
  );
}