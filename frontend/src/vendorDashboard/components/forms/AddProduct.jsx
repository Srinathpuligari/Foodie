import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState([]);
    const [bestSeller, setBestSeller] = useState(false);
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        if (category.includes(value)) {
            setCategory(category.filter((item) => item !== value));
        } else {
            setCategory([...category, value]);
        }
    };

    const handleImageUpload = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
    };

    const handleBestSeller = (event) => {
        const value = event.target.value === 'true';
        setBestSeller(value);
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const firmId = localStorage.getItem('firmId');
            const loginToken = localStorage.getItem('login-token');

            if (!loginToken || !firmId) {
                console.error("User not authenticated");
                alert("You are not logged in. Please log in and try again.");
                return;
            }

            const formData = new FormData();
            formData.append('productName', productName);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('bestSeller', bestSeller);

            if (image) {
                formData.append('image', image);
            }

            category.forEach((value) => {
                formData.append('category', value);
            });

            // Log FormData for debugging
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${loginToken}`,
                },
            });

            const data = await response.json();
            if (response.ok) {
                alert("Product added successfully");
                setProductName("");
                setPrice("");
                setDescription("");
                setCategory([]);
                setBestSeller(false);
                setImage(null);
            } else {
                console.error(data.message);
                alert("Failed to add product");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to add product");
        }
    };

    return (
        <div className="firmSection">
            <form className="tableForm" onSubmit={handleAddProduct}>
                <h3>Add Product</h3>
                <label>Product Name</label>
                <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <label>Price</label>
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <div className="checkInp">
                <label>Category</label>
                <div className="inputsContainer">
                <div className="checkboxContainer">
                    
                <label>Veg</label>
                <input type="checkbox" value="veg" onChange={handleCategoryChange} />&nbsp;&nbsp;&nbsp;&nbsp;
                
                <label>Non-Veg</label>
                <input type="checkbox" value="non-veg" onChange={handleCategoryChange} /> 
                </div>
                </div>
                </div>
                <label>BestSeller</label>
                <div className='checkboxer'>
                    <label>Yes</label>
                <input type="radio" value="true" checked={bestSeller === true} onChange={handleBestSeller} />
                <label>No</label>
                <input type="radio" value="false" checked={bestSeller === false} onChange={handleBestSeller} /> 
                </div>
                <label>Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                <label>Product Image</label>
                <input type="file" onChange={handleImageUpload} />
                <br />
                <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
            </form>
        </div>
    );
};

export default AddProduct;
