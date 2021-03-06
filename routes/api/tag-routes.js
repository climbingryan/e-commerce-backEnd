const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // find all tags
router.get('/', (req, res) => {
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      through: ProductTag,
      as: 'products'
    }
  }).then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

  // find a single tag by its `id`
  // be sure to include its associated Product data
router.get('/:id', (req, res) => {
  Tag.findOne({
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        through: ProductTag,
        as: 'products'
      }
    ],
    where: {
      id: req.params.id
    }
  }).then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

  // CREATE new Tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  }).then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

  // update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(dbData => {
    if (!dbData) {
      res.status(404).json({ message: 'No tag was found under this id' });
      return;
    }
    res.json(dbData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

  // delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbData => {
    if (!dbData) {
      res.status(404).json({ message: 'No tag found under the current id' });
      return;
    }
    res.json(dbData)
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
