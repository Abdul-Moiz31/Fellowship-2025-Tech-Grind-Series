import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct } from '../redux/slices/productsSlice';

export default function Products() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  const [form, setForm] = useState({ name: '', price: '' });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;

    const newProduct = {
      id: Date.now(),
      name: form.name,
      price: Number(form.price),
    };

    dispatch(addProduct(newProduct));
    setForm({ name: '', price: '' });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Products</h2>

      <form onSubmit={handleAddProduct} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Product Name"
          onChange={handleInputChange}
          style={{ marginRight: 8, padding: 4 }}
        />
        <input
          type="number"
          name="price"
          value={form.price}
          placeholder="Price"
          onChange={handleInputChange}
          style={{ marginRight: 8, padding: 4 }}
        />
        <input
          type="submit"
          value="Add Product"
          style={{ padding: '4px 12px', backgroundColor: '#1976d2', color: 'white', border: 'none', cursor: 'pointer' }}
        />
      </form>

      {status === 'loading' && <p>Loading products...</p>}
      {status === 'failed' && <p style={{ color: 'red' }}>Error: {error}</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((product) => (
          <li key={product.id} style={{ marginBottom: '1rem' }}>
            <strong>{product.name}</strong> — Rs. {product.price.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
