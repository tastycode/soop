class PatronsController < ApplicationController
  def create
    customer = Stripe::Customer.create(
     :email => params[:patron][:email],
     :source  => params[:patron][:token],
     :plan => 'monthly_groceries',
     :quantity => params[:count]
   )
    patron = Patron.new(patron_params)
    patron.email = customer.email
    patron.stripe_id = customer.id
    patron.stripe_state = "subscribed"
    patron.save
    render json: {
      patron: {
        id: patron.id
      }
    }
  end

  protected

  def patron_params
    params.require(:patron).permit([
      :fullname,
      :location_lat,
      :location_lng,
      :address,
      :city,
      :state,
      :count
    ])
  end
end
