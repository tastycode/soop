class ClientsController < ApplicationController
  def create
    c = Client.new(client_params)
    c.state = "new"
    c.save
    render json: {
      client: {
        id: c.id
      }
    }
  end

  def confirm
    c = Client.find(params[:id])
    c.confirmed = true
    c.save
    NotificationMailer.client_added(c).deliver_later
    redirect_to thanks_client_path(1)
  end

  protected
  def client_params
    params.require(:client).permit(
          :fullname,
          :email,
          :address,
          :address2,
          :city,
          :state,
          :zip,
          :location_lat,
          :location_lng,
          :count,
          :tastes,
          restrictions: [:gluten, :vegetarian]
    )

  end
end
