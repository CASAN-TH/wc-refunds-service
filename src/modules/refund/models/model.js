'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RefundSchema = new Schema({
    // name: {
    //     type: String,
    //     required: 'Please fill a Refund name',
    // },
    amount: {
        type: String,
    },
    reason: {
        type: String,
    },
    refunded_by: {
        type: Number,
    },
    refunded_payment: {
        type: Boolean,
    },
    line_items: {
        type: [{
            id: {
                type: Number,
            },
            name: {
                type: String,
            },
            product_id: {
                type: Number,
            },
            variation_id: {
                type: Number,
            },
            quantity: {
                type: Number,
            },
            tax_class: {
                type: Number,
            },
            subtotal: {
                type: String,
            },
            subtotal_tax: {
                type: String,
            },
            total: {
                type: String,
            },
            total_tax: {
                type: String,
            },
            taxes: {
                type: [{
                    id: {
                        type: Number,
                    },
                    total: {
                        type: String,
                    },
                    subtotal: {
                        type: String,
                    }
                }]
            },
            sku: {
                type: String,
            },
            price: {
                type: String,
            }
        }]
    },
    api_refund: {
        type: Boolean,
        default: true
    },
    



    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

mongoose.model("Refund", RefundSchema);