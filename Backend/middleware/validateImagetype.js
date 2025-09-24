const fs = require('fs');
const { fromBuffer } = require('file-type');

const validateImageType = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const filePath = req.file.path;

    // Read the file into a buffer
    const buffer = fs.readFileSync(filePath);

    // Get the actual file type
    const type = await fromBuffer(buffer);

    console.log("Detected file type:", type);

    const allowedTypes = ['image/jpeg', 'image/png'];

    if (!type || !allowedTypes.includes(type.mime)) {
      return res.status(400).json({ msg: "Invalid file type" });
    }

    next();

  } catch (err) {
    console.error("Image validation failed:", err);
    return res.status(500).json({ msg: "Internal server error during image validation" });
  }
};

module.exports = { validateImageType };
