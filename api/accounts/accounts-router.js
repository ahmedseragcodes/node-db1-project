const router = require('express').Router()
const Accounts = require("./accounts-model");
const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require("./accounts-middleware");

router.get('/', (req, res, next) => {
  
  Accounts.getAll()
  .then((allAccts)=>{
    res.status(200).json(allAccts);
  })
  .catch((err)=>{
    res.status(500).json({message: err.message});
  })

})

router.get('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
