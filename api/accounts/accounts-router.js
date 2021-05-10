const router = require('express').Router()
const Accounts = require("./accounts-model");
const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require("./accounts-middleware");

//ENDPOINTS

//[GET] All Accounts 

router.get('/', (req, res, next) => {
  
  Accounts.getAll()
  .then((allAccts)=>{
    res.status(200).json(allAccts);
  })
  .catch((err)=>{
    res.status(500).json({message: err.message});
  })

})

//[GET] Account By Id 

router.get('/:id', checkAccountId, (req, res, next) => {
  
  const { id } = req.params;

  Accounts.getById(id)
  .then((specificAccount)=>{
    res.status(200).json(specificAccount[0]);
  })
  .catch((err)=>{
    res.status(500).json({message: err.message});
  })
})

//[GET] Account By Account Name

router.get("/:name", (req, res, next)=>{

  const { name } = req.params;

  Accounts.getByAccountName(name)
  .then((namedAcct)=>{
    res.status(200).json(namedAcct)
  })
  .catch((err)=>{
    res.status(500).json({message: err.message});
  })

})

//[POST] New Account

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  
  const newAccount = req.body;

  Accounts.create(newAccount)
  .then((newAccountResult)=>{
    res.status(201).json(newAccountResult[0]);
  })
  .catch((err)=>{
    res.status(500).json({message: err.message});
  })


})

router.put('/:id', checkAccountPayload, checkAccountId, (req, res, next) => {
  
  const { id } = req.params;

  const updatedAccount = req.body;

  Accounts.updateById(id, updatedAccount)
  .then((updateAccountResult)=>{
    res.status(200).json(updateAccountResult);
  })
  .catch((err)=>{
    res.status(500).json({message: err.message});
  })

});

router.delete('/:id', checkAccountId, (req, res, next) => {
  
  const { id } = req.params;

  Accounts.deleteById(id)
  .then((deletedRecords)=>{
    res.status(200).json(deletedRecords);
  })
  .catch((err)=>{
    res.status(500).json({message: err.message});
  })
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({message: err.message});
  next();
})

module.exports = router;
