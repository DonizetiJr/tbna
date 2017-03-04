class ContactsController < ApplicationController
  def new
    @contact = Contact.new
  end

  def create
    sleep 1
    @contact = Contact.new(params[:contact])
    @contact.request = request
    if @contact.deliver
      flash.now[:error] = nil
      respond_to do |format|
        format.html { redirect_to root_path }
        format.js # render contacts/create.js.erb
      end
    else
      flash.now[:error] = 'Cannot send message.'
      render :new
    end
  end
end
