import { useQuery } from "react-query";
import { useState } from "react";
import { Container, Col, Row, Image } from "react-bootstrap";
import NavBar from "./NavBar";
import ProductCard from "./Products/ProductCard";
import shoppingImage from "../images/shopping-image.jpg";
import { fetchCategories, fetchProducts } from "../api/api";
import { Product } from "../types/types";

const HomePage = () => {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const [selectedCategory, setSelectedCategory] = useState("");

  const getFilteredProducts = () => {
    if (selectedCategory) {
      return products?.filter(
        (product: Product) => product.category === selectedCategory
      );
    }
    return products;
  };

  const filteredProducts = getFilteredProducts();

  return (
    <>
      <Container className="d-flex justify-content-center flex-column">
        <Row>
          <NavBar />
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={12} sm={12} md={12}>
            <div id="welcome-div">
              <h2>Welcome to the</h2>
              <h1>E-Commerce App!</h1>
              <div id="home-image-div">
                <br />
                <Image id="shopping-img" src={shoppingImage} alt="Welcome" />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div id="item-category-div" className="my-4">
              <select
                id="item-select"
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ color: "teal" }}
              >
                <option value="">All Categories</option>
                {categories?.map((category: string) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </Col>
        </Row>
        <Row>
          {filteredProducts?.map((product: Product) => (
            <Col key={product.id} xs={12} sm={6} md={4} className="mb-4">
              <ProductCard key={product.id} product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomePage;