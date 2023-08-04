const router = require('express').Router();
const { Category, Product } = require('../../models');


// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    // gets the data from the database
    const data = await Category.findAll({
      // joins with product
      include: [{ model: Product }]
    })

    res.status(200).json(data)

  }catch(err){
    res.status(500).json({message: "Internal server error", error: err})
  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try{
    const data = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{model: Product}]
    })

    if(!data){
     return res.status(404).json({message: "No category found"})
    }
    res.status(200).json(data)

  }catch(err){
    res.status(500).json({message: "Internal server error", error: err})
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const newCategory = await Category.create(req.body)
    res.status(200).json(newCategory)
  }catch(err){
    res.status(500).json({message: "Internal server error", error: err})
  }
  
});

router.put('/:id', async (req, res) => {
  try{
    // update a category by its `id` value
    const updatedCat =  await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if(!updatedCat){
      res.status(404).json({message: "No category found with the id"})
      return
    }
  
    res.status(200).json(updatedCat)
  }catch(err){
    res.status(500).json({message: "Internal server error", error: err})
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const deletedCat = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if(!deletedCat){
      res.status(404).json({message: "No category found with the id"})
      return
    }
  
    res.status(200).json(deletedCat)

  }catch(err){
    res.status(500).json({message: "Internal server error", error: err})
  }
});

module.exports = router;
