const mongoose = require('mongoose');

const QuotationSchema = new mongoose.Schema({
    yourName: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    projectCategory: {
        type: String,
    },
    projectName: {
        type: String,
    },
    projectDesign: {
        type: String,
    },
    field1: {
        type: String,
    },
    field2: {
        type: String,
    },
    field3: {
        type: String,
    }
}, { timestamps: true });

const Quotation = mongoose.model('Quotation', QuotationSchema);

module.exports = Quotation;
