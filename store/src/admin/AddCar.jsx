import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const FormWrapper = styled.div`
  width: 100%;
  margin: auto;
  background-color: #f1f5f9;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: bold;
  color: #4a5568;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #e2e8f0;
  color: #4a5568;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #e2e8f0;
  color: #4a5568;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }
`;

const Button = styled.button`
  background-color: #4299e1;
  color: white;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  &:hover {
    background-color: #2b6cb0;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }
`;

const TableWrapper = styled.div`
  padding: 1rem;
  overflow-y: auto;
`;

const Table = styled.table`
  width: 100%;
  background-color: white;
  border: 1px solid #cbd5e0;
`;

const TH = styled.th`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  text-align: center;
`;

const TD = styled.td`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  text-align: center;
`;

const CarImage = styled.img`
  width: 40px;
  object-fit: cover;
  margin: 0.5rem;
`;

const ActionButton = styled.button`
  background-color: ${(props) => (props.delete ? "#f56565" : "#4299e1")};
  color: white;
  padding: 0.5rem;
  border-radius: 0.25rem;
  margin-left: ${(props) => (props.delete ? "0.5rem" : "0")};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.delete ? "#c53030" : "#2b6cb0")};
  }
`;

export default function AddCar() {
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    color: "white",
    size: "",
    category: "",
    desc: "",
    price: "",
    img: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // First, upload the images
      const uploadedUrls = await uploadImages();

      // Update the formData with all uploaded image URLs
      const data = {
        ...formData,
        img: uploadedUrls[0],
        shopId: "67169600da32440697d3e43a",
      };

      console.log("add car: from ", data);

      console.log("image List :", uploadedUrls);
      console.log("form data to send : ", data);
      // Submit the form with the updated data
      if (editMode) {
        const response = await axios.put(
          `http://localhost:4000/api/fdvdfvv${selectedCarId}`,
          data
        );
        alert(response.data.message || "Car updated successfully!");
      } else {
        const response = await axios.post(
          `http://localhost:4000/api/products`,
          data
        );
        alert(response.data.message || "Car added successfully!");
        console.log("Response Form Data : ", response.data);
        console.log("Reponse urls : ", response.data.data.urls);
      }

      // Reset form data after submission
      setFormData({
        title: "",
        color: "",
        size: "",
        category: "",
        desc: "",
        price: "",
        img: "",
      });
      setEditMode(false);
      setFilesToUpload([]);
      fetchData();
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.error("Response Data:", error.response.data);
        console.error("Response Status:", error.response.status);
        alert(
          error.response.data.message ||
            "An error occurred. Please check the console for details."
        );
      } else {
        alert("An error occurred. Please check the console for details.");
      }
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/product");
      setCarData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (carId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/sdfvdsvsd${carId}`
      );
      alert(response.data.message || "Car deleted successfully!");
      fetchData();
    } catch (error) {
      console.error("Delete Error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message || "Error in deleting car data");
      } else {
        alert("Network error. Please try again.");
      }
    }
  };

  const handleUpdate = (carId) => {
    setEditMode(true);
    setSelectedCarId(carId);

    const selectedCar = carData.find((car) => car._id === carId);
    if (selectedCar) {
      setFormData({
        title: "",
        color: "white",
        size: "",
        category: "",
        desc: "",
        price: "",
        img: "",
      });
    }
  };

  const handleFileChange = (e) => {
    setFilesToUpload(Array.from(e.target.files)); // Store files to upload later
  };

  const uploadImages = async () => {
    const uploadedUrls = []; // Array to hold uploaded image URLs

    const uploadPromises = filesToUpload.map(async (file) => {
      const imageFormData = new FormData();
      imageFormData.append("file", file);

      try {
        const response = await axios.post(
          `https://backend.hirecardrive.com/api/upload/listImages`,
          imageFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Image uploaded successfully:", response.data);

        // Check if response has the correct structure
        if (
          response.data &&
          response.data.body &&
          Array.isArray(response.data.body)
        ) {
          // Iterate through the body array to get img_urls
          response.data.body.forEach((imageData) => {
            if (imageData.img_url) {
              uploadedUrls.push(imageData.img_url); // Push the URL to the array
            }
          });
        } else {
          console.error("Unexpected response structure:", response.data);
          alert("Image upload failed. Please try again.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image. Please try again.");
      }
    });

    await Promise.all(uploadPromises); // Wait for all uploads to complete

    console.log("Uploaded URLs:", uploadedUrls); // Add debugging info
    // setUploadedImageUrls(uploadedUrls);
    console.log("Images URL : ", uploadedImageUrls);
    return uploadedUrls;
  };

  return (
    <>
      {loading ? (
        <div />
      ) : (
        <Container>
          <Sidebar />
          <FormWrapper>
            <Form onSubmit={handleFormSubmit}>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                onChange={handleInputChange}
                value={formData.title}
              />
              <Label>Category</Label>
              <Input
                type="text"
                name="category"
                onChange={handleInputChange}
                value={formData.category}
              />
              <Label>Size</Label>
              <Input
                type="text"
                name="size"
                onChange={handleInputChange}
                value={formData.size}
              />
              <Label>price</Label>
              <Input
                type="text"
                name="price"
                onChange={handleInputChange}
                value={formData.price}
              />

              <Label>Colors:</Label>
              <Select
                name="color"
                onChange={handleInputChange}
                value={formData.color}
              >
                {[
                  "white",
                  "yellow",
                  "green",
                  "orange",
                  "red",
                  "purple",
                  "blue",
                  "brown",
                  "black",
                  "gray",
                  "silver",
                  "gold",
                  "beige",
                ].map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </Select>

              <Label>Description</Label>
              <textarea
                type="text"
                name="desc"
                onChange={handleInputChange}
                value={formData.desc}
              ></textarea>
              <Label>Image</Label>
              <Input
                type="file"
                name="img"
                onChange={handleFileChange}
                value={formData.img}
              />

              <Button type="submit">{editMode ? "Update" : "Submit"}</Button>
            </Form>

            <TableWrapper>
              <Table>
                <thead>
                  <tr>
                    <TH>ID</TH>
                    <TH>Name</TH>
                    <TH>Color</TH>
                    <TH>Actions</TH>
                  </tr>
                </thead>
                <tbody>
                  {carData?.map((car, index) => (
                    <tr key={car._id}>
                      <TD>{index + 1}</TD>
                      <TD>{car.title}</TD>
                      <TD>{car.color}</TD>
                      <TD>
                        <CarImage src={car?.img} alt={car?.title} />
                      </TD>
                      <TD>
                        <ActionButton onClick={() => handleUpdate(car._id)}>
                          Update
                        </ActionButton>
                        <ActionButton
                          delete
                          onClick={() => handleDelete(car._id)}
                        >
                          Delete
                        </ActionButton>
                      </TD>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableWrapper>
          </FormWrapper>
        </Container>
      )}
    </>
  );
}
