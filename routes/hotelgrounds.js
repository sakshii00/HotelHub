const express=require('express');
const router=express.Router();

const wrapAsync=require('../utils/wrapAsync');

const ExpressErrors = require('../utils/expresserrors');

const hotelground = require('../models/hotelground');
const {hschema} =require('../joischema.js')
const { isLoggedIn } = require('../middleware');

const validateHotel=(req,res,next)=>{
    console.log(req.body);
    console.log(hschema);
    const {error} =hschema.validate(req.body)
    console.log(error);
    if(error){
        const msg=error.details.map(el=> el.message).join(',')
        throw new ExpressErrors(msg,400);
    } else{
        next();
    }
}

router.get('/',wrapAsync(async (req,res)=>{
    const hotels=await hotelground.find({});
    res.render('hotelgrounds/index',{hotels});
}))

//new
router.get('/new',isLoggedIn,(req,res)=>{
    res.render('hotelgrounds/new');
})
router.post('/', isLoggedIn, validateHotel, wrapAsync(async (req,res)=>{    
    const h=new hotelground(req.body.hotel);
    h.author = req.user._id;
    await h.save();
    req.flash('success', 'Successfully added a new hotel!');
    res.redirect(`/hotels/${h.id}`)
}));

//show
router.get('/:id',wrapAsync(async (req,res)=>{
    const {id}= req.params;
    const hotel = await hotelground.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    
    res.render('hotelgrounds/show',{hotel});
}))


//edit
router.get('/:id/edit',isLoggedIn, wrapAsync(async (req,res)=>{
    const{id}= req.params;
    const h=await hotelground.findById(id);
    res.render('hotelgrounds/edit',{h});
}))

router.put('/:id',validateHotel, wrapAsync(async (req,res)=>{
   const {id}=req.params;
   const hotel=await hotelground.findByIdAndUpdate(id,{...req.body.hotel})
   req.flash('success','successfully updated hotel!')
   res.redirect(`/hotels/${hotel.id}`)
}))


//delete
router.delete('/:id',isLoggedIn, wrapAsync(async(req,res)=>{
   
    const {id}=req.params;
   const h=await hotelground.findByIdAndDelete(id);
   req.flash('success', 'Hotel deleted!')
   res.redirect('/hotels');

}))

module.exports=router;