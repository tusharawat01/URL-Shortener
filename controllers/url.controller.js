const {nanoid} = require('nanoid');
const URL = require("../models/url.model")

async function handleGeneratenewShortUrl(req,res){
 try {
       let { url } = req.body;
       if(!url){
           return res
           .status(400)
           .json({error: "URL is Required"})
       }

        // Manually check if the URL starts with 'http://' or 'https://'
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = `https://${url}`;
        }
   
       const shortId = nanoid(8);
       await URL.create({
           shortId: shortId,
           redirectUrl: url,
           visitHistory: []
       });

       console.log("Short ID created Successfully: ",shortId )
   
       return res
       .status(201)
       .json({
           message: "Short ID created successfully",
           shortId,
       });
 } catch (error) {
    console.log("Error occured while creating ShortID: ", error)
    return res
    .status(500)
    .json({message: "Error occured while creating ShortID"})
    
 }
}

async function handleRedirectToUrl(req,res){
   try {
     const shortId = req.params.shortId;
     if(!shortId){
         return res
         .status(400)
         .json({message: "Send shortId as a params"})
     }

    // Get the current date and time in UTC
    const now = new Date();
    
    // Manually add 5 hours and 30 minutes to get IST
    now.setHours(now.getHours() + 5);
    now.setMinutes(now.getMinutes() + 30);

    // Save as ISO string
    const timestamp = now.toISOString(); 
    
    const result = await URL.findOneAndUpdate({
         shortId
     },{ $push: { 
         visitHistory: {
            timestamp
        }
     }});

     console.log("RESULT: ",result)
 
    if(!result?.redirectUrl){
        console.log("Invalid shortId in params")
        return res
            .status(401)
            .json({message: "Invalid shortId in params"})
     }
 
     res.redirect(result.redirectUrl);

     console.log("Successfully Redirect to a URL");
   } catch (error) {
    console.log("Redirect to a URL using shortid failed :",error)
    return res
    .status(500)
    .json({message: "Redirect to URL Failed"})
   }
}

async function handleDeleteAllUrl(req, res) {
    try {
        const result = await URL.deleteMany({});

        console.log("All URLs deleted: ", result);
        return res
            .status(200)
            .json({
                message: "All URLs deleted successfully",
                deletedCount: result.deletedCount,
        });
    } catch (error) {
       
        console.log("Error occurred while deleting all URLs: ", error);
        return res
            .status(500)
            .json({
                message: "Error occurred while deleting all URLs",
        });
    }
}

module.exports = { handleGeneratenewShortUrl, handleRedirectToUrl, handleDeleteAllUrl }