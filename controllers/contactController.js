const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")

//@desc Get All Contacts
//@route GET /api/contacts
//@access PRIVATE

const getContact = asyncHandler(async (req,res)=>{
    //res.send("Get all contacts")
    const contacts = await Contact.find({user_id: req.user.id})
    res.status(200).json(contacts)
});

//@desc Get Contact by id
//@route GET /api/contacts/:id
//@access PRIVATE

const getContactById = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found")
    }
    res.status(200).json(contact)
});

//@desc Create a contact
//@route POST /api/contacts/
//@access PRIVATE

const createContact = asyncHandler(async (req,res)=>{
    //res.send("Get all contacts")
    console.log("createContact: ", req.body)
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory.")
    }
    const user_id = req.user.id
    const contact = await Contact.create(
        {
            name, 
            email, 
            phone,
            user_id
        }
    )
    res.status(201).json(contact)
});

//@desc Update a contact
//@route PUT /api/contacts/:id
//@access PRIVATE

const updateContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User dont have permission to update other users contact")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedContact)
});

//@desc delete a contact
//@route DELETE /api/contacts/:id
//@access PRIVATE

const deleteContact = asyncHandler(async (req,res)=>{
    //res.send("Get all contacts")
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User dont have permission to update other users contact")
    }

    await Contact.deleteOne({_id: req.params.id})
    res.status(200).json(contact)
});


module.exports = { getContact, getContactById, createContact, updateContact, deleteContact }