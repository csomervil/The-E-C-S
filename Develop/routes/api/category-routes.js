const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// getting all category infromation
router.get('/', (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// getting a single peice of information by identification
router.get('/:id', (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Reader }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No id with corresponding data' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// creating information
router.post('/', (req, res) => {
  try {
    const locationInformation = await Category.create({
      category_id: req.body.category_id
    });
    res.status(200).json(locationInformation);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedResult) => {
      res.json(updatedResult);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
