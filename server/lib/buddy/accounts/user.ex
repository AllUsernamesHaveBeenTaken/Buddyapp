defmodule Buddy.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :avatar, :string
    field :email, :string
    field :facebook_id, :string
    field :first_name, :string
    field :last_name, :string

    has_many :gigs, Buddy.Posts.Gig
    has_many :like_gigs, Buddy.Reactions.LikeGig

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:avatar, :facebook_id, :email, :first_name, :last_name])
    |> validate_required([:avatar, :facebook_id, :first_name, :last_name])
    |> unique_constraint(:email)
    |> unique_constraint(:facebook_id)
  end
end
