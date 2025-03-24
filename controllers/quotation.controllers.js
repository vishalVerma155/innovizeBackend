const Quotation = require('../models/quotation.model.js');

// Create a new quotation
const createQuotation = async (req, res) => {
    try {
        const data = req.body;
        const { yourName, email } = req.body;

        if (!yourName || yourName && yourName.trim() === "" || !email || email && email.trim() === "") {
            return res.status(404).json({ success: false, error : "Name and email are compulsary" });
        }

        const quotation = new Quotation(data);
        await quotation.save();

        if(!quotation){
            return res.status(500).json({ success: false, error : "data is not saved in database" });
        }

       return res.status(201).json({ success: true,message : "Quotation has been successfully registerd", quotation });
    } catch (error) {
        res.status(400).json({success: false, error: error.message });
    }
};

// Get all quotations
const getAllQuotation = async (req, res) => {
    try {
        const quotations = await Quotation.find();
        return res.status(201).json({ success: true, message : " All Quotation have been successfully fetched", quotations });
    } catch (error) {
         return res.status(500).json({success: false, error: error.message });
    }
};

// Get a single quotation by ID
const getSingleQuotation = async (req, res) => {
    try {
        const quotation = await Quotation.findById(req.params.id);
        if (!quotation) return res.status(404).json({ error: 'Quotation not found' });
        res.status(200).json({ success: true, quotation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Delete a quotation by ID
const deleteQuotation = async (req, res) => {
    try {
        const quotation = await Quotation.findByIdAndDelete(req.params.id);
        if (!quotation) return res.status(404).json({ error: 'Quotation not found' });
        res.status(200).json({ success: true, message: 'Quotation deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {}
