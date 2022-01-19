import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios";
import _ from "underscore";
import { Button, FormGroup, Input, Label } from "reactstrap";
const haversine = require("haversine");
const sortByDistance = require("sort-by-distance");

const ShowPets = () => {
  let [pets, setPets] = useState([]);
  let [shelters, setShelter] = useState([]);
  let [location, setLocation] = useState([]);
  let [species, setSpecies] = useState();
  let [postcode, setPostcode] = useState();
  let [radius, setRadius] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/pet/");
        const json = await response.json();
        setPets(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchShelterDetails = async () => {
      await axios
        .get("http://localhost:8000/api/shelter/find/")
        .then((res) => {
          setShelter(res.data);
        })
        .catch((err) => console.log(err));
    };
    setSpecies("All");
    setRadius("All");
    fetchShelterDetails();
    fetchData();
  }, []);

  const getLocation = () => {
    if (postcode != "") {
      axios
        .get(`http://api.postcodes.io/postcodes/${postcode}`)
        .then((res) => {
          setLocation(res.data.result);
        })
        .catch((err) => window.alert("Please use a valid UK postcode!"));
    }
  };

  const sortPetsByDistance = () => {
    let start = {
      latitude: -0.117098,
      longitude: 51.50998,
    };

    if (location.length != 0) {
      start = {
        latitude: location.latitude,
        longitude: location.longitude,
      };
    }

    const opts = {
      yName: "latitude",
      xName: "longitude",
    };

    shelters = sortByDistance(start, shelters, opts);

    shelters = shelters.map((shelter, index) => {
      shelter["km"] = haversine(start, {
        latitude: shelter.latitude,
        longitude: shelter.longitude,
      });
      return shelter;
    });

    let pets_distance = pets.map((pet, index) => {
      shelters.map((shelter, index) => {
        if (pet.shelter == shelter.id) {
          pet["km"] = shelter.km;
        }
      });
      return pet;
    });

    return filterBySpecies(_.sortBy(pets_distance, "km"));
  };

  const filterBySpecies = (pets) => {
    if (species == "Cat") {
      const cats = pets.filter(function (pet) {
        return pet.species == "Cat";
      });
      return filterByDistance(cats);
    } else if (species == "Dog") {
      const dogs = pets.filter(function (pet) {
        return pet.species == "Dog";
      });
      return filterByDistance(dogs);
    } else {
      return filterByDistance(pets);
    }
  };

  const filterByDistance = (pets) => {
    if (radius != 'All') {
      return pets.filter(function (pet) {
        return pet.km < radius;
      });
    } else {
      return pets;
    }
  };

  return (
    <>
      <FormGroup>
        <Label for="user-postcode">
          Enter your postcode to find pets near you:
        </Label>
        <Input
          type="text"
          id="user-postcode"
          name="user-postcode"
          placeholder="your postcode"
          onChange={(e) => setPostcode(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="species">Species</Label>
        <Input
          type="select"
          id="species"
          name="species"
          onChange={(e) => setSpecies(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="radius">Search radius</Label>
        <Input
          type="select"
          id="radius"
          name="radius"
          onChange={(e) => setRadius(e.target.value)}
        >
          <option value="All">All</option>
          <option value="10">10km</option>
          <option value="25">25km</option>
          <option value="50">50km</option>
          <option value="100">100km</option>
        </Input>
      </FormGroup>
      <Button
        className="btn btn-primary"
        color="success"
        onClick={() => getLocation()}
      >
        Find pets near me
      </Button>
      <div className="all-pets">
        <h1 className="mt-5">Pets available for adoption</h1>
        <div className="row">
          {sortPetsByDistance().map((pet, index) => (
            <Link
              to={"/pet/" + pet.id}
              className="block mt-4 col-sm-4"
              key={pet.id}
            >
              <div className="pet">
                <div className="object-wrap">
                  {pet.image == null ? (
                    <img
                      src="http://localhost:8000/images/paw.png"
                      className="img-fluid"
                    ></img>
                  ) : (
                    <img src={pet.image} className="img-fluid img-sizer"></img>
                  )}
                </div>
              </div>
              <p>{pet.name}</p>
              {location.length != 0 ? (
                <p>{parseInt(pet.km)}km from you</p>
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowPets;
