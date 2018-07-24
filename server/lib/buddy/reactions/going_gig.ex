defmodule Buddy.Reactions.GoingGig do
  use Ecto.Schema
  import Ecto.Changeset


  schema "going_gigs" do
    field :user_id, :id
    field :gig_id, :id

    timestamps()
  end

  @doc false
  def changeset(going_gig, attrs) do
    going_gig
    |> cast(attrs, [:user_id, :gig_id])
    |> validate_required([:user_id, :gig_id])
  end
end
