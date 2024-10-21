import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Styled components
const IconContainer = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 10px;
  min-width: 280px;
  max-width: 300px;
  height: 350px;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-color: #1e1f24;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);

    ${IconContainer} {
      opacity: 1;
    }
  }
`;

const Image = styled.img`
  height: 60%;
  width: 100%;
  object-fit: cover;
  border-bottom: 1px solid #e0e0e0;
`;

const Details = styled.div`
  padding: 10px;
  color: white;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Info = styled.div`
  font-size: 14px;
  color: #bbb;
  margin-bottom: 5px;
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #e31b21;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = (props) => {
  const key = props?.item?._id;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/productPage/" + key);
  };

  const addToCart = (pid) => {
    const headers = new Headers();
    const t = JSON.parse(localStorage.getItem("user"));
    headers.append("token", t.accessToken);

    const formData = new URLSearchParams();
    formData.append("productId", pid);

    fetch("http://localhost:4000/api/add", {
      method: "post",
      body: formData,
      headers: headers,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.includes("error")) {
          toast(result);
          return;
        }
        props?.props?.setMainFlag(!props?.props?.mainFlag);
        toast("Successfully added to cart");
      })
      .catch(() => {
        toast("Error occurred adding to cart!");
      });
  };

  const searchSimilar = (e) => {
    e.stopPropagation();
    console.log("Searching similar products");
  };

  const addToFav = (e) => {
    e.stopPropagation();
    toast("Added to favorites!");
  };

  return (
    <Container key={props?.item?._id} onClick={handleClick}>
      <Image src={props?.item?.img} alt={props?.item?.title} />
      <Details>
        <Title>{props?.item?.title}</Title>
        <Info>{props?.item?.category}</Info>
        <Info>{props?.item?.color}</Info>
        <Info>{props?.item?.size}</Info>
        <Price>${props?.item?.price}</Price>
      </Details>
      <IconContainer>
        <Icon
          onClick={(e) => {
            e.stopPropagation();
            addToCart(props?.item?._id);
          }}
        >
          <ShoppingCartIcon />
        </Icon>
        <Icon onClick={searchSimilar}>
          <SearchIcon />
        </Icon>
        <Icon onClick={addToFav}>
          <FavoriteBorderIcon />
        </Icon>
      </IconContainer>
    </Container>
  );
};

export default Product;
