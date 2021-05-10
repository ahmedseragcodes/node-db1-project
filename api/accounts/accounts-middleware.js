const Accounts = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  
  const account = req.body;

  if(!account.name || !account.budget){
    res.status(400).json({message: "name and budget are required"});
  } else {
    if(typeof account.name !== "string"){
      res.status(400).json({message: "name of account must be a string"});
    } else {
      if(account.name.trim().length < 3 || account.name.trim().length > 100){
        res.status(400).json({message: "name of account must be between 3 and 100"});
      } else {
        if(typeof account.budget !== "number"){
          res.status(400).json({message: "budget of account must be a number"});
        } else {
          if(account.budget < 0 || account.budget>1000000){
            res.status(400).json({message: "budget of account is too large or too small"});
          } else {
            next();
          }
        }
      }
    }
  }

}

exports.checkAccountNameUnique = (req, res, next) => {
  
  const { name } = req.body;

  Accounts.getByAccountName(name.trim())
  .then((fetchedAccount)=>{
    if(fetchedAccount){
      res.status(400).json({message: "that name is taken"});
    } else {
      next();
    }
  })
  .catch((err)=>{
    res.status(500).json({message: err.message});
  })
}

exports.checkAccountId = (req, res, next) => {
  
  const { id } = req.params;

  Accounts.getById(id)
  .then((specificAccount)=>{
    if(specificAccount){
      next();
    } else {
      res.status(404).json({message: "account not found"});
    }
  })
  .catch((err)=>{
    res.status(500).json({message: err.message});
  })

}
