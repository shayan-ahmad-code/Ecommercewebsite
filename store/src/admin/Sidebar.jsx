import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdOutlineDashboardCustomize,
  MdOutlineViewModule,
} from "react-icons/md"; // Import necessary icons
import styled from "styled-components"; // Import styled-components

// Styled Components
const SidebarContainer = styled.div`
  display: flex;
`;

const SidebarWrapper = styled.div`
  width: ${(props) => (props.open ? "13rem" : "5rem")};
  background-color: #0f2458;
  height: 100%;
  padding: 1.25rem 0.625rem;
  padding-top: 2rem;
  position: relative;
  transition: width 0.3s;
  border-radius: 0 1rem 1rem 0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const SidebarTitle = styled.h1`
  color: white;
  font-size: 1.25rem;
  font-weight: 500;
  transform-origin: left;
  transition: transform 0.2s;
  transform: ${(props) => (!props.open ? "scale(0)" : "scale(1)")};
`;

const SidebarLink = styled(Link)`
  color: #d1d5db;
  font-size: 1.125rem;
  margin-left: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  transition: color 0.3s;

  &:hover {
    color: white;
  }
`;

const IconWrapper = styled.div`
  margin-right: 0.5rem;
`;

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <SidebarContainer>
      <SidebarWrapper open={open}>
        <Link to="/">
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <SidebarTitle open={open}>Hire Car</SidebarTitle>
          </div>
        </Link>
        <SidebarLink to="/dashboard">
          <IconWrapper>
            <MdOutlineDashboardCustomize />
          </IconWrapper>
          Dashboard
        </SidebarLink>
        <SidebarLink to="/dashboard/addcar">
          <IconWrapper>
            <MdOutlineViewModule />
          </IconWrapper>
          Add Shop Items
        </SidebarLink>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
