const router = require('express').Router()
const Accounts = require("./accounts-model");

router.get('/', (req, res, next) => {
  Accounts.getAll()
  .then((accounts)=>{
    res.status(200).json(accounts);
  })
  .catch((err)=>{
    next(err);
  })
})

router.get('/:id', (req, res, next) => {
  
  Accounts.getById(req.params.id)
  .then((account)=>{
    if (account){
      console.log("SUCCEEDED GETTING SINGLE ACCT BY ID", account);
      res.status(200).json(account);
    } else {
      res.status(404).json({message: "No Account Found With That ID"})
    }
  })
  .catch((err)=>{
    console.log("FAILED TO GET SINGLE ACCOUNT BY ID", err);
    next(err);
  })
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
  const account = req.body;
  if(req.body.name && req.body.budget){
    Accounts.create(account)
  .then((resolution)=>{
    console.log("SUCCEEDED CREATING ACCOUNT", resolution);
    res.json(resolution);
  })
  .catch((err)=>{
    console.log("FAILED TO CREATE ACCOUNT", err);
    next(err);
  })
  } else {
    res.status(404).json({message: "Name and Budget are required fields"})
  }
})

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;
  if (changes.name && changes.budget){
    Accounts.updateById(id, changes)
    .then((updatedAccount)=>{
      console.log(updatedAccount);
      res.status(200).json(updatedAccount);
    })
    .catch((err)=>{
      next(err);
    })
  } else {
    res.status(400).json({message: "Name and Budget are required fields"});
  }
});

router.delete('/:id', (req, res, next) => {
  
  const { id } = req.params;

  Accounts.deleteById(id)
  .then((deletedAccount)=>{
    res.status(200).json(deletedAccount);
  })
  .catch((err)=>{
    next(err);
  })

})

//ERROR MIDDLEWARE
router.use((err, req, res, next)=>{
  res.status(500).json({message: err.message})
})


module.exports = router;
