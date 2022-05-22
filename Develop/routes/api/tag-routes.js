const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  try {
    const tagData = Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  try {
    const tagData = Tag.findByPk(req.params.id, {
      include: [{ model: Product}]
    });

    if (!tagData) {
      res.status(404).json({ message: 'No id with corresponding data' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  try {
    const locationInformation = Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(locationInformation);
  } catch (err) {
    res.status(400).json(err);
  }
  // Tag.create(req.body)
  //   .then((tag) => {
  //     if (req.body.productIds != null) {
  //       const productTagIdArr = req.body.tagIds.map((product_id) => {
  //         return {
  //           tag_id: tag.id,
  //           product_id,
  //         };
  //       });
  //       return ProductTag.bulkCreate(productTagIdArr);
  //     }
  //     res.status(200).json(tag);
  //   })
  //   .then((productTagIds) => res.status(200).json(productTagIds))
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(400).json(err);
  //   });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
