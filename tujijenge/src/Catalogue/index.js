import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import ProductToggle from "./components/ProductToggle";
import ProductCard from "./components/ProductCard";
import AddUpdateModal from "./components/AddUpdate";
import Button from '../sharedComponents/Button';
import "./style.css";
import { useFetchProducts } from "../hooks/useFetchProducts";

const baseUrl = process.env.REACT_APP_BASE_URL;

function CatalogueScreen() {
  const [selectedCategory, setSelectedCategory] = useState("VEG");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [productToEdit, setProductToEdit] = useState(null);

  const { loading, error, products, refetch } = useFetchProducts();

  const filteredProducts = products.filter(
    p =>
      p.category === selectedCategory &&
      p.product_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    setModalMode("add");
    setProductToEdit(null);
    setModalOpen(true);
  };

  const handleUpdate = product => {
    setModalMode("update");
    setProductToEdit(product);
    setModalOpen(true);
  };

  const handleSave = async (productData) => {
    try {
      let url = '';
      let method = '';
      if (modalMode === "add") {
        url = `${baseUrl}products/`;
        method = "POST";
      } else {
        url = `${baseUrl}products/${productData.product_id}/`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Token ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.detail || "Failed to add/update product");
      }

      await refetch();
      setModalOpen(false);
    } catch (err) {
      alert("Error updating product: " + err.message);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await fetch(`${baseUrl}products/${productId}/`, {
        method: "DELETE",
        headers: {
          'Authorization': `Token ${localStorage.getItem("token")}`,
        },
      });
      await refetch();
      setModalOpen(false);
    } catch (err) {
      alert("Error deleting product: " + err.message);
    }
  };

  return (
    <div>
      <div className="catalogue-content">
        <SearchBar
          value={search}
          onChange={e => setSearch(e.target.value)}
          onSearch={() => {}}
        />
        <div className="catalogue-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <ProductToggle
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
          <Button
            label={`Add ${selectedCategory === "VEG" ? "Vegetable" : "Fruit"}`}
            onClick={handleAdd}
            variant="secondary"
          />
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div style={{color:'red'}}>{error}</div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.product_id}
                product={product}
                onUpdate={() => handleUpdate(product)}
              />
            ))}
          </div>
        )}
        {modalOpen && (
          <AddUpdateModal
            mode={modalMode}
            product={productToEdit}
            category={selectedCategory}
            onSave={handleSave}
            onRemove={handleRemove}
            onClose={() => setModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default CatalogueScreen;