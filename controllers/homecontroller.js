const axios = require('axios');
const filedata = require('../data.json');
let price,postoffice;


module.exports.home = function (req, res) {
    res.render('_home', {
        price: price,
        postoffice:postoffice
    });
    value = "";
    postoffice="";
    return;
    //   console.log(filedata.Assam);

}
module.exports.details = function (req, res) {
    let apistate = "";
    const pin = req.body.pincode;
    var url = "https://api.postalpincode.in/pincode/" + pin;
    axios.get(url)
        .then(response => {
            //console.log(response);
            if (response.data[0].Status == 'Error') {
                req.flash('error', 'you have entered a wrong pincode');
                return res.redirect('/');
            }

            console.log(response.data[0]. PostOffice[0]);
            apistate = response.data[0].PostOffice[0].Circle;
            let floatnumber = parseFloat(req.body.number);
            // console.log(apistate);
            if (filedata.hasOwnProperty(apistate)) {
                // console.log(filedata[apistate]);
                if (req.body.select = "Forward") {
                    var x = 40.02 + filedata[apistate] +parseFloat( floatnumber.toFixed(2));
                    console.log(typeof floatnumber);
                } else {
                    var x = 70.00 + filedata[apistate] + floatnumber;
                }

                req.flash('success', 'pincode is available for delivary');
                price = x;
                postoffice=response.data[0].PostOffice[0].  Name;
                console.log(postoffice);
                return res.redirect('/');
            } else {
                req.flash('error', 'Pincode not available for delivary');
                console.log("not ");
            }
        })
        .catch(error => {
            console.log(error);
            req.flash('error', 'API fetch Error');
            return res.redirect('/');
        });

}

