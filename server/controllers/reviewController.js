const Review = require("../models/reviewModel");

// ======================
// CREATE REVIEW
// ======================
const createReviewController = async (req, res) => {
  try {
    const { product, rating, comment } = req.body;

    const alreadyReviewed = await Review.findOne({
      user: req.user._id,
      product,
    });

    if (alreadyReviewed) {
      return res.status(400).send({
        success: false,
        message: "You already reviewed this product",
      });
    }

    const review = await Review.create({
      user: req.user._id,
      product,
      rating,
      comment,
    });

    res.status(201).send({
      success: true,
      message: "Review Added Successfully",
      review,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error creating review",
      error: error.message,
    });
  }
};

// ======================
// GET PRODUCT REVIEWS
// ======================
const getReviewsController = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    }).populate("user", "name");

    res.status(200).send({
      success: true,
      totalReviews: reviews.length,
      reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};

// ======================
// UPDATE REVIEW
// ======================
const updateReviewController = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      {
        rating,
        comment,
      },
      {
        new: true,
      }
    );

    if (!review) {
      return res.status(404).send({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Review Updated Successfully",
      review,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating review",
      error: error.message,
    });
  }
};

// ======================
// DELETE REVIEW
// ======================
const deleteReviewController = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!review) {
      return res.status(404).send({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Review Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting review",
      error: error.message,
    });
  }
};

// ======================
// AVERAGE RATING
// ======================
const averageRatingController = async (req, res) => {
  try {
    const result = await Review.aggregate([
      {
        $match: {
          product: require("mongoose").Types.ObjectId.createFromHexString(
            req.params.productId
          ),
        },
      },
      {
        $group: {
          _id: "$product",
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    res.status(200).send({
      success: true,
      rating: result.length ? result[0] : { averageRating: 0, totalReviews: 0 },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error calculating rating",
      error: error.message,
    });
  }
};

module.exports = {
  createReviewController,
  getReviewsController,
  updateReviewController,
  deleteReviewController,
  averageRatingController,
};