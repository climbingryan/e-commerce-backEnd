const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

  // CREATE new Category    WORKS
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
  ).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' })
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
