function ratingControl (req, res, next) {

if (req.method == "GET"|| req.query.rating >= 0 && req.query.rating <= 10) { 
    next() 
}

      else {
        res.send(`Rating должен быть от 0 до 10`)
      }
    }
      module.exports = ratingControl