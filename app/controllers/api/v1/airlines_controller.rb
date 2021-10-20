class Api::V1::AirlinesController < ActionController::API
  def index
    render json: AirlineSerializer.new(Airline.all, serializer_options)
  end

  def show
    airline = Airline.find_by_slug(params[:slug])

    render json: AirlineSerializer.new(airline, serializer_options)
  end

  def create
    airline = Airline.new(airline_params)

    if airline.save
      render json: AirlineSerializer.new(airline)
    else
      render json: { errors: airline.errors }, status: 422
    end
  end

  def update
    airline = Airline.find_by_slug(params[:slug])

    if airline.update(airline_params)
      render json: AirlineSerializer.new(airline)
    else
      render json: { errors: airline.errors }, status: 422
    end
  end

  def destroy
    airline = Airline.find_by_slug(params[:slug])

    if airline.destroy
      head :no_content
    else
      render json: { errors: airline.errors }, status: 422
    end
  end

  private

  def airline_params
    params.require(:airline).permit(:name, :image_url)
  end

  def serializer_options
    @serializer_options ||= {
      include: %i[reviews]
    }
  end
end
