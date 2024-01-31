const express = require("express");
const app = express();
app.use(express.json());

const user = [{
    name: "john",
    kidneys: [{
        healthy: false
    }]
}]

app.get("/", function(req, res){
    const allKidneys = user[0].kidneys;
    const totalNoOfKidneys = user[0].kidneys.length;
    let healthyKidneys = 0;

    for(let i=0; i<totalNoOfKidneys; i++){
        if(allKidneys[i].healthy === true){
            healthyKidneys++;
        }
    }

    const totatNoOfUnheathyKidneys = totalNoOfKidneys - healthyKidneys;

    res.json({
        Kidneys: totalNoOfKidneys,
        Healthy_Kidneys: healthyKidneys,
        Unhealty_Kidneys: totatNoOfUnheathyKidneys
    });
})

app.post("/", function(req, res){
    console.log(req.body);
    const isHealthy = req.body.isHealthy;
    user[0].kidneys.push({
        healthy: isHealthy
    });

    res.json({
        msg: "Done!"
    });
})

app.put("/", function(req, res){
    for(let i=0; i<user[0].kidneys.length; i++){
        user[0].kidneys[i] = true;
    }

    res.json({
        msg:""
    })
})


app.delete("/", function(req, res){
    const newKidneys = [];
    for(let i=0; i<user[0].kidneys.length; i++){
        if(user[0].kidneys.healthy){
            newKidneys.push({
                healthy: true
            })
        }
    }

    user[0].kidneys = newKidneys;

    res.json({
        msg: "Deleted!"
    })
})

app.listen(3000);