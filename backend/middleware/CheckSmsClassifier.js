const axios = require('axios');

const checkSmsClassifier = async (req, res, next) => {
    const data = req.body.data;
    try {
        const response = await axios.post("http://127.0.0.1:5120/predict", { data });

        console.log(response.data);
        next();
    } catch (error) {
        console.error("Error in checkSmsClassifier:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

exports.checkSmsClassifier = checkSmsClassifier;