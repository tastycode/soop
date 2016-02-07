class NotificationMailer < ApplicationMailer
  def client_added(client)
    mail(to: client.email, subject: 'You are signed up')
  end

  def patron_added(patron)
    mail(to: patron.email, subject: 'Welcome to getsoop')
  end

  def client_ship(client)
    mail(to: patron.email, subject: 'Please order food')
  end

  def client_shipped(client)
    mail(to: patron.email, subject: 'Food is coming')
  end

  def patron_shipped(patron)
    mail(to: patron.email, subject: 'You helped fight hunger')
  end
end
