const fs = require('fs');
// import polotno-node API
const { createInstance } = require('polotno-node');


exports.run = async function (req, res, next) {
  const jsonFileName = req.body.jsonFile;
  const bedNumber = req.body.bedNumber;
  const bathNumber = req.body.bathNumber;
  const carNumber = req.body.carNumber;
  const streetAddress = req.body.streetAddress;
  const subburb = req.body.subburb;
  const priceview = req.body.priceview;


    // create working instance
    const instance = await createInstance({
      // to create your own API key please go here: https://polotno.com/cabinet
      key: 'nFA5H9elEytDyPyvKL7T',
    });

    // load sample json
    let jsonFileObj = fs.readFileSync(jsonFileName + '.json');
    let canvasObj = JSON.parse(jsonFileObj);
    let children = canvasObj.pages[0].children;
    // console.log("Children Count:", children.length);
    children.forEach(child => {
      // console.log(child);
      switch(child.name) {
        case 'Bath Count':
          child.text = bathNumber;
          break;
        case 'Bed Count':
          child.text = bedNumber;
          break;
        case 'Car Count':
          child.text = carNumber;
          break;
        case 'Street Address':
          child.text = streetAddress;
          break;
        case 'Suburb':
          child.text = subburb;
          break;
        case 'PriceView':
          child.text = priceview;
          break;
      }
    });
    
    const jpegImage = await instance.jsonToImageBase64(canvasObj, {
      pixelRatio: 0.5, // make image twice smaller
      mimeType: 'image/jpeg',
    });
    // fs.writeFileSync('template.jpg', jpegImage, 'base64');

    // close instance
    instance.close();

  return res.status(200).json({ status: 'success', data: jpegImage});
};

exports.templateView = async function (req, res, next) {
      const jsonFileName = req.body.jsonFile;

      // create working instance
      const instance = await createInstance({
        // to create your own API key please go here: https://polotno.com/cabinet
        key: 'nFA5H9elEytDyPyvKL7T',
      });

      // load sample json
      let jsonFileObj = fs.readFileSync(jsonFileName + '.json');
      let jsonStr = String(jsonFileObj);
      // jsonStr = jsonStr.replace("SUNDAY", "FRIDAY");
      const json = JSON.parse(jsonStr);
      //  console.log(json);

      
      const jpegImage = await instance.jsonToImageBase64(json, {
        pixelRatio: 0.5, // make image twice smaller
        mimeType: 'image/jpeg',
      });
      // fs.writeFileSync('template.jpg', jpegImage, 'base64');

      // close instance
      instance.close();

    return res.status(200).json({ status: 'success', data: jpegImage});
  // });
};