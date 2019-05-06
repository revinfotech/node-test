var express = require('express');
var router = express.Router();
var stellar = require('stellar-sdk');
var _ = require('lodash');
const wallet = require('../model/wallet');
const transaction = require('../model/transaction');

stellar.Network.useTestNetwork();
var server = new stellar.Server(process.env.STELLAR_IP);


router.get('/balance/:address', async (req, res) => {
    wallet.find({address: req.params.address}).then(result => {
        if (result.length > 0) {
            res.status(200).send(result[0])
        } else {
            server.loadAccount(req.params.address).then((data => {
                let obj = {
                    address: req.params.address,
                    balance: data.balances[0].balance
                }
                wallet.create(obj).then(resp => {
                    res.status(200).send(resp);
                })
            }))
        }
    }).catch((err => {
            res.status(400).send(err)
        })
    )

});

router.get('/transaction/:address', async (req, res, next) => {

    transaction.find({address: req.params.address}).then(result => {
        if (result.length > 0) {
            res.status(200).send(result[0])
        } else {
            server.transactions().forAccount(req.params.address).call().then((data => {
                let obj = {
                    address: req.params.address,
                    transaction_details: data.records
                };
                transaction.create(obj).then(resp => {
                    res.status(200).send(resp);
                })
            }))
        }
    }).catch((err => {
            res.status(400).send(err)
        })
    )
});


module.exports = router;




