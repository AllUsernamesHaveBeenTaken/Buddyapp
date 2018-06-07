defmodule BuddyWeb.Schema.AccountsTypes do
  use Absinthe.Schema.Notation
  
  object :user_session do
    field :token, non_null(:string)
  end

  enum :provider do
    value :facebook
  end

  object :user do
    field :id, non_null(:id)
    field :avatar, :string
    field :first_name, :string
    field :last_name, :string
    field :email, :string

    field :inserted_at, non_null(:string)
    field :updated_at, non_null(:string)
  end
end