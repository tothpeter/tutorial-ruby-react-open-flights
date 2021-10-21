class Api::V1::ReviewsController < ActionController::API
  def create
    review = airline.reviews.new(review_params)

    if review.save
      render json: ReviewSerializer.new(review)
    else
      render json: { errors: review.errors }, status: 422
    end
  end

  def destroy
    review = Review.find(params[:id])

    if review.destroy
      head :no_content
    else
      render json: { errors: review.errors }, status: 422
    end
  end

  private

  def review_params
    params.require(:review).permit(:title, :description, :score, :airline_id)
  end

  def airline
    @airline ||= Airline.find(params[:airline_id])
  end
end
