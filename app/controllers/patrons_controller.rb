class PatronsController < ApplicationController
  def create
    customer = Stripe::Customer.create(
     :email => params[:stripeEmail],
     :source  => params[:stripeToken],
     :plan => 'monthly_groceries',
     :quantity => params[:count]
   )
    patron = Patron.new(patron_params)
    patron.email = customer.email
    patron.stripe_id = customer.id
    patron.stripe_state = "subscribed"
    patron.save
    redirect_to thanks_patron_path(1)
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
