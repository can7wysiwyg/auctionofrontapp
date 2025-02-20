import { ApiUrl } from "../ApiUrl";

export async function CategoriesAll() {

    try {
      const response = await fetch(`${ApiUrl}/all_categories`, {
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
      console.log("Failed to fetch categories :", error);
      return null; 
    }
  }
  
  
  
  export async function CategorySingle(id) {
  
      
    try {
      const response = await fetch(`${ApiUrl}/category_single/${id}`, {
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
      console.log("Failed to fetch category:", error);
      return null; 
    }
  
  
  }
  
  