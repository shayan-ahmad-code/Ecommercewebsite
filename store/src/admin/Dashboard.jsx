import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { CiSearch } from "react-icons/ci";

import { GoStack } from "react-icons/go";
import axios from "axios";

import styled from "styled-components";

const SidebarWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const SidebarContainer = styled.div`
  height: 100%;
`;

const MainContent = styled.div`
  width: 100%;
  background-color: #f1f5f7;
  height: 100%;
`;

const Header = styled.div`
  padding: 0.5rem 3rem;
  box-shadow: 0px 4px 2px -2px gray;
  background-color: white;
  display: flex;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
  position: relative;
  padding: 0.25rem 1rem;
`;

const SearchIcon = styled(CiSearch)`
  position: absolute;
  top: 0.5rem;
  width: 2.25rem;
  height: 1.5rem;
  color: #b0b0b0;
`;

const SearchInput = styled.input`
  background-color: #f1f5f7;
  border-radius: 1.5rem;
  padding: 0.5rem 2.25rem;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  padding: 1.5rem 1.5rem 1.5rem 0.75rem;
  font-weight: bold;
  color: #4a5568;
`;

const StatCard = styled.div`
  padding: 1.5rem;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.75rem;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
`;

const CardTitle = styled.h1`
  color: #718096;
`;

const CardIcon = styled(GoStack)`
  font-size: 1.5rem;
  margin-top: 0.5rem;
  color: #566bd6;
`;

const CardValue = styled.h1`
  padding: 0 1rem;
  font-size: 2rem;
  padding-bottom: 1.5rem;
`;

const Percentage = styled.h1`
  background-color: #d6f3ea;
  color: #1cbf9e;
  padding: 0.25rem;
  border-radius: 0.25rem;
`;

const TableContainer = styled.div`
  margin-top: 2rem;
  padding: 2rem 1.5rem;
`;

const TableHeader = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const SearchTableInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  outline: none;
`;

const TableWrapper = styled.div`
  max-height: 600px;
  overflow-y: auto;
`;

const Table = styled.table`
  width: 100%;
  background-color: white;
  border: 1px solid #e2e8f0;
`;

const TableHead = styled.thead``;

const TableRow = styled.tr``;

const TableHeaderCell = styled.th`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
`;

const TableBody = styled.tbody``;

const TableData = styled.td`
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
`;

const ActionButton = styled.button`
  background-color: #e53e3e;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  &:hover {
    background-color: #fc8181;
  }
`;

function Dashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchOrderCars = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/product");
        const fetchedData = response.data.data;
        console.log("Car Order data:", response.data);
        console.log("Fetched Data Before Set:", fetchedData);
        setData(fetchedData);
        setIsloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response) {
          console.error("API Response Error:", error.response.data);
        }
        setIsloading(false);
      }
    };

    fetchOrderCars();
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handleDelete = async (carId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/sdfvdsvsd${carId}`
      );
      console.log("Delete Response:", response.data);
      // Fetch data again after successful deletion
      setIsloading(true);
      // fetchOrderCars();
      setIsloading(false);
    } catch (error) {
      console.error("Delete Error:", error);

      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.message || "Error in deleting card data");
      } else {
        alert("Network error. Please try again.");
      }
    }
  };

  console.log("Data: ", data);

  return (
    <>
      {isLoading ? (
        <div />
      ) : (
        <>
          <SidebarWrapper>
            <Sidebar />
            <SidebarContainer />
            <MainContent>
              <Header>
                <SearchContainer>
                  <SearchIcon />
                  <SearchInput type="search" placeholder="Search..." />
                </SearchContainer>
              </Header>

              <Title>DASHBOARD</Title>

              <div
                style={{
                  paddingLeft: "1.5rem",
                  paddingTop: "1.5rem",
                  display: "flex",
                  gap: "2rem",
                }}
              >
                <StatCard>
                  <CardHeader>
                    <CardTitle>Number of Sales</CardTitle>
                    <CardIcon />
                  </CardHeader>
                  <CardValue>90%</CardValue>
                  <hr />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      paddingTop: "1rem",
                    }}
                  >
                    <Percentage>+ 24%</Percentage>
                    <h1 style={{ color: "#718096" }}>From previous..</h1>
                  </div>
                </StatCard>

                <StatCard>
                  <CardHeader>
                    <CardTitle>Total Sale</CardTitle>
                    <CardIcon />
                  </CardHeader>
                  <CardValue>20%</CardValue>
                  <hr />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      paddingTop: "1rem",
                    }}
                  >
                    <Percentage>+ 24%</Percentage>
                    <h1 style={{ color: "#718096" }}>From previous..</h1>
                  </div>
                </StatCard>
              </div>

              <TableContainer>
                <TableHeader>Sample Table</TableHeader>
                <SearchTableInput
                  type="text"
                  placeholder="Search by username"
                />
                <TableWrapper>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Title</TableHeaderCell>

                        <TableHeaderCell>Color</TableHeaderCell>
                        <TableHeaderCell>Images</TableHeaderCell>
                        <TableHeaderCell>Price</TableHeaderCell>

                        <TableHeaderCell>Action</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.length > 0 ? (
                        data?.map((item, index) => (
                          <TableRow key={index}>
                            <TableData>{item.title}</TableData>

                            <TableData>{item.color}</TableData>
                            <TableData>
                              {item.img && item.img.length > 0 ? (
                                <img src={item.img} alt={item.title} />
                              ) : (
                                "No Image Available"
                              )}
                            </TableData>
                            <TableData>{item.size}</TableData>
                            <TableData>{item.desc}</TableData>
                            <TableData>{item.price}</TableData>

                            <TableData>
                              <ActionButton
                                onClick={() => handleDelete(item._id)}
                              >
                                Delete
                              </ActionButton>
                            </TableData>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableData colSpan="9">No data available.</TableData>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableWrapper>
              </TableContainer>
            </MainContent>
          </SidebarWrapper>
        </>
      )}
    </>
  );
}

export default Dashboard;
