// controllers/resturantController.js
import resturantModel from "../models/resturantModel.js";
// CREATE RESTAURANT CONTROLLER
const createResturantController = async (req, res) => {
  try {
    // TODO: Add logic to create restaurant using req.body
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
     // validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "please provide title and address",
      });
    }
    const newResturant = new resturantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    // Save the new restaurant to the database
    await newResturant.save();
    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Create restaurant controller is working",
    });
  } catch (error) {
    console.error("Error in Create Restaurant Controller:", error);
    res.status(500).json({
      success: false,
      message: "Error in creating restaurant",
      error: error.message,
    });
  }
};
// GET ALL RESTAURANTS CONTROLLER
const getAllResturantController = async (req, res) => {
  try {
    const resturants = await resturantModel.find({});
    if (!resturants) {
      return res.status(404).send({
        success: false,
        message: "No Resturant Availible",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: resturants.length,
      resturants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get ALL Resturat API",
      error,
    });
  }
};

//Get a single restaurant controller
const getResturantByIdController = async(req,res)=>{
    try{
        const resturantId = req.params.id;
         // Validate the restaurant ID
         if (!resturantId) {
            return res.status(400).send({
                success: false,
                message: "Restaurant ID is required",
            });
        }
        const resturant = await resturantModel.findById(resturantId);
        if (!resturant) {
            return res.status(404).send({
                success: false,
                message: "Restaurant not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Get Resturant By Id Controller is working",
            resturant,
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get Resturant By Id Controller",
            error,
        });
    }
}

//Delete a restaurant controller by ID
const deleteResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "No Resturant Found OR Provide Resturant ID",
      });
    }
    await resturantModel.findByIdAndDelete(resturantId);
    res.status(200).send({
      success: true,
      message: "Resturant Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in delete resturant api",
      error,
    });
  }
};

export { createResturantController, getAllResturantController, getResturantByIdController, deleteResturantController }; 
