export const testUserController = (req, res) => {
  try {
    res.status(200).json({
      message: "Test user controller is working",
      success: true
    });
  } catch (error) {
    console.error("Error in testUserController:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};
