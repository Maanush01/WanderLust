const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const ListingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//ListingSchema validation as middleware

router
  .route("/")
  .get(wrapAsync(ListingController.index))
  .post(
    isLoggedIn,
    validateListing,
    upload.single("listing[image]"),
    wrapAsync(ListingController.addListing)
  );

//index route
// router.get('/', wrapAsync(ListingController.index));

//new list route
router.get("/new", isLoggedIn, ListingController.newListing);

//add list route                          //Using Schema Validator as a MiddleWare(validateListing)
// router.post('/', validateListing, wrapAsync(ListingController.addListing
// let result = listingSchema.validate(req.body);  //This is with the help of Joi!
// if(result.error){                               //Throws error for individual field
//     throw new ExpressError(400, result.error);
// }

// if(!req.body.listing){                     //Throws error only this entire listing data is not sent
//     throw new ExpressError(400, "Send valid data for Listing");
// }

// let { title:newTitle, description:newDescription, price:newPrice, location:newLocation, country:newCountry }= req.body;
// const listing1 = new Listing({
//     title:newTitle,
//     description:newDescription,
//     price:newPrice,
//     location:newLocation,
//     country:newCountry,
// });
// await listing1.save();                        //(More easier way)

// try{
//     const newListing = new Listing(req.body.listing);
//     await newListing.save();
//     res.redirect('/listings');            //TRY & CATCH can also be used for Error Handling
// }catch(err){
//     next(err);
// }
// ));

router
  .route("/:id")
  .get(wrapAsync(ListingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(ListingController.updateListing)
  );

//show list route
// router.get('/:id', wrapAsync(ListingController.showListing));

//edit list route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(ListingController.editListing)
);

//update list route
// router.put('/:id',isLoggedIn, isOwner, validateListing, wrapAsync(ListingController.updateListing));

//delete list route
router.delete(
  "/:id/delete",
  isLoggedIn,
  isOwner,
  wrapAsync(ListingController.destroyListing)
);

module.exports = router;
