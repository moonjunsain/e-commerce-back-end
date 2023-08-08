const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    // find all tags
    const allTags = await Tag.findAll({
      // be sure to include its associated Product data
      include: {model: Product}
    })
    res.status(200).json(allTags)
  }catch(err){
    res.status(500).json({message: "Internal server error", error: err})
  }
});

router.get('/:id', async (req, res) => {
  try{
    // find a single tag by its `id`
    const tag = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: {model: Product}
    })

    if(!tag){
      return res.status(404).json({message: "Cannot find a tag"})
    }
    res.status(200).json(tag)

  }catch(err){
    res.status(500).json({message: "Internal server error", error: err})
  }
});

router.post('/', async (req, res) => {
  try{
    // create a new tag
    const newTag = await Tag.create(req.body)
    res.status(200).json(newTag)

  }catch(err){
    res.status(500).json({message: "Internal server error", error: err})
  }
});

router.put('/:id', async (req, res) => {
  try{
    // update a tag's name by its `id` value
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    if(!updatedTag){
      return res.status(404).json({message: "Cannot find a Tag"})
    }

    res.status(200).json(updatedTag)
  }catch(err){
    res.status(500).json({message: "Internal server error", error: err})
  }

});

router.delete('/:id', async (req, res) => {
  try {
    // delete on tag by its `id` value
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })

    if(!deletedTag){
      return res.status(404).json({message: "Cannot find a Tag"})
    }

    res.status(200).json(deletedTag)
  }catch(err){
    res.status(500).json({message: "Internal server error", error: err})
  }
});

module.exports = router;
