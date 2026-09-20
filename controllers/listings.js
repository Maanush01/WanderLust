const Listing = require("../models/listing");
const NodeGeocoder = require('node-geocoder');

// Nominatim (OpenStreetMap's free geocoder) requires a real, identifying
// User-Agent — requests with a generic/default one are silently rejected
// (empty results, no error), which is why geocoding can quietly fail.
const options = {
    provider: 'openstreetmap',
    httpAdapter: 'https',
    formatter: null,
    fetch: function customFetch(url, opts) {
        return fetch(url, {
            ...opts,
            headers: { ...(opts && opts.headers), 'user-agent': 'WanderLustApp/1.0' },
        });
    },
};

const geocoder = NodeGeocoder(options);

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listing/index.ejs",{allListings});
};

module.exports.newListing = (req, res)=>{
    res.render("listing/addNewList.ejs");
};

module.exports.addListing = async (req,res)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner=req.user._id;
    newListing.image = {url,filename};
    
    // Geocode the location
    try {
        const geoData = await geocoder.geocode(req.body.listing.location + ', ' + req.body.listing.country);
        if (geoData && geoData.length > 0) {
            newListing.geometry = {
                type: 'Point',
                coordinates: [geoData[0].longitude, geoData[0].latitude]
            };
        }
    } catch (err) {
        console.log("Geocoding error:", err);
    }
    
    await newListing.save();
    req.flash("success","New Listing Added!");
    res.redirect('/listings');
};

module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
    const listDetails= await Listing.findById(id).populate({ path : "review", populate : { path : "author", },}).populate("owner");
    if(!listDetails){
        req.flash("error","Listing does not exist");
        return res.redirect("/listings")
    }
    res.render("listing/show.ejs",{listDetails});
};

module.exports.editListing = async (req, res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing does not exist");
        return res.redirect("/listings")
    }
    let originalImageUrl = listing.image.url;            //only works for the images already uploaded on the cloudinary
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("listing/edit.ejs", {listing, originalImageUrl});
};

module.exports.updateListing = async (req, res)=>{
    let {id}=req.params; 
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});  
    
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
    }
    
    // Geocode the updated location
    try {
        const geoData = await geocoder.geocode(req.body.listing.location + ', ' + req.body.listing.country);
        if (geoData && geoData.length > 0) {
            listing.geometry = {
                type: 'Point',
                coordinates: [geoData[0].longitude, geoData[0].latitude]
            };
        }
    } catch (err) {
        console.log("Geocoding error:", err);
    }
    
    await listing.save();    
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async(req, res)=>{
    let {id}= req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
};