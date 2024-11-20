const fetch = require('node-fetch')
const checkSmsClassifier = async (req, res, next) => {
    const data = req.body.data;
    try {
        const response = await fetch("http://127.0.0.1:5120/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ data }),
        });

        // if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        // }

        const result = await response.json();
        console.log(result);
        // req.classifierResult = result;
        next();
    } catch (error) {
        console.error("Error in checkSmsClassifier:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

exports.checkSmsClassifier = checkSmsClassifier;