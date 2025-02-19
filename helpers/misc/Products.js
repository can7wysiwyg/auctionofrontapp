import { ApiUrl } from "../ApiUrl";

export async function ProductsAll() {

    try {
      const response = await fetch(`${ApiUrl}/public/products_show`, {
        method: "GET",
        headers: {
          
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
  
  
      return await response.json();
    } catch (error) {
      console.log("Failed to fetch products :", error);
      return null; 
    }
  }
  
  
  
  export async function ProductSingle(id) {
  
      
    try {
      const response = await fetch(`${ApiUrl}/public/product/${id}`, {
        method: "GET",
        headers: {
  
          "Content-Type": "application/json",
        },
        cache: "no-store",
  
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
  
  
      return await response.json(); 
  
  } catch (error) {
      console.log("Failed to fetch product:", error);
      return null; 
    }
  
  
  }
  
  