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
    serviceName: {
        type: String,
    },
    projectDays: {
        type: Number,
    },
    projectBudget: {
        type: Number,
    }
}, { timestamps: true });

const Quotation = mongoose.model('Quotation', QuotationSchema);

module.exports = Quotation;
