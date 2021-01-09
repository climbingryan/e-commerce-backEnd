const router = require('express').Router();
const { Category, Product } = require('../../models');
const { findOne } = require('../../models/Tag');

// The `/api/categories` endpoint
                                        // WORKS
router.get('/', (req, res) => {
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']
      }
    ]
  }).then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']
      }
    ]
  }).then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err),
      res.status(500).json(err);
    });
  // be sure to include its associated Products
});

  // CREATE new Category                // WORKS
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err)
    });
});
  // UPDATE a category by its `id` value  WORKS
router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(dbData => {
        if (!dbData) {
            res.status(404).json({ message: 'No post found with this id' })
            return;
        }
        res.json(dbData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});
  // DE:ETE a category by id              WORKS
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbData => {
    if (!dbData) {
      res.status(404).json({ message: 'No Category found with this id' })
      return;
    }
    res.json(dbData)
  }).catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

module.exports = router;