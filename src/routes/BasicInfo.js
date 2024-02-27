module.exports = (app) => {
    const basicInfo = require("../controllers/BasicInfo");
  
    var router = require("express").Router();
  
    router.get("/healthRecord/:healthRecordId", basicInfo.findBasicInfoByHealthRecord);
    router.get("/", basicInfo.findAllBasicInfos);
    router.get("/:id", basicInfo.findBasicInfoById);
  
    router.post("/", basicInfo.createBasicInfo);
    router.put("/:id", basicInfo.updateBasicInfo);
    router.delete("/:id", basicInfo.deleteBasicInfoById);
  
    app.use("/api/basicInfo", router);
  };