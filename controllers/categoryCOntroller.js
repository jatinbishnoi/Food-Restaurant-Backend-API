import categoryModel from "../models/categoryModel.js";

// CREATE CATEGORY
const createCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Please provide category title",
      });
    }

    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      newCategory,
    });
  } catch (error) {
    console.error("Error in Create Category:", error);
    res.status(500).json({
      success: false,
      message: "Error in Create Category API",
      error: error.message,
    });
  }
};

// GET ALL CATEGORIES
const getAllCatController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.status(200).json({
      success: true,
      totalCat: categories.length,
      categories,
    });
  } catch (error) {
    console.error("Error in Get All Categories:", error);
    res.status(500).json({
      success: false,
      message: "Error in Get All Category API",
      error: error.message,
    });
  }
};

// UPDATE CATEGORY
const updateCatController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "No category found with the given ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      updatedCategory,
    });
  } catch (error) {
    console.error("Error in Update Category:", error);
    res.status(500).json({
      success: false,
      message: "Error in Update Category API",
      error: error.message,
    });
  }
};

// DELETE CATEGORY
const deleteCatController = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "No category found with the given ID",
      });
    }

    await categoryModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Error in Delete Category:", error);
    res.status(500).json({
      success: false,
      message: "Error in Delete Category API",
      error: error.message,
    });
  }
};

// Export all controllers
export {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
};
