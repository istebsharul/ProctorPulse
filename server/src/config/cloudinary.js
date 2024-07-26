const cloudinary = require('cloudinary');
const dotenv = require('dotenv');
dotenv.config({ path: './src/config/config.env' });


// console.log("api Key",process.env.PORT);

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
// cloudinary.v2.config({
//   cloud_name: 'dllddjxkf',
//   api_key: '459528631628123',
//   api_secret: 'TdJoj2MK1VPomn_evrCblBVljak',
//   secure: true,
// });

module.exports = cloudinary;
