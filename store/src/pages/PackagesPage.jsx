import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcements from "../components/Announcements";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner"; // Make sure this is installed

// Styled components
const Container = styled.div`
  color: #e31b21;
`;

const Title = styled.h1`
  margin: 20px;
  text-align: center;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  background-color: grey;
  color: white;
  margin-right: 20px;
`;

const Option = styled.option`
  color: black;
`;

const Packages = (props) => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("67169600da32440697d3e43a"); // Default shop ID

  useEffect(() => {
    fetch("http://localhost:4000/api/product", {
      method: "get",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch packages");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching packages:", error);
      });
  }, []);

  // Filter the products based on the selected shop ID
  const filteredProducts = data.filter((product) => product.shopId === filter);

  return (
    <Container>
      <Navbar props={props} setData={setData} />
      <Announcements />
      <Title>Packages</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Select Shop:</FilterText>
          <Select onChange={(e) => setFilter(e.target.value)} value={filter}>
            <Option value="67169600da32440697d3e43a">Shop 1</Option>
            <Option value="6716961eda32440697d3e43e">Shop 2</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <ThreeDots
        wrapperClass="react-spinner"
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        visible={data.length === 0}
      />
      <Products
        props={props}
        products={filteredProducts.sort((a, b) => {
          if (filter === "6716961eda32440697d3e43e") {
            return a.price - b.price;
          } else if (filter === "67169600da32440697d3e43a") {
            return b.price - a.price;
          } else {
            let first = new Date(a.updatedAt);
            let second = new Date(b.updatedAt);
            return second.getTime() - first.getTime();
          }
        })}
      />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Packages;
