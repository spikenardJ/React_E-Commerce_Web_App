import { Product, CreateProductInput } from "../../types/types";

interface ProductFormProps {
  product: Product | CreateProductInput;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCancel: () => void;
  isLoading: boolean;
  submitButtonText: string;
  loadingButtonText: string;
  isSubmitting: boolean;
}

const ProductForm = ({
  product,
  onSubmit,
  onChange,
  onCancel,
  isLoading,
  submitButtonText,
  loadingButtonText
}: ProductFormProps) => {
  // Type guard to check if the product has an `id`
  const isExistingProduct = (product: Product | CreateProductInput): product is Product => {
    return (product as Product).id !== undefined;
  };

  return (
    <div style={{ border: "1px solid black", borderRadius: "10px", boxShadow: "0 0 4px black", paddingTop: "30px", paddingBottom: "40px", backgroundColor: "azure" }} className="container mt-4">
      <div style={{ borderRadius: "10px", backgroundColor: "azure" }}>
        <div style={{ marginBottom: "30px", borderRadius: "10px", padding: "10px", backgroundColor: "teal"}} className="card-header text-center text-white">
          <h4 className="mb-0">{isExistingProduct(product) ? "Edit Product" : "Create Product"}</h4>
        </div>
        <div className="card-body">
          <form id="product-form" onSubmit={onSubmit}>
            <div style={{ marginLeft: "15%" }}>
              <div className="mb-3">
                <label className="form-label">Product Name</label>
                <input
                  style={{ width: "80%" }}
                  type="text"
                  className="form-control"
                  name="title"
                  value={product.title}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  style={{ width: "80%" }}
                  type="text"
                  className="form-control"
                  name="description"
                  value={product.description}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  style={{ width: "80%" }}
                  type="number"
                  className="form-control"
                  name="price"
                  min="0"
                  step="0.01"
                  value={product.price}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input
                  style={{ width: "80%" }}
                  type="url"
                  className="form-control"
                  name="image"
                  value={product.image}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <input
                  style={{ width: "80%" }}
                  type="text"
                  className="form-control"
                  name="category"
                  value={product.category}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            <div style={{ marginTop: "30px" }}>
              <button
                style={{ width: "100%" }}
                type="submit"
                className="btn btn-secondary"
                disabled={isLoading}
              >
                {isLoading ? loadingButtonText : submitButtonText}
              </button>
              <button
                style={{ width: "100%", marginTop: "10px" }}
                type="button"
                className="btn btn-outline-secondary"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
